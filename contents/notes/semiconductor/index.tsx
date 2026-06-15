import {
  NoteRoot,
  Section,
  PartTag,
  Kicker,
  H2,
  H3,
  Lead,
  P,
  Card,
  Grid2,
  Box,
  Note,
  Callout,
  Deep,
  Analogy,
  Quiz,
  Flow,
  NTable,
  ProcessGrid,
  Ladder,
  Figure,
  Atom,
  MosfetCurrent,
  PnJunction,
  Glossary,
  Hl,
  HlG,
  HlA,
  HlV,
  B,
  Em,
  Kbd,
} from '@/components/notes'

export const title = '반도체 완전정복'
export const subtitle =
  '모래에서 인공지능까지 — 원자 한 개부터 트랜지스터, CPU, 그리고 그것을 만드는 공정과 검사까지. 물리·전자공학 0에서 출발해 그림과 비유로 쌓아 올리는 18장.'
export const description =
  '반도체 완전정복 — 전기·원자, 에너지 밴드, 도핑, PN접합, 트랜지스터(MOSFET), CMOS, 메모리, 미세화, 8대 공정, 검사·계측, 패키징, 산업 생태계, 그리고 소자·메모리·설계·전력 심화까지. 비전공자를 위한 시각적 강의.'
export const excerpt =
  '"전기가 흐른다 = 전자가 움직인다" 한 문장에서 출발해, 트랜지스터·CMOS·메모리·8대 공정·검사·패키징까지 — 모래가 생각하는 기계가 되는 전 과정을 그림으로.'
export const date = '2026-06-15'
export const readTime = '35 min'
export const lang = 'ko'
export const showToc = true
export const category = '노트'
export const toc = [
  { id: 'c1', label: '1. 전기와 원자', level: 2 },
  { id: 'c2', label: '2. 에너지 밴드', level: 2 },
  { id: 'c3', label: '3. 실리콘 결정', level: 2 },
  { id: 'c4', label: '4. 도핑·캐리어', level: 2 },
  { id: 'c5', label: '5. PN 접합·다이오드', level: 2 },
  { id: 'c6', label: '6. 트랜지스터(MOSFET)', level: 2 },
  { id: 'c7', label: '7. CMOS·논리 게이트', level: 2 },
  { id: 'c8', label: '8. 컴퓨터·메모리', level: 2 },
  { id: 'c9', label: '9. 미세화·무어의 법칙', level: 2 },
  { id: 'c10', label: '10. 8대 공정', level: 2 },
  { id: 'c11', label: '11. 검사·계측', level: 2 },
  { id: 'c12', label: '12. 후공정·패키징', level: 2 },
  { id: 'c13', label: '13. 산업 생태계', level: 2 },
  { id: 'c14', label: '14. 트랜지스터 심화', level: 2 },
  { id: 'c15', label: '15. 메모리 심화', level: 2 },
  { id: 'c16', label: '16. 칩 설계·EDA', level: 2 },
  { id: 'c17', label: '17. 전력·병렬화', level: 2 },
  { id: 'c18', label: '18. 용어 사전', level: 2 },
]

