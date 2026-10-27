# Design: window light

The site uses a single forest environment with ivory type and warm reflected light. The owner's window photograph supplies the atmosphere. The profile now gives its visual weight to open chronology, linked skills and actual work material rather than a portrait-card effect.

## Identity and type

The name/domain is the wordmark. There is no separate K monogram. Browser icons use a quiet crop of the window photograph.

Figtree is the primary Google Fonts family, self-hosted as a variable WOFF2. Caveat remains only for a few short annotations and sketch labels; it is not the main display voice. Korean archives retain their existing fallback. OFL notices accompany the font files.

Name/type hierarchy is responsive. Reading text stays left aligned, with an approximately 65ch measure; metadata uses opaque secondary colour.

## Colour

| Role | Value |
| --- | --- |
| Environment | `#071B13` |
| Reading/card surface | `#10291E` |
| Primary text | `#F0F2E5` |
| Secondary text | `#B4C7B8` |
| Reflected green | `#C9DFB5` |
| Warm light | `#E6BF7D` |
| Rule | `#355344` |
| Strong boundary | `#789682` |

The `.dark` class also supplies semantic colours to the older study guides. It does not indicate a selectable light/dark mode. Existing saved theme preferences are ignored.

## Motion architecture

- `motion-provider.tsx`: system reduced-motion preference, pause persistence, page visibility and shared availability.
- `atmosphere.tsx`: pointer/scroll response of the preblurred photographic environment and light. No animated blur.
- `tilt-surface.tsx`: stable hit area; frame-scheduled CSS-variable updates; touch direction threshold; offscreen reset.
- `profile-overview.tsx`: open career/education records; skill selection focuses related evidence without hiding the other entries.
- `career-timeline.tsx`: parallel work/study periods. Undated completed programs stay outside the scaled chart.

The environment moves up to 12/8px with the pointer. The separate light direction moves up to 48/24px; scroll reduces atmospheric intensity and shifts it by 24px. A slow light plane adds 8–16px drift. The foreground photograph has a smaller tilt than the contact object.

The former portrait flip and field-note reverse have been removed. The introduction now uses a landscape 85:55 paper calling card, with a serif name, dark green ink, static grain and a fine edge. Three supplied portraits appear as separate prints. Skill icons still highlight supported role/project relationships; there are no proficiency scores or invented metrics.

Project cards preserve the live site's pointer highlight, 4px lift and artwork movement. Button lift eases over 170ms; pressed feedback is faster. Work sections translate slightly on entry where scroll timelines are supported; text is never faded away.

## Reading and input

The card's printed face contains identity and native email/website links, each with an adequate hit area. A decorative C++ impression, fibre grain and a fine inset rule add print detail. CV, email, vCard, LinkedIn and copy-summary controls also remain outside the paper.

Work and education stay open. The Skills section has a compact icon list and an optional mind map of the same four skill families. Its native buttons select work/project context or an explicitly identified CV entry. CV-only languages/protocols are not assigned to an employer without supporting context. The diagram represents categories, not proficiency.

Company-mark buttons lead to the corresponding record and focus it. The full timeline row can be activated. Selecting a skill itself does not unexpectedly scroll the page.

Normal mobile cards retain the landscape ratio. At enlarged type, the card can grow vertically, the name/email have meaningful break points and contact buttons stack. Paper movement is limited to 3° pitch, 4° yaw and 3px lift, governed by the shared motion controls.

The narrow timeline starts with recent work, retains sticky labels and exposes a horizontal-scroll cue. The complete record follows in ordinary text. Public project artifacts have useful alternative text, intrinsic image proportions and visible full-size links.

Pause is available in the header and footer. Reduced motion or manual pause removes spatial effects and travelling light. Content and native links remain available.

Dialogs retain opaque text/background during entry; only a small scale transition remains. Focus is contained and returned to the opener. Controls target at least 44px.

## Photography and content

The supplied camera portrait leads About's three equally sized prints. The formal and window portraits retain comparable visual weight. On phones, a horizontal strip keeps each picture large rather than reducing three faces to tiny thumbnails. Small derivatives reduce page weight. Normal activation opens a keyboard-operable viewer with focus return; modified clicks and no-JS use retain native image links.

Actual C++, Python, React and ROS SVG marks and employer SVG/PNG artwork are served locally. See `brand-assets.md` for sources. Generic interfaces/recovery concepts keep ordinary UI symbols.

Color Saves Life uses actual team screenshots and a silent demonstration with deliberate playback. The film is not preloaded merely by opening the page. See `project-media.md` for source and attribution.

The future gallery uses a contact sheet, collection filters and a keyboard-operable image viewer. A clearly labelled local preview does not become a public empty gallery. See `photography.md`.

English is the default for current copy/UI. Korean study archives retain their language and AI/public-source provenance. Career descriptions distinguish contribution, current stage and validation limits. Ariadne is an AI-built/configured experiment, not evidence of retrieval-system expertise.

Travel has a visible owner entrance. Local editing and authenticated repository editing share validation/conflict handling. Published writes require the configured owner's encrypted GitHub session, origin and CSRF checks; see `travel-owner.md`. Public visitors retain read-only access.
