# A green field notebook

Owner direction, 26 October 2026: general C++ systems work first; restrained, witty technical notes; a useful interactive contact card; an editable travel atlas. The fourth supplied photograph belongs on the home page. The green profile portrait belongs only on the contact-card/About page.

## Design philosophy

The photographs set the colour and pace: green shadows, warm light, a quiet composition. This is a colour and composition reference, not a costume made of neon, fake film borders or decorative code.

Information remains direct. A recruiter should not need to decode an art project to find a title, dates or the CV. A curious reader can take a slower route through projects and notes. The site supports both paths.

Handwriting is used like a pencil annotation in an otherwise well-set technical document. It points, comments and occasionally jokes. It does not carry a paragraph or a form label.

Motion belongs to an action: open a brief, disclose evidence, select a place, save an edit. No compulsory animation, mouse-following effect or scroll takeover.

## Visual grammar

- Forest ink `#20543E`; paper `#F4F5EE`; graphite `#202C25`.
- Warm brown `#8D5425` for small secondary accents.
- Dark mode: deep green `#111D17`, paper `#1B2B22`, pale text `#E9EFE5`.
- Figtree provides the information hierarchy; Caveat is a short annotation voice.
- Home photograph: supplied image 4, restrained green-shadow/warm-highlight correction. Keep the window geometry and the downward-looking pose.
- Contact-card photograph: `PROFILE.png` (also supplied as `PROFILE.resized.jpg`), modest tonal correction only. The literal lowercase `profile.jpg` is a phone-obscured mirror image; the green portrait matches the owner's stated colour/identification intent. This interpretation was explained in the conversation.
- Preserve the original images. Do not generate facial details, invent a photo location or add fake timestamps.

## Reader storyboard

| Frame | Reader's question | What appears | Useful next action | What must not happen |
| --- | --- | --- | --- | --- |
| 1. Arrival | Who is this, and what does he do? | Name, C++ role, current employer/location; wide green photograph | Open the contact card, view CV, continue to work | A long manifesto or specialist vision claim |
| 2. Contact card | Can I keep or contact this person? | Clear portrait, title, brief focus, direct CV/email/LinkedIn/contact download | Save the vCard or open recruiter brief | Contact actions hidden behind a decorative flip |
| 3. Recruiter brief | What are the relevant facts? | Current/past employers and dates, main strengths, completed/current education, scoped award | Download CV, copy a short factual summary, email | “Leading” ongoing work, unstated visa eligibility, unqualified overall prize |
| 4. Work evidence | What did he actually do? | Short employer rows; optional details about recovery, camera settings and integration | Expand only the role of interest | The same summary repeated in several panels |
| 5. Travel browsing | Which places are here? | Map, search/filter, compact place list and selection | Find a city, narrow by stay, inspect its pin | A giant wall of identical cards or broken external map tiles |
| 6. Add/edit | How do I change my own atlas? | Local owner controls; labelled place search and fields | Select location, set stay category, save | Public unauthenticated writes or a fake success toast |
| 7. Saved | Did the change persist? | Updated map/list/counts and explicit saved state | Refresh and see the same data | Stale tabs silently overwriting a newer change |
| 8. Remove/recover | Can I correct a mistake? | Named removal confirmation, result and Undo | Restore the removed entry | Deleting real records as demonstration/test data |

## Interaction contracts

Recruiter brief is a labelled modal with an explicit close action, Escape handling, contained focus and focus return. The CV/contact actions remain available on the card without opening it.

Work details use native disclosure. Project status is visible: Ariadne and Earprint are on hold; BCX is a team project with a digital.auto & mobility track award.

Travel editing is enabled only in an opted-in local development server. Saves write a validated, atomic JSON snapshot. Public and production views stay read-only. Owner UI says changes are local until the next publish; it does not imply a live deployment.

## Responsive composition

Desktop: introduction and landscape photograph share one horizontal frame. The contact card uses a separate identity portrait and concise action area.

Phone: title and useful actions appear before imagery or supplementary detail. The map and list remain usable without dragging tiny markers. Form and modal content scroll within the viewport; keyboard focus must remain visible.

Enlarged text: no clipped name, hidden action or horizontal page scrolling. Reduced motion: state changes still work with transitions removed.

## Decisions before implementation

Use the restrained photo grade, not the stronger green version. Keep portrait 4 for atmosphere and the profile photo for identification. Keep a readable paper surface behind information; do not overlay long text over foliage.

Preserve the previous typography/geometry work where it serves this direction. Replace the text-heavy About body with a card, useful actions and selective disclosure. Judge each iteration against these reader tasks and actual rendering, rather than manufacturing another score.
