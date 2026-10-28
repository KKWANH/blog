from pathlib import Path
import json, urllib.request, urllib.error
from playwright.sync_api import sync_playwright, expect

ROOT=Path(r'C:\Projects\career-refresh-2026-10\design\portfolio-review-2026-10-27')
REPO=Path(r'C:\Projects\blog')
BASE='http://localhost:3102'
report={'mode':'Production build, fresh browser context per route, initial viewport only','routes':{},'checks':{},'errors':[]}
def check(name,value):
    report['checks'][name]=bool(value)
    assert value,name

with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True)
    for route in ['/','/about','/travel']:
        context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        page=context.new_page();page.on('pageerror',lambda error:report['errors'].append(str(error)))
        page.add_init_script('window.__lcp=0;new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime}).observe({type:"largest-contentful-paint",buffered:true})')
        response=page.goto(BASE+route,wait_until='networkidle',timeout=90000);page.wait_for_timeout(700)
        data=page.evaluate("""()=>({lcp:window.__lcp,resources:performance.getEntriesByType('resource').map(e=>({path:new URL(e.name).pathname,type:e.initiatorType,encoded:e.encodedBodySize,decoded:e.decodedBodySize,transfer:e.transferSize}))})""")
        data['initial_js_encoded']=sum(r['encoded'] for r in data['resources'] if r['path'].endswith('.js'))
        data['initial_total_encoded']=sum(r['encoded'] for r in data['resources'])
        report['routes'][route]=data
        if route=='/':
            check('public_frame_denial',response.headers.get('x-frame-options')=='DENY' and "frame-ancestors 'none'" in response.headers.get('content-security-policy',''))
        if route=='/about':
            check('details_not_loaded_initially',not any('/api/repositories/' in r['path'] for r in data['resources']))
            check('video_not_downloaded_initially',not any('.mp4' in r['path'] for r in data['resources']))
            check('broad_role',page.locator('.paper-card-role').inner_text()=='Software Engineer')
            check('flat_skill_groups',page.locator('.skill-family').evaluate_all('items=>items.every(e=>getComputedStyle(e).borderTopWidth==="0px")'))
            profile=json.loads((REPO/'contents/about/skill-profile.json').read_text(encoding='utf-8'))
            visible=page.locator('.skill-lenses [data-skill-id]').evaluate_all('items=>items.map(e=>({id:e.dataset.skillId,level:e.querySelector(".skill-level-badge")?.getAttribute("data-level")??null}))')
            check('real_owner_levels_match_file',all(item['level']==profile['entries'].get(item['id'],{}).get('level') for item in visible))
            check('repository_only_container_choice_retained',profile['entries']['containers']['visibility']=='repository' and not any(item['id']=='containers' for item in visible))
            report['owner_profile']={'overrides':len(profile['entries']),'visible':len(visible),'rated_visible':sum(item['level'] is not None for item in visible)}
            check('two_featured_projects',page.locator('.selected-work-record').count()==2)
            check('color_saves_life_expanded',page.locator('#project-details-color-saves-life').is_visible())
            page.screenshot(path=str(ROOT/'captures/after-about-top.png'))
            page.locator('#skills').scroll_into_view_if_needed();page.screenshot(path=str(ROOT/'captures/after-skills.png'))
            page.locator('#selected-work').scroll_into_view_if_needed();page.screenshot(path=str(ROOT/'captures/after-selected-work.png'))
            requested=[];page.on('request',lambda request:requested.append(request.url) if '.mp4' in request.url else None)
            expect(page.get_by_role('button',name='Play the 16-second team demo',exact=True)).to_be_visible()
            check('expansion_does_not_start_video',not requested and page.locator('.selected-work video').count()==0)
            page.locator('#project-summary-piracer-instrument').click()
            expect(page.locator('#project-details-piracer-instrument')).to_be_visible()
            check('piracer_expanded_on_click',page.locator('#project-details-piracer-instrument').is_visible())
            page.set_viewport_size({'width':390,'height':844});page.evaluate('()=>scrollTo(0,0)');page.screenshot(path=str(ROOT/'captures/after-about-mobile.png'))
        context.close()
    context=browser.new_context(viewport={'width':1280,'height':1000},reduced_motion='reduce');page=context.new_page()
    page.on('pageerror',lambda error:report['errors'].append(str(error)))
    context.route('**/api/admin/session',lambda route:route.fulfill(status=200,json={'configured':True,'authenticated':False,'setupAvailable':False}))
    page.goto(BASE+'/',wait_until='networkidle');before=page.evaluate('()=>performance.timeOrigin')
    with page.expect_navigation(wait_until='networkidle') as navigation:page.get_by_role('link',name='Owner tools',exact=True).click()
    response=navigation.value;policy=response.headers.get('content-security-policy','')
    expect(page.locator('#admin-password')).to_be_visible()
    after=page.evaluate('()=>performance.timeOrigin')
    check('admin_full_document_entry',before!=after)
    check('admin_nonce_csp',"'nonce-" in policy and "'strict-dynamic'" in policy and "'unsafe-eval'" not in policy)
    check('admin_private_cache','no-store' in response.headers.get('cache-control',''))
    check('no_internal_cookie_header',not any('middleware-request-cookie' in key for key in response.headers))
    nonces=page.locator('script').evaluate_all('items=>items.filter(e=>e.nonce).map(e=>e.nonce)')
    check('html_nonces_match_policy',bool(nonces) and all(f"'nonce-{value}'" in policy for value in nonces))
    with page.expect_navigation(wait_until='networkidle') as navigation:page.get_by_role('link',name='kwanho.dev',exact=True).click()
    check('admin_exit_new_document',page.evaluate('()=>performance.timeOrigin')!=after)
    check('public_does_not_retain_admin_csp','strict-dynamic' not in navigation.value.headers.get('content-security-policy',''))
    context.close();browser.close()

