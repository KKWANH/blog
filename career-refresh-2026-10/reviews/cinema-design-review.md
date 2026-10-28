# Cinematic revision: design decisions and corrections

26 October 2026. The owner's latest direction supersedes the earlier restrained notebook treatment. The actual live site was inspected at `https://www.kwanho.dev/`; baseline evidence is in `live-baseline.json` and `screenshots/live-baseline/`.

## Live baseline to preserve

The deployed version has pointer-following highlights, 4px project-card lift over 300ms, image enlargement to 1.03 over 700ms, animated project visuals, CTA-arrow movement and ambient drift. Those were missing or weakened in the first local refresh.

The cinematic revision retains these affordances and adds a moving photographic environment, window depth, and a portrait object with bounded tilt, foil/reflection, thickness and a real front/back transition. It uses one colour treatment and a plain name wordmark.

## Specialist advice and decisions

Two simulated, unaffiliated senior perspectives were used. The motion/material perspective proposed a 5:7 portrait object and ±12°/±9° response. The information/accessibility perspective proposed a quieter landscape card and stationary controls. The chosen solution uses the more visibly reactive portrait object, with CV/email/recruiter controls outside it.

The same information-design perspective supplied the detailed Google Docs specification. The owner then explicitly stopped CV-file production. Only the advice/guide continues; no new CV generator, PDF or DOCX is part of this final design phase.

## Concrete review findings

| Finding | Change |
| --- | --- |
| Original primary-button lift eased; the first prototype's lift jumped. | Restore 170ms transform easing and an 80ms pressed return. |
| Mobile card started at y=678 and its turn control at y=1182. | Compress identity to about 100px and use a smaller full-bleed portrait card. |
| Turning erased all light and made the object look like a rotating panel. | Preserve light direction independently of neutralised tilt, add an edge highlight during rotation, a visible spine and a shadow that moves opposite the pointer. |
| Reverse repeated the same career chronology as the page and modal. | Use a concise device-readback insight and a real link to the note. Career facts remain available in the stationary brief. |
| Homepage photograph still looked like a tilted postcard; an arrow did nothing. | Remove the mat/frame rotation, integrate the photograph with directional window light, and remove the false arrow. |
| Pause control was at the page bottom. | Add the same control to the header; keep full text in the footer. |
| Modal entry opacity produced a transient 3.63:1 primary-button contrast result. | Keep modal text/background opaque during entry; preserve a small scale transition. Opening opacity is now 1 and the targeted audit reports no violations. |
| Final independent checks found the lower fixed dock covered part of Turn at 390×820 and covered Save contact/LinkedIn during sequential Tab at 390×844. | Replace the fixed bottom dock with a normal-flow action row that can stick beneath the measured header. Short/enlarged layouts use ordinary flow. |
| Forward Tab after turning skipped the newly revealed note link. | Put the trigger before the active face in DOM order while retaining its visual position below the card. |
| Gallery navigation used a weaker publication condition than the route. | Share the same nonempty published-collection predicate. |

## Behaviour evidence

The final `cinema-checks.json` records 30 passing interaction/content checks, including clear opposite-corner tilt, moving environment, maintained light during turn, stationary actions, keyboard/inert behaviour, forward navigation into the revealed note, persistent pause, touch tilt with vertical scrolling, reduced motion, gallery filtering/lightbox navigation/focus and preserved Travel selection/data. All 32 normal/enlarged reflow checks passed.

The initial modal contrast finding and dock/focus findings are retained in the review history. `cinema-contrast-followup.json` and the final `cinema-focus-final.json` record the corrections. All 35 sequential-focus hit tests in the final run passed; 1 CSS-pixel tolerance is used for subpixel viewport rounding. Axe still has incomplete checks, so these results are not a complete accessibility certification.

The final production build and 14 expected routes passed. The empty gallery and unknown route correctly return 404; production Travel remains read-only even with its enable flag set. Headless Edge sampling over three seconds found p95 frame intervals around 18.3ms for the new card/project and 18.2ms for the live project's baseline, with no long tasks in those samples. This is a same-environment comparison, not a guarantee of 60fps on physical devices.

`photo-import-checks.json` verifies orientation, metadata removal, original preservation, generated assets/manifest, failure preservation and import locking in a separate fixture. The real photography manifest remains empty and unpublished.

## Publication/content boundaries

- Ariadne is excluded from CV/recruitment evidence and attributed as an AI-built/configured experiment.
- Pickit describes bounded communication/interface design and integration, not full-system architecture ownership.
- No new visa eligibility, technical expertise, hardware validation or overall hackathon-win claim was added.
- The gallery uses clearly labelled supplied portraits only in local preview. It is absent from production navigation/sitemap until real photographs are added.
- Travel remains an opted-in local editor; the public site has no unauthenticated write capability.
