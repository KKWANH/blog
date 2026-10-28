# Career and website refresh

## Current CV selection — result-led revision

The latest owner feedback was that the copy felt technical/basic and outcomes
were difficult to see. The supplied Google Docs PDF contained a header only.
The current selection is the **linear result-led CV**, with professional
contributions before skills, explicit in-progress KLA work and a qualified
BCX team-award accent. This selection supersedes older CV-state descriptions
in the historical portfolio notes below.

- Comparison: `http://localhost:3100/studio/cv-results-2026-10-27/index.html`
- Selected local PDF: `C:/Projects/blog/public/CV.pdf`
- Editable Word: `design/cv-results-2026-10-27/Kwanho-Kim-CV.docx`
- Actual Word export: `design/cv-results-2026-10-27/word-proof.pdf`
- Current sources: `cv/editorial-content.json`, `cv/editorial-design.json`.
- Build entry: `cv/build_editorial_cv.py` (delegates to `results_layout.py`).
- Editable export: `cv/build_editable_cv.py`.
- Verification: `tools/verify-results-cv.py`; 36 checks pass for both one-page
  outputs, text, scope, links, fonts and synchronized Markdown.
- Outcome/limits: `reviews/cv-results-outcomes.md`.

Three designer and two recruiter AI roles compared actual renders. The new
DOCX was opened and exported in Microsoft Word 16. Its body intentionally
uses Arial, while the selected HTML/PDF uses Inter. No actual Google Docs
import, physical print or ATS acceptance is claimed. The owner-supplied PDF
and prior selected source/PDF are preserved. No GitHub/public deployment was
performed for this revision.

## Prior portfolio release and design history

27 October 2026. The current local work adds owner-entered skill familiarity/visibility, a person-centered interactive map and a safe repository-sync command. The CV now has restrained UI detail and two rounds of three-designer/two-recruiter AI-role review. Local commits are `36acab8` (features/CV) and `e332b7f` (44 saved owner preferences). Automatic approval review blocked the GitHub write; published `3f85a90` remains unchanged.

Commit `3f85a90` was pushed to main and its Vercel deployment was verified on the actual site. Public owner sign-in remains unconfigured; that activation is separate from the successful website publication.

The owner requested an actual visual CV implementation in the latest revision. The current deliverable is an A4 HTML design, a verified PDF proof and synchronized Google Docs/Markdown guidance. The existing website PDF remains the prior corrected reference until a replacement is selected for publication. LinkedIn remains manual copy.

## Open first

| Deliverable | File / location |
| --- | --- |
| Detailed Google Docs design specification | `cv/google-docs-design-spec.md` |
| Current design/content sources | `cv/editorial-design.json` and `cv/editorial-content.json` |
| Pasteable current CV text | `cv/editorial-copy.md` |
| LinkedIn replacement copy | `source/linkedin-current.md` |
| Confirmed facts and preferences | `source/confirmed-profile.md` |
| Actual blog source | `C:/Projects/blog` |
| Local production review command | `npm run preview` on the same localhost:3100 address after stopping development |
| Local editor | `http://localhost:3100/travel/manage` |
| Fixed website/editor address | `http://localhost:3100` |
| Published profile | `https://www.kwanho.dev/about` |
| New interactive map | `http://localhost:3100/about?view=map#skills` |
| Edit familiarity and visibility | `http://localhost:3100/about/manage` |
| Every repository review | `http://localhost:3100/about?view=repositories#skills` |
| New A4 CV design | `http://localhost:3100/studio/cv-editorial-2026-10-27/index.html` |
| Five new CV design cycles | `http://localhost:3100/studio/cv-designer-cycles-2026-10-27/index.html` |
| Current CV UI-detail review | `http://localhost:3100/studio/cv-interface-details-2026-10-27/index.html` |
| New CV print proof | `design/cv-interface-details-2026-10-27/captures/round-3.pdf` |
| CV design review outcomes | `reviews/cv-five-designer-cycles.md` |
| CV contact/completeness review | `reviews/cv-contact-and-completeness.md` |
| Current paper-card studies + references | `http://localhost:3100/studio/business-card-2026-10-27/index.html` |
| Prior ten profile concepts | `http://localhost:3100/studio/directions-2026-10-27/index.html` |
| Research detail | `design/directions-2026-10-27/research.md` |
| Current local work and validation | `reviews/skills-owner-release-outcomes.md` |
| Publication gate status | `reviews/skills-owner-release-publication.json` |
| Complete repository source matrix | `source/github-2026-10-27/full-audit/review-matrix.md` |
| Published release record | `reviews/profile-release-outcomes.md` and `reviews/profile-release-live-readback.json` |
| Brand artwork and sources | `http://localhost:3100/studio/identity-assets.html` and `C:/Projects/blog/docs/brand-assets.md` |
| Previous card iteration (historical) | `design/card-motion.gif` |
| Current browser validation | `reviews/stationery-checks.json` and `reviews/stationery-production-checks.json` |
| Gallery local preview | `http://localhost:3100/photography` |
| Gallery workflow | `C:/Projects/blog/docs/photography.md` |
| Blog design specification | `C:/Projects/blog/docs/design.md` |
| Reusable expert prompts | `reviews/design-prompts.md` |

