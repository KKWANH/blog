# Google Docs 제작용 CV 디자인 명세

2026-10-27 검토. 웹 명함의 종이 질감과 브랜드 아이콘은 웹에서 활용하고, CV는 아래의 글자 위계와 정렬로 구성합니다. 공통 색은 짙은 초록이며, 실제 Docs 문서는 사용자가 제작합니다.

새 CV 파일을 대신 만들지 않고, 사용자가 Google Docs에서 재현할 수 있게 정한 설계안입니다. 목표는 일반 C++ 시스템 개발 지원용 한 페이지입니다. 실제 Docs에서 조판한 결과를 검증한 명세는 아니며, 내용이 넘치면 작은 글자로 압축하지 않습니다.

## 구성 원칙

시선은 **이름 → C++ 직무 → 최근 경력 → 기술 → 프로젝트/수상 → 기술 학력** 순서로 흐르게 합니다. 회사명은 찾기 쉽게, 설명은 읽기 쉽게, 날짜는 비교하기 쉽게 구분합니다.

한 단을 유지합니다. 사진, 별도 로고, 기술 점수 막대, 사이드바, 텍스트 상자, 장식 타임라인은 쓰지 않습니다. 디자인은 정보의 선택, 정렬, 간격과 글자 위계로 만듭니다.

## 1. 문서 설정

`파일 → 페이지 설정 → 페이지`에서 다음을 지정합니다.

- A4 세로, 흰색.
- 좌우 여백 **18mm**, 상하 여백 **16mm**.
- 본문 폭 **174mm**.
- `보기 → 인쇄 레이아웃 표시`, `눈금자 표시`를 켭니다.
- 왼쪽 정렬을 사용합니다. 양쪽 맞춤은 단어 사이 간격을 불규칙하게 만들므로 피합니다.

페이지 안의 섹션 순서는 `Experience`, `Technical skills`, `Selected project & award`, `Selected education & training`입니다. 요약문은 별도 단락으로 반복하지 않습니다.

## 2. 글꼴과 색

우선 **Source Sans 3**를 사용합니다. Google Fonts에 있는 글꼴이며, Docs 글꼴 메뉴의 `글꼴 더보기`에서 실제 제공 여부를 확인합니다. 없으면 문서 전체를 **Roboto**로 통일합니다. 여러 대체 글꼴을 섞지 않습니다.

| 요소 | 크기 | 굵기 | 색 |
| --- | --- | --- | --- |
| 이름 | 28pt | Semibold 600, 없으면 Bold | `#202B26` |
| 직무 | 12pt | Regular | `#1F5B45` |
| 섹션 제목 | 11pt | Semibold, 없으면 Bold | `#1F5B45` |
| 회사/직함 행 | 12pt | 회사만 Semibold/Bold, 직함은 Regular | `#202B26` |
| 본문/불릿 | 11pt | Regular | `#202B26` |
| 연락처/날짜/보조정보 | 10.5pt | Regular | `#56605B` |
| 링크 | 10.5pt | Regular, 밑줄 | `#1F5B45` |

Docs가 숫자 굵기를 제공하지 않으면 Regular/Bold만 사용합니다. `B` 버튼은 600을 보장하지 않습니다. 섹션 제목은 전부 대문자로 벌려 쓰기보다 위 표의 제목 표기를 그대로 사용합니다.

### 현재 웹 디자인과 맞추는 방법

기본안은 위 표의 Source Sans 3 한 가족으로 유지합니다. 이름 28pt, 본문 11pt, 날짜 10.5pt가 문서의 기준입니다. 섹션 제목과 링크에만 `#1F5B45`를 쓰고, 본문은 `#202B26`으로 읽기 쉽게 구분합니다.

명함의 세리프 이름을 CV에도 연결하고 싶으면 **이름 한 줄만 Georgia Regular 25pt**로 바꿀 수 있습니다. 이 경우 직무는 12pt, 나머지는 Source Sans 3 그대로 둡니다. 이름에 그림자·음각·배경색은 넣지 않습니다. 둘 중 한 머리말을 고른 뒤 문서 전체에서 같은 방식을 유지합니다.

웹의 회사 로고와 기술 아이콘은 탐색 버튼으로 쓰입니다. CV에서는 회사명과 기술명을 실제 텍스트로 남깁니다. 회사명 굵기, 오른쪽 날짜 탭, 머리말 아래 0.5pt 선이 같은 정보 위계를 만듭니다. 색이 없어도 구분되는지 인쇄 미리보기에서 확인합니다.

