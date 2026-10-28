# kwanho.dev

Kwanho Kim's work, engineering notes and future photo collections. Built with Next.js 16 and React 19.

## Run locally

Use Node.js 22 or a compatible version supported by Next.js.

```sh
npm ci
npm run dev
npm run typecheck
npm run test:content
npm run build
```

The fixed local address is **http://localhost:3100**. `npm run dev:edit` uses the same address with local Travel editing enabled. `npm run preview` reviews a completed production build on that address. A busy port fails clearly instead of selecting another one. See `docs/local-preview.md`.

For production metadata, set `NEXT_PUBLIC_SITE_URL` to the preferred public origin, including `https://`.

## Content

- `contents/about/index.tsx` and `components/profile-overview.tsx`: open experience, education and skill-linked work. `/editor` redirects to `/about`.
- `components/career-timeline.tsx` and `components/career-evidence.tsx`: dated overview and the selected work-scope view.
- `components/skill-explorer.tsx`: the same CV/work skills as a compact icon list or an accessible family map.
- `components/project-evidence.tsx`: actual team-project images with source attribution.
- `contents/projects/`: selected project notes.
- `contents/notes/index.md`: English writing index.
- `contents/notes/device-readback/index.md`: an English engineering note using a generic example.
- Existing Korean guides remain explicitly labelled study archives, with their original date and AI assistance disclosure.
- `lib/profile.ts` and `lib/projects.ts`: concise homepage copy.
- `public/CV.pdf`: current CV copy, updated from the owner's confirmed facts.
- `contents/photography/photos.json`: future photo collections; the empty gallery is not published.

Markdown uses UTF-8. The content loader accepts LF, Windows CRLF and a UTF-8 byte-order mark; the content check verifies that metadata stays separate from the rendered article.

The copy leads with C++ development. KLA lifter work is analysis/design and early implementation with team review; Pickit foregrounds bounded system/interface design and integration. BCX is a challenge-specific award. Ariadne is explicitly an AI-built/configured experiment and is excluded from the CV and featured recruitment work. Earprint is on hold. The old `ai/profile.md` is historical source material.

The owner is making the next CV design in Google Docs. The existing corrected PDF remains linked until that authored replacement is supplied.

## Design and assets

See `docs/design.md` for the type, colour, interaction and responsive decisions.

The site uses one forest/ivory treatment, a plain name wordmark and the owner's photographs. There is no light/dark toggle or separate K monogram. Motion can be paused in the header/footer and follows the system's reduced-motion preference.

Technology and employer marks use locally served SVG/PNG artwork with documented sources in `docs/brand-assets.md`. On About, they connect to supported work/project context or the CV entry. The paper introduction includes active contact links and three equally weighted portraits, led by the camera photograph.

Figtree and Caveat are self-hosted Google Fonts subsets with OFL notices in `public/font/`. The paper introduction uses Georgia with system-serif fallbacks for the name. The small browser icons use a crop of the window photograph. Regenerate them with:

```sh
node scripts/generate-icons.mjs
```

The travel map uses the bundled Natural Earth country geometry and existing visited-city data. It provides country/city overview and selection, without an external raster tile API. It does not provide street-level mapping.

Choose **Edit atlas** on `/travel` to open `/travel/manage`. Local editing uses `npm run dev:edit` and writes `contents/travel/places.json`. Published-site editing requires the owner's GitHub sign-in and a repository-scoped GitHub App; it is disabled until configured. See `docs/travel-owner.md` for setup and `docs/travel-editor.md` for the data workflow.

MapLibre's worker is self-hosted. `postinstall`, `prebuild` and the local launcher prepare the matching worker/license from the installed package. A direct `next build` invocation should first run `node scripts/prepare-map-worker.mjs`.

The photo gallery supports collections, a full-image viewer and keyboard navigation. Use `npm run photos:add -- --file ... --title ... --alt ... --collection ...` to prepare a real collection locally. The development-only portrait sample is not published as the owner's photography. See `docs/photography.md`.

The production build enforces TypeScript checks. Browser verification is separate from the build; neither establishes factual approval of career claims.
