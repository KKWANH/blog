# Interactive skills map and complete repository review

27 October 2026. Local work in `C:/Projects/blog`, baseline `3f85a90` plus the preserved CV/skills candidate.

## Result

- Native pan/zoom camera with modifier-wheel, touch pinch and explicit controls.
- Node dragging, branch dragging with visible children, keyboard node movement, position reset and folding.
- Search reveals a hidden technology or any repository and focuses its connections.
- A navigable overview, an in-place inspector and an expanded dialog with Escape/focus return.
- Normal wheel scrolling continues through the embedded map. Motion preference affects optional camera transitions; manual manipulation remains available.
- A readable icon list and an individual repository catalogue remain available alongside the map.

Links:

- http://localhost:3100/about?view=map#skills
- http://localhost:3100/about?view=repositories#skills

## Complete coverage

All 74 current public KKWANH repositories have individual records. Seventy-three contain inspected text sources; one is empty. The review inspected 336 documentation, dependency/configuration and source files and recorded 77 technology/reference topics.

The profile list contains 44 experience/practice entries. Repository-only technologies remain separately labelled. References, templates, AI-directed material and empty repositories are not hidden, and technology presence is not converted into professional proficiency.

Twenty-six records retain source-access limitations, primarily raw Python downloads blocked by Zscaler. Accessible README/setup/requirements material was reviewed. The restriction was not bypassed and those source bodies were not claimed as read.

Source matrix: `source/github-2026-10-27/full-audit/review-matrix.md`.

`full-repository-coverage.json` validates inventory completeness, uniqueness, inspected source paths, pinned source URLs, technology evidence paths and the Ariadne/fork boundaries. Historical repository code was not executed.

## Review and verification

`interactive-map-checks.json` verifies actual pan/zoom transforms, node and branch movement, edge following, keyboard control, collapse/reopen, hidden-result search, all 74 visible reviews, overview navigation, full-screen bounds, mobile touch/pinch, reduced motion and normal/enlarged reflow.

Initial reviews found:

- The shared dialog's default centering translation conflicted with the expanded layout. Explicit zero-translation utility classes and the matching variables fixed its bounds.
- Small overlapping branch controls and offscreen node hit regions affected target checks. Branch activation now uses the whole native node button, while offscreen/clipped nodes leave the tab order and camera-control area.
- A branch-drag test needed to await the focus camera's DOM update before choosing pointer coordinates. The recorded parent/child displacement confirms the actual behavior.

Failed reports are retained as `interactive-map-checks-initial.json` and `interactive-map-checks-review2.json`. The final behavioural report passed with no runtime errors or reported axe violations; incomplete ARIA/contrast checks remain.

The updated paper/profile/video/local-access regression checks also passed, without atlas mutations. Build/type/content results and final source fingerprints are recorded separately.

## Boundaries

No package installation/overwrite, credential change, company-product edit or GitHub publication occurred. The company-bound doctor/claim helper rejected the personal blog origin; the bindings and registry were not modified. Company and sidecar dirty work was preserved.

The CV's four reviewed A4 passes and the current public PDF were preserved. This new map/catalogue is a local review candidate; the public site remains the previously published release.
