# Portfolio & Career Platform Guide (`blog`)

## Overview
This repository powers Kwanho Kim's personal engineering portfolio and career platform (`https://www.kwanho.dev`). Built with Next.js 16.4.3 (Turbopack, React 19, TypeScript, Tailwind CSS v4).

## Architecture & Workspaces
- **Blog Repo:** `C:\Projects\blog` (Next.js app)
- **Embedded Career Refresh & Studio:** `C:\Projects\blog\career-refresh-2026-10` (Python tools, CV generators, design studio boards, test harnesses, reviews, captures)
- **Mounted Design Studio URL:** Accessible locally at `http://localhost:3100/studio/` (serves `career-refresh-2026-10/design`)
- **Node Binary:** `C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64\node.exe`
- **Python Binary:** `C:\Program Files\Python313\python.exe` (with `PYTHONPATH=career-refresh-2026-10/tools/python`)
- **Local Dev Server:** Runs on `http://localhost:3100` via `scripts/dev-editor.mjs`

## Recent Refinements & Key Features

### 1. Business Card Craftsmanship
- **Typography:** Bespoke cursive signature using `Bastliga One` (`public/font/Bastliga-One.woff`) with genuine two-stop letterpress deboss (`text-shadow: 0 1px 0.8px #ffffff, 0 -1px 0.8px rgba(18, 42, 28, 0.45), -1px 0 0.8px rgba(18, 42, 28, 0.35)`).
- **Layout (Classical Centered + Ginza Asymmetric Footer):**
  - Top: Uppercase tracked `SOFTWARE ENGINEER`
  - Center: Flowing Bastliga One signature `Kwanho Kim`
  - Subtitle: `C++ device software & integration`
  - Location: `Leuven, Belgium`
  - Recessed hairline separator
  - Bottom row: Left has `contact@kwanho.dev`; Right has `kwanho.dev ↗` and vector QR code (`public/kwanho-qr.svg`).
- **Dark vs. Light Theme Inversion:**
  - Dark Mode: Warm ivory unbleached cotton paper (`linear-gradient(112deg, #f7f3e6, #eae4d3)`) with paper fibres and grain overlay.
  - Light Mode: Flips to Studio 02 Forest Edge deep emerald stock (`linear-gradient(135deg, #133c27, #0a2416)`) with light ivory debossed lettering.
  - Geometry is 100% identical; only color and contrast flip.
- **Standalone Card:** `/card` (`app/card/page.tsx`) renders the same `components/business-card.tsx` face as About, so the two cannot drift; it adds theme toggle and an 85×55 mm print layout. `/business-card.html` permanently redirects there.
- **Dark-mode generators:** `<meta name="darkreader-lock">` in `app/layout.tsx`, and `.paper-business-card` declares `color-scheme: only light`, `forced-color-adjust: none` and `print-color-adjust: exact`, so extensions, browser force-dark and printing cannot repaint the card stock.
- **Light theme:** consolidated in `styles/light.css` (loaded last). Rule: light mirrors dark's structure — no control gets a filled box that dark does not have.

### 2. Light Mode & Atmosphere Harmony
- Excluded nocturnal window photo and murky green background overlays in light mode.
- Grounded in serene Kyoto linen (`#f7f6f0`), soothing sage paper panels (`#f2f5ec`), and deep pine ink (`#122c1b`, `#14281c`, contrast > 12:1).
- Solved all axe-core contrast violations.
- Snappy pointer spotlight tracking (90ms easing) with velocity-reactive bloom.
- Transparent scrollbar tracks with thin custom rounded thumbs (`#2b5c3e` in dark, `#92ae95` in light).

### 3. About Page Hierarchy & Content
- Section Order: Business Card → Experience (`#work`) → Timeline → Education → Skills & Practice (`#skills`) → Selected Projects (`#selected-work`) → Exits.
- Experience Header: Includes dual tenure badges:
  - `Industry: 2+ yrs (KLA · Pickit · Bosch)`
  - `Software practice: 6+ yrs (since 2020)`
- Skills: Sorted strictly within each group by self-assessed familiarity:
  `◆ Strong` → `▲ Comfortable` → `◈ Used before` → `○ Learning` → unrated.
- Breadcrumbs: Removed redundant `Home / About` from top of About page.

### 4. Admin Telemetry & Multi-Device Deployment
- **Edge-to-Edge Dark Cockpit:** Enforced via `.admin-viewport` with `background: #071b13 !important` so `/admin` stays in dark cockpit regardless of site theme.
- **Visual Analytics:**
  - Daily Traffic bar chart with interactive day inspection
  - Visual proportion bars with percentage fills on Referrals, Pages, Countries, Devices, and Browsers
  - 24-hour UTC activity histogram
  - Recruiter engagement funnel (Page Views → Sessions → High-intent CTA interactions)
  - Toggle between Visual Bars and Data Tuples
