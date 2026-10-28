# Blog design review

Seven simulated principal-designer perspectives, each assuming 20 years of practice. Four use Apple-inspired concerns and three Google-inspired concerns. These are AI review roles, not company employees or endorsements. Exactly three rounds were completed.

## Round one: identity and structure

Reviewed working source and desktop, phone, menu, project and About screenshots. All seven roles used image viewing. Their interaction findings were source-based; the main agent ran the browser checks separately.

| Perspective | Finding | Response for round two |
| --- | --- | --- |
| Visual identity | Repeated handwriting, double underline and tilted-photo conventions compete with actual authorship. K foot is weak at small size. | Remove the name underline; use normal type for section notes; retain restrained greeting/captions. Strengthen header mark, simplify small icon, make Ariadne sketch show an edit for review. |
| Typography/editorial | About measure/leading are loose; the name is tightly tracked; annotations compete with content. | Reading measure 65ch, leading 1.7; name tracking −0.04em; captions 22px equivalent; darker narrative text. |
| Interaction | Menu links precede their trigger in DOM; blocked storage loses explicit theme preference; repeat-copy feedback needs a state transition. | Reorder trigger before nav, retain preference in memory, add pending/success/error copy states. |
| Responsive product | Work evidence falls below the mobile fold; no direct Projects destination. | Reduce mobile hero/photo spacing; add Projects navigation. Work heading measured at approximately 712px on a 390×844 viewport. |
| Accessibility | Menu focus sequence skips destinations; English controls inherit Korean. | Fix DOM order; set English language on controls and preserve Korean on TOC labels. |
| Information architecture | CV is buried and differs from the supplied document; About resembles a dated post. | Promote clearly labelled draft CV; synchronize local PDF; remove About reading time, label update date, add profile section links. |
| Web systems/performance | Old animation/loading style remains; decorative font is heavy; bootstrap storage exception skips system theme. | Replace old loading UI, remove unused aurora/spotlight components/styles, move MapLibre CSS to its component, compress fonts and separate storage exception handling. |

## Browser evidence after round one

`web-check-round-1.json` records 12 successful content routes, no horizontal overflow at 360/768/1440, and no runtime exceptions. It found real menu Tab-order failure, faded study-note contrast and an attribution link distinguished only by colour.

The first test attempt aborted because its locator still expected the button label “Menu” after it had changed to “Close.” That fixture was corrected. The subsequent Notes-navigation boolean was read before the router finished; the next version explicitly awaits the destination URL. Neither fixture issue is presented as an application defect.

The study contrast failure was partly caused by scroll-linked entrance opacity. Reading text now stays fully opaque; small muted study labels are strengthened. Map attribution links are underlined.

An additional 200% root-text-size check found real overflow at 320/390/768. Flexible image columns, wrapping header layout and long-word handling were added. This is a text-size simulation, not a claim of real browser zoom or device testing.

Font payload changes: Figtree WOFF2 19,696 bytes; Caveat static 500 WOFF2 51,132 bytes. Total 70,828 bytes versus 213,688 bytes in the initial TTF subset pair. Caveat is not preloaded on pages that do not use it. Original licensed TTF sources remain available for image/asset editing.

The locally served `CV.pdf` is the reviewed **working draft**. Its link labels state that status. Factual questions remain open, and nothing has been deployed or pushed.

## Round two

All seven roles reviewed the revised source and supplied images. The production build passed. Browser checks showed no horizontal overflow across 320/390/768/1440 or with 200% root text size at 320/390/768, and verified menu, navigation, disclosure, TOC and theme behaviour.

| Perspective | Remaining finding | Response for the final round |
| --- | --- | --- |
| Visual identity | Social image used a different K geometry. Several “top” screenshots were actually scrolled. | Re-render the social mark from the primary SVG; reset scroll, hover and focus before comparison captures. |
| Typography | About subtitle stranded a short employer phrase; featured-note summary remained too loose/muted. | Balance the short subtitle, keep normal paragraphs unbalanced, use 1.7 leading and ink for the summary. |
| Interaction | Copy pending updates were mistakenly in effect cleanup; disabled buttons risk losing focus. Travel screenshot exposed unusable provider tiles. | Move state updates into the action, use an in-flight guard and `aria-disabled`, verify actual status transitions. Replace the map's external raster dependency. |
| Responsive product | Travel's map task was blocked; illustration-first project rows are a lower-priority scan trade-off. | Restore useful geography with bundled country outlines; retain project rows while validating their mobile use. |
| Accessibility | Archive red/pink text fails contrast; breadcrumb targets could be more comfortable. | Add theme-aware semantic colours and 44px breadcrumb targets; retest copy and language semantics. |
| Information architecture | Homepage KLA archive entry needs its public-source qualification before navigation. | Add “Public-source study guide” directly to that entry. |
| Web systems | Small radius token evaluates negative; negative/encoded routes untested. | Use explicit nonnegative radius values; add route checks. Preserve useful shared study/loading CSS instead of blind pruning. |

