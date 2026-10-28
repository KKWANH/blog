# Window light: interaction storyboard

This updates the earlier notebook concept after the owner's explicit request for much stronger motion and cinematic atmosphere. It uses simulated Apple/Google senior-design advice, not company endorsements.

## Benchmark

Live baseline captured from `https://www.kwanho.dev/` on 26 October 2026. The deployed site has pointer-following highlights, 4px card lift over 300ms, 1.03 visual enlargement over 700ms, CTA-arrow movement, animated project graphics and drifting ambient layers. These are real affordances to preserve or improve. The first local rebrand removed too much response.

Live factual content is not the authority: its role/location, active-project and LinkedIn descriptions are outdated. Current owner-confirmed facts take precedence.

## Chosen direction

One fixed forest environment, ivory type and warm reflected light. The supplied window photograph provides the environment and homepage subject. The green professional portrait stays on About.

Remove the separate K mark. A plain `kwanho.dev` wordmark does the identification. The photograph and material response provide the character.

The Apple-inspired proposal favoured a vertical 5:7 collectible and ±12° yaw. The Google-inspired proposal favoured a wider card and ±4° motion. Choose the more visibly reactive vertical object to meet the owner's intent; take the stationary actions, focus order and reading safeguards from the information-design proposal.

## Scene 1: arrival

Name, C++ role, current employer/location, CV and contact-card link are immediately present. No timed text reveal.

The environment is a small preblurred photo, not an expensive animated blur. A stationary dark scrim protects contrast. Light can move behind the content. The main photograph responds to the pointer with bounded depth and a moving reflected band.

The photo is not a decorative label for the prose. It occupies comparable visual weight and makes the first viewport distinctive before another click.

## Scene 2: handling the card

Desktop target: about 360–400px wide, 5:7 ratio. Phone target: available width minus safe margins, with readable type rather than a scaled desktop screenshot.

Layer order: shadow → solid forest body → inset portrait → optical edge/foil → stationary text zones. Foil predominantly covers the frame/photo; no bright reflection across the reading surface.

Use a stable hit-area wrapper, 1000px perspective and separate tilt/flip elements. Pointer travel maps to ±12° yaw and ±9° pitch, with roughly 90ms damping; lift up to 10px. Return to neutral in approximately 420ms. Do not drive React render state on every pointer event.

Touch supports horizontal drag after a 10px threshold while retaining vertical page scrolling and pinch zoom. No orientation permission. The explicit turn control works without dragging.

## Scene 3: turning to evidence

A stationary native button turns the inner card 180° over 640ms. The inactive face is inert and hidden from accessibility APIs. The button retains focus and announces the visible side. Escape returns to the portrait.

The reverse contains the concise work timeline and current-work qualification. The external CV/email/vCard/recruiter actions remain available on either face. The full recruiter brief remains a readable modal, not a moving text surface.

## Scene 4: moving through the work

After the opening, background intensity falls as the reader scrolls. Work rows stay calm and readable. Project visuals retain live-site affordances: pointer response, visible lift, visual animation and clear CTA movement. Ariadne is an attributed AI experiment, not leading recruitment evidence.

## Scene 5: photographs

Build toward a contact-sheet gallery with full-screen viewing, keyboard next/previous/Escape and captions separate from the image. Do not invent photography credits, dates or locations. Do not present the supplied portrait photos as photographs taken by Kwanho.

The content model must allow future images, alt text, captions, optional location/date/credit and collections. An empty collection must not become a prominent dead navigation item.

## Alternative operation

Reduced motion or Motion off: static background/light, no tilt/parallax, immediate side change; identical facts and actions. Pause work when the page is hidden. Native links and disclosures remain functional without motion.

## Review gates

1. Compare idle, hover corners, return and flip midpoint against the live baseline. The new response must be plainly visible.
2. Verify pointer, touch, keyboard, focus, reduced motion, 320/390/1440 layouts and enlarged text.
3. Preserve Travel persistence/access boundaries and existing routes; review contrast in all material states.
4. Recheck the original user request and factual scope. Publish the tested blog revision and verify the real site; never use a successful local build as deployment evidence.

CV scope was changed by the owner: detailed Google Docs design advice only. No new CV PDF/DOCX or generator is to be produced.
