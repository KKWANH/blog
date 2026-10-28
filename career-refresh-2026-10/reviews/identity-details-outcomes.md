# Brand artwork, paper detail and About interactions

27 October 2026. Local continuation in `C:/Projects/blog`; baseline HEAD remains `8e5b24d` plus the ongoing worktree. No publication, credential change or new CV PDF/DOCX.

## Changes

- C++, Python, React and ROS now use locally served SVG artwork from Simple Icons 16.36.0. The CC0 license is retained.
- KLA and Bosch use their public-header SVGs. Pickit uses its official documentation PNG; its corporate homepage returned HTTP 500 during sourcing.
- Company marks are part of role-navigation controls on the homepage and About. Technology marks select supported work and appear in the corresponding scope diagrams.
- A selected skill exposes explicit company/project connection buttons. Activating one scrolls to and focuses the matching role. Homepage company links also synchronize the selected scope through the URL fragment.
- Work and education timeline rows are fully actionable; the data and expanded career record remain visible.
- The paper introduction now has layered grain/fibres, a decorative pressed C++ mark, a fine inset rule and a ruled contact zone. Printed email and website links have 44px targets.
- Portraits open in a viewer with arrow-key navigation, Escape and focus return. Native full-image links still work with modified clicks or without JavaScript.
- The Google Docs CV specification was reviewed. Its default remains Source Sans 3, name 28pt/body 11pt/date 10.5pt, with an optional Georgia 25pt name line to echo the card. Website icons are not substituted for readable CV text.

## Evidence

- `brand-source-verification.json`: exact asset URLs/hashes, source treatment and SVG inspection.
- `identity-brand-checks.json`: homepage logo navigation and 16 normal/enlarged reflow cases passed.
- Current `stationery-checks.json`: expanded brand, connection, timeline, portrait, paper, keyboard/touch, motion and video checks passed. No test atlas mutations; the observed atlas was unchanged during this run.
- Native content/access/storage checks and TypeScript passed.
- Next.js 16.4.3 production build passed with no reported warning.
- Axe reported no violations in the checked states but retained incomplete checks. No blanket accessibility or physical-device certification is claimed.

The real atlas remains owner-editable on the running local server and was not reset or rewritten by these checks. All application assets are local; the page does not fetch employer logos from external services.

## Review

Artwork was inspected on its intended surfaces. Colour and aspect ratio are preserved for employer marks; React uses a dark surface for contrast. Generic interface/recovery categories retain conceptual symbols.

Normal paper proportions remain 85:55 through 320/390/768/1440px. Enlarged name/email groups remain intact, contact targets stay visible, and all career/education records remain open.

Current URLs:

- http://localhost:3100/about
- http://localhost:3100/studio/identity-assets.html

CV advice: `cv/google-docs-design-spec.md`. Actual Google Docs layout/export/ATS behaviour is still the owner's authoring step, not a completed automated test.
