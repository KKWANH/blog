---
status: completed-local
baseline: e332b7fdbcf655f893c2ea29b0de05ba0da111e5
scope: personal portfolio only
---

# Portfolio, admin and security review

## Owner requirements

0. Review all skills; “C++ containers” should not look like a language separate from C++.
1. Remove the unattractive two/three layers of boxes in the icon list.
2. Explain local/public editing and what an ordinary visitor can do for Travel and Skills.
3. Review/refactor code for performance and payload size.
4. Build an admin view for visitor counts, referral and page-flow statistics, with password/session protection.
5. “전체적으로 security 리뷰 5회 아주 적대적 강력하게 실시 및 수정”.
6. Review whether About should feature only Color Saves Life.
7. Collapse the Color Saves Life film/details behind a dated topic/qualified-award summary; consider removing redundant Projects navigation.
8. Strengthen paper texture and useful identity information; reconsider the narrow C++ Software Engineer headline.
9. A very simple rounded green/gradient favicon, no letters; create a matching original mark for the card.
10. Stronger card/home-photo tilt, including mobile interaction.
11. More atmospheric gradient and a restrained pointer light.
12. A more definite visual point in the CV. Supplied older CV images are visual references, not a request to copy their layout or restore outdated personal facts.

The earlier three-designer/two-recruiter AI-role review requirement continues for the new CV. No current GitHub write is authorized.

## Design and content invariants

- Preserve the exact owner familiarity/visibility file and atlas unless the owner explicitly edits them.
- Stable skill IDs remain; classify concepts separately from tools/languages instead of silently transferring ratings.
- Headline becomes Software Engineer, with a specific systems/integration/interface focus. Actual employer role names remain factual.
- About gets selected evidence from more than one project; source/contribution scope remains explicit.
- Color Saves Life starts collapsed. Opening details still does not auto-download/play its video.
- Preserve old URLs through redirects/anchors rather than deleting useful evidence.
- The old CV photos/phone/age/location/employment text are not new factual sources.
- Motion is deliberate, uses frame-scheduled CSS variables and respects reduced-motion/pause. Native vertical touch scrolling must remain.

## Performance strategy

Measure before/after. Separate the small repository index from detailed source reviews and load details on demand. Reduce client validation/data duplication. Keep optional analytics small, bounded and first-party; avoid duplicate third-party tracking. Optimize measured hot paths/assets rather than broad dependency churn.

## Admin/analytics boundary

Use a password hash, an encrypted HttpOnly session cookie and server-side session validity. No plaintext credential is logged or returned. The agent does not invent/set a real password.

Local setup is an explicit user action on the opt-in loopback editor and creates ignored/private configuration exclusively. Production requires configured secrets and durable REST Redis storage; absent configuration fails closed. No provisioning, credential upload or live activation is performed without the needed configuration.

Statistics should show aggregate page/referral/flow counts; optional consented visitor/session counts are labelled as such. No raw IP, query string, full referrer URL, fingerprint or personal browsing history belongs in analytics. DNT/GPC and consent withdrawal are respected. Data/cardinality/retention are bounded.

Travel/Skills publication remains the existing owner-only GitHub storage flow; a password dashboard does not magically provide GitHub write credentials.

## Five adversarial rounds

1. Identity, local/production origin and owner/admin session gates.
2. Request parsing, file writes, conflicts, source sync and data bounds.
3. Analytics consent, cookies, path/referrer normalization, poisoning and retention.
4. Browser/deployment headers, XSS/traversal/private assets and dependencies.
5. Replay, concurrent changes and regression of all previous findings at the final candidate.

For each round: inspect/attack a concrete surface, retain failing proof when a defect is found, fix minimally, and record retest. AI reviewers are not real external auditors or certifications.

## Work sequence and acceptance

- [x] Baseline size/performance and initial security proof.
- [x] Taxonomy and flat list; lazy repository detail. OpenCV, already explicitly shown/rated by the owner, received a curated library definition as well.
- [x] Selected work/Projects routing, broader identity, material/mark/motion.
- [x] Admin password/session and bounded analytics with local/production adapters.
- [x] Five adversarial AI rounds, concrete fixes and targeted retests. Final complete corpus also passes.
- [x] Distinct CV variants, actual captures and 3+2 AI-role reviews; 14 export checks pass.
- [x] Before/after performance, responsive/touch/reduced-motion/export validation.
- [x] Current docs and a reviewable local result; no remote publication.

## State and routing notes

The owner added a `containers: repository` override at
`2026-10-27T15:24:09.716Z`. Preserve that newer choice: 45 overrides now exist,
and the current profile shows 39 entries with 39 familiarity labels.
The initial hash therefore differs for a legitimate newer saved preference;
fixture runs independently confirmed they did not mutate the real files.

The supplied Zeta3D doctor and claim commands were attempted from
`C:/Projects/blog`; both reject this personal origin with
`Unexpected product origin`. No company binding/rules were changed to bypass
that scope restriction. Work remains in the personal blog and career folders.
No company data, GitHub publication, real credential setup or remote mutation
was performed. The primary owner preview remains `http://localhost:3100`.

## Environment

The company-bound doctor/claim helper rejects the personal blog origin; no binding is changed or company lease fabricated. Product and sidecar dirty work remain untouched. At most two requested review workers and one heavy job at a time. Settings/AGENTS/AI environment already loaded; their source identity was rechecked. No relevant project/plugin skill was available.
