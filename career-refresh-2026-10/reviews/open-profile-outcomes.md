# Open-profile and owner-editor revision

Historical design iteration. The paper introduction/fixed-address follow-up is recorded in `stationery-outcomes.md`; the open career and owner-editor work remains part of the current candidate.

27 October 2026. Baseline: published commit `8e5b24d`. New work is local and has not been published in this revision.

## Research delivered

- Ten distinct structural concepts, with visual studies and tradeoffs.
- Five live references, all rendered successfully: Bruno Simon, OEC, Pentagram, Rauno Freiberg and NOWNESS.
- A private comparison board at `design/directions-2026-10-27/index.html`; detailed observations and exact URLs in `research.md`.
- Selected prototype: open editorial identity + dated work/study tracks + a visual work companion.

Reference screenshots remain private research assets. Team-project images come from the owner's public MIT-licensed Color Saves Life repository and carry attribution.

## Implemented

- Removed the collectible portrait flip and generic field-note reverse.
- Opened all professional and academic records; no disclosure is required to read them.
- Added labeled skill icons with supported role/project associations. React focuses Bosch's eBike interface rather than an unrelated Python diagram.
- Added a dated timeline. On narrow screens it starts at recent work, retains labels and provides a scroll cue. Undated completed 42 training is not assigned a fictional completion date.
- Added explicit matching-scope navigation with focus transfer, while keeping the other career entries visible.
- Added actual simulation/driver/pipeline images, a full-size pipeline link and a data-derived atlas preview.
- Added the visible Edit atlas entrance and `/travel/manage`.
- Preserved local file editing and prepared GitHub App owner authentication plus repository persistence for the published site.
- Patched affected framework/map/validation dependencies; MapLibre's worker is now prepared and hosted on the same origin.

## Review corrections

The independent design review identified four concrete issues: matching evidence was offscreen, React selected Python evidence, recent mobile timeline bars were outside the initial viewport, and a panoramic diagram used a photograph's aspect ratio. All four were corrected and checked.

The dependency upgrade exposed a separate worker-loading requirement in MapLibre 6. The worker/license preparation script and explicit local worker URL fixed that regression; actual production map readiness was checked.

## Verification

- `open-profile-checks.json`: 27 functional checks, all 24 normal/enlarged reflow cases, and three axe audits with no reported violations. Some axe checks remain incomplete.
- Native `test:content`: LF/CRLF/BOM content parsing; local CRUD/undo/persistence/conflict; encrypted owner-session checks; foreign owner/key/expiry rejection; CSRF/origin/content-type checks; public-session redaction; mocked repository writes/conflicts/failures.
- `owner-production-checks.json`: 12 expected routes, production map/worker, visible protected management entrance, unauthorized-write rejection, unconfigured-auth rejection, frame protection and unpublished-gallery behaviour. A separate fixture-only auth server verified state/PKCE, the pinned callback and Secure/HttpOnly state cookies without completing external OAuth or writing to GitHub.
- `patched-photo-import-checks.json`: updated Sharp preserves orientation and originals while removing metadata from derivatives.
- `owner-readback-checks.json`: the actual public repository content path returns the expected 107-record document; browser-preview requests reach validation without changing real data. No repository write was performed.
- Next.js 16.4.3 production build and TypeScript passed. npm audit reported zero known vulnerabilities at verification time.

All data mutations used temporary files or mocked HTTP. The real 107-record atlas and empty photography collection were preserved.

## Activation still required

The GitHub App and deployment secrets are not configured. The public owner login fails closed until configured. Real GitHub sign-in and a real repository save are not claimed as tested.

Setup is documented in `C:/Projects/blog/docs/travel-owner.md`; secret values belong in deployment settings, not chat/source. No new CV PDF/DOCX was generated.