The original supplied `CV-3.pdf` was not overwritten. The earlier website PDF is preserved at `source/cv-blog-original.pdf`; its original text and the supplied PDF's text are also retained in `source/`.

## Review records

- `reviews/content-review.md`: five distinct content perspectives, with changes adopted and suggestions rejected.
- `reviews/cv-review.md`: historical simulated-role review of the earlier layout.
- `reviews/editorial-cv-review.md`: actual A4 rendering/export passes and the latest contact/program refinement.
- `reviews/blog-review.md`: four Apple-inspired and three Google-inspired simulated roles, exactly three rounds.
- `source/claim-ledger.md`: sources, provisional claims and evidence boundaries.

These are AI role reviews, not endorsements from real designers, recruiters or employers.

## What changed

The website leads with C++ development and describes KLA/Pickit/Bosch through concrete work. KLA's broader lifter work remains explicitly in analysis/design/early implementation. The profile opens work and education, connects skill icons to supported examples and provides direct contact/CV/copy-summary actions. Completed/current education, the challenge-specific BCX prize and paused project status are reflected.

The visual system retains forest/ivory, the plain name wordmark and photographic light. A landscape paper introduction now leads into the open chronology and work viewers. Actual BCX team footage/images and a data-derived atlas preview provide visual substance. Motion remains optional.

Historical Korean study guides retain their original language and AI/public-source provenance. They are not presented as original research or as a record of KLA employment.

`public/CV.pdf` remains the existing corrected copy and contains no Ariadne entry. The new one-page editorial proof is separate and local. LinkedIn returned HTTP 999 and has no connected editing integration, so its deliverable is manual replacement copy.

## Verification and limits

The cinematic production build, TypeScript and content/store checks pass. Current evidence covers motion, keyboard/focus, touch scrolling, reduced motion, gallery operation and normal/enlarged 320–1440px reflow. Independent checks caught and corrected modal fade contrast and a fixed-dock focus collision. Axe retains incomplete checks; this is not a full accessibility certification.

The new CV proof is one A4 page with embedded Source Serif 4/Inter subsets, Unicode maps, ordered selectable text, six links and tagged structure. Rendered-ink margins and grayscale were checked. Earlier Lato and Manrope candidates remain historical references. Actual Word/Google Docs pagination, physical printing, screen-reader use, PDF/UA conformance and ATS ingestion are not claimed.

Automated accessibility checks include cases that require manual judgment. This work does not claim full WCAG conformance or field performance.

## Using Travel editing

Choose Edit atlas on Travel. The local session can add/edit/remove/undo and saves `C:/Projects/blog/contents/travel/places.json`. Published-site editing is implemented through an owner-only GitHub App session and repository storage, but requires the owner's app/deployment settings before activation.

To restart the editor on this machine:

```powershell
& "C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64\node.exe" "C:\Projects\blog\scripts\dev-editor.mjs"
```

See `C:/Projects/blog/docs/travel-owner.md` for GitHub App setup. Live OAuth and repository writes are not yet verified because those credentials are not configured. Public visitors cannot write; tests used temporary data and mock HTTP.

The original eight questions have been answered. Country/job preferences are kept in `source/career-positioning.md`; no visa eligibility or live-vacancy assessment was invented.
