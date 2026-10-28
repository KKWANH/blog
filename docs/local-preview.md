# A fixed local address

The same owner-facing origin now includes `/admin` and `/admin/setup`. Setup is
available only in the opted-in editor and writes private configuration outside
the repository. See `admin-statistics.md`. Internal browser fixtures can use a
separate development cache with `PORTFOLIO_DEV_DIST=.next/admin-qa`; do not change
the established owner preview address or real data paths for a test.

Use **http://localhost:3100** for this project. No DNS/hosts-file change is needed: `localhost` already resolves to the local machine.

```sh
npm run dev
npm run dev:edit
```

Both commands use the same fixed address. The second enables local atlas editing. Run only one at a time. If port 3100 is occupied, the launcher exits with an explanation; it does not kill another process or select a different port.

For a local check of a production build:

```sh
npm run build
npm run preview
```

Stop development first; preview also uses `localhost:3100`.

Useful paths:

- `/about`: profile and business-card introduction
- `/travel`: atlas
- `/travel/manage`: owner/local editing
- `/studio/`: private design studies, development only

The launcher discovers the sibling `career-refresh-2026-10/design` folder when present. `DEV_STUDIO_DIR` can point to another local design folder. The studio serves only allowlisted file types inside that real directory, has no directory listing, rejects traversal/symlink escapes, and requires a loopback development request. It returns 404 in production.

The IDE/browser-preview helper can create its own temporary proxy URL. That proxy is optional; the direct address above is the stable bookmark and the address used in current checks.