for route in ['/api/admin/setup','/studio/index.html','/media/about/index.tsx','/media/about/skill-profile.json']:
    try:
        with urllib.request.urlopen(BASE+route,timeout=20) as response:status=response.status
    except urllib.error.HTTPError as error:status=error.code
    check('denied_'+route,status in [403,404])
for route in ['/api/skills','/api/travel']:
    with urllib.request.urlopen(BASE+route,timeout=20) as response:data=json.load(response)
    check('public_readonly_'+route,data.get('editor') is None)
index=json.loads((REPO/'contents/about/repositories.index.json').read_text(encoding='utf-8'))
catalogue=json.loads((REPO/'contents/about/repositories.generated.json').read_text(encoding='utf-8'))
for repository in catalogue['repositories']:
    with urllib.request.urlopen(BASE+'/api/repositories/'+repository['name']+'?revision='+index['revision'],timeout=20) as response:
        assert json.load(response)['repository']==repository
check('all_74_lazy_records_match_reviewed_sources',len(catalogue['repositories'])==74)
before=json.loads((ROOT/'performance-before.json').read_text(encoding='utf-8'))
report['comparison']={route:{'js_before':before['routes'][route]['initial_js_encoded'],'js_after':value['initial_js_encoded'],'total_before':before['routes'][route]['initial_total_encoded'],'total_after':value['initial_total_encoded']} for route,value in report['routes'].items()}
report['index_bytes']=(REPO/'contents/about/repositories.index.json').stat().st_size
report['full_catalogue_bytes']=(REPO/'contents/about/repositories.generated.json').stat().st_size
traces=[json.loads(file.read_text(encoding='utf-8')) for file in (REPO/'.next/server').rglob('*.nft.json')]
files=[name.replace('\\','/') for trace in traces for name in trace.get('files',[])]
check('typescript_compiler_not_in_server_trace',not any('typescript/lib/typescript.js' in name for name in files))
check('private_state_not_in_server_trace',not any(name.endswith(('/admin-config.json','/private-state.json','/owner-sessions.json','/admin.json')) for name in files))
report['passed']=all(report['checks'].values()) and not report['errors']
(ROOT/'production-performance-security.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({key:value for key,value in report.items() if key!='routes'},indent=2))
assert report['passed']
