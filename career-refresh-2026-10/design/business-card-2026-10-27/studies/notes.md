# Five original paper introductions

**Scope:** `plan.md` was read first. Everything authored or generated is in
`studies/`; the supplied assets, blog, company registry and configuration remain
untouched. Open `index.html` directly in Edge. It has embedded CSS/local-only JS,
local font/images, five complete studies and live 390/320px comparison frames.
There is no build step, server, dependency installation or publication.

## Design critique

| Study | Distinct design decision | Critique |
| --- | --- | --- |
| **01 Cotton impression — 85 × 55** | Serif name; high-left role; two bottom anchors; warm stock and restrained impression cue. | Best hierarchy and most personal tone. Negative space belongs to the name, rather than a logo. Avoid heavier embossing or pale contact text. |
| **02 Forest edge — 90 × 50** | Stacked sans-serif name; offset role; full-width contact rail; pale duplex core against a dark face. | Strongest silhouette. At 320px the role becomes three lines but still fits. Light ink requires a physical proof; an all-dark final web section would feel too corporate. |
| **03 Photographic margin — 85 × 55** | A bounded 4:5 professional-portrait window; contacts span beneath both columns. | Recognisable and editorial, but the face becomes small at 320px. Keeping email outside the portrait column is essential. A larger separate print would serve the person better. |
| **04 Swiss register — 90 × 50** | Oversized single-line name; vermilion rule and C++; two functional lower zones. | Clearest information architecture. “Software Engineer” wraps at 320px. Most technical, least warm; borrow its alignment, not additional graphic furniture. |
| **05 Vellum & portrait — 85 × 55** | Centered, spaced name; translucent contact face with light backing; useful window-portrait companion. | Most atmospheric, but close to an invitation. The photograph moves below the card on mobile. Borrow that two-piece arrangement, not translucency behind essential text. |

## Synthesis recommendation

Start with **01's 85 × 55 proportions and serif-name hierarchy**. Borrow only
**02's deep green ink and fine edge**, and **04's contact alignment**. Use the
professional portrait as a separate companion, following 05's two-piece logic.
Stack it below the card on phones. Do not combine all five visual devices.

CV/contact/vCard controls belong in the surrounding page, never on the paper.
The studies expose real email/website actions outside each face. A CV control
was not fabricated: the parent should bind the application's existing verified
CV route during integration.

This recommendation is **original-study synthesis only**. The separate agent's
five verified references still need to be reconciled with it. These files do not
claim reference research or constitute an integrated application design.

## Render and fit evidence

- Installed Edge 156, existing Python 3.13 / Playwright; `file://`, no installs.
- All five checked at **1440, 768, 390 and 320 CSS px**, normal type and **200%
  root type**. This is explicit text-size stress, not a claim about a physical
  print proof or an OS accessibility setting.
- Normal phone card widths: **358 / 288px**. Exact 85:55 or 90:50 proportions
  retained (0.1px height tolerance); smallest card type **12px**.
- Final checks: no page/card overflow, text escaping the paper, pairwise text/
  portrait collisions, missing identity fields, broken local assets, page errors
  or remote page requests. Outside contact actions have 44px minimum height.
- Comparison buttons, keyboard skip link, native touch scrolling, reduced motion
  and five-card availability without JS checked. See `verification.json`.
- `01-cotton-desktop.png` through `05-vellum-desktop.png` are desktop study crops.
  `mobile-contact-sheet-390-320.png` contains both actual-width mobile columns,
  without resizing the captures. All six were visually inspected.

### Problems found and corrected

1. A preferred `aspect-ratio` plus `min-content` **did not grow the flex card**
   at 200% root type in Edge. Contacts escaped the rectangle. The final CSS
   expresses physical proportions as a container-relative **minimum height**
   and allows intrinsic content growth. Enlarged cards intentionally become
   taller; they do not shrink text or hide information.
2. Forest's 320px normal layout initially needed **0.66px more than 90:50**.
   A small spacing reduction restored the exact proportion without reducing type.
3. Absolute scene labels were changed to flow layout so large labels cannot
   collide with the paper. The companion photo likewise gets its own mobile row.
4. Edge's high-level synthetic touch gesture was ignored. Direct touch
   start/move/end events verified native scrolling; no fake `scrollTo` result
   is counted as a gesture.

## Reproduce / limits

Run from this directory with the existing tool path:

```bash
PYTHONPATH="C:/Projects/career-refresh-2026-10/tools/python" \
PYTHONDONTWRITEBYTECODE=1 \
"C:/Program Files/Python313/python.exe" -B render_check.py
```

Browser profile/cache/temp files are created only in `studies/.render-tmp` and
removed after a normal run. `--keep-inspection` retains a temporary 320px/200%
visual proof; the next normal run removes it.

Texture, impressions, opaque ink, duplex edges and vellum are digital proposals,
not demonstrated manufacturing results. Test stock/ink with a printer. Georgia
is a local system serif; Figtree uses the supplied font and linked OFL. An
optional font-metadata probe lacked Brotli; nothing was installed, and Edge's
successful Figtree load is verified separately.
