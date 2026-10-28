# Owner editing decision

The published Travel tool was intentionally hidden because the previous implementation only authorized opted-in loopback development requests. The user's 27 October feedback makes published-site editing an explicit requirement.

## Chosen boundary

Use GitHub App sign-in and a fixed repository target. This reuses the owner's existing GitHub account protections and restricts the app installation to `KKWANH/blog`. A short PIN, URL hiding or browser-only flag would not authorize server mutations.

A separate password system could be built, but it would add password/reset/rate-limit management for one owner. The selected account flow avoids that extra identity system.

The app's user access token is encrypted in an HttpOnly session and omitted from the public session response. Owner ID, token expiry, exact origin, JSON content type, session-derived CSRF token and revision checks all remain server-side.

Repository persistence uses GitHub's contents/blob-SHA precondition. There are no writes to a serverless filesystem, no client-selected repository/path, no redirect following and no automatic conflict retry. The UI distinguishes local saving from Save & publish.

## Concrete limitation

The GitHub App and deployment secrets are not configured in this workspace. No credentials were fabricated, obtained from another application or printed. The sign-in route fails closed until configured. Live OAuth login and real repository writes require that owner setup; tests use encrypted fixture sessions and mocked HTTP, not real GitHub writes.

## Dependency review

The dependency audit identified affected pre-existing Next.js, MapLibre, Zod and transitive versions. The implementation now uses Next.js 16.4.3, MapLibre 6.16.0, react-map-gl 8.1.3, Zod 4.6.7 and patched PostCSS/transitives. The native worker needed explicit same-origin hosting after the map upgrade; that is prepared from the installed package, with its license.

The subsequent npm audit reported zero known vulnerabilities. This is an audit result at the time of the check, not a security certification.

Initial advisory details are retained in `auth-dependency-audit.json`. Runtime, cookie/CSRF and repository-conflict checks are separate from that dependency scan.