export default function SemiconductorPage() {
  return (
    <NoteRoot accent="var(--brand-cyan)">
      {/* ── 1 ── */}
      <Section id="c1">
        <PartTag>PART 1 · 물질과 전기의 기초</PartTag>
        <Kicker num="1">전기란 무엇인가</Kicker>
        <H2>모든 것은 원자, 그리고 전자에서 시작한다</H2>
        <Lead>
          반도체를 이해하려면 딱 하나만 먼저 잡으면 된다. <B>"전기가 흐른다 = 전자가 움직인다."</B> 이 한 문장이 강의
          전체의 뿌리다.
        </Lead>

        <H3>⚛️ 원자의 구조</H3>
        <P>
          세상 모든 물질은 <B>원자(atom)</B>로 되어 있다. 원자는 가운데 <HlA>원자핵</HlA>(양성자+중성자, +전하)이 있고,
          그 주위를 <Hl>전자(electron)</Hl>(−전하)가 돈다. 마치 태양(핵) 주위를 도는 행성(전자) 같다.
        </P>
        <P>
          전자는 아무 데나 도는 게 아니라 정해진 <B>껍질(궤도)</B>에 층층이 들어간다. 그중 가장 바깥 껍질의 전자를{' '}
          <B>최외각 전자(valence electron)</B>라 부른다. 화학 반응도, 전기가 통하느냐도 거의 전부 이 최외각 전자가
          결정한다. 반도체의 주인공 실리콘은 최외각 전자가 <B>4개</B>다. 이 "4"를 기억해두자.
        </P>

        <Atom />
        <P>
          왜 "가장 바깥 껍질"만 중요할까? 핵에 가까운 안쪽 전자는 +전하의 핵이 강하게 끌어당겨 거의 못 움직인다. 반면 바깥
          껍질 전자는 핵에서 멀어 인력이 약하고, 그래서 작은 자극(열·빛·전압)만 받아도 풀려날 수 있다. 즉 <B>전기적 성질은
          사실상 최외각 전자들의 사정</B>이다. 각 껍질이 담을 수 있는 전자 수도 정해져 있어(첫 껍질 2개, 다음 8개…), 실리콘은
          전자 14개 중 안쪽 10개가 차고 <B>바깥에 4개</B>가 남는다 — 이 "4"가 3장의 공유결합으로 이어진다.
        </P>

        <H3>💡 "전기가 흐른다"의 진짜 의미</H3>
        <P>
          금속선에 전압을 걸면 전구에 불이 들어온다. 이때 일어나는 일은, 금속 안의 <B>자유전자</B>들이 한 방향으로 우르르
          떠밀려 이동하는 것이다. 이 전자의 흐름이 곧 <B>전류</B>다. 그래서 어떤 물질이 전기를 통하느냐는 결국{' '}
          <Em>"움직일 수 있는 자유전자가 얼마나 있느냐"</Em>로 갈린다. 금속은 자유전자가 넘쳐서 잘 통하고, 고무는 전자가
          꽉 묶여 있어 안 통한다.
        </P>
        <Analogy emoji="🅿️">
          <B>주차장 비유.</B> 전자를 "차", 움직일 공간을 "빈 자리"라 하자. 차가 움직이려면 옆에 빈 자리가 있어야 한다. 꽉
          찬 주차장(전자가 자리를 다 채운 상태)에서는 아무도 못 움직인다. 이 "빈 자리" 개념이 다음 장(에너지 밴드)의
          핵심이 된다.
        </Analogy>
        <Quiz q="전기가 통하느냐를 결정하는 것은?">
          최외각(바깥 껍질) 전자가 얼마나 자유롭게 움직일 수 있느냐. 자유전자가 많으면 도체, 거의 없으면 부도체. 반도체는
          그 중간이며, <B>"조건에 따라 조절 가능"</B>한 것이 특징이다.
        </Quiz>
      </Section>

      {/* ── 2 ── */}
      <Section id="c2">
        <Kicker num="2">에너지 밴드 이론</Kicker>
        <H2>도체·부도체·반도체를 가르는 단 하나의 그림</H2>
        <Lead>
          왜 어떤 물질은 전기가 통하고 어떤 건 안 통할까? 이걸 깔끔하게 설명하는 게 <B>에너지 밴드(energy band)</B>
          이론이다. 비전공자와 한 걸음 더 들어간 사람을 가르는 분기점이니 천천히 보자.
        </Lead>

        <H3>🪜 전자는 "허락된 층"에만 있을 수 있다</H3>
        <P>
          전자가 가질 수 있는 에너지에는 <B>허락된 구간(밴드)</B>과 <B>금지된 구간</B>이 있다. 수많은 원자가 모여 고체가
          되면, 전자들이 채워 넣는 두 개의 중요한 밴드가 생긴다.
        </P>
        <Grid2>
          <Box title="🟦 가전자대 (Valence Band)">
            전자가 원자에 묶여 얌전히 앉아 있는 층. 여기 있는 전자는 움직이지 못해 전기에 기여 못 한다.
          </Box>
          <Box title="🟩 전도대 (Conduction Band)">
            전자가 자유롭게 돌아다닐 수 있는 "윗층". 여기로 올라온 전자라야 전류를 만든다.
          </Box>
        </Grid2>
        <P>
          이 두 층 사이의 빈 간격을 <HlV>밴드갭(band gap)</HlV>이라 한다. 전자가 아랫층(가전자대)에서 윗층(전도대)으로{' '}
          <Em>점프</Em>하려면 이 밴드갭만큼의 에너지를 받아야 한다. <B>밴드갭의 크기가 물질의 운명을 결정한다.</B>
        </P>

        <Figure caption="아래(파랑)=가전자대, 위(초록)=전도대. 둘 사이 간격(밴드갭)이 모든 것을 가른다.">
          <svg viewBox="0 0 700 270" role="img" aria-label="도체 반도체 부도체의 밴드갭 비교">
            <text x="120" y="25" fill="var(--foreground)" fontSize="15" fontWeight="bold" textAnchor="middle">
              도체
            </text>
            <rect x="50" y="160" width="140" height="55" fill="#3b82f6" opacity="0.5" />
            <rect x="50" y="120" width="140" height="45" fill="var(--brand-emerald)" opacity="0.5" />
            <text x="120" y="240" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              밴드갭 없음(겹침)
            </text>
            <text x="120" y="257" fill="var(--brand-emerald)" fontSize="12" textAnchor="middle">
              → 항상 잘 통함
            </text>

            <text x="350" y="25" fill="var(--brand-cyan)" fontSize="15" fontWeight="bold" textAnchor="middle">
              반도체
            </text>
            <rect x="280" y="175" width="140" height="40" fill="#3b82f6" opacity="0.5" />
            <rect x="280" y="95" width="140" height="40" fill="var(--brand-emerald)" opacity="0.5" />
            <line x1="285" y1="155" x2="415" y2="155" stroke="var(--brand-violet)" strokeWidth="2" strokeDasharray="4 4" />
            <text x="350" y="160" fill="var(--brand-violet)" fontSize="11" textAnchor="middle">
              작은 밴드갭
            </text>
            <text x="350" y="240" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              에너지 주면 점프
            </text>
            <text x="350" y="257" fill="var(--brand-cyan)" fontSize="12" textAnchor="middle">
              → 조건 따라 통함
            </text>

            <text x="580" y="25" fill="var(--foreground)" fontSize="15" fontWeight="bold" textAnchor="middle">
              부도체
            </text>
            <rect x="510" y="185" width="140" height="30" fill="#3b82f6" opacity="0.5" />
            <rect x="510" y="55" width="140" height="30" fill="var(--brand-emerald)" opacity="0.5" />
            <line x1="515" y1="135" x2="645" y2="135" stroke="#f87171" strokeWidth="2" strokeDasharray="4 4" />
            <text x="580" y="140" fill="#f87171" fontSize="11" textAnchor="middle">
              큰 밴드갭
            </text>
            <text x="580" y="240" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              점프 거의 불가
            </text>
            <text x="580" y="257" fill="#f87171" fontSize="12" textAnchor="middle">
              → 안 통함
            </text>
          </svg>
        </Figure>

        <NTable
          head={['분류', '밴드갭', '전자 점프', '예시']}
          rows={[
            [<B>도체</B>, '없음/겹침', '전자가 늘 자유', '구리, 금, 알루미늄'],
            [<B>반도체</B>, '작음 (실리콘 約 1.1 eV)', '열·빛·전압을 주면 점프', '실리콘, 게르마늄'],
            [<B>부도체</B>, '큼 (約 5 eV 이상)', '거의 불가능', '고무, 유리, 다이아몬드'],
          ]}
        />
        <Deep>
          <B>왜 "반쯤" 통하는 게 쓸모 있나?</B> 도체는 항상 켜져 있어 스위치로 못 쓰고, 부도체는 항상 꺼져 있어 못 쓴다.
          반도체는 <Em>평소엔 안 통하다가 전압을 주면 통하게</Em> 만들 수 있다. 즉 "켜고 끄는 스위치"를 만들 수 있다.
          디지털 세상의 0과 1이 여기서 태어난다. 단위 <Kbd>eV</Kbd>(전자볼트)는 전자 하나가 갖는 아주 작은 에너지의
          단위라고만 알아두면 충분하다.
        </Deep>
        <Quiz q="실리콘이 스위치 재료로 좋은 이유는?">
          밴드갭이 "적당히 작아서" 평소엔 안 통하지만 전압·빛·열을 주면 전자가 전도대로 점프해 통하게 만들 수 있기 때문.
          이 ON/OFF 제어가 트랜지스터의 핵심이다.
        </Quiz>
      </Section>

      {/* ── 3 ── */}
      <Section id="c3">
        <Kicker num="3">실리콘과 결정 구조</Kicker>
        <H2>왜 하필 실리콘인가</H2>
        <Lead>
          반도체 재료 후보는 여럿이지만, 산업의 99%는 <B>실리콘(Si)</B>이다. 이유와, 순수 실리콘이 왜 그 자체로는
          "심심한" 물질인지 보자.
        </Lead>

        <H3>🏖️ 흔하고, 싸고, 안정적이다</H3>
        <P>
          실리콘은 모래·암석의 주성분으로 지각에서 산소 다음으로 흔하다(약 28%). 게다가 표면에 산화막(SiO₂)이 자연스럽게
          잘 생기는데, 이 산화막이 훌륭한 <B>절연체</B>라 회로를 나누는 벽으로 쓰기 좋다. 흔하고 싸고 다루기 좋은
          "삼박자"가 맞아 표준이 되었다.
        </P>

        <H3>🔗 공유결합과 진성 반도체</H3>
        <P>
          실리콘은 최외각 전자가 4개(2장에서 기억해 둔 그 숫자). 옆 실리콘 원자들과 전자를 하나씩 나눠 가지는{' '}
          <B>공유결합</B>으로, 8개를 채운 듯 안정된 격자(결정)를 만든다. 이렇게 불순물 없는 순수 실리콘을{' '}
          <B>진성 반도체(intrinsic)</B>라 한다.
        </P>
        <P>
          문제는, 이 상태에서는 전자가 전부 결합에 묶여 있어 <Em>전기가 거의 안 통한다</Em>는 것. 마치 모두가 손을 꽉
          잡고 있어 아무도 움직일 수 없는 상태다. 그래서 순수 실리콘은 그 자체로는 쓸모가 적다. <B>여기에 "장난"을 쳐야</B>{' '}
          비로소 쓸모가 생긴다. 그 장난이 다음 장의 도핑이다.
        </P>

        <Figure caption="진성(순수) 실리콘 격자. 안정적이지만 전기는 거의 안 통한다.">
          <svg viewBox="0 0 700 200" role="img" aria-label="실리콘 공유결합 격자">
            {[60, 150].map((cy) =>
              [200, 350, 500].map((cx) => (
                <g key={`${cx}-${cy}`}>
                  <circle cx={cx} cy={cy} r="22" fill="var(--card)" stroke="var(--brand-cyan)" strokeWidth="2" />
                  <text x={cx} y={cy + 5} fill="var(--foreground)" fontSize="13" textAnchor="middle">
                    Si
                  </text>
                </g>
              )),
            )}
            <g stroke="var(--brand-emerald)" strokeWidth="2">
              <line x1="222" y1="56" x2="328" y2="56" />
              <line x1="222" y1="64" x2="328" y2="64" />
              <line x1="372" y1="56" x2="478" y2="56" />
              <line x1="372" y1="64" x2="478" y2="64" />
              <line x1="222" y1="146" x2="328" y2="146" />
              <line x1="222" y1="154" x2="328" y2="154" />
              <line x1="372" y1="146" x2="478" y2="146" />
              <line x1="372" y1="154" x2="478" y2="154" />
              <line x1="196" y1="82" x2="196" y2="128" />
              <line x1="204" y1="82" x2="204" y2="128" />
              <line x1="346" y1="82" x2="346" y2="128" />
              <line x1="354" y1="82" x2="354" y2="128" />
              <line x1="496" y1="82" x2="496" y2="128" />
              <line x1="504" y1="82" x2="504" y2="128" />
            </g>
            <text x="350" y="192" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              초록 선 = 공유한 전자쌍. 전자가 전부 묶여 있어 움직일 게 없다.
            </text>
          </svg>
        </Figure>
        <Note label="1부 요약: ">
          전기 = 전자의 이동(1장) → 통하느냐는 밴드갭이 결정(2장) → 실리콘은 밴드갭이 적당하지만 순수 상태론 전자가 다 묶여
          안 통함(3장). 이제 이걸 "통하게 조절"하는 기술로 넘어간다.
        </Note>
      </Section>

      {/* ── 4 ── */}
      <Section id="c4">
        <PartTag>PART 2 · 소자의 물리</PartTag>
        <Kicker num="4">도핑과 캐리어</Kicker>
        <H2>불순물을 일부러 섞어 성질을 만든다</H2>
        <Lead>
          반도체 기술의 진짜 시작점. 순수 실리콘에 <B>다른 원소를 미량 섞는 것</B>을 <Em>도핑(doping)</Em>이라 한다.
          백만 개 중 한 개꼴의 극소량인데, 이걸로 전기 성질이 완전히 바뀐다.
        </Lead>

        <H3>➕ N형 반도체: 전자가 남는다</H3>
        <P>
          실리콘(최외각 4개)에 최외각 전자가 <B>5개</B>인 원소(인 P, 비소 As)를 섞으면, 공유결합에 4개만 쓰고{' '}
          <HlG>전자 1개가 남는다</HlG>. 이 남는 전자는 자유롭게 돌아다닐 수 있어 전기를 나른다. 음(Negative)전하인 전자가
          캐리어라서 <B>N형</B>이라 한다.
        </P>
        <H3>➖ P형 반도체: 자리가 빈다 (정공)</H3>
        <P>
          반대로 최외각 전자가 <B>3개</B>인 원소(붕소 B)를 섞으면 결합에 전자가 하나 모자라 "빈 자리"가 생긴다. 이 빈
          자리를 <HlV>정공(hole)</HlV>이라 부른다. 옆 전자가 빈 자리로 옮겨가면, 빈 자리가 반대 방향으로 이동하는 것처럼
          보인다. 즉 정공은 <Em>양(Positive)전하를 띤 입자처럼</Em> 움직인다. 그래서 <B>P형</B>.
        </P>

        <Figure caption="도핑으로 '전자가 남는 N형'과 '자리가 비는 P형'을 만든다. 둘 다 전기를 나르지만 부호가 반대.">
          <svg viewBox="0 0 700 210" role="img" aria-label="N형과 P형 반도체">
            <text x="175" y="28" fill="var(--brand-emerald)" fontSize="16" fontWeight="bold" textAnchor="middle">
              N형 (전자 남음)
            </text>
            <circle cx="175" cy="110" r="34" fill="var(--card)" stroke="var(--brand-emerald)" strokeWidth="2" />
            <text x="175" y="108" fill="var(--foreground)" fontSize="15" textAnchor="middle">
              P
            </text>
            <text x="175" y="126" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">
              (인, 5개)
            </text>
            <circle className="nt-svg-pulse" cx="175" cy="58" r="10" fill="var(--brand-emerald)" />
            <text x="175" y="180" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              남는 전자(−)가 자유롭게 이동
            </text>
            <text x="175" y="197" fill="var(--brand-emerald)" fontSize="12" textAnchor="middle">
              캐리어 = 전자
            </text>

            <text x="525" y="28" fill="var(--brand-violet)" fontSize="16" fontWeight="bold" textAnchor="middle">
              P형 (자리 빔)
            </text>
            <circle cx="525" cy="110" r="34" fill="var(--card)" stroke="var(--brand-violet)" strokeWidth="2" />
            <text x="525" y="108" fill="var(--foreground)" fontSize="15" textAnchor="middle">
              B
            </text>
            <text x="525" y="126" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">
              (붕소, 3개)
            </text>
            <circle
              className="nt-svg-pulse"
              cx="525"
              cy="58"
              r="10"
              fill="none"
              stroke="var(--brand-violet)"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <text x="525" y="180" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              빈 자리(정공, +)가 이동
            </text>
            <text x="525" y="197" fill="var(--brand-violet)" fontSize="12" textAnchor="middle">
              캐리어 = 정공
            </text>
          </svg>
        </Figure>
        <Analogy emoji="🎭">
          <B>극장 좌석 비유.</B> 정공(hole)은 "빈 좌석"이다. 사람들이 빈 좌석으로 한 칸씩 옮겨 앉으면, 사람은 왼쪽으로
          가지만 <Em>빈 좌석은 오른쪽으로 이동</Em>한다. 전자가 움직이는 것을, 빈 자리가 반대로 움직이는 것으로 보는 게
          정공 개념이다.
        </Analogy>
        <Callout label="왜 중요한가? ">
          N형과 P형, 이 두 재료를 <B>어떻게 붙이고 배치하느냐</B>가 다이오드, 트랜지스터, 결국 모든 칩의 설계다. 레고 블록
          두 종류가 생긴 셈이다. 다음 장에서 이 둘을 붙여본다.
        </Callout>
        <Quiz q="N형과 P형의 캐리어(전기 나르는 주체)는 각각?">
          N형 = 남는 <B>전자</B>(−), P형 = 빈 자리인 <B>정공</B>(+). 도핑 양은 백만분의 일 수준의 극소량이지만 효과는
          극적이다.
        </Quiz>
      </Section>

      {/* ── 5 ── */}
      <Section id="c5">
        <Kicker num="5">PN 접합과 다이오드</Kicker>
        <H2>전기를 한 방향으로만 흐르게</H2>
        <Lead>
          N형과 P형을 딱 붙이면 마법 같은 일이 벌어진다. <B>전기가 한 쪽으로만 흐르는</B> 부품, 즉 <Em>다이오드</Em>가
          된다. 모든 반도체 소자의 가장 기본 단위다.
        </Lead>

        <H3>🚧 경계에 생기는 "공핍층"</H3>
        <P>
          P형(정공 많음)과 N형(전자 많음)을 붙이면, 경계에서 전자와 정공이 만나 서로 메워진다(재결합). 그 결과 경계
          부근에는 캐리어가 사라진 <HlV>공핍층(depletion region)</HlV>이라는 일종의 "장벽"이 생긴다. 이 장벽이 함부로
          전류가 흐르지 못하게 막는다.
        </P>
        <H3>🔋 방향이 전부다</H3>
        <Grid2>
          <Box title="순방향 (P에 +, N에 −)">
            장벽이 얇아지고 캐리어가 밀려들어 <HlG>전류가 흐른다.</HlG>
          </Box>
          <Box title="역방향 (P에 −, N에 +)">
            장벽이 더 두꺼워져 캐리어가 멀어지고{' '}
            <span style={{ color: '#f87171', fontWeight: 600 }}>전류가 막힌다.</span>
          </Box>
        </Grid2>

        <PnJunction />
        <P>
          왜 한 방향으로만 흐를까? <B>순방향</B>(P에 +, N에 −)으로 걸면 양쪽 캐리어가 경계로 떠밀려 공핍층이 얇아지고 전류가
          흐른다(위 그림). 반대로 <B>역방향</B>(P에 −, N에 +)으로 걸면 캐리어가 경계에서 멀어져 공핍층이 더 두꺼워지고
          전류가 막힌다. 즉 다이오드는 전압 방향으로 장벽 두께를 조절하는 <Em>전기 밸브</Em>다. 단, 역방향 전압을 너무
          높이면 어느 순간 장벽이 무너져 갑자기 통하는 <B>항복(breakdown)</B>이 일어난다 — 이걸 거꾸로 이용한 게 전압을
          일정하게 잡아주는 제너 다이오드다.
        </P>
        <Deep>
          <B>다이오드의 쓰임.</B> 한 방향만 통과시키는 성질로 교류를 직류로 바꾸는 정류, 역전류 방지 등에 쓴다.{' '}
          <Hl>LED</Hl>도 다이오드의 일종이다(전류가 흐를 때 빛을 냄, Light Emitting Diode). 그리고 PN 접합을{' '}
          <Em>두 번 겹치면</Em> 다음 장의 트랜지스터가 된다.
        </Deep>
        <Quiz q="공핍층이 하는 일은?">
          PN 경계에서 캐리어가 사라져 생긴 장벽. 평소엔 전류를 막고, 순방향 전압을 걸면 얇아져 전류를 통과시킨다. 이
          "전압으로 장벽을 조절"하는 아이디어가 트랜지스터로 발전한다.
        </Quiz>
      </Section>

      {/* ── 6 ── */}
      <Section id="c6">
        <Kicker num="6">트랜지스터 (MOSFET)</Kicker>
        <H2>전기로 켜고 끄는 스위치, 칩의 심장</H2>
        <Lead>
          드디어 주인공. 현대 칩의 99%는 <B>MOSFET</B>이라는 트랜지스터로 되어 있다. 이름은 무섭지만 하는 일은 단순하다.{' '}
          <Em>"게이트에 전압을 주면 켜지는 스위치."</Em>
        </Lead>

        <H3>🔧 MOSFET의 4개 부품</H3>
        <P>
          MOSFET(Metal-Oxide-Semiconductor Field-Effect Transistor)은 이름 그대로 금속-산화막-반도체 구조다. 핵심 부위는
          네 개다.
        </P>
        <NTable
          head={['부위', '역할 (수도 비유)']}
          rows={[
            [<B>소스 (Source)</B>, '전자가 들어오는 입구. 물이 들어오는 수도관.'],
            [<B>드레인 (Drain)</B>, '전자가 나가는 출구. 물이 나가는 수도관.'],
            [
              <B>게이트 (Gate)</B>,
              <>
                그 사이 통로를 여닫는 <Hl>수도꼭지 손잡이</Hl>. 여기에 전압을 준다.
              </>,
            ],
            [<B>채널 (Channel)</B>, '소스↔드레인 사이, 전류가 지나가는 길. 게이트가 이 길을 열고 닫는다.'],
          ]}
        />
        <H3>⚡ 어떻게 켜지나 (Field Effect)</H3>
        <P>
          게이트와 채널 사이에는 아주 얇은 <B>산화막(절연체)</B>이 끼어 있다. 게이트에 +전압을 주면, 절연막 너머 반도체
          표면으로 전자들이 끌려와 모인다. 이 모인 전자들이 소스와 드레인을 잇는 <Em>다리(채널)</Em>를 만들어 전류가
          흐른다. 전압을 떼면 다리가 사라져 전류가 끊긴다. 전압의 "전기장(Field)"으로 통로를 제어한다고 해서{' '}
          <B>전계효과(Field Effect)</B>다.
        </P>

        <MosfetCurrent />
        <P>
          한 가지 짚어둘 것 — 게이트는 통로에 <B>직접 닿지 않는다</B>. 게이트와 채널 사이의 얇은 산화막이 둘을 갈라놓고 있어
          게이트로는 전류가 (거의) 흐르지 않는다. 게이트는 오직 <Em>전기장</Em>으로 멀리서 채널을 "당겨" 만들 뿐이다. 이게
          MOSFET이 전력을 거의 안 먹는 이유이고, 동시에 산화막을 극도로 얇게(요즘은 원자 몇 층 두께) 만들어야 하는 이유다 —
          너무 얇으면 전자가 막을 뚫고 새는 <B>터널링 누설</B>이 생긴다(14장).
        </P>
        <Analogy emoji="🚰">
          <B>수도꼭지 그 자체.</B> 소스=입수관, 드레인=배수관, 게이트=손잡이, 채널=물길. 손잡이(게이트 전압)를 돌리면
          물(전류)이 흐르거나 멈춘다. 트랜지스터는 결국 <Em>전기로 돌리는 수도꼭지</Em>다.
        </Analogy>
        <Deep title="한 걸음 더 · BJT와 N/P채널">
          트랜지스터엔 옛날부터 쓰던 <B>BJT</B>(바이폴라)도 있지만, 디지털 칩은 전력을 적게 먹는 MOSFET이 표준이다.
          MOSFET도 채널 종류에 따라 <HlG>NMOS</HlG>(전자로 동작, +전압에 켜짐)와 <HlV>PMOS</HlV>(정공으로 동작, −전압에
          켜짐)로 나뉜다. 이 둘을 짝지은 게 다음 장의 CMOS다.
        </Deep>
        <Quiz q="게이트는 전류 통로에 직접 닿아 있을까?">
          아니다. 게이트와 채널 사이엔 얇은 <B>산화막(절연체)</B>이 있어 직접 닿지 않는다. 게이트는 "전기장"으로만 통로를
          제어한다(전계효과). 그래서 전력 소모가 적다.
        </Quiz>
      </Section>

      {/* ── 7 ── */}
      <Section id="c7">
        <Kicker num="7">CMOS와 논리 게이트</Kicker>
        <H2>스위치 두 개로 "생각"을 시작하다</H2>
        <Lead>
          트랜지스터 하나는 스위치일 뿐이다. 이걸 영리하게 짝지으면 <B>논리(logic)</B>가 생긴다. 현대 칩의 표준 방식이{' '}
          <Em>CMOS</Em>다.
        </Lead>

        <H3>🤝 CMOS: NMOS + PMOS 콤비</H3>
        <P>
          <B>CMOS</B>(Complementary MOS)는 NMOS와 PMOS를 <Em>상보적으로</Em>(한쪽이 켜지면 한쪽은 꺼지게) 짝지은 구조다.
          이 방식의 결정적 장점은 <HlG>전환되는 순간 외엔 전류가 거의 안 흐른다</HlG>는 것. 즉 전력을 거의 안 먹는다.
          손톱만 한 칩에 수백억 개를 넣고도 녹지 않는 비결이 바로 이것이다.
        </P>
        <H3>🔢 0과 1, 그리고 논리 게이트</H3>
        <P>
          전압이 높으면 <Kbd>1</Kbd>, 낮으면 <Kbd>0</Kbd>. 트랜지스터를 조합해 입력 0/1에 대해 정해진 0/1을 내놓는{' '}
          <B>논리 게이트</B>를 만든다. 이게 모든 계산의 알파벳이다.
        </P>
        <NTable
          head={['게이트', '의미', '예 (입력→출력)']}
          rows={[
            [<B>NOT</B>, '반대로 뒤집기', '1 → 0'],
            [<B>AND</B>, '둘 다 1이어야 1', '1,1 → 1 / 1,0 → 0'],
            [<B>OR</B>, '하나만 1이어도 1', '1,0 → 1 / 0,0 → 0'],
            [<B>NAND</B>, 'AND의 반대 (만능 게이트)', '1,1 → 0 / 그 외 → 1'],
          ]}
        />
        <P>
          놀랍게도 <B>NAND 게이트 하나만으로</B> 다른 모든 게이트를 만들 수 있다. 그래서 NAND는 디지털 회로의 "만능
          벽돌"로 불린다.
        </P>
        <Analogy emoji="🧱">
          <B>레고의 계층.</B> 트랜지스터(스위치) → 논리 게이트(AND/OR/NOT) → 덧셈기·기억소자 → CPU·메모리. 아래 단순한
          부품을 쌓아 위로 갈수록 복잡한 기능이 창발한다. "생각하는 기계"는 결국 <Em>0과 1을 다루는 스위치의 거대한 탑</Em>
          이다.
        </Analogy>
        <Note label="2부 요약: ">
          도핑으로 N형·P형을 만들고(4장) → 붙이면 다이오드(5장) → 게이트로 제어하는 MOSFET 스위치(6장) → NMOS·PMOS를 짝지어
          저전력 CMOS 논리(7장). 이제 이 논리로 진짜 컴퓨터를 짓는다.
        </Note>
      </Section>

      {/* ── 8 ── */}
      <Section id="c8">
        <PartTag>PART 3 · 칩에서 시스템으로</PartTag>
        <Kicker num="8">논리에서 컴퓨터·메모리로</Kicker>
        <H2>게이트가 모여 CPU와 기억장치가 된다</H2>
        <Lead>
          논리 게이트만으로 어떻게 계산하고 기억까지 할까? 칩이 크게 <B>연산(로직)</B>과 <B>기억(메모리)</B> 두 갈래로
          나뉘는 이유를 보자.
        </Lead>

        <H3>➕ 계산: 게이트 → 가산기 → CPU</H3>
        <P>
          AND·OR·NOT 몇 개를 조합하면 <B>1비트 덧셈기</B>가 된다. 이걸 여러 개 이으면 큰 수 덧셈, 곱셈, 비교가 가능해진다.
          여기에 "명령을 순서대로 실행하는 제어 회로"를 붙이면 <B>CPU/GPU</B>가 된다. 결국 컴퓨터의 모든 연산은{' '}
          <Em>0과 1의 논리 연산</Em>으로 환원된다.
        </P>
        <H3>💾 기억: 두 종류의 메모리</H3>
        <P>
          로직만으론 결과를 저장 못 한다. 그래서 <B>메모리</B>가 따로 있다. 크게 두 종류이며, 한국 반도체 산업(삼성·SK
          하이닉스)의 주력이 바로 이 분야다.
        </P>
        <NTable
          head={['종류', '특징', '구조', '쓰임']}
          rows={[
            [
              <B>DRAM (램)</B>,
              <>
                빠름. 전원 끄면 <span style={{ color: '#f87171', fontWeight: 600 }}>사라짐</span>(휘발성)
              </>,
              '트랜지스터 1 + 축전기 1',
              '작업용 단기기억 (책상 위)',
            ],
            [
              <B>NAND 플래시</B>,
              <>
                느림. 전원 꺼도 <HlG>유지</HlG>(비휘발성)
              </>,
              '전하를 가두는 특수 트랜지스터',
              '장기 저장 SSD/USB (책장)',
            ],
          ]}
        />
        <Analogy emoji="🗂️">
          <B>책상 vs 책장.</B> DRAM은 지금 펼쳐 작업 중인 <Em>책상 위</Em>(빠르지만 정리하면 사라짐), NAND는{' '}
          <Em>책장</Em>(느리지만 오래 보관). CPU는 책상과 책장을 오가며 일하는 사람이다.
        </Analogy>
        <Flow
          steps={[
            { icon: '🔘', title: '트랜지스터', desc: '스위치 1개' },
            { icon: '🔣', title: '논리 게이트', desc: 'AND/OR/NOT' },
            { icon: '➕', title: '가산기·레지스터', desc: '계산·임시기억' },
            { icon: '🧠', title: 'CPU / GPU', desc: '두뇌' },
            { icon: '🖥️', title: '컴퓨터', desc: '완성' },
          ]}
        />
        <Deep title="한 걸음 더 · 로직 vs 메모리">
          <B>시스템 반도체(로직)</B>는 CPU, GPU, AP(스마트폰 두뇌) 등 "연산·제어"를 한다. 설계 난이도가 높고 종류가
          다양하다(파운드리·팹리스 영역). <B>메모리</B>는 같은 구조를 빽빽이 반복해 대량 생산하며, 미세화·집적도 경쟁이
          핵심이다. AI 시대엔 GPU와 <Hl>HBM</Hl>(고대역폭 메모리, 12장)이 함께 폭발적으로 성장 중이다.
        </Deep>
      </Section>

      {/* ── 9 ── */}
      <Section id="c9">
        <Kicker num="9">미세화와 무어의 법칙</Kicker>
        <H2>작게, 더 작게: 원자에 다가서는 싸움</H2>
        <Lead>
          반도체 산업의 60년 역사는 한마디로 <B>"트랜지스터를 더 작게 만드는 경쟁"</B>이었다. 왜, 그리고 어떻게 작게
          만드는지, 그리고 그 한계를 본다.
        </Lead>

        <H3>📉 왜 작게 만드나</H3>
        <P>
          트랜지스터가 작아지면 세 가지가 좋아진다. ① 같은 면적에 <B>더 많이</B> 넣어 성능↑ ② 전자 이동거리가 짧아{' '}
          <B>더 빠르고</B> ③ <B>전력</B>을 덜 먹는다. 이 선순환이 스마트폰을 슈퍼컴퓨터로 만들었다.
        </P>
        <H3>📏 "nm 공정"이라는 단위</H3>
        <P>
          회로 선폭을 <B>나노미터(nm)</B>로 표기한다. 1nm = 10억분의 1m. "3nm 공정"은 그만큼 미세하다는 뜻이다(다만 요즘
          노드 숫자는 정확한 물리 치수라기보다 세대를 나타내는 마케팅 명칭에 가깝다). 얼마나 작은지 감을 잡아보자.
        </P>
        <Ladder
          rows={[
            { label: '머리카락', pct: 100, value: '약 80,000 nm' },
            { label: '적혈구', pct: 55, value: '약 7,000 nm' },
            { label: '바이러스', pct: 14, value: '약 100 nm' },
            { label: '최신 칩', pct: 5, value: '3~2 nm 공정', accent: 'var(--brand-emerald)' },
            { label: '원자', pct: 2, value: '약 0.2 nm (한계 근접)', accent: 'var(--brand-amber)' },
          ]}
        />
        <H3>🏗️ 구조 진화: 평면 → FinFET → GAA</H3>
        <P>
          너무 작아지자 평평한(planar) 트랜지스터는 게이트가 채널을 제대로 못 잡아 전류가 새기 시작했다. 그래서 구조 자체를
          바꿔왔다.
        </P>
        <NTable
          head={['세대', '구조', '핵심']}
          rows={[
            [<B>Planar</B>, '평면형', '게이트가 채널 위 한 면만 덮음 (옛 방식)'],
            [
              <B>FinFET</B>,
              '지느러미형',
              <>
                채널을 세워 게이트가 <B>3면</B>을 감쌈. 약 22nm부터 도입
              </>,
            ],
            [
              <B>GAA (나노시트)</B>,
              '전면 포위형',
              <>
                게이트가 채널을 <B>4면 전부</B> 감쌈. 3nm 이하 최신 세대
              </>,
            ],
          ]}
        />
        <P>
          핵심 흐름: <Em>게이트가 채널을 더 많이 감쌀수록 전류 누설을 잘 막는다.</Em> 한 면 → 세 면 → 네 면으로 진화한 것
          (왜 그래야 하는지는 14장에서 더 깊이 본다).
        </P>
        <Callout label="무어의 법칙과 그 한계. ">
          인텔 창업자 고든 무어가 1965년 "트랜지스터 수가 약 2년마다 2배"라고 예측했고 수십 년간 맞았다. 하지만 이제 원자
          크기에 부딪혀 단순 미세화가 어려워졌다. 그래서 업계는 <B>① 3D로 쌓기(적층) ② 칩을 나눠 붙이기(칩렛) ③
          검사·수율 정밀화</B>로 방향을 틀고 있다. 검사의 중요성이 커지는 정확한 이유다.
        </Callout>
      </Section>

      {/* ── 10 ── */}
      <Section id="c10">
        <Kicker num="10">어떻게 만드나 · 8대 공정</Kicker>
        <H2>모래 원판에 1,000번 그리고 깎고 쌓기</H2>
        <Lead>
          설계가 끝난 칩을 실제로 만드는 과정. <B>웨이퍼</B> 위에 회로를 그리고, 깎고, 쌓기를 수백~수천 번 반복한다. 크게
          8단계로 나눠 본다.
        </Lead>
        <ProcessGrid
          steps={[
            {
              n: 1,
              t: '웨이퍼 제조',
              en: 'Wafer Fabrication',
              d: '고순도 실리콘을 녹여 큰 원기둥(잉곳)으로 키운 뒤, 얇게 잘라 거울처럼 연마한 둥근 원판을 만든다. 지름 300mm가 표준. 모든 칩의 "도화지".',
            },
            {
              n: 2,
              t: '산화',
              en: 'Oxidation',
              d: '웨이퍼를 고온에서 산소에 노출해 표면에 얇고 단단한 산화막(SiO₂)을 입힌다. 이 막이 회로를 보호하고 절연하는 바탕이 된다.',
            },
            {
              n: 3,
              t: '포토 (노광)',
              en: 'Photolithography',
              d: '감광액을 바르고, 회로 설계도(마스크)를 통해 빛을 쪼여 패턴을 새긴다. 사진 인화와 같은 원리. 가장 핵심·고가 단계이며 ASML 장비가 지배.',
            },
            {
              n: 4,
              t: '식각',
              en: 'Etching',
              d: '빛으로 그린 패턴을 따라 필요 없는 부분을 화학물질·플라스마로 깎아낸다. 조각가가 불필요한 돌을 깎듯이.',
            },
            {
              n: 5,
              t: '증착·이온주입',
              en: 'Deposition / Implant',
              d: '새 박막을 원자 단위로 쌓고, 이온(불순물)을 박아 넣어 도핑(N형·P형)을 만든다. 4장의 도핑이 실제로 일어나는 단계.',
            },
            {
              n: 6,
              t: '금속 배선',
              en: 'Metallization',
              d: '완성된 수십억 개 트랜지스터를 구리 전선으로 층층이 연결한다. 수십 층의 "입체 도로망"을 까는 작업.',
            },
            {
              n: 7,
              t: '검사·계측 👁️',
              en: 'Inspection / Metrology',
              d: '위 단계들 사이사이 수시로 결함·먼지를 찾고(검사) 선폭·두께를 잰다(계측). 비전+소프트웨어 문제이며 11장의 주제.',
              highlight: true,
            },
            {
              n: 8,
              t: '패키징·테스트',
              en: 'Packaging / Test',
              d: '완성된 웨이퍼를 칩 단위로 자르고(다이싱), 보호·연결되게 포장한 뒤 최종 동작 검사. 후공정 2D/3D 비전 검사 영역(12장).',
              highlight: true,
            },
          ]}
        />
        <H3>💡 한 단계만 더 깊이: 노광(EUV)</H3>
        <P>
          포토 공정에서 더 미세한 패턴을 그리려면 <B>더 짧은 파장의 빛</B>이 필요하다. 최신 공정은 파장 13.5nm의{' '}
          <HlV>EUV(극자외선)</HlV>를 쓴다. 이 빛을 다루는 장비를 만드는 회사가 사실상 ASML 하나뿐이라, 네덜란드 ASML이
          반도체 패권의 핵심에 있다.
        </P>
        <Analogy emoji="🏭">
          <B>공장은 거대한 인쇄소.</B> 포토(빛으로 그리기)와 식각(깎기), 증착(쌓기)을 마치 다색 인쇄처럼 수백 번 겹친다. 단
          한 층이라도 어긋나면 전체가 불량. 그래서 매 층마다 7번(검사)이 끼어든다.
        </Analogy>
        <Callout label="핵심 비유 정리: ">
          그리기(포토) → 깎기(식각) → 쌓기(증착) → 연결(배선), 그리고 매 순간 <B>검사</B>. 이 사이클을 1,000번 반복하면
          칩이 된다. 전공정(웨이퍼에 회로 새기기)이 여기까지고, 8번부터가 후공정(자르고 포장)이다.
        </Callout>
      </Section>

      {/* ── 11 ── */}
      <Section id="c11">
        <Kicker num="11">검사·계측</Kicker>
        <H2>"제대로 만들어졌는가"를 보는 눈</H2>
        <Lead>
          칩을 만드는 게 아니라 <B>만든 것이 정상인지 판정</B>하는 분야다. 컴퓨터 비전과 가장 직접 맞닿는 영역이라 따로 한
          장을 할애한다.
        </Lead>

        <H3>🔍 검사 vs 계측, 정확히 다르다</H3>
        <Grid2>
          <Box title="검사 (Inspection)">
            "결함이 <B>있는가/없는가</B>"를 찾는다. 먼지, 긁힘, 패턴 깨짐, 이물질 등을 카메라·광학으로 잡아낸다. 본질적으로{' '}
            <Em>이상 탐지(anomaly detection)</Em> 비전 문제.
          </Box>
          <Box title="계측 (Metrology)">
            "치수가 <B>설계대로인가</B>"를 잰다. 선폭, 두께, 층 정렬(오버레이) 등을 정밀 측정. 정량 측정·정밀 정렬 문제.
          </Box>
        </Grid2>
        <H3>📊 왜 "공정 제어(Process Control)"인가</H3>
        <P>
          검사·계측의 진짜 목적은 단순히 불량을 골라내는 게 아니라, 그 데이터를 공정에 <B>피드백</B>해 불량 원인을 잡는
          것이다. "이 단계에서 자꾸 결함이 난다 → 장비를 조정하라." 그래서 이 분야를 <Hl>Process Control(공정 제어)</Hl>
          이라 부른다. 검사 데이터를 <Em>AI로 분석</Em>해 수율을 올리는 소프트웨어까지가 한 묶음이다.
        </P>
        <Flow
          steps={[
            { icon: '📷', title: '이미지 획득', desc: '광학/전자빔으로 웨이퍼 촬영' },
            { icon: '🧮', title: '결함 검출', desc: '정상 패턴과 비교, 이상 탐지' },
            { icon: '🏷️', title: '분류', desc: '결함 종류 자동 분류(딥러닝)' },
            { icon: '🔧', title: '공정 피드백', desc: '원인 찾아 장비 조정 → 수율↑' },
          ]}
        />
        <Note label="핵심: ">
          이 흐름 전체가 <B>컴퓨터 비전 + 3D 비전 + 소프트웨어 + 시스템 통합</B>이다. 광학·물리가 이미지를 "만든다"면, 그
          이미지를 신뢰 가능한 검출로 바꾸는 일은 소프트웨어의 몫이다. 반도체 물리는 이 강의 수준만 알아도 "대화가 통하고",
          실제 검사 시스템의 부가가치는 비전·SW에서 나온다.
        </Note>
        <Deep title="한 걸음 더 · 검사 기술 키워드">
          <B>광학 검사(optical)</B>는 빛으로 빠르게 넓은 면을 보고, <B>전자빔 검사(e-beam)</B>는 느리지만 더 미세한 결함까지
          본다. <B>오버레이(overlay)</B>는 여러 층이 정확히 겹쳐졌는지 보는 계측이다. 공통 과제는{' '}
          <HlA>속도(throughput) vs 정확도(sensitivity)</HlA>의 균형 — 빠르게 다 보려면 놓치고, 다 잡으려면 느려진다.
        </Deep>
      </Section>

      {/* ── 12 ── */}
      <Section id="c12">
        <PartTag>PART 4 · 산업과 마무리</PartTag>
        <Kicker num="12">후공정과 첨단 패키징</Kicker>
        <H2>이제는 "어떻게 붙이느냐"가 성능을 가른다</H2>
        <Lead>
          미세화가 한계에 다다르자, 새 돌파구로 떠오른 게 <B>패키징</B>이다. 칩을 더 작게 만드는 대신, <Em>여러 칩을
          똑똑하게 붙여</Em> 성능을 끌어올린다. AI 시대의 숨은 주역이다.
        </Lead>

        <H3>📦 패키징이란</H3>
        <P>
          완성된 칩(다이)을 외부 충격·습기에서 보호하고, 바깥 회로기판과 전기적으로 연결하는 과정이다. 옛날엔 그냥
          "포장"이었지만, 지금은 성능을 좌우하는 핵심 기술이 됐다. 이 분야를 <B>후공정(back-end)</B>이라 한다.
        </P>
        <H3>🧩 칩렛 (Chiplet)</H3>
        <P>
          거대한 칩 하나를 한 번에 완벽히 만들긴 점점 어렵다(불량 확률↑, 비용↑). 그래서 <B>기능별로 작은 칩(칩렛)을 따로
          만들어 레고처럼 붙이는</B> 방식이 떠올랐다. 좋은 부품만 골라 조립하니 수율도 좋고 유연하다. AMD, 인텔, 애플 등이
          적극 채택 중이다.
        </P>
        <H3>🏢 HBM (고대역폭 메모리)</H3>
        <P>
          AI는 막대한 데이터를 GPU에 빠르게 공급해야 한다. 그래서 메모리(DRAM)를 <B>수직으로 층층이 쌓고</B>(3D 적층) GPU
          바로 옆에 붙인 게 <Hl>HBM</Hl>이다. 데이터가 오가는 "고속도로 폭(대역폭)"이 압도적이라, 엔비디아 AI 가속기의
          필수 부품이 됐다. SK하이닉스·삼성이 이 시장을 주도한다.
        </P>

        <Figure caption="평면 나열에서 수직 적층으로. 칩을 쌓고 붙이는 기술이 곧 성능이 되는 시대.">
          <svg viewBox="0 0 700 200" role="img" aria-label="2D 평면 vs 3D 적층 패키징">
            <text x="170" y="28" fill="var(--muted-foreground)" fontSize="14" fontWeight="bold" textAnchor="middle">
              예전: 평면으로 나열
            </text>
            <rect x="80" y="90" width="60" height="40" rx="5" fill="var(--card)" stroke="var(--border)" />
            <rect x="150" y="90" width="60" height="40" rx="5" fill="var(--card)" stroke="var(--border)" />
            <rect x="220" y="90" width="60" height="40" rx="5" fill="var(--card)" stroke="var(--border)" />
            <text x="180" y="160" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              거리가 멀어 느림
            </text>

            <text x="530" y="28" fill="var(--brand-cyan)" fontSize="14" fontWeight="bold" textAnchor="middle">
              지금: 수직 적층 (HBM)
            </text>
            <rect x="490" y="60" width="80" height="22" rx="3" fill="var(--brand-cyan)" opacity="0.5" />
            <rect x="490" y="84" width="80" height="22" rx="3" fill="var(--brand-cyan)" opacity="0.5" />
            <rect x="490" y="108" width="80" height="22" rx="3" fill="var(--brand-cyan)" opacity="0.5" />
            <rect x="490" y="132" width="80" height="22" rx="3" fill="#3b82f6" opacity="0.6" />
            <text x="530" y="180" fill="var(--brand-emerald)" fontSize="12" textAnchor="middle">
              짧고 넓은 통로 → 초고속
            </text>
          </svg>
        </Figure>
        <Note label="왜 검사가 더 중요해지나: ">
          칩을 쌓고 붙일수록 <B>연결 지점(범프·본딩)</B>이 폭증하고, 하나만 어긋나도 비싼 묶음 전체가 불량이 된다. 그래서
          후공정 검사(2D/3D 비전)의 수요가 빠르게 커지고 있다.
        </Note>
      </Section>

      {/* ── 13 ── */}
      <Section id="c13">
        <Kicker num="13">산업 생태계</Kicker>
        <H2>누가 무엇을 하고, 누가 돈을 버는가</H2>
        <Lead>
          반도체는 한 회사가 다 못 한다. 극도로 분업화된 글로벌 사슬이다. 큰 그림을 잡아두면 뉴스도 이해된다.
        </Lead>
        <NTable
          head={['역할', '하는 일', '대표 기업']}
          rows={[
            [<B>팹리스 (설계)</B>, '공장 없이 칩을 설계만 함', '엔비디아, 퀄컴, 애플, AMD'],
            [<B>파운드리 (제조)</B>, '남의 설계를 위탁 생산', 'TSMC, 삼성, 인텔'],
            [<B>IDM (설계+제조)</B>, '설계부터 제조까지 직접', '인텔, 삼성, SK하이닉스'],
            [<B>메모리</B>, 'DRAM·NAND 대량 생산', '삼성, SK하이닉스, 마이크론'],
            [
              <B>장비</B>,
              '제조·검사 기계 제작',
              <>
                ASML(노광), AMAT·Lam(증착·식각), <Hl>KLA(검사)</Hl>
              </>,
            ],
            [<B>소재·EDA</B>, '웨이퍼·소재·화학·설계 SW', '신에쓰, 시높시스/케이던스'],
          ]}
        />
        <H3>⚖️ 장비 4강과 검사의 자리</H3>
        <P>
          제조 장비는 사실상 <B>ASML(노광) · Applied Materials(증착·식각) · Lam Research(식각) · KLA(검사·계측)</B> 4강이
          나눠 가진다. 그중 검사·계측은 거의 독점적이다(광학 웨이퍼 검사 점유율 85% 이상, 공정 제어 전체 56% 이상). 화려하진
          않지만 없으면 공장이 멈추는 위치다.{' '}
          <a
            href="/notes/kla"
            style={{ color: 'var(--brand-cyan)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            KLA 노트에서 자세히 →
          </a>
        </P>
        <Callout label="지정학과 사이클. ">
          반도체는 ① 경기 사이클(투자 늘면 호황, 줄면 불황)과 ② 지정학(미·중 갈등, 수출 규제)에 크게 흔들린다. 장비 회사는
          공장 증설에 민감하다. 다만 AI 수요가 당분간 구조적 성장을 떠받치고 있고, 검사는 미세화·적층이 어려워질수록 더
          필요해진다.
        </Callout>
      </Section>

      {/* ── 14 ── */}
      <Section id="c14">
        <PartTag>PART 5 · 핵심 심화</PartTag>
        <Kicker num="14">트랜지스터 심화</Kicker>
        <H2>스위치는 사실 "깔끔하게" 켜지지 않는다</H2>
        <Lead>
          6장에서 트랜지스터를 "켜고 끄는 스위치"라 했다. 맞다. 하지만 실제 동작엔 미묘한 디테일이 있고, <B>그 디테일이
          미세화가 왜 그렇게 어려운지</B>를 설명한다. 여기를 이해하면 FinFET·GAA가 왜 등장했는지 진짜로 알게 된다.
        </Lead>

        <H3>🎚️ 문턱전압 (Threshold Voltage, Vth)</H3>
        <P>
          게이트 전압을 조금씩 올린다고 채널이 바로 열리지 않는다. 어느 <B>문턱값(Vth)</B>을 넘어야 비로소 채널이 형성되고
          전류가 흐른다. 수도꼭지로 치면 "손잡이를 일정 각도 이상 돌려야 물이 나오기 시작"하는 것. 이 Vth가 트랜지스터
          설계의 핵심 숫자다.
        </P>
        <Card>
          <ul className="space-y-1.5 text-sm leading-7 text-muted-foreground">
            <li>
              · Vth가 <B>너무 높으면</B>: 켜는 데 큰 전압 필요 → 느리고 전력 낭비.
            </li>
            <li>
              · Vth가 <B>너무 낮으면</B>: 꺼야 할 때도 살짝 새어 흐름 → 누설(leakage).
            </li>
          </ul>
        </Card>
        <H3>📈 세 가지 동작 영역</H3>
        <NTable
          head={['영역', '조건', '상태']}
          rows={[
            [<B>차단 (Cut-off)</B>, '게이트 전압 < Vth', '채널 없음 → OFF (이상적으론 전류 0)'],
            [<B>선형 (Linear)</B>, 'Vth 막 넘김', '채널 열림, 드레인 전압에 비례해 전류 증가'],
            [<B>포화 (Saturation)</B>, '충분히 켜짐', '전류가 거의 일정. 디지털 스위치의 "확실한 ON"'],
          ]}
        />
        <P>
          디지털 회로는 차단(0)과 포화(1) 두 끝만 빠르게 오간다. 그 사이를 얼마나 빨리 건너뛰느냐가 칩 속도를 좌우한다.
        </P>
        <H3>💧 누설과 단채널 효과: 미세화의 진짜 적</H3>
        <P>
          트랜지스터를 작게 만들면 소스와 드레인이 너무 가까워진다. 그러면 게이트가 "끄라"고 명령해도 전자가 슬금슬금 새어
          흐른다. 이것이 <HlA>단채널 효과(short-channel effect)</HlA>와 <HlA>누설전류(leakage)</HlA>다. OFF인데도 전류가
          흐르니, 칩 전체로는 가만히 있어도 전기를 먹고 열이 난다.
        </P>

        <Figure caption="채널이 짧아질수록 게이트의 통제력이 약해진다. 그래서 게이트가 채널을 더 감싸는 구조(FinFET→GAA)가 필요해졌다.">
          <svg viewBox="0 0 700 180" role="img" aria-label="채널이 짧아지며 게이트 제어력 약화">
            <text x="170" y="26" fill="var(--brand-emerald)" fontSize="14" fontWeight="bold" textAnchor="middle">
              긴 채널 (옛날)
            </text>
            <rect x="70" y="80" width="200" height="40" fill="var(--card)" stroke="var(--border)" />
            <rect x="70" y="80" width="40" height="40" fill="var(--brand-emerald)" opacity="0.5" />
            <rect x="230" y="80" width="40" height="40" fill="var(--brand-emerald)" opacity="0.5" />
            <rect x="120" y="62" width="100" height="14" fill="var(--brand-cyan)" />
            <text x="170" y="140" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">
              게이트가 통로를 꽉 잡음
            </text>

            <text x="530" y="26" fill="#f87171" fontSize="14" fontWeight="bold" textAnchor="middle">
              짧은 채널 (미세화)
            </text>
            <rect x="450" y="80" width="160" height="40" fill="var(--card)" stroke="var(--border)" />
            <rect x="450" y="80" width="55" height="40" fill="var(--brand-emerald)" opacity="0.5" />
            <rect x="555" y="80" width="55" height="40" fill="var(--brand-emerald)" opacity="0.5" />
            <rect x="505" y="62" width="50" height="14" fill="var(--brand-cyan)" />
            <path
              className="nt-svg-dash"
              d="M505 105 Q530 118 555 105"
              stroke="#f87171"
              strokeWidth="2.5"
              fill="none"
            />
            <text x="530" y="142" fill="#f87171" fontSize="11" textAnchor="middle">
              소스↔드레인 너무 가까움 → 누설
            </text>
          </svg>
        </Figure>
        <Note label="9장과 연결: ">
          FinFET(3면)·GAA(4면)는 결국 <B>"누설을 막으려고 게이트가 채널을 더 많이 감싸는"</B> 진화다. 이제 그 구조 변화가 왜
          필연이었는지 보일 것이다.
        </Note>
        <Deep title="한 걸음 더 · 동적 전력 vs 정적 전력">
          칩이 쓰는 전력은 둘로 나뉜다. <B>동적 전력</B>(스위칭할 때 쓰는 것, 클럭·활동량에 비례)과 <B>정적 전력</B>(가만히
          있어도 누설로 새는 것). 미세화로 정적 전력(누설)이 커진 것이 "클럭을 더 못 올리는" 이유 중 하나다(17장).
        </Deep>
        <Quiz q="왜 트랜지스터를 무작정 작게 못 만드나?">
          너무 작아지면 소스-드레인이 가까워져 게이트가 OFF를 명령해도 전류가 새는 <B>누설·단채널 효과</B>가 심해진다. 이를
          막으려 게이트가 채널을 더 감싸는 FinFET·GAA로 구조를 바꿔왔다.
        </Quiz>
      </Section>

      {/* ── 15 ── */}
      <Section id="c15">
        <Kicker num="15">메모리 심화</Kicker>
        <H2>DRAM은 왜 "새고", NAND는 왜 "쌓는가"</H2>
        <Lead>
          8장에서 DRAM과 NAND를 책상·책장에 비유했다. 이제 셀 하나가 실제로 어떻게 0과 1을 저장하는지, 그리고 한국 반도체의
          주력 기술이 왜 여기에 집중되는지 들여다본다.
        </Lead>

        <H3>🪣 DRAM: 트랜지스터 1개 + 축전기 1개</H3>
        <P>
          DRAM 셀은 <B>1T1C</B>, 즉 트랜지스터 1개와 <B>축전기(capacitor, 전하를 담는 작은 양동이)</B> 1개로 된다. 축전기에
          전하가 차 있으면 <Kbd>1</Kbd>, 비어 있으면 <Kbd>0</Kbd>. 트랜지스터는 그 양동이를 여닫는 문 역할이다.
        </P>
        <P>
          문제는 이 양동이가 <HlA>조금씩 샌다</HlA>는 것. 그냥 두면 전하가 빠져 데이터가 사라진다. 그래서 DRAM은{' '}
          <B>수시로(보통 수십 ms마다) 다시 채워준다</B>. 이걸 <Em>리프레시(refresh)</Em>라 한다. "Dynamic"이라는 이름이
          여기서 왔다. 전원을 끄면 당연히 다 사라진다(휘발성).
        </P>
        <Analogy emoji="🕳️">
          <B>구멍 난 양동이.</B> DRAM 1비트는 바닥에 미세한 구멍이 난 양동이다. 물(전하)이 있으면 1. 새기 때문에 누군가 계속
          물을 다시 부어줘야(리프레시) 1을 유지한다. 그래서 빠르지만 전원이 필요하다.
        </Analogy>
        <H3>🔒 NAND 플래시: 전하를 "가둔다"</H3>
        <P>
          NAND는 특수한 트랜지스터를 쓴다. 게이트 안에 <B>전하를 가두는 층(플로팅 게이트 등)</B>이 있어서, 한 번 가둔
          전하는 전원을 꺼도 빠져나가지 못한다. 그래서 <HlG>비휘발성</HlG>(전원 없어도 유지)이다. 대신 쓰고 지우는 데 높은
          전압과 시간이 들어 DRAM보다 느리다.
        </P>
        <NTable
          head={['방식', '셀 하나에 저장하는 비트', '특징']}
          rows={[
            ['SLC', '1비트', '빠르고 오래감, 비쌈'],
            ['MLC / TLC / QLC', '2 / 3 / 4비트', '한 셀에 더 많이 저장 → 싸지만 느리고 수명↓'],
          ]}
        />
        <H3>🏗️ 3D 적층: 평면의 한계를 위로 뚫다</H3>
        <P>
          NAND도 더는 평면에서 좁히기 어려워지자, <B>셀을 수직으로 쌓기</B> 시작했다. 요즘은 200층이 넘는 <Em>3D NAND</Em>가
          나온다. 마치 단층 주택을 고층 아파트로 바꾼 것. 같은 바닥 면적에 훨씬 많은 저장 공간을 넣는다.
        </P>

        <Figure caption="저장 밀도를 높이려 NAND는 위로 쌓는 길을 택했다. 이 '적층' 사고가 HBM(12장)으로도 이어진다.">
          <svg viewBox="0 0 700 170" role="img" aria-label="평면 NAND vs 3D 적층 NAND">
            <text x="165" y="24" fill="var(--muted-foreground)" fontSize="13" fontWeight="bold" textAnchor="middle">
              평면 (옛날)
            </text>
            <g fill="#3b82f6" opacity="0.5">
              <rect x="90" y="90" width="30" height="22" />
              <rect x="130" y="90" width="30" height="22" />
              <rect x="170" y="90" width="30" height="22" />
              <rect x="210" y="90" width="30" height="22" />
            </g>
            <text x="165" y="135" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">
              한 층뿐
            </text>

            <text x="520" y="24" fill="var(--brand-cyan)" fontSize="13" fontWeight="bold" textAnchor="middle">
              3D 적층 (지금)
            </text>
            <g fill="var(--brand-cyan)" opacity="0.5">
              <rect x="445" y="40" width="150" height="14" />
              <rect x="445" y="58" width="150" height="14" />
              <rect x="445" y="76" width="150" height="14" />
              <rect x="445" y="94" width="150" height="14" />
              <rect x="445" y="112" width="150" height="14" />
            </g>
            <text x="520" y="148" fill="var(--brand-emerald)" fontSize="11" textAnchor="middle">
              수백 층을 위로 쌓음
            </text>
          </svg>
        </Figure>
        <Note label="한국 반도체와 검사: ">
          삼성·SK하이닉스가 세계를 주도하는 분야가 바로 이 메모리(DRAM·NAND·HBM)다. 층을 쌓고 미세화할수록 결함 가능성이
          커져, <B>검사·계측</B>의 수요도 함께 커진다. 특히 HBM처럼 쌓아 붙이는 구조는 후공정 검사가 결정적이다.
        </Note>
      </Section>

      {/* ── 16 ── */}
      <Section id="c16">
        <Kicker num="16">칩 설계와 EDA</Kicker>
        <H2>수백억 개 트랜지스터를 사람이 어떻게 그리나</H2>
        <Lead>
          트랜지스터가 수백억 개인데, 설마 하나하나 손으로 배치할까? 아니다. 거의 전부 <B>소프트웨어</B>가 한다. "반도체
          안의 소프트웨어" 이야기다.
        </Lead>

        <H3>💻 칩 설계는 코딩에서 시작한다</H3>
        <P>
          엔지니어는 트랜지스터를 그리는 게 아니라, <B>하드웨어 기술 언어(HDL: Verilog, VHDL)</B>로 회로의 "동작"을 코드처럼
          기술한다. 이 추상 단계를 <B>RTL</B>(Register-Transfer Level)이라 한다. "이 신호가 들어오면 이렇게 처리하라"를
          프로그래밍하듯 적는다.
        </P>
        <H3>⚙️ EDA: 코드를 실제 배치도로 바꾸는 자동화</H3>
        <P>
          그 코드를 실제 트랜지스터 배치와 배선으로 변환하는 거대한 소프트웨어가 <B>EDA</B>(Electronic Design Automation)다.
          시높시스·케이던스가 이 시장을 지배한다. 전체 흐름은 이렇다.
        </P>
        <Flow
          steps={[
            { icon: '📝', title: 'RTL 설계', desc: 'Verilog로 동작 기술' },
            { icon: '🔧', title: '합성', desc: '코드→논리게이트 변환' },
            { icon: '✅', title: '검증', desc: '시뮬레이션으로 오류 검사' },
            { icon: '🗺️', title: '배치·배선', desc: '칩 위 위치·전선 자동 결정' },
            { icon: '📤', title: '테이프아웃', desc: '최종 설계도→공장 전달' },
          ]}
        />
        <H3>🔬 검증(Verification)이 절반이다</H3>
        <P>
          칩은 한 번 만들면 고칠 수 없다(마스크·공정 비용이 수백억). 그래서 만들기 <Em>전에</Em> 소프트웨어로 철저히
          시뮬레이션해 버그를 잡는다. 실제로 칩 프로젝트 인력의 절반 이상이 <B>검증 엔지니어</B>인 경우가 많다. 이건
          본질적으로 <Hl>소프트웨어 테스트·디버깅</Hl> 문제다.
        </P>
        <Note label="반도체 안의 소프트웨어: ">
          이 장 전체가 소프트웨어다. 칩을 만드는 일조차 RTL 코딩, 검증 자동화, EDA 툴링, 디버깅, 시스템 통합으로 이루어진다.
          "반도체 = 하드웨어"라는 통념과 달리, 산업의 상당 부분이 사실은 거대한 소프트웨어 엔지니어링이다.
        </Note>
        <Deep title="한 걸음 더 · 추상화 계층">
          소프트웨어에 "고수준 언어→어셈블리→기계어" 계층이 있듯, 하드웨어에도 <B>동작(RTL) → 논리게이트 → 트랜지스터 →
          물리 배치(레이아웃)</B>의 추상화 계층이 있다. 사람은 위(RTL)에서 일하고, 아래로 내려가는 변환은 EDA가 자동화한다.
          컴퓨터과학의 컴파일러와 똑같은 발상이다.
        </Deep>
      </Section>

      {/* ── 17 ── */}
      <Section id="c17">
        <Kicker num="17">전력·발열·클럭, 그리고 병렬화</Kicker>
        <H2>왜 CPU는 더 안 빨라지고, GPU·AI로 갔나</H2>
        <Lead>
          2000년대 중반, 칩 발전의 방향이 크게 꺾였다. 이 장은 그 전환을 설명하고, 자연스럽게 <B>AI 시대</B>로 다리를 놓는다
          (
          <a
            href="/notes/ai"
            style={{ color: 'var(--brand-cyan)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            AI 완전정복
          </a>
          의 출발점이기도 하다).
        </Lead>

        <H3>🔥 클럭의 벽 (Power Wall)</H3>
        <P>
          예전엔 클럭 속도(GHz)를 올려 칩을 빠르게 했다. 그런데 클럭을 올릴수록 <B>동적 전력</B>이 급증하고(전력은 대략
          전압²·주파수에 비례), 14장에서 본 <B>누설(정적 전력)</B>까지 겹쳐 칩이 <Em>녹을 만큼</Em> 뜨거워졌다. 그래서 약
          3~4GHz 부근에서 클럭 경쟁이 사실상 멈췄다. 이것이 <HlA>파워 월(Power Wall)</HlA>이다.
        </P>
        <H3>🧩 해법: 빠르게 대신 "여러 개로"</H3>
        <P>
          하나를 더 빠르게 못 하니, <B>여러 개를 동시에</B> 돌리는 쪽으로 방향을 틀었다. 코어를 여럿 넣은{' '}
          <B>멀티코어 CPU</B>, 그리고 작고 단순한 코어를 <Em>수천 개</Em> 넣어 같은 연산을 한꺼번에 처리하는 <Hl>GPU</Hl>가
          부상했다.
        </P>
        <NTable
          head={['', 'CPU', 'GPU']}
          rows={[
            [<B>코어</B>, '강력한 코어 소수 (수~수십 개)', '단순한 코어 다수 (수천 개)'],
            [<B>잘하는 일</B>, '복잡하고 순차적인 작업', '똑같은 계산을 대량 병렬로'],
            [<B>비유</B>, '박사 몇 명', '산수 잘하는 학생 수천 명'],
          ]}
        />
        <H3>🤖 그래서 AI다</H3>
        <P>
          딥러닝의 핵심 연산은 거대한 <B>행렬 곱셈</B>인데, 이건 "같은 계산을 엄청나게 많이 동시에" 하는 일이다. GPU가 가장
          잘하는 바로 그것. 그래서 GPU가 AI 혁명의 엔진이 됐고, 엔비디아가 시대의 중심에 섰다. 여기에 데이터를 빠르게 공급할{' '}
          <Hl>HBM</Hl>(12장)이 짝을 이룬다.
        </P>
        <H3>🧱 메모리 월 (Memory Wall)</H3>
        <P>
          또 하나의 벽. 연산은 빨라졌는데 <B>메모리에서 데이터를 가져오는 속도</B>가 못 따라간다. 아무리 계산이 빨라도
          데이터가 늦게 오면 코어가 논다. 이것이 <HlA>메모리 월</HlA>이고, HBM·고대역폭 메모리·칩렛이 이걸 푸는 시도다.
        </P>
        <Note label="두 강의를 잇는 다리: ">
          반도체의 물리적 한계(파워 월·메모리 월)가 컴퓨팅을 <B>병렬화(GPU)</B>로 밀었고, 그 병렬 하드웨어가 마침 딥러닝의
          행렬 연산과 완벽히 맞아떨어지며 <B>AI 시대</B>가 열렸다. 즉 <Em>"반도체가 AI를 가능하게 했고, AI가 다시 반도체
          수요를 폭발시키는"</Em> 순환이다.
        </Note>
        <Quiz q='왜 칩이 "더 빠르게(클럭)" 대신 "여러 개(병렬)"로 갔나?'>
          클럭을 올리면 전력·발열이 감당 못 할 수준으로 커지는 <B>파워 월</B>에 부딪혔기 때문. 그래서 멀티코어·GPU로
          병렬화했고, 이 병렬 하드웨어가 딥러닝(대량 행렬곱)과 맞아떨어져 AI 시대를 열었다.
        </Quiz>
      </Section>

      {/* ── 18 ── */}
      <Section id="c18">
        <Kicker num="＊">핵심 용어 사전</Kicker>
        <H2>이것만 알면 대화가 끊기지 않는다</H2>
        <P>자주 나오는 용어를 한 번에 정리. 모르는 게 나오면 여기로 돌아오자.</P>
        <Glossary
          terms={[
            { w: '반도체', en: 'Semiconductor', m: '조건에 따라 전기가 통하기도/안 통하기도 하는 물질. 실리콘이 대표.' },
            { w: '밴드갭', en: 'Band gap', m: '전자가 "통하는 층"으로 점프하는 데 필요한 에너지 간격. 크기가 도체/반도체/부도체를 가름.' },
            { w: '도핑', en: 'Doping', m: '순수 실리콘에 미량의 불순물을 섞어 전기 성질을 만드는 것. N형·P형의 출발.' },
            { w: '정공', en: 'Hole', m: '전자가 빠진 "빈 자리". 양전하를 띤 입자처럼 이동한다. P형의 캐리어.' },
            { w: '트랜지스터', en: 'Transistor', m: '전기로 켜고 끄는 스위치. 칩의 최소 기능 부품. 현대는 MOSFET이 표준.' },
            { w: '게이트', en: 'Gate', m: '트랜지스터의 "수도꼭지 손잡이". 전압을 주면 전류 통로(채널)가 열린다.' },
            { w: 'CMOS', m: 'NMOS·PMOS를 짝지은 저전력 회로 방식. 현대 칩의 표준.' },
            { w: '웨이퍼', en: 'Wafer', m: '칩을 만드는 둥근 실리콘 원판(보통 300mm). 칩의 도화지.' },
            { w: '다이 / 칩', en: 'Die / Chip', m: '웨이퍼를 잘라낸 개별 칩 한 조각.' },
            { w: '수율', en: 'Yield', m: '만든 칩 중 정상 작동하는 비율. 반도체 수익의 핵심 지표.' },
            { w: '노광', en: 'Photolithography', m: '빛으로 회로 패턴을 새기는 핵심 공정. 최신은 EUV(파장 13.5nm), ASML이 지배.' },
            { w: '식각 / 증착', en: 'Etching / Deposition', m: '필요 없는 부분을 깎기 / 새 박막을 쌓기. 공정의 반복 단위.' },
            { w: '검사 / 계측', en: 'Inspection / Metrology', m: '결함이 있나 찾기 / 치수가 맞나 재기. 공정 제어의 핵심.' },
            { w: '노드', en: 'Node (예: 3nm)', m: '공정 세대를 나타내는 명칭. 숫자가 작을수록 미세하고 어렵다.' },
            { w: 'FinFET / GAA', m: '미세화에 맞춰 게이트가 채널을 더 많이 감싸도록 진화한 트랜지스터 구조.' },
            { w: '전공정 / 후공정', en: 'Front-end / Back-end', m: '웨이퍼에 회로 새기기 / 잘라서 패키징·검사.' },
            { w: '패키징 / 칩렛 / HBM', m: '칩을 보호·연결하는 후공정 / 작은 칩을 붙여 조립 / 메모리를 쌓아 AI에 고속 공급.' },
            { w: '팹리스 / 파운드리', m: '설계만 하는 회사(엔비디아) / 위탁 제조하는 회사(TSMC).' },
          ]}
        />
        <Note label="한 호흡에 외우는 전체 흐름: ">
          전기는 전자의 이동 → 실리콘은 밴드갭이 적당한 반도체 → 도핑으로 N형·P형 → 붙여서 트랜지스터(스위치) → CMOS 논리 →
          CPU·메모리 → 미세화 → 웨이퍼에 그리고·깎고·쌓는 8대 공정 → 매 단계 <B>검사·계측</B> → 잘라서 패키징. 그리고 그
          물리적 한계가 병렬화(GPU)를 거쳐 <B>AI 시대</B>로 이어진다.
        </Note>
      </Section>
    </NoteRoot>
  )
}
