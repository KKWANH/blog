# Owner workspace and visit statistics

Open `/admin` for password-protected statistics. `/about/manage` and
`/travel/manage` retain their own GitHub owner authorization. An admin password
does not grant repository write access, and a GitHub login does not unlock the
statistics dashboard.

## Local setup

1. Start the established localhost editor with `npm run dev:edit`.
2. Open `http://localhost:3100/admin/setup` and choose your own passphrase.
3. Sign in at `/admin`. The default private files are
   `%USERPROFILE%/.kwanho-portfolio/admin-config.json` and `private-state.json`.

Setup is available only in opted-in loopback development, only while no
configuration exists, and never overwrites existing credentials. The server
stores a scrypt verifier and generates an encryption key; it does not return the
password, verifier or key to the browser. No real credentials are supplied in
this repository. Do not paste private configuration into an agent conversation.

`PORTFOLIO_ADMIN_CONFIG`, `PORTFOLIO_PRIVATE_STATE` and
`OWNER_SESSION_STATE_PATH` can locate isolated local files. Public/source folders
and the canonical design-preview tree are rejected. `.private/` and `.local/`
are ignored alternatives, but the external default is preferable.

Local private-state writes use an interprocess lock across read, modification
and replacement. A crashed process can leave a `.lock` file. It is deliberately
not removed merely because time passed. Stop the associated local workers and
inspect its PID before explicitly removing that lock; preserve the JSON data.

## Production configuration

Configure the variable names in `.env.example` in the hosting secret manager.
There is no production local-file or in-memory fallback.

- `ANALYTICS_REDIS_REST_URL` / `ANALYTICS_REDIS_REST_TOKEN`: durable private
  storage. The adapter requires HTTPS, an Upstash host and no redirects.
- `ADMIN_PASSWORD_HASH`: a `scrypt$1$…$…` verifier, rather than a plaintext
  password.
- `ADMIN_SESSION_SECRET`: an independent, random 32-byte base64url key.
- `ADMIN_ORIGIN`: the canonical HTTPS site origin.
- `ANALYTICS_ENABLED=1`: explicitly enables collection.

The local setup file contains the verifier and local key for local operation.
Production should have its own encryption key. Transfer values directly to
the hosting secret manager, not through chat or a committed dotenv file.
Creating a database, uploading credentials, configuring GitHub OAuth or
publishing a deployment are separate operator actions.

The password session lasts one hour and uses an encrypted, HttpOnly,
SameSite=Strict cookie (`Secure` and `__Host-` in HTTPS). Server session records
are authoritative; successful logout revokes copied cookies. Login has source
and global rate limits. The production source key relies on Vercel's trusted
`x-vercel-forwarded-for`; IPv6 addresses share a /64 bucket. Raw addresses are
not saved. Distributed traffic can still exhaust the global abuse budget;
these limits are not a DDoS guarantee.

GitHub publication also uses revocable server sessions. The encrypted browser
JWT contains an opaque session ID; the GitHub access token is encrypted in
private storage. The owner tools revoke that record before clearing cookies.
Framework cookie-only logout is disabled. Production GitHub sign-in therefore
requires this durable storage even if statistics are disabled.

## Collection and interpretation

Public page views and page-to-page counts are aggregates. Only known public
routes are accepted; admin, API, studio and management pages are excluded.
Queries, fragments, raw IP addresses and full referrer URLs are not recorded.
The client and server reduce referrals to a small set of recognized categories
(Google, LinkedIn, GitHub, etc.); all other hosts become “Other external”.
No arbitrary or identifying subdomain is retained.

Optional visitor/session cookies require a choice in **Privacy & statistics**.
Opening those settings creates a necessary control cookie so choices from
different tabs can be ordered. Grants require the current revision; a stale
grant cannot undo a completed withdrawal. Anonymous page views do not create
that control cookie.

Daily visitors mean opted-in browser identifiers, not identified people.
Sessions use authoritative server activity with a 30-minute idle boundary and
are counted on their start date. The dashboard's visitor card is for today;
summing daily visitors across a range is not a distinct-person count.
Signed-in administrator visits are excluded.

DNT/GPC suppress collection and trigger withdrawal. Withdrawal immediately
suppresses identified counting, revokes server consent and removes the optional
cookie. If storage is unavailable, the response explicitly says withdrawal is
pending and retains a sealed, revocation-only retry capability. It does not
claim completed server revocation until a retry succeeds. A necessary opt-out
cookie remembers the choice.

- Aggregate days: the current and preceding 89 UTC dates.
- Daily deduplication sets: at most two days.
- Visitor consent and preference control: at most 30 days, not renewed by page
  views.
- Opt-out preference: one year; no visitor identifier.
- Admin sessions: one hour; rate buckets have short fixed expiry.

Redis expiry runs independently of collection. Local maintenance runs on
startup, hourly while the development service is running, and on statistics
reads, including when collection is disabled. A stopped local application
cannot run maintenance; it resumes at startup/read.

## Validation and maintenance

`npm run test:security` runs five adversarial fixture groups. They cover origins,
bounded bodies, cookie forgery/expiry/purpose, setup overwrite, rate limits,
interprocess session resurrection, copied-cookie logout, consent storage
failure, concurrent preference changes, source poisoning, retention, media
traversal and document-policy boundaries. They create temporary configuration
and never use real owner credentials or mutate the real atlas/skill profile.

The REST adapter is exercised with mocked HTTP in those checks. Actual Redis
Lua, OAuth-provider writes and a deployed production installation need separate
verification after operator configuration. AI review and local browser tests
are not an external penetration-test certification.
