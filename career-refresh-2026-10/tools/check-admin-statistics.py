"""Isolated browser fixture. Never point this at the owner's primary editor."""
from pathlib import Path
import json, hashlib, time
from playwright.sync_api import sync_playwright, expect
expect.set_options(timeout=15000)

ROOT = Path(r'C:\Projects\career-refresh-2026-10\design\portfolio-review-2026-10-27')
REPO = Path(r'C:\Projects\blog')
BASE = 'http://localhost:3103'
fixture = Path(json.loads((ROOT/'browser-fixture-location.json').read_text(encoding='utf-8'))['directory'])
assert fixture.name.startswith('kwanho-admin-browser-') and fixture.parent.name == 'Temp'
assert not (fixture/'admin.json').exists(), 'Use a fresh, isolated fixture directory.'
report = {'mode': 'Real local handlers and browser cookies, isolated temporary files; not production Redis/OAuth', 'checks': {}, 'errors': []}
def check(name, value):
    report['checks'][name] = bool(value)
    assert value, name
def digest(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()
protected = [REPO/'contents/about/skill-profile.json', REPO/'contents/travel/places.json']
before = {str(file): digest(file) for file in protected}

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    owner = browser.new_context(viewport={'width':1440,'height':1000}, reduced_motion='reduce')
    page = owner.new_page()
    page.on('pageerror', lambda error: report['errors'].append(str(error)))
    page.goto(BASE+'/admin/setup', wait_until='networkidle', timeout=120000)
    expect(page.locator('#setup-password')).to_be_visible()
    password = 'Fixture browser passphrase 42!'
    page.locator('#setup-password').fill(password)
    page.locator('#setup-confirmation').fill(password)
    page.get_by_role('button', name='Create local admin access', exact=True).click()
    expect(page.get_by_role('heading', name='Local setup saved.', exact=True)).to_be_visible()
    check('fixture_only_configuration_created', (fixture/'admin.json').exists())
    check('plaintext_password_not_stored', password not in (fixture/'admin.json').read_text(encoding='utf-8'))
    page.get_by_role('link', name='Open admin sign-in', exact=True).click()
    expect(page.locator('#admin-password')).to_be_visible()
    page.locator('#admin-password').fill('Wrong fixture password')
    page.get_by_role('button', name='Sign in', exact=True).click()
    expect(page.locator('.admin-error[role="alert"]')).to_contain_text('did not succeed')
    check('failed_signin_clears_password_field', page.locator('#admin-password').input_value() == '')
    page.locator('#admin-password').fill(password)
    page.get_by_role('button', name='Sign in', exact=True).click()
    expect(page.get_by_text('Private owner session', exact=True)).to_be_visible()
    expect(page.locator('.admin-totals')).to_be_visible()
    admin_cookies = [cookie for cookie in owner.cookies() if cookie['name'] == 'kwanho-admin']
    check('admin_cookie_http_only_strict', len(admin_cookies) == 1 and admin_cookies[0]['httpOnly'] and admin_cookies[0]['sameSite'] == 'Strict')
    admin_replay = '; '.join(f"{cookie['name']}={cookie['value']}" for cookie in admin_cookies)
    check('setup_is_closed_after_creation', owner.request.get(BASE+'/api/admin/setup').status == 404)

    visitor = browser.new_context(viewport={'width':1280,'height':1000}, reduced_motion='reduce')
    view = visitor.new_page()
    view.on('pageerror', lambda error: report['errors'].append(str(error)))
    payloads = []
    view.on('request', lambda request: payloads.append(request.post_data_json) if request.url.endswith('/api/analytics/event') and request.method == 'POST' else None)
    view.goto(BASE+'/', referer='https://www.google.com/search?q=fixture-private-query', wait_until='networkidle', timeout=120000)
    view.wait_for_function("() => performance.getEntriesByType('resource').some(e=>e.name.includes('/api/analytics/event'))")
    check('anonymous_metrics_denied', visitor.request.get(BASE+'/api/admin/metrics').status == 401)
    check('no_visitor_or_control_cookie_before_choice', not any(cookie['name'] in ['kwanho-visits','kwanho-visit-control'] for cookie in visitor.cookies()))
    view.get_by_role('button', name='Privacy & statistics', exact=True).click()
    choice = view.get_by_label('Allow optional visitor/session cookies', exact=True)
    expect(choice).to_be_enabled()
    choice.click()
    expect(choice).to_be_checked()
    view.wait_for_timeout(250)
    check('consent_confirmed', visitor.request.get(BASE+'/api/analytics/status').json()['consented'])
    visitor_cookies = visitor.cookies()
    check('visitor_cookie_http_only_lax', any(cookie['name'] == 'kwanho-visits' and cookie['httpOnly'] and cookie['sameSite'] == 'Lax' for cookie in visitor_cookies))
    check('control_cookie_created_only_for_settings', any(cookie['name'] == 'kwanho-visit-control' and cookie['httpOnly'] for cookie in visitor_cookies))
    view.get_by_role('button', name='Close', exact=True).click()
    view.locator('header').get_by_role('link', name='About', exact=True).click()
    expect(view).to_have_url(BASE+'/about')
    view.wait_for_timeout(500)
    view.locator('header').get_by_role('link', name='Notes', exact=True).click()
    expect(view).to_have_url(BASE+'/notes')
    view.wait_for_timeout(600)
    data = owner.request.get(BASE+'/api/admin/metrics?days=7').json()
    check('real_fixture_views_counted', data['totals']['views'] >= 3)
    check('single_consented_visitor_and_session', data['totals']['visitors'] == 1 and data['totals']['sessions'] == 1)
    check('coarse_google_source', any(row['name'] == 'Google' and row['count'] >= 1 for row in data['referrals']))
    check('client_page_flows_recorded', any(row['from'] == '/' and row['to'] == '/about' for row in data['flows']) and any(row['from'] == '/about' and row['to'] == '/notes' for row in data['flows']))
    check('payload_drops_referrer_details', payloads and all('fixture-private-query' not in json.dumps(body) and 'google.com' not in json.dumps(body) for body in payloads))
    page.bring_to_front()
    page.get_by_role('button', name='Refresh', exact=True).click()
    expect(page.locator('.admin-totals')).to_be_visible()
    page.screenshot(path=str(ROOT/'captures/admin-fixture-desktop.png'), full_page=True)
    page.set_viewport_size({'width':390,'height':844})
    page.screenshot(path=str(ROOT/'captures/admin-fixture-mobile.png'), full_page=True)
    check('admin_mobile_no_document_overflow', page.evaluate('() => document.documentElement.scrollWidth <= innerWidth + 1'))

    view.bring_to_front()
    view.get_by_role('button', name='Privacy & statistics', exact=True).click()
    expect(choice).to_be_checked()
    choice.click()
    expect(choice).not_to_be_checked()
    view.wait_for_timeout(250)
    check('withdrawal_revokes_authority', visitor.request.get(BASE+'/api/analytics/status').json()['consented'] is False)
    check('optional_cookie_removed', not any(cookie['name'] == 'kwanho-visits' for cookie in visitor.cookies()))
    view.get_by_role('button', name='Close', exact=True).click()

    # Real shared-cookie tabs: one tab's latest withdrawal invalidates an older
    # revision proof held by another tab.
    first_control = visitor.request.post(BASE+'/api/analytics/preference', data='{}', headers={'origin':BASE,'content-type':'application/json'}).json()
    tab = visitor.new_page()
    tab.goto(BASE+'/about', wait_until='networkidle')
    visitor.request.post(BASE+'/api/analytics/consent', data='{"enabled":false}', headers={'origin':BASE,'content-type':'application/json'})
    stale = visitor.request.post(BASE+'/api/analytics/consent', data='{"enabled":true}', headers={'origin':BASE,'content-type':'application/json','x-visitor-preference':first_control['preferenceToken']})
    check('shared_tab_stale_grant_conflicts', stale.status == 409)
    check('withdrawal_remains_effective', visitor.request.get(BASE+'/api/analytics/status').json()['consented'] is False)
    tab.close()

    signal = browser.new_context(extra_http_headers={'sec-gpc':'1'}, reduced_motion='reduce')
    signal_page = signal.new_page()
    before_signal = owner.request.get(BASE+'/api/admin/metrics').json()['totals']['views']
    signal_page.goto(BASE+'/about', wait_until='networkidle')
    signal_page.wait_for_timeout(300)
    check('gpc_suppresses_collection', owner.request.get(BASE+'/api/admin/metrics').json()['totals']['views'] == before_signal)
    signal.close()

    page.bring_to_front()
    page.get_by_role('button', name='Sign out', exact=True).click()
    expect(page.locator('#admin-password')).to_be_visible()
    replay = owner.request.get(BASE+'/api/admin/metrics', headers={'cookie':admin_replay})
    check('copied_admin_cookie_rejected_after_logout', replay.status == 401)
    check('fixture_maps_not_mutated', not (fixture/'travel.json').exists() and not (fixture/'skills.json').exists())
    report['fixture_totals'] = data['totals']
    report['payloads'] = payloads
    visitor.close(); owner.close(); browser.close()

report['protected_file_hashes_unchanged'] = all(digest(file) == before[str(file)] for file in protected)
check('real_owner_files_unchanged_by_fixture', report['protected_file_hashes_unchanged'])
report['passed'] = all(report['checks'].values()) and not report['errors']
(ROOT/'admin-browser-checks.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
assert report['passed']
