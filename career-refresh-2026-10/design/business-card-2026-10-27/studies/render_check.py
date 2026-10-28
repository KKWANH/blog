"""Render the local stationery studies with the existing Python 3.13 / Edge.

No install, server, app edit, remote request, or write outside studies/ is needed.
Example (PowerShell, environment applies only to this process):
  $env:PYTHONPATH='C:/Projects/career-refresh-2026-10/tools/python'
  $env:PYTHONDONTWRITEBYTECODE='1'
  & 'C:/Program Files/Python313/python.exe' -B ./render_check.py
"""

from __future__ import annotations

import io
import json
import os
import shutil
import tempfile
import sys
import time
from pathlib import Path

BASE = Path(__file__).resolve().parent
TEMP = BASE / ".render-tmp"
EDGE = Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe")
TEMP.mkdir(exist_ok=True)
for folder in ("temp", "profile", "cache", "crashes", "downloads", "local-appdata", "appdata"):
    (TEMP / folder).mkdir(exist_ok=True)
os.environ["TEMP"] = str(TEMP / "temp")
os.environ["TMP"] = str(TEMP / "temp")
os.environ["PYTHONDONTWRITEBYTECODE"] = "1"
tempfile.tempdir = str(TEMP / "temp")

from PIL import Image, ImageDraw, ImageFont  # noqa: E402
from playwright.sync_api import sync_playwright  # noqa: E402


AUDIT = r"""
() => {
  const round = n => Math.round(n * 100) / 100;
  const cards = [...document.querySelectorAll("article.study .paper")].map(card => {
    const b = card.getBoundingClientRect();
    const textOutside = [];
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of range.getClientRects()) {
        if (r.width < .1 || r.height < .1) continue;
        if (r.left < b.left + 3 || r.right > b.right - 3 ||
            r.top < b.top + 3 || r.bottom > b.bottom - 3) {
          textOutside.push({text: node.textContent.trim(), x: round(r.x-b.x),
            y: round(r.y-b.y), width: round(r.width), height: round(r.height)});
        }
      }
    }
    const elements = [...card.querySelectorAll("h3, p, a, .photo-portrait")];
    const collisions = [];
    for (let i=0; i<elements.length; i++) {
      for (let j=i+1; j<elements.length; j++) {
        const a = elements[i], c = elements[j];
        if (a.contains(c) || c.contains(a)) continue;
        const x = a.getBoundingClientRect(), y = c.getBoundingClientRect();
        const overlapX = Math.min(x.right,y.right) - Math.max(x.left,y.left);
        const overlapY = Math.min(x.bottom,y.bottom) - Math.max(x.top,y.top);
        if (overlapX > 1 && overlapY > 1)
          collisions.push([a.className || a.textContent.trim(), c.className || c.textContent.trim()]);
      }
    }
    const fontSizes = [...card.querySelectorAll("h3,p,a,span")]
      .map(el => parseFloat(getComputedStyle(el).fontSize));
    const content = card.innerText.toLowerCase().replace(/\s+/g, " ").trim();
    const identity = ["kwanho kim", "c++ software engineer", "leuven, belgium",
      "contact@kwanho.dev", "kwanho.dev"].every(s => content.includes(s));
    const normalRatio = Number(card.dataset.ratio);
    return {
      id: card.closest(".study").id,
      width: round(b.width), height: round(b.height),
      expectedRatio: normalRatio, actualRatio: round(b.width / b.height),
      physicalRatio: Math.abs(b.height - b.width/normalRatio) < .1,
      minFontPx: Math.min(...fontSizes), identity,
      horizontalOverflow: card.scrollWidth > card.clientWidth + 1,
      verticalOverflow: card.scrollHeight > card.clientHeight + 1,
      textOutside, collisions
    };
  });
  return {
    viewport: innerWidth,
    rootFontPx: parseFloat(getComputedStyle(document.documentElement).fontSize),
    documentWidth: document.documentElement.scrollWidth,
    documentOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    loadedFigtree: document.fonts.check("400 16px Figtree"),
    imageErrors: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
    actionsMinHeight: Math.min(...[...document.querySelectorAll(".web-actions a")]
      .map(a => a.getBoundingClientRect().height)),
    cards
  };
}
"""


