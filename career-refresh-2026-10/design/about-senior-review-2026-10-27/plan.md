---
status: implementing
scope: personal portfolio design, copy, shared presentation and publication
baseline: e332b7fdbcf655f893c2ea29b0de05ba0da111e5
---

# About hierarchy and finishing detail

## Owner intent

Put Work/Education above Skills. Make role, date/duration and self-assessed
familiarity materially easier to read. Normalize technical icons across image
and outline sources and sizes. Add a debossed name/mark, trial selectable
cursive, clarify the abstract card tagline, replace the ambiguous symbol,
and arrange desktop portraits less rigidly while tightening the mobile gap.
Replace the two featured 42 projects with one stronger photo/README-backed
project. Keep Color Saves Life more informative before expansion.
Explain/administer the multi-device deployment path, automate Last updated,
review home/remaining page copy, and push the resulting blog changes.

The current prompt explicitly asks for push. That does not authorize other
GitHub mutations. Prepare and verify the exact local candidate before the
one push call; if automatic approval rejects it, report the gate and do not
retry/substitute a remote API.

## Senior design plan (AI perspective, not Apple affiliation)

1. Introduction → Work → Education → Selected projects → Skills. Keep evidence
   links/anchors usable and update direction-dependent copy.
2. Role 24px desktop / 20px mobile; company 18px; period/duration 15–16px;
   readable 16px narrative. Month-level dates cannot imply invented day precision.
3. Familiarity uses 14px text plus a non-colour indicator, counts, filtering and
   area/familiarity grouping. No rating is inferred or changed.
4. One reusable square icon frame, one optical target, and explicit exceptions
   for wide/empty logos. Check image and Lucide paint at 16/24/32/48px.
5. Name stays live text. Compare existing Caveat with more cursive options.
   Deboss uses shallow dark upper/light lower edges and readable ink, not a glow.
   A clear K/KK identity replaces the divided rectangle; favicon remains the
   owner's requested letterless rounded green field.
6. Desktop portraits get alternating offsets/overlap; mobile retains swipe,
   large images, focus visibility and about 24px of meaningful top spacing.
7. Show each selected project's purpose, context/contribution and source link
   before expansion. Film still requires explicit play.

## Evidence and operational decisions

PiRacer instrument cluster is the strongest additional candidate: the retained
`DES02-PiRacer-instrument` README has a dashboard demonstration, architecture
diagram and linked CAN/RPM/battery/IPC/Qt documentation. Present it as a SEA:ME
team/training project, not a commercial release or sole-authored system.
Source commit: `96706c8e55594ec3161c958a1a572592447c7e1b`.
The earlier source review records restrictions on raw Python downloads;
those restrictions are not bypassed or represented as completed code review.

“Systems · integration · interfaces” is connected to the experience but too
abstract for the card. Use concrete device software/operator-tool wording.
Existing career/CV contribution and in-progress qualifications remain.

Last updated will use a source revision timestamp, not the visitor's clock or
an arbitrary redeployment time. Missing provenance must not fabricate freshness.

Local admin is already configured: preserve that private configuration without
reading or exposing its values. Shared multi-device use needs the public HTTPS
origin and durable production storage/secrets. No Vercel/Redis management
integration or CLI is available here; do not claim production activation or
copy private configuration into Git.

## Invariants and acceptance

- Preserve the current skill preferences, travel records and selected CV bytes.
- Preserve meaningful links, source context, keyboard/focus, reduced motion and
  touch scrolling. Do not reduce media/privacy/authentication boundaries.
- 320–1440px reflow and 200% text; readable labels; 44px controls.
- Actual screenshots and copy comparison, public/owner behaviour checks,
  native security/content checks, type/build, source-derived date readback.
- Personal Git identity, no secrets staged, one authorized push, then read back
  the remote ref and deployment. Record any unavailable external configuration.

The company-bound doctor/claim helper rejects this personal origin. No company
binding/lease is changed or fabricated. Company and sidecar dirty states were
inspected and are outside this task. At most two review workers/one heavy job.
