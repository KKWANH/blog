# Final paper introduction

The user requested five directly designed business-card studies, five real references and one synthesis. The result is a landscape calling card with separate portrait prints, integrated into the existing open profile.

## What the five original studies contributed

| Original study | Decision |
| --- | --- |
| Cotton impression | Use the 85:55 silhouette, serif name, quiet role line and two contact anchors. |
| Forest edge | Borrow deep green ink and a fine layered edge. Keep the main face light. |
| Photographic margin | Reject the small portrait inside the card; it costs readable contact space on phones. |
| Swiss register | Borrow the clear contact alignment and disciplined grid. |
| Vellum & portrait | Borrow the separate-print arrangement. Keep essential text on opaque paper. |

All five originals are in `studies/index.html`, with desktop renders and actual 390/320px comparison views. `studies/verification.json` records the designer's normal/enlarged-type checks.

## What the five references contributed

1. **Elegante Press / Augustas Didžgalvis:** paper texture and serif hierarchy. The publisher describes 330gsm cotton stock; that is reference information, not a claim about this digital card. Essential text remains solid ink.
2. **Elegante Press / Moonshot:** a controlled colour edge. Adapt it to the site's forest palette without copying the logo or dense contact strips.
3. **Common Curiosity / Sculpt:** alignment and whitespace from photographed project-sheet stationery. This was not misreported as a card close-up.
4. **MOO / Greta Rybus:** photographs and an opaque identity face can be separate objects. Use the owner's supplied portraits, not reference photographs.
5. **Dutchscot / Tamarind:** a layered material cue from a translucent menu cover. Its material composition was not identified as vellum, and it is not used as a transparent contact surface.

Exact URLs, observed artifacts and source qualifications are in `references/verified-five.md`.

## Integrated specification

- Landscape 85:55 proportion under normal type; intrinsic height can grow for enlarged text.
- Warm opaque paper, dark forest ink, Georgia/system-serif name and Figtree information.
- The printed face contains the name, role, email, domain and location. No invented slogan, monogram, phone number or reverse.
- Email breaks preferentially after `@`; the name breaks between words. Enlarged contact buttons stack rather than fragment.
- Procedural paper grain is a static WebP texture. Pointer response is limited to 3° pitch / 4° yaw with a 3px lift. Pause and reduced motion remove the movement.
- CV, email, vCard, LinkedIn and the work anchor are native controls outside the printed face.
- Three supplied portraits appear as separate prints. The formal portrait establishes identity; the window and indoor pictures provide context. They link to the original display assets.

## Video and link treatment

The Color Saves Life viewer now begins with the team's real, silent 16.3-second demonstration. The original source was inspected through multiple frames and media metadata. The web copy is H.264/yuv420p at 1600×920, about 1.92MB, with fast-start metadata and a separate poster.

Opening the page downloads no MP4. A deliberate play action loads it; controls, keyboard focus, a visible text alternative, offscreen/tab pause and an original-recording link are provided. No narrated transcript or individual authorship of the whole team demonstration is claimed.

“Meet Kwanho,” “Read the CV,” “Inside the prototype” and “Original team recording” connect each action to its actual destination.

## Review corrections

The integration review found three enlarged-type problems: narrow two-column buttons, a viewport rule overriding container stacking, and awkward name/email breaks. The buttons now have a useful flex basis, the container rule is authoritative, and the paper's horizontal padding no longer doubles unnecessarily.

## Stable review address

All current work is reachable through `http://localhost:3100`. The studio lives under `/studio/` on the same origin. Busy ports fail clearly rather than falling back. The studio is available only through loopback development requests and stays unavailable in production.

These are digital design and browser results, not a physical print proof. The application changes remain local in this refinement.