def ready(page):
    page.evaluate("() => document.fonts.ready")
    page.evaluate("() => Promise.all([...document.images].map(i => i.decode().catch(() => null)))")
    page.wait_for_timeout(100)


def make_contact_sheet(mobile_images, audit):
    """Two real viewport widths, without resizing either column's screenshots."""
    bg = "#eae8e0"
    ink = "#25342c"
    muted = "#526158"
    title_font = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 28)
    label_font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 16)
    small_font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 12)
    concepts = ["Cotton impression", "Forest edge", "Photographic margin", "Swiss register", "Vellum & portrait"]
    ids = ["cotton", "forest", "photographic", "swiss", "vellum"]
    margin, gutter, header, row_label, row_gap = 24, 24, 132, 32, 28
    left_width, right_width = 390, 320
    width = margin * 2 + left_width + gutter + right_width
    rows = [max(mobile_images[390][i].height, mobile_images[320][i].height) for i in range(5)]
    height = header + sum(rows) + 5 * (row_label + row_gap) + 74
    sheet = Image.new("RGB", (width, height), bg)
    draw = ImageDraw.Draw(sheet)
    draw.text((margin, 22), "Five paper introductions", font=title_font, fill=ink)
    draw.text((margin, 62), "Mobile contact sheet  /  real CSS pixels; no screenshot scaling", font=label_font, fill=muted)
    draw.text((margin, 99), "390 px viewport  /  358 px card", font=small_font, fill=ink)
    right_x = margin + left_width + gutter
    draw.text((right_x, 99), "320 px viewport  /  288 px card", font=small_font, fill=ink)
    y = header
    for i, (concept, card_id) in enumerate(zip(concepts, ids)):
        draw.text((margin, y), f"{i+1:02d}  {concept}", font=label_font, fill=ink)
        y += row_label
        sheet.paste(mobile_images[390][i], (margin, y))
        sheet.paste(mobile_images[320][i], (right_x, y))
        y += rows[i] + row_gap
    normal_status = (
        "Normal type: all five physical ratios retained at both widths. Contact text is at least 12 px."
        if not any(issue.startswith("normal ") for issue in audit["issues"])
        else "Normal type: fit review needed; see verification.json."
    )
    enlarged_status = (
        "200% root type: live cards grow vertically instead of clipping. See verification.json for measured checks."
        if not any(issue.startswith("enlarged ") for issue in audit["issues"])
        else "200% root type: fit review needed; see verification.json."
    )
    draw.text((margin, y + 6), normal_status, font=small_font, fill=muted)
    draw.text((margin, y + 25), enlarged_status, font=small_font, fill=muted)
    draw.text((margin, y + 44), "Digital stock/ink cues are proposals, not evidence of an actual print process.", font=small_font, fill=muted)
    sheet.save(BASE / "mobile-contact-sheet-390-320.png")


