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
  Grid3,
  Box,
  Note,
  Callout,
  Deep,
  Analogy,
  Quiz,
  Flow,
  NTable,
  Figure,
  Glossary,
  Hl,
  HlG,
  HlA,
  HlV,
  B,
  Em,
  Kbd,
} from '@/components/notes'

export const title = 'AI 완전정복'
export const subtitle =
  '데이터로 배운다는 한 가지 발상에서 출발해 신경망, 트랜스포머, LLM, 그리고 RAG·도구·에이전트·추론 모델까지. 수학도 코딩도 없이 그림과 비유로 쌓아 올리는 20장.'
export const description =
  'AI 완전정복 — 머신러닝의 기초 발상부터 뉴런·신경망·경사하강·역전파, CNN·어텐션·트랜스포머·LLM, 그리고 컨텍스트·RAG·도구/MCP·에이전트·하네스·추론 모델·MoE·멀티모달, AI와 반도체, 한계와 용어사전까지.'
export const excerpt =
  '"사람이 규칙을 짜는 대신 기계가 데이터에서 규칙을 찾게 한다." 이 한 발상에서 ChatGPT와 AI 에이전트까지, 개념의 흐름을 처음부터 끝까지.'
export const date = '2026-06-15'
export const readTime = '40 min'
export const lang = 'ko'
export const showToc = true
export const category = '노트'
export const toc = [
  { id: 'c1', label: '1. AI란 무엇인가', level: 2 },
  { id: 'c2', label: '2. 머신러닝의 핵심', level: 2 },
  { id: 'c3', label: '3. 학습의 세 종류', level: 2 },
  { id: 'c4', label: '4. 뉴런과 퍼셉트론', level: 2 },
  { id: 'c5', label: '5. 신경망의 구조', level: 2 },
  { id: 'c6', label: '6. 학습의 원리', level: 2 },
  { id: 'c7', label: '7. 과적합과 일반화', level: 2 },
  { id: 'c8', label: '8. CNN · 비전', level: 2 },
  { id: 'c9', label: '9. 순차 데이터·어텐션', level: 2 },
  { id: 'c10', label: '10. 트랜스포머', level: 2 },
  { id: 'c11', label: '11. LLM·생성형 AI', level: 2 },
  { id: 'c12', label: '12. 컨텍스트·프롬프트', level: 2 },
  { id: 'c13', label: '13. RAG', level: 2 },
  { id: 'c14', label: '14. 도구·MCP', level: 2 },
  { id: 'c15', label: '15. 에이전트·하네스', level: 2 },
  { id: 'c16', label: '16. 추론 모델', level: 2 },
  { id: 'c17', label: '17. 효율·멀티모달', level: 2 },
  { id: 'c18', label: '18. AI와 반도체', level: 2 },
  { id: 'c19', label: '19. 한계와 리스크', level: 2 },
  { id: 'c20', label: '20. 용어 사전', level: 2 },
]

