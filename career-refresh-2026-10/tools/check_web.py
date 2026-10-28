"""Local browser evidence for the portfolio rebrand; no deployment or account access."""
from pathlib import Path
import argparse
import json
import sys
import urllib.request
from urllib.error import HTTPError

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools" / "python"))
from playwright.sync_api import sync_playwright


def clean_capture(page):
    page.mouse.move(0, 0)
    page.evaluate("() => { document.activeElement?.blur(); window.scrollTo({top:0,left:0,behavior:'instant'}); }")
    page.wait_for_function("window.scrollY === 0")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="http://127.0.0.1:3100")
    parser.add_argument("--round", choices=("1", "2", "3"), required=True)
    args = parser.parse_args()
    report = {"base": args.base, "round": args.round, "completed": False, "browser": "Microsoft Edge, headless",
              "routes": [], "negative_routes": [], "responsive": [], "large_text": [], "accessibility": [], "interactions": {},
              "runtime_errors": [], "limitations": [
                  "Automated axe findings do not establish full accessibility conformance.",
                  "No screen-reader, real touch-device or field-performance test.",
                  "External project applications and account actions are outside this check.",
              ]}
    contents = Path(r"C:\Projects\blog\contents")
    paths = {"/"}
    for source in contents.rglob("index.*"):
        if source.suffix in (".md", ".tsx") and not any(p.startswith("_") for p in source.relative_to(contents).parts):
            paths.add("/" + source.parent.relative_to(contents).as_posix())
    for route in sorted(paths):
        try:
            with urllib.request.urlopen(args.base + route, timeout=45) as response:
                report["routes"].append({"path": route, "status": response.status})
        except HTTPError as error:
            report["routes"].append({"path": route, "status": error.code})
    for route, expected in [("/not-a-real-page",404),("/notes/not-a-real-note",404),("/%65ditor",200),("/projects/%61riadne",200)]:
        try:
            with urllib.request.urlopen(args.base+route, timeout=45) as response:
                status = response.status
        except HTTPError as error:
            status = error.code
        report["negative_routes"].append({"path":route,"status":status,"expected":expected,"passed":status==expected})

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 1000}, color_scheme="light")
        page = context.new_page()
        page.on("pageerror", lambda error: report["runtime_errors"].append(str(error)))
        routes = ["/", "/editor", "/projects/ariadne", "/notes/device-readback", "/notes/semiconductor", "/notes/ai", "/notes/kla", "/travel"]
        for route in routes:
            page.goto(args.base + route, wait_until="networkidle", timeout=90000)
            page.evaluate("document.fonts.ready")
            for width in (320, 390, 768, 1440):
                page.set_viewport_size({"width": width, "height": 900})
                size = page.evaluate("""() => ({
                    width: innerWidth, content: document.documentElement.scrollWidth,
                    font: getComputedStyle(document.body).fontFamily,
                    h1: document.querySelectorAll('h1').length
                })""")
                report["responsive"].append({"path": route, **size, "overflow": size["content"] > width + 1})
            page.add_script_tag(path=str(ROOT / "tools" / "axe.min.js"))
            audit = page.evaluate("""async () => {
                const result = await axe.run({exclude: [['nextjs-portal']]}, {
                    runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa']}
                });
                return {
                    violations: result.violations.map(v => ({
                        id: v.id, impact: v.impact, help: v.help,
                        nodes: v.nodes.slice(0, 6).map(n => ({target:n.target, summary:n.failureSummary, html:n.html}))
                    })),
                    incomplete: result.incomplete.length
                };
            }""")
            report["accessibility"].append({"path": route, **audit})
            if route == "/":
                page.evaluate("document.documentElement.style.fontSize='200%'")
                for width in (320, 390, 768):
                    page.set_viewport_size({"width": width, "height": 900})
                    size = page.evaluate("({viewport:innerWidth,content:document.documentElement.scrollWidth})")
                    report["large_text"].append({**size, "overflow": size["content"] > width + 1})
                page.evaluate("document.documentElement.style.fontSize=''")

        checkpoint = ROOT / "reviews" / f"web-check-round-{args.round}.json"
        checkpoint.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(args.base, wait_until="networkidle")
        menu = page.get_by_role("button", name="Menu", exact=True)
        menu.click()
        page.keyboard.press("Tab")
        report["interactions"]["tab_enters_open_navigation"] = page.evaluate(
            "!!document.activeElement.closest('#main-navigation')")
        page.keyboard.press("Escape")
        report["interactions"]["escape_closes_menu"] = menu.get_attribute("aria-expanded") == "false"
        report["interactions"]["escape_restores_menu_focus"] = menu.evaluate("(e) => e === document.activeElement")
        menu.click()
        page.locator("#main-navigation").get_by_role("link", name="Notes", exact=True).click()
        page.wait_for_url(args.base + "/notes", timeout=15000)
        report["interactions"]["mobile_navigation_reaches_notes"] = page.url.endswith("/notes")

        page.goto(args.base, wait_until="networkidle")
        disclosure = page.locator(".project-details").first
        disclosure.locator("summary").focus()
        page.keyboard.press("Enter")
        report["interactions"]["implementation_disclosure_opens"] = disclosure.get_attribute("open") is not None
        page.keyboard.press("Space")
        report["interactions"]["implementation_disclosure_closes"] = disclosure.get_attribute("open") is None
        page.evaluate("""() => {
            window.testCopies = [];
            window.testCopyMessages = [];
            window.testCopyFocus = [];
            const status = document.querySelector('.copy-email [role="status"]');
            new MutationObserver(() => window.testCopyMessages.push(status.textContent))
                .observe(status, {childList:true,subtree:true,characterData:true});
            Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{
                writeText: async text => {
                    await new Promise(resolve => setTimeout(resolve, 70));
                    window.testCopyFocus.push(document.activeElement.getAttribute('aria-disabled') === 'true');
                    window.testCopies.push(text);
                }
            }});
        }""")
        for attempt in range(2):
            page.get_by_role("button", name="Copy email address", exact=True).click()
            page.wait_for_function(f"window.testCopies.length === {attempt + 1}")
            page.get_by_role("status").filter(has_text="Email address copied.").wait_for()
        report["interactions"]["repeated_copy_feedback_with_stub"] = page.evaluate(
            "testCopies.length === 2 && testCopies.every(value => value === 'contact@kwanho.dev')")
        report["interactions"]["two_copy_status_transitions"] = page.evaluate(
            "testCopyMessages.filter(x=>x==='Copying email address…').length===2 && testCopyMessages.filter(x=>x==='Email address copied.').length===2")
        report["interactions"]["copy_keeps_focus_while_pending"] = page.evaluate(
            "testCopyFocus.length===2 && testCopyFocus.every(Boolean)")
        page.evaluate("() => { navigator.clipboard.writeText = async () => { throw new Error('Permission denied'); }; }")
        page.get_by_role("button", name="Copy email address", exact=True).click()
        page.get_by_role("status").filter(has_text="Could not copy.").wait_for()
        report["interactions"]["copy_failure_has_email_link"] = page.get_by_role(
            "link", name="contact@kwanho.dev", exact=True).get_attribute("href") == "mailto:contact@kwanho.dev"
        page.get_by_role("button", name="Use dark theme").click()
        page.reload(wait_until="networkidle")
        report["interactions"]["theme_persists"] = page.locator("html").evaluate("(e) => e.classList.contains('dark')")
        clean_capture(page)
        page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-dark-mobile.png"), full_page=True)
        page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-dark-top.png"))
        page.get_by_role("button", name="Use light theme").click()
        page.set_viewport_size({"width": 1440, "height": 1000})
        clean_capture(page)
        page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-desktop.png"), full_page=True)
        page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-desktop-top.png"))
        page.set_viewport_size({"width": 390, "height": 844})
        clean_capture(page)
        page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-mobile.png"), full_page=True)
        page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-mobile-top.png"))

        page.goto(args.base + "/notes/device-readback", wait_until="networkidle")
        page.locator(".reading-toc > summary").click()
        target = page.locator(".reading-toc a").first
        target_id = target.get_attribute("href")
        target.click()
        report["interactions"]["toc_target_exists"] = page.locator(target_id).count() == 1
        clean_capture(page)
        page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-article-mobile.png"), full_page=True)
        page.set_viewport_size({"width":1440,"height":1000})
        for route, name in [("/editor","about"),("/travel","travel"),("/notes/semiconductor","archive")]:
            page.goto(args.base+route, wait_until="networkidle", timeout=90000)
            clean_capture(page)
            page.screenshot(path=str(ROOT / "screenshots" / f"blog-round-{args.round}-{name}.png"))
        blocked = browser.new_context(color_scheme="dark", viewport={"width":390,"height":844})
        blocked.add_init_script("""
            Object.defineProperty(window, 'localStorage', {
                get() { throw new DOMException('Storage blocked', 'SecurityError'); }
            });
        """)
        blocked_page = blocked.new_page()
        blocked_page.goto(args.base, wait_until="networkidle")
        report["interactions"]["blocked_storage_uses_dark_system"] = blocked_page.locator("html").evaluate(
            "(e)=>e.classList.contains('dark')")
        blocked_page.get_by_role("button", name="Use light theme").click()
        blocked_page.emulate_media(color_scheme="light")
        blocked_page.emulate_media(color_scheme="dark")
        blocked_page.wait_for_timeout(150)
        report["interactions"]["manual_theme_survives_blocked_storage_os_change"] = blocked_page.locator("html").evaluate(
            "(e)=>!e.classList.contains('dark')")
        blocked.close()
        browser.close()

    report["completed"] = True
    report["passed"] = (
        all(r["status"] == 200 for r in report["routes"])
        and all(r["passed"] for r in report["negative_routes"])
        and not any(r["overflow"] for r in report["responsive"])
        and not any(r["overflow"] for r in report["large_text"])
        and not any(r["violations"] for r in report["accessibility"])
        and all(report["interactions"].values())
        and not report["runtime_errors"]
    )
    output = ROOT / "reviews" / f"web-check-round-{args.round}.json"
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "passed": report["passed"],
        "route_count": len(report["routes"]),
        "negative_routes": report["negative_routes"],
        "overflow": [r for r in report["responsive"] if r["overflow"]],
        "large_text": report["large_text"],
        "accessibility": [{"path": r["path"], "violations": [v["id"] for v in r["violations"]]} for r in report["accessibility"]],
        "interactions": report["interactions"],
        "runtime_errors": report["runtime_errors"],
        "report": str(output),
    }, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
