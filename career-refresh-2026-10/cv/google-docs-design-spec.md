# Google Docs / Word reconstruction — result-led CV

This guide, HTML and `editorial-copy.md` are generated from the same canonical
content/design JSON. No physical print or real Google Docs import is implied.

## Content hierarchy

1. Name and Software Engineer.
2. A single contact row.
3. Professional experience: problem/result first, implementation detail second.
4. The BCX team/challenge result and personal contribution.
5. Technical skills, education, completed training and languages.

Keep ongoing KLA recovery work labelled **In progress**. The default one-page
selection omits container coursework; its source remains in the portfolio.
Do not reintroduce unmeasured time savings, uptime, support-ticket reductions,
system-wide ownership, hardware validation or an overall BCX win.

## A4 and typography

- A4 portrait; left/right 18mm, top 15mm,
  bottom 16mm.
- Name: Manrope Bold, 30pt, dark ink.
- Role: Inter Medium, 13.5pt, forest green. It is smaller than the name.
- Narrative: Inter Regular 11pt, exact 15.5pt line spacing.
- Company/role: 11–12.5pt Semibold; dates, cities and supporting metadata:
  9.5pt.
- Main ink `#1C2922`, accent `#1B4D3A`, secondary text
  `#59655E`, rules `#B4C3B4`.
- If Inter is unavailable, use Arial and recheck wrapping. Do not shrink the
  narrative below 11pt to force one page.

The editable DOCX deliberately uses Arial for
body text and embeds the Manrope name font. The local Word renderer substituted
Inter during an initial export, so the Word companion uses this explicit,
verified fallback rather than silently promising identical glyph metrics.
The HTML/PDF proof uses Inter. Recheck wrapping after Google Docs import.

## Header

Use the name and role once. Put the sector context and a thin vertical rule on the
right, without a box around the profession. Below, keep exactly one contact row:
Leuven, Belgium · kwanho0096@gmail.com · kwanho.dev · LinkedIn · GitHub.
Use the canonical HTTPS/mailto links, muted green underlines and no default blue.
Do not repeat location/email beneath a second horizontal line.

## Experience

회사·직함은 왼쪽, 날짜는 같은 줄의 오른쪽 탭에 둡니다. 본문은 한 열로 사용합니다. 공백을 여러 번 넣어 날짜를 맞추지 않습니다.

Lead the Pickit entry with the communication failure and fix. The log tool is a
concrete deliverable; retain it without claiming measured time savings. Use
short bold phrases to aid scanning, not a bold keyword on every technical term.
For KLA, place the current recovery design below completed software changes
with the explicit **In progress** label.

## Award and supporting sections

Use one compact forest field for **Team / 1st**, with the named
`digital.auto & mobility challenge` and `BCX 2024` immediately beside it.
The text must not imply an individual or overall-event victory. Keep the
candidate's Python-client/integration/presentation contribution readable.

Keep skill names as text. Education and technical training may share a lower
two-column area. 42 and SEA:ME remain separate and completed; 42 has no invented
attendance/completion date. Preserve the awarded/in-progress degree statuses.

## Export check

Check actual page count, ordinary-size reading, first-line reading order,
links, embedded fonts and text selection after export. Copy content from
`editorial-copy.md`; do not treat a PDF screenshot as editable text.