## 3. 머리말 배치

왼쪽 여백에 같은 기준선을 맞춥니다.

```text
Kwanho Kim
C++ Software Engineer
Leuven, Belgium · contact@kwanho.dev · kwanho.dev
linkedin.com/in/kwanhokim
```

이름은 28pt로 독립된 행을 줍니다. 직무는 바로 다음 행, 연락처는 그 아래 두 행입니다. 이메일·웹사이트·LinkedIn은 `삽입 → 링크`로 실제 주소를 연결합니다. 주소 자체가 보여야 인쇄하거나 복사해도 쓸 수 있습니다.

GitHub는 기본 머리말에서 제외해도 됩니다. 웹사이트에서 선별된 작업으로 연결할 수 있습니다. 제공되지 않은 전화번호, 이주 약속, 취업허가 상태는 추가하지 않습니다.

마지막 연락처 단락 아래에만 가는 선을 둘 수 있습니다. `서식 → 단락 스타일 → 테두리 및 음영`에서 아래 테두리만 켜고 **0.5pt, `#B7C8BE`, 패딩 6pt**로 지정합니다. 모든 섹션에 선을 반복하지 않습니다.

## 4. 단락 간격

`서식 → 줄 및 단락 간격 → 맞춤 간격`에서 설정합니다.

| 단락 | 줄 간격 | 앞 | 뒤 |
| --- | --- | --- | --- |
| 이름 | 1.0 | 0pt | 1pt |
| 직무 | 1.0 | 0pt | 5pt |
| 연락처 | 1.0 | 0pt | 0pt |
| 섹션 제목 | 1.0 | 11pt | 4pt |
| 회사/직함 행 | 1.0 | 7pt | 1pt |
| 회사의 팀/위치 | 1.0 | 0pt | 3pt |
| 불릿 | 1.15 | 0pt | 2pt |
| 기술 행 | 1.15 | 0pt | 2pt |
| 학력 이름 행 | 1.0 | 5pt | 1pt |

목표 본문 리듬은 대략 **11pt 글자 / 14.5pt 기준선 간격**입니다. Docs의 줄 간격은 배수이고 글꼴 메트릭에 영향을 받으므로 `1.15 = 정확히 14.5pt`라고 보장할 수 없습니다. 줄 간격 칸에 `14.5`를 넣으면 안 됩니다.

빈 문단을 여러 개 넣어 간격을 만들지 않습니다. 간격을 단락 설정으로 유지해야 내용 수정에도 문서가 버팁니다.

## 5. 날짜와 불릿

회사/직함 단락을 선택하고 눈금자에 **오른쪽 탭 정지점**을 추가합니다. 왼쪽 본문 기준선으로부터 **174mm**, 즉 오른쪽 본문 경계에 둡니다. 오른쪽 들여쓰기 삼각형을 움직이는 것과 다릅니다.

회사/직함을 입력한 뒤 Tab을 한 번 누르고 날짜를 입력합니다. 날짜 부분만 10.5pt, `#56605B`로 바꿉니다. 공백 여러 개로 밀어 맞추지 않습니다.

불릿은 Docs의 실제 목록 기능으로 만듭니다. `서식 → 정렬 및 들여쓰기 → 들여쓰기 옵션`에서:

- 왼쪽 들여쓰기 **0.35cm**.
- 특수 들여쓰기 **내어쓰기 0.35cm**.
- 오른쪽 들여쓰기 **0cm**.

불릿 기호는 왼쪽 기준선에, 글은 3.5mm 안쪽에 놓입니다. 두 번째 행은 첫 단어의 시작점에 맞춥니다.

## 6. 경력 블록

아래 `[TAB]`은 실제 탭 하나입니다. 줄바꿈은 내용 구조를 보여 주는 예시이며, 문장 안에서 임의로 Enter를 넣지 않습니다.

```text
KLA — C++ Engineer[TAB]Aug 2026–Present
ICOS Division · Zeta team · Leuven, Belgium

• Analyse lifter fault recovery across application and controller
  software; contribute design changes and early implementation
  with team review.
• Work on camera white-balance settings, device readback and
  displayed values.
• Refactor serial device-control integration and logging within
  a shared equipment layer.
```

현재 단계와 팀 검토를 나타내는 첫 불릿의 조건은 남깁니다. `led`, `owned`, `delivered`, `released`로 바꾸지 않습니다.

