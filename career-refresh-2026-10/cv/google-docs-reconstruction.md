# Google Docs reconstruction — revised CV design example

**Historical reference:** this document describes the original second-round Lato example. The current editorial design is specified in `google-docs-design-spec.md` and rendered in `../design/cv-editorial-2026-10-27/index.html`; its content and styles come from the editorial JSON sources.

**Reference:** `round-2.pdf`, not an approved submission CV. The editable import source is `round-2.docx`; the copy source is `round-2-content.json` (readable equivalents: `round-2.md` and `round-2.txt`). This is a reconstruction specification, **not a report of a Google Docs test**.

No authenticated Google Docs account was used. Lato's presence in a particular account's font menu, the DOCX import and its exported pagination have **not** been verified. The generated PDF is the measured two-page reference; the generated DOCX is independently authored, not a PDF conversion.

## 1. Design intent and reading flow

One left-to-right, top-to-bottom text flow, left aligned, with clear employer-first role headings. No columns, tables, text boxes, floating dates, icons, pictures, skill charts or panels.

**Page one**

1. Kwanho Kim; Software Engineer.
2. Two contact paragraphs, four text hyperlinks.
3. Working-draft label and short confirmation note.
4. Summary.
5. Experience: KLA, Pickit 3D, Bosch.
6. Skills.

**Page two — deliberate page break, not repeated blank lines**

1. Small continuation line: Kwanho Kim — Software Engineer.
2. Selected projects: Ariadne, ColorSaveLife, Autonomous Lane-Keeping Assist.
3. Education, including its short degree-status note.
4. Training and certification.
5. Concise Rush03 leadership entry.

Keep the working-draft label and both draft footers in every review/export. Do not replace them with “approved,” “final” or an ambiguous version number alone.

## 2. Page geometry

| Property | Exact reference |
| --- | --- |
| Mode | **Pages**, not Pageless |
| Paper | A4 portrait: **210 × 297 mm** / **595.276 × 841.890 pt** |
| Margins | **18 mm** on all four sides: **1.8 cm**, **0.708661 in**, **51.024 pt** |
| Text measure | **174 mm** / **493.228 pt** |
| Background | White, `#FFFFFF` |
| Alignment | Left/ragged right; no full justification |
| Main PDF frame | x = 18–192 mm; top = 18 mm; bottom = **267.006 mm** from the top |
| Internal footer reserve | **34 pt / 11.994 mm** above the nominal bottom margin; not a changed paper margin |
| Footer rule | y = **271.239 mm / 768.866 pt** from the top; x = 18–192 mm |
| Footer baseline | y = **277.765 mm / 787.366 pt** from the top |
| Footer distance in DOCX | **18 mm**; export must be checked because editor definitions/metrics can differ |

In Docs, use **File → Page setup → Pages**, select A4 and enter 1.8 cm (or the inch equivalent) for every margin. The imported DOCX also declares exactly these margins. Its main text does not use a 30 mm bottom margin; the reference PDF simply reserves an internal footer zone.

All PDF text, rules, underlines and link rectangles are checked against the 18 mm margins. The verification permits only 0.05 pt of coordinate-rounding tolerance. Do not treat that tolerance as extra layout space.

## 3. Font and colour

**Lato throughout**, using the supplied static Regular, Bold and Italic TTFs. Do not use Light for metadata or simulate small caps. Body and most labels use Regular; names/record labels use Bold; the two factual-status notes use Italic.

- Ink: **`#202725`**.
- Metadata / secondary text: **`#515A57`**.
- Section headings, role subtitle and links: **`#294FA8`**.
- Draft labels and footer text: **`#515A57`**.
- Footer rule only: **`#D7DDD9`**, **0.5 pt**.

Use the colour picker's hex input, not an approximate theme swatch. The footer rule is decorative, not the sole carrier of information. Exact local contrast calculations for text on white are in `round-1-verification.json`; these are not a document-accessibility certification.

### Google Fonts is not the same as Google Docs

The supplied Lato files are the Google Fonts family used by the PDF renderer. This proves which font files the PDF uses; it does **not** prove the font is enabled in an authenticated Docs account. Lato is a well-known Google Fonts family, but no account/font-menu verification was performed here.

In the target account, inspect the font menu / **More fonts** and look for Lato. Confirm Regular, Bold and Italic actually render. Google Docs does not generally accept a local TTF as a document-specific font upload, and the DOCX does not embed these font files.

