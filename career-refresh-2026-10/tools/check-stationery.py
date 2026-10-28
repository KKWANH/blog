from pathlib import Path
import hashlib, json, subprocess
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
REPO = Path(r'C:\Projects\blog')
BASE = 'http://localhost:3100'
NODE = ROOT/'tools/node-v22.23.4-win-x64/node.exe'


def audit(page, name):
    page.add_script_tag(path=str(ROOT/'tools/axe.min.js'))
    return {'page':name,**page.evaluate("""async()=>{
      const result=await axe.run({exclude:[['nextjs-portal']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
      return {violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.slice(0,4).map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>v.id)};
    }""")}


def main():
    before=hashlib.sha256((REPO/'contents/travel/places.json').read_bytes()).hexdigest()
    report={'checks':{},'geometry':[],'audits':[],'errors':[]}
    atlas_writes=[]
    def observe_request(request):
        if '/api/travel' in request.url and request.method not in ['GET','HEAD','OPTIONS']:
            atlas_writes.append({'method':request.method,'url':request.url})
    duplicate=subprocess.run([str(NODE),str(REPO/'scripts/dev-server.mjs')],cwd=REPO,capture_output=True,text=True,encoding='utf-8',timeout=30)
    report['checks']['busy_port_no_fallback']=duplicate.returncode==1 and 'localhost:3100 is already in use' in duplicate.stderr
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge',headless=True)
        context=browser.new_context(viewport={'width':1440,'height':1000})
        context.route('**/api/skills',lambda route:route.fulfill(status=200,json={'profile':{'version':1,'updatedAt':None,'entries':{}},'revision':'0'*64,'editor':None,'ownerSignInAvailable':False}))
        context.on('request',observe_request)
        page=context.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
        page.goto(BASE+'/studio/',wait_until='networkidle')
        report['checks']['single_origin_studio']=page.url==BASE+'/studio/index.html'
        page.goto(BASE+'/studio/business-card-2026-10-27/index.html',wait_until='networkidle')
        page.locator('img').evaluate_all('items=>items.forEach(e=>e.loading="eager")')
        page.wait_for_timeout(600)
        report['checks']['five_originals_five_references']=page.locator('.studies article').count()==5 and page.locator('.references article').count()==5
        report['checks']['research_assets_loaded']=page.locator('img').evaluate_all('items=>items.every(e=>e.complete&&e.naturalWidth)')
        blocked=page.request.get(BASE+'/studio/index.html',headers={'Host':'not-local.example'})
        report['checks']['studio_host_guard']=blocked.status in [403,404]
        report['checks']['studio_hidden_files_denied']=page.request.get(BASE+'/studio/.env').status==404
        report['checks']['studio_executable_not_served']=page.request.get(BASE+'/studio/business-card-2026-10-27/studies/render_check.py').status==404
        page.goto(BASE+'/about',wait_until='networkidle')
        expect(page.locator('.paper-business-card')).to_be_visible()
        report['checks']['one_name_heading']=page.get_by_role('heading',level=1).all_text_contents()==['Kwanho Kim']
        report['checks']['three_supplied_portraits']=page.locator('.portrait-contact-sheet a').count()==3
        report['checks']['camera_portrait_leads']=page.locator('.portrait-contact-sheet a').first.get_attribute('data-portrait')=='camera'
        report['checks']['equal_portrait_weight']=page.locator('.portrait-contact-sheet a').evaluate_all('items=>Math.max(...items.map(e=>e.offsetWidth))-Math.min(...items.map(e=>e.offsetWidth))<2&&Math.max(...items.map(e=>e.offsetHeight))-Math.min(...items.map(e=>e.offsetHeight))<2')
        report['checks']['open_career_preserved']=page.locator('.experience-records > li').count()==3 and page.locator('.education-record').count()==4 and page.locator('.profile-overview details').count()==0
        report['checks']['brand_assets_loaded']=page.locator('.career-brand-icon img,.company-mark img').evaluate_all('items=>items.length>=7&&items.every(e=>e.complete&&e.naturalWidth>0)')
        page.locator('.skill-lenses').get_by_role('button',name='React',exact=False).click()
        expect(page.locator('#career-evidence h3')).to_have_text('eBike operator interface')
        page.locator('.linked-work').get_by_role('button',name='Bosch',exact=False).click()
        report['checks']['brand_connection_focus']=page.locator('#experience-bosch .company-select').evaluate('(e)=>e===document.activeElement')
        report['checks']['complete_icon_list']=page.locator('.skill-explorer .skill-lenses button').count()==len(json.loads((REPO/'contents/about/skill-definitions.json').read_text(encoding='utf-8'))['skills'])
        page.get_by_role('button',name='Mind map',exact=True).focus();page.keyboard.press('Enter')
        expect(page.locator('.mind-map-viewport')).to_be_visible()
        report['checks']['map_connections_valid']=page.locator('.mind-map-edges path').evaluate_all('items=>items.length>0&&items.every(e=>!e.getAttribute("d").includes("NaN")&&e.getTotalLength()>20)')
        page.get_by_role('button',name='Icon list',exact=True).click()
        page.locator('.skill-explorer [data-skill-id="docker"]').click()
        expect(page.locator('#repository-title')).to_have_text('Inception')
        report['checks']['tool_links_are_project_context']=True
        page.locator('.skill-explorer [data-skill-id="figma"]').click()
        expect(page.locator('#repository-title')).to_have_text('Figma & UI design')
        report['checks']['figma_scope_visible']=page.locator('#career-evidence').inner_text().find('basic UI design')>=0
        page.locator('.skill-explorer [data-skill-id="c"]').click()
        expect(page.locator('#repository-title')).to_have_text('Minishell')
        report['checks']['c_has_real_project_context']=True
        page.locator('.skill-explorer [data-skill-id="typescript"]').click()
        expect(page.locator('#career-evidence .repository-inspector')).to_be_visible()
        report['checks']['project_skill_not_assigned_to_employer']=page.locator('.company-select[aria-pressed=true]').count()==0
        page.get_by_role('button',name='Mind map',exact=True).click()
        page.get_by_role('button',name='Icon list',exact=True).click()
        report['checks']['selection_survives_view_change']=page.locator('.skill-explorer [data-skill-id="typescript"]').get_attribute('aria-pressed')=='true'
        page.locator('.career-timeline button.timeline-row').filter(has_text='KLA').click()
        report['checks']['whole_timeline_row_works']=page.locator('#experience-kla .company-select').evaluate('(e)=>e===document.activeElement')
        report['checks']['unrelated_skill_focus_cleared']=page.locator('.skill-lenses button[aria-pressed=true]').count()==0
        page.locator('.portrait-contact-sheet a').first.click()
        expect(page.get_by_role('dialog',name='Portraits')).to_be_visible()
        page.keyboard.press('ArrowRight')
        report['checks']['portrait_keyboard_navigation']=page.get_by_role('dialog').locator('[role=status]').inner_text()=='2 / 3'
        page.keyboard.press('Escape')
        report['checks']['portrait_focus_return']=page.locator('.portrait-contact-sheet a').first.evaluate('(e)=>e===document.activeElement')
        report['checks']['no_empty_reverse']=page.get_by_role('button',name='Turn the card',exact=True).count()==0
        report['checks']['native_contact_links']=page.get_by_role('link',name='Email Kwanho',exact=True).get_attribute('href')=='mailto:contact@kwanho.dev' and page.request.get(BASE+'/CV.pdf').status==200 and page.request.get(BASE+'/contact.vcf').status==200
        paper=page.locator('.business-card-tilt');paper.scroll_into_view_if_needed();box=paper.bounding_box()
        page.mouse.move(box['x']+box['width']*.9,box['y']+box['height']*.25);page.wait_for_timeout(350)
        report['checks']['paper_reacts_to_pointer']=paper.evaluate('e=>Math.abs(parseFloat(getComputedStyle(e).getPropertyValue("--ry")))>1')
        page.get_by_role('button',name='Pause motion',exact=True).first.click()
        expect(page.locator('html')).to_have_attribute('data-motion','off')
        report['checks']['paper_pause_resets']=paper.evaluate('e=>parseFloat(getComputedStyle(e).getPropertyValue("--ry"))===0')
        page.get_by_role('button',name='Enable motion',exact=True).first.click()
        page.mouse.move(0,0);page.wait_for_timeout(600)
        for width in [1440,768,390,320]:
            page.set_viewport_size({'width':width,'height':900})
            for enlarged in [False,True]:
                page.evaluate('v=>document.documentElement.style.fontSize=v','200%' if enlarged else '')
                page.wait_for_timeout(100)
                geometry=page.locator('.paper-business-card').evaluate("""e=>{
                  const r=e.getBoundingClientRect(),inside=[...e.querySelectorAll('p,h1,span:not([aria-hidden="true"])')].filter(n=>n.getClientRects().length).every(n=>{const b=n.getBoundingClientRect();return b.left>=r.left-1&&b.right<=r.right+1&&b.top>=r.top-1&&b.bottom<=r.bottom+1});
                  const h=e.querySelector('h1'),text=h.firstChild,range=document.createRange();range.setStart(text,0);range.setEnd(text,6);
                  const domain=e.querySelector('.paper-contact-link>span').lastChild,mail=document.createRange();mail.selectNodeContents(domain);
                  return {width:r.width,height:r.height,ratio:r.width/r.height,inside,firstNameLines:range.getClientRects().length,domainLines:mail.getClientRects().length};
                }""")
                geometry.update(viewport=width,enlarged=enlarged,pageWidth=page.evaluate('document.documentElement.scrollWidth'))
                geometry['buttons']=page.locator('.paper-card-actions a').evaluate_all('items=>items.map(e=>({height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width}))')
                report['geometry'].append(geometry)
                if width==1440 and not enlarged:page.screenshot(path=str(ROOT/'screenshots/paper-final-desktop.png'))
                if width==390 and not enlarged:page.screenshot(path=str(ROOT/'screenshots/paper-final-mobile.png'))
                if width==320 and enlarged:page.screenshot(path=str(ROOT/'screenshots/paper-final-large-type.png'),full_page=True)
        report['checks']['normal_landscape_ratio']=all(abs(x['ratio']-85/55)<.01 for x in report['geometry'] if not x['enlarged'])
        report['checks']['all_type_fits']=all(x['inside'] and x['pageWidth']<=x['viewport']+1 for x in report['geometry'])
        report['checks']['meaningful_name_email_breaks']=all(x['firstNameLines']==1 and x['domainLines']==1 for x in report['geometry'])
        report['checks']['large_buttons_usable']=all(all(b['height']<145 for b in x['buttons']) for x in report['geometry'])
        page.evaluate("document.documentElement.style.fontSize=''")
        page.set_viewport_size({'width':390,'height':844});page.goto(BASE+'/about',wait_until='networkidle')
        report['checks']['printed_contact_targets']=page.locator('.paper-contact-link').evaluate_all('items=>items.every(e=>e.getBoundingClientRect().height>=44)')
        page.get_by_role('link',name='Email contact@kwanho.dev',exact=True).focus()
        focus=[]
        for _ in range(11):
            focus.append(page.evaluate("""()=>{const e=document.activeElement,r=e.getBoundingClientRect(),h=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {text:e.getAttribute('aria-label')||e.textContent.trim(),hit:!!h&&(e===h||e.contains(h))};}"""))
            page.keyboard.press('Tab')
        report['focus']=focus;report['checks']['intro_focus_not_occluded']=all(x['hit'] for x in focus)
        report['audits'].append(audit(page,'paper-mobile'))
        page.locator('.portrait-contact-sheet a').first.click()
        report['audits'].append(audit(page,'portrait-viewer'))
        page.keyboard.press('Escape')
        page.set_viewport_size({'width':1440,'height':1000})
        requested=[];page.on('request',lambda r:requested.append(r.url) if '.mp4' in r.url else None)
        page.goto(BASE+'/',wait_until='networkidle')
        page.locator('.project-film').scroll_into_view_if_needed();page.wait_for_timeout(400)
        report['checks']['no_video_before_play']=not requested and page.locator('video').count()==0
        page.get_by_role('button',name='Play the 16-second team demo',exact=True).click()
        page.wait_for_function('document.querySelector("video").currentTime>.15')
        video=page.locator('video')
        report['checks']['real_demo_plays']=video.evaluate('v=>v.videoWidth===1600&&Math.abs(v.duration-16.3)<.1&&!v.paused&&v.muted')
        report['checks']['player_receives_focus']=video.evaluate('v=>v===document.activeElement')
        report['audits'].append(audit(page,'playing-silent-demo'))
        page.get_by_role('button',name='Pause motion',exact=True).first.click()
        page.wait_for_function('document.querySelector("video").paused')
        report['checks']['manual_pause_stops_video']=video.evaluate('v=>v.paused')
        page.get_by_role('button',name='Enable motion',exact=True).first.click()
        video.evaluate('v=>v.play()');page.evaluate('scrollTo({top:0,behavior:"instant"})')
        page.wait_for_function('document.querySelector("video").paused')
        report['checks']['offscreen_video_pauses']=True
        page.get_by_role('button',name='Pipeline',exact=True).click()
        report['checks']['changing_view_unloads_video']=page.locator('video').count()==0
        ranged=page.request.get(BASE+'/project-media/bcx-team-demo.mp4',headers={'Range':'bytes=0-63'})
        report['checks']['video_range_supported']=ranged.status==206 and len(ranged.body())==64
        reduced=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
        reduced.route('**/api/skills',lambda route:route.fulfill(status=200,json={'profile':{'version':1,'updatedAt':None,'entries':{}},'revision':'0'*64,'editor':None,'ownerSignInAvailable':False}))
        reduced.on('request',observe_request)
        mobile=reduced.new_page();mobile.goto(BASE+'/about',wait_until='networkidle')
        report['checks']['reduced_motion_static']=mobile.locator('html').get_attribute('data-motion')=='off'
        session=reduced.new_cdp_session(mobile);bounds=mobile.locator('.paper-business-card').bounding_box()
        x=bounds['x']+bounds['width']*.5;y=bounds['y']+bounds['height']*.8
        session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
        for step in range(1,13):
            session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y-step*14}]});mobile.wait_for_timeout(18)
        session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});mobile.wait_for_timeout(250)
        report['checks']['card_preserves_vertical_touch_scroll']=mobile.evaluate('scrollY>60')
        strip=mobile.locator('.portrait-contact-sheet');strip.scroll_into_view_if_needed();bounds=strip.bounding_box()
        report['checks']['mobile_portraits_stay_large']=strip.locator('a').evaluate_all('items=>items.every(e=>e.offsetWidth>=200)')
        x=bounds['x']+bounds['width']-35;y=bounds['y']+bounds['height']/2
        session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
        for step in range(1,13):
            session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x-step*17,'y':y}]});mobile.wait_for_timeout(18)
        session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});mobile.wait_for_timeout(250)
        report['checks']['portrait_strip_swipes']=strip.evaluate('e=>e.scrollLeft>60')
        mobile.goto(BASE+'/',wait_until='networkidle');mobile.get_by_role('button',name='Play the 16-second team demo',exact=True).click()
        mobile.wait_for_function('document.querySelector("video").currentTime>.1')
        report['checks']['explicit_video_allowed_with_reduced_motion']=True
        reduced.close()
        moving=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='no-preference')
        moving.on('request',observe_request)
        touch=moving.new_page();touch.goto(BASE+'/about',wait_until='networkidle')
        expect(touch.locator('html')).to_have_attribute('data-motion','on')
        cdp=moving.new_cdp_session(touch);card=touch.locator('.business-card-tilt');bounds=card.bounding_box()
        x=bounds['x']+bounds['width']*.85;y=bounds['y']+bounds['height']*.3
        cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]});touch.wait_for_timeout(350)
        report['checks']['mobile_card_tilt_is_visible']=card.evaluate('e=>Math.abs(parseFloat(getComputedStyle(e).getPropertyValue("--ry")))>4')
        for step in range(1,13):
            cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y-step*12}]});touch.wait_for_timeout(18)
        cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});touch.wait_for_timeout(350)
        report['checks']['active_tilt_keeps_native_scroll']=touch.evaluate('()=>scrollY>60')
        touch.goto(BASE+'/',wait_until='networkidle');photo=touch.locator('.window-stage');photo.scroll_into_view_if_needed();bounds=photo.bounding_box()
        x=bounds['x']+bounds['width']*.8;y=bounds['y']+bounds['height']*.25
        cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]});touch.wait_for_timeout(350)
        report['checks']['mobile_home_photo_tilt_is_visible']=photo.evaluate('e=>Math.abs(parseFloat(getComputedStyle(e).getPropertyValue("--ry")))>4')
        cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
        moving.close();browser.close()
    report['checks']['no_test_atlas_mutations']=not atlas_writes
    report['data_observation']={'unchanged_during_run':before==hashlib.sha256((REPO/'contents/travel/places.json').read_bytes()).hexdigest(),'test_mutation_requests':atlas_writes,'note':'The owner may edit the atlas concurrently. The harness sends no atlas mutations; observed user data is preserved.'}
    report['passed']=all(report['checks'].values()) and not report['errors'] and not any(a['violations'] for a in report['audits'])
    (ROOT/'reviews/stationery-checks.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
