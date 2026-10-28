# Revision after the owner's answers

26 October 2026. Authorized scope: CV/profile/LinkedIn copy, portraits, a functional business-card About page and Travel create/update/delete UI. Existing review rounds remain historical. The owner's later direction requests a storyboard-led process with iterations against actual reader tasks and observed results.

## Direction

Lead with C++ software engineering. Show lifter error recovery as ongoing analysis/design/early implementation with team review. Retain camera settings and serial device-control work without broad image-processing/interlock expertise claims.

The latest photo direction supersedes the initial selection: supplied photograph 4 for the home/social atmosphere; the green profile portrait only for About/contact-card identity. The actual green file is `PROFILE.png` / `PROFILE.resized.jpg`; lowercase `profile.jpg` is a different, phone-obscured image. The interpretation was explained to the owner. Originals are preserved. See `../design/storyboard.md` and `storyboard.html`.

About becomes a compact contact card with visible CV/email/contact actions and a recruiter-summary dialog. Dates, skills and completed education should be easy to inspect. Detailed work notes can be disclosed, not poured into a long biography. Handwriting is an annotation layer, with light wit in useful labels.

## Travel contract

- Preserve the existing city records and IDs as the initial atlas.
- Search/filter and a compact place list make a large atlas usable.
- Add, edit, remove and undo are actual actions with validation and clear feedback.
- Save an atomic local JSON snapshot; updates survive refresh and server restart.
- Reject stale revisions rather than silently overwrite another editor tab.
- Editing is opt-in, local-development-only. Public/production requests remain read-only.
- Validate loopback host/origin and an editor request token; no public unauthenticated write route.
- A public deployment without configured owner authentication/persistent storage cannot claim live editing. Local saved data is included in the next publish.
- Tests use a temporary store, not the owner's live travel history.

## Verification

CV: two-page fit, text extraction, dates/title, track-scoped award, awarded/ongoing education, no obsolete draft questions.

Website: type check/build, business-card keyboard/dialog/CTA behaviour, new portrait crops, mobile and enlarged-text layout, dark theme.

Travel: create/edit/delete/undo, reload/restart persistence, invalid input, stale update, unauthorized origin/token and production read-only behaviour; keep the original seed intact.

## Environment boundary

The company `agent_env.py doctor` passes from the Zeta product root. Doctor/claim correctly reject `C:/Projects/blog` because that tool enforces the KLA Git family. The blog is a different, personal repository; it was not misregistered as the product and the tool/instructions were not modified. This task uses one writer and task-local evidence, preserving the pre-existing blog changes and leaving company product/history files untouched.
