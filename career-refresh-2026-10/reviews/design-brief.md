# Design brief and review protocol

English is the default language. Existing Korean study material must retain an honest language indication. The product should feel authored by one engineer, with a small amount of handwriting and clear reading paths.

## CV direction

Purpose: help a technical reviewer identify the current role, relevant evidence and chronology quickly, then read without visual friction. Produce an editable DOCX, a two-page A4 PDF example, a plain-text counterpart and exact Google Docs reconstruction instructions.

The CV is a reference design, not an automatically approved application. Unconfirmed career facts remain in the accompanying editorial checklist.

Starting specification:

- A4 portrait; 18 mm left/right margins and approximately 18 mm top/bottom.
- One linear text flow. Align dates with paragraph tab stops in DOCX, not tables or text boxes.
- Lato from Google Fonts. One family, regular and bold. Name approximately 31 pt; role 12 pt; body 10.5 pt with 14–15 pt leading; metadata no smaller than 9.25 pt.
- Ink `#202725`; secondary text `#515A57`; blue `#294FA8`; white page.
- Company and role are stronger than dates; dates remain legible at actual print size.
- Page one: name/contact, short summary, experience, relevant skills. Page two: selected projects, education, training and selected certification.
- Use real paragraph spacing, hanging bullet indents, keep-with-next headings and deliberate page breaks. No ornamental skill charts, portraits or decorative panels.
- Public links must be text and clickable. Export text must follow the same reading order as the page.

Exactly two CV design evaluation rounds. Round one reviews the first rendered document and reconstruction plan. Implement the findings. Round two evaluates the revision. Correct remaining defects after round two without adding a third evaluation round.

### Five simulated CV designer briefs

Each role models 20 years of relevant practice. These are AI evaluation roles, not actual human designers.

1. **Editorial typographer:** judge x-height, glyph distinction, line length, leading, hierarchy, typographic colour, weight contrast, widows and orphans. Read at 100%, not only a zoomed screenshot.
2. **Information designer:** judge scan sequence, grouping, proximity, chronology and the balance between current work and supporting evidence. Identify what competes for attention.
3. **Recruitment document / accessibility designer:** judge text extraction, semantic order, contact discoverability, contrast, ambiguity and the risk of mistaking a draft for final copy. Do not promise ATS compatibility without evidence.
4. **Print production designer:** judge A4 geometry, live area, line and paragraph spacing, clipping, ink/greyscale performance, PDF fonts, links and page breaks.
5. **Google Docs / document systems designer:** judge reproducibility with named paragraph styles, available font alternatives, tab stops, hanging indents, page controls and export. Distinguish Google Fonts availability from guaranteed Google Docs availability.

Every reviewer must return a ranked defect list with exact locations, a concrete change in points/mm or paragraph treatment, and an explicit remaining limitation. No automatic praise or invented measurements.

## Blog direction

Purpose: introduce Kwanho accurately, let a visitor choose a project or note, and make longer material comfortable to read. A visitor seeking a CV should find it quickly; someone curious about a project should be able to inspect it without unrelated motion.

Visual premise: a working notebook with clean typography and a few pen marks. Avoid a newspaper masthead, serif editorial theatrics, glowing gradients, glass cards, mouse-following spotlights and a grid of identical rounded panels.

Starting specification:

- Cool near-white paper, dark ink and restrained ballpoint blue. A separate dark palette uses the same contrast hierarchy.
- Figtree for readable interface and article text; Caveat only for short margin notes and occasional annotations. Code uses the system monospace stack.
- Original single-colour K monogram drawn as a few uneven pen strokes. Treat it as a proposed mark, not the user's actual signature.
- Large, direct introduction with real career context. Project illustrations should explain documents/music/simulation rather than decorate them.
- Use spacing, rules and typographic hierarchy before containers. Comfortable article measure around 65–72 characters.
- Small purposeful interactions: project filtering, expandable implementation details, navigation, accessible theme choice, article links/contents, existing travel controls.
- Keyboard navigation and visible focus throughout. Nothing important appears only on hover. No auto-playing scene, scroll takeover or cursor replacement.
- Respect reduced motion. Controls target at least 44 CSS px. Check 360/390, 768 and 1440 px widths, large text, long labels and light/dark modes.
- Preserve working routes, media and travel functionality. Correct stale links and job status. Keep source implementation details out of public UI.

Exactly three blog evaluation rounds, each against a working revision:

1. Structure and identity: home/about/project discovery.
2. Reading and behaviour: mobile, navigation, articles, accessibility, interaction purpose.
3. Final coherence: whole-site consistency, performance, edge states and regressions.

### Seven simulated blog designer briefs

The user requested four Apple and three Google perspectives. These roles borrow public product-design concerns; they do not impersonate employees or claim access to internal company practices. Each assumes 20 years of practice.

1. **Apple-inspired visual identity principal:** mark, optical balance, restrained material treatment, proportion, recognisable authorship.
2. **Apple-inspired typography / editorial principal:** hierarchy, text measure, rhythm, type pairing, article comfort and handwritten restraint.
3. **Apple-inspired interaction principal:** cause and effect, feedback, state transitions, direct manipulation, useful disclosure and motion budget.
4. **Apple-inspired responsive product principal:** navigation, touch use, small-screen composition, orientation, intent and continuity.
5. **Google-inspired accessibility principal:** semantics, contrast, keyboard/focus, target size, reduced motion, reflow and language.
6. **Google-inspired information architecture / content principal:** audience tasks, labels, discoverability, route consistency, trustworthy career claims and multilingual archives.
7. **Google-inspired web systems / performance principal:** CSS/token discipline, font budget, server/client boundaries, layout shift, route integrity and progressive enhancement.

Reviewers must identify tangible defects and explain the user consequence. Use source evidence and rendered screenshots when available; do not claim to have inspected an image or browser you did not access. Return no more than five prioritized findings. Reviews are advisory, not approvals.
