# Historical two-page CV: Google Docs specification

The current visual proposal and Google Docs advice are in `google-docs-design-spec.md` and the local `cv-editorial-2026-10-27` design board. This file preserves the earlier Lato/two-page reference; its values are not the selected current design.

Use **`current.pdf`** as the visual reference and **`current.docx`** as the editable starting point. `current-content.json` contains the updated copy based on the owner's answers. The earlier `round-1` and `round-2` files are historical design examples.

The current edition leads with C++ software engineering. It removes the provisional labels, records the August 2026 KLA start, distinguishes early implementation from completed work, identifies the BCX challenge, and separates awarded degrees from current study.

## Document

- A4 portrait, 210 × 297 mm.
- 18 mm margins on every edge; 174 mm text width.
- Pages mode, left aligned, ragged right.
- One text flow, real paragraphs and bullets; no text boxes or layout tables.
- One deliberate page break before the small continuation name on page two.
- Page one: contact information, summary, experience, skills.
- Page two: selected projects, education, training/certification, leadership.

## Font and colour

Use **Lato** from Google Fonts, Regular and Bold. The current visible copy does not require italic factual-status notes.

- Main ink: `#202725`.
- Secondary text: `#515A57`.
- Current accent: forest `#20543E`.
- White paper.
- Footer rule: `#D7DDD9`, 0.5 pt.

Google Fonts and the Google Docs font menu are not identical. Select Lato through More fonts and verify the exported result. If unavailable, Source Sans 3 is an alternative to measure separately; do not treat its wraps as identical.

## Paragraph settings

Numbers are points. Leading is the target baseline interval, not a guaranteed Google Docs multiplier.

| Element | Size / leading | Before / after | Treatment |
| --- | --- | --- | --- |
| Name | 31 / 34 | 0 / 1 | Bold, ink |
| Role | 12 / 16 | 0 / 5 | Regular, forest |
| Contact rows | 9.5 / 13 | 0 / 0 | Plain location; visible linked text |
| Section heading | 11 / 15 | 14 / 5 | Bold, forest, uppercase |
| Employer/project heading | 12 / 16 | 12 / 2 | Name bold, role/descriptor regular |
| First employer/project after section | 12 / 16 | **6** / 2 | Direct spacing exception |
| Role/project metadata | 9.5 / 12.5 | 0 / 3 | Regular, secondary |
| Summary | 10.5 / 14.5 | 0 / 0 | Regular, ink |
| Bullet | 10.5 / 14.5 | 0 / 2.5 | Real bullet; 4 mm hanging indent |
| Skills row | 10.5 / 14.5 | 0 / 3 | Category bold; values regular |
| Page-two continuation | 12 / 16 | 0 / 2 | Name bold, role regular |
| Education/training record | 10.5 / 14.5 | 6 / 1 | Subject/name bold; institution regular |
| Record dates/status | 9.5 / 12.5 | 0 / 0 | Secondary |
| Footer | 9.25 / 12 | 0 / 0 | Secondary |

Keep headings with the following paragraph. Keep each short bullet's lines together and prevent isolated lines. Adjacent paragraph spaces use the larger value in the reference; check that the import has not added both values.

## Bullets and footer

Bullet position is at the left text margin. Text starts 4 mm to its right; wrapped lines align with that text. Use a real list, not typed bullets and spaces.

The footer reads `Kwanho Kim · C++ Software Engineer`, with a right-aligned page count. Use actual PAGE/NUMPAGES fields or Google Docs page-number controls. Place the right tab at 174 mm relative to the left margin. The reference footer baseline is 277.765 mm from the page top, inside the live area.

The current edition has no “Working draft” banner or “degree status to confirm” paragraph. Do not copy those from the earlier examples.

## Import and check

1. Import `current.docx`, select Pages/A4 and confirm 18 mm margins.
2. Confirm Lato and the point sizes on representative paragraphs.
3. Reapply paragraph styles from a correctly formatted exemplar if Docs flattened the custom styles.
4. Confirm the 4 mm hanging bullets and the single page break.
5. Export PDF and compare it with `current.pdf`.
6. Check the title, dates, challenge name, completed/current education, links, text order and two-page fit.

For a manual reconstruction, start body custom spacing around 1.15 only as a calibration value. Export one automatically wrapped paragraph, measure consecutive baseline origins and adjust:

`new multiplier = old multiplier × target interval / measured interval`

Use a practical ±0.25 pt tolerance around 14.5 pt body and 12.5 pt metadata leading. The earlier `google-docs-reconstruction.md` includes a small PyMuPDF measurement example.

Do not fill the lower space on page one with unverified claims or shrink the body to force a fit. Keep the current-work/secondary-background separation.

The PDF has been measured locally. Authenticated Google Docs import/export, Word pagination and physical printing have not been performed.