If Lato is unavailable, Source Sans 3 is a Google Fonts alternative to try in More fonts. Treat it as a remeasured variant: keep the same body-size target, calibrate leading again and compare wraps. It is not an exact Lato reconstruction.

## 4. Paragraph specifications

All numbers below are **points** unless stated otherwise. “Leading” is the **exact reference baseline interval**, not a Docs multiplier. Before/after spacing is paragraph spacing, never inserted empty paragraphs.

| DOCX style / use | Font size | Leading target | Before | After | Weight / colour | Keep with next |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Title / name | 31 | 34 | 0 | 1 | Bold / ink | Yes |
| Subtitle / headline | 12 | 16 | 0 | 5 | Regular / blue | Yes |
| CV Contact / each contact line | 9.5 | 13 | 0 | 0 | Regular / blue; linked text underlined | Yes |
| CV Draft / draft label | 9.25 | 12 | 7 | 1 | Bold / muted | Yes |
| CV Note / factual note | 9.5 | 12.5 | 0 | 0 | Italic / muted | No |
| Heading 1 / section name | 11 | 15 | 14 | 5 | Bold / blue; literal uppercase text | Yes |
| Heading 2 / employer or project | 12 | 16 | 12 | 2 | First name Bold; descriptor Regular / ink | Yes |
| CV Metadata / role/project dates | 9.5 | 12.5 | 0 | 3 | Regular / muted; links blue/underlined | Yes |
| Normal / summary | 10.5 | 14.5 | 0 | 0 | Regular / ink | No |
| CV Bullet / work/project/leadership bullet | 10.5 | 14.5 | 0 | 2.5 | Regular / ink; label 9.5 | No |
| CV Skill / one skill category | 10.5 | 14.5 | 0 | 3 | Category label Bold / ink | No |
| CV Continuation / page-two name line | 12 | 16 | 0 | 2 | Name Bold, role Regular / ink | Yes |
| CV Record / education/training/credential/leadership label | 10.5 | 14.5 | 6 | 1 | Subject/name Bold; institution/descriptor Regular / ink | Yes |
| CV Record Metadata / education/training/credential dates | 9.5 | 12.5 | 0 | 0 | Regular / muted | No |
| CV Footer | 9.25 | 12 | 0 | 0 | Regular / muted | No |

Normal body leading of 14.5 pt equals **5.115 mm**. Metadata leading of 12.5 pt equals **4.410 mm**. Role and education metadata is **9.5 pt**; only the draft label and footer use **9.25 pt**. Body size remains **10.5 pt**.

The DOCX uses **exact** line-spacing declarations in twips (20 twips = 1 pt), e.g. body `290` and metadata `250`. It applies widow/orphan control and keeps the lines of each short paragraph together. Section and entry headings explicitly keep with the next paragraph. Dates preceding bullets also keep with the next paragraph; final record dates need not bind to the following unrelated entry.

Adjacent paragraph spaces in the reference use the **larger of the previous after-space and next before-space**, rather than adding both. For example, the 5 pt after a section heading and 12 pt before an employer heading result in a 12 pt gap. Check Docs imports for unexpectedly additive spacing.

Two direct-format exceptions strengthen grouping: the first KLA heading after Experience and the first Ariadne heading after Selected Projects have **6 pt before**, rather than 12. Keep their semantic Heading 2 style; apply this spacing to those two paragraphs only.

### Named styles in Docs

The DOCX genuinely contains the named paragraph styles above. Google Docs' standard UI offers a more limited set of named styles and may flatten or remap custom DOCX styles on import.

- Map name → **Title**, headline → **Subtitle**, sections → **Heading 1**, employer/project headings → **Heading 2**, body → **Normal text**.
- Update each corresponding Docs style from a correctly formatted example paragraph.
- Use Normal-text paragraphs with explicitly applied formatting for contacts, notes, metadata, skills, records and footer where custom names cannot be retained.
- Keep one correctly formatted example of each such paragraph during reconstruction and duplicate its formatting for peers. Remove any temporary examples before export.
- Do not force a new semantic heading level merely to obtain a smaller metadata font.

Use the paragraph-spacing controls for before/after values. Use keep-with-next / keep-lines-together / prevent-single-lines controls where the target editor exposes them. If an import does not retain a control, apply it again rather than filling the gap with blank paragraphs.