```text
Pickit 3D — Research & Software Engineer[TAB]Aug 2025–Mar 2026
Leuven, Belgium

• Contributed to communication-interface design and integration;
  designed a Python WebSocket client with reconnect, backoff
  and message validation.
• Traced a field communication failure to a port conflict and
  implemented the fix.
```

Pickit은 시스템 설계·통합의 구체적인 경계를 통신 인터페이스와 오류 처리로 보여 줍니다. 전체 아키텍처를 맡았다는 주장으로 키우지 않습니다. 로그 다운로드와 설정 화면은 이 판본의 주된 불릿에서 뺍니다.

Bosch는 공식 인턴 직함, 2024년 6–11월, Hildesheim을 유지합니다. V2X demonstrator, message interfaces, end-to-end test runs를 하나의 불릿으로 묶습니다. 일반 C++ 지원용에서는 React 화면 설명을 생략할 수 있습니다.

## 7. 기술과 프로젝트

기술은 세 행을 기준으로 합니다. 분류명만 Bold입니다.

```text
Programming: C++, C, Python
Systems & tools: Error recovery, device communication,
WebSocket, REST; Git, Docker, Linux
Languages: Korean (native); English (IELTS Academic 7.5, Mar 2025)
```

여기에 실제로 설명할 수 없는 C++ 버전, 동시성 전문성, 성능 수치나 도구를 추가하지 않습니다.

프로젝트는 **Color Saves Life** 하나를 남깁니다. 날짜는 February 2024, 수상은 **1st place in the digital.auto & mobility challenge at BCX 2024**로 씁니다. Python client와 eye-tracking/simulation integration을 한 불릿으로 보여 줍니다. 별도 Awards 섹션에서 같은 사실을 되풀이하지 않습니다.

**Ariadne는 완전히 제외합니다.** 그 프로젝트에서 쓰인 RAG/Fastify/SQLite 등을 본인의 구현 전문성으로 옮기지 않습니다.

## 8. 선별된 학력/교육

```text
Bachelor’s degree, Mechatronics (in progress)[TAB]Feb 2026–Present
Korea National Open University, Prime College

Bachelor’s degree, Artificial Intelligence[TAB]Mar 2023–Feb 2025
Korea National Open University · Awarded

Bachelor’s degree, Computer Engineering[TAB]Apr 2019–Aug 2020
Academic Credit Bank System · Awarded

SEA:ME — Automotive & Mobility program, completed[TAB]Jul 2023–Jun 2024
42 — Software engineering program, completed
```

학위 행은 11pt, 기관/날짜는 10.5pt입니다. 42의 완료 날짜나 B.Sc./B.Eng. 등가 명칭을 만들어 넣지 않습니다.

이 지원용 판본에서는 Business Administration, 자격증, Rush03와 lane-keeping 프로젝트를 생략하는 구성을 권합니다. 해당 사실은 상세 프로필에 남깁니다. 경영학 학위를 반드시 보여 주려면 컴퓨터공학과 같은 기관 아래 묶고, 다른 항목을 줄여 공간을 확보합니다.

## 9. 스타일과 페이지 제어

본문 한 단락을 먼저 완성하고 `서식 → 단락 스타일 → 일반 텍스트 → 일치하도록 업데이트`합니다. 이름은 Title, 직무는 Subtitle, 섹션은 Heading 1, 회사는 Heading 2로 같은 방법을 적용합니다. 날짜 서식은 그 다음에 지정합니다.

섹션 제목, 회사 행과 팀/위치 행은 `다음과 함께 유지`를 켭니다. 개별 불릿에는 `단락 줄 함께 유지`를 사용합니다. 모든 문단을 서로 묶으면 큰 공백과 예기치 않은 페이지 이동이 생깁니다.

## 10. 넘칠 때의 수정 순서

1. 반복되는 표현과 선택 항목부터 줄입니다.
2. 필요하면 언어 행이나 덜 관련된 교육 정보를 상세 프로필로 옮깁니다.
3. 섹션 앞 간격을 11→8pt, 회사 앞 간격을 7→5pt로 줄입니다.
4. 그 다음에만 본문 10.5pt를 검토합니다. 더 작게 줄이지 않습니다.

KLA의 진행 단계나 수상의 트랙 범위를 지워 공간을 만들지 않습니다. 한 페이지에 맞지 않으면 두 페이지를 정돈하는 편이 낫습니다.

완성 후 인쇄 레이아웃, 링크와 복사한 텍스트의 순서를 직접 확인합니다. 실제 Google Docs 조판, PDF 내보내기와 ATS 동작을 테스트했다고 주장하지 않습니다.