- **Owner Exclusion:** Auto-sets `kwanho-admin-device=1` cookie and `localStorage` on authenticated admin sessions so owner devices (phones, home PC, work PC) are permanently excluded from viewer counts.
- **Vercel Setup:**
  - Helper scripts: `setup-admin.cmd` and `setup-admin.ps1`
  - Vercel Env Vars:
    `ADMIN_PASSWORD_HASH`
    `ADMIN_SESSION_SECRET`
    `ADMIN_ORIGIN=https://www.kwanho.dev`
    `ANALYTICS_ENABLED=1`
  - Free Vercel KV / Upstash Redis database provides `KV_REST_API_URL` and `KV_REST_API_TOKEN` which are natively recognized.

### 5. CV (`/cv` & `/CV.pdf`)
- Standalone HTML route at `/cv` using modern architectural display typography (`Syne` 800 Ultra-Bold) for name.
- Proper hackathon award wording: `1st Place` / `WINNER` for Color Saves Life at BCX 2024.
- Clean language line: `Korean: Native · English: Fluent (IELTS 7.5, 2025) · Japanese: Learner`.
- Full URLs for LinkedIn (`linkedin.com/in/kwanhokim`) and GitHub (`github.com/KKWANH`).
- Degrees clearly split into discrete rows.

### 6. Travel Globe (`/travel`) & Travel Photo Folders
- **Public `/travel`:** full-bleed MapLibre globe (`components/travel/travel-atlas.tsx` + `travel-globe.tsx`, `styles/atlas.css`; light rules in `styles/light.css`). No hero, reading column or footer: `app/[...slug]/page.tsx` renders `bodyClassName: 'atlas-page'` full-bleed. Floating chrome: title/counts, keyboard place finder (combobox), Cities/Countries key, zoom/reset/owner-edit controls. Clicking a place opens a drawer (bottom sheet ≤760px) with its photos; `?place=<id>` deep-links. Slow auto-spin only when motion is enabled (`useMotion`), never under reduced motion.
- **Owner editing:** `/travel/manage` keeps the list-and-map `TravelExplorer`; unchanged.
- **Folder convention (one folder per place/trip):**
  ```
  contents/photography/travel/<place-id>/      # originals, git-ignored (may carry GPS)
    01-whatever.jpg  02-another.heic …         # sorted by name
    gallery.json                               # optional, committed
  ```
  `<place-id>` is the `id` in `contents/travel/places.json` (e.g. `leuven-belgium`); for a second trip to the same place use any slug folder and set `"place"` in `gallery.json`. See `contents/photography/travel/_example/gallery.json` for every field (`place`, `title`, `date` YYYY[-MM[-DD]], `summary`, `cover`, per-file `alt`/`title`). Folders starting with `_` or `.` are skipped.
- **Publish:** run `npm run photos:travel` (also runs when the local dev launcher starts). It writes metadata-free WebP derivatives (2400px + 900px thumb) to `public/photography/travel/<folder>/` and the manifest `contents/photography/travel-galleries.json`; commit those plus `gallery.json`. A clone without the originals keeps already-published galleries. To remove a gallery, delete both its `contents/…` and `public/…` folders and rerun.
- A place with no folder has no gallery. Any gallery publishes `/photography` (portraits from `photos.json` still optional).

## Verification Suites
Run all tests before committing:
```powershell
# 1. Typecheck
& 'C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64\node.exe' node_modules/typescript/bin/tsc --noEmit

# 2. Content & Security
& 'C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64\node.exe' scripts/check-content.mjs
& 'C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64\node.exe' scripts/check-security.mjs

# 3. Browser & Stationery Regressions
& 'C:\Program Files\Python313\python.exe' -X utf8 'C:\Projects\career-refresh-2026-10\tools\check-stationery.py'
& 'C:\Program Files\Python313\python.exe' -X utf8 'C:\Projects\career-refresh-2026-10\tools\check-skill-preferences-ui.py'
& 'C:\Program Files\Python313\python.exe' -X utf8 'C:\Projects\career-refresh-2026-10\tools\verify-results-cv.py'

# 4. Production Build
$taskNode = 'C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64'
$env:Path = "$taskNode;" + $env:Path
& "$taskNode\node.exe" "$taskNode\node_modules\npm\bin\npm-cli.js" run build
```

## Git Publication Rule
Per owner instructions, **do not run `git push` autonomously**. All changes must be verified and cleanly committed locally using `KKWANH <kwanho0096@gmail.com>`. The user pushes manually from their terminal.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