### Exact leading versus Docs custom spacing

Docs' custom **line-spacing** field normally expresses a multiplier of its own single-line metric, not a fixed point value. **14.5 ÷ 10.5 is not a promise of a 14.5 pt baseline interval in Docs.** Font metrics, import conversion and the editor affect the result.

1. Prefer importing the DOCX's exact line-spacing declarations, then inspect the export.
2. For a manual rebuild, start body text with a modest custom multiplier such as **1.15**, explicitly as a calibration starting point—not a verified equivalent.
3. Export a two-line sample in the chosen Lato font and measure the baseline interval in PDF points. This calibration is required before calling a Docs export a reproduction of the reference.
4. Adjust using `new multiplier = old multiplier × target interval / measured interval`.
5. Repeat for metadata and record both final multipliers with the exported file. Set before/after paragraph spacing independently to the table values.

The final PDF, not the multiplier typed into the UI, determines whether the reference interval was reproduced. Do not assert pixel-perfect Docs parity without exporting and measuring.

For calibration, use one paragraph that wraps automatically to at least three lines. Do not insert line breaks or use three separate paragraphs. Make a body sample at 10.5 pt and a metadata sample at 9.5 pt; set their paragraph-before/after values to zero while measuring. Compare consecutive text-baseline origins, not glyph-box tops. A practical reconstruction tolerance is **±0.25 pt** around 14.5 pt for body and 12.5 pt for metadata; the complete document must still fit two A4 pages.

PyMuPDF can read the baselines from a locally exported calibration PDF:

```python
import pymupdf

document = pymupdf.open("docs-calibration.pdf")
for page in document:
    for block in page.get_text("dict")["blocks"]:
        lines = block.get("lines", [])
        if len(lines) < 2:
            continue
        baselines = [line["spans"][0]["origin"][1] for line in lines]
        intervals = [round(b - a, 2) for a, b in zip(baselines, baselines[1:])]
        print(lines[0]["spans"][0]["text"][:45], intervals)
```

This reads your export; it does not assume that a particular Docs multiplier produces the intended leading.

## 5. Hanging bullets and inline emphasis

- Use an actual **single-level bulleted list**, never a typed bullet followed by spaces.
- Bullet position: **0 mm relative to the left text margin**.
- Text position: **4 mm / 0.4 cm / 11.339 pt** to the right of that margin.
- Hanging indent: **4 mm**. Thus the actual text begins at **22 mm from the paper's left edge**.
- Continuation lines align exactly with the text position, not with the bullet.
- Label: normal round `•`, Lato **9.5 pt**. Text: Lato **10.5 pt**.
- Paragraph spacing after: **2.5 pt**; no extra blank paragraphs between bullets.
- Never use the common default 0.25/0.5-inch indents; they are too wide for this measure.

In Docs' indentation options, set the list paragraph's left/text indent to 0.4 cm relative to the margin and its special hanging indent to 0.4 cm. This means a first-line offset of −0.4 cm relative to the text position. Verify a bullet long enough to wrap: the second line must align with its text, not its label. Check the ruler after changing list styles, which can reset indentation. If the editor cannot independently size a bullet label, record that deviation and check alignment.

Employers and project names are bold **within** their Heading 2 paragraph; the em dash and role/descriptor remain Regular. Education/training records follow the same inline pattern at 10.5 pt. Skills use a bold category plus colon, then regular content. Do not put dates in a table or float them to the right.

## 6. Links

Use visible text, with blue underlining and explicit targets:

| Visible text | Target |
| --- | --- |
| kwanho0096@gmail.com | `mailto:kwanho0096@gmail.com` |
| kwanho.dev | `https://kwanho.dev` |
| linkedin.com/in/kwanhokim | `https://linkedin.com/in/kwanhokim` |
| github.com/KKWANH | `https://github.com/KKWANH` |
| github.com/KKWANH/ai-assistant | `https://github.com/KKWANH/ai-assistant` |

Keep the two original contact paragraphs. The Ariadne repository link follows its date/type metadata on one paragraph. All five targets are present in the generated PDF and DOCX; remote availability was not tested. No hidden destination should disagree with its visible text.

## 7. Page break and footer

The first paragraph on page two is the small continuation name line. The DOCX gives it **page-break-before**. In a manual Docs rebuild, use either that paragraph property if retained/available or **Insert → Break → Page break** immediately before it. **Do not use both**, and do not add a section break or odd-page break.

