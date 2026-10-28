# Owner-directed revision: outcomes

26 October 2026. Scope: confirmed career facts, green photo direction, useful contact-card About page and persistent Travel editing.

## Storyboard to implementation

The visual/interaction plan is in `design/storyboard.md` and `design/storyboard.html`. It separates arrival, identity/contact, recruiter facts, work evidence, travel browsing, editing, saved feedback and recovery. The implementation was checked against those tasks rather than another set of invented scores.

- Homepage uses supplied photograph 4, with restrained green-shadow/warm-highlight correction.
- The contact card uses the green portrait from `PROFILE.png`. The literal `profile.jpg` was a different phone-obscured image; the interpretation was explained to the owner.
- About moved to `/about`; `/editor` redirects. The card offers CV, email, vCard and a recruiter-summary dialog. Work and education use selective disclosure.
- C++ systems work leads the copy. Lifter recovery is described as analysis/design/early implementation with team review. Interlocks/image alignment are not promoted as strengths.
- KLA start, division/team/location, awarded/current degrees, completed programs, BCX challenge win and paused projects are reflected.
- Travel has search/filter, a compact place index, selection and local add/edit/remove/undo. The original 107 records and IDs were preserved.

## Findings corrected during implementation

| Observed mismatch | Correction |
| --- | --- |
| Lazy-loading the editor suspended the larger route, then the map wrapper resumed with a destroyed style (`_loaded`). | Give the editor its own loading boundary and render it only when opened. Preserve identical snapshot identity and keep the base map style stable. A local map boundary keeps the index/editor usable if the map fails. |
| Country/stay labels included all their option text. | Use explicit label/ID associations for editor selects and concise accessible names for filters. |
| A renamed/added place could disappear under the current filters. | Reveal and select the saved place; clear incompatible filters rather than imply the save failed. |
| Map-mode controls overflowed at 320px with 200% root text. | Allow the toggle group to wrap within its actual width. Targeted reflow follow-up passes. |
| PDF metadata still referred to unconfirmed facts. | Update current metadata and remove provisional labels; keep earlier review artifacts historical. |

## Evidence

- `npm run test:content`: actual Markdown loader/renderer for LF, CRLF and BOM+CRLF; actual travel store create/edit/remove/undo, validation, stale revision, concurrent writer, new-instance persistence and corrupt-file behaviour; local host/origin/token/production guards.
- `revision-ui-checks.json`: actual browser create/edit/remove/undo and refresh persistence; recruiter dialog/copy/focus, vCard and redirect; unauthorized requests rejected; map survives updates; normal 320/390/768/1440 reflow; three light-theme audits without reported violations.
- `revision-edge-checks.json`: actual server restart persistence, location lookup/autofill, stale-form rejection without overwrite, dark theme/map, enlarged recruiter dialog and editor audit. The original 320px reflow failure is retained in this report.
- `revision-reflow-followup.json`: that 320px issue corrected; 320/390/768 enlarged-text checks pass.
- `revision-production-checks.json`: production read-only behaviour and correct current CV; real local editor enabled separately.
- `revision-source-snapshot.json`: final source tree and a write-validation check through the actual browser-preview proxy. The local session reaches validation, invalid coordinates return 422, and real data is unchanged.
- `cv/current-verification.json`: two A4 pages, text order, fonts, links, bounds and editable DOCX structures.

Browser data mutations used a separate temporary store. No test entries were added to the owner's atlas. Production deliberately remains read-only even when the enable flag is present; local saving is not a deployment.

Checks use local headless Edge and synthetic browser inputs. Actual Google Docs import, physical printing, real-device touch and screen-reader speech remain untested. No GitHub publication, site deployment or LinkedIn account change was performed.

## Current source

Blog baseline HEAD: `f8ada6a5490e015e4919ac92b7bb731ccbb2d921`. Source snapshot includes 188 tracked/untracked non-ignored files, SHA-256 `c996b598910e7fc06f7c06410b3b57f8f1d2677eb1dc3c1c6dd61623ffc70393`.

The final Next.js production build passed, including TypeScript and all 20 generated pages/assets. Browser-preview validation also confirmed the real local editor capability without writing a test entry into the owner's data.
