# CV design review

Five simulated specialists, each using a 20-year professional perspective. Exactly two evaluation rounds were completed. These are AI role reviews, not actual designers or employer approvals.

## Round one

The review used a frozen snapshot at `reviews/cv-round-1/`. PDF SHA-256: `a140bb855e5df28630b12827dd2091d97ac03b92b4d41701e39bfd0e3c7f9186`.

The five read-only reviewers could inspect source and measured geometry but did not have image-viewing capability in that profile. They disclosed that limitation. The main agent separately viewed both rendered PNGs; no physical print or authenticated Google Docs test occurred.

| Specialist | Finding | Response in version two |
| --- | --- | --- |
| Editorial typography | Blue draft labels compete with content; record titles are too close to body size. | Draft labels/footer become neutral; record headings grow to 12 pt with 16 pt leading. Employer names remain bold and role descriptions regular. |
| Information design | Current work needs a stronger anchor; page two has too many equally strong section labels. | Increase record spacing; combine Training and Certification into one section. Keep KLA first. |
| Recruitment/accessibility | Linear extraction is verified but does not make an untagged PDF accessible; draft state must remain clear. | Keep the draft label and real text links; explicitly retain the PDF/UA and screen-reader testing gap. Editable DOCX remains available. |
| Print production | Page one has 114.1 pt between final content ink and footer rule, versus 58.1 pt on page two. Metadata is small. | Metadata rises to 9.5 pt; section heads to 11 pt; spacing is redistributed without adding unsupported copy. Produce a grayscale proof for round two. |
| Google Docs systems | Exact Word/PDF leading does not map directly to a Docs multiplier; custom styles and footer fields can be remapped. | Reconstruction guide requires exported baseline calibration, a wrapped-bullet check, exemplar paragraph formatting and field validation. |

## Decisions requiring judgment

The role line was not entirely regular in version one: employer names already used bold runs. Increasing the entire line to bold would erase that distinction. Version two increases size and spacing while preserving the employer/role contrast.

Moving band leadership or a minor credential to page one would fill space at the expense of relevance. No facts or low-priority blocks were moved merely to equalize page height. Factual answers may change the space available later.

Literal email addresses and URLs are useful on a printed document. Extra “Email/Website/LinkedIn/GitHub” labels are not added to all four links.

## Round two

All five roles inspected the rendered colour PNGs using image-capable agents. Print production also inspected both grayscale proofs; accessibility inspected the first grayscale page. They read the revised copy and relevant measured evidence. No role claimed an actual Google Docs, printer, screen-reader or ATS test.

| Specialist | Final-round finding | Disposition |
| --- | --- | --- |
| Editorial typography | Stronger record headings and grouped training improve scanning. First record sits slightly far from its section; footer still renders blue. | Apply 6 pt before only the first KLA/Ariadne record, keeping 12 pt between later records. Correct the footer renderer. |
| Information design | KLA is clearly anchored; relevance-led pagination is preferable to moving band leadership to fill space. Repeated “Work includes” delays the topic. | Keep section order; front-load the three KLA topics while retaining the provisional status and hardware caveat. |
| Recruitment/accessibility | Contacts and grayscale hierarchy are clear. Correct extraction still does not establish tagged semantics. | Keep structured DOCX; retain the untagged-PDF and assistive-technology limitations. Correct the footer mismatch. |
| Print production | No visible clipping or broken hanging alignment; grayscale retains weight and link distinctions. | Keep A4/18 mm and type scale. Physical printer proof remains unperformed. |
| Google Docs systems | The reconstruction instructions are usable. Baseline measurement needs a reproducible method and tolerance. | Add a single wrapped-paragraph calibration method, PyMuPDF baseline example and ±0.25 pt tolerance. |

The footer problem was real: the PDF renderer used a hard-coded blue value despite the style token being neutral. It now reads the footer style, and a new extraction check confirms the actual span colour. The DOCX already used the neutral style.

These corrections were made after round two; **no third CV evaluation round** was added. The corrected artifact remains `cv/round-2.pdf`. Build verification confirms two A4 pages, embedded Lato fonts, ordered text, links, live-area bounds, real DOCX lists/styles and neutral footer colour. Final content-to-footer gaps are 92.6 pt and 60.6 pt.

The five roles consider the design suitable as an example. It remains a working draft pending the user's factual answers. No claim of submission readiness, Google Docs parity, PDF/UA conformance or ATS acceptance is made.
