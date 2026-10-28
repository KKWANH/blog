# Open evidence, not another portrait effect

User direction, 27 October 2026: remove the empty field-note reverse; make work/education visible; connect skill icons to real evidence; explore ten distinct concepts and five real references; provide a discoverable, secure Travel editing tool.

The published baseline is `8e5b24d`. The previous push/deployment is verified. Company task-history edits in the accompanying IDE metadata are unrelated and remain untouched.

## Design test

The portrait should identify the person without consuming the page's entire visual interest. The interesting material is the actual relationship between skills, work, study and public projects. Default content must be open. Interactions focus or explain it; they do not gate basic facts.

Candidate direction: an editorial identity, an open work/education chronology and a visual evidence companion. The research board will compare this with nine distinct alternatives before final selection.

## Travel access decision

The current live site deliberately hides the old local-only controls. This explains the user's missing tool and does not satisfy editing from the public site.

Prepare a visible owner entrance, owner-only GitHub sign-in and repository-backed persistence. A GitHub App installed only on the blog repository limits the content-write permission. User tokens remain encrypted in an HttpOnly session, are never returned to the client, and expire. Server-side owner-ID, origin, CSRF and revision checks remain mandatory. Public visitors receive the atlas, not write capability.

Use the maintained authentication library, not a custom short-PIN login. Configuration requires an owner-created GitHub App and deployment secrets; no credentials are invented, copied from another application or printed. Tests mock repository writes and use temporary local data.

Dependency audit exposed pre-existing affected framework/map/validation versions. Patch those before enabling remote editing; validate the map and the existing data contract after the version changes. Do not run an indiscriminate forced audit upgrade.
