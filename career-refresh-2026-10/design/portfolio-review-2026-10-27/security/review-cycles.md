# Five adversarial AI review/fix/retest rounds

Scope: the local personal portfolio candidate following `e332b7f`.
These are AI-role reviews and executable fixtures, not external auditors or a
production penetration-test certificate. No real password/OAuth/database setup,
owner-data mutation or GitHub write was used for the tests.

## 1 — Owner origins and request boundaries

The local Travel policy accepted another loopback port when the caller already
knew the local token. `round-1-failing-proof.json` retains the policy-only failure.
Local URL/Host/Origin now match exactly, JSON and Fetch Metadata are checked,
and local tokens are purpose-bound. Streaming JSON reads have byte and time
limits. The reviewer additionally challenged stalled bodies and the formerly
shared local capability; these were fixed and retested.

## 2 — Admin setup and session persistence

Password setup is exclusive, local and opt-in; production has no file fallback.
Cookies use purpose-bound authenticated encryption, canonical encodings,
HttpOnly/SameSite/Secure flags and authoritative session records.

The reviewer reproduced a cross-process stale file write restoring a revoked
session. The parent reproduced it with real temporary files and a child process;
see `round-2-race-before.txt`. An interprocess lock now covers the whole
read–modify–replace operation; `round-2-after.txt` passes. Unknown/stale locks
are not deleted by elapsed time. IPv6 source limits use a normalized /64.

## 3 — Analytics privacy and integrity

Four defects were reproduced by the reviewer and covered by regression tests:

- Failed withdrawal discarded the credential needed for retry. Opt-out is now
  immediate and a sealed revocation-only capability remains until confirmation.
- Full referral hostnames could identify subdomains and exhaust attribution.
  Client and server now use vetted coarse categories; unknown hosts share Other.
- Stale visitor cookies inflated sessions. Server-owned session generations and
  activity timestamps now control rotation; sessions count on their start day.
- Local retention required another collected event. Reads, startup and hourly
  maintenance now prune data independently, including when collection is disabled.

Identity recording also checks current consent atomically. Routine page events
do not renew cookies. The targeted reviewer retest closed these reproductions.
Confirmed withdrawal still depends on storage becoming available; pending
responses state that limitation and retain retry capability.

## 4 — Content and browser/deployment boundaries

`round-4-failing-proof.json` shows media source disclosure/prefix traversal and
an unbounded content helper using temporary fixtures. Media now accepts public
image assets only, validates segments and realpaths, enforces size, uses ETags
and sandboxes SVG documents. Content pages are bounded to their real root;
arbitrary TSX runtime compilation/evaluation was removed.

The reviewer found that a Next soft navigation does not install an admin
document CSP. Admin entry/exit now uses native document navigation and global
framing denial; the private page is dynamic with fresh nonces. Actual production
HTML/script/header navigation was tested. Private configuration guards now
canonicalize even nonexistent studio paths beneath junctions.

Markdown/TSX authored in the repository remain trusted code. Markdown link/image
schemes are allowlisted, but rich HTML is not represented as sanitized untrusted
input. No public content-submission path exists.

## 5 — Retargeted revocation and cross-context authority

The first final review found two further medium issues despite the earlier
passing fixture suite:

1. A copied NextAuth JWT could retain publication authority after logout.
   Owner JWTs now contain opaque session IDs; encrypted GitHub credentials live
   in authoritative private storage. App logout revokes before clearing cookies,
   preserves retry credentials on failure, and blocks cookie-only framework
   logout. Copied cookies are rejected afterward.
2. A delayed opt-in from another tab could create a replacement identity after
   confirmed withdrawal. Necessary preference-control sessions, revision-bound
   grant proofs and atomic consent transitions now order those actions.
   Withdrawal advances the revision even before first consent; stale grants
   conflict without setting a cookie.

The second targeted review closed both original reproductions. Native tests
exercise real local handlers, failure injection, copied-cookie replay and delayed
grants for first/existing consent. Password admin, GitHub publication and visitor
cookies remain separate authorities.

## Evidence and remaining scope

- `scripts/check-security.mjs`: five fixture groups pass.
- `scripts/check-content.mjs`: content/store/owner/sync checks pass.
- `admin-browser-checks.json`: 24 real-browser/local-handler checks pass using
  isolated temporary credentials and data; those files were removed afterward.
- `production-performance-security.json`: actual production document policy,
  private-cache/route checks, lazy catalogue and transfer measurements.
- `dependency-audit.json`: no published production advisories at the audit time.

Redis HTTP is mocked in native checks. Actual Redis Lua, live OAuth/GitHub writes
and a configured public deployment remain unverified. A request already
authorized before logout cannot be recalled. Global rate ceilings are not a
distributed-denial-of-service guarantee. Local cleanup cannot run while the
application is stopped. These limits were retained rather than calling the site
“fully secure”.
