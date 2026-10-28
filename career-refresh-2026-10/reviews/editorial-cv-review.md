# CV editorial review

Superseded design selection: the owner rejected the round-5 header. The current selected design and five new capture/review cycles are documented in `cv-five-designer-cycles.md`. The records below preserve the earlier iterations.

27 October 2026. User requested a more sophisticated minimal CV, an actual visual implementation/review loop, and synchronized Markdown.

The latest contact/nameplate/program refinement is recorded in `cv-contact-and-completeness.md`. The selected proof is now `rounds/round-5.pdf`; the first four passes below remain preserved.

## Selected composition

One A4 page. Manrope Bold 34pt for the name; Inter 10.5pt/14pt for body copy; 9.5pt metadata; 12.5pt employer headings. The current identity/contact area is a restrained nameplate, with personal Gmail on the right. A fine forest edge, restrained section labels and a pale skills band provide structure. Technical programs are separate entries.

The primary goal remains C++ systems development. Figma/basic UI design is owner-attested. The inspected C++ containers project adds a concrete systems-oriented example. KLA's stage/team review and BCX's team/challenge scope remain explicit.

## Actual iterations

| Pass | Observed result | Change |
| --- | --- | --- |
| 1 | The paper exceeded A4 by about 50 CSS px; nine footer words appeared alone on page two. | Removed redundant focus tags, tightened section/job spacing, clarified and combined completed training. Body size was not reduced. |
| 2 | One A4 page, readable body and five PDF links. | Added the inspected C++ containers example and Qt/QML; refined name spacing. |
| 3 | Visual fit remained one page, but PDF inspection found Type3 font output and header text extracted after body content. | Prepared static font instances with proper names; changed the decorative header rule from a positioned overlay to a background. |
| 4 | One A4 page, embedded named font subsets, Unicode maps, header-first text order and six links. | Accepted after colour/grayscale, margin, text and interactive-preview checks. |
| 5 | One A4 page with the same body size, personal Gmail, a restrained nameplate and separate completed programs. | Adopted the owner's contact/program preferences; verified no invented 42 date or personal data. |

The top of a font's metric box is not the top of its visible ink. Margin verification uses rendered ink rather than misreporting those metric-box offsets as clipped print.

## Proof

`editorial-cv-verification.json` records the actual checks:

- A4 dimensions and one-page output.
- Rendered ink inside the specified 18mm horizontal / 15mm top / 16mm bottom live area, within raster tolerance.
- Embedded Manrope/Inter subsets and Unicode mappings.
- Reading sequence from name through experience, skills, projects and education.
- Six PDF link annotations with the intended email/site/profile/project targets.
- Figma, AVL container work, team-review scope and BCX challenge language retained; Ariadne absent.
- Identical generated Markdown copies and real HTML controls for fit, guides, text copying and the four review views.
- Tagged PDF structure is present. No PDF/UA, physical printer, Google Docs import/export or ATS certification is claimed.

Canonical sources: `cv/editorial-content.json` and `cv/editorial-design.json`. Generator: `cv/build_editorial_cv.py`.

The current website PDF was not replaced. The new HTML/PDF is a local design candidate for the owner's review.
