# CV interface detail and owner-managed skills release

## Owner request

Add a little visible design/UI character to the CV; use three designer and two recruiter review roles. Improve the map without a C++ centerpiece. Let the owner enter familiarity levels and exclude forgotten skills, keep this in files for future agents, reflect levels in icon lists, improve background interaction and script repository synchronization. Publish after completion.

## CV

Keep the stronger hierarchy and readable typography from the five new cycles. Add a restrained graphic identity detail and a more designed capability band, without restoring the rejected oversized name box. Preserve Gmail, city/country, separate completed programs, current-work scope and the team/challenge award.

Capture actual A4/header/skills areas. Obtain five independent **AI-role** reviews: visual-identity designer, editorial designer, product/UI designer, C++/EU recruiter, and technical-recruiter/scan review. Run at most two reviewers at once, read-only; integrate findings and request a final review of the revised captures. These are simulations, not real human endorsements.

## Skill ownership and persistence

- Curated definitions and owner familiarity/visibility are separate JSON files.
- Familiarity starts unset; the agent does not guess ratings.
- Visibility supports profile, repository-only and hidden.
- Owner editing follows the existing local opt-in / GitHub-owner access model, with scoped CSRF, revisions, validation and atomic local writes.
- The list, map and inspectors read the same preference state.
- Sync updates generated repository evidence only and never overwrites owner preferences or manually curated definitions.
- Provide an explicit, repeatable sync command and report/check mode. Do not add autonomous GitHub commits/pushes or network work to every page/build.

## Map interaction

Center on the person, with a neutral identity icon. A background tap/click steps out to the overview; double-click/tap zooms around the pointer, with an explicit zoom-out modifier/control. Preserve pan, pinch, branch drag, keyboard control, reduced motion and page scrolling.

## Validation

CV visual/print review and content boundaries; skill save/reload/hide/levels, conflict/invalid input and owner/CSRF gates; list/map consistency; script incremental sync, failure atomicity and preference preservation; existing atlas/media/CV regressions; native build/type/content checks. Test fixtures must not mutate the owner's atlas or assign real skill ratings.

## Publication and environment

Baseline: blog `3f85a90` plus preserved local work. The current prompt authorizes one final push after the complete candidate is validated; verify the remote and actual deployment. The public CV will use the selected reviewed PDF.

Company-bound doctor/claim rejected the personal blog origin. No binding or credential was changed; company/sidecar work is preserved. Limit review concurrency manually to two. No new installed dependency is planned.
