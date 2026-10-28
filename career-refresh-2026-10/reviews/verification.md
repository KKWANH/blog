# Verification record

Historical first-pass record. Current owner-directed revision evidence is in `revision-outcomes.md`, `revision-ui-checks.json`, `revision-edge-checks.json`, `revision-reflow-followup.json`, `revision-production-checks.json` and `revision-source-snapshot.json`.

Observed 26 October 2026 on Windows. Website repository: `C:/Projects/blog`.

- Baseline HEAD: `f8ada6a5490e015e4919ac92b7bb731ccbb2d921`.
- Final source snapshot: `source-snapshot.json`, including 175 tracked/untracked non-ignored files.
- Source tree SHA-256: `da0c01180e6106b3fa2400448c730fb7ba7f8cd64a0819d61b95e3c13ffe2581`.
- Node: portable 22.23.4; Next.js 16.2.0; TypeScript 5.7.3.
- Browser: headless Microsoft Edge through Playwright 1.64.1.
- Local production server: `http://127.0.0.1:3101`.

## Commands and outcomes

| Working directory | Command / equivalent | Result and gap |
| --- | --- | --- |
| Blog | `npm ci --no-audit --no-fund` | Existing lockfile dependencies installed; no dependency upgrades. |
| Blog | `node node_modules/typescript/bin/tsc --noEmit --pretty false` | PASS. Existing type errors in the content/travel paths were corrected; build-error suppression removed. |
| Blog | `node scripts/check-content.mjs` | Reproduced CRLF frontmatter failure before correction. PASS after correction for LF, CRLF and BOM+CRLF, using actual loader/rendering. |
| Blog | `node node_modules/next/dist/bin/next build` | PASS, including the final build after newline portability correction. Nineteen generated pages/assets; twelve content routes. |
| Blog | `git diff --check` | PASS. Git's LF→CRLF notices are informational; parser portability is explicitly tested. |
| Career workspace | `python tools/check_web.py --base http://127.0.0.1:3101 --round 3` | PASS. See the JSON for exact routes, widths and interaction assertions. |
| Career workspace | Supplemental browser checks | PASS. Dark audits, cold/synthetic font loading, map without external HTTPS, served CV identity, optical-size captures, landscape navigation and enlarged-text anchors. See `final-edge-checks.json` and `final-ui-checks.json`. |
| CV folder | `python build_cv.py --version round-2` | PASS. Two A4 PDF pages, ordered text, embedded fonts, links, live-area bounds, neutral footer and structured DOCX. |

In this workspace, commands used the explicit portable Node path under `tools/node-v22.23.4-win-x64/` and Python at `C:/Program Files/Python313/python.exe`. Python support packages were installed in the isolated career workspace, not over the system installation.

## Evidence boundaries

The browser suite records eight light-theme axe audits; supplemental checks record five dark audits. No violations were reported in those runs. Some automated checks remain incomplete and were not converted into a blanket conformance claim.

Clipboard tests used a stubbed browser API and observed DOM transitions/focus. They did not write the operating-system clipboard or test spoken screen-reader announcements.

The map was verified with external HTTPS blocked. It renders bundled country geometry and supports the existing modes, visited-place selection and popup. This is not a street map.

The post-round-three newline correction preserves the same rendered LF content. Its focused regression check and final production build passed; no extra design evaluation round was added.

No physical-device, authenticated Google Docs, office-printer, real ATS or PDF/UA test was performed. DOCX pagination remains an import/export check for the user.

KLA repositories were read for career evidence, not changed or built by this task. Their existing and concurrent work was not reset. Lifter hardware-validation status was re-read at handoff and remains pending in the source records. No equipment/HIL operation, remote publication or LinkedIn account edit was performed.