The footer is one paragraph, not a table:

- Left: `WORKING DRAFT · Not for submission`.
- Right: the actual page number and total, `1 / 2` or `2 / 2`.
- Right-aligned tab stop at **174 mm / 17.4 cm / 493.228 pt from the left text margin**.
- Font: Lato 9.25 pt; line target 12 pt.
- Thin top border: 0.5 pt, `#D7DDD9`; the DOCX uses 8 pt border spacing.
- Use real page-number fields. The DOCX contains `PAGE` and `NUMPAGES` and requests field updates. Do not assume cached field values are updated by an import.
- If import loses those fields, recreate page numbering in Docs. Verify the exported total page count; do not replace failed fields with permanently typed `1 / 2`.

Set footer distance to 18 mm as a starting structural setting, then compare its baseline and rule with the geometry targets above. If the Docs ruler cannot place the tab exactly at the text width, use the nearest supported coordinate and verify that both ends remain within the 18 mm margins.

Do not shrink all text or move the footer outside the live area to force two pages.

## 8. Recommended import workflow

1. Preserve the `round-1` files unchanged as the first-version reference.
2. Upload `round-2.docx` to Drive and open it with Google Docs. If converting to native Docs, distinguish that from Office-compatibility editing; neither mode was tested here.
3. Confirm **Pages / A4 / 18 mm margins**, not a locale's default Letter paper.
4. Select representative runs and verify Lato, point size, weight and colour. A correct-looking font menu label alone is not proof of the actual rendered font.
5. Inspect named headings and custom paragraph treatments. Ensure links remain separate clickable text runs.
6. Check the one deliberate page break, real bullets/hanging indents, metadata keeps, and dynamic page fields.
7. Export PDF under a separate, clearly provisional filename. Compare it with `round-2.pdf`; do not overwrite the reference.
8. Check the actual two-page count, 100% print-size readability, wraps, footers and selected/copyable text. Extract text and verify the same employer-first and page-one/page-two sequence.

If an import produces three pages, first inspect paper size, font substitution, list indents, line-spacing conversion, additive paragraph spacing and duplicated breaks. Keep 10.5 pt body and 9.5 pt metadata. The reference has an intentional footer zone and some reflow tolerance; matching pagination still needs checking.

## 9. Manual rebuild workflow

1. Start a blank Pages/A4 document and apply the geometry.
2. Add all copy from `round-2.txt` in order, removing only its visible `--- PLANNED PAGE BREAK ---` marker and replacing that marker with a real page break.
3. Treat each logical entry as its own paragraph. Ignore the text copy's blank-line separators; use the spacing table rather than literal blank paragraphs.
4. Apply Title, Subtitle, Heading 1, Heading 2 and Normal text styles, then the specified direct formats for metadata/notes/records.
5. Replace the text copy's `- ` prefixes with real bulleted-list formatting and the 4 mm hanging indent.
6. Apply bold prefixes only where specified; add the five explicit hyperlinks.
7. Remove the text copy's literal footer lines from the body and create the real repeated footer.
8. Apply keep controls, export and calibrate line spacing. Check the factual notes are still visibly present.

Do not copy positioned text from the PDF to reconstruct the editable document: that can introduce hard line breaks, lose lists and fragment links.

## 10. Acceptance evidence and limitations

`round-2-verification.json` records the reference PDF's actual page sizes, glyph bounds, extraction sequence, font-program byte sizes, Unicode mappings and hyperlink annotations. Its `placements` list gives exact paragraph positions and line counts for comparing an independently exported reconstruction.

After the final-round spacing corrections, the reference leaves 92.6 pt between page-one content ink and its footer rule, and 60.6 pt on page two. The difference is intentional: relevant work stays on page one, while training and background follow on page two. No extra claims were added to fill space.

An actual Docs export would need its **own** checks; the local report does not verify it. No real ATS ingestion, receiving-application field mapping, authenticated Docs reconstruction or Word pagination test has been conducted. The generated PDF is not tagged PDF/UA, and correct text extraction is not a claim of full accessibility.

These instructions do not confirm the remaining employment, contribution, education, award or project-status facts. Keep the accompanying editorial checklist until those answers are supplied. The two completed design rounds and their corrections are recorded in `../reviews/cv-review.md`.
