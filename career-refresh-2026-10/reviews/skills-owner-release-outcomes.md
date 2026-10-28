# CV detail, owner skill settings and repository sync

27 October 2026. Personal blog/career work only.

## Owner requirements

> CV에 명함이든 아님 뭔가 디자인적인 요소를 약간만 살려달라구 했자나 나 UI도 약간 했었으니깐 ㅠㅠ 너무 미니멀로만 가지 말고
> 그리고 할 때 디자이너 리뷰 각각 3명 리크루터 2명 잡고 돌리는거 잊지말구
>
> 마인드 맵 좀만 더 개선하고 메인에 C++을 놓진 말고 그리고 기술에 내가 얼마나 익숙한지 그 레벨 입력할 수 있게 하고 (travel처럼) (잘 기억 안나서 배제도 할 수 있게끔 .. !!) 파일로 관리해서 추후 다른 agent도 관리 쉽게끔 만들고 배경 클릭으로 축소든 확대든 좀 더 동적인 interaction 가능하게 ㄱㄱ (기술에 레벨 넣으면 icon list에서도 보여야겠지?)
> 그리고 repositories랑 연결도 동적으로 잘 되게... sync를 스크립트화? 아님 자동 실행? 그건 알아서 아이디어 내보삼
>
> 그리고 다 하면 push

## Completed

- CV: restrained forest accent, designed three-column capability band, consistent outline symbols and link cues. A4 one-page/11pt narrative retained; Gmail and separate programs retained. C++ project leads, degree/year pairs are explicit.
- Five independent AI roles (three designers, two recruiters) reviewed actual captures in two rounds. Findings and dispositions: `design/cv-interface-details-2026-10-27/reviews/summary.md`. These are not actual external human endorsements.
- Skill editor: `/about/manage`; four self-assessed levels plus unrated; profile/repository-only/hidden visibility. Definitions/preferences are human-editable JSON. No rating was guessed by the implementation.
- Icon list, map and inspectors share preferences. Saves notify other tabs. Stale refreshes are aborted.
- The map center represents Kwanho with a neutral icon. Background single-click/tap shows the overview; double-click/tap zooms; Shift-double-click zooms out. Existing drag, branch, search, keyboard, pinch and reduced-motion behavior remain.
- Repository sync updates the generated catalogue and preserves manual definitions/preferences. The actual 74-repository refresh reused existing pinned reviews. New/changed source is review-pending, not automatically promoted to expertise.
- Native file/owner/CSRF/GitHub-mock/sync checks, TypeScript and production build passed. Map, preference, portrait/media/reflow checks passed. Tests did not modify real atlas data or assign real skill ratings.

## Important review fixes

Save controls are disabled while a request is in flight, avoiding loss of a later edit when an earlier response returns. The local store rechecks its revision before replacing the file, preserving an external agent edit during staging. A fixture confirms this case.

The canonical sync command initially failed Node's bundled certificate trust (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`). It now uses the supported Node 22 system certificate store with TLS verification enabled. `skills:sync:check` passed against all 74 actual public repositories.

A cold development navigation did not reach network idle during build/type activity; the completed map suite passed once that activity settled. A root-identity test used rendered text while viewport culling changed visibility; the final assertion checks the actual identity text and neutral icon. No C++ centerpiece remains.

## Artifacts

- `reviews/interactive-map-checks.json`: 36 map/catalogue checks.
- `reviews/skill-preferences-ui-checks.json`: 26 editor/state/background-interaction checks.
- `reviews/skill-map-touch-background.json`: actual touch double-tap and background overview.
- `reviews/stationery-checks.json`: 48 existing profile/media/local-access checks.
- `reviews/cv-interface-final-checks.json`: selected PDF export and content boundaries.
- `reviews/skills-owner-release-candidate.json`: source hashes and pre-commit evidence.

## Git and publication

Feature/CV commit: `36acab8191fdbe1c3a2043ce6b4c7a60f26f0d18`.

The owner's subsequently saved 44 skill preferences were preserved in a separate local commit: `e332b7fdbcf655f893c2ea29b0de05ba0da111e5`.

The native checks and production build passed again with that saved data. A read-only browser check against the real owner file confirmed 40 visible profile skills, 39 rated visible skills and matching list/map labels. See `reviews/owner-skill-settings-readback.json`.

The write to GitHub was rejected before execution by the automatic approval review: “GitHub publish action requires an exact request in the current prompt.” The current-prompt rule comes from the personal routing AGENTS file. No alternative write or retry was attempted. Remote main was read back at `3f85a90`; the new commits remain local.

Once the current prompt explicitly authorizes publication, use the prepared read-only deployment checker after the one allowed write:
`tools/verify-skill-settings-deployment.py <published SHA>`.

## Boundaries

Company product/sidecar changes were preserved. The personal blog is outside the company-bound claim helper's registered origin; no binding was changed and no company lease was fabricated. The five reviewers were read-only, with at most two concurrent.

Real GitHub owner OAuth writes remain dependent on App configuration; GitHub storage checks used mock HTTP. Local owner editing and persistence are implemented and tested. No hardware/HIL, physical printer, actual Google Docs import, PDF/UA or ATS certification is claimed.
