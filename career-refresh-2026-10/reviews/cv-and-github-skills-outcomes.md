# Visual CV and GitHub-backed skills

Follow-up: the owner rejected the category-map interaction and representative-only repository coverage. Those portions are superseded by `interactive-map-outcomes.md` and the complete per-repository matrix. The CV design work below is retained.

27 October 2026. User requested a stronger minimal CV, an actual visual implementation/review loop, synchronized Markdown, and a broader skill review including Figma.

## CV deliverable

The local HTML is a real A4 layout, not a text-only style proposal:

`http://localhost:3100/studio/cv-editorial-2026-10-27/index.html`

It uses Manrope Bold 34pt for the name, Inter 10.5pt/14pt for body copy, 12.5pt employer headings and 9.5pt metadata. Contacts align separately; one forest accent rule and a subtle skills band establish hierarchy.

Four rendered passes are preserved in the comparison page. The first overflowed to two pages; the second corrected fit without reducing body size; the third added a source-backed C++ project; the fourth fixed actual PDF font embedding and reading-order problems.

Final proof: `design/cv-editorial-2026-10-27/rounds/round-4.pdf`.

Canonical inputs:

- `cv/editorial-content.json`
- `cv/editorial-design.json`

`cv/build_editorial_cv.py` generates the HTML, exact-value JSON, Google Docs specification and pasteable English Markdown. Both Markdown copies match the preview counterparts. The older Lato/`current.pdf` guides are explicitly historical.

`editorial-cv-verification.json` passed: one A4 page, rendered-ink margins, embedded named font subsets, Unicode maps, ordered text, six link annotations, tagged structure, scoped claims, Figma/containers content, fit/guides/copy controls and Markdown synchronization. Grayscale was inspected. Google Docs import/export, a physical print and ATS processing remain untested.

## Repository review

74 public repositories were inventoried; 15 representative trees were pinned and selected code/README/contribution signals inspected. No repository code was executed.

The website now has 26 skills across six families. Added contexts include:

- Owner-attested Figma/basic UI design.
- C++ containers/iterators and an AVL-backed map.
- C process/pipe/signal work and pthread mutex coursework.
- C++ HTTP/socket team-project work.
- Qt/QML and D-Bus source, with CAN explicitly described as team-project context.
- Docker Compose/NGINX configuration and x86-64 assembly exercises.

Seven repository panels link to inspected source revisions. Professional work, educational/team projects and owner-stated familiarity remain distinguishable. Ariadne's AI-directed boundary is preserved. The ledger records excluded scaffolds/forks and blocked raw Python reads rather than inferring expertise.

Evidence: `source/github-2026-10-27/skill-evidence.md` and its inventories/snapshots.

## Website verification and state

- `github-skills-ui-checks.json`: new contexts, six-family map, assets and normal/enlarged reflow passed.
- Updated `stationery-checks.json`: current interaction/accessibility/reflow checks passed; no test atlas mutations.
- Native content/access/storage checks, TypeScript and production build passed.
- Axe retains incomplete checks; no blanket certification is claimed.

Blog baseline is published `3f85a90`. These new CV/skill changes are local and have not been pushed. The existing public `CV.pdf` and the owner's atlas data were not replaced.
