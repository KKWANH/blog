# CV design workspace

The current **selected CV** is the rendered A4 HTML at `http://localhost:3100/studio/cv-editorial-2026-10-27/index.html`. It uses a 30pt Source Serif 4 identity, 11pt Inter narrative, a short forest accent and a three-column capability band with matching outline symbols. Gmail and separate 42/SEA:ME entries are retained.

After the owner rejected the boxed nameplate, five **new** capture/critique/revision cycles were completed. Their before/after full-page and top-detail captures are at `http://localhost:3100/studio/cv-designer-cycles-2026-10-27/index.html`. The earlier round-1 through round-5 files are historical.

The owner then requested more visible UI detail and a three-designer/two-recruiter review set. Those independent AI-role reviews and the current selection are at `http://localhost:3100/studio/cv-interface-details-2026-10-27/index.html`.

Use **`google-docs-design-spec.md`** for the synchronized manual specification. `editorial-content.json` and `editorial-design.json` are the canonical copy/design values; `build_editorial_cv.py` regenerates HTML and Markdown. The current selected proof is `../design/cv-interface-details-2026-10-27/captures/round-3.pdf`, copied to the blog's `public/CV.pdf` for the requested release.

The existing **`current.pdf` / `current.docx`** remain the earlier two-page factual reference; the website's PDF has not been silently replaced. `current-google-docs.md` describes that historical Lato layout.

Earlier simulated-specialist rounds remain in `../reviews/cv-review.md`. The newer editorial layout uses actual A4 render, overflow, text and link checks rather than treating those old reviews as current validation.

The owner has confirmed the KLA title/start/location, contribution stage, education and award scope. The current copy reflects those answers. It remains a reference layout for the owner's Google Docs work; the original review-round artifacts remain unchanged.

## Current design files

- `editorial-content.json`: selected current copy, including owner-confirmed Figma familiarity and the inspected containers project.
- `editorial-copy.md`: pasteable English text generated from that same content.
- `editorial-design.json`: font/point/mm/colour values.
- `build_editorial_cv.py`: generates the A4 HTML and synchronized Google Docs specification.
- `google-docs-design-spec.md`: current authoring instructions.
- `../design/cv-editorial-2026-10-27/`: live preview, iteration comparison, fonts/licenses and proofs.
- `../design/cv-designer-cycles-2026-10-27/`: the five new designer self-review cycles and current selected proof.

## Earlier reference files

- `current.pdf`: two-page A4 reference.
- `current.docx`: editable paragraphs, headings, lists and links.
- `current-google-docs.md`: historical two-page Lato specifications.
- `current-content.json`: source copy for regeneration.
- `current-page-1.png`, `current-page-2.png`: current screen previews.
- `current-verification.json`, `current-extracted.txt`: measured output and text extraction.
- `round-1` / `round-2` artifacts and the original reconstruction guide: historical review material.

## Regenerate

Current HTML/specification:

```powershell
& "C:\Program Files\Python313\python.exe" "C:\Projects\career-refresh-2026-10\cv\build_editorial_cv.py"
```

Historical two-page reference:

```powershell
& "C:\Program Files\Python313\python.exe" "C:\Projects\career-refresh-2026-10\cv\build_cv.py" --version current
```

The script finds the neighbouring isolated Python packages. It writes only the selected version's artifacts beside itself; it does not publish or edit the blog. `--version round-1` retains the original layout rules. The frozen first-review files are also kept in `../reviews/cv-round-1/`.

The corrected round-two build verifies two A4 pages, 18 mm live-area bounds, ordered selectable text, embedded Lato fonts, Unicode maps, links, neutral footer colour and editable DOCX structures. Its verification report records exact source hashes and tool versions.

DOCX pagination has not been rendered in Word or Google Docs. No authenticated Docs import/export, physical printer proof, screen-reader test, real ATS ingestion or PDF/UA check was performed. The PDF is not tagged. Use the reconstruction guide and the actual receiving application's fields for those remaining checks.