export default function AIPage() {
  return (
    <NoteRoot accent="var(--brand-violet)">
      {/* 1 */}
      <Section id="c1">
        <PartTag>PART 1 · AI의 기초 발상</PartTag>
        <Kicker num="1">AI란 무엇인가</Kicker>
        <H2>"규칙을 짜는 것"에서 "스스로 배우는 것"으로</H2>
        <Lead>
          AI를 이해하는 출발점은 딱 하나의 전환이다. <B>사람이 규칙을 일일이 짜주는 대신, 기계가 예시(데이터)를 보고 규칙을
          스스로 찾게 한다.</B> 이 발상의 차이가 전부다.
        </Lead>

        <H3>🔀 두 가지 접근</H3>
        <Grid2>
          <Box title="📜 규칙 기반 (옛 방식)">
            사람이 "이러면 이렇게 하라"를 전부 코딩. 예: "이메일에 '당첨'이 있으면 스팸." 예외가 많아지면 규칙이 폭발해
            감당 불가.
          </Box>
          <Box title="🧠 학습 기반 (머신러닝)">
            스팸 메일 수만 통을 보여주고 "이게 스팸이다"라고 알려주면, 기계가 <B>공통 패턴을 스스로</B> 찾아낸다. 규칙을
            직접 안 짠다.
          </Box>
        </Grid2>

        <H3>🪆 AI ⊃ 머신러닝 ⊃ 딥러닝</H3>
        <P>
          세 단어가 자주 섞여 쓰이는데, 사실 <B>포함 관계</B>다.
        </P>
        <Figure caption="딥러닝은 머신러닝의 한 방법이고, 머신러닝은 AI의 한 갈래다. 요즘 화제의 대부분(ChatGPT 포함)은 가장 안쪽 딥러닝이다.">
          <svg viewBox="0 0 700 220" role="img" aria-label="AI 머신러닝 딥러닝 포함관계">
            <rect x="120" y="20" width="460" height="185" rx="14" fill="none" stroke="var(--brand-violet)" strokeWidth="2" />
            <text x="350" y="44" fill="var(--brand-violet)" fontSize="15" fontWeight="bold" textAnchor="middle">
              인공지능 (AI)
            </text>
            <text x="350" y="62" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">
              사람처럼 지적인 일을 하는 모든 기술
            </text>
            <rect x="180" y="74" width="340" height="120" rx="12" fill="none" stroke="var(--brand-cyan)" strokeWidth="2" />
            <text x="350" y="96" fill="var(--brand-cyan)" fontSize="14" fontWeight="bold" textAnchor="middle">
              머신러닝 (ML)
            </text>
            <text x="350" y="113" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">
              데이터로 패턴을 학습
            </text>
            <rect x="245" y="124" width="210" height="58" rx="10" fill="var(--brand-emerald)" opacity="0.18" stroke="var(--brand-emerald)" strokeWidth="2" />
            <text x="350" y="150" fill="var(--brand-emerald)" fontSize="14" fontWeight="bold" textAnchor="middle">
              딥러닝 (DL)
            </text>
            <text x="350" y="168" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">
              깊은 신경망으로 학습
            </text>
          </svg>
        </Figure>
        <Analogy emoji="🍳">
          <B>요리 비유.</B> 규칙 기반은 레시피를 글자 하나까지 받아 적는 것. 머신러닝은 완성된 요리 수천 접시를 맛보며 "이
          맛을 내려면 뭘 어떻게"를 스스로 감 잡는 것. 후자는 레시피에 없던 새 재료에도 대응할 수 있다.
        </Analogy>
        <Quiz q="머신러닝이 규칙 기반과 결정적으로 다른 점은?">
          사람이 규칙을 직접 코딩하지 않고, <B>데이터(예시)에서 기계가 규칙·패턴을 스스로 찾아낸다</B>는 것. 그래서 예외가
          많고 복잡한 문제(이미지·언어)에 강하다.
        </Quiz>
      </Section>

      {/* 2 */}
      <Section id="c2">
        <Kicker num="2">머신러닝의 핵심 아이디어</Kicker>
        <H2>학습이란 결국 "함수의 손잡이를 맞추는 것"</H2>
        <Lead>
          머신러닝의 본질은 의외로 단순하다. <B>입력을 출력으로 바꾸는 함수를 찾되, 그 함수를 데이터에 맞게 조금씩 조정하는
          것.</B> 수식 없이 감만 잡아도 충분하다.
        </Lead>

        <H3>📐 모델 = 조절 손잡이가 달린 함수</H3>
        <P>
          "집 크기 → 집값"을 예측한다고 하자. 가장 단순한 모델은 <Em>집값 = a × 크기 + b</Em>. 여기서 <B>a와 b가 "손잡이"</B>
          다. 이 손잡이를 잘 맞추면 예측이 정확해진다. 머신러닝에서 이 손잡이를 <HlV>파라미터(parameter, 가중치)</HlV>라
          부른다.
        </P>
        <P>
          실제 데이터를 보면서 예측이 실제와 가까워지도록 a와 b를 조금씩 돌린다. <B>이 "조금씩 돌리는 과정"이 곧 학습</B>
          이다. GPT 같은 모델은 이 손잡이가 수천억 개일 뿐, 원리는 똑같다.
        </P>
        <Figure caption="파란 점은 실제 데이터, 보라 선은 모델. 점들에 가장 잘 맞는 선이 되도록 손잡이(a, b)를 조정하는 게 학습이다.">
          <svg viewBox="0 0 700 220" role="img" aria-label="데이터에 직선을 맞추는 회귀">
            <line x1="70" y1="180" x2="630" y2="180" stroke="var(--border)" strokeWidth="1.5" />
            <line x1="70" y1="30" x2="70" y2="180" stroke="var(--border)" strokeWidth="1.5" />
            <text x="350" y="205" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
              집 크기 →
            </text>
            <text x="40" y="100" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle" transform="rotate(-90 40 100)">
              집값 →
            </text>
            <g fill="var(--brand-cyan)">
              <circle cx="140" cy="160" r="5" />
              <circle cx="210" cy="140" r="5" />
              <circle cx="270" cy="130" r="5" />
              <circle cx="330" cy="110" r="5" />
              <circle cx="400" cy="95" r="5" />
              <circle cx="470" cy="78" r="5" />
              <circle cx="540" cy="55" r="5" />
            </g>
            <line className="nt-svg-draw" style={{ ['--len' as string]: 500 }} x1="110" y1="168" x2="580" y2="50" stroke="var(--brand-violet)" strokeWidth="3" />
            <text x="600" y="48" fill="var(--brand-violet)" fontSize="12" textAnchor="middle">
              학습된 모델
            </text>
          </svg>
        </Figure>

        <H3>📏 "얼마나 틀렸나"를 재는 손실(Loss)</H3>
        <P>
          손잡이를 어느 쪽으로 돌릴지 알려면, 먼저 <B>지금 얼마나 틀렸는지</B>를 숫자로 재야 한다. 이 "틀린 정도"가{' '}
          <span style={{ color: '#f472b6', fontWeight: 600 }}>손실(loss)</span> 또는 오차다. 예측과 정답의 차이를 모아
          하나의 숫자로 만든 것. 학습의 목표는 단 하나, <Em>이 손실을 가장 작게 만드는 손잡이 값을 찾는 것</Em>이다.
        </P>
        <Note label="핵심 한 줄: ">
          머신러닝 = ① 손잡이 달린 함수(모델)를 두고 → ② 틀린 정도(손실)를 재서 → ③ 손실이 줄도록 손잡이를 조금씩 돌리기.
          6장에서 이 "돌리는 방법"(경사하강·역전파)을 자세히 본다.
        </Note>
      </Section>

      {/* 3 */}
      <Section id="c3">
        <Kicker num="3">학습의 세 가지 종류</Kicker>
        <H2>정답을 주느냐, 안 주느냐, 보상을 주느냐</H2>
        <Lead>
          머신러닝은 "무엇을 보고 배우느냐"에 따라 크게 셋으로 나뉜다. 뉴스에 나오는 거의 모든 AI는 이 셋 중 하나(또는
          조합)다.
        </Lead>
        <NTable
          head={['종류', '배우는 방식', '예시']}
          rows={[
            [
              <>
                <Hl>지도학습</Hl>
                <br />
                <small style={{ color: 'var(--muted-foreground)' }}>Supervised</small>
              </>,
              <>
                입력 + <B>정답</B>을 함께 줌. "이 사진은 고양이"
              </>,
              '이미지 분류, 스팸 필터, 가격 예측, 결함 검출',
            ],
            [
              <>
                <HlG>비지도학습</HlG>
                <br />
                <small style={{ color: 'var(--muted-foreground)' }}>Unsupervised</small>
              </>,
              <>
                정답 없이 <B>데이터만</B>. 스스로 묶고 구조 발견
              </>,
              '고객 군집화, 이상 탐지, 차원 축소',
            ],
            [
              <>
                <HlA>강화학습</HlA>
                <br />
                <small style={{ color: 'var(--muted-foreground)' }}>Reinforcement</small>
              </>,
              <>
                행동에 <B>보상/벌점</B>을 줌. 시행착오로 전략 학습
              </>,
              '알파고, 로봇 제어, 게임 AI',
            ],
          ]}
        />
        <Grid3>
          <Box title="🏷️ 지도">
            정답표를 보고 공부하는 학생. 가장 흔하고 강력. <Em>결함 검출도 여기</Em>("정상/불량" 라벨로 학습).
          </Box>
          <Box title="🧩 비지도">정답 없이 비슷한 것끼리 모으는 정리정돈. "이상한 것 찾기"에 강함.</Box>
          <Box title="🎮 강화">게임하며 점수로 배우는 방식. 잘하면 보상, 못하면 벌점.</Box>
        </Grid3>
        <Analogy emoji="🚲">
          <B>자전거로 비유.</B> 지도학습 = 교본과 정답을 보며 배움. 비지도학습 = 그냥 여러 자전거를 관찰해 종류를 나눔.
          강화학습 = 일단 타보고 넘어지면(벌점) 안 넘어지면(보상) 몸으로 익힘. ChatGPT는 지도학습 + 강화학습(사람 피드백)을
          함께 쓴다(11장).
        </Analogy>
        <Quiz q='"불량 검출" AI는 보통 어떤 학습일까?'>
          <B>지도학습</B>. "정상/불량"이 라벨링된 이미지 수천~수만 장을 보여주고 패턴을 학습시킨다. 라벨이 부족하면
          비지도(이상 탐지)를 섞기도 한다. 반도체 검사가 정확히 이 영역이다.
        </Quiz>
      </Section>

      {/* 4 */}
      <Section id="c4">
        <PartTag>PART 2 · 신경망의 원리</PartTag>
        <Kicker num="4">뉴런과 퍼셉트론</Kicker>
        <H2>뇌를 흉내 낸 가장 작은 계산 단위</H2>
        <Lead>
          딥러닝의 "신경망"은 뇌의 신경세포(뉴런)에서 영감을 받았다. 인공 뉴런 하나가 하는 일은 단순하다. <B>여러 입력을
          가중치로 섞어 더한 뒤, 일정 기준을 넘으면 신호를 내보낸다.</B>
        </Lead>
        <H3>🔢 인공 뉴런의 3단계</H3>
        <Card>
          <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
            <li>
              <B>① 입력 × 가중치</B>: 각 입력에 중요도(가중치)를 곱한다. 중요한 입력엔 큰 가중치.
            </li>
            <li>
              <B>② 모두 더하기 (+ 편향)</B>: 곱한 값들을 합산하고, 기준점을 조절하는 편향(bias)을 더한다.
            </li>
            <li>
              <B>③ 활성화 함수</B>: 그 합이 기준을 넘으면 "켜고(신호 전달)", 아니면 약하게 내보낸다.
            </li>
          </ul>
        </Card>
        <Figure caption="입력에 가중치를 곱해 더하고(Σ), 활성화 함수를 통과시켜 출력을 낸다. 이게 뉴런 하나의 전부다.">
          <svg viewBox="0 0 700 220" role="img" aria-label="인공 뉴런 구조">
            <circle cx="80" cy="60" r="20" fill="var(--card)" stroke="var(--brand-cyan)" />
            <text x="80" y="65" fill="var(--foreground)" fontSize="13" textAnchor="middle">x1</text>
            <circle cx="80" cy="120" r="20" fill="var(--card)" stroke="var(--brand-cyan)" />
            <text x="80" y="125" fill="var(--foreground)" fontSize="13" textAnchor="middle">x2</text>
            <circle cx="80" cy="180" r="20" fill="var(--card)" stroke="var(--brand-cyan)" />
            <text x="80" y="185" fill="var(--foreground)" fontSize="13" textAnchor="middle">x3</text>
            <line x1="100" y1="60" x2="320" y2="120" stroke="var(--brand-violet)" strokeWidth="2" />
            <line x1="100" y1="120" x2="320" y2="120" stroke="var(--brand-violet)" strokeWidth="2" />
            <line x1="100" y1="180" x2="320" y2="120" stroke="var(--brand-violet)" strokeWidth="2" />
            <text x="200" y="78" fill="var(--brand-violet)" fontSize="11" textAnchor="middle">×w1</text>
            <text x="200" y="113" fill="var(--brand-violet)" fontSize="11" textAnchor="middle">×w2</text>
            <text x="200" y="170" fill="var(--brand-violet)" fontSize="11" textAnchor="middle">×w3</text>
            <circle className="nt-svg-pulse" cx="350" cy="120" r="32" fill="var(--brand-violet)" opacity="0.25" stroke="var(--brand-violet)" strokeWidth="2" />
            <text x="350" y="116" fill="var(--foreground)" fontSize="13" textAnchor="middle">Σ 합산</text>
            <text x="350" y="134" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">+편향</text>
            <line x1="382" y1="120" x2="420" y2="120" stroke="var(--border)" strokeWidth="2" />
            <rect x="420" y="98" width="90" height="44" rx="8" fill="var(--card)" stroke="var(--brand-emerald)" />
            <text x="465" y="116" fill="var(--brand-emerald)" fontSize="12" textAnchor="middle">활성화</text>
            <text x="465" y="132" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">함수</text>
            <line x1="510" y1="120" x2="580" y2="120" stroke="var(--border)" strokeWidth="2" />
            <circle cx="610" cy="120" r="22" fill="var(--card)" stroke="var(--brand-emerald)" />
            <text x="610" y="125" fill="var(--foreground)" fontSize="13" textAnchor="middle">출력</text>
          </svg>
        </Figure>
        <H3>⚡ 활성화 함수가 필요한 이유</H3>
        <P>
          활성화 함수가 없으면 아무리 뉴런을 많이 쌓아도 결국 <Em>직선(단순 비례)</Em>밖에 못 만든다. 활성화 함수(예: ReLU,
          "음수면 0, 양수면 그대로")가 <B>비선형성(꺾임)</B>을 넣어줘야 곡선·복잡한 패턴을 표현할 수 있다. 세상의 문제는
          직선이 아니니까.
        </P>
        <Analogy emoji="🚪">
          <B>회의 결정 비유.</B> 뉴런은 여러 의견(입력)을 중요도(가중치)대로 반영해 합산하고, 일정 찬성선을 넘으면
          "통과(발화)"시키는 의장 같다. 가중치를 어떻게 두느냐가 곧 그 뉴런의 "판단 기준"이다.
        </Analogy>
        <Quiz q="활성화 함수가 없으면 왜 안 되나?">
          비선형성이 사라져 신경망 전체가 결국 하나의 직선(선형 함수)으로 붕괴한다. 곡선·복잡한 경계를 못 그려 어려운
          문제를 못 푼다. 그래서 ReLU 같은 "꺾임"을 넣는다.
        </Quiz>
      </Section>

      {/* 5 */}
      <Section id="c5">
        <Kicker num="5">신경망의 구조</Kicker>
        <H2>뉴런을 층층이 쌓으면 "깊은" 신경망</H2>
        <Lead>
          뉴런 하나는 단순하지만, 여러 개를 한 줄(층)로 세우고 그 층을 여러 겹 쌓으면 놀라운 일이 일어난다. 이 "여러 겹"이
          바로 <B>딥(deep) 러닝</B>의 "deep"이다.
        </Lead>
        <H3>🏛️ 입력층 → 은닉층 → 출력층</H3>
        <Figure caption="각 층의 뉴런이 다음 층 뉴런과 연결된다. 정보가 왼쪽(입력)에서 오른쪽(출력)으로 흐른다.">
          <svg viewBox="0 0 700 240" role="img" aria-label="다층 신경망 구조">
            <g fill="var(--brand-cyan)">
              <circle cx="100" cy="70" r="15" />
              <circle cx="100" cy="120" r="15" />
              <circle cx="100" cy="170" r="15" />
            </g>
            <text x="100" y="215" fill="var(--brand-cyan)" fontSize="12" textAnchor="middle">입력층</text>
            <g fill="var(--brand-violet)">
              <circle cx="280" cy="50" r="15" />
              <circle cx="280" cy="100" r="15" />
              <circle cx="280" cy="150" r="15" />
              <circle cx="280" cy="200" r="15" />
            </g>
            <text x="280" y="232" fill="var(--brand-violet)" fontSize="12" textAnchor="middle">은닉층 1</text>
            <g fill="var(--brand-violet)">
              <circle cx="440" cy="50" r="15" />
              <circle cx="440" cy="100" r="15" />
              <circle cx="440" cy="150" r="15" />
              <circle cx="440" cy="200" r="15" />
            </g>
            <text x="440" y="232" fill="var(--brand-violet)" fontSize="12" textAnchor="middle">은닉층 2</text>
            <g fill="var(--brand-emerald)">
              <circle cx="610" cy="100" r="15" />
              <circle cx="610" cy="150" r="15" />
            </g>
            <text x="610" y="200" fill="var(--brand-emerald)" fontSize="12" textAnchor="middle">출력층</text>
            <g stroke="var(--border)" strokeWidth="1">
              <line x1="115" y1="70" x2="265" y2="50" />
              <line x1="115" y1="70" x2="265" y2="150" />
              <line x1="115" y1="120" x2="265" y2="100" />
              <line x1="115" y1="170" x2="265" y2="200" />
              <line x1="295" y1="100" x2="425" y2="50" />
              <line x1="295" y1="150" x2="425" y2="150" />
              <line x1="295" y1="50" x2="425" y2="100" />
              <line x1="295" y1="200" x2="425" y2="200" />
              <line x1="455" y1="100" x2="595" y2="100" />
              <line x1="455" y1="150" x2="595" y2="150" />
              <line x1="455" y1="50" x2="595" y2="100" />
              <line x1="455" y1="200" x2="595" y2="150" />
            </g>
          </svg>
        </Figure>
        <H3>🔭 층이 깊을수록 "추상화"가 올라간다</H3>
        <P>
          이미지 인식을 예로 들면, 앞쪽 층은 <Em>선·모서리</Em> 같은 단순한 특징을 잡고, 중간 층은 <Em>눈·코·바퀴</Em>{' '}
          같은 부품을, 뒤쪽 층은 <Em>얼굴·자동차</Em> 같은 전체 개념을 잡는다. 단순한 특징을 조합해 점점 복잡한 개념으로
          올라가는 것. 사람이 특징을 일일이 알려주지 않아도 <B>스스로 특징을 발견(feature learning)</B>하는 게 딥러닝의
          위력이다.
        </P>
        <Analogy emoji="🧱">
          <B>레고 계층.</B> 반도체에서 "트랜지스터→게이트→CPU"로 추상화가 올라갔듯, 신경망도 "선→부품→사물"로 올라간다. 아래
          단순한 것을 조합해 위로 갈수록 의미가 풍부해지는 동일한 원리다.
        </Analogy>
        <Deep title="한 걸음 더 · 파라미터 수">
          연결선 하나하나가 가중치(파라미터)다. 작은 신경망도 수천 개, 이미지 모델은 수백만~수억 개, GPT-4급은{' '}
          <B>수천억~조 단위</B>의 파라미터를 가진다. 학습이란 이 모든 손잡이를 데이터에 맞게 동시에 조정하는 일이고, 그래서
          막대한 계산(=GPU, 18장)이 필요하다.
        </Deep>
      </Section>

      {/* 6 */}
      <Section id="c6">
        <Kicker num="6">학습의 원리</Kicker>
        <H2>경사하강과 역전파: 손잡이를 맞추는 법</H2>
        <Lead>
          2장에서 "손실이 줄도록 손잡이를 돌린다"고 했다. 그런데 손잡이가 수억 개라면 어느 쪽으로 돌려야 할까? 그 답이{' '}
          <B>경사하강법</B>과 <B>역전파</B>다. AI에서 가장 중요한 메커니즘이니 천천히 보자.
        </Lead>
        <H3>⛰️ 경사하강법 (Gradient Descent)</H3>
        <P>
          손실을 "골짜기가 있는 지형"이라고 상상하자. 우리는 가장 낮은 곳(손실 최소)을 찾고 싶다. 방법은 단순하다.{' '}
          <B>지금 서 있는 자리에서 가장 가파르게 내려가는 방향으로 한 걸음 내딛기</B>. 이걸 반복하면 골짜기 바닥에 도달한다.
          이 "내려가는 방향"을 알려주는 게 <Em>기울기(gradient)</Em>다.
        </P>
        <Figure caption="손실 지형에서 가장 가파른 내리막으로 조금씩 이동. '한 걸음 크기'가 학습률(learning rate)이다.">
          <svg viewBox="0 0 700 200" role="img" aria-label="경사하강법: 골짜기를 내려가기">
            <path d="M60 40 Q200 200 350 170 Q500 145 640 40" fill="none" stroke="var(--brand-violet)" strokeWidth="2.5" />
            <circle cx="110" cy="78" r="9" fill="#f472b6" />
            <circle cx="180" cy="135" r="9" fill="#f472b6" opacity="0.7" />
            <circle cx="270" cy="166" r="9" fill="#f472b6" opacity="0.55" />
            <circle className="nt-svg-pulse" cx="360" cy="170" r="11" fill="var(--brand-emerald)" />
            <text x="110" y="60" fill="#f472b6" fontSize="12" textAnchor="middle">시작(오차 큼)</text>
            <text x="360" y="195" fill="var(--brand-emerald)" fontSize="12" textAnchor="middle">목표(오차 최소)</text>
            <text x="600" y="70" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">한 걸음씩</text>
            <text x="600" y="86" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">내려간다</text>
          </svg>
        </Figure>
        <P>
          걸음이 너무 크면 골짜기를 건너뛰어 출렁대고, 너무 작으면 한없이 느리다. 이 걸음 크기 <B>학습률(learning rate)</B>{' '}
          조절이 학습의 핵심 기술 중 하나다.
        </P>
        <H3>🔁 역전파 (Backpropagation)</H3>
        <P>
          수억 개 손잡이 각각이 "오차에 얼마나 기여했는지"를 어떻게 알까? <B>역전파</B>는 출력에서 생긴 오차를{' '}
          <Em>뒤에서 앞으로 거꾸로 전파</Em>하며, 각 가중치가 책임져야 할 몫을 계산한다. 그 몫만큼 각 손잡이를 경사하강으로
          조정한다. 이 한 바퀴를 데이터로 수백만 번 반복하면 모델이 똑똑해진다.
        </P>
        <Flow
          steps={[
            { icon: '➡️', title: '순전파', desc: '입력→예측 계산' },
            { icon: '📏', title: '손실 측정', desc: '예측 vs 정답 차이' },
            { icon: '⬅️', title: '역전파', desc: '오차를 거꾸로 분배' },
            { icon: '🔧', title: '가중치 갱신', desc: '경사하강으로 조정' },
            { icon: '🔁', title: '반복', desc: '수백만 번' },
          ]}
          loop="이 사이클을 반복"
        />
        <Analogy emoji="🎯">
          <B>양궁 비유.</B> 화살을 쏘고(순전파), 과녁에서 얼마나 빗나갔는지 보고(손실), "팔 각도·힘 중 무엇 때문에
          빗나갔나"를 거슬러 따져(역전파), 다음엔 그만큼 자세를 고친다(갱신). 이걸 반복하면 명중률이 오른다.
        </Analogy>
        <Quiz q="역전파와 경사하강의 관계는?">
          <B>역전파</B>는 "각 손잡이가 오차에 얼마나 기여했나(기울기)"를 계산하는 방법이고, <B>경사하강</B>은 그 기울기를 보고
          "손잡이를 어느 쪽으로 얼마나 돌릴지" 정하는 방법이다. 둘이 짝을 이뤄 학습을 굴린다.
        </Quiz>
      </Section>

      {/* 7 */}
      <Section id="c7">
        <Kicker num="7">과적합과 일반화</Kicker>
        <H2>"외운 학생"과 "이해한 학생"의 차이</H2>
        <Lead>
          학습이 잘됐는지 판단하는 진짜 기준은 <B>"본 적 없는 새 데이터를 맞히느냐"</B>다. 이것을 <Em>일반화</Em>라 하고, 그
          반대 함정이 <Em>과적합(overfitting)</Em>이다. AI 실무에서 가장 자주 부딪히는 문제다.
        </Lead>
        <H3>📚 과적합: 답을 외워버린 모델</H3>
        <P>
          모델이 학습 데이터를 너무 깊이 파고들면, 일반적 패턴 대신 <B>그 데이터의 우연한 잡음까지 통째로 외운다</B>. 그러면
          학습 데이터는 100% 맞히지만 새 데이터에선 엉망이 된다. 시험 족보만 달달 외워 응용 문제에 무너지는 학생과 같다.
        </P>
        <Figure caption="왼쪽은 너무 단순(과소적합), 오른쪽은 잡음까지 외운 과적합. 가운데처럼 '핵심 패턴만' 잡는 게 목표.">
          <svg viewBox="0 0 700 200" role="img" aria-label="과소적합 적정 과적합 비교">
            <text x="120" y="24" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">과소적합</text>
            <g fill="var(--brand-cyan)">
              <circle cx="70" cy="120" r="4" />
              <circle cx="100" cy="90" r="4" />
              <circle cx="130" cy="110" r="4" />
              <circle cx="160" cy="70" r="4" />
            </g>
            <line x1="65" y1="125" x2="170" y2="85" stroke="#f87171" strokeWidth="2.5" />
            <text x="120" y="165" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">너무 단순</text>

            <text x="350" y="24" fill="var(--brand-emerald)" fontSize="13" fontWeight="bold" textAnchor="middle">적정</text>
            <g fill="var(--brand-cyan)">
              <circle cx="300" cy="120" r="4" />
              <circle cx="330" cy="90" r="4" />
              <circle cx="360" cy="110" r="4" />
              <circle cx="390" cy="70" r="4" />
            </g>
            <path d="M295 122 Q345 80 395 75" fill="none" stroke="var(--brand-emerald)" strokeWidth="2.5" />
            <text x="350" y="165" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">패턴을 잡음 (좋음)</text>

            <text x="580" y="24" fill="var(--brand-amber)" fontSize="13" fontWeight="bold" textAnchor="middle">과적합</text>
            <g fill="var(--brand-cyan)">
              <circle cx="530" cy="120" r="4" />
              <circle cx="560" cy="90" r="4" />
              <circle cx="590" cy="110" r="4" />
              <circle cx="620" cy="70" r="4" />
            </g>
            <path d="M528 120 Q545 70 560 90 Q575 115 590 110 Q608 95 620 72" fill="none" stroke="var(--brand-amber)" strokeWidth="2.5" />
            <text x="580" y="165" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">잡음까지 외움</text>
          </svg>
        </Figure>
        <H3>🧪 그래서 데이터를 나눈다</H3>
        <NTable
          head={['구분', '역할']}
          rows={[
            [<B>학습셋 (Train)</B>, '모델이 보고 배우는 데이터'],
            [<B>검증셋 (Validation)</B>, '학습 중 성능을 점검하고 설정을 튜닝'],
            [<B>시험셋 (Test)</B>, '마지막에 딱 한 번, 진짜 실력 측정 (커닝 금지)'],
          ]}
        />
        <H3>🛡️ 과적합을 막는 법</H3>
        <Card>
          <ul className="space-y-1.5 text-sm leading-7 text-muted-foreground">
            <li>
              · <B>데이터를 더 많이</B>: 가장 확실. 다양한 예시를 보면 잡음에 덜 휘둘린다.
            </li>
            <li>
              · <B>정규화(Regularization)</B>: 손잡이가 과하게 커지지 않도록 벌점을 줘 모델을 단순하게 유지.
            </li>
            <li>
              · <B>드롭아웃(Dropout)</B>: 학습 중 뉴런 일부를 무작위로 꺼서 특정 경로에 의존하지 못하게.
            </li>
            <li>
              · <B>조기 종료</B>: 검증 성능이 나빠지기 시작하면 학습을 멈춤.
            </li>
          </ul>
        </Card>
        <Note label="2부 요약: ">
          뉴런(가중합+활성화, 4장) → 층층이 쌓아 신경망(5장) → 경사하강·역전파로 학습(6장) → 외우지 말고 일반화하도록
          관리(7장). 이제 이 신경망을 "용도별로 특화한" 딥러닝 구조들로 넘어간다.
        </Note>
      </Section>

      {/* 8 */}
      <Section id="c8">
        <PartTag>PART 3 · 딥러닝 아키텍처</PartTag>
        <Kicker num="8">CNN · 이미지를 보는 신경망</Kicker>
        <H2>컴퓨터가 사진을 "이해하는" 방식</H2>
        <Lead>
          이미지·영상 분야의 혁명을 일으킨 구조가 <B>CNN</B>(합성곱 신경망)이다. 컴퓨터 비전·결함 검출과 가장 직접 맞닿는
          구조라 자세히 본다.
        </Lead>
        <H3>🖼️ 이미지는 숫자 격자다</H3>
        <P>
          컴퓨터에게 사진은 <B>픽셀 밝기 숫자의 격자</B>일 뿐이다(컬러는 R·G·B 세 장). 흔한 신경망에 이 숫자를 통째로 넣으면
          픽셀이 너무 많아 비효율적이고, 위치가 조금만 바뀌어도 못 알아본다. CNN은 이 문제를 영리하게 푼다.
        </P>
        <H3>🔍 합성곱: 작은 "특징 탐지기"로 훑기</H3>
        <P>
          CNN은 작은 창(필터)을 이미지 위에서 <B>미끄러뜨리며(슬라이딩)</B> 훑는다. 각 필터는 특정 특징, 예컨대 "세로
          모서리", "둥근 곡선"에 반응한다. 같은 필터를 이미지 전체에 쓰기 때문에, <Em>물체가 어디에 있든</Em> 같은 특징을
          찾아낸다(위치 불변성).
        </P>
        <Figure caption="필터로 특징을 뽑고(합성곱), 요약하고(풀링), 깊어질수록 추상적 개념으로. 마지막에 분류 결과를 낸다.">
          <svg viewBox="0 0 700 200" role="img" aria-label="CNN 필터가 이미지를 훑는 모습">
            <rect x="60" y="40" width="120" height="120" fill="var(--card)" stroke="var(--border)" />
            <g stroke="var(--border)" strokeWidth="1">
              <line x1="90" y1="40" x2="90" y2="160" />
              <line x1="120" y1="40" x2="120" y2="160" />
              <line x1="150" y1="40" x2="150" y2="160" />
              <line x1="60" y1="70" x2="180" y2="70" />
              <line x1="60" y1="100" x2="180" y2="100" />
              <line x1="60" y1="130" x2="180" y2="130" />
            </g>
            <rect className="nt-svg-pulse" x="60" y="40" width="60" height="60" fill="none" stroke="#f472b6" strokeWidth="3" />
            <text x="120" y="180" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">입력 이미지(픽셀)</text>
            <text x="90" y="32" fill="#f472b6" fontSize="11" textAnchor="middle">필터(창)</text>
            <text x="250" y="105" fill="var(--brand-violet)" fontSize="22" textAnchor="middle">→</text>
            <rect x="300" y="55" width="90" height="90" fill="var(--brand-violet)" opacity="0.2" stroke="var(--brand-violet)" />
            <text x="345" y="165" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">특징 지도</text>
            <text x="430" y="105" fill="var(--brand-violet)" fontSize="22" textAnchor="middle">→</text>
            <rect x="475" y="70" width="60" height="60" fill="var(--brand-emerald)" opacity="0.2" stroke="var(--brand-emerald)" />
            <text x="505" y="150" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">더 추상적</text>
            <text x="575" y="105" fill="var(--brand-violet)" fontSize="22" textAnchor="middle">→</text>
            <rect x="615" y="88" width="50" height="24" rx="5" fill="var(--card)" stroke="var(--brand-emerald)" />
            <text x="640" y="104" fill="var(--foreground)" fontSize="11" textAnchor="middle">"고양이"</text>
          </svg>
        </Figure>
        <H3>🪜 풀링과 계층적 특징</H3>
        <P>
          합성곱 뒤엔 보통 <B>풀링(pooling)</B>으로 정보를 압축한다(예: 2×2 영역에서 가장 강한 값만 남기기). 이를 반복하면
          5장에서 본 것처럼 <Em>모서리 → 부품 → 사물</Em>로 추상화가 올라간다. 사람이 "고양이 귀는 뾰족하다" 같은 규칙을
          알려주지 않아도, CNN이 데이터에서 스스로 특징을 발견한다.
        </P>
        <Note label="산업 응용: ">
          제조 검사, 특히 반도체 <B>결함 검출</B>이 전형적인 CNN 문제다. "정상 패턴 이미지"를 학습한 모델이 미세한
          이상(긁힘·이물질)을 찾아낸다. 최근엔 이상 탐지·세그멘테이션·트랜스포머 기반 비전(ViT)도 함께 쓰인다.
        </Note>
        <Quiz q="CNN이 일반 신경망보다 이미지에 강한 이유는?">
          작은 필터를 이미지 전체에 공유해 훑기 때문에 ① 파라미터가 적어 효율적이고 ② 물체 위치가 바뀌어도 같은 특징을 잡는{' '}
          <B>위치 불변성</B>을 갖는다. 또 층이 깊어지며 단순→복잡 특징을 계층적으로 학습한다.
        </Quiz>
      </Section>

      {/* 9 */}
      <Section id="c9">
        <Kicker num="9">순차 데이터와 어텐션</Kicker>
        <H2>문장처럼 "순서가 있는" 데이터 다루기</H2>
        <Lead>
          이미지는 한눈에 보지만, 문장·음성·시계열은 <B>순서</B>가 의미를 만든다("개가 사람을 물다" ≠ "사람이 개를 물다").
          이런 데이터를 다루려는 시도가 결국 오늘날 LLM의 직전 단계인 <Em>어텐션</Em>으로 이어진다.
        </Lead>
        <H3>🔗 RNN: 기억을 들고 한 단어씩</H3>
        <P>
          초기 방식인 <B>RNN</B>(순환 신경망)은 단어를 하나씩 읽으며 "지금까지의 요약(기억)"을 다음 단계로 넘긴다. 사람이
          문장을 왼쪽부터 읽어가는 것과 비슷하다. 하지만 두 가지 한계가 있었다.
        </P>
        <Card>
          <ul className="space-y-1.5 text-sm leading-7 text-muted-foreground">
            <li>
              · <B>긴 의존성에 약함</B>: 문장이 길어지면 앞부분 기억이 희미해진다(장기 의존성 문제).
            </li>
            <li>
              · <B>순차 처리라 느림</B>: 한 단어씩 차례로만 처리 가능 → 병렬화가 어려워 대규모 학습에 불리.
            </li>
          </ul>
        </Card>
        <H3>👁️ 어텐션(Attention): "중요한 단어에 집중"</H3>
        <P>
          돌파구는 <B>어텐션</B>이었다. 한 단어를 해석할 때 문장의 <Em>모든 단어를 한꺼번에 보되, 관련 깊은 단어에 더 큰
          가중치(주목)</Em>를 둔다. 예를 들어 "그 동물은 길을 못 건넜다. 너무 피곤했기 때문에"에서 "피곤한" 주체가
          "동물"임을 어텐션이 연결한다.
        </P>
        <Figure caption='"피곤"을 해석할 때 어텐션은 멀리 떨어진 "동물"에 강하게 주목한다. 거리와 무관하게 관련 단어를 직접 연결한다.'>
          <svg viewBox="0 0 700 170" role="img" aria-label="어텐션: 단어 간 연결 가중치">
            <g fontSize="13" fill="var(--foreground)">
              <rect x="60" y="70" width="70" height="30" rx="6" fill="var(--card)" stroke="var(--border)" />
              <text x="95" y="90" textAnchor="middle">그 동물은</text>
              <rect x="150" y="70" width="60" height="30" rx="6" fill="var(--card)" stroke="var(--border)" />
              <text x="180" y="90" textAnchor="middle">길을</text>
              <rect x="230" y="70" width="90" height="30" rx="6" fill="var(--card)" stroke="var(--border)" />
              <text x="275" y="90" textAnchor="middle">못 건넜다</text>
              <rect x="340" y="70" width="60" height="30" rx="6" fill="var(--brand-violet)" opacity="0.4" stroke="var(--brand-violet)" />
              <text x="370" y="90" textAnchor="middle" fill="var(--foreground)">피곤</text>
              <rect x="420" y="70" width="70" height="30" rx="6" fill="var(--card)" stroke="var(--border)" />
              <text x="455" y="90" textAnchor="middle">때문에</text>
            </g>
            <path className="nt-svg-dash" d="M360 70 Q230 20 95 70" fill="none" stroke="var(--brand-cyan)" strokeWidth="3" />
            <path d="M375 70 Q420 35 455 70" fill="none" stroke="var(--border)" strokeWidth="1.5" />
            <text x="230" y="30" fill="var(--brand-cyan)" fontSize="12" textAnchor="middle">강한 주목 (피곤 ↔ 동물)</text>
            <text x="370" y="135" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">이 단어를 해석할 때</text>
          </svg>
        </Figure>
        <Note label="왜 결정적인가: ">
          어텐션은 ① 멀리 떨어진 단어도 직접 연결해 <B>장기 의존성</B>을 풀고 ② 모든 단어를 동시에 볼 수 있어{' '}
          <B>병렬 처리</B>가 가능하다. 이 두 장점이 다음 장 트랜스포머의 폭발력을 만든다(그리고 병렬 처리는 GPU와 완벽히
          맞는다, 18장).
        </Note>
      </Section>

      {/* 10 */}
      <Section id="c10">
        <Kicker num="10">트랜스포머</Kicker>
        <H2>"Attention Is All You Need" · 현대 AI의 엔진</H2>
        <Lead>
          2017년 등장한 <B>트랜스포머(Transformer)</B>는 RNN을 버리고 <Em>오직 어텐션만으로</Em> 순차 데이터를 처리했다.
          ChatGPT의 "GPT"가 바로 Generative Pre-trained <B>Transformer</B>다. 오늘날 거의 모든 거대 AI의 뼈대다.
        </Lead>
        <H3>🧬 핵심 1 · 셀프 어텐션 (Self-Attention)</H3>
        <P>
          문장 안의 <B>모든 단어가 모든 단어를 서로 본다</B>. 각 단어가 "나와 관련 깊은 단어가 누구인지"를 스스로 계산해
          문맥을 파악한다. RNN처럼 한 줄로 읽는 게 아니라 <Em>한 번에 전체를 조망</Em>한다.
        </P>
        <H3>🔢 핵심 2 · 단어를 숫자(벡터)로</H3>
        <P>
          컴퓨터는 단어를 모르니, 각 단어(정확히는 <B>토큰</B>, 단어 조각)를 의미를 담은 <B>숫자 벡터(임베딩)</B>로 바꾼다.
          신기하게도 학습이 끝나면 비슷한 의미의 단어가 벡터 공간에서 가까이 모인다(왕−남자+여자 ≈ 여왕 같은 관계까지
          잡힌다).
        </P>
        <H3>⚡ 핵심 3 · 완전 병렬 처리</H3>
        <P>
          RNN과 달리 단어를 한꺼번에 처리하므로 GPU로 <B>대규모 병렬 학습</B>이 가능하다. 이 덕분에 인터넷 전체급 데이터로
          거대한 모델을 학습할 수 있게 됐고, 그게 LLM 시대를 열었다.
        </P>
        <Flow
          steps={[
            { icon: '✂️', title: '토큰화', desc: '문장→단어조각' },
            { icon: '🔢', title: '임베딩', desc: '토큰→의미 벡터' },
            { icon: '👁️', title: '셀프 어텐션', desc: '단어끼리 문맥 파악' },
            { icon: '🧠', title: '여러 층 반복', desc: '의미를 점점 정교화' },
            { icon: '🎯', title: '출력', desc: '다음 단어 예측' },
          ]}
        />
        <Analogy emoji="🗣️">
          <B>회의실 비유.</B> RNN은 한 명씩 차례로 귓속말로 전달하는 릴레이(뒤로 갈수록 내용이 변질). 트랜스포머는 모두가 한
          테이블에 앉아 <Em>동시에 서로를 보며</Em> 누가 핵심인지 가늠하는 원탁회의. 더 정확하고 빠르다.
        </Analogy>
        <Deep title="한 걸음 더 · 멀티헤드 어텐션">
          트랜스포머는 어텐션을 <B>여러 개(멀티헤드)</B> 병렬로 둬서, 한 헤드는 문법 관계를, 다른 헤드는 의미 관계를 보는
          식으로 다양한 관점을 동시에 학습한다. 각 단어를 Query·Key·Value 세 벡터로 변환해 "내 Query와 가장 잘 맞는 Key를
          가진 단어의 Value를 가져온다"는 게 어텐션의 실제 계산이다. 이런 층(어텐션+피드포워드)을 수십~수백 겹 쌓은 것이 GPT
          같은 모델의 실체다.
        </Deep>
      </Section>

      {/* 11 */}
      <Section id="c11">
        <Kicker num="11">LLM과 생성형 AI</Kicker>
        <H2>ChatGPT는 결국 "다음 단어 맞히기"다</H2>
        <Lead>
          놀랍게도, 거대 언어모델(LLM)의 핵심 능력은 단 하나에서 나온다. <B>"지금까지의 글 다음에 올 단어를 예측하기."</B> 이
          단순한 목표를 어마어마한 규모로 밀어붙였더니 번역·요약·코딩·추론까지 창발했다.
        </Lead>
        <H3>📖 1단계 · 사전학습 (Pre-training)</H3>
        <P>
          인터넷·책 등 방대한 텍스트를 주고, 문장 일부를 가린 뒤 <B>다음 단어(토큰)를 맞히게</B> 반복 훈련한다. 정답은 원문
          자체이므로 사람이 라벨을 달 필요가 없다(자기지도학습). 수천억 개 파라미터를 수조 단어로 학습하며 문법·상식·문체·
          약간의 추론까지 흡수한다. 막대한 GPU와 전기, 시간이 드는 단계다.
        </P>
        <H3>🎯 2단계 · 정렬 (Fine-tuning & RLHF)</H3>
        <P>
          사전학습만 한 모델은 "그럴듯한 다음 단어"는 잘 내지만 사람의 지시를 따르거나 안전하게 답하진 못한다. 그래서 ① 좋은
          질문-답변 예시로 <B>지시 미세조정</B>하고 ② 사람이 여러 답변 중 나은 것을 고른 피드백으로 <B>RLHF</B>(인간 피드백
          기반 강화학습)를 한다. 이 정렬 과정이 "쓸 만하고 공손한 ChatGPT"를 만든다.
        </P>
        <Flow
          steps={[
            { icon: '🌐', title: '사전학습', desc: '방대한 텍스트로 다음단어 예측' },
            { icon: '📝', title: '지시 미세조정', desc: '질문-답변 예시 학습' },
            { icon: '👍', title: 'RLHF', desc: '사람 선호로 다듬기' },
            { icon: '💬', title: '완성', desc: '대화형 AI' },
          ]}
        />
        <H3>✍️ 어떻게 "생성"하나</H3>
        <P>
          답을 한 번에 통째로 쓰는 게 아니라, <B>토큰을 하나씩 차례로</B> 생성한다. 매 순간 "다음에 올 가장 그럴듯한 토큰"을
          확률로 뽑고, 그걸 입력에 붙여 또 다음 토큰을 뽑는다(자기회귀, autoregressive). 약간의 무작위성(temperature)을 줘서
          매번 조금씩 다른, 창의적인 답이 나온다.
        </P>
        <Callout label="중요한 직관: ">
          LLM은 사실을 "검색"하는 게 아니라 <B>그럴듯한 다음 말을 확률로 생성</B>한다. 그래서 모르는 것도 자신 있게 지어내는{' '}
          <Em>환각(hallucination)</Em>이 생긴다(13·19장). 강력하지만 "확률적 글쓰기 기계"라는 본질을 기억하면 한계도
          이해된다.
        </Callout>
        <Note label="생성형 AI 전반: ">
          같은 발상이 이미지(확산모델 Diffusion), 음성, 코드, 영상으로 확장됐다. 텍스트는 "다음 단어", 이미지는 "노이즈에서
          그림 복원"이라는 차이만 있을 뿐, <B>데이터의 패턴을 학습해 새 데이터를 만든다</B>는 핵심은 같다.
        </Note>
        <Quiz q="ChatGPT가 가끔 틀린 사실을 자신 있게 말하는 근본 이유는?">
          사실 데이터베이스를 조회하는 게 아니라 <B>"통계적으로 그럴듯한 다음 토큰"을 생성</B>하기 때문. 그럴듯함과 사실
          여부는 다르므로, 근거 없이도 매끄러운 거짓(환각)을 만들 수 있다. 그래서 중요한 정보는 항상 검증이 필요하다.
        </Quiz>
      </Section>

      {/* 12 */}
      <Section id="c12">
        <PartTag>PART 4 · LLM 실전과 최신 트렌드</PartTag>
        <Kicker num="12">컨텍스트·프롬프트·인컨텍스트 학습</Kicker>
        <H2>모델의 "작업 기억"을 다루는 법</H2>
        <Lead>
          11장까지가 "모델이 어떻게 만들어지나"였다면, 여기부터는 <B>완성된 모델을 실제로 어떻게 쓰는가</B>다. 출발점은
          모델의 작업 공간인 <Em>컨텍스트(context)</Em>를 이해하는 것.
        </Lead>
        <H3>🪟 컨텍스트 윈도우 = 한 번에 볼 수 있는 양</H3>
        <P>
          LLM은 입력을 토큰으로 쪼개 처리한다(10장). 한 번에 읽고 기억할 수 있는 토큰 수의 한계가 <B>컨텍스트 윈도우</B>다.
          사람의 "한 번에 머릿속에 떠올릴 수 있는 분량"과 같다. 초기엔 수천 토큰이었지만, 최신 모델은{' '}
          <Hl>수십만~수백만 토큰</Hl>(책 여러 권 분량)까지 본다.
        </P>
        <P>
          중요한 한계 둘: ① 컨텍스트가 길수록 <B>비용·속도</B>가 늘고(연산이 길이에 민감), ② 너무 길면 가운데 정보를 놓치는{' '}
          <Em>"lost in the middle"</Em> 현상이 있다. 그래서 "무조건 다 넣기"보다 <B>필요한 것만 잘 넣는</B> 기술(13장 RAG)이
          중요해진다.
        </P>
        <H3>✍️ 프롬프트와 인컨텍스트 학습</H3>
        <P>
          모델에게 주는 지시문이 <B>프롬프트(prompt)</B>다. 놀라운 점은, 모델을 다시 훈련시키지 않고 <Em>프롬프트 안에 예시
          몇 개만 보여줘도</Em> 그 패턴을 따라 한다는 것. 이를 <HlV>인컨텍스트 학습(in-context learning)</HlV>이라 한다.
        </P>
        <NTable
          head={['기법', '방식']}
          rows={[
            [<B>제로샷 (Zero-shot)</B>, '예시 없이 그냥 지시. "이 문장 감정 분류해줘."'],
            [<B>퓨샷 (Few-shot)</B>, '예시 몇 개를 보여주고 시킴. "좋다→긍정, 싫다→부정. 그럼 \'별로다\'는?"'],
            [<B>시스템 프롬프트</B>, '대화 전체의 규칙·역할 설정. "너는 친절한 비서다."'],
          ]}
        />
        <Analogy emoji="🧠">
          <B>책상 비유.</B> 컨텍스트 윈도우는 펼쳐놓을 수 있는 책상 크기다. 작으면 자료를 조금만, 크면 많이 올려둘 수 있다.
          하지만 책상이 너무 넓어도 자료가 흩어지면 못 찾는다. 그래서 "무엇을 책상에 올릴지" 고르는 게 핵심 기술이다.
        </Analogy>
        <Note label="왜 트렌드의 출발점인가: ">
          RAG, 도구 사용, 에이전트, 추론까지 <B>"컨텍스트에 무엇을, 어떻게 넣느냐"의 싸움</B>이다. 모델 자체는 그대로 두고, 그
          주변(컨텍스트·도구·루프)을 엔지니어링하는 것이 요즘 AI 실무의 핵심이다. 이걸 묶어 <Em>"컨텍스트 엔지니어링"</Em>
          이라 부르기도 한다.
        </Note>
      </Section>

      {/* 13 */}
      <Section id="c13">
        <Kicker num="13">RAG · 검색 증강 생성</Kicker>
        <H2>모델에게 "커닝 페이퍼"를 쥐여주기</H2>
        <Lead>
          LLM의 약점은 ① 학습 시점 이후를 모르고 ② 회사 내부 문서 같은 사적 지식이 없으며 ③ 모르면 지어낸다(환각)는 것.
          이를 한 방에 푸는 대표 기술이 <B>RAG</B>(Retrieval-Augmented Generation)다. 요즘 기업 AI의 거의 표준.
        </Lead>
        <H3>🔎 핵심 발상: 답하기 전에 "찾아서" 넣는다</H3>
        <P>
          질문이 오면 모델이 바로 답하는 게 아니라, 먼저 <B>관련 문서를 검색</B>해서 그 내용을 컨텍스트에 넣고,{' '}
          <Em>그걸 근거로</Em> 답하게 한다. 시험 전에 교과서에서 해당 페이지를 펴주는 것과 같다. 그래서 최신·사내 정보에
          강하고, 근거가 있으니 환각이 줄며, 출처까지 댈 수 있다.
        </P>
        <H3>🧮 어떻게 "의미로" 검색하나: 임베딩 + 벡터DB</H3>
        <P>
          단순 키워드 검색은 표현이 다르면 못 찾는다. RAG는 문서와 질문을 모두 <HlV>임베딩(embedding)</HlV>, 즉 의미를 담은
          숫자 벡터(10장)로 바꾼다. 그리고 <B>벡터 데이터베이스</B>에서 <Em>의미가 가까운</Em> 조각을 찾는다. "자동차"로
          검색해도 "승용차" 문서를 찾아내는 식이다.
        </P>
        <Flow
          steps={[
            { icon: '❓', title: '질문', desc: '사용자 입력' },
            { icon: '🔢', title: '임베딩', desc: '질문→의미 벡터' },
            { icon: '🗄️', title: '벡터 검색', desc: '관련 문서 조각 찾기' },
            { icon: '📎', title: '컨텍스트 첨부', desc: '근거를 프롬프트에' },
            { icon: '💬', title: '근거 기반 생성', desc: '출처 포함 답변' },
          ]}
        />
        <H3>⚙️ 실전 디테일 (들어두면 좋은 키워드)</H3>
        <Card>
          <ul className="space-y-1.5 text-sm leading-7 text-muted-foreground">
            <li>
              · <B>청킹(Chunking)</B>: 긴 문서를 검색하기 좋은 작은 조각으로 나누는 것. 조각 크기가 품질을 좌우.
            </li>
            <li>
              · <B>리랭킹(Re-ranking)</B>: 검색된 후보를 한 번 더 정밀하게 점수 매겨 정렬.
            </li>
            <li>
              · <B>하이브리드 검색</B>: 의미 기반(벡터) + 키워드 기반(BM25)을 섞어 정확도↑.
            </li>
            <li>
              · <B>에이전틱 RAG</B>: 한 번 검색하고 끝이 아니라, 모델이 <Em>"검색이 더 필요한가?"를 스스로 판단</Em>하며 반복
              검색(15장 에이전트와 연결).
            </li>
          </ul>
        </Card>
        <Callout label="RAG vs 파인튜닝 vs 프롬프트: ">
          새 지식을 주입할 땐 보통 <B>RAG</B>(정보가 자주 바뀌거나 출처가 필요할 때), 말투·형식을 바꿀 땐 <B>파인튜닝</B>,
          간단한 조정은 <B>프롬프트</B>로 한다. 셋은 경쟁이 아니라 상황별 도구다. 최근엔 컨텍스트가 길어지고 검색이 똑똑해지며
          RAG가 기본값이 됐다.
        </Callout>
        <Quiz q="RAG가 환각을 줄이는 원리는?">
          답하기 전에 관련 문서를 <B>검색해 근거로 제공</B>하기 때문. 모델이 기억(불확실)에 의존하지 않고 눈앞의 자료를 보고
          답하니, 지어낼 여지가 줄고 출처도 댈 수 있다. 단, 검색이 틀리면 답도 틀리므로 검색 품질이 관건이다.
        </Quiz>
      </Section>

      {/* 14 */}
      <Section id="c14">
        <Kicker num="14">도구 사용·함수 호출·MCP</Kicker>
        <H2>말만 하던 AI가 "행동"하기 시작하다</H2>
        <Lead>
          LLM은 본래 텍스트만 생성한다. 계산도 틀리고, 오늘 날씨도 모르고, 실제로 무언가를 실행하지도 못한다. 이 벽을 깬 것이{' '}
          <B>도구 사용(tool use)</B>이다. AI에게 손발을 달아준 셈.
        </Lead>
        <H3>🛠️ 함수 호출 (Function Calling)</H3>
        <P>
          모델이 "내가 직접 답하는 대신 <Em>이 도구를 이렇게 써야겠다</Em>"고 판단해, 정해진 형식으로 도구를 호출하는
          능력이다. 예를 들어 "서울 날씨 알려줘"에 대해 모델이 <Kbd>get_weather(city="Seoul")</Kbd>를 호출하라고 출력하면,
          시스템이 실제 날씨 API를 실행해 결과를 다시 모델에 넘긴다. 모델은 그 결과로 답한다.
        </P>
        <Grid2>
          <Box title="🧮 계산기·코드">틀리기 쉬운 계산을 직접 실행해 정확히.</Box>
          <Box title="🌐 웹 검색">학습 이후의 최신 정보를 가져옴.</Box>
          <Box title="🗂️ 데이터베이스·API">사내 시스템·외부 서비스와 연동.</Box>
          <Box title="💾 파일·메모리">읽고 쓰고 기억을 저장.</Box>
        </Grid2>
        <H3>🔌 MCP: 도구 연결의 "USB-C"</H3>
        <P>
          문제는, 도구마다 연결 방식이 제각각이면 매번 새로 붙여야 한다는 것. 이를 표준화한 것이 <Hl>MCP</Hl>(Model Context
          Protocol)다. 모델과 도구·데이터를 잇는 <Em>공통 규격</Em>으로, 비유하면 기기마다 다르던 충전 단자를{' '}
          <B>USB-C 하나로 통일</B>한 것과 같다. MCP 덕분에 "도구 생태계"가 폭발적으로 커졌다.
        </P>
        <Figure caption="MCP라는 공통 규격 하나로 모델이 수많은 도구·데이터에 표준 방식으로 연결된다.">
          <svg viewBox="0 0 700 170" role="img" aria-label="MCP가 모델과 여러 도구를 표준으로 연결">
            <rect x="290" y="20" width="120" height="42" rx="10" fill="var(--brand-violet)" opacity="0.3" stroke="var(--brand-violet)" />
            <text x="350" y="46" fill="var(--brand-violet)" fontSize="14" fontWeight="bold" textAnchor="middle">LLM</text>
            <rect className="nt-svg-pulse" x="300" y="78" width="100" height="26" rx="7" fill="var(--brand-cyan)" opacity="0.2" stroke="var(--brand-cyan)" />
            <text x="350" y="96" fill="var(--brand-cyan)" fontSize="12" fontWeight="bold" textAnchor="middle">MCP 표준</text>
            <line x1="350" y1="62" x2="350" y2="78" stroke="var(--border)" strokeWidth="2" />
            <g fontSize="11" fill="var(--foreground)">
              <rect x="70" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)" />
              <text x="120" y="148" textAnchor="middle">웹 검색</text>
              <rect x="190" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)" />
              <text x="240" y="148" textAnchor="middle">데이터베이스</text>
              <rect x="310" y="128" width="80" height="30" rx="7" fill="var(--card)" stroke="var(--border)" />
              <text x="350" y="148" textAnchor="middle">코드 실행</text>
              <rect x="410" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)" />
              <text x="460" y="148" textAnchor="middle">파일/메모리</text>
              <rect x="530" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)" />
              <text x="580" y="148" textAnchor="middle">외부 API</text>
            </g>
            <g stroke="var(--border)" strokeWidth="1.5">
              <line x1="330" y1="104" x2="120" y2="128" />
              <line x1="340" y1="104" x2="240" y2="128" />
              <line x1="350" y1="104" x2="350" y2="128" />
              <line x1="360" y1="104" x2="460" y2="128" />
              <line x1="370" y1="104" x2="580" y2="128" />
            </g>
          </svg>
        </Figure>
        <Note label="의미: ">
          도구 사용으로 LLM은 "말하는 기계"에서 <B>"일하는 기계"</B>로 바뀌었다. 검색·계산·실행을 스스로 하니, 정확성과
          활용 범위가 크게 늘었다. 이 능력이 다음 장의 "에이전트"를 가능하게 한다.
        </Note>
      </Section>

      {/* 15 */}
      <Section id="c15">
        <Kicker num="15">AI 에이전트와 하네스</Kicker>
        <H2>스스로 계획하고 실행하는 AI</H2>
        <Lead>
          최근 AI의 최대 키워드는 단연 <B>에이전트(Agent)</B>다. 한 번 묻고 한 번 답하는 챗봇을 넘어, <Em>목표를 받아 스스로
          계획을 세우고 도구를 써가며 여러 단계를 실행</Em>하는 AI다.
        </Lead>
        <H3>🔁 에이전트의 핵심: 반복 루프</H3>
        <P>
          에이전트는 같은 사이클을 목표 달성까지 반복한다. <B>계획(Plan) → 실행(Act, 도구 사용) → 관찰(Observe, 결과 확인) →
          다시 계획</B>. 사람이 일을 처리하는 방식과 똑같다.
        </P>
        <Figure caption="에이전트는 이 루프를 자율적으로 돌린다. 계획하고, 도구로 실행하고, 결과를 보고, 다시 조정한다.">
          <svg viewBox="0 0 700 180" role="img" aria-label="에이전트 루프: 계획 실행 관찰 반복">
            <defs>
              <marker id="agent-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 z" fill="var(--muted-foreground)" />
              </marker>
            </defs>
            <circle cx="160" cy="90" r="42" fill="var(--brand-violet)" opacity="0.2" stroke="var(--brand-violet)" strokeWidth="2" />
            <text x="160" y="86" fill="var(--brand-violet)" fontSize="13" fontWeight="bold" textAnchor="middle">계획</text>
            <text x="160" y="103" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">Plan</text>
            <circle cx="350" cy="90" r="42" fill="var(--brand-cyan)" opacity="0.15" stroke="var(--brand-cyan)" strokeWidth="2" />
            <text x="350" y="86" fill="var(--brand-cyan)" fontSize="13" fontWeight="bold" textAnchor="middle">실행</text>
            <text x="350" y="103" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">Act(도구)</text>
            <circle cx="540" cy="90" r="42" fill="var(--brand-emerald)" opacity="0.15" stroke="var(--brand-emerald)" strokeWidth="2" />
            <text x="540" y="86" fill="var(--brand-emerald)" fontSize="13" fontWeight="bold" textAnchor="middle">관찰</text>
            <text x="540" y="103" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">Observe</text>
            <path d="M202 90 L308 90" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#agent-arrow)" />
            <path d="M392 90 L498 90" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#agent-arrow)" />
            <path className="nt-svg-dash" d="M540 132 Q540 165 160 165 Q160 140 160 132" stroke="var(--brand-violet)" strokeWidth="2" fill="none" markerEnd="url(#agent-arrow)" />
            <text x="350" y="158" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">목표 달성까지 반복</text>
          </svg>
        </Figure>
        <H3>🏗️ 하네스(Harness): 모델을 감싸는 "골격"</H3>
        <P>
          똑똑한 모델 하나만으론 신뢰할 수 있는 에이전트가 안 된다. 모델은 실수하고, 무한 루프에 빠지고, 위험한 행동을 할 수
          있다. 그래서 모델 <Em>바깥</Em>에 이를 통제하는 코드 골격을 두는데, 이것을 <Hl>하네스(harness)</Hl> 또는
          스캐폴딩이라 한다.
        </P>
        <P>
          핵심 철학: <Em>"모델은 그대로(frozen) 두고, 실패가 구조적으로 반복되지 않도록 주변을 설계한다."</Em> 똑똑함은 모델에
          맡기되, 안전·정확성·재시도·메모리·다단계 조율은 하네스가 책임진다.
        </P>
        <NTable
          head={['하네스가 맡는 일', '설명']}
          rows={[
            [<B>실행 제어</B>, '도구를 안전하게 호출, 권한·한도 관리'],
            [<B>재시도·검증</B>, '결과를 확인하고 틀리면 다시 시도'],
            [<B>메모리</B>, '긴 작업의 진행 상황·과거 결과를 기억'],
            [<B>오케스트레이션</B>, '여러 단계·여러 에이전트를 조율'],
          ]}
        />
        <P>
          복잡한 일은 여러 에이전트가 역할을 나눠 협업하기도 한다(예: "조사 담당 + 작성 담당 + 검토 담당"). 다만 루프를 돌수록{' '}
          <HlA>시간과 비용이 곱절로</HlA> 든다. 그래서 "언제 에이전트를 쓰고 언제 단순 호출로 충분한가"를 가르는 게 실무
          역량이다.
        </P>
        <Note label="한 줄 정리: ">
          에이전트 = <B>LLM(두뇌) + 도구(손발) + 하네스(골격·통제) + 루프(반복)</B>. "모델을 더 똑똑하게"에서 <Em>"모델 주변을
          잘 설계해서"</Em> 실수 없이 일을 끝내게로 무게중심이 옮겨간 것이 지금의 큰 흐름이다.
        </Note>
      </Section>

      {/* 16 */}
      <Section id="c16">
        <Kicker num="16">추론 모델·테스트타임 컴퓨트</Kicker>
        <H2>"생각할 시간"을 주면 더 똑똑해진다</H2>
        <Lead>
          최근 AI의 큰 패러다임 전환. 모델을 더 크게 키우는 대신, <B>답하기 전에 더 오래 "생각"하게</B> 만들어 성능을
          끌어올리는 길이 열렸다. 이것이 <Em>추론 모델(reasoning model)</Em>이다.
        </Lead>
        <H3>💭 생각의 사슬 (Chain-of-Thought)</H3>
        <P>
          일반 LLM은 답을 바로 뱉는다. 추론 모델은 답 전에 <B>속으로 단계적으로 추론</B>한다. 문제를 쪼개고, 여러 접근을
          시도하고, 모순을 발견하면 되돌아가고(backtracking), 검산한 뒤 답한다. 사람이 어려운 수학 문제를 풀 때 연습장에
          끄적이는 그 과정을 모델이 내부적으로 하는 것이다.
        </P>
        <H3>⏱️ 테스트타임 컴퓨트 (Test-time Compute)</H3>
        <P>
          핵심 통찰: <B>"훈련"에 돈을 더 쓰는 대신 "추론(답할 때)"에 계산을 더 쓴다.</B> 모델이 생각을 길게 할수록(토큰을 많이
          생성할수록) 어려운 문제를 더 잘 푼다는 것이 밝혀졌다. 같은 모델도 "더 오래 생각하게" 하면 정답률이 오른다.
        </P>
        <Figure caption="추론 모델은 답 전에 '생각하는 시간'을 길게 쓴다. 그만큼 느리고 비싸지만 어려운 문제에 강하다.">
          <svg viewBox="0 0 700 150" role="img" aria-label="일반 모델 vs 추론 모델">
            <text x="60" y="45" fill="var(--muted-foreground)" fontSize="13" fontWeight="bold">일반 LLM</text>
            <rect x="60" y="58" width="90" height="30" rx="6" fill="var(--card)" stroke="var(--border)" />
            <text x="105" y="78" fill="var(--foreground)" fontSize="12" textAnchor="middle">질문</text>
            <text x="170" y="78" fill="var(--brand-violet)" fontSize="18">→</text>
            <rect x="195" y="58" width="90" height="30" rx="6" fill="var(--brand-emerald)" opacity="0.25" stroke="var(--brand-emerald)" />
            <text x="240" y="78" fill="var(--foreground)" fontSize="12" textAnchor="middle">즉답</text>
            <text x="300" y="78" fill="var(--muted-foreground)" fontSize="11">빠르지만 실수 가능</text>

            <text x="60" y="118" fill="var(--brand-violet)" fontSize="13" fontWeight="bold">추론 모델</text>
            <rect x="60" y="100" width="70" height="26" rx="6" fill="var(--card)" stroke="var(--border)" />
            <text x="95" y="117" fill="var(--foreground)" fontSize="11" textAnchor="middle">질문</text>
            <text x="135" y="117" fill="var(--brand-violet)" fontSize="16">→</text>
            <rect className="nt-svg-pulse" x="155" y="100" width="200" height="26" rx="6" fill="var(--brand-violet)" opacity="0.25" stroke="var(--brand-violet)" />
            <text x="255" y="117" fill="var(--foreground)" fontSize="11" textAnchor="middle">속으로 단계별 추론(길게)</text>
            <text x="360" y="117" fill="var(--brand-violet)" fontSize="16">→</text>
            <rect x="382" y="100" width="80" height="26" rx="6" fill="var(--brand-emerald)" opacity="0.25" stroke="var(--brand-emerald)" />
            <text x="422" y="117" fill="var(--foreground)" fontSize="11" textAnchor="middle">답</text>
            <text x="478" y="117" fill="var(--muted-foreground)" fontSize="11">느리지만 정확</text>
          </svg>
        </Figure>
        <H3>🏆 대표 모델과 의미</H3>
        <Card>
          <ul className="space-y-1.5 text-sm leading-7 text-muted-foreground">
            <li>
              · <B>OpenAI o1 (2024) → o3</B>: 추론에 특화한 첫 상용 모델 계열. 수학·코딩·과학에서 도약.
            </li>
            <li>
              · <B>DeepSeek R1 (2025년 1월)</B>: <Em>순수 강화학습만으로</Em> o1급 추론을 달성하고 <B>오픈소스</B>로 공개해
              충격. 비용도 크게 낮춤.
            </li>
            <li>· 이들은 일반 모델보다 <B>훨씬 많은 토큰(생각)을 생성</B>한다.</li>
          </ul>
        </Card>
        <Callout label="왜 큰 전환인가: ">
          그동안 발전은 "모델·데이터를 키우는 사전학습 스케일링"이 주도했다. 추론 모델은 <B>"추론 때 계산을 더 쓰는" 새 축</B>
          을 열었다. 이는 곧 <Em>AI가 더 많은 반도체(GPU)를 먹는다</Em>는 뜻이라(18장), 반도체 수요를 다시 한번 밀어 올린다.
        </Callout>
      </Section>

      {/* 17 */}
      <Section id="c17">
        <Kicker num="17">효율·아키텍처·멀티모달</Kicker>
        <H2>더 싸게, 더 작게, 더 다양하게</H2>
        <Lead>
          거대 모델은 비싸고 무겁다. 그래서 <B>"성능은 지키되 비용을 줄이는"</B> 기술과, 텍스트를 넘어 <B>이미지·음성·영상
          까지</B> 다루는 흐름이 빠르게 발전 중이다.
        </Lead>
        <H3>🧩 MoE (Mixture of Experts, 전문가 혼합)</H3>
        <P>
          모델 전체를 매번 다 쓰면 비싸다. MoE는 모델 안에 여러 <B>"전문가" 서브네트워크</B>를 두고, 입력마다 <Em>관련 있는
          일부 전문가만 켠다</Em>. 예컨대 총 2,350억 파라미터를 갖되 한 번에 220억만 활성화하는 식이다. 덕분에 <B>큰 용량의
          지능을 작은 비용으로</B> 쓴다. 병원에서 증상에 맞는 전문의에게만 보내는 것과 같다.
        </P>
        <H3>🗜️ 경량화: 양자화·증류</H3>
        <Grid2>
          <Box title="📉 양자화 (Quantization)">
            가중치 숫자의 정밀도를 낮춰(예: 32비트→4비트) 모델 크기·연산을 확 줄인다. 약간의 정확도 손실로 큰 효율.
          </Box>
          <Box title="🎓 증류 (Distillation)">
            크고 똑똑한 "선생 모델"의 행동을 작은 "학생 모델"이 따라 배워, 작지만 쓸 만한 모델을 만든다. 폰에서 돌릴 AI의
            비결.
          </Box>
        </Grid2>
        <H3>🎨 멀티모달 (Multimodal)</H3>
        <P>
          이제 AI는 텍스트만이 아니라 <B>이미지·음성·영상·문서를 함께</B> 이해하고 생성한다. 사진을 보고 설명하고, 음성을
          듣고 답하고, 글로 영상을 만든다. 트랜스포머가 "모든 것을 토큰(숫자)으로" 다루기에 가능한 일이다. 참고로 이미지
          생성은 주로 <B>확산 모델(Diffusion)</B>을 쓴다 — 노이즈 덩어리에서 점점 그림을 복원해가는 방식.
        </P>
        <H3>🧷 메모리: 곁다리에서 핵심으로</H3>
        <P>
          예전엔 대화 기억을 벡터DB에 임시로 붙이는 정도였지만, 이제 <B>"메모리"가 모델 시스템의 1급 구성요소</B>로 다뤄진다.
          에이전트가 긴 작업·여러 세션에 걸쳐 정보를 기억·갱신하는 능력이 중요해졌다(15장 하네스와 연결).
        </P>
        <Note label="4부 요약: ">
          컨텍스트(12) → 검색으로 지식 보강 RAG(13) → 도구로 행동 MCP(14) → 스스로 일하는 에이전트·하네스(15) → 생각을 길게
          하는 추론 모델(16) → 싸고 다양하게 만드는 효율·멀티모달(17). 공통 주제는 <B>"모델 자체보다 그 주변 시스템을 설계하는
          시대"</B>다. 이 모든 것이 더 많은 연산, 즉 반도체로 이어진다.
        </Note>
      </Section>

      {/* 18 */}
      <Section id="c18">
        <PartTag>PART 5 · 실제 세계와 산업</PartTag>
        <Kicker num="18">AI와 반도체</Kicker>
        <H2>왜 AI 혁명은 곧 반도체 혁명인가</H2>
        <Lead>
          두 주제가 만나는 지점. AI의 발전은 알고리즘만의 이야기가 아니다. <B>그것을 굴릴 하드웨어(반도체)가 없으면 한 줄도
          학습 못 한다.</B>{' '}
          <a
            href="/notes/semiconductor"
            style={{ color: 'var(--brand-violet)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            반도체 완전정복
          </a>
          의 17장(병렬화)에서 이어지는 결론이다.
        </Lead>
        <H3>✖️ 딥러닝의 본질은 거대한 행렬 곱셈</H3>
        <P>
          신경망의 "입력×가중치 합산"(4장)은 수학적으로 <B>행렬 곱셈</B>이다. 층마다, 데이터마다 이 곱셈이 수십억 번
          일어난다. 즉 딥러닝 = <Em>"같은 단순 계산을 천문학적으로 많이, 동시에"</Em>. 이건 <B>GPU가 가장 잘하는 일</B> 그
          자체다.
        </P>
        <H3>🖥️ AI를 돌리는 칩들</H3>
        <NTable
          head={['칩', '역할']}
          rows={[
            [<B>GPU</B>, '단순 코어 수천 개로 병렬 행렬연산. AI 학습의 표준 (엔비디아 지배)'],
            [<B>TPU·NPU</B>, 'AI 연산만을 위해 설계한 전용칩(구글 TPU, 스마트폰 NPU 등)'],
            [<B>HBM</B>, 'GPU 옆에 쌓아 붙인 초고속 메모리. 데이터를 빠르게 공급 (삼성·SK하이닉스)'],
          ]}
        />
        <H3>🧱 병목은 계산이 아니라 "데이터 운반"</H3>
        <P>
          반도체의 <B>메모리 월</B>이 AI에서 특히 심각하다. 모델이 거대해 가중치·데이터를 메모리에서 GPU로 끝없이 날라야
          하는데, 그 통로가 좁으면 비싼 GPU가 논다. 그래서 <Hl>HBM</Hl>(고대역폭 메모리)이 AI 시대의 핵심 부품이 됐고, 메모리
          회사들이 AI 수혜를 크게 본다.
        </P>
        <Figure caption="AI가 반도체 수요를 키우고, 더 좋은 반도체가 더 강한 AI를 가능케 하는 선순환.">
          <svg viewBox="0 0 700 160" role="img" aria-label="AI와 반도체의 순환">
            <defs>
              <marker id="cycle-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 z" fill="var(--muted-foreground)" />
              </marker>
            </defs>
            <rect x="60" y="55" width="150" height="50" rx="10" fill="var(--brand-violet)" opacity="0.25" stroke="var(--brand-violet)" />
            <text x="135" y="78" fill="var(--brand-violet)" fontSize="13" fontWeight="bold" textAnchor="middle">AI 수요 폭증</text>
            <text x="135" y="95" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">더 큰 모델</text>
            <path d="M215 70 L300 70" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#cycle-arrow)" />
            <rect x="305" y="55" width="160" height="50" rx="10" fill="var(--brand-cyan)" opacity="0.2" stroke="var(--brand-cyan)" />
            <text x="385" y="78" fill="var(--brand-cyan)" fontSize="13" fontWeight="bold" textAnchor="middle">반도체 수요↑</text>
            <text x="385" y="95" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">GPU·HBM·검사장비</text>
            <path d="M470 70 L555 70" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#cycle-arrow)" />
            <rect x="560" y="55" width="120" height="50" rx="10" fill="var(--brand-emerald)" opacity="0.2" stroke="var(--brand-emerald)" />
            <text x="620" y="78" fill="var(--brand-emerald)" fontSize="13" fontWeight="bold" textAnchor="middle">더 강한 AI</text>
            <text x="620" y="95" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">성능 향상</text>
            <path className="nt-svg-dash" d="M620 110 Q620 140 135 140 Q135 120 135 110" stroke="var(--brand-violet)" strokeWidth="2" fill="none" markerEnd="url(#cycle-arrow)" />
            <text x="380" y="155" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">선순환</text>
          </svg>
        </Figure>
        <Note label="교차점: ">
          AI(특히 컴퓨터 비전)와 반도체 검사가 만나는 자리는 <B>딥러닝 비전이 실제 산업에 박히는</B> 대표 사례다. 결함 검출,
          공정 제어, 수율 분석이 모두 이 교차점 위에 있다.
        </Note>
      </Section>

      {/* 19 */}
      <Section id="c19">
        <Kicker num="19">AI의 한계와 리스크</Kicker>
        <H2>강력하지만 만능은 아니다</H2>
        <Lead>
          AI를 제대로 안다는 건 그 한계를 아는 것이기도 하다. 과장과 공포 사이에서 균형 잡힌 시각을 갖자.
        </Lead>
        <H3>🌀 주요 한계</H3>
        <Card>
          <ul className="space-y-1.5 text-sm leading-7 text-muted-foreground">
            <li>
              · <B>환각(Hallucination)</B>: 그럴듯하지만 틀린 내용을 자신 있게 생성(11장). 사실 검증이 필수.
            </li>
            <li>
              · <B>편향(Bias)</B>: 학습 데이터에 든 사회적 편향을 그대로 학습·증폭할 수 있다.
            </li>
            <li>
              · <B>블랙박스</B>: 왜 그런 답을 냈는지 내부를 설명하기 어렵다(설명가능성 문제).
            </li>
            <li>
              · <B>데이터 의존</B>: 학습에 없던 상황엔 약하다. 데이터 품질이 곧 성능.
            </li>
            <li>
              · <B>비용·에너지</B>: 거대 모델 학습엔 막대한 전기·GPU·돈이 든다.
            </li>
          </ul>
        </Card>
        <H3>⚖️ 현실적 리스크</H3>
        <P>
          일자리 변화, 가짜 정보·딥페이크, 저작권·프라이버시, 그리고 안전·오용 문제 등이 활발히 논의된다. 기술 자체보다{' '}
          <Em>어떻게 쓰고 관리하느냐</Em>가 핵심이며, 이는 정답이 정해진 문제가 아니라 사회가 함께 풀어가는 영역이다.
        </P>
        <H3>🧭 그럼에도 분명한 것</H3>
        <P>
          한계가 있어도 AI는 이미 번역, 코딩 보조, 의료 영상 판독, <B>산업 검사</B>, 신약 탐색 등에서 실질적 가치를 낸다.
          핵심은 "AI에게 통째로 맡기기"가 아니라 <B>사람의 판단과 결합</B>하는 것이다.
        </P>
        <Callout label="균형 잡힌 태도: ">
          "AI가 다 한다"도, "AI는 허상이다"도 둘 다 틀렸다. <B>특정 작업(패턴 인식·생성)에선 초인적이지만, 진짜 이해·상식·
          책임은 아직 사람의 몫</B>이다. 도구로서 강력하되 맹신은 금물 — 이 감각이 균형 잡힌 시각이다.
        </Callout>
      </Section>

      {/* 20 */}
      <Section id="c20">
        <Kicker num="＊">핵심 용어 사전</Kicker>
        <H2>이것만 알면 AI 대화가 끊기지 않는다</H2>
        <P>자주 나오는 용어 정리. 모르는 게 나오면 여기로 돌아오자.</P>
        <Glossary
          terms={[
            { w: '머신러닝', en: 'Machine Learning', m: '데이터에서 규칙·패턴을 스스로 학습하는 기법. AI의 한 갈래.' },
            { w: '딥러닝', en: 'Deep Learning', m: '여러 층의 신경망으로 학습하는 머신러닝. 요즘 AI의 주류.' },
            { w: '신경망', en: 'Neural Network', m: '뉴런(가중합+활성화)을 층층이 연결한 모델.' },
            { w: '파라미터 / 가중치', en: 'Parameter / Weight', m: '모델이 학습으로 조정하는 "손잡이". 많을수록 표현력↑(계산량↑).' },
            { w: '손실 함수', en: 'Loss', m: '예측이 정답과 얼마나 다른지 재는 숫자. 줄이는 게 학습 목표.' },
            { w: '경사하강법', en: 'Gradient Descent', m: '손실이 줄어드는 방향으로 가중치를 조금씩 옮기는 방법.' },
            { w: '역전파', en: 'Backpropagation', m: '오차를 뒤에서 앞으로 전파해 각 가중치의 기여(기울기)를 계산.' },
            { w: '과적합 / 일반화', en: 'Overfitting / Generalization', m: '학습 데이터를 외워 새 데이터에 약해짐 / 본 적 없는 데이터에도 잘 맞히는 능력.' },
            { w: 'CNN', en: '합성곱 신경망', m: '필터로 이미지 특징을 훑는 구조. 컴퓨터 비전·결함 검출의 핵심.' },
            { w: 'RNN / 어텐션', en: 'Attention', m: '순차 데이터를 한 단계씩 처리하는 옛 구조 / 관련 깊은 부분에 더 집중하는 메커니즘.' },
            { w: '트랜스포머', en: 'Transformer', m: '어텐션 기반 구조. 현대 LLM·생성형 AI의 뼈대.' },
            { w: '토큰 / 임베딩', en: 'Token / Embedding', m: '텍스트를 자른 조각 / 그 의미를 담은 숫자 벡터.' },
            { w: 'LLM', en: '거대 언어모델', m: '방대한 텍스트로 "다음 토큰 예측"을 학습한 대형 트랜스포머. 예: GPT.' },
            { w: '사전학습 / 파인튜닝', m: '대규모로 기본기 학습 / 특정 용도·태도로 다듬기.' },
            { w: 'RLHF', m: '사람 선호 피드백으로 모델을 정렬하는 강화학습. "쓸 만한" 챗봇의 비결.' },
            { w: '환각', en: 'Hallucination', m: '그럴듯하지만 틀린 내용을 생성하는 현상. 검증 필요.' },
            { w: 'GPU / HBM', m: '병렬 연산 칩 / 그 옆의 초고속 메모리. AI 학습의 하드웨어 양대 축.' },
            { w: '컨텍스트 윈도우', en: 'Context Window', m: '모델이 한 번에 볼 수 있는 토큰의 양. "작업 기억"의 크기.' },
            { w: '프롬프트 / 퓨샷', en: 'Prompt / Few-shot', m: '모델에 주는 지시문 / 예시 몇 개로 패턴을 따르게 하는 인컨텍스트 학습.' },
            { w: 'RAG', en: '검색 증강 생성', m: '답 전에 관련 문서를 검색해 근거로 넣어주는 기법. 최신·사내 지식, 환각 완화.' },
            { w: '벡터DB', en: 'Vector DB', m: '임베딩 벡터를 의미 유사도로 검색하는 DB. RAG의 엔진.' },
            { w: '도구 사용 / 함수 호출', en: 'Tool use / Function calling', m: '모델이 검색·계산·실행 등 외부 도구를 직접 호출하는 능력. AI의 "손발".' },
            { w: 'MCP', en: 'Model Context Protocol', m: '모델과 도구·데이터를 잇는 표준 규격. "AI 도구의 USB-C".' },
            { w: '에이전트', en: 'Agent', m: '목표를 받아 스스로 계획·실행·관찰을 반복하는 AI. LLM+도구+하네스+루프.' },
            { w: '하네스 / 스캐폴딩', en: 'Harness / Scaffolding', m: '모델을 감싸 실행·재시도·안전·메모리를 통제하는 코드 골격.' },
            { w: '추론 모델', en: 'Reasoning Model', m: '답 전에 단계적으로 "생각"하는 모델(o1, o3, R1). 어려운 문제에 강함.' },
            { w: '테스트타임 컴퓨트', en: 'Test-time Compute', m: '추론(답할 때)에 계산을 더 써서 성능을 올리는 새 스케일링 축.' },
            { w: 'MoE', en: '전문가 혼합', m: '입력마다 관련 전문가 일부만 켜는 구조. 큰 용량을 적은 비용으로.' },
            { w: '양자화 / 증류', en: 'Quantization / Distillation', m: '정밀도를 낮춰 경량화 / 큰 모델의 지식을 작은 모델로 옮기기.' },
            { w: '멀티모달 / 확산모델', en: 'Multimodal / Diffusion', m: '텍스트+이미지+음성+영상을 함께 처리 / 노이즈에서 그림을 복원하는 이미지 생성.' },
          ]}
        />
        <Note label="한 호흡에 외우는 전체 흐름: ">
          AI = 데이터로 배우는 기계 → 학습은 가중치를 손실이 줄도록 조정(경사하강·역전파) → 뉴런을 쌓은 신경망, 외우지 말고
          일반화 → 이미지는 CNN, 순서는 어텐션 → 어텐션만으로 만든 트랜스포머 → 다음 단어 예측을 키운 LLM → 그 위에
          컨텍스트·RAG·도구·에이전트·추론을 쌓는 시대 → 이 모든 걸 굴리는 건 GPU·HBM(반도체). 그래서 <B>AI와 반도체는 한
          몸</B>이다.
        </Note>
      </Section>
    </NoteRoot>
  )
}