Two important evidence corrections:

- The initial copy synchronization suspicion was **not sufficient**. A targeted DOM observer confirmed two copy calls but only one success update. Source inspection found pending/message updates in the cleanup callback. This was a real implementation error, corrected for round three. The new check observes two complete status transitions and focus during the pending period.
- A 200 HTTP response and no JavaScript exception did **not** prove the old map usable. Its image tiles displayed “API KEY REQUIRED.” The map now uses the already bundled Natural Earth country geometry, with selectable visited places and existing filters. It is an overview map, not a street map, and makes no external raster-tile requests.

Round-two full-page screenshots retained focused/scrolling state; the incorrectly named “top” captures do not establish hero layout. These are capture limitations, not evidence that a sticky header appears halfway down a normally opened page. Final-round captures reset state explicitly.

## Round three

All seven roles inspected the final source, matched screenshots and measured evidence. No role found a blocking defect in the inspected design/implementation scope. This is the final evaluation round; it does not confirm the owner's career facts or personal voice.

| Perspective | Final disposition |
| --- | --- |
| Visual identity | Coherent light/dark identity, portrait treatment and shared K geometry. A heavier 16px-only icon is optional, not required. |
| Typography | Name tracking, balanced subtitle, article rhythm and restrained handwriting accepted. No further CSS correction requested. |
| Interaction | Copy's two status cycles and retained focus are now demonstrated. Menu, theme, disclosure and map behaviour accepted within the recorded browser scope. |
| Responsive product | Compact introduction, visible Work section, menu and map accepted. Home supports visual browsing; Projects offers a concise comparison path. Dense map markers could later benefit from clustering; the existing city list already supports exact selection. |
| Accessibility | No evidenced blocker in the sampled checks. Automated `incomplete` items and real assistive-technology testing remain outside any claim of complete conformance. |
| Information architecture | Direct Projects, accessible CV draft and KLA public-source provenance accepted. Owner factual/voice confirmation remains necessary before treating the copy as final. |
| Web systems | Build, radius tokens, route checks, fonts, theme and map changes accepted. A dedicated WebGL-error fallback is an optional resilience improvement, not an observed failure. |

## Final evidence

- `web-check-round-3.json`: 12 successful content routes; unknown and encoded routes behave as expected; no horizontal overflow at 320/390/768/1440; 200% root-text-size reflow checks; eight light-theme axe audits with no reported violations; keyboard/menu/disclosure/TOC/copy/theme checks pass; no recorded JavaScript exceptions.
- `final-edge-checks.json`: five dark-theme audits with no reported violations; the map renders and selects places with external HTTPS blocked; no external requests attempted in that map check; matching two-page CV served from all inspected draft-labelled entry points.
- `final-ui-checks.json`: short-landscape menu reachability, enlarged-text TOC clearance and sampled heading outlines pass.
- Cold local layout shift measured 0; synthetic 500ms font delay measured approximately 0.000087. These are laboratory observations, not field Core Web Vitals or a performance score.
- `blog-round-3-icons-1x.png` and `blog-round-3-icons-2x.png`: browser rasterizations at 16/24/32 CSS px and simulated pixel densities. These do not replace physical-device checks.

No fourth design round was performed. Physical-device, screen-reader and exhaustive accessibility validation remain unperformed. The current CV and career copy are still awaiting the user's factual answers.

## Final portability correction

The pre-handoff check found a Windows-specific issue in the existing Markdown loader: it recognised frontmatter only with LF line endings. Since the profile and project pages now use Markdown, a Windows checkout/save could expose metadata as article text and lose titles.

A focused check reproduced the failure (`crlf: title`, actual fallback title `Crlf`). The loader now normalizes a UTF-8 BOM and CRLF before parsing. `scripts/check-content.mjs` exercises the actual loader and renderer with LF, CRLF and BOM+CRLF fixtures. This is a content-loading correction with the same rendered design, not an additional design round.
