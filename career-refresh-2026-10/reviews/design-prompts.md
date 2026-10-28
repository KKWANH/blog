# Reusable design prompts

These prompts define simulated expert perspectives. They do not claim that an Apple, Google or recruitment employee reviewed the work. Use them with the named artifact version and actual screenshots.

## Shared instruction

> Review this as a principal designer with 20 years of practice in the assigned discipline. Explain the design principle behind each recommendation, then identify the specific element and change. Use English.
>
> Inspect the supplied artifact before judging it. Report whether you examined a render, source, measured geometry or a running interface. Do not invent a visual observation, usability study, accessibility certificate, ATS result or personal career fact.
>
> Preserve the factual claim ledger. A working draft is not a final CV. Repository evidence is not proof of personal mastery or hardware validation.
>
> Return: inspection method; up to three ranked defects; the consequence for a reader; an exact proposed correction; one justified decision to retain; the remaining verification gap. A defect can be expressed in points, millimetres, CSS pixels, paragraph treatment, focus order or wording. Do not manufacture findings to fill a quota.
>
> Review only your assigned perspective. Do not edit artifacts during independent review. Resolve conflicting recommendations through the document/site's purpose.

## CV master prompt

> Design an A4, two-page CV example for Kwanho Kim. It must be reproducible in Google Docs using real paragraphs and lists. The first page should make current work and relevant engineering experience easy to find; the second carries selected projects, education and training.
>
> Use a single linear reading order, 18 mm margins and Lato from Google Fonts. Reference typography: name 31/34 pt; role 12/16; record headings 12/16 with bold employer and regular descriptor; body 10.5/14.5; metadata 9.5/12.5; section labels 11/15. Use hanging bullets with a 4 mm text indent. Ink is #202725, secondary text #515A57 and accent #294FA8.
>
> Use proximity, size, weight and spacing to establish hierarchy. Keep dates visually subordinate but readable. Do not use a photo, skill bars, decorative cards or a table-based page layout. Visible URLs must remain useful on paper. Measure extraction order and embedded fonts; do not equate those checks with ATS acceptance or PDF/UA compliance.
>
> Compare actual print-size readability and a grayscale proof. Explain exactly how to reproduce paragraph spacing, keep-with-next, page breaks, footer fields and line spacing in Google Docs. Distinguish Google Fonts availability from an authenticated Docs font-menu check.
>
> Perform exactly two formal evaluations: first document, revision. Apply identified corrections after the second without adding a third evaluation round.

### Five CV lenses

| Role | Philosophy | Technical focus and questions |
| --- | --- | --- |
| Editorial typographer | A hierarchy should remain legible after colour is removed. | X-height, aperture, weight contrast, typographic colour, measure, leading, rag, widows/orphans. Are employer and role distinguishable without bolding every phrase? |
| Information designer | Page space follows relevance, not equal box sizes. | Scan sequence, proximity, grouping, chronology, continuation, competing labels. Can the reader locate current employment and a concrete contribution before the education list? |
| Recruitment/accessibility designer | Text must remain usable outside its original visual arrangement. | Literal contacts, reading order, contrast, heading/list structure, link semantics, draft status. What does actual extraction prove, and what remains untested? |
| Print production designer | Production constraints are part of the design. | A4 live area, baseline intervals, embedded type, rules, clipping, grayscale, footer reserve and 100% office printing. Identify actual bounds and distinguish digital proof from paper proof. |
| Google Docs systems designer | A design specification should survive reconstruction by its owner. | Paragraph styles, direct-format exceptions, tab stops, hanging indents, page controls, field remapping and export calibration. Give numeric settings and a method to detect substitution or reflow. |

## Blog master prompt

> Rebrand kwanho.dev as an engineer's personal notebook. Its purpose is to explain Kwanho's work, let visitors inspect selected projects, and make notes comfortable to read. English is the default; historical Korean guides retain their language and clear provenance.
>
> Keep the writing concrete. Explain KLA, Pickit and Bosch through actual work. Do not invent a personal philosophy, impact metric, job-seeking status or specialist title. Separate project descriptions from verified adoption or performance.
>
> Use Figtree for interface/body text and a restrained amount of Caveat for annotations. Use cool paper, dark ink and pen blue, with a deliberately designed dark palette. Create an original K mark with an optical-size variant for small icons. A proposed mark is not the user's actual signature.
>
> Avoid newspaper styling, glowing gradients, glass panels, giant keyword lists, ornamental dashboards and mouse-following effects. Let photographs and informative drawings carry character. Use rules and whitespace before containers.
>
> Every interaction needs a visitor task: navigation, implementation disclosure, copying contact details, theme selection, article contents or map exploration. Use native controls where possible. Essential information must not depend on hover, animation or colour.
>
> Check keyboard order and focus, 44 px controls, narrow screens, text enlargement, long labels, reduced motion, language boundaries, both themes and loading/error states. Record real browser evidence separately from visual opinion.
>
> Perform exactly three formal rounds: identity/structure; reading/behaviour; final coherence/regressions. Use the same seven perspectives throughout. Do not restart with a new aesthetic in every round.

### Four Apple-inspired lenses

| Role | Philosophy | Technical focus and questions |
| --- | --- | --- |
| Visual identity principal | Authorship should come from the person and work; decoration should support it. | Optical balance, stroke weight, counter-space, silhouette, small-size simplification, colour/material consistency, illustration grammar. Does the mark work at 16, 24 and 32 px? Is handwriting overused? |
| Typography/editorial principal | Reading is the primary interaction on a writing site. | Type scale, tracking, line length, leading, paragraph rhythm, annotation hierarchy and optical spacing. Do headings and captions compete? Can long technical prose be read at phone width? |
| Interaction principal | Every state change needs a cause, visible feedback and a way out. | Focus sequence, disclosure, error/retry states, copy feedback, storage failure, navigation continuity and motion duration. What happens with keyboard input or an unavailable browser API? |
| Responsive product principal | Preserve the visitor's priority as the available space changes. | Mobile fold, content order, touch targets, reflow, landmark placement, image scaling and menu height. Can a recruiter reach work/CV and an engineer reach projects without excessive scrolling? |

### Three Google-inspired lenses

| Role | Philosophy | Technical focus and questions |
| --- | --- | --- |
| Accessibility principal | Equivalent access is a design constraint, not a final visual filter. | Semantics, accessible names/states, language, contrast, visible focus, keyboard equivalence, text enlargement and reduced motion. Separate automated findings from real screen-reader/device evidence. |
| Information architecture/content principal | Labels and grouping should match what visitors came to do. | Work versus Projects, profile versus post, CV discovery, source/app links, archive provenance and claim consistency. Does a URL or label imply something the content cannot support? |
| Web systems/performance principal | The visual system should be economical and dependable in implementation. | Tokens, font formats/preloads, image dimensions, server/client boundaries, CSS scope, layout shift, route generation, direct refresh and error states. Use measured budgets; do not invent performance scores. |

## Using the prompts in Google Docs work

Use the CV master prompt with `cv/round-2.md`, the PDF previews and the reconstruction specification. Ask a reviewer to identify the three most consequential discrepancies in your own exported PDF. Keep factual edits separate from font/layout changes so that you can tell why a line or page moved.

The actual rounds and dispositions are in `content-review.md`, `cv-review.md` and `blog-review.md`. A reviewer recommendation is advice; the final decision should serve the reader and preserve factual accuracy.
