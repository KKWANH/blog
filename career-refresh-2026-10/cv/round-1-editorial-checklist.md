# First-version editorial checklist

**Status:** design example only. This document is an accompanying factual checklist, not a formal design evaluation. No unresolved fact has been treated as confirmed by the layout or by a successful build.

The first PDF/DOCX show `WORKING DRAFT · DESIGN EXAMPLE` and `Role and education details await confirmation.` on page one. Both footers read `WORKING DRAFT · Not for submission`. Education carries its own short status note.

## Required user confirmation before submission

- [ ] **KLA:** official title, start month/year and work location. The example intentionally uses **KLA — Software engineering** and **Current**, with no inferred start date or current location. “Software Engineer” is the broad CV headline, not an assertion of the official KLA HR title.
- [ ] **Personal contribution:** confirm which KLA changes the candidate implemented, contributed to, tested or is still developing. “Work includes…” is deliberately provisional; it does not assert sole ownership, independent mastery or shipment.
- [ ] **Validation/release status:** confirm the boundaries for lifter recovery, camera handling and serial integration. The lifter bullet explicitly says hardware validation is pending. No blanket camera HIL claim, physical-safety certification, production guarantee or quantified impact is made.
- [ ] **Education:** confirm each programme's status, any qualification actually awarded, exact institution-issued English title, and the awarding institution for the Academic Credit Bank System entries.
- [ ] **42:** confirm programme end date or current status. “Started Sep 2020” preserves a supplied start without implying continuing enrolment.
- [ ] **Bosch ConnectedExperience:** confirm the challenge/category and contribution/award scope. **The first version omits the award entirely**, including “first prize,” rather than implying an overall win.
- [ ] **Current project status:** confirm whether the selected projects remain active, public or deployed. The example describes work already done, without claiming a currently live service.
- [ ] **Current personal location and career target:** neither a current location nor availability/job-seeking status is invented.

## Education records retained as supplied; status to confirm

These are **subjects + institution/system labels + dates**, not verified awarded degrees or invented B.Sc./B.Eng. equivalents. They are arranged by the supplied end dates, with the open-ended entry first.

| Subject | Institution/system label used | Dates as supplied | Pending |
| --- | --- | --- | --- |
| Mechatronics | Korea National Open University | Feb 2026–Present | Current enrolment, qualification and official English title. “Present” is supplied, not independently confirmed. |
| Artificial Intelligence | Korea National Open University | Mar 2023–Feb 2025 | Whether/what was awarded and official English title. |
| Business Administration | Academic Credit Bank System | Apr 2019–Aug 2022 | Awarding institution, award status and official English title. |
| Computer Engineering | Academic Credit Bank System | Apr 2019–Aug 2020 | Awarding institution, award status and official English title. |

SEA:ME and 42 appear in **Training**, not Education. The unverified “master-level” description has not been carried over. GPAs and unrelated credentials are omitted to keep the example focused, not reinterpreted.

## Source-to-copy decisions

Paths below are read-only source references relative to the parent workspace.

| Copy area | Source | First-version treatment |
| --- | --- | --- |
| Contacts | `source/cv-draft-v1.md:3–6`; original email in `source/cv-original.txt:3` | Keeps `kwanho0096@gmail.com`, `kwanho.dev`, `linkedin.com/in/kwanhokim`, `github.com/KKWANH`. All four are clickable. No current-location line. |
| Broad headline / employer order | `reviews/content-review.md:15–24`; `source/claim-ledger.md:22–30` | “Software Engineer”; KLA before Pickit 3D before Bosch. Employer appears first in each role header. |
| KLA work | `source/cv-draft-v1.md:14–23`; `source/claim-ledger.md:22–32` | Three restrained topic bullets: lifter recovery/axis-error response, camera settings/readback/UI and serial-code integration. No internal identifiers, vendor controller names, tickets, test-count metrics or ownership inflation. |
| Pickit 3D | `source/cv-draft-v1.md:25–32`; `source/cv-original.txt:21–34` | Research & Software Engineer; Aug 2025–Mar 2026; Leuven, Belgium. Keeps port-conflict diagnosis/fix, reconnect/backoff/validation client, timezone-aware log tools and configuration validation as separate bullets. Removes unsupported impact/recurrence guarantees. |
| Bosch | `source/cv-draft-v1.md:34–39`; `source/cv-original.txt:36–46` | V2X Communication Intern; Jun 2024–Nov 2024; Hildesheim, Germany. Demonstrator, interfaces, test runs and eBike prototype; no certified production-safety claim. |
| Skills | `source/cv-draft-v1.md:63–71` | Retains supported languages, integration, application/tool skills and IELTS 7.5/date. Does not promote specialist controller expertise, C# mastery or a CEFR equivalence. |
| Ariadne | `source/cv-draft-v1.md:50–55`; `source/claim-ledger.md:40–43` | Selected 2026 project, source-reference and file-change-review features, named public repository link. No universal citation guarantee, benchmark or current-deployment assertion. |
| ColorSaveLife | `source/cv-draft-v1.md:43–48`; `source/cv-original.txt:69–73`; `source/claim-ledger.md:39` | Feb 2024, Berlin; team presentation, eye-tracking/simulation and Python client. Award omitted pending category/scope. |
| Autonomous Lane-Keeping Assist | `source/cv-draft-v1.md:57–61`; `source/cv-original.txt:75–79` | Aug–Dec 2023, Wolfsburg; CNN lane detection in CARLA and simulation-data collection/evaluation. No real-road or hardware-validation assertion. |
| Education / training | `source/cv-draft-v1.md:73–86`; `source/cv-original.txt:87–98`; `source/claim-ledger.md:44` | Supplied subjects/institutions/dates, explicit degree-status note, training kept separate. |
| Selected credential | `source/cv-draft-v1.md:86`; `source/cv-original.txt:104–106` | Engineer Information Processing; HRD Korea; Nov 2020. No new equivalence or credential scope added. |
| Rush03 | `source/cv-original.txt:81–85` | Concise keyboardist/leader entry with supplied Aug 2022–Jul 2023 dates, 50 members, three events and 200–300 attendees. Does not reinterpret the attendance as “per event” or inflate the count. |

## Intentional exclusions

- Inferred August 2026 KLA employment start, assumed current city, unconfirmed official job title.
- Sole subsystem ownership, “production-proven,” full hardware validation and physical-safety certification.
- Proprietary controller/product identifiers, raw device values, ticket numbers, internal class names and source excerpts.
- Unmerged optimisation work as a shipped accomplishment.
- Unmeasured incident-time savings, reduced support requests, permanent recurrence prevention and AI benchmark claims.
- “Overall BCX winner,” guessed award category, unverified degree equivalents or current project availability.
- Earprint public-source links whose accessibility was unresolved.

The successful local document checks in `round-1-verification.json` cannot resolve any of these factual questions. The parent agent should incorporate the user's answers before submission copy is approved.
