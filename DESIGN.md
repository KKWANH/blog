# Design: window light

The site uses a single forest environment with ivory type and warm reflected light. The owner's window photograph supplies the atmosphere. The profile now gives its visual weight to open chronology, linked skills and actual work material rather than a portrait-card effect.

## Identity and type

The name/domain is the wordmark. There is no separate K monogram. Browser icons use a quiet crop of the window photograph.

Figtree is the primary Google Fonts family, self-hosted as a variable WOFF2. Bastliga One is reserved for the business-card signature. Korean archives retain their existing fallback. OFL notices accompany the font files.

Name/type hierarchy is responsive. Headings carry their own weight: no tracked label sits above a heading, except the printed role line on the business card. Facts that used to live in such labels sit below the heading.

Display type stops at 6rem and tracking at -0.04em. Interface text stays at 12px or above; admin chart ticks and study-diagram labels may use 11px. Reading text stays left aligned. Prose is capped at 55ch because Figtree's wide zero makes 65ch run past 90 characters. Metadata uses opaque secondary colour.

## Colour

Dark is the default. A saved light preference is honoured. Light mirrors dark's structure and is consolidated in `styles/light.css`: no control gets a filled box that dark does not have.

| Role | Dark | Light |
| --- | --- | --- |
| Environment | `#071B13` | `#F6F5EF` (linen) |
| Reading/card surface | `#10291E` | `#FCFBF6` |
| Primary text | `#F0F2E5` | `#14281C` |
| Secondary text | `#B4C7B8` | `#4A6652` |
| Reflected green | `#C9DFB5` | `#23543B` |
| Warm light | `#E6BF7D` | `#7D5A17` |
| Rule | `#355344` | `#CAD9C6` |
| Strong boundary | `#789682` | `#8FAE92` |

`/admin` stays in the dark cockpit under either theme. The business card inverts stock: ivory cotton under the dark theme, deep emerald under the light theme, with identical geometry.

The study guides share semantic hues: emerald, steel blue (`--brand-cyan`), dusty rose (`--brand-violet`) and amber. The token names are historical; periwinkle and lavender are gone. Text is never filled with a gradient.

The travel globe uses a sapphire ocean and a deep orbital sky by the owner's choice, outside the forest palette. It stays on `/travel`.

## Motion architecture

- `motion-provider.tsx`: system reduced-motion preference, pause persistence, page visibility and shared availability.
- `atmosphere.tsx`: pointer/scroll response of the preblurred photographic environment and light. No animated blur.
- `tilt-surface.tsx`: stable hit area; frame-scheduled CSS-variable updates; touch direction threshold; offscreen reset.
- `profile-overview.tsx`: open career/education records; skill selection focuses related evidence without hiding the other entries.
- `career-timeline.tsx`: work periods and the ongoing degree as bands; awarded degrees as a marker at graduation, with no start date. Undated completed programs stay outside the scaled chart.
- `lib/physics.ts`: springs (damping ratio + response), momentum projection, rubber-banding and release velocity, shared by the gestures below.
- `travel/use-sheet.ts`: the mobile travel sheet drags 1:1 by its head and throws closed; every close leaves along its arrival path.
- `use-photo-swipe.ts`: the photo viewer pages sideways and dismisses downwards; buttons and keys hint the same direction.

The environment moves up to 12/8px with the pointer. The separate light direction moves up to 48/24px; scroll reduces atmospheric intensity and shifts it by 24px. A slow light plane adds 8–16px drift. The foreground photograph has a smaller tilt than the contact object.

The former portrait flip and field-note reverse have been removed. The introduction now uses a landscape 85:55 paper calling card, with a serif name, dark green ink, static grain and a fine edge. Three supplied portraits appear as separate prints. Skill icons still highlight supported role/project relationships; there are no proficiency scores or invented metrics.

Projects without real media are plain rows, not cards: name and summary on the left, ways in on the right. They carry no generated illustration and no sequence numbers; a screenshot is added when one exists. Button lift eases over 170ms; every control answers on press, faster than on release. Work sections translate slightly on entry where scroll timelines are supported; text is never faded away.

