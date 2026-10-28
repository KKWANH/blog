from pathlib import Path
import sys, json, hashlib, time

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools" / "python"))
from playwright.sync_api import sync_playwright, expect

BASE = "http://127.0.0.1:3100"
SOURCE = Path(r"C:\Projects\blog\contents\travel\places.json")


def capture(page, name, full=False):
    page.mouse.move(0, 0)
    page.evaluate("() => { document.activeElement?.blur(); scrollTo({top:0,left:0,behavior:'instant'}); }")
    page.screenshot(path=str(ROOT / "screenshots" / f"green-{name}.png"), full_page=full)


def main():
    original = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
    result = {"checks": {}, "errors": [], "responsive": [], "audits": []}
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(viewport={"width":1440,"height":1000}, color_scheme="light")
        page = context.new_page()
        page.on("pageerror", lambda error: result["errors"].append(str(error)))
        page.goto(BASE, wait_until="networkidle", timeout=90000)
        result["checks"]["hero_photo"] = page.locator('.window-photo img').get_attribute('src') == '/window-portrait.webp'
        capture(page, "home-desktop")
        page.get_by_role("link", name="Open my card").click()
        page.wait_for_url("**/about")
        expect(page.locator("h1")).to_have_text("Kwanho Kim.")
        result["checks"]["identity_photo_on_card"] = page.locator('.card-portrait img').get_attribute('src') == '/contact-portrait.webp'
        capture(page, "card-desktop", True)
        page.get_by_role("button", name="Recruiter brief").click()
        brief = page.get_by_role("dialog", name="Quick brief")
        expect(brief).to_be_visible()
        expect(brief).to_contain_text("Aug 2026")
        expect(brief).to_contain_text("digital.auto")
        page.evaluate("() => { window.testCopy=''; Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.testCopy=text;}}}); }")
        brief.get_by_role("button", name="Copy brief", exact=True).click()
        expect(brief.get_by_role("status")).to_contain_text("Recruiter brief copied.")
        result["checks"]["recruiter_copy"] = page.evaluate("testCopy.includes('early implementation') && testCopy.includes('digital.auto')")
        page.screenshot(path=str(ROOT / "screenshots/green-recruiter-brief.png"))
        page.keyboard.press("Escape")
        expect(brief).not_to_be_visible()
        result["checks"]["brief_focus_return"] = page.get_by_role("button",name="Recruiter brief").evaluate("(e)=>document.activeElement===e")
        vcard = page.request.get(BASE + "/contact.vcf")
        result["checks"]["vcard_download"] = vcard.status == 200 and "BEGIN:VCARD" in vcard.text() and "contact@kwanho.dev" in vcard.text()
        result["checks"]["legacy_about_redirect"] = page.request.get(BASE + "/editor").url.endswith("/about")

        # Delayed bootstrap must not replace an identical map-data array mid-load.
        def delayed_api(route):
            if route.request.method == "GET": time.sleep(.7)
            route.continue_()
        page.route("**/api/travel", delayed_api)
        page.goto(BASE + "/travel", wait_until="networkidle", timeout=90000)
        page.unroute("**/api/travel", delayed_api)
        expect(page.get_by_role("button",name="Manage places",exact=True)).to_be_visible()
        expect(page.get_by_role("group",name="Visited places map")).to_have_attribute("aria-busy","false",timeout=30000)
        result["checks"]["map_after_delayed_bootstrap"] = page.locator(".map-recovery").count() == 0
        capture(page, "atlas-desktop")
        page.get_by_role("button",name="Manage places",exact=True).click()
        page.get_by_role("button",name="Add place",exact=True).click()
        form = page.get_by_role("dialog",name="Add a place")
        form.get_by_label("Place name",exact=True).fill("QA Field Notebook")
        form.get_by_label("Country",exact=True).select_option("NL")
        form.get_by_label("Time spent",exact=True).select_option("2-plus-days")
        form.get_by_label("Latitude",exact=True).fill("52.1")
        form.get_by_label("Longitude",exact=True).fill("4.3")
        page.screenshot(path=str(ROOT / "screenshots/green-place-form.png"))
        form.get_by_role("button",name="Save place",exact=True).click()
        expect(form).not_to_be_visible()
        expect(page.locator(".atlas-live")).to_contain_text("QA Field Notebook saved.")
        search = page.get_by_role("searchbox",name="Find a city or country",exact=True)
        search.fill("QA Field Notebook")
        expect(page.locator(".place-list > li")).to_have_count(1)
        result["checks"]["create_visible"] = True
        page.reload(wait_until="networkidle")
        page.get_by_role("searchbox",name="Find a city or country",exact=True).fill("QA Field Notebook")
        expect(page.locator(".place-list > li")).to_have_count(1)
        result["checks"]["reload_persistence"] = True
        page.get_by_role("button",name="Manage places",exact=True).click()
        page.get_by_role("button",name="Edit QA Field Notebook, Netherlands",exact=True).click()
        form = page.get_by_role("dialog",name="Edit QA Field Notebook")
        form.get_by_label("Place name",exact=True).fill("QA Revised Notebook")
        form.get_by_label("Time spent",exact=True).select_option("lived-there")
        form.get_by_role("button",name="Save place",exact=True).click()
        expect(form).not_to_be_visible()
        search = page.get_by_role("searchbox",name="Find a city or country",exact=True)
        search.fill("QA Revised Notebook")
        expect(page.locator(".place-list > li")).to_have_count(1)
        expect(page.locator(".place-list")).to_contain_text("Lived there")
        result["checks"]["edit_visible"] = True
        page.get_by_role("button",name="Edit QA Revised Notebook, Netherlands",exact=True).click()
        form = page.get_by_role("dialog",name="Edit QA Revised Notebook")
        form.get_by_role("button",name="Remove this place",exact=True).click()
        form.get_by_role("button",name="Remove place",exact=True).click()
        expect(form).not_to_be_visible()
        expect(page.locator(".place-list > li")).to_have_count(0)
        result["checks"]["remove_visible"] = True
        page.get_by_role("button",name="Undo removal of QA Revised Notebook",exact=True).click()
        expect(page.locator(".place-list > li")).to_have_count(1)
        result["checks"]["undo_visible"] = True

        data = page.request.get(BASE + "/api/travel").json()
        entry = next(place for place in data["places"] if place["city"] == "QA Revised Notebook")
        result["persisted_test_entry"] = entry
        invalid = page.request.delete(BASE + "/api/travel", data={"id":entry["id"],"revision":data["revision"]}, headers={"Origin":"https://elsewhere.example","x-travel-editor-token":data["editor"]["token"]})
        result["checks"]["foreign_origin_denied"] = invalid.status == 403
        invalid = page.request.delete(BASE + "/api/travel", data={"id":entry["id"],"revision":data["revision"]}, headers={"Origin":BASE})
        result["checks"]["missing_token_denied"] = invalid.status == 403
        after = page.request.get(BASE + "/api/travel").json()
        result["checks"]["denied_requests_preserve_revision"] = data["revision"] == after["revision"]
        result["checks"]["map_survives_updates"] = page.locator(".map-recovery").count() == 0

        for route in ["/","/about","/travel"]:
            page.goto(BASE + route, wait_until="networkidle")
            for width in [320,390,768,1440]:
                page.set_viewport_size({"width":width,"height":900})
                measured=page.evaluate("({width:innerWidth,content:document.documentElement.scrollWidth})")
                result["responsive"].append({"path":route,**measured,"pass":measured["content"]<=width+1})
            page.add_script_tag(path=str(ROOT/"tools/axe.min.js"))
            findings=page.evaluate("async()=>{const r=await axe.run({exclude:[['nextjs-portal']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,nodes:v.nodes.slice(0,5).map(n=>({target:n.target,summary:n.failureSummary}))}));}")
            result["audits"].append({"path":route,"violations":findings})
            page.set_viewport_size({"width":390,"height":844})
            capture(page, f"{route.strip('/') or 'home'}-mobile", True)
        browser.close()
    result["checks"]["original_atlas_untouched"] = hashlib.sha256(SOURCE.read_bytes()).hexdigest() == original
    result["passed"] = all(result["checks"].values()) and all(r["pass"] for r in result["responsive"]) and not any(a["violations"] for a in result["audits"]) and not result["errors"]
    (ROOT/"reviews/revision-ui-checks.json").write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(result,ensure_ascii=False,indent=2))


if __name__ == "__main__":
    main()