def main():
    report = {
        "page": (BASE / "index.html").as_uri(),
        "engine": "Installed Microsoft Edge / Playwright; headless; device scale factor 1",
        "scope": "All authored files, screenshots, browser profile and temp files are under studies/.",
        "remoteRequests": [],
        "consoleErrors": [],
        "pageErrors": [],
        "normal": [],
        "enlarged": [],
        "issues": [],
    }
    mobile_images = {}
    with sync_playwright() as playwright:
        env = dict(os.environ)
        env["LOCALAPPDATA"] = str(TEMP / "local-appdata")
        env["APPDATA"] = str(TEMP / "appdata")
        context = playwright.chromium.launch_persistent_context(
            user_data_dir=str(TEMP / "profile"),
            executable_path=str(EDGE),
            headless=True,
            viewport={"width": 1440, "height": 1040},
            device_scale_factor=1,
            has_touch=True,
            reduced_motion="reduce",
            accept_downloads=False,
            downloads_path=str(TEMP / "downloads"),
            env=env,
            args=[
                "--no-first-run", "--no-default-browser-check",
                "--disable-background-networking", "--disable-component-update",
                "--disable-breakpad", "--disable-crash-reporter",
                "--disable-sync",
                f"--disk-cache-dir={TEMP / 'cache'}",
                f"--crash-dumps-dir={TEMP / 'crashes'}",
            ],
        )
        context.route(
            "**/*",
            lambda route: route.abort() if route.request.url.startswith(("http:", "https:"))
            else route.continue_(),
        )
        page = context.pages[0]
        page.on("request", lambda request: report["remoteRequests"].append(request.url)
                if request.url.startswith(("http:", "https:")) else None)
        page.on("console", lambda message: report["consoleErrors"].append(message.text)
                if message.type == "error" else None)
        page.on("pageerror", lambda error: report["pageErrors"].append(str(error)))
        page.goto((BASE / "index.html").as_uri(), wait_until="load")
        ready(page)
        report["userAgent"] = page.evaluate("navigator.userAgent")
        report["normal"].append(page.evaluate(AUDIT))
        for study in page.locator("article.study").all():
            number = study.get_attribute("data-study")
            name = study.get_attribute("id")
            study.screenshot(path=str(BASE / f"{number}-{name}-desktop.png"), animations="disabled")

        # The live comparison switch changes CSS layout, not image scale.
        page.locator('[data-width="320"]').click()
        report["comparison320"] = page.locator(".pocket-frame").evaluate_all(
            "els => els.map(el => Math.round(el.getBoundingClientRect().width))")
        page.locator('[data-width="390"]').click()
        report["comparison390"] = page.locator(".pocket-frame").evaluate_all(
            "els => els.map(el => Math.round(el.getBoundingClientRect().width))")

        for width in (768, 390, 320):
            page.set_viewport_size({"width": width, "height": 844})
            ready(page)
            report["normal"].append(page.evaluate(AUDIT))
            if width in (390, 320):
                images = []
                for scene in page.locator("article.study .proof-scene").all():
                    images.append(Image.open(io.BytesIO(scene.screenshot(animations="disabled"))).convert("RGB"))
                mobile_images[width] = images

        for width in (390, 320, 768, 1440):
            page.set_viewport_size({"width": width, "height": 844})
            page.evaluate("document.documentElement.style.fontSize = '200%'")
            ready(page)
            report["enlarged"].append(page.evaluate(AUDIT))
            if "--keep-inspection" in sys.argv and width == 320:
                # Optional temporary visual evidence; never mixed with normal-scale delivery.
                enlarged_images = [
                    Image.open(io.BytesIO(scene.screenshot(animations="disabled"))).convert("RGB")
                    for scene in page.locator("article.study .proof-scene").all()
                ]
                inspection = Image.new("RGB", (320, sum(image.height + 24 for image in enlarged_images)), "#eae8e0")
                y = 0
                for image in enlarged_images:
                    inspection.paste(image, (0, y))
                    y += image.height + 24
                inspection.save(TEMP / "enlarged-type-320-inspection.png")
            page.evaluate("document.documentElement.style.fontSize = ''")

        # Keyboard access is checked without opening an external contact action.
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto((BASE / "index.html").as_uri(), wait_until="load")
        ready(page)
        page.keyboard.press("Tab")
        report["firstKeyboardFocus"] = page.evaluate("document.activeElement.textContent.trim()")
        page.keyboard.press("Enter")
        report["skipLinkDestination"] = page.evaluate("location.hash")
        report["reducedMotion"] = page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
        report["animations"] = page.evaluate("document.getAnimations().length")
        # A native touch gesture must scroll instead of getting intercepted by a card.
        page.evaluate("window.scrollTo(0, document.querySelector('#cotton').offsetTop)")
        before_scroll = page.evaluate("window.scrollY")
        cdp = context.new_cdp_session(page)
        cdp.send("Input.synthesizeScrollGesture", {
            "x": 180, "y": 600, "yDistance": -350, "speed": 700, "gestureSourceType": "touch"
        })
        page.wait_for_timeout(200)
        report["touchScrollSyntheticDelta"] = round(page.evaluate("window.scrollY") - before_scroll, 2)
        if not report["touchScrollSyntheticDelta"]:
            # Headless Edge can ignore the convenience gesture; send real touch points.
            cdp.send("Input.dispatchTouchEvent", {
                "type": "touchStart", "touchPoints": [{"x": 180, "y": 650}]
            })
            for step in range(1, 17):
                cdp.send("Input.dispatchTouchEvent", {
                    "type": "touchMove", "touchPoints": [{"x": 180, "y": 650 - step * 24}]
                })
                page.wait_for_timeout(20)
            cdp.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
            page.wait_for_timeout(350)
        report["touchScrollDelta"] = round(page.evaluate("window.scrollY") - before_scroll, 2)

        # Ordinary layout remains a complete study even with JavaScript unavailable.
        page.set_extra_http_headers({})
        cdp.send("Emulation.setScriptExecutionDisabled", {"value": True})
        page.reload(wait_until="load")
        report["noJSCardCount"] = page.locator("article.study .paper").count()
        cdp.send("Emulation.setScriptExecutionDisabled", {"value": False})
        context.close()

    for mode in ("normal", "enlarged"):
        for sample in report[mode]:
            if sample["documentOverflow"]:
                report["issues"].append(f"{mode} {sample['viewport']}: page overflows horizontally")
            if sample["imageErrors"] or not sample["loadedFigtree"]:
                report["issues"].append(f"{mode} {sample['viewport']}: asset load failed")
            for card in sample["cards"]:
                label = f"{mode} {sample['viewport']} {card['id']}"
                if not card["identity"]:
                    report["issues"].append(f"{label}: identity text mismatch")
                if card["horizontalOverflow"] or card["verticalOverflow"] or card["textOutside"] or card["collisions"]:
                    report["issues"].append(f"{label}: overflow / collision")
                if mode == "normal" and not card["physicalRatio"]:
                    report["issues"].append(f"{label}: physical aspect ratio not retained")
                if mode == "normal" and card["minFontPx"] < 12:
                    report["issues"].append(f"{label}: card type is below 12 px")
    if report["remoteRequests"] or report["consoleErrors"] or report["pageErrors"]:
        report["issues"].append("Unexpected network or runtime error")
    if report["comparison320"] != [320] * 5 or report["comparison390"] != [390] * 5:
        report["issues"].append("Comparison control does not set the advertised CSS width")
    if report["firstKeyboardFocus"] != "Skip to the five studies" or report["skipLinkDestination"] != "#studies":
        report["issues"].append("Keyboard skip link failed")
    if not report["touchScrollDelta"]:
        report["issues"].append("Touch scroll did not move the page")
    if report["noJSCardCount"] != 5:
        report["issues"].append("Five complete cards are not available without JavaScript")

    make_contact_sheet(mobile_images, report)
    report["result"] = "PASS" if not report["issues"] else "REVIEW"
    (BASE / "verification.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps({
        "result": report["result"],
        "issues": report["issues"],
        "normal": [{ "width": s["viewport"], "cards": [
            f"{c['id']}: {c['width']}×{c['height']}, {c['minFontPx']:.2f}px min"
            for c in s["cards"]]} for s in report["normal"]],
        "enlarged": [{ "width": s["viewport"], "cards": [
            f"{c['id']}: {c['width']}×{c['height']}"
            for c in s["cards"]]} for s in report["enlarged"]],
        "touchScrollDelta": report["touchScrollDelta"],
    }, indent=2))
    if "--keep-inspection" in sys.argv:
        print(f"Temporary inspection image/profile retained under {TEMP}; remove with the next normal run.")
        return
    for _ in range(4):
        try:
            shutil.rmtree(TEMP)
            break
        except PermissionError:
            time.sleep(.5)


if __name__ == "__main__":
    main()
