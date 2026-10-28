"""Behavioural browser checks for the real map and complete repository catalogue."""
from pathlib import Path
import json, math, traceback
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parents[1]
BASE='http://localhost:3100'
REPORT=ROOT/'reviews/interactive-map-checks.json'


def main():
    result={'checks':{},'errors':[],'audits':[]}
    checks=result['checks']
    catalogue=json.loads(Path(r'C:\Projects\blog\contents\about\repositories.generated.json').read_text(encoding='utf-8'))
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge',headless=True)
        page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        page.route('**/api/skills',lambda route:route.fulfill(status=200,json={'profile':{'version':1,'updatedAt':None,'entries':{}},'revision':'0'*64,'editor':None,'ownerSignInAvailable':False}))
        page.on('pageerror',lambda error:result['errors'].append(str(error)))
        try:
            page.goto(BASE+'/about',wait_until='networkidle')
            expected_skills=len(json.loads(Path(r'C:\Projects\blog\contents\about\skill-definitions.json').read_text(encoding='utf-8'))['skills'])
            checks['all_curated_experience_practice_entries']=page.locator('.skill-lenses button').count()==expected_skills
            page.get_by_role('button',name='Repositories',exact=True).click()
            expect(page.locator('.catalogue-list > button')).to_have_count(74)
            checks['all_74_catalogue_rows']=page.locator('.catalogue-list > button').count()==74
            lookup=page.get_by_role('searchbox',name='Search repository catalogue',exact=True)
            reviewed=[]
            for repo in catalogue['repositories']:
                lookup.fill(repo['name'])
                row=page.locator('.catalogue-list > button').filter(has=page.get_by_text(repo['name'],exact=True))
                row.click()
                expect(page.locator('.catalogue-detail h3')).to_have_text(repo['name'])
                if repo['status'] != 'empty':
                    expect(page.locator('.catalogue-detail .repository-source-files > li')).to_have_count(min(5,len(repo['sources'])))
                reviewed.append(repo['name'])
            checks['every_repository_has_viewable_review']=len(set(reviewed))==74
            result['reviewed_in_ui']=reviewed
            lookup.fill('oopy_comments')
            checks['empty_repository_explicit']='No source files' in page.locator('.catalogue-detail').inner_text()
            lookup.fill('ai-assistant')
            checks['ai_context_preserved']='AI-directed' in page.locator('.catalogue-detail').inner_text()
            lookup.fill('cpython')
            checks['fork_context_preserved']='Fork / reference' in page.locator('.catalogue-detail').inner_text()
            page.get_by_role('button',name='Mind map',exact=True).click()
            canvas=page.locator('.mind-map-viewport')
            expect(canvas).to_be_visible()
            page.wait_for_timeout(150)
            canvas.scroll_into_view_if_needed()
            def transform():return page.locator('.mind-map-world').get_attribute('style')
            def zoom():return float(canvas.get_attribute('data-zoom'))
            def blank():
                return canvas.evaluate('''e=>{const r=e.getBoundingClientRect();for(let y=.25;y<.7;y+=.13)for(let x=.3;x<.7;x+=.13){const p={x:r.x+r.width*x,y:r.y+r.height*y},t=document.elementFromPoint(p.x,p.y);if(t&&e.contains(t)&&!t.closest('[data-node-id],[data-map-control],button'))return p;}return {x:r.x+r.width*.5,y:r.y+r.height*.4};}''')
            point=blank();before=transform()
            page.mouse.move(point['x'],point['y']);page.mouse.down();page.mouse.move(point['x']+90,point['y']+45,steps=8);page.mouse.up()
            checks['canvas_actually_pans']=transform()!=before
            z=zoom();page.get_by_role('button',name='Zoom in',exact=True).click();checks['zoom_button_changes_camera']=zoom()>z*1.2
            point=blank();page.mouse.move(point['x'],point['y']);z=zoom();page.keyboard.down('Control');page.mouse.wheel(0,-160);page.keyboard.up('Control');page.wait_for_timeout(100)
            checks['modifier_wheel_zooms']=zoom()>z
            z=zoom();scroll=page.evaluate('scrollY');page.mouse.wheel(0,210);page.wait_for_timeout(220)
            checks['normal_wheel_scrolls_page']=page.evaluate('scrollY')>scroll+50 and abs(zoom()-z)<.003
            search=page.get_by_role('searchbox',name='Search skill map',exact=True)
            search.fill('C++');search.press('Enter');page.wait_for_timeout(120)
            node=page.locator('[data-node-id="skill:cpp"]');face=node.locator('.map-node-face')
            face.focus();page.wait_for_timeout(50);box=face.bounding_box()
            original=node.evaluate('e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)})')
            edge_before=page.locator('.mind-map-edges path').evaluate_all('items=>items.map(e=>e.getAttribute("d")).join("|")')
            page.mouse.move(box['x']+box['width']/2,box['y']+box['height']/2);page.mouse.down();page.mouse.move(box['x']+box['width']/2+75,box['y']+box['height']/2+35,steps=10);page.mouse.up()
            moved=node.evaluate('e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)})')
            checks['node_actually_drags']=math.hypot(moved['x']-original['x'],moved['y']-original['y'])>30
            checks['edges_follow_drag']=page.locator('.mind-map-edges path').evaluate_all('items=>items.map(e=>e.getAttribute("d")).join("|")')!=edge_before
            face.focus();page.keyboard.down('Shift');page.keyboard.press('ArrowRight');page.keyboard.up('Shift')
            checks['keyboard_moves_node']=abs(node.evaluate('e=>parseFloat(e.style.left)')-moved['x']-24)<1
            page.get_by_role('button',name='Reset node arrangement',exact=True).click()
            checks['arrangement_reset']=abs(node.evaluate('e=>parseFloat(e.style.left)')-original['x'])<1
            page.get_by_role('button',name='Collapse Languages',exact=True).click()
            checks['branch_collapses']=page.locator('[data-node-id="skill:cpp"]').count()==0
            page.get_by_role('button',name='Expand Languages',exact=True).click()
            checks['branch_reopens']=page.locator('[data-node-id="skill:cpp"]').count()==1
            group=page.locator('[data-node-id="group:languages"]');group_face=group.locator('.map-node-face');group_face.focus();page.wait_for_timeout(80)
            group_face.hover()
            child_before=page.locator('[data-node-id="skill:cpp"]').evaluate('e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)})');group_before=group.evaluate('e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)})');box=group_face.bounding_box()
            branch_zoom=zoom()
            result['branch_probe']=group_face.evaluate('e=>{const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {box:r.toJSON(),hit:hit?.outerHTML.slice(0,300),node:hit?.closest("[data-node-id]")?.dataset.nodeId,scroll:scrollY}}')
            page.mouse.move(box['x']+box['width']/2,box['y']+box['height']/2);page.mouse.down();page.mouse.move(box['x']+box['width']/2+55,box['y']+box['height']/2+25,steps=8);page.mouse.up()
            result['branch_after_pointer']=group.evaluate('e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top),zoom:document.querySelector(".mind-map-viewport").dataset.zoom})')
            page.wait_for_function('(value)=>Math.abs(parseFloat(document.querySelector(\'[data-node-id="group:languages"]\').style.left)-value.x)*value.zoom>30',arg={'x':group_before['x'],'zoom':branch_zoom})
            child_after=page.locator('[data-node-id="skill:cpp"]').evaluate('e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)})');group_after=group.evaluate('e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)})')
            result['branch_drag']={'group_before':group_before,'group_after':group_after,'child_before':child_before,'child_after':child_after,'zoom':branch_zoom}
            checks['branch_drag_moves_children']=abs((child_after['x']-child_before['x'])-(group_after['x']-group_before['x']))<1 and abs(group_after['x']-group_before['x'])*branch_zoom>30
            search.fill('Django');search.press('Enter');expect(page.locator('.map-inspector h3')).to_have_text('Django')
            checks['search_reveals_hidden_skill']=page.locator('[data-node-id="skill:django"]').count()==1
            search.fill('ai-assistant');search.press('Enter');expect(page.locator('.map-inspector h3')).to_have_text('ai-assistant')
            checks['search_reveals_any_repository']=page.locator('[data-node-id="repo:ai-assistant"]').count()==1
            checks['map_ai_scope_explicit']='AI-directed' in page.locator('.map-inspector').inner_text()
            page.get_by_role('button',name='All 74 repos',exact=True).click()
            checks['all_repositories_can_be_shown']=page.locator('.mind-map-node[data-kind=repo]').count()==74
            before=transform();mini=page.get_by_role('button',name='Map overview: click to recenter, Enter to fit all',exact=True);mini.click(position={'x':25,'y':25})
            checks['overview_navigates']=transform()!=before
            page.get_by_role('button',name='Expand map',exact=True).click()
            dialog=page.get_by_role('dialog');expect(dialog).to_be_visible()
            rect=dialog.bounding_box()
            checks['expanded_map_within_viewport']=rect['x']>=0 and rect['y']>=0 and rect['x']+rect['width']<=1441 and rect['y']+rect['height']<=1001
            page.screenshot(path=str(ROOT/'screenshots/interactive-map-full-verified.png'))
            page.keyboard.press('Escape');expect(dialog).not_to_be_visible()
            checks['expanded_map_focus_returns']=page.get_by_role('button',name='Expand map',exact=True).evaluate('e=>e===document.activeElement')
            search.fill('NumPy');search.press('Enter');page.locator('.interactive-mind-map').scroll_into_view_if_needed()
            page.screenshot(path=str(ROOT/'screenshots/interactive-map-desktop-verified.png'))
            page.add_script_tag(path=str(ROOT/'tools/axe.min.js'))
            result['audits'].append(page.evaluate('''async()=>{const r=await axe.run({exclude:[['nextjs-portal']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.slice(0,5).map(n=>n.target)})),incomplete:r.incomplete.map(v=>v.id)};}'''))
            for width in [320,390,768,1440]:
                page.set_viewport_size({'width':width,'height':900})
                for large in [False,True]:
                    page.evaluate('value=>document.documentElement.style.fontSize=value','200%' if large else '')
                    page.wait_for_timeout(100)
                    checks[f'reflow_{width}_{large}']=page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
            page.evaluate("document.documentElement.style.fontSize=''")
            touch=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
            touch.route('**/api/skills',lambda route:route.fulfill(status=200,json={'profile':{'version':1,'updatedAt':None,'entries':{}},'revision':'0'*64,'editor':None,'ownerSignInAvailable':False}))
            mobile=touch.new_page();mobile.goto(BASE+'/about',wait_until='networkidle');mobile.get_by_role('button',name='Mind map',exact=True).click();view=mobile.locator('.mind-map-viewport');expect(view).to_be_visible();view.scroll_into_view_if_needed();mobile.wait_for_timeout(150)
            bounds=view.bounding_box();session=touch.new_cdp_session(mobile)
            point=view.evaluate('''e=>{const r=e.getBoundingClientRect();for(let y=.3;y<.7;y+=.13)for(let x=.3;x<.7;x+=.13){const p={x:r.x+r.width*x,y:r.y+r.height*y},t=document.elementFromPoint(p.x,p.y);if(t&&e.contains(t)&&!t.closest('[data-node-id],[data-map-control],button'))return p;}return {x:r.x+r.width*.5,y:r.y+r.height*.4};}''');x=point['x'];y=point['y']
            before=mobile.locator('.mind-map-world').get_attribute('style')
            session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
            for step in range(1,9):session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+step*8,'y':y+step*3}]})
            session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});mobile.wait_for_timeout(80)
            checks['touch_pan_changes_camera']=mobile.locator('.mind-map-world').get_attribute('style')!=before
            z=float(view.get_attribute('data-zoom'));session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x-35,'y':y},{'x':x+35,'y':y}]})
            for step in range(1,9):session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x-35-step*5,'y':y},{'x':x+35+step*5,'y':y}]})
            session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});mobile.wait_for_timeout(80)
            checks['pinch_zoom_changes_scale']=float(view.get_attribute('data-zoom'))>z*1.3
            checks['reduced_motion_keeps_manual_interaction']=mobile.locator('html').get_attribute('data-motion')=='off' and checks['touch_pan_changes_camera'] and checks['pinch_zoom_changes_scale']
            mobile.get_by_role('button',name='Expand map',exact=True).click();d=mobile.get_by_role('dialog');expect(d).to_be_visible();r=d.bounding_box();checks['mobile_expanded_bounds']=r['x']>=0 and r['y']>=0 and r['width']<=391 and r['height']<=845
            mobile.screenshot(path=str(ROOT/'screenshots/interactive-map-mobile-verified.png'));touch.close()
        except Exception as error:
            result['failure']=str(error)
            result['trace']=traceback.format_exc()
        finally:
            browser.close()
    result['passed']=bool(checks) and all(checks.values()) and not result['errors'] and not result.get('failure') and not any(a['violations'] for a in result['audits'])
    REPORT.write_text(json.dumps(result,indent=2),encoding='utf-8')
    print(json.dumps(result,indent=2),flush=True)
    return 0 if result['passed'] else 1


if __name__=='__main__':
    raise SystemExit(main())
