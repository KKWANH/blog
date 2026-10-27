# Owner editing on the published site

The public atlas now has an **Edit atlas** entrance at `/travel/manage`. Visibility is not the security boundary. Every mutation is authorized on the server.

Two modes are supported:

- **Local:** `npm run dev:edit` binds to loopback and edits the local JSON file, as before.
- **Published site:** GitHub sign-in, restricted to the site owner's immutable GitHub user ID, followed by repository-backed saving. No writes to a serverless filesystem.

The current owner is GitHub user `35485904` (`KKWANH`). The storage target is fixed to `KKWANH/blog`, branch `main`, file `contents/travel/places.json`. A client cannot select another repository or path.

## Setup

No production credentials are present in this repository. Sign-in stays disabled until these settings are supplied.

1. Create a **GitHub App**, not a broad personal OAuth app. Set the website to `https://www.kwanho.dev`.
2. Set the callback URL to `https://www.kwanho.dev/api/auth/callback/github`.
3. Give the app **Contents: read and write** and the default Metadata read permission. Disable webhooks if they are not used.
4. Install the app only on the **blog** repository. The app uses a user access token after the owner signs in; this flow does not require a private installation key.
5. Put the app's **OAuth client ID** and client secret into the deployment's `GITHUB_ID` and `GITHUB_SECRET`. The numeric App ID is a different value.
6. Generate a random session secret of at least 32 characters and set `NEXTAUTH_SECRET`. Set `NEXTAUTH_URL=https://www.kwanho.dev`.
7. Redeploy, then sign in from `/travel/manage` and verify the repository permissions before editing real entries.

Keep values in deployment secrets or an ignored `.env.local`, not in source, screenshots or chat. `.env.example` contains names only. No PIN or password is embedded in browser code.

## Authentication boundary

The maintained NextAuth GitHub provider handles the authorization-code flow with state and PKCE. Sign-in accepts only the configured owner ID, not merely a matching display name or email.

The session lasts one hour. GitHub access-token expiry is also checked. The access token and a random session CSRF key are held in the library's encrypted HttpOnly cookie. Production cookies are Secure; the public session response omits both values.

The save API additionally requires:

- a valid encrypted owner session;
- the exact configured origin;
- JSON content type;
- the session-derived CSRF token in a custom header;
- validated place data and the revision the owner edited.

The management page cannot be framed on production. No permissive cross-origin policy is added. Local development remains separately gated by its opt-in/loopback checks.

## Saving and publication

**Save & publish** reads the current repository file, checks the content revision, then updates that one file using GitHub's blob-SHA precondition. A stale form or concurrent remote update is rejected. The API does not retry a conflicting write or follow repository redirects.

Each save/removal/undo creates a repository commit. The existing Git deployment then publishes the changed atlas. The owner sees the saved repository state immediately; public visitors receive the new data with the deployment. The UI states that publication may take a moment.

The local 107-record starting atlas and IDs were preserved. Invalid saved JSON is reported rather than replaced. A failed or uncertain save asks the owner to reload; it does not claim success.

## Validation and remaining setup

Local checks exercise encrypted-session decoding, owner rejection, token expiry, origin/CSRF/content-type checks, session redaction and the actual data mutation logic. Repository tests use mock HTTP for revision conflicts, permission failures and save payloads. They do not write to GitHub.

The external GitHub App login and a real repository save require the owner-created app/deployment secrets and have not been exercised without them.

References:

- https://next-auth.js.org/configuration/options
- https://next-auth.js.org/configuration/callbacks
- https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app
- https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
