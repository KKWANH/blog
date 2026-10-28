from pathlib import Path
import json, hashlib
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = 'http://localhost:3100'


def audit(page, label):
    page.add_script_tag(path=str(ROOT/'tools/axe.min.js'))
    return {'page':label,**page.evaluate("""async()=>{
      const r=await axe.run({exclude:[['nextjs-portal']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
      return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.slice(0,5).map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>v.id)};
    }""")}


def main():
    source=Path(r'C:\Projects\blog\contents\travel\places.json')
    original=hashlib.sha256(source.read_bytes()).hexdigest()
    report={'checks':{},'audits':[],'reflow':[],'errors':[]}
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge',headless=True)
        context=browser.new_context(viewport={'width':1440,'height':1000})
        page=context.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
        page.goto(BASE,wait_until='networkidle')
        report['checks']['real_project_image']=page.locator('.project-evidence img').first.evaluate('(e)=>e.complete&&e.naturalWidth>0')
        page.get_by_role('button',name='Pipeline',exact=True).click()
        expect(page.get_by_role('link',name='Open full-size pipeline')).to_be_visible()
        box=page.locator('.evidence-image > a').first.bounding_box()
        report['checks']['pipeline_intrinsic_frame']=box['height']/box['width']<.3
        report['checks']['atlas_preview_uses_existing_records']=page.locator('.travel-preview-map circle').count()==107
        report['checks']['old_generic_note_not_featured']=page.get_by_role('link',name='A setting is not a readback.',exact=True).count()==0
        report['audits'].append(audit(page,'home'))
        page.screenshot(path=str(ROOT/'screenshots/open-profile-home.png'),full_page=True)

        page.goto(BASE+'/about',wait_until='networkidle')
        report['checks']['portrait_flip_removed']=page.locator('.identity-object').count()==0 and page.get_by_role('button',name='Turn the card',exact=True).count()==0
        report['checks']['profile_not_folded']=page.locator('.profile-overview details').count()==0
        report['checks']['open_roles']=page.locator('.experience-records > li').count()==3
        report['checks']['open_degrees']=page.locator('.education-record').count()==4
        report['checks']['completed_programs']=page.locator('.completed-programs article').count()==2
        for name,expected in [('C++','Current work scope'),('Python','Communication interfaces'),('React','eBike operator interface')]:
            page.locator('.skill-lenses').get_by_role('button',name=name,exact=False).click()
            expect(page.locator('#career-evidence h3')).to_have_text(expected)
            report['checks']['skill_'+name]=page.locator('.experience-records > li').count()==3
        page.locator('.skill-lenses').get_by_role('button',name='ROS 2',exact=False).click()
        page.get_by_role('button',name='View matching project',exact=False).click()
        report['checks']['matching_evidence_focus']=page.locator('#career-evidence').evaluate('(e)=>e===document.activeElement')
        expect(page.locator('#career-evidence')).to_contain_text('Color Saves Life')
        page.evaluate("()=>{window.copied='';Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.copied=text}})}")
        page.get_by_role('button',name='Copy profile summary',exact=True).click()
        report['checks']['summary_copy']=page.evaluate("copied.includes('early implementation') && !copied.includes('Ariadne')")
        report['audits'].append(audit(page,'open-profile'))
        page.get_by_role('button',name='Clear focus',exact=True).click()
        page.screenshot(path=str(ROOT/'screenshots/open-profile-desktop.png'),full_page=True)

        page.goto(BASE+'/travel',wait_until='domcontentloaded')
        expect(page.get_by_role('group',name='Visited places map')).to_have_attribute('aria-busy','false',timeout=30000)
        report['checks']['map_worker_local']=page.request.get(BASE+'/maplibre-worker.mjs').status==200
        page.get_by_role('link',name='Edit atlas',exact=True).click()
        page.wait_for_url('**/travel/manage')
        expect(page.get_by_role('button',name='Add place',exact=True)).to_be_visible(timeout=30000)
        report['checks']['owner_tool_discoverable']=True
        page.get_by_role('button',name='Add place',exact=True).click()
        dialog=page.get_by_role('dialog',name='Add a place')
        dialog.get_by_label('Place name',exact=True).fill('Owner UI Fixture')
        dialog.get_by_label('Country',exact=True).select_option('NL')
        dialog.get_by_label('Latitude',exact=True).fill('52.1')
        dialog.get_by_label('Longitude',exact=True).fill('5.1')
        report['audits'].append(audit(page,'owner-place-dialog'))
        dialog.get_by_role('button',name='Save place',exact=True).click()
        expect(dialog).not_to_be_visible()
        expect(page.locator('.atlas-live')).to_contain_text('Owner UI Fixture saved.')
        page.get_by_role('searchbox',name='Find a city or country',exact=True).fill('Owner UI Fixture')
        expect(page.locator('.place-list > li')).to_have_count(1)
        page.reload(wait_until='networkidle')
        page.get_by_role('searchbox',name='Find a city or country',exact=True).fill('Owner UI Fixture')
        expect(page.locator('.place-list > li')).to_have_count(1)
        report['checks']['local_owner_save_persists']=True
        page.get_by_role('button',name='Edit Owner UI Fixture, Netherlands',exact=True).click()
        dialog=page.get_by_role('dialog',name='Edit Owner UI Fixture')
        dialog.get_by_label('Time spent',exact=True).select_option('lived-there')
        dialog.get_by_role('button',name='Save place',exact=True).click()
        expect(dialog).not_to_be_visible()
        expect(page.locator('.place-list')).to_contain_text('Lived there')
        report['checks']['local_owner_edit']=True
        page.get_by_role('button',name='Edit Owner UI Fixture, Netherlands',exact=True).click()
        dialog=page.get_by_role('dialog',name='Edit Owner UI Fixture')
        dialog.get_by_role('button',name='Remove this place',exact=True).click()
        dialog.get_by_role('button',name='Remove place',exact=True).click()
        expect(dialog).not_to_be_visible()
        expect(page.locator('.place-list > li')).to_have_count(0)
        page.get_by_role('button',name='Undo removal of Owner UI Fixture',exact=True).click()
        expect(page.locator('.place-list > li')).to_have_count(1)
        report['checks']['local_remove_and_restore']=True
        data=page.request.get(BASE+'/api/travel').json()
        entry=next(x for x in data['places'] if x['city']=='Owner UI Fixture')
        denied=page.request.delete(BASE+'/api/travel',data={'id':entry['id'],'revision':data['revision']},headers={'Origin':'https://elsewhere.example','x-travel-editor-token':data['editor']['token']})
        report['checks']['foreign_origin_denied']=denied.status==403
        cleanup=page.request.delete(BASE+'/api/travel',data={'id':entry['id'],'revision':data['revision']},headers={'Origin':BASE,'x-travel-editor-token':data['editor']['token']})
        report['checks']['fixture_removed']=cleanup.status==200
        report['checks']['unconfigured_auth_fails_closed']=page.request.get(BASE+'/api/auth/session').status==503

        for route in ['/','/about','/travel/manage']:
            page.goto(BASE+route,wait_until='networkidle')
            for large in [False,True]:
                page.evaluate("value=>document.documentElement.style.fontSize=value",'200%' if large else '')
                for width in [320,390,768,1440]:
                    page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(80)
                    report['reflow'].append({'route':route,'large':large,'width':width,'content':page.evaluate('document.documentElement.scrollWidth')})
            page.evaluate("document.documentElement.style.fontSize=''")
        page.set_viewport_size({'width':390,'height':844});page.goto(BASE+'/about',wait_until='networkidle')
        timeline=page.locator('.timeline-scroll')
        report['checks']['mobile_recent_timeline']=timeline.evaluate('(e)=>e.scrollLeft>0')
        page.locator('.skill-lenses').get_by_role('button',name='React',exact=False).click()
        page.get_by_role('button',name='View matching work scope',exact=False).click()
        report['checks']['mobile_scope_focus']=page.locator('#career-evidence').evaluate('(e)=>document.activeElement===e')
        page.evaluate('scrollTo({top:0,behavior:\"instant\"})')
        page.screenshot(path=str(ROOT/'screenshots/open-profile-mobile.png'),full_page=True)
        page.goto(BASE+'/studio/directions-2026-10-27/index.html',wait_until='networkidle')
        page.locator('img').evaluate_all('els=>els.forEach(e=>e.loading=\"eager\")');page.wait_for_timeout(800)
        report['checks']['research_10_concepts_5_references']=page.locator('.concept').count()==10 and page.locator('.reference').count()==5
        report['checks']['research_images_load']=page.locator('img').evaluate_all('els=>els.every(e=>e.complete&&e.naturalWidth>0)')
        browser.close()
    report['checks']['real_atlas_untouched']=original==hashlib.sha256(source.read_bytes()).hexdigest()
    report['passed']=all(report['checks'].values()) and all(x['content']<=x['width']+1 for x in report['reflow']) and not report['errors'] and not any(x['violations'] for x in report['audits'])
    (ROOT/'reviews/open-profile-checks.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
