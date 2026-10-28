# Published profile release

27 October 2026. User request: rebalance the portraits, add a skills icon list/mind map, then push.

## Published result

- Commit: `3f85a90d4d7907c923e4517a4d751bd1fec03605`
- Tree: `fbfd2dcda9a8a3d2c4f66f90f4604e31a6f539b5`
- Remote: `KKWANH/blog`, `main`
- One requested push completed: `8e5b24d..3f85a90`.
- Remote-head readback matches. The working tree was clean at the final check.
- Vercel reported successful deployment. https://www.kwanho.dev/about was verified at 2026-10-27T11:06:32Z.

## Final refinement

The camera portrait now leads three equally sized frames. On phones, each portrait stays large in a horizontal strip with keyboard focus reveal and touch scrolling.

Four skill families contain 14 CV/work skills. The default icon list and optional mind map share the same data and native controls. Specific roles/projects are linked where supported; C, JavaScript, TypeScript and REST use explicit CV context rather than invented employer attribution. Docker/Linux/Git links are described as project environment/source context.

The release also includes the previously reviewed paper identity, open career/education, real brand artwork and team video, stable localhost workflow, dependency fixes and protected owner-editor preparation.

## Validation

- Final native content/store/access checks, TypeScript and production build passed.
- `npm ci --dry-run --ignore-scripts` passed lockfile consistency without replacing the running development dependencies.
- Current `stationery-checks.json` passed all checks, including photo weighting, 14-skill list/map, focus, touch, reduced motion, video and no test atlas mutations.
- The first map/portrait pass found a partially hidden second portrait focus and an oversized map hub at 320px/200% type. Explicit focus reveal and a constrained hub fixed both; `release-focus-followup.json` passed.
- `profile-release-production.json` verifies the actual production build, map/skills/assets, public read-only atlas and private-studio exclusion.
- `profile-release-live-readback.json` passed all 17 deployed checks with no page errors: portraits, skills/map/context, viewer/video, atlas, 115 committed records, assets, corrected CV and contact download.

The initial deployed-browser check encountered transient streamed DOM copies; the harness now waits for the settled route. The separate Playwright API client lacked a local issuer certificate, so readback used verified browser navigation and Python's system-trust HTTPS. No TLS validation was disabled.

Axe retains incomplete findings; no blanket accessibility or physical-device certification is claimed.

## Remaining configuration

Public owner sign-in is not configured (`ownerSignInAvailable=false` in the live API). Anonymous visitors cannot write. Activating live Travel edits still requires the documented GitHub App/deployment settings. No real OAuth login or repository write from the web editor was claimed.

The owner's 115 atlas records match the published commit exactly. Private design/reference files and CV authoring advice remain in the career workspace; no new CV PDF/DOCX was generated.
