# Skill familiarity, visibility and repository sync

The catalogue distinguishes languages, frameworks, libraries, tools, platforms,
communication interfaces and engineering practice. `containers` remains the
stable ID, but its label is **Data structures** and its C++ implementation is
project evidence. `processes`, `threads`, `http`, `interfaces` and `recovery` are
also practice. Familiarity and visibility remain attached to the same IDs in
`skill-profile.json`; regrouping does not reset the owner's choices.
Each curated definition must include a `kind`; `related` lists other stable
skill IDs without transferring their familiarity ratings.

The flat icon list separates tools/languages from practice and displays the
same levels used by the map. `repositories.generated.json` retains the complete
reviewed sources; the derived `repositories.index.json` contains the small
public index. Detailed evidence loads from `/api/repositories/[name]` on demand.
Run `npm run skills:index` after manually changing the reviewed catalogue.
Dev startup, build and successful sync also refresh the index.

Local **Save** writes JSON on this computer; public readers see it after
publication. Configured GitHub saves update the fixed repository file and
return a publication reference. Visitors have no save authority. The statistics
password is a separate login and cannot authorize repository writes; see
`admin-statistics.md`.

Public map dragging, zooming, searching and branch collapse change that
visitor's view. They do not save familiarity, visibility or repository data.

Open **http://localhost:3100/about/manage** after `npm run dev:edit`. The profile's **Owner skill settings** link goes to the same screen. Familiarity is self-assessed; the implementation does not infer ratings from dependencies, repository counts or employers.

## Files and ownership

| File | Purpose | Who changes it |
| --- | --- | --- |
| `contents/about/skill-definitions.json` | Curated labels, groups and experience/practice context | Owner or an agent reviewing the actual evidence |
| `contents/about/skill-profile.json` | Familiarity and visibility overrides | Owner editor, or direct reviewed JSON edits |
| `contents/about/repository-overrides.json` | Contribution boundaries and reviewed-commit annotations | Owner/agent review |
| `contents/about/repositories.generated.json` | Pinned repository/source/technology catalogue | Sync command |

Keep these responsibilities separate. Sync never assigns familiarity and never rewrites definitions or profile preferences. Historical repository technology facts remain even when a technology is hidden from the current skills profile.

## Preference format

Version 1 has `updatedAt` (ISO timestamp or `null`) and an `entries` object keyed by the stable technology ID. Example only:

```json
{
  "version": 1,
  "updatedAt": null,
  "entries": {
    "cpp": { "level": "comfortable", "visibility": "profile" },
    "mne": { "level": null, "visibility": "hidden" }
  }
}
```

Levels:

- `null`: not rated; no public level badge.
- `learning`: learning or refreshing basics.
- `used`: used before and may need a refresh.
- `comfortable`: comfortable using it independently.
- `strong`: confident use and explanation of the important decisions.

Visibility:

- `profile`: normal icon list and map; can include an explicitly selected repository technology.
- `repository`: only the optional repository-technology view/context.
- `hidden`: absent from skill lists, map nodes and map search. Historical repository records retain source facts, without a link that reopens the hidden skill.

Without an override, curated definitions appear on the profile, and additional detected technologies remain repository context only. Unknown/orphaned overrides are retained for future restoration. Reset removes an override and returns to the definition default.

The CV is a separately reviewed selection; changing a website familiarity value does not rewrite the CV automatically.

## Save and access behavior

Local editing uses the existing opt-in development session (`TRAVEL_EDITOR_ENABLED` set by `dev:edit`), loopback checks, an exact request origin and a CSRF header. Production never enables local-file writes.

The public owner login uses the same GitHub App and owner-ID policy as Travel.
The skill CSRF purpose/header is distinct. The GitHub token stays encrypted in
authoritative private storage; the browser JWT contains only its session ID.
Saves target only `contents/about/skill-profile.json` on `KKWANH/blog`, `main`.

If the app is not configured, the deployed editor explains that it is read-only. Follow [Travel owner setup](travel-owner.md) for the shared App/environment setup. A repository save becomes public after deployment.

Saves include the current document revision. A changed file/tab/agent revision returns 409; unsaved choices remain in the editor until the owner explicitly reloads/discards them. Local writes use a queue and temporary-file rename. Invalid/corrupt input does not replace the saved document with defaults.

The list and map share one preference provider. Saved changes notify other tabs, and the public view refreshes on focus. `SKILL_PROFILE_PATH` may point to an isolated fixture for tests; the normal file path above is the default.

## Repository refresh

```sh
npm run skills:sync
npm run skills:sync:check
npm run skills:sync -- --dry-run
npm run skills:sync -- --if-stale=24
npm run skills:validate
```

`skills:sync` reads the complete public inventory, reuses unchanged pinned reviews, inspects bounded documentation/manifests/source for changed repositories and writes only the generated catalogue. Relationships in the map/catalogue rebuild from this file. `--check` writes nothing and exits 1 when repository/annotation changes are found. `--dry-run` reports without writing; `--if-stale` allows a caller to avoid frequent refreshes.

Changed/new source is marked **needs review**; dependency presence is not upgraded to implementation expertise. After actually reviewing a changed commit, an agent can set its `reviewedCommit` in the overrides file and preserve/adjust scope notes and source-backed technology overrides.

Raw Python bodies are not fetched by this sync. Available manifests/documentation supply dependency evidence, and source access limitations remain explicit. It never executes repository code. API/rate-limit/network failures do not replace the generated file; unavailable optional source files are recorded with review-pending status. A concurrent generated-file change is detected before replacement.

The command does not commit or push, and is deliberately separate from page loads and production builds. This keeps publishing reproducible and lets an owner/agent review a diff before publication.

The npm sync commands use `--use-system-ca` on the supported Node 22 runtime so the Windows/system certificate store is respected on this machine. Certificate verification remains enabled. Direct script invocations should use the same flag when corporate TLS trust requires it. An optional `GITHUB_READ_TOKEN` environment variable can raise API limits; no token is needed for the normal public inventory and no token is printed.

## Agent workflow

1. Read the four files above and inspect current changes before editing.
2. Add a new curated skill with a unique stable ID and an existing group; do not infer a familiarity level.
3. Change only the requested preferences. Preserve unrelated owner settings.
4. Run the sync command if repository evidence needs refreshing, then inspect new/changed/removed/review-pending records.
5. Run `npm run skills:validate` and the normal build before publication. These checks use fixture files/HTTP for writes and do not modify real atlas or skill preferences.
