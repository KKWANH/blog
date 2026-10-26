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

For production metadata, set `NEXT_PUBLIC_SITE_URL` to the preferred public origin, including `https://`.

## Content

- `contents/about/index.tsx` and `components/contact-card.tsx`: contact card and recruiter brief. `/editor` redirects to `/about`.
- `components/collectible-card.tsx`: the portrait/field-note object, with independent tilt, light and flip layers.
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

Fonts are self-hosted Google Fonts subsets with OFL notices in `public/font/`. The small browser icons use a crop of the window photograph. Regenerate them with:

```sh
node scripts/generate-icons.mjs
```

The travel map uses the bundled Natural Earth country geometry and existing visited-city data. It provides country/city overview and selection, without an external raster tile API. It does not provide street-level mapping.

For local add/edit/remove/undo, run `npm run dev:edit` and choose Manage places on `/travel`. Saves update `contents/travel/places.json`; publication remains a separate action. Production editing is disabled. See `docs/travel-editor.md`.

The photo gallery supports collections, a full-image viewer and keyboard navigation. Use `npm run photos:add -- --file ... --title ... --alt ... --collection ...` to prepare a real collection locally. The development-only portrait sample is not published as the owner's photography. See `docs/photography.md`.

The production build enforces TypeScript checks. Browser verification is separate from the build; neither establishes factual approval of career claims.
