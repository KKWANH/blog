# Portfolio redesign, private admin and security — local outcome

Workspace: `C:/Projects/blog`, origin `KKWANH/blog`, baseline/unchanged HEAD
`e332b7fdbcf655f893c2ea29b0de05ba0da111e5`.
The changes remain a local working-tree candidate. This task did not commit,
push, provision services, upload credentials or publish a deployment.

Review: `http://localhost:3100/studio/portfolio-review-2026-10-27/index.html`.
The primary owner editor/preview is still `http://localhost:3100`.

## Implemented

- Forty-five curated definitions have explicit semantic kinds. The original
  IDs remain; containers means Data structures/practice, not another language.
  OpenCV was already rated and shown by the owner and now has a library
  definition. The icon list is flat and shares levels with the interactive map.
- A 69,512-byte repository index replaces eager full evidence in the client.
  Full 229,060-byte evidence remains available through lazy, revision-bound
  per-repository reads. Sync/build regenerate only the derived index.
- About shows three compact projects. BCX has date, visual-assistance topic and
  the qualified team/challenge award; explanation and film appear on expansion,
  and film bytes still require explicit play.
- Projects navigation is consolidated into About. The index redirects; detailed
  case-study URLs remain.
- Software Engineer replaces the narrow personal headline. Paper texture,
  original two-pane mark, letterless green gradient icons, stronger pointer/touch
  tilt and background light are implemented.
- The selected CV uses Source Serif 4 30pt, a 24pt green Software Engineer role
  and an 11pt body. Three designer and two recruiter AI-role reviews informed
  the synthesis. HTML, Markdown and local `public/CV.pdf` are synchronized.
- Password admin, local exclusive setup, private statistics, optional visitor
  cookies, coarse referral categories, page flows and retention are implemented.
  GitHub publication and password-admin authority remain separate.

## Owner data

All 44 original preference overrides are retained. The later owner save adding
`containers: repository` is preserved: 45 overrides, 39 visible/rated profile
entries. The original 44 definition IDs remain. Travel has 115 records and
matches the intake hash. Browser writes used fixtures; real-file hash checks
also passed during fixture runs.

## Measured and tested

The final production build/type check passed without the earlier tracing/Edge
warnings. Runtime TypeScript compilation was removed; the compiler and private
state files are absent from server traces.

Initial encoded JavaScript in fresh local production browser contexts:

| Route | Before | After |
| --- | ---: | ---: |
| `/` | 245,012 B | 208,553 B |
| `/about` | 249,334 B | 212,882 B |
| `/travel` | 601,578 B | 565,126 B |

About's initial JS is approximately 14.6% smaller. This is a controlled local
transfer comparison, not a claim about visitors' real-world LCP.
68,244,468 bytes of unused font deployment assets were archived byte-for-byte
before removal. The active Korean subset and license remain.

Validation artifacts under `design/portfolio-review-2026-10-27`:

- Five adversarial AI review/fix/retest rounds and all native security groups
  pass; see `security/review-cycles.md` and failing-proof artifacts.
- Native content/store/owner/sync fixtures pass.
- Interactive map: 36 checks, including all 74 lazy source panels.
- Skill editor: 26 checks with intercepted fixture writes.
- Paper/portraits/film/touch: 51 checks.
- Isolated real-browser admin/consent flow: 24 checks; temporary credentials and
  data were removed after its server stopped.
- Actual production document/route/trace/readback checks: 26 checks.
- CV: 14 export/content/synchronization checks, one A4, embedded fonts/Unicode,
  tagging and six links. Selected PDF SHA-256:
  `ce57a32d6e13ed9be7e7629d53ecb8cbac809a8f617b32573fa2d00ebbd9343c`.
- Review board: images loaded and desktop/mobile widths passed.
- Production dependency audit: no published advisories at check time.

The map harness initially failed a group-drag assertion after layout changes.
A targeted probe showed the branch and child moving together; the harness now
waits for a stable hit target and observable, zoom-aware movement, and records
both coordinate deltas. The final full run passed.

Automatic accessibility audits on the tested map/editor/paper/portrait/film
views reported no violations. Contrast/ARIA/video manual-review categories
remain; this is not blanket accessibility certification.

## Operational limits

No real administrator password was created by the agent. The owner can choose
one at `/admin/setup` on the opt-in localhost editor.
Public collection requires the documented secrets and durable Redis storage;
GitHub sign-in also requires durable revocable sessions.
Actual Redis Lua, live OAuth/GitHub writes and a configured public deployment
remain unverified. Statistics begin after activation; no historical Vercel
statistics were imported.

AI-role reviews are not external human or security certification. No physical
phone/HIL, physical CV print, real Google Docs import or ATS acceptance was
claimed.

The company-only doctor/claim helper rejected the personal blog origin. No
company binding, rules, workspace data or lease was changed/fabricated.
