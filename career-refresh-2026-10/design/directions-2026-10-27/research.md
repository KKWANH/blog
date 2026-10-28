# Ten directions, five references

27 October 2026. The published starting point is `8e5b24d`. The user's correction is about the information model as much as the visual treatment: the portrait object has become familiar, its reverse adds little, and closed text sections conceal the useful material.

The interactive visual board is `index.html`. These are structural studies, not ten finished applications.

## Ten distinct concepts

| # | Concept | Composition and interaction | What it makes visible | Main tradeoff |
| --- | --- | --- | --- | --- |
| 1 | Open editorial spread | Flat portrait masthead; broad work/education sections; skill anchors. | Contributions, dates and completion states without opening anything. | Quiet; typography and image selection must carry the character. |
| 2 | Evidence ledger | Period/role/contribution/skill/source columns, generous rules and spacing. | The difference between a claimed contribution and a public artifact. | Can feel administrative if treated as a spreadsheet. |
| 3 | Career score | Work and study occupy parallel dated tracks. Skills highlight related roles. | Overlap between study and employment, with ongoing work clearly marked. | Mobile needs an accessible text record and honest date precision. |
| 4 | Systems cutaway | Application, communication and device layers link to concrete examples. | Bounded interfaces/recovery work at KLA/Pickit/Bosch. | Must be labelled as an explanatory view, never an employer architecture claim. |
| 5 | Evidence atlas | Small fixed relationship graph: skill → role/project → date/source. | Connections with explicit meanings such as used in, studied and team project. | Graph density and keyboard equivalents require care. |
| 6 | Cinematic chapters | Wide scenes pair roles/projects with substantial artifacts and short captions. | Actual work at large scale, with an ordinary index for fast access. | Empty oversized scenes or invented imagery would repeat the problem. |
| 7 | Paired evidence reader | Open chronology on one side, a selected artifact/scope view on the other. | A skill selection explains a particular contribution while all career text stays visible. | Work without public artifacts needs honest scope illustrations. |
| 8 | Capability mural | C++, Interfaces and Mobility form large visual bands with named examples. | Transferable areas, supported by roles and dates. | Employers can become repetitive; editing must be tight. |
| 9 | Annotated exhibition wall | Authored, asymmetric public images/diagrams with a dated caption rail. | Outputs and their provenance; education becomes a real chronological landmark. | Depends on approved, relevant imagery. |
| 10 | Public engineering exhibit | An optional reproducible public-project example, with the career record outside it. | Real project behaviour and exact source attribution. | Highest preparation risk; never manufacture a demo and label it historical work. |

## Selected direction

Combine **1 + 3 + 7**: a modest photographic identity, open chronology and a visual work companion. The portrait no longer flips. Skills focus the reader on specific roles/project material; they do not hide unrelated history or show invented proficiency scores.

The homepage retains its photographic atmosphere and hover craft. A real BCX team-project viewer replaces the synthetic lead-project sketch. The actual repository supplies simulation and driver-view images and the prototype architecture.

Known scope remains explicit: KLA analysis/design/early implementation with team review; Pickit communication-interface design/integration; Bosch V2X; three awarded degrees and current Mechatronics; completed 42 and SEA:ME; BCX first place in the digital.auto & mobility challenge. No 42 completion date or individual ownership of the whole team prototype is invented.

## Five live references

All five returned HTTP 200 and rendered in Edge on 27 October 2026. Desktop interaction was inspected at 1440×1000; responsive layouts were also inspected at 390×844. Fresh touch-emulated navigations timed out in the shared research session, so native touch is not claimed.

### 1. Bruno Simon — spatial orientation

https://bruno-simon.com/

The current miniature world exposes Career, Projects and Lab through recognizable landmarks and a map. Driving and map navigation were observed.

Borrow recognizable areas connected by a route; keep an ordinary open timeline as the main recruitment path. Do not require driving or discovering a hidden CV. The inspected main JavaScript alone was about 1.03MB encoded, before scene assets, and map/menu buttons lacked accessible names. This is a spatial reference, not a reason to ship a heavy game.

Screenshots: `references/bruno-spatial-driving.png`, `bruno-spatial-map.png`, `bruno-responsive-390.png`.

### 2. Observatory of Economic Complexity — relationships with meaning

https://oec.world/en/visualize/network?dataset=hs92&space=product&time=2024

Hovering Crude Petroleum exposed HS4 2709 and its trade value; selecting it focused the network. Node data included real trade-value, RCA and relatedness fields.

Borrow meaningful edges: technology → project/role → date → public source or stated contribution. Avoid arbitrary node sizes and invented skill percentages. Keep the portfolio network small and provide readable, focusable alternatives to tiny SVG targets.

Screenshots: `references/oec-product-evidence-tooltip.png`, `oec-network-related-selection.png`, `oec-responsive-390.png`.

### 3. Pentagram — image-led project explanation

https://www.pentagram.com/work/behold-wildlife-camera

A short brief and discipline tags lead into large environmental/product photographs and captions. The About panel opens without replacing the image sequence. Some videos remained consent-gated and were not assessed.

Borrow context image → diagram → interface/test artifact → outcome caption. Do not hide essential career information behind About. Use meaningful alt text rather than filename-like descriptions; essential evidence should not require a third-party media consent.

Screenshots: `references/pentagram-behold-editorial.png`, `pentagram-behold-story.png`, `pentagram-about-expanded.png`.

### 4. Rauno Freiberg — localized interaction

https://rauno.me/craft/minimap

The live example has 50 ruler-like marks. Pointer movement expands nearby marks while preserving the surrounding context; a slow-motion control changes the state.

Borrow small, continuous emphasis on actual milestones. Avoid copying a content-free ruler. The stage exposed no focusable controls in inspection, so a portfolio adaptation needs explicit tap/keyboard/focus controls and a static reduced-motion form.

Screenshots: `references/rauno-minimap-drag.png`, `rauno-responsive-390.png`.

### 5. NOWNESS — photographic atmosphere

https://www.nowness.com/series/grounded/picture-a-tree-paul-graviano-bonsai-of-brooklyn

Workshop textures, natural light, vegetation and close portraiture establish the film's atmosphere. Muted playback was observed. The narrow layout advertised subtitles; subtitle operation was not tested.

Borrow authentic context and material light from the owner's photographs. Pair it with genuine engineering artifacts. Avoid generic forest stock, invented workplace imagery and compulsory autoplay. A strong poster should work before any optional video loads.

Screenshots: `references/nowness-grounded-film.png`, `nowness-responsive-390.png`.

## Artifact inventory

The public `KKWANH/ColorSavesLife` repository is MIT-licensed. Its team-authored simulation images and prototype diagram are now available for the work viewer; attribution and the license are retained. The website does not claim the entire simulation/architecture as an individual achievement.

Source: https://github.com/KKWANH/ColorSavesLife

Third-party reference screenshots remain in this private research folder; their assets were not copied into the application.
