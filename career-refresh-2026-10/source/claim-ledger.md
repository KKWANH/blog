# Career content evidence

Working record, 26 October 2026. Private research; not website content.

27 October update: the owner explicitly reports Figma and some design familiarity. The public-repository review is recorded in `github-2026-10-27/skill-evidence.md`; project practice is distinguished from employment and from AI-directed work.

**Update:** Kwanho has now answered the factual questions. See `confirmed-profile.md` for the authoritative corrections and preferences. The table below records the initial audit; its pending title/date/education/award/project-status entries are superseded by that confirmation.

The supplied AI review is a proposal, not a factual source. A commit supports the existence of work, not sole authorship, independent mastery, production deployment, or hardware validation. Questions sent to Kwanho remain open until answered.

## Sources examined

- Supplied `C:/Users/kwanhki/Downloads/CV-3.pdf`, two pages; extracted to `cv-original.txt`.
- Blog at `C:/Projects/blog`, clean starting worktree, HEAD `f8ada6a`.
- Publicly linked blog PDF differs from the supplied PDF.
- KLA product checkout at `C:/Projects/Zeta3D_mirror`, HEAD `6a72da12dc722d36ec688e8cf767e9041e1b4125`. Existing local changes preserved.
- KLA personal documentation at `C:/Projects/Zeta3D_mirror/zeta3d_agents`, HEAD `2f82650e9a4b32d466290bcc2f51b696a79b950a`, with existing local changes. Historical records are source-qualified observations.
- Author-filtered Git history across local references, read on 26 October.
- Public GitHub repositories for KKWANH, read through the unauthenticated GitHub API on 26 October.
- LinkedIn public URL returned HTTP 999. No profile content or edit access obtained.

## Claims and dispositions

| Claim | Evidence | Disposition |
| --- | --- | --- |
| Currently works at KLA | User's direct request | Use employer and semiconductor equipment context. Exact title/start/location requested. |
| Aug 2026 start | Pasted AI review; earliest observed commits in August | Do not infer employment date from commits. Pending user. |
| Owns/leads the whole lifter subsystem | Pasted AI review, ongoing work records | Avoid ownership/leadership wording until contribution boundaries are confirmed. |
| Lifter coordination and recovery work | Current task record; relevant author commits | Use “working on” or “developing”; not “shipped” or “production-proven.” |
| Lifter work hardware validated | Current record explicitly says HIL pending | Do not claim full hardware validation. Test counts differ from pasted review and are not useful CV metrics. |
| Redundant movement handling preserves interlock | Current branch `7166c9d6c`; task record | Candidate bullet may describe software change. Hardware validation remains pending. No claim of improved downtime or physical safety certification. |
| Fractional position readback matters | Implementation record | Useful private interview topic; proprietary controller names and raw values unnecessary for public prose. |
| Camera white-balance changes/readback | Author history and imaging task record | Candidate wording: settings applied, reported by camera and reflected in UI. One backend has recorded HIL; second backend pending. Avoid “all cameras validated.” |
| TMC controller migration | Author history, merged change, follow-up records | Candidate public wording: serial device-control code moved into shared equipment layer. No blanket claim that lifecycle/recovery is finished. |
| TMC logging | Merged task record, `46b38c58c` | Concrete software work; low priority in short CV. |
| OR-Tools optimization shipped | Record says closed without merge; maintainer rejected dependency size | Exclude from accomplishment bullets. If discussed, describe an investigation and the maintainer's decision; do not claim the rejection was Kwanho's decision. |
| Pickit title/dates | Supplied CV | Research & Software Engineer, Aug 2025–Mar 2026, Leuven. |
| Pickit port-conflict diagnosis | Supplied CV | Keep specific diagnosis and fix; drop permanent-recurrence guarantees. |
| Pickit WebSocket/log/config work | Supplied CV | Keep implementation facts. Remove unmeasured efficiency claims. |
| Saved multiple hours per Pickit incident | Blog only, stronger than supplied CV | Remove unless evidence supplied. |
| Bosch title/dates | Supplied CV | V2X Communication Intern, Jun–Nov 2024, Hildesheim. |
| Bosch safety-critical certification ownership | Old blog rhetoric | Describe a demonstrator and test runs, not certified production safety engineering. |
| BCX first prize | Supplied CV; category unspecified | Ask award scope. No overall-win assertion. |
| Ariadne universal citation guarantee | Old CV/blog | Describe document references/evidence review features. Do not promise every claim is supported or hallucinations prevented. |
| Ariadne latency and retrieval scores | Old blog, no reproducible benchmark supplied | Remove. |
| Earprint public source | Both linked repository README endpoints returned 404 on 26 October | Removed both source links; no assumption whether repositories are private or deleted. |
| Side projects active/live | Ariadne public repository latest push July 2026. `earprint.kwanho.dev` and `ai.kwanho.dev` returned HTTP 200 on 26 October | Home pages respond, but functionality, usage and active maintenance are unverified. Avoid an active-development claim. |
| Degrees and current enrolment | Supplied CV | Preserve as candidate facts; confirm degree status and institution-issued English titles before submission. Do not invent B.Sc./B.Eng. equivalences. |
| IELTS 7.5 | Supplied CV, Mar 2025 | Use score/date; CEFR equivalence not needed. |
| Location | Supplied CV says Leuven | Ask current location; remove contradictory homepage Seoul/Wolfsburg “Based in.” |
| Actively seeking work | Old blog | Remove “Available now” pending user intent. |

## Editorial rules

Write in English by default. State the task, action and observed result where known. An implementation fact can stand without an invented impact clause. Keep company vocabulary at a public level; no ticket numbers, internal class names, customer details, controller configurations or source excerpts in public deliverables.

Maintain three distinctions: employment versus training; implemented software versus validated hardware; demonstrated experience versus subjects being learned. The CV is a selected record, the profile explains the work, and the blog can hold longer notes. They need consistent facts, not identical paragraphs.

## Unresolved inputs

Career target; official KLA title/start/location; personal contribution and confidence for each technical topic; degree/program status; BCX category and contribution; current project status; personal voice/design preference; current LinkedIn profile.
