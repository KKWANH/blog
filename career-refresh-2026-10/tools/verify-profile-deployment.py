"""Read-only deployment readback for the user-requested profile release."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib, json, subprocess, time, urllib.request, urllib.error
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
REPO = Path(r'C:\Projects\blog')
SHA = '3f85a90d4d7907c923e4517a4d751bd1fec03605'
BASE = 'https://www.kwanho.dev'


def fetch(url, allow_http_error=False):
    request = urllib.request.Request(url, headers={'User-Agent':'kwanho-release-readback','Cache-Control':'no-cache','Accept':'application/vnd.github+json' if 'api.github.com' in url else '*/*'})
    try:
        with urllib.request.urlopen(request, timeout=40) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as error:
        if allow_http_error:
            return error.code, error.read()
        raise


def committed(path):
    return subprocess.run(['git','show',f'{SHA}:{path}'],cwd=REPO,capture_output=True,check=True).stdout


def main():
    report={'commit':SHA,'url':BASE,'mode':'read-only','checks':{},'errors':[]}
    deadline=time.monotonic()+15*60
    status={}
    attempt=0
    while time.monotonic()<deadline:
        attempt+=1
        if attempt==1 or attempt%3==0:
            try:
                _,raw=fetch(f'https://api.github.com/repos/KKWANH/blog/commits/{SHA}/status')
                state=json.loads(raw)
                status={'state':state['state'],'statuses':[{'context':s['context'],'state':s['state'],'description':s.get('description'),'url':s.get('target_url')} for s in state['statuses']]}
                if report.get('deployment_status')!=status:
                    report['deployment_status']=status
                    print(json.dumps(status,indent=2),flush=True)
                if state['state'] in ['error','failure']:
                    raise RuntimeError('The deployment status reports a failure.')
            except urllib.error.HTTPError as error:
                report['status_read_error']=error.code
        _,html=fetch(BASE+'/about')
        if b'skill-explorer' in html and b'paper-business-card' in html:
            break
        time.sleep(20)
    else:
        raise RuntimeError('The production site did not update within the verification window.')

    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge',headless=True)
        page=browser.new_page(viewport={'width':1440,'height':1000})
        page.on('pageerror',lambda error:report['errors'].append(str(error)))
        page.goto(BASE+'/about',wait_until='domcontentloaded',timeout=90000)
        # Wait through the streamed route's temporary hidden/visible copies.
        page.wait_for_function('document.querySelectorAll(".skill-explorer").length===1 && document.querySelector(".skill-explorer").getBoundingClientRect().height>0',timeout=45000)
        expect(page.locator('.skill-explorer')).to_be_visible(timeout=45000)
        report['checks']['fourteen_skills']=page.locator('.skill-explorer .skill-lenses button').count()==14
        report['checks']['camera_first']=page.locator('.portrait-contact-sheet a').first.get_attribute('data-portrait')=='camera'
        report['checks']['equal_portrait_frames']=page.locator('.portrait-contact-sheet a').evaluate_all('items=>Math.max(...items.map(e=>e.offsetHeight))-Math.min(...items.map(e=>e.offsetHeight))<2')
        page.get_by_role('button',name='Mind map',exact=True).click()
        expect(page.locator('.skill-map-lines path')).to_have_count(4)
        report['checks']['mind_map_works']=True
        page.locator('.skill-explorer').get_by_role('button',name='React',exact=True).click()
        expect(page.locator('#career-evidence h3')).to_have_text('eBike operator interface')
        report['checks']['skill_context_correct']=True
        page.locator('.portrait-contact-sheet a').first.click()
        expect(page.get_by_role('dialog',name='Portraits')).to_be_visible()
        page.keyboard.press('ArrowRight')
        report['checks']['portrait_viewer']=page.get_by_role('dialog').locator('[role=status]').inner_text()=='2 / 3'
        page.keyboard.press('Escape')
        page.get_by_role('button',name='Icon list',exact=True).click()
        page.evaluate('scrollTo({top:0,behavior:"instant"})')
        page.screenshot(path=str(ROOT/'screenshots/release-live-about.png'),full_page=True)

        requests=[]
        page.on('request',lambda r:requests.append(r.url) if '.mp4' in r.url else None)
        page.goto(BASE+'/',wait_until='domcontentloaded')
        expect(page.get_by_role('button',name='Play the 16-second team demo',exact=True)).to_be_visible()
        report['checks']['video_not_automatically_loaded']=not requests and page.locator('video').count()==0
        page.get_by_role('button',name='Play the 16-second team demo',exact=True).click()
        page.wait_for_function('document.querySelector("video").currentTime>.1',timeout=45000)
        report['checks']['live_video_plays']=True
        page.goto(BASE+'/travel',wait_until='domcontentloaded')
        expect(page.get_by_role('group',name='Visited places map')).to_have_attribute('aria-busy','false',timeout=45000)
        report['checks']['live_atlas_map']=True
        # Python uses this machine's verified system trust. The separate
        # Playwright API client lacked a local issuer; TLS is not disabled.
        report['readback_transport']='Verified browser navigation and Python HTTPS system trust'
        _,atlas_body=fetch(BASE+'/api/travel')
        snapshot=json.loads(atlas_body)
        expected=json.loads(committed('contents/travel/places.json'))
        report['checks']['published_atlas_matches_commit']=snapshot['places']==expected['places']
        report['checks']['anonymous_editor_not_granted']=snapshot['editor'] is None
        report['atlas_records']=len(snapshot['places'])
        report['owner_signin_configured']=snapshot.get('ownerSignInAvailable',False)
        report['checks']['owner_entrance_present']=page.get_by_role('link',name='Edit atlas',exact=True).is_visible()
        report['checks']['private_studio_denied']=fetch(BASE+'/studio/index.html',True)[0]==404
        report['checks']['empty_gallery_unpublished']=fetch(BASE+'/photography',True)[0]==404
        pdf_status,pdf_body=fetch(BASE+'/CV.pdf')
        report['checks']['cv_matches_commit']=pdf_status==200 and hashlib.sha256(pdf_body).digest()==hashlib.sha256(committed('public/CV.pdf')).digest()
        report['checks']['contact_download']=fetch(BASE+'/contact.vcf')[0]==200
        report['checks']['new_brand_assets']=all(fetch(BASE+'/brands/'+name+'.svg')[0]==200 for name in ['c','git','docker','linux','typescript','javascript'])
        browser.close()
    report['observed_at']=datetime.now(timezone.utc).isoformat()
    report['passed']=all(report['checks'].values()) and not report['errors']
    (ROOT/'reviews/profile-release-live-readback.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps(report,indent=2),flush=True)
    return 0 if report['passed'] else 1


if __name__=='__main__':
    raise SystemExit(main())
