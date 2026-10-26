# Design: window light

The site uses a single forest environment with ivory type and warm reflected light. The owner's window photograph provides a physical source for the colour and movement. Identity, career facts and contact actions remain readable while the photographic objects respond.

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
- `collectible-card.tsx`: independent tilt/turn/material state, inactive-face inertness and explicit keyboard control.

The environment moves up to 12/8px with the pointer. The separate light direction moves up to 48/24px; scroll reduces atmospheric intensity and shifts it by 24px. A slow light plane adds 8–16px drift. The foreground photograph has a smaller tilt than the contact object.

The contact card uses 1000px perspective, ±12° yaw/±9° pitch and up to 10px lift. Tracking uses about 90ms damping, with a softer approximately 420ms return. The inner face turns 180° over 640ms. Light is retained while orientation flattens; the edge and opposing shadow communicate thickness.

Project cards preserve the live site's pointer highlight, 4px lift and artwork movement. Button lift eases over 170ms; pressed feedback is faster. Work sections translate slightly on entry where scroll timelines are supported; text is never faded away.

## Reading and input

CV, email, vCard and recruiter brief remain outside the moving faces. Mobile uses an in-flow action row that can stick below the measured header while the card is handled. It does not overlay the bottom of the viewport. Short screens or enlarged type use normal flow.

Turn is a native button, logically before the active face, with state announcement and stable focus. Forward Tab reaches the revealed note link. The inactive side is inert and hidden from accessibility APIs. Escape returns to the portrait. Touch supports a deliberate horizontal drag while preserving vertical scrolling and pinch zoom.

Pause is available in the header and footer. Reduced motion or manual pause removes spatial effects and travelling light, and switches faces immediately. Content and native links remain available.

Dialogs retain opaque text/background during entry; only a small scale transition remains. Focus is contained and returned to the opener. Controls target at least 44px.

## Photography and content

The main window photograph and professional portrait are separate roles. Facial details were not generated. The professional portrait is confined to the contact card.

The future gallery uses a contact sheet, collection filters and a keyboard-operable image viewer. A clearly labelled local preview does not become a public empty gallery. See `photography.md`.

English is the default for current copy/UI. Korean study archives retain their language and AI/public-source provenance. Career descriptions distinguish contribution, current stage and validation limits. Ariadne is an AI-built/configured experiment, not evidence of retrieval-system expertise.

Travel retains the local-data editor, validation, conflict handling and production write restrictions described in `travel-editor.md`.