## Reading and input

The card's printed face contains identity and native email/website links, each with an adequate hit area. A decorative C++ impression, fibre grain and a fine inset rule add print detail. CV, email, vCard, LinkedIn and copy-summary controls also remain outside the paper.

Work and education stay open. Skills offers an icon list, a real interactive map and the complete repository catalogue. The map has a camera with pan/zoom/pinch, draggable nodes and branches, folding, search, an overview navigator and an expanded dialog. A skill connects to actual work or source-linked repositories; repository stacks carry their own contribution context.

The center represents Kwanho with a neutral identity icon. Clicking empty background steps out to the overview; double-click/tap zooms at the pointer and Shift-double-click zooms out. Familiarity badges are owner-entered labels shared with the icon list. Hidden skills leave those views while historical repository facts remain in their records.

Normal wheel scrolling passes through the embedded map. Modifier-wheel/pinch and explicit controls zoom it. Offscreen nodes leave the tab order; search, keyboard camera controls and the normal list provide access. Optional camera transitions follow the shared motion preference.

Company-mark buttons lead to the corresponding record and focus it. The full timeline row can be activated. Selecting a skill itself does not unexpectedly scroll the page.

Normal mobile cards retain the landscape ratio. At enlarged type, the card can grow vertically, the name/email have meaningful break points and contact buttons stack. Paper movement is limited to 3° pitch, 4° yaw and 3px lift, governed by the shared motion controls.

The narrow timeline starts with recent work, retains sticky labels and exposes a horizontal-scroll cue. The complete record follows in ordinary text. Public project artifacts have useful alternative text, intrinsic image proportions and visible full-size links.

The header is 56px on desktop and 52px on phones, with 44px targets. Its only edge is a short blurred fade that appears once content scrolls beneath it. Pause is available in the footer. Reduced motion or manual pause removes spatial effects and travelling light; gestures still track the finger and close with a short fade. Reduced transparency and increased contrast replace glass with solid surfaces. Content and native links remain available.

Dialogs retain opaque text/background during entry; only a small scale transition remains. Focus is contained and returned to the opener. Controls target at least 44px.

## Photography and content

The supplied camera portrait leads About's three equally sized prints. The formal and window portraits retain comparable visual weight. On phones, a horizontal strip keeps each picture large rather than reducing three faces to tiny thumbnails. Small derivatives reduce page weight. Normal activation opens a keyboard-operable viewer with focus return; modified clicks and no-JS use retain native image links.

Actual C++, Python, React and ROS SVG marks and employer SVG/PNG artwork are served locally. See `docs/brand-assets.md` for sources. Generic interfaces/recovery concepts keep ordinary UI symbols.

Color Saves Life uses actual team screenshots and a silent demonstration with deliberate playback. The film is not preloaded merely by opening the page. See `docs/project-media.md` for source and attribution.

The future gallery uses a contact sheet, collection filters and a keyboard-operable image viewer. A clearly labelled local preview does not become a public empty gallery. See `docs/photography.md`.

English is the default for current copy/UI. Korean study archives retain their language and AI/public-source provenance. Career descriptions distinguish contribution, current stage and validation limits. Ariadne is an AI-built/configured experiment, not evidence of retrieval-system expertise.

Owner tools have one public entrance, the footer's Owner tools link to `/admin`, which links on to `/about/manage` and `/travel/manage`. No other public page shows an owner control. Local editing and authenticated repository editing share validation/conflict handling. Published writes require the configured owner's encrypted GitHub session, origin and CSRF checks; see `docs/travel-owner.md`. Public visitors retain read-only access.

## Deliberate exceptions

These read as generated-UI patterns to a detector and are kept on purpose:

- Linen background in the light theme.
- Business card: role line above the signature, small printed text and stepped edge shadows standing in for paper thickness. Its fibre and grain textures are the stock itself.
- Pointer light on the page background, kept faint.
- Moving dots in study diagrams, which show electrons and data flowing.
- Timeline year grid and dashed ongoing band, which encode time and state.
- Line length of the CV summary, set for an A4 page.
