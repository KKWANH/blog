"""Read-only verification of the requested CV/skills release on the public site."""
from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,subprocess,sys,time,urllib.request,urllib.error
from playwright.sync_api import sync_playwright,expect

ROOT=Path(__file__).resolve().parents[1]
REPO=Path(r'C:\Projects\blog')
BASE='https://www.kwanho.dev'
SHA=sys.argv[1] if len(sys.argv)>1 else subprocess.run(['git','rev-parse','HEAD'],cwd=REPO,capture_output=True,text=True,check=True).stdout.strip()


def committed(file):
    return subprocess.run(['git','show',f'{SHA}:{file}'],cwd=REPO,capture_output=True,check=True).stdout


def read(url,allow_error=False):
    request=urllib.request.Request(url,headers={'User-Agent':'kwanho-skills-release-readback','Cache-Control':'no-cache','Accept':'application/vnd.github+json' if 'api.github.com' in url else '*/*'})
    try:
        with urllib.request.urlopen(request,timeout=40) as response:return response.status,response.read()
    except urllib.error.HTTPError as error:
        if allow_error:return error.code,error.read()
        raise


def main():
    expected_profile=json.loads(committed('contents/about/skill-profile.json'))
    definitions=json.loads(committed('contents/about/skill-definitions.json'))
    catalogue=json.loads(committed('contents/about/repositories.generated.json'))
    expected_pdf=hashlib.sha256(committed('public/CV.pdf')).hexdigest()
    registry={skill['id']:{**skill,'curated':True} for skill in definitions['skills']}
    for repo in catalogue['repositories']:
        for tech in repo['technologies']:registry.setdefault(tech['id'],{**tech,'curated':False})
    def pref(id):
        return expected_profile['entries'].get(id,{'level':None,'visibility':'profile' if registry[id]['curated'] else 'repository'})
    visible=[id for id in registry if pref(id)['visibility']=='profile']
    report={'commit':SHA,'url':BASE,'mode':'read-only','checks':{},'errors':[]}
    checks=report['checks'];deadline=time.monotonic()+15*60;attempt=0
    while time.monotonic()<deadline:
        attempt+=1
        if attempt==1 or attempt%3==0:
            try:
                _,data=read(f'https://api.github.com/repos/KKWANH/blog/commits/{SHA}/status')
                state=json.loads(data)
                status={'state':state['state'],'statuses':[{'context':s['context'],'state':s['state'],'url':s.get('target_url')} for s in state['statuses']]}
                if status!=report.get('deployment_status'):
                    report['deployment_status']=status;print(json.dumps(status,indent=2),flush=True)
                if state['state'] in ['failure','error']:raise RuntimeError('Deployment status reports a failure.')
            except urllib.error.HTTPError as error:report['status_read_error']=error.code
        status,pdf=read(BASE+'/CV.pdf',True)
        api_status,api_data=read(BASE+'/api/skills',True)
        if status==200 and hashlib.sha256(pdf).hexdigest()==expected_pdf and api_status==200:
            snapshot=json.loads(api_data)
            if snapshot.get('profile')==expected_profile:break
        time.sleep(20)
    else:raise RuntimeError('The requested PDF and skill profile did not appear within the verification window.')
    checks['cv_matches_commit']=True;checks['skill_profile_matches_commit']=True
    checks['anonymous_skill_editor_not_granted']=snapshot.get('editor') is None
    report['owner_signin_configured']=snapshot.get('ownerSignInAvailable',False)
    report['profile_skills']=len(visible);report['rated_profile_skills']=sum(pref(id)['level'] is not None for id in visible)
    levels={'learning':'Learning','used':'Used before','comfortable':'Comfortable','strong':'Strong'}
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge',headless=True)
        page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        page.on('pageerror',lambda error:report['errors'].append(str(error)))
        page.goto(BASE+'/about',wait_until='domcontentloaded',timeout=90000)
        page.wait_for_function('() => document.querySelectorAll(".skill-explorer").length===1 && document.querySelector(".skill-explorer").getBoundingClientRect().height>0',timeout=45000)
        expect(page.locator('.skill-explorer')).to_be_visible(timeout=45000)
        expect(page.locator('.skill-lenses [data-skill-id]')).to_have_count(len(visible),timeout=15000)
        checks['published_profile_selection']=set(page.locator('.skill-lenses [data-skill-id]').evaluate_all('items=>items.map(e=>e.dataset.skillId)'))==set(visible)
        checks['published_level_badges']=all(page.locator(f'.skill-lenses [data-skill-id="{id}"] .skill-level-badge').inner_text()==levels[pref(id)['level']] for id in visible if pref(id)['level'])
        checks['editor_entrance']=page.get_by_role('link',name='Edit skill levels',exact=True).get_attribute('href')=='/about/manage'
        checks['camera_first']=page.locator('.portrait-contact-sheet a').first.get_attribute('data-portrait')=='camera'
        page.get_by_role('button',name='Mind map',exact=True).click();canvas=page.locator('.mind-map-viewport');expect(canvas).to_be_visible()
        root=page.locator('[data-node-id="root"]')
        expect(root).to_contain_text('Kwanho Kim')
        checks['neutral_center']=root.locator('svg.lucide-user-round').count()==1 and root.locator('img[src*="cplusplus"]').count()==0
        canvas.scroll_into_view_if_needed();page.wait_for_timeout(150)
        before=page.locator('.mind-map-world').get_attribute('style')
        point=canvas.evaluate('''e=>{const r=e.getBoundingClientRect();for(let y=.25;y<.7;y+=.13)for(let x=.2;x<.8;x+=.13){const p={x:r.x+r.width*x,y:r.y+r.height*y},t=document.elementFromPoint(p.x,p.y);if(t&&e.contains(t)&&!t.closest('[data-node-id],[data-map-control],button'))return p;}return {x:r.x+35,y:r.y+100};}''')
        page.mouse.move(point['x'],point['y']);page.mouse.down();page.mouse.move(point['x']+70,point['y']+30,steps=8);page.mouse.up()
        checks['live_canvas_pan']=before!=page.locator('.mind-map-world').get_attribute('style')
        z=float(canvas.get_attribute('data-zoom'));page.get_by_role('button',name='Zoom in',exact=True).click();checks['live_zoom']=float(canvas.get_attribute('data-zoom'))>z
        search=page.get_by_role('searchbox',name='Search skill map',exact=True);search.fill('webserv');search.press('Enter')
        expect(page.locator('.map-inspector h3').last).to_have_text('webserv')
        checks['repository_connection_search']=True
        page.get_by_role('button',name='Expand map',exact=True).click();dialog=page.get_by_role('dialog',name='Skills & project map');expect(dialog).to_be_visible();box=dialog.bounding_box();checks['expanded_bounds']=box['x']>=0 and box['y']>=0 and box['x']+box['width']<=1441 and box['y']+box['height']<=1001;page.keyboard.press('Escape')
        page.get_by_role('button',name='Repositories',exact=True).click()
        checks['repository_count']=page.locator('.catalogue-list > button').count()==catalogue['count']
        page.screenshot(path=str(ROOT/'screenshots/skills-release-live-about.png'),full_page=True)
        response=page.goto(BASE+'/about/manage',wait_until='domcontentloaded')
        expect(page.get_by_text('Owner access',exact=True)).to_be_visible()
        checks['public_management_locked']=page.get_by_role('button',name='Save changes',exact=True).count()==0
        checks['management_frame_protection']=response.headers.get('x-frame-options','').upper()=='DENY' and \"frame-ancestors 'none'\" in response.headers.get('content-security-policy','')
        page.goto(BASE+'/',wait_until='domcontentloaded')
        play=page.get_by_role('button',name='Play the 16-second team demo',exact=True);expect(play).to_be_visible();checks['demo_not_autoloaded']=page.locator('video').count()==0;play.click();page.wait_for_function('() => document.querySelector(\"video\")?.currentTime > .1',timeout=45000);checks['demo_playback']=True
        page.goto(BASE+'/travel',wait_until='domcontentloaded')
        expect(page.get_by_role('group',name='Visited places map')).to_have_attribute('aria-busy','false',timeout=45000);checks['atlas_map']=True
        browser.close()
    _,atlas=read(BASE+'/api/travel');travel=json.loads(atlas);expected_travel=json.loads(committed('contents/travel/places.json'))
    checks['atlas_matches_commit']=travel['places']==expected_travel['places'];checks['anonymous_atlas_editor_not_granted']=travel.get('editor') is None;report['atlas_records']=len(travel['places'])
    checks['private_studio_denied']=read(BASE+'/studio/index.html',True)[0]==404
    checks['contact_download']=read(BASE+'/contact.vcf')[0]==200
    report['observed_at']=datetime.now(timezone.utc).isoformat();report['passed']=all(checks.values()) and not report['errors'];report['transport']='Verified browser navigation and Python HTTPS system trust; no TLS bypass'
    (ROOT/'reviews/skills-release-live-readback.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report,indent=2),flush=True)
    return 0 if report['passed'] else 1


if __name__=='__main__':
    raise SystemExit(main())
