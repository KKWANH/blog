from pathlib import Path
import json, hashlib, math
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = 'http://127.0.0.1:3100'
OUT = ROOT / 'screenshots'


def audit(page, label):
    page.add_script_tag(path=str(ROOT / 'tools/axe.min.js'))
    return {'page': label, **page.evaluate("""async()=>{
      const result=await axe.run({exclude:[['nextjs-portal']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
      return {violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.slice(0,5).map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>v.id)};
    }""")}


def vars_for(locator):
    return locator.evaluate("""e=>({rx:parseFloat(e.style.getPropertyValue('--rx')||0),ry:parseFloat(e.style.getPropertyValue('--ry')||0),shine:parseFloat(e.style.getPropertyValue('--shine')||0)})""")


def main():
    atlas = Path(r'C:\Projects\blog\contents\travel\places.json')
    before = hashlib.sha256(atlas.read_bytes()).hexdigest()
    results = {'checks': {}, 'audits': [], 'reflow': [], 'errors': []}
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge', headless=True)
        context = browser.new_context(viewport={'width':1440,'height':1000}, color_scheme='light')
        context.add_init_script("localStorage.setItem('theme','light')")
        page = context.new_page()
        page.on('pageerror', lambda error: results['errors'].append(str(error)))
        page.goto(BASE, wait_until='networkidle')
        expect(page.locator('html')).to_have_attribute('data-motion','on')
        results['checks']['single_theme_ignores_old_preference'] = 'dark' in page.locator('html').get_attribute('class')
        results['checks']['theme_toggle_removed'] = page.get_by_role('button',name='Use dark theme',exact=True).count()==0 and page.get_by_role('button',name='Use light theme',exact=True).count()==0
        results['checks']['mark_removed'] = page.locator('.wordmark svg').count()==0
        results['checks']['ariadne_not_featured_as_work'] = page.locator('#projects').get_by_text('Ariadne',exact=True).count()==0
        hero = page.locator('.window-stage')
        box = hero.bounding_box()
        page.mouse.move(box['x']+box['width']*.85,box['y']+box['height']*.2,steps=20)
        page.wait_for_timeout(350)
        results['checks']['hero_tilt'] = abs(vars_for(hero)['ry'])>3
        room = page.locator('.site-atmosphere')
        left = room.evaluate("e=>parseFloat(e.style.getPropertyValue('--room-x'))")
        page.mouse.move(30,100,steps=20);page.wait_for_timeout(600)
        right = room.evaluate("e=>parseFloat(e.style.getPropertyValue('--room-x'))")
        results['checks']['background_reacts'] = abs(right-left)>5
        results['checks']['button_lift_eases'] = 'transform' in page.locator('.cinema-intro .action-primary').evaluate("e=>getComputedStyle(e).transitionProperty")
        page.mouse.move(0,0);page.wait_for_timeout(500)
        page.screenshot(path=str(OUT/'cinema-review-home.png'),full_page=True)
        results['audits'].append(audit(page,'home'))

        page.goto(BASE+'/about',wait_until='networkidle')
        stage=page.locator('.portrait-tilt');box=stage.bounding_box()
        page.mouse.move(box['x']+box['width']*.05,box['y']+box['height']*.1,steps=25);page.wait_for_timeout(350)
        first=vars_for(stage)
        page.mouse.move(box['x']+box['width']*.95,box['y']+box['height']*.9,steps=25);page.wait_for_timeout(350)
        second=vars_for(stage)
        results['tilt_samples']=[first,second]
        results['checks']['card_has_clear_range'] = first['ry']<-8 and second['ry']>8 and first['rx']>6 and second['rx']<-6
        actions=page.locator('.contact-actions').bounding_box()
        page.screenshot(path=str(OUT/'cinema-review-card-hover.png'))
        page.get_by_role('button',name='Turn the card',exact=True).evaluate('(e)=>e.click()')
        page.wait_for_timeout(220)
        results['checks']['turn_keeps_light'] = vars_for(stage)['shine']>.2
        page.wait_for_timeout(500)
        results['checks']['stationary_actions'] = actions==page.locator('.contact-actions').bounding_box()
        results['checks']['inactive_face_inert'] = page.locator('.identity-front').get_attribute('inert') is not None
        expect(page.get_by_role('link',name='Read the field note')).to_be_visible()
        page.screenshot(path=str(OUT/'cinema-review-card-back.png'))
        control=page.get_by_role('button',name='Back to portrait',exact=True)
        control.focus();page.keyboard.press('Escape');page.wait_for_timeout(700)
        control=page.get_by_role('button',name='Turn the card',exact=True)
        results['checks']['escape_returns_portrait_and_focus']=control.evaluate('(e)=>e===document.activeElement')
        results['audits'].append(audit(page,'card-front'))
        control.click();page.wait_for_timeout(700)
        page.keyboard.press('Tab')
        results['checks']['forward_tab_reaches_revealed_note']=page.get_by_role('link',name='Read the field note').evaluate('(e)=>document.activeElement===e')
        results['audits'].append(audit(page,'card-back'))

        page.locator('header').get_by_role('button',name='Pause motion',exact=True).click()
        expect(page.locator('html')).to_have_attribute('data-motion','off')
        page.reload(wait_until='networkidle')
        expect(page.locator('html')).to_have_attribute('data-motion','off')
        stage=page.locator('.portrait-tilt');box=stage.bounding_box()
        page.mouse.move(box['x']+box['width']*.9,box['y']+20,steps=20);page.wait_for_timeout(250)
        results['checks']['pause_persists_and_stops_tilt']=vars_for(stage)['rx']==0 and vars_for(stage)['ry']==0
        results['checks']['paused_flip_instant']=page.locator('.identity-object').evaluate("e=>getComputedStyle(e).transitionDuration")=='0s'
        page.get_by_role('button',name='Turn the card',exact=True).click()
        expect(page.locator('.identity-back')).to_have_attribute('aria-hidden','false')
        page.locator('header').get_by_role('button',name='Enable motion',exact=True).click()

        page.get_by_role('button',name='Recruiter brief',exact=True).click()
        brief=page.get_by_role('dialog',name='Quick brief')
        expect(brief).to_be_visible()
        results['audits'].append(audit(page,'recruiter-brief'))
        page.keyboard.press('Escape')
        results['checks']['brief_focus_return']=page.get_by_role('button',name='Recruiter brief',exact=True).evaluate('(e)=>e===document.activeElement')
        page.goto(BASE+'/photography',wait_until='networkidle')
        results['checks']['preview_gallery_labelled']=page.locator('.gallery-preview-note').count()==1
        page.get_by_role('button',name='Camera portrait',exact=True).click()
        results['checks']['gallery_filter']=page.locator('.photo-frame').count()==1
        page.get_by_role('button',name='All frames',exact=True).click()
        origin=page.get_by_role('link',name='View Window portrait',exact=True)
        origin.click()
        expect(page.get_by_role('dialog',name='Window portrait')).to_be_visible()
        page.keyboard.press('ArrowRight')
        expect(page.get_by_role('dialog',name='A window study')).to_be_visible()
        page.keyboard.press('ArrowLeft')
        expect(page.get_by_role('dialog',name='Window portrait')).to_be_visible()
        results['checks']['gallery_keyboard_navigation']=True
        results['audits'].append(audit(page,'gallery-viewer'))
        page.keyboard.press('Escape')
        results['checks']['gallery_focus_return']=origin.evaluate('(e)=>e===document.activeElement')
        page.screenshot(path=str(OUT/'cinema-review-gallery.png'),full_page=True)
        page.goto(BASE+'/travel',wait_until='networkidle')
        expect(page.get_by_role('group',name='Visited places map')).to_have_attribute('aria-busy','false',timeout=30000)
        page.get_by_role('searchbox',name='Find a city or country',exact=True).fill('Leuven')
        page.locator('.place-select').first.click()
        results['checks']['travel_selection_survives']=page.locator('.place-select[aria-pressed=true]').count()==1 and page.locator('.map-recovery').count()==0
        page.locator('header').get_by_role('button',name='Pause motion',exact=True).click()
        results['checks']['map_survives_pause']=page.locator('.map-recovery').count()==0
        results['audits'].append(audit(page,'travel'))

        for route in ['/','/about','/photography','/travel']:
            page.goto(BASE+route,wait_until='networkidle')
            for zoom in [False,True]:
                page.evaluate("value=>document.documentElement.style.fontSize=value", '200%' if zoom else '')
                for width in [320,390,768,1440]:
                    page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(80)
                    data=page.evaluate('({width:innerWidth,content:document.documentElement.scrollWidth})')
                    results['reflow'].append({'route':route,'large_text':zoom,**data,'pass':data['content']<=width+1})
            page.evaluate("document.documentElement.style.fontSize=''")
        context.close()

        touch=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
        mobile=touch.new_page();mobile.goto(BASE+'/about',wait_until='networkidle')
        expect(mobile.locator('html')).to_have_attribute('data-motion','on')
        controls=mobile.locator('.card-turn-controls').bounding_box();actions=mobile.locator('.contact-actions').bounding_box()
        results['mobile_geometry']={'turn_bottom':controls['y']+controls['height'],'actions_top':actions['y'],'actions_bottom':actions['y']+actions['height']}
        results['checks']['mobile_actions_in_flow']=mobile.locator('.contact-actions').evaluate("e=>getComputedStyle(e).position") in ['sticky','static']
        turn=mobile.get_by_role('button',name='Turn the card',exact=True);turn.scroll_into_view_if_needed()
        results['checks']['mobile_turn_not_occluded']=turn.evaluate('e=>{const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return hit===e||e.contains(hit)}')
        mobile.evaluate('scrollTo({top:0,left:0,behavior:\"instant\"})')
        mobile.screenshot(path=str(OUT/'cinema-review-card-mobile.png'),full_page=True)
        stage=mobile.locator('.portrait-tilt');box=stage.bounding_box()
        cdp=touch.new_cdp_session(mobile)
        start={'x':box['x']+box['width']*.4,'y':box['y']+box['height']*.45}
        cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[start]})
        cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':start['x']+60,'y':start['y']+3}]})
        mobile.wait_for_timeout(250)
        results['checks']['horizontal_touch_tilts']=abs(vars_for(stage)['ry'])>1
        cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
        before_scroll=mobile.evaluate('scrollY')
        cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':200,'y':600}]})
        for y in [560,500,440,380]:
            cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':200,'y':y}]});mobile.wait_for_timeout(30)
        cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});mobile.wait_for_timeout(200)
        results['checks']['vertical_touch_scrolls']=mobile.evaluate('scrollY')>before_scroll+40
        touch.close()

        reduced=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        static=reduced.new_page();static.goto(BASE+'/about',wait_until='networkidle')
        results['checks']['system_reduced_motion']=static.locator('html').get_attribute('data-motion')=='off'
        static.get_by_role('button',name='Turn the card',exact=True).click()
        results['checks']['reduced_content_available']=static.get_by_role('link',name='Read the field note').is_visible()
        reduced.close()
        nojs=browser.new_context(java_script_enabled=False)
        native=nojs.new_page();native.goto(BASE+'/about',wait_until='load')
        results['checks']['native_contact_actions']=native.locator('a[href=\"/CV.pdf\"]').count()>0 and native.locator('a[href=\"mailto:contact@kwanho.dev\"]').count()>0
        nojs.close();browser.close()
    results['checks']['atlas_not_mutated']=before==hashlib.sha256(atlas.read_bytes()).hexdigest()
    results['passed']=all(results['checks'].values()) and all(row['pass'] for row in results['reflow']) and not results['errors'] and not any(row['violations'] for row in results['audits'])
    (ROOT/'reviews/cinema-checks.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(results,ensure_ascii=False,indent=2))


if __name__=='__main__': main()
