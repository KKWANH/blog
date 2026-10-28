"""Browser preference/editor checks using a fixture API, never real owner ratings."""
from pathlib import Path
import hashlib,json,traceback
from playwright.sync_api import sync_playwright,expect

ROOT=Path(__file__).resolve().parents[1]
REAL=Path(r'C:\Projects\blog\contents\about\skill-profile.json')
BASE='http://localhost:3100'


def main():
    before=hashlib.sha256(REAL.read_bytes()).hexdigest()
    result={'checks':{},'errors':[],'audits':[],'fixture_saves':[]}
    checks=result['checks']
    state={'profile':{'version':1,'updatedAt':None,'entries':{}},'revision':'0'*64,'editor':{'mode':'local','token':'fixture-skills-token'},'ownerSignInAvailable':False}
    pause_save=[True];pending=[]
    def revision():
        state['revision']=hashlib.sha256(json.dumps(state['profile'],sort_keys=True).encode()).hexdigest()
    def route_api(route):
        request=route.request
        if request.method=='GET':
            route.fulfill(status=200,content_type='application/json',body=json.dumps(state));return
        if pause_save[0]:
            pause_save[0]=False;pending.append(route);return
        body=request.post_data_json
        if request.headers.get('x-skills-editor-token')!='fixture-skills-token':
            route.fulfill(status=403,json={'error':'Owner access required.'});return
        if body['revision']!=state['revision']:
            route.fulfill(status=409,json={'error':'Skill settings changed. Reload the latest file before saving.'});return
        for key,value in body['changes'].items():
            if value is None:state['profile']['entries'].pop(key,None)
            else:state['profile']['entries'][key]=value
        state['profile']['updatedAt']='2026-10-27T15:00:00.000Z';revision()
        result['fixture_saves'].append(body['changes'])
        route.fulfill(status=200,json={'profile':state['profile'],'revision':state['revision']})
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge',headless=True)
        context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        context.route('**/api/skills',route_api)
        editor=context.new_page();editor.on('pageerror',lambda error:result['errors'].append(str(error)))
        try:
            editor.goto(BASE+'/about/manage',wait_until='networkidle')
            expect(editor.get_by_role('button',name='Save changes',exact=True)).to_be_visible()
            checks['no_guessed_initial_levels']=editor.locator('select[aria-label^="Familiarity for"]').evaluate_all('items=>items.every(e=>e.value==="")')
            editor.get_by_label('Familiarity for C++',exact=True).select_option('comfortable')
            editor.get_by_label('Visibility for MNE',exact=True).select_option('hidden')
            editor.get_by_role('button',name='Save changes',exact=True).click()
            expect(editor.get_by_label('Familiarity for C++',exact=True)).to_be_disabled()
            checks['save_blocks_new_edits_in_flight']=editor.get_by_label('Visibility for MNE',exact=True).is_disabled()
            editor.wait_for_timeout(50);route_api(pending.pop())
            expect(editor.get_by_role('status').filter(has_text='Saved. The icon list')).to_be_visible()
            checks['save_payload_scoped']=result['fixture_saves'][-1]=={'cpp':{'level':'comfortable','visibility':'profile'},'mne':{'level':None,'visibility':'hidden'}}
            editor.reload(wait_until='networkidle')
            checks['reload_preferences']=editor.get_by_label('Familiarity for C++',exact=True).input_value()=='comfortable' and editor.get_by_label('Visibility for MNE',exact=True).input_value()=='hidden'
            profile=context.new_page();profile.on('pageerror',lambda error:result['errors'].append(str(error)));profile.goto(BASE+'/about',wait_until='networkidle')
            expect(profile.locator('.skill-lenses [data-skill-id="cpp"] .skill-level-badge')).to_have_text('Comfortable')
            checks['icon_list_level_visible']=True
            checks['hidden_skill_absent_from_list']=profile.locator('.skill-lenses [data-skill-id="mne"]').count()==0
            profile.get_by_role('button',name='Mind map',exact=True).click();expect(profile.locator('.mind-map-viewport')).to_be_visible()
            expect(profile.locator('[data-node-id="root"]')).to_be_visible()
            root_node=profile.locator('[data-node-id="root"]')
            checks['neutral_person_center']=root_node.locator('img[src*="cplusplus"]').count()==0 and root_node.locator('svg.lucide-user-round').count()==1 and 'Kwanho Kim' in root_node.text_content()
            search=profile.get_by_role('searchbox',name='Search skill map',exact=True);search.fill('C++');search.press('Enter')
            expect(profile.locator('[data-node-id="skill:cpp"] .skill-level-badge')).to_have_text('Comfortable')
            checks['map_level_matches_list']=True
            search.fill('MNE');checks['hidden_skill_absent_from_search']=profile.locator('.map-search-results > button').count()==0
            search.fill('');canvas=profile.locator('.mind-map-viewport');canvas.scroll_into_view_if_needed()
            def blank():
                return canvas.evaluate('''e=>{const r=e.getBoundingClientRect();for(let y=.25;y<.75;y+=.13)for(let x=.2;x<.8;x+=.13){const p={x:r.x+r.width*x,y:r.y+r.height*y},t=document.elementFromPoint(p.x,p.y);if(t&&e.contains(t)&&!t.closest('[data-node-id],[data-map-control],button'))return p;}return {x:r.x+40,y:r.y+120};}''')
            profile.get_by_role('button',name='Zoom in',exact=True).click();camera=profile.locator('.mind-map-world').get_attribute('style');point=blank();profile.mouse.click(point['x'],point['y']);profile.wait_for_timeout(380)
            checks['background_click_steps_out']=profile.locator('.mind-map-world').get_attribute('style')!=camera
            point=blank();z=float(canvas.get_attribute('data-zoom'));profile.mouse.dblclick(point['x'],point['y'],delay=60);profile.wait_for_timeout(70)
            checks['background_double_click_zooms']=float(canvas.get_attribute('data-zoom'))>z*1.35
            point=blank();z=float(canvas.get_attribute('data-zoom'));profile.keyboard.down('Shift');profile.mouse.dblclick(point['x'],point['y'],delay=60);profile.keyboard.up('Shift');profile.wait_for_timeout(70)
            checks['shift_double_click_zooms_out']=float(canvas.get_attribute('data-zoom'))<z*.8
            editor.bring_to_front();editor.get_by_label('Familiarity for C++',exact=True).select_option('strong');editor.get_by_role('button',name='Save changes',exact=True).click();expect(editor.get_by_role('status').filter(has_text='Saved. The icon list')).to_be_visible()
            profile.bring_to_front();expect(profile.locator('[data-node-id="skill:cpp"] .skill-level-badge')).to_have_text('Strong')
            checks['cross_tab_refresh']=True
            profile.get_by_role('button',name='Icon list',exact=True).click();expect(profile.locator('[data-skill-id="cpp"] .skill-level-badge')).to_have_text('Strong')
            checks['level_survives_view_switch']=True
            editor.bring_to_front();editor.get_by_label('Familiarity for C++',exact=True).select_option('used')
            state['profile']['entries']['cpp']={'level':'learning','visibility':'repository'};revision()
            editor.get_by_role('button',name='Save changes',exact=True).click();expect(editor.locator('.skill-editor-error')).to_contain_text('changed')
            checks['conflict_preserves_unsaved_choice']=editor.get_by_label('Familiarity for C++',exact=True).input_value()=='used'
            checks['conflict_disables_save']=editor.get_by_role('button',name='Save changes',exact=True).is_disabled()
            editor.get_by_role('button',name='Reload latest and discard unsaved edits',exact=True).click()
            expect(editor.get_by_label('Familiarity for C++',exact=True)).to_have_value('learning')
            checks['explicit_conflict_reload']=True
            editor.screenshot(path=str(ROOT/'screenshots/skills-editor-verified.png'))
            for width in [320,390,768,1440]:
                editor.set_viewport_size({'width':width,'height':900})
                for large in [False,True]:
                    editor.evaluate('v=>document.documentElement.style.fontSize=v','200%' if large else '');editor.wait_for_timeout(80)
                    checks[f'editor_reflow_{width}_{large}']=editor.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
            editor.evaluate("document.documentElement.style.fontSize=''")
            editor.set_viewport_size({'width':390,'height':844});editor.add_script_tag(path=str(ROOT/'tools/axe.min.js'))
            result['audits'].append(editor.evaluate('''async()=>{const r=await axe.run({exclude:[['nextjs-portal']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.slice(0,5).map(n=>n.target)})),incomplete:r.incomplete.map(v=>v.id)}}'''))
            state['editor']=None
            readonly=context.new_page();readonly.goto(BASE+'/about/manage',wait_until='networkidle')
            checks['readonly_page_has_no_edit_controls']=readonly.get_by_role('button',name='Save changes',exact=True).count()==0 and readonly.get_by_text('Owner access',exact=True).is_visible()
        except Exception as error:
            result['failure']=str(error);result['trace']=traceback.format_exc()
        finally:
            context.close();browser.close()
    result['real_file_observation']={'unchanged':before==hashlib.sha256(REAL.read_bytes()).hexdigest(),'test_writes':'All browser skill writes intercepted by fixture API. Real filesystem/API persistence checked separately by native tests.'}
    result['passed']=all(checks.values()) and not result['errors'] and not result.get('failure') and not any(a['violations'] for a in result['audits'])
    (ROOT/'reviews/skill-preferences-ui-checks.json').write_text(json.dumps(result,indent=2),encoding='utf-8');print(json.dumps(result,indent=2),flush=True)
    return 0 if result['passed'] else 1


if __name__=='__main__':
    raise SystemExit(main())
