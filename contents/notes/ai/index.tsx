export const title = 'AI 완전정복'
export const subtitle = '지식 0에서 준전공자까지 — 20장 완주'
export const description =
  '규칙 기반에서 딥러닝, 트랜스포머, LLM, 에이전트, 반도체까지. 비유와 그림으로 쌓는 AI 전체 지형도.'
export const excerpt =
  '다음 토큰 하나를 예측하는 학습을 수조 번 밀어붙였더니 번역·코딩·추론이 창발했다. 그 원리를 처음부터 끝까지.'
export const date = '2026-06-15'
export const readTime = '35 min'
export const lang = 'ko'
export const showToc = true
export const toc = [
  { id: 'c1', label: 'PART 1 — AI의 기초 발상', level: 1 },
  { id: 'c1', label: '1. AI란 무엇인가', level: 2 },
  { id: 'c2', label: '2. 머신러닝의 핵심 아이디어', level: 2 },
  { id: 'c3', label: '3. 학습의 세 가지 종류', level: 2 },
  { id: 'p2', label: 'PART 2 — 신경망의 원리', level: 1 },
  { id: 'c4', label: '4. 뉴런과 퍼셉트론', level: 2 },
  { id: 'c5', label: '5. 신경망의 구조', level: 2 },
  { id: 'c6', label: '6. 경사하강 · 역전파', level: 2 },
  { id: 'c7', label: '7. 과적합과 일반화', level: 2 },
  { id: 'p3', label: 'PART 3 — 딥러닝 아키텍처', level: 1 },
  { id: 'c8', label: '8. CNN · 이미지를 보는 신경망', level: 2 },
  { id: 'c9', label: '9. 순차 데이터와 어텐션', level: 2 },
  { id: 'c10', label: '10. 트랜스포머', level: 2 },
  { id: 'c11', label: '11. LLM과 생성형 AI', level: 2 },
  { id: 'p5', label: 'PART 5 — LLM 실전 · 최신 트렌드', level: 1 },
  { id: 't1', label: '12. 컨텍스트 · 프롬프트', level: 2 },
  { id: 't2', label: '13. RAG', level: 2 },
  { id: 't3', label: '14. 도구 사용 · MCP', level: 2 },
  { id: 't4', label: '15. 에이전트와 하네스', level: 2 },
  { id: 't5', label: '16. 추론 모델', level: 2 },
  { id: 't6', label: '17. 효율 · 멀티모달', level: 2 },
  { id: 'p6', label: 'PART 6 — 실제 세계와 산업', level: 1 },
  { id: 'c12', label: '18. AI와 반도체', level: 2 },
  { id: 'c13', label: '19. 한계와 리스크', level: 2 },
  { id: 'c14', label: '20. 핵심 용어 사전', level: 2 },
]
export const category = '노트'

export default function AIPage() {
  return (
    <div className="space-y-20 pb-8">

      {/* ── PART 1 ── */}
      <PartTag id="c1" num="PART 1">AI의 기초 발상</PartTag>

      {/* 1 */}
      <section id="c1" className="scroll-mt-20 space-y-6">
        <Kicker num="1">AI란 무엇인가</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">"규칙을 짜는 것"에서 "스스로 배우는 것"으로</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          AI를 이해하는 출발점은 딱 하나의 전환이다.{' '}
          <strong className="text-foreground">사람이 규칙을 일일이 짜주는 대신, 기계가 예시(데이터)를 보고 규칙을 스스로 찾게 한다.</strong>{' '}
          이 발상의 차이가 전부다.
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <InfoBox icon="📜" title="규칙 기반 (옛 방식)">
            사람이 "이러면 이렇게 하라"를 전부 코딩. 예: "이메일에 '당첨'이 있으면 스팸."
            예외가 많아지면 규칙이 폭발해 감당 불가.
          </InfoBox>
          <InfoBox icon="🧠" title="학습 기반 (머신러닝)">
            스팸 메일 수만 통을 보여주고 "이게 스팸이다"라고 알려주면, 기계가{' '}
            <strong>공통 패턴을 스스로</strong> 찾아낸다. 규칙을 직접 안 짠다.
          </InfoBox>
        </div>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">AI ⊃ 머신러닝 ⊃ 딥러닝 포함 관계</p>
          <svg viewBox="0 0 700 220" className="w-full h-auto" aria-label="AI 머신러닝 딥러닝 포함관계">
            <g fontFamily="sans-serif" textAnchor="middle">
              <rect x="120" y="20" width="460" height="185" rx="14" fill="none" stroke="var(--brand-violet)" strokeWidth="2"/>
              <text x="350" y="44" fill="var(--brand-violet)" fontSize="15" fontWeight="bold">인공지능 (AI)</text>
              <text x="350" y="62" fill="var(--muted-foreground)" fontSize="11">사람처럼 지적인 일을 하는 모든 기술</text>
              <rect x="180" y="74" width="340" height="120" rx="12" fill="none" stroke="var(--brand-cyan)" strokeWidth="2"/>
              <text x="350" y="96" fill="var(--brand-cyan)" fontSize="14" fontWeight="bold">머신러닝 (ML)</text>
              <text x="350" y="113" fill="var(--muted-foreground)" fontSize="11">데이터로 패턴을 학습</text>
              <rect x="245" y="124" width="210" height="58" rx="10" fill="var(--brand-emerald)" opacity=".18" stroke="var(--brand-emerald)" strokeWidth="2"/>
              <text x="350" y="150" fill="var(--brand-emerald)" fontSize="14" fontWeight="bold">딥러닝 (DL)</text>
              <text x="350" y="168" fill="var(--muted-foreground)" fontSize="11">깊은 신경망으로 학습</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">딥러닝은 머신러닝의 한 방법이고, 머신러닝은 AI의 한 갈래. 요즘 화제(ChatGPT)는 가장 안쪽 딥러닝이다.</p>
        </Card>

        <Analogy emoji="🍳">
          <strong>요리 비유.</strong> 규칙 기반은 레시피를 글자 하나까지 받아 적는 것. 머신러닝은 완성된 요리 수천 접시를 맛보며
          "이 맛을 내려면 뭘 어떻게"를 스스로 감 잡는 것. 후자는 레시피에 없던 새 재료에도 대응할 수 있다.
        </Analogy>

        <Quiz q="머신러닝이 규칙 기반과 결정적으로 다른 점은?">
          사람이 규칙을 직접 코딩하지 않고,{' '}
          <strong>데이터(예시)에서 기계가 규칙·패턴을 스스로 찾아낸다</strong>는 것.
          그래서 예외가 많고 복잡한 문제(이미지·언어)에 강하다.
        </Quiz>
      </section>

      {/* 2 */}
      <section id="c2" className="scroll-mt-20 space-y-6">
        <Kicker num="2">머신러닝의 핵심 아이디어</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">학습이란 결국 "함수의 손잡이를 맞추는 것"</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          머신러닝의 본질은 의외로 단순하다.{' '}
          <strong className="text-foreground">입력을 출력으로 바꾸는 함수를 찾되, 그 함수를 데이터에 맞게 조금씩 조정하는 것.</strong>
        </p>

        <p className="text-sm leading-7 text-muted-foreground">
          "집 크기 → 집값"을 예측한다면 가장 단순한 모델은 <em>집값 = a × 크기 + b</em>.
          여기서 <strong className="text-foreground">a와 b가 "손잡이"</strong>다. 이걸 학습으로 맞추는 것.
          GPT 같은 모델은 이 손잡이가 수천억 개일 뿐, 원리는 똑같다.
        </p>

        <Card>
          <svg viewBox="0 0 700 220" className="w-full h-auto" aria-label="데이터에 직선을 맞추는 회귀">
            <g fontFamily="sans-serif">
              <line x1="70" y1="180" x2="630" y2="180" stroke="var(--border)" strokeWidth="1.5"/>
              <line x1="70" y1="30" x2="70" y2="180" stroke="var(--border)" strokeWidth="1.5"/>
              <text x="350" y="205" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">집 크기 →</text>
              <text x="40" y="100" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle" transform="rotate(-90 40 100)">집값 →</text>
              <g fill="var(--brand-cyan)">
                <circle cx="140" cy="160" r="5"/><circle cx="210" cy="140" r="5"/><circle cx="270" cy="130" r="5"/>
                <circle cx="330" cy="110" r="5"/><circle cx="400" cy="95" r="5"/><circle cx="470" cy="78" r="5"/><circle cx="540" cy="55" r="5"/>
              </g>
              <line x1="110" y1="168" x2="580" y2="50" stroke="var(--brand-violet)" strokeWidth="3"/>
              <text x="600" y="48" fill="var(--brand-violet)" fontSize="12" textAnchor="middle">학습된 모델</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">파란 점은 실제 데이터, 보라 선은 모델. 점들에 가장 잘 맞는 선이 되도록 손잡이(a, b)를 조정하는 게 학습이다.</p>
        </Card>

        <Note label="핵심 한 줄: ">
          머신러닝 = ① 손잡이 달린 함수(모델) → ② 틀린 정도(손실)를 재서 → ③ 손실이 줄도록 손잡이를 조금씩 돌리기.
        </Note>
      </section>

      {/* 3 */}
      <section id="c3" className="scroll-mt-20 space-y-6">
        <Kicker num="3">학습의 세 가지 종류</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">정답을 주느냐, 안 주느냐, 보상을 주느냐</h2>

        <div className="grid gap-3 md:grid-cols-3">
          <InfoBox icon="🏷️" title="지도학습 (Supervised)">
            입력 + <strong>정답</strong>을 함께 줌. "이 사진은 고양이."
            이미지 분류, 스팸 필터, 가격 예측, <strong>결함 검출</strong> 등.
          </InfoBox>
          <InfoBox icon="🧩" title="비지도학습 (Unsupervised)">
            정답 없이 <strong>데이터만</strong>. 스스로 묶고 구조 발견.
            고객 군집화, 이상 탐지, 차원 축소 등.
          </InfoBox>
          <InfoBox icon="🎮" title="강화학습 (Reinforcement)">
            행동에 <strong>보상/벌점</strong>을 줌. 시행착오로 전략 학습.
            알파고, 로봇 제어, 게임 AI 등.
          </InfoBox>
        </div>

        <Analogy emoji="🚲">
          <strong>자전거로 비유.</strong> 지도학습 = 교본과 정답을 보며 배움.
          비지도학습 = 여러 자전거를 관찰해 종류를 나눔.
          강화학습 = 일단 타보고 넘어지면(벌점) 안 넘어지면(보상) 몸으로 익힘.
          ChatGPT는 지도학습 + 강화학습(사람 피드백)을 함께 쓴다(11장).
        </Analogy>

        <Quiz q="'불량 검출' AI는 보통 어떤 학습일까?">
          <strong>지도학습</strong>. "정상/불량"이 라벨링된 이미지 수천~수만 장을 보여주고 패턴을 학습시킨다.
          라벨이 부족하면 비지도(이상 탐지)를 섞기도 한다. 반도체 검사(KLA)가 정확히 이 영역이다.
        </Quiz>
      </section>

      {/* ── PART 2 ── */}
      <PartTag id="p2" num="PART 2">신경망의 원리</PartTag>

      {/* 4 */}
      <section id="c4" className="scroll-mt-20 space-y-6">
        <Kicker num="4">뉴런과 퍼셉트론</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">뇌를 흉내 낸 가장 작은 계산 단위</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          인공 뉴런 하나가 하는 일은 단순하다.{' '}
          <strong className="text-foreground">여러 입력을 가중치로 섞어 더한 뒤, 일정 기준을 넘으면 신호를 내보낸다.</strong>
        </p>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">인공 뉴런의 3단계</p>
          <svg viewBox="0 0 700 220" className="w-full h-auto" aria-label="인공 뉴런 구조">
            <g fontFamily="sans-serif" textAnchor="middle">
              <circle cx="80" cy="60" r="20" fill="var(--card)" stroke="var(--brand-cyan)"/><text x="80" y="65" fill="var(--foreground)" fontSize="13">x1</text>
              <circle cx="80" cy="120" r="20" fill="var(--card)" stroke="var(--brand-cyan)"/><text x="80" y="125" fill="var(--foreground)" fontSize="13">x2</text>
              <circle cx="80" cy="180" r="20" fill="var(--card)" stroke="var(--brand-cyan)"/><text x="80" y="185" fill="var(--foreground)" fontSize="13">x3</text>
              <line x1="100" y1="60" x2="320" y2="120" stroke="var(--brand-violet)" strokeWidth="2"/><text x="200" y="78" fill="var(--brand-violet)" fontSize="11">×w1</text>
              <line x1="100" y1="120" x2="320" y2="120" stroke="var(--brand-violet)" strokeWidth="2"/><text x="200" y="113" fill="var(--brand-violet)" fontSize="11">×w2</text>
              <line x1="100" y1="180" x2="320" y2="120" stroke="var(--brand-violet)" strokeWidth="2"/><text x="200" y="170" fill="var(--brand-violet)" fontSize="11">×w3</text>
              <circle cx="350" cy="120" r="32" fill="var(--brand-violet)" opacity=".25" stroke="var(--brand-violet)" strokeWidth="2"/>
              <text x="350" y="116" fill="var(--foreground)" fontSize="13">Σ 합산</text>
              <text x="350" y="134" fill="var(--muted-foreground)" fontSize="10">+편향</text>
              <rect x="420" y="98" width="90" height="44" rx="8" fill="var(--card)" stroke="var(--brand-emerald)"/>
              <text x="465" y="116" fill="var(--brand-emerald)" fontSize="12">활성화</text>
              <text x="465" y="132" fill="var(--muted-foreground)" fontSize="10">함수</text>
              <line x1="382" y1="120" x2="420" y2="120" stroke="var(--border)" strokeWidth="2"/>
              <line x1="510" y1="120" x2="580" y2="120" stroke="var(--border)" strokeWidth="2"/>
              <circle cx="610" cy="120" r="22" fill="var(--card)" stroke="var(--brand-emerald)"/><text x="610" y="125" fill="var(--foreground)" fontSize="13">출력</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">입력에 가중치를 곱해 더하고(Σ), 활성화 함수를 통과시켜 출력을 낸다.</p>
        </Card>

        <p className="text-sm leading-7 text-muted-foreground">
          <strong className="text-foreground">활성화 함수가 없으면</strong> 아무리 뉴런을 쌓아도 결국 직선(단순 비례)밖에 못 만든다.
          활성화 함수(예: ReLU, "음수면 0, 양수면 그대로")가 <strong className="text-foreground">비선형성(꺾임)</strong>을 넣어줘야
          곡선·복잡한 패턴을 표현할 수 있다.
        </p>

        <Analogy emoji="🚪">
          <strong>회의 결정 비유.</strong> 뉴런은 여러 의견(입력)을 중요도(가중치)대로 반영해 합산하고,
          일정 찬성선을 넘으면 "통과(발화)"시키는 의장 같다.
          가중치를 어떻게 두느냐가 곧 그 뉴런의 "판단 기준"이다.
        </Analogy>
      </section>

      {/* 5 */}
      <section id="c5" className="scroll-mt-20 space-y-6">
        <Kicker num="5">신경망의 구조</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">뉴런을 층층이 쌓으면 "깊은" 신경망</h2>

        <Card>
          <svg viewBox="0 0 700 240" className="w-full h-auto" aria-label="다층 신경망 구조">
            <g fontFamily="sans-serif" textAnchor="middle">
              <g fill="var(--brand-cyan)">
                <circle cx="100" cy="70" r="15"/><circle cx="100" cy="120" r="15"/><circle cx="100" cy="170" r="15"/>
              </g>
              <text x="100" y="215" fill="var(--brand-cyan)" fontSize="12">입력층</text>
              <g fill="var(--brand-violet)">
                <circle cx="280" cy="50" r="15"/><circle cx="280" cy="100" r="15"/><circle cx="280" cy="150" r="15"/><circle cx="280" cy="200" r="15"/>
              </g>
              <text x="280" y="232" fill="var(--brand-violet)" fontSize="12">은닉층 1</text>
              <g fill="var(--brand-violet)">
                <circle cx="440" cy="50" r="15"/><circle cx="440" cy="100" r="15"/><circle cx="440" cy="150" r="15"/><circle cx="440" cy="200" r="15"/>
              </g>
              <text x="440" y="232" fill="var(--brand-violet)" fontSize="12">은닉층 2</text>
              <g fill="var(--brand-emerald)">
                <circle cx="610" cy="100" r="15"/><circle cx="610" cy="150" r="15"/>
              </g>
              <text x="610" y="200" fill="var(--brand-emerald)" fontSize="12">출력층</text>
              <g stroke="var(--border)" strokeWidth="1">
                <line x1="115" y1="70" x2="265" y2="50"/><line x1="115" y1="70" x2="265" y2="150"/><line x1="115" y1="120" x2="265" y2="100"/><line x1="115" y1="170" x2="265" y2="200"/>
                <line x1="295" y1="100" x2="425" y2="50"/><line x1="295" y1="150" x2="425" y2="150"/><line x1="295" y1="50" x2="425" y2="100"/><line x1="295" y1="200" x2="425" y2="200"/>
                <line x1="455" y1="100" x2="595" y2="100"/><line x1="455" y1="150" x2="595" y2="150"/><line x1="455" y1="50" x2="595" y2="100"/><line x1="455" y1="200" x2="595" y2="150"/>
              </g>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">각 층의 뉴런이 다음 층과 연결된다. 정보가 왼쪽(입력)에서 오른쪽(출력)으로 흐른다.</p>
        </Card>

        <p className="text-sm leading-7 text-muted-foreground">
          이미지 인식을 예로 들면, 앞쪽 층은 <em>선·모서리</em>를, 중간 층은 <em>눈·코·바퀴</em>를, 뒤쪽 층은 <em>얼굴·자동차</em>를 잡는다.
          사람이 특징을 알려주지 않아도 <strong className="text-foreground">스스로 특징을 발견(feature learning)</strong>하는 게 딥러닝의 위력이다.
        </p>

        <Deep title="파라미터 수">
          연결선 하나하나가 가중치(파라미터)다. 작은 신경망도 수천 개, 이미지 모델은 수백만~수억 개,
          GPT-4급은 <strong>수천억~조 단위</strong>의 파라미터를 가진다.
          학습이란 이 모든 손잡이를 데이터에 맞게 동시에 조정하는 일이고, 그래서 막대한 계산(=GPU, 18장)이 필요하다.
        </Deep>
      </section>

      {/* 6 */}
      <section id="c6" className="scroll-mt-20 space-y-6">
        <Kicker num="6">학습의 원리</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">경사하강과 역전파: 손잡이를 맞추는 법</h2>

        <p className="text-sm leading-7 text-muted-foreground">
          손실을 "골짜기가 있는 지형"이라고 상상하자. 우리는 가장 낮은 곳(손실 최소)을 찾고 싶다.
          방법은 단순하다. <strong className="text-foreground">지금 서 있는 자리에서 가장 가파르게 내려가는 방향으로 한 걸음 내딛기.</strong>
          이를 반복하면 골짜기 바닥에 도달한다. 이 "내려가는 방향"을 알려주는 게 <em className="not-italic font-semibold text-foreground">기울기(gradient)</em>다.
        </p>

        <Card>
          <svg viewBox="0 0 700 200" className="w-full h-auto" aria-label="경사하강법">
            <g fontFamily="sans-serif">
              <path d="M60 40 Q200 200 350 170 Q500 145 640 40" fill="none" stroke="var(--brand-violet)" strokeWidth="2.5"/>
              <circle cx="110" cy="78" r="9" fill="var(--brand-amber)"/>
              <circle cx="180" cy="135" r="9" fill="var(--brand-amber)" opacity=".7"/>
              <circle cx="270" cy="166" r="9" fill="var(--brand-amber)" opacity=".55"/>
              <circle cx="360" cy="170" r="11" fill="var(--brand-emerald)"/>
              <text x="110" y="60" fill="var(--brand-amber)" fontSize="12" textAnchor="middle">시작(오차 큼)</text>
              <text x="360" y="195" fill="var(--brand-emerald)" fontSize="12" textAnchor="middle">목표(오차 최소)</text>
              <text x="600" y="70" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">한 걸음씩</text>
              <text x="600" y="86" fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">내려간다</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">손실 지형에서 가장 가파른 내리막으로 조금씩 이동. "한 걸음 크기"가 학습률(learning rate)이다.</p>
        </Card>

        <p className="text-sm leading-7 text-muted-foreground">
          수억 개 손잡이 각각이 "오차에 얼마나 기여했는지" 알려주는 것이 <strong className="text-foreground">역전파(Backpropagation)</strong>다.
          출력에서 생긴 오차를 뒤에서 앞으로 거꾸로 전파하며, 각 가중치가 책임져야 할 몫을 계산한다.
        </p>

        <Card>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {[
              { ico: '➡️', t: '순전파', d: '입력→예측 계산' },
              { ico: '📏', t: '손실 측정', d: '예측 vs 정답' },
              { ico: '⬅️', t: '역전파', d: '오차를 거꾸로' },
              { ico: '🔧', t: '가중치 갱신', d: '경사하강 조정' },
              { ico: '🔁', t: '반복', d: '수백만 번' },
            ].map(({ ico, t, d }, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted-foreground/50">→</span>}
                <div className="flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-3 min-w-[80px]">
                  <span className="text-xl mb-1">{ico}</span>
                  <span className="text-xs font-semibold text-foreground">{t}</span>
                  <span className="text-[10px] text-muted-foreground text-center mt-0.5">{d}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Analogy emoji="🎯">
          <strong>양궁 비유.</strong> 화살을 쏘고(순전파), 과녁에서 얼마나 빗나갔는지 보고(손실),
          "팔 각도·힘 중 무엇 때문에 빗나갔나"를 거슬러 따져(역전파),
          다음엔 그만큼 자세를 고친다(갱신). 이걸 반복하면 명중률이 오른다.
        </Analogy>
      </section>

      {/* 7 */}
      <section id="c7" className="scroll-mt-20 space-y-6">
        <Kicker num="7">과적합과 일반화</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">"외운 학생"과 "이해한 학생"의 차이</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          학습이 잘됐는지 판단하는 진짜 기준은{' '}
          <strong className="text-foreground">"본 적 없는 새 데이터를 맞히느냐"</strong>다.
          이것을 <em className="not-italic font-semibold" style={{ color: 'var(--brand-emerald)' }}>일반화(generalization)</em>라 하고,
          그 반대 함정이 <em className="not-italic font-semibold" style={{ color: 'var(--brand-amber)' }}>과적합(overfitting)</em>이다.
        </p>

        <Card>
          <svg viewBox="0 0 700 200" className="w-full h-auto" aria-label="과소적합 적정 과적합 비교">
            <g fontFamily="sans-serif" textAnchor="middle">
              <text x="120" y="24" fill="var(--brand-amber)" fontSize="13" fontWeight="bold">과소적합</text>
              <g fill="var(--brand-cyan)"><circle cx="70" cy="120" r="4"/><circle cx="100" cy="90" r="4"/><circle cx="130" cy="110" r="4"/><circle cx="160" cy="70" r="4"/></g>
              <line x1="65" y1="125" x2="170" y2="85" stroke="var(--brand-amber)" strokeWidth="2.5"/>
              <text x="120" y="165" fill="var(--muted-foreground)" fontSize="11">너무 단순</text>

              <text x="350" y="24" fill="var(--brand-emerald)" fontSize="13" fontWeight="bold">적정</text>
              <g fill="var(--brand-cyan)"><circle cx="300" cy="120" r="4"/><circle cx="330" cy="90" r="4"/><circle cx="360" cy="110" r="4"/><circle cx="390" cy="70" r="4"/></g>
              <path d="M295 122 Q345 80 395 75" fill="none" stroke="var(--brand-emerald)" strokeWidth="2.5"/>
              <text x="350" y="165" fill="var(--muted-foreground)" fontSize="11">패턴을 잡음 (좋음)</text>

              <text x="580" y="24" fill="var(--brand-amber)" fontSize="13" fontWeight="bold">과적합</text>
              <g fill="var(--brand-cyan)"><circle cx="530" cy="120" r="4"/><circle cx="560" cy="90" r="4"/><circle cx="590" cy="110" r="4"/><circle cx="620" cy="70" r="4"/></g>
              <path d="M528 120 Q545 70 560 90 Q575 115 590 110 Q608 95 620 72" fill="none" stroke="var(--brand-amber)" strokeWidth="2.5"/>
              <text x="580" y="165" fill="var(--muted-foreground)" fontSize="11">잡음까지 외움</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">왼쪽은 너무 단순, 오른쪽은 잡음까지 외운 과적합. 가운데처럼 "핵심 패턴만" 잡는 게 목표.</p>
        </Card>

        <ul className="space-y-1.5 text-sm leading-7">
          {[
            '데이터를 더 많이: 가장 확실. 다양한 예시를 보면 잡음에 덜 휘둘린다.',
            '정규화(Regularization): 손잡이가 과하게 커지지 않도록 벌점을 줘 모델을 단순하게 유지.',
            '드롭아웃(Dropout): 학습 중 뉴런 일부를 무작위로 꺼서 특정 경로에 의존하지 못하게.',
            '조기 종료: 검증 성능이 나빠지기 시작하면 학습을 멈춤.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-muted-foreground/40 shrink-0">·</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/, '<strong class="text-foreground">$1</strong>:') }} />
            </li>
          ))}
        </ul>

        <Note label="2부 요약: ">
          뉴런(가중합+활성화, 4장) → 층층이 쌓아 신경망(5장) → 경사하강·역전파로 학습(6장) → 외우지 말고 일반화(7장).
          이제 이 신경망을 "용도별로 특화한" 딥러닝 구조들로 넘어간다.
        </Note>
      </section>

      {/* ── PART 3 ── */}
      <PartTag id="p3" num="PART 3">딥러닝 아키텍처</PartTag>

      {/* 8 */}
      <section id="c8" className="scroll-mt-20 space-y-6">
        <Kicker num="8">CNN · 이미지를 보는 신경망</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">컴퓨터가 사진을 "이해하는" 방식</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          이미지·영상 분야의 혁명을 일으킨 구조가 <strong className="text-foreground">CNN</strong>(합성곱 신경망)이다.
          컴퓨터 비전·결함 검출 영역과 가장 직접 맞닿는 장이다.
        </p>

        <p className="text-sm leading-7 text-muted-foreground">
          CNN은 작은 창(필터)을 이미지 위에서 <strong className="text-foreground">미끄러뜨리며(슬라이딩)</strong> 훑는다.
          각 필터는 특정 특징, 예컨대 "세로 모서리", "둥근 곡선", "특정 질감"에 반응한다.
          같은 필터를 이미지 전체에 쓰기 때문에, <em className="not-italic font-semibold text-foreground">물체가 어디에 있든</em> 같은 특징을 찾아낸다(위치 불변성).
        </p>

        <Card>
          <svg viewBox="0 0 700 200" className="w-full h-auto" aria-label="CNN 필터가 이미지를 훑는 모습">
            <g fontFamily="sans-serif" textAnchor="middle">
              <g stroke="var(--border)" fill="var(--card)">
                <rect x="60" y="40" width="120" height="120"/>
              </g>
              <g stroke="var(--border)" strokeWidth="1">
                <line x1="90" y1="40" x2="90" y2="160"/><line x1="120" y1="40" x2="120" y2="160"/><line x1="150" y1="40" x2="150" y2="160"/>
                <line x1="60" y1="70" x2="180" y2="70"/><line x1="60" y1="100" x2="180" y2="100"/><line x1="60" y1="130" x2="180" y2="130"/>
              </g>
              <rect x="60" y="40" width="60" height="60" fill="none" stroke="var(--brand-amber)" strokeWidth="3"/>
              <text x="120" y="180" fill="var(--muted-foreground)" fontSize="11">입력 이미지(픽셀)</text>
              <text x="90" y="32" fill="var(--brand-amber)" fontSize="11">필터(창)</text>
              <text x="250" y="105" fill="var(--brand-violet)" fontSize="22">→</text>
              <rect x="300" y="55" width="90" height="90" fill="var(--brand-violet)" opacity=".2" stroke="var(--brand-violet)"/>
              <text x="345" y="165" fill="var(--muted-foreground)" fontSize="11">특징 지도</text>
              <text x="430" y="105" fill="var(--brand-violet)" fontSize="22">→</text>
              <rect x="475" y="70" width="60" height="60" fill="var(--brand-emerald)" opacity=".2" stroke="var(--brand-emerald)"/>
              <text x="505" y="150" fill="var(--muted-foreground)" fontSize="11">더 추상적</text>
              <text x="575" y="105" fill="var(--brand-violet)" fontSize="22">→</text>
              <rect x="615" y="88" width="50" height="24" rx="5" fill="var(--card)" stroke="var(--brand-emerald)"/>
              <text x="640" y="104" fill="var(--foreground)" fontSize="11">"고양이"</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">필터로 특징을 뽑고(합성곱), 요약하고(풀링), 깊어질수록 추상적 개념으로. 마지막에 분류 결과.</p>
        </Card>

        <Note label="너의 영역: ">
          반도체 <strong>결함 검출</strong>은 전형적인 CNN 문제다. "정상 패턴 이미지"를 학습한 모델이 미세한 이상(긁힘·이물질)을 찾아낸다.
          3D 비전, KLA/ICOS의 검사 소프트웨어가 모두 이 계열이다.
          최근엔 이상 탐지·세그멘테이션·트랜스포머 기반 비전(ViT)도 함께 쓰인다.
        </Note>

        <Quiz q="CNN이 일반 신경망보다 이미지에 강한 이유는?">
          작은 필터를 이미지 전체에 공유해 훑기 때문에 ① 파라미터가 적어 효율적이고
          ② 물체 위치가 바뀌어도 같은 특징을 잡는 <strong>위치 불변성</strong>을 갖는다.
          또 층이 깊어지며 단순→복잡 특징을 계층적으로 학습한다.
        </Quiz>
      </section>

      {/* 9 */}
      <section id="c9" className="scroll-mt-20 space-y-6">
        <Kicker num="9">순차 데이터와 어텐션</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">문장처럼 "순서가 있는" 데이터 다루기</h2>

        <p className="text-sm leading-7 text-muted-foreground">
          초기 방식인 <strong className="text-foreground">RNN</strong>은 단어를 하나씩 읽으며 "지금까지의 요약"을 다음 단계로 넘긴다.
          하지만 두 가지 한계가 있었다.
        </p>

        <ul className="space-y-1.5 text-sm leading-7">
          {[
            '긴 의존성에 약함: 문장이 길어지면 앞부분 기억이 희미해진다(장기 의존성 문제).',
            '순차 처리라 느림: 한 단어씩 차례로만 처리 가능 → 병렬화가 어려워 대규모 학습에 불리.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-muted-foreground/40 shrink-0">·</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/, '<strong class="text-foreground">$1</strong>:') }} />
            </li>
          ))}
        </ul>

        <p className="text-sm leading-7 text-muted-foreground">
          돌파구가 <strong className="text-foreground">어텐션(Attention)</strong>이었다.
          한 단어를 해석할 때 문장의 <em className="not-italic font-semibold text-foreground">모든 단어를 한꺼번에 보되, 관련 깊은 단어에 더 큰 가중치</em>를 둔다.
        </p>

        <Card>
          <svg viewBox="0 0 700 170" className="w-full h-auto" aria-label="어텐션: 단어 간 연결 가중치">
            <g fontFamily="sans-serif" textAnchor="middle">
              <g fontSize="13" fill="var(--foreground)">
                <rect x="60" y="70" width="70" height="30" rx="6" fill="var(--card)" stroke="var(--border)"/><text x="95" y="90">그 동물은</text>
                <rect x="150" y="70" width="60" height="30" rx="6" fill="var(--card)" stroke="var(--border)"/><text x="180" y="90">길을</text>
                <rect x="230" y="70" width="90" height="30" rx="6" fill="var(--card)" stroke="var(--border)"/><text x="275" y="90">못 건넜다</text>
                <rect x="340" y="70" width="60" height="30" rx="6" fill="var(--brand-violet)" opacity=".4" stroke="var(--brand-violet)"/><text x="370" y="90">피곤</text>
                <rect x="420" y="70" width="70" height="30" rx="6" fill="var(--card)" stroke="var(--border)"/><text x="455" y="90">때문에</text>
              </g>
              <path d="M360 70 Q230 20 95 70" fill="none" stroke="var(--brand-cyan)" strokeWidth="3"/>
              <path d="M375 70 Q420 35 455 70" fill="none" stroke="var(--border)" strokeWidth="1.5"/>
              <text x="230" y="30" fill="var(--brand-cyan)" fontSize="12">강한 주목 (피곤 ↔ 동물)</text>
              <text x="370" y="135" fill="var(--muted-foreground)" fontSize="11">이 단어를 해석할 때</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">"피곤"을 해석할 때 어텐션은 멀리 떨어진 "동물"에 강하게 주목한다. 거리와 무관하게 관련 단어를 직접 연결.</p>
        </Card>

        <Note label="왜 결정적인가: ">
          어텐션은 ① 멀리 떨어진 단어도 직접 연결해 <strong>장기 의존성</strong>을 풀고
          ② 모든 단어를 동시에 볼 수 있어 <strong>병렬 처리</strong>가 가능하다.
          이 두 장점이 다음 장 트랜스포머의 폭발력을 만든다(그리고 병렬 처리는 GPU와 완벽히 맞는다, 18장).
        </Note>
      </section>

      {/* 10 */}
      <section id="c10" className="scroll-mt-20 space-y-6">
        <Kicker num="10">트랜스포머</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">"Attention Is All You Need" · 현대 AI의 엔진</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          2017년 등장한 <strong className="text-foreground">트랜스포머</strong>는 RNN을 버리고 <em>오직 어텐션만으로</em> 순차 데이터를 처리했다.
          ChatGPT의 "GPT"가 바로 Generative Pre-trained <strong>Transformer</strong>다.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <InfoBox icon="🧬" title="셀프 어텐션">
            문장 안의 <strong>모든 단어가 모든 단어를 서로 본다</strong>. 한 번에 전체를 조망해 길고 복잡한 문맥도 잘 잡는다.
          </InfoBox>
          <InfoBox icon="🔢" title="토큰 임베딩">
            각 단어(토큰)를 의미를 담은 <strong>숫자 벡터</strong>로 바꾼다.
            비슷한 의미의 단어가 벡터 공간에서 가까이 모인다.
          </InfoBox>
          <InfoBox icon="⚡" title="완전 병렬 처리">
            단어를 한꺼번에 처리하므로 GPU로 <strong>대규모 병렬 학습</strong>이 가능.
            이 덕분에 인터넷 전체급 데이터로 거대 모델을 학습할 수 있게 됐다.
          </InfoBox>
        </div>

        <Card>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {[
              { ico: '✂️', t: '토큰화', d: '문장→단어조각' },
              { ico: '🔢', t: '임베딩', d: '토큰→의미 벡터' },
              { ico: '👁️', t: '셀프 어텐션', d: '단어끼리 문맥' },
              { ico: '🧠', t: '여러 층 반복', d: '의미를 정교화' },
              { ico: '🎯', t: '출력', d: '다음 단어 예측' },
            ].map(({ ico, t, d }, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted-foreground/50">→</span>}
                <div className="flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-3 min-w-[80px]">
                  <span className="text-xl mb-1">{ico}</span>
                  <span className="text-xs font-semibold text-foreground">{t}</span>
                  <span className="text-[10px] text-muted-foreground text-center mt-0.5">{d}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Analogy emoji="🗣️">
          <strong>회의실 비유.</strong> RNN은 한 명씩 차례로 귓속말로 전달하는 릴레이(뒤로 갈수록 내용이 변질).
          트랜스포머는 모두가 한 테이블에 앉아 <em>동시에 서로를 보며</em> 누가 핵심인지 가늠하는 원탁회의.
          더 정확하고 빠르다.
        </Analogy>

        <Deep title="멀티헤드 어텐션">
          트랜스포머는 어텐션을 <strong>여러 개(멀티헤드)</strong> 병렬로 둬서,
          한 헤드는 문법 관계를, 다른 헤드는 의미 관계를 보는 식으로 다양한 관점을 동시에 학습한다.
          이런 층(어텐션+피드포워드)을 수십~수백 겹 쌓은 것이 GPT 같은 모델의 실체다.
        </Deep>
      </section>

      {/* 11 */}
      <section id="c11" className="scroll-mt-20 space-y-6">
        <Kicker num="11">LLM과 생성형 AI</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">ChatGPT는 결국 "다음 단어 맞히기"다</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          놀랍게도, 거대 언어모델(LLM)의 핵심 능력은 단 하나에서 나온다.{' '}
          <strong className="text-foreground">"지금까지의 글 다음에 올 단어를 예측하기."</strong>{' '}
          이 단순한 목표를 어마어마한 규모로 밀어붙였더니 번역·요약·코딩·추론까지 창발했다.
        </p>

        <Card>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {[
              { ico: '🌐', t: '사전학습', d: '방대한 텍스트로 다음단어 예측' },
              { ico: '📝', t: '지시 미세조정', d: '질문-답변 예시 학습' },
              { ico: '👍', t: 'RLHF', d: '사람 선호로 다듬기' },
              { ico: '💬', t: '완성', d: '대화형 AI' },
            ].map(({ ico, t, d }, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted-foreground/50">→</span>}
                <div className="flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-3 min-w-[80px]">
                  <span className="text-xl mb-1">{ico}</span>
                  <span className="text-xs font-semibold text-foreground">{t}</span>
                  <span className="text-[10px] text-muted-foreground text-center mt-0.5">{d}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-sm leading-7 text-muted-foreground">
          답을 한 번에 쓰는 게 아니라, <strong className="text-foreground">토큰을 하나씩 차례로</strong> 생성한다.
          매 순간 "다음에 올 가장 그럴듯한 토큰"을 확률로 뽑고, 그걸 붙여 또 다음 토큰을 뽑는다.
          약간의 무작위성(temperature)을 줘서 매번 조금씩 다른 답이 나온다.
        </p>

        <Callout label="중요한 직관: ">
          LLM은 사실을 "검색"하는 게 아니라{' '}
          <strong>그럴듯한 다음 말을 확률로 생성</strong>한다. 그래서 모르는 것도 자신 있게 지어내는{' '}
          <em className="not-italic font-semibold">환각(hallucination)</em>이 생긴다(19장).
          강력하지만 "확률적 글쓰기 기계"라는 본질을 기억하면 한계도 이해된다.
        </Callout>

        <Quiz q="ChatGPT가 가끔 틀린 사실을 자신 있게 말하는 근본 이유는?">
          사실 데이터베이스를 조회하는 게 아니라 <strong>"통계적으로 그럴듯한 다음 토큰"을 생성</strong>하기 때문.
          그럴듯함과 사실 여부는 다르므로, 근거 없이도 매끄러운 거짓(환각)을 만들 수 있다.
          그래서 중요한 정보는 항상 검증이 필요하다.
        </Quiz>
      </section>

      {/* ── PART 5 ── */}
      <PartTag id="p5" num="PART 5">LLM 실전 · 최신 트렌드</PartTag>

      {/* 12 = t1 */}
      <section id="t1" className="scroll-mt-20 space-y-6">
        <Kicker num="12">컨텍스트 · 프롬프트 · 인컨텍스트 학습</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">모델의 "작업 기억"을 다루는 법</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          LLM은 입력을 토큰으로 쪼개 처리한다(10장). 한 번에 읽고 기억할 수 있는 토큰 수의 한계가{' '}
          <strong className="text-foreground">컨텍스트 윈도우</strong>다.
          초기엔 수천 토큰이었지만, 최신 모델은{' '}
          <span className="font-bold" style={{ color: 'var(--brand-cyan)' }}>수십만~수백만 토큰</span>(책 여러 권 분량)까지 본다.
        </p>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">프롬프트 기법</p>
          <div className="divide-y divide-border/40">
            {[
              { k: '제로샷 (Zero-shot)', v: '예시 없이 그냥 지시. "이 문장 감정 분류해줘."' },
              { k: '퓨샷 (Few-shot)', v: '예시 몇 개를 보여주고 시킴. "좋다→긍정, 싫다→부정. 그럼 \'별로다\'는?"' },
              { k: '시스템 프롬프트', v: '대화 전체의 규칙·역할 설정. "너는 친절한 비서다."' },
            ].map(({ k, v }) => (
              <div key={k} className="py-3 grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4 text-sm">
                <span className="font-semibold text-foreground">{k}</span>
                <span className="text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Analogy emoji="🧠">
          <strong>책상 비유.</strong> 컨텍스트 윈도우는 펼쳐놓을 수 있는 책상 크기다.
          작으면 자료를 조금만, 크면 많이 올려둘 수 있다.
          하지만 책상이 너무 넓어도 자료가 흩어지면 못 찾는다.
          그래서 "무엇을 책상에 올릴지" 고르는 게 핵심 기술이다.
        </Analogy>

        <Note label="왜 트렌드의 출발점인가: ">
          RAG, 도구 사용, 에이전트, 추론까지 <strong>"컨텍스트에 무엇을, 어떻게 넣느냐"의 싸움</strong>이다.
          모델을 더 똑똑하게 만드는 것에서 그 주변(컨텍스트·도구·루프)을 엔지니어링하는 것으로 무게중심이 옮겨간 것이 2025~2026년 AI 실무의 핵심이다.
        </Note>
      </section>

      {/* 13 = t2 */}
      <section id="t2" className="scroll-mt-20 space-y-6">
        <Kicker num="13">RAG · 검색 증강 생성</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">모델에게 "커닝 페이퍼"를 쥐여주기</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          LLM의 약점은 ① 학습 시점 이후를 모르고 ② 회사 내부 문서가 없으며 ③ 모르면 지어낸다는 것.
          이를 한 방에 푸는 대표 기술이{' '}
          <strong className="text-foreground">RAG</strong>(Retrieval-Augmented Generation, 검색 증강 생성)다.
          요즘 기업 AI의 거의 표준.
        </p>

        <p className="text-sm leading-7 text-muted-foreground">
          질문이 오면 모델이 바로 답하는 게 아니라, 먼저{' '}
          <strong className="text-foreground">관련 문서를 검색</strong>해서 그 내용을 컨텍스트에 넣고, 그걸 근거로 답하게 한다.
          RAG는 문서와 질문을 모두{' '}
          <span className="font-semibold" style={{ color: 'var(--brand-violet)' }}>임베딩(벡터)</span>으로 바꾸고,
          <strong className="text-foreground">벡터 데이터베이스</strong>에서 의미가 가까운 조각을 찾는다.
        </p>

        <Card>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {[
              { ico: '❓', t: '질문', d: '사용자 입력' },
              { ico: '🔢', t: '임베딩', d: '질문→의미 벡터' },
              { ico: '🗄️', t: '벡터 검색', d: '관련 문서 조각' },
              { ico: '📎', t: '컨텍스트 첨부', d: '근거를 프롬프트에' },
              { ico: '💬', t: '근거 기반 생성', d: '출처 포함 답변' },
            ].map(({ ico, t, d }, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted-foreground/50">→</span>}
                <div className="flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-3 min-w-[70px]">
                  <span className="text-xl mb-1">{ico}</span>
                  <span className="text-xs font-semibold text-foreground">{t}</span>
                  <span className="text-[10px] text-muted-foreground text-center mt-0.5">{d}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <ul className="space-y-1.5 text-sm leading-7">
          {[
            '청킹(Chunking): 긴 문서를 검색하기 좋은 작은 조각으로 나누는 것. 조각 크기가 품질을 좌우.',
            '리랭킹(Re-ranking): 검색된 후보를 한 번 더 정밀하게 점수 매겨 정렬.',
            '하이브리드 검색: 의미 기반(벡터) + 키워드 기반(BM25)을 섞어 정확도↑.',
            '에이전틱 RAG: 모델이 "검색이 더 필요한가?"를 스스로 판단하며 반복 검색(15장 에이전트와 연결).',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-muted-foreground/40 shrink-0">·</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/, '<strong class="text-foreground">$1</strong>:') }} />
            </li>
          ))}
        </ul>

        <Callout label="RAG vs 파인튜닝 vs 프롬프트: ">
          새 지식을 주입할 땐 보통 <strong>RAG</strong>(정보가 자주 바뀌거나 출처 필요),
          말투·형식을 바꿀 땐 <strong>파인튜닝</strong>, 간단한 조정은 <strong>프롬프트</strong>.
          셋은 경쟁이 아니라 상황별 도구다.
        </Callout>
      </section>

      {/* 14 = t3 */}
      <section id="t3" className="scroll-mt-20 space-y-6">
        <Kicker num="14">도구 사용 · 함수 호출 · MCP</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">말만 하던 AI가 "행동"하기 시작하다</h2>

        <p className="text-sm leading-7 text-muted-foreground">
          LLM은 본래 텍스트만 생성한다. 계산도 틀리고, 오늘 날씨도 모르고, 실제로 실행하지도 못한다.
          이 벽을 깬 것이 <strong className="text-foreground">도구 사용(tool use)</strong>이다.
        </p>

        <p className="text-sm leading-7 text-muted-foreground">
          모델이 "내가 직접 답하는 대신 <em className="not-italic font-semibold text-foreground">이 도구를 이렇게 써야겠다</em>"고 판단해,
          정해진 형식으로 도구를 호출하는 능력이 <strong className="text-foreground">함수 호출(Function Calling)</strong>이다.
        </p>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {[
            { ico: '🧮', t: '계산기·코드', d: '틀리기 쉬운 계산을 직접 실행해 정확히.' },
            { ico: '🌐', t: '웹 검색', d: '학습 이후의 최신 정보를 가져옴.' },
            { ico: '🗂️', t: '데이터베이스·API', d: '사내 시스템·외부 서비스와 연동.' },
            { ico: '💾', t: '파일·메모리', d: '읽고 쓰고 기억을 저장.' },
          ].map(({ ico, t, d }) => (
            <InfoBox key={t} icon={ico} title={t}>{d}</InfoBox>
          ))}
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          도구마다 연결 방식이 제각각이면 매번 새로 붙여야 한다. 이를 표준화한 것이{' '}
          <span className="font-bold" style={{ color: 'var(--brand-cyan)' }}>MCP</span>(Model Context Protocol)다.
          모델과 도구·데이터를 잇는 <em className="not-italic font-semibold text-foreground">공통 규격</em>으로,
          비유하면 기기마다 다르던 충전 단자를 <strong className="text-foreground">USB-C 하나로 통일</strong>한 것.
        </p>

        <Card>
          <svg viewBox="0 0 700 170" className="w-full h-auto" aria-label="MCP가 모델과 여러 도구를 표준으로 연결">
            <g fontFamily="sans-serif" textAnchor="middle">
              <rect x="290" y="20" width="120" height="42" rx="10" fill="var(--brand-violet)" opacity=".3" stroke="var(--brand-violet)"/>
              <text x="350" y="46" fill="var(--brand-violet)" fontSize="14" fontWeight="bold">LLM</text>
              <rect x="300" y="78" width="100" height="26" rx="7" fill="var(--brand-cyan)" opacity=".2" stroke="var(--brand-cyan)"/>
              <text x="350" y="96" fill="var(--brand-cyan)" fontSize="12" fontWeight="bold">MCP 표준</text>
              <line x1="350" y1="62" x2="350" y2="78" stroke="var(--border)" strokeWidth="2"/>
              <g fontSize="11" fill="var(--foreground)">
                <rect x="70" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)"/><text x="120" y="148">웹 검색</text>
                <rect x="190" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)"/><text x="240" y="148">데이터베이스</text>
                <rect x="310" y="128" width="80" height="30" rx="7" fill="var(--card)" stroke="var(--border)"/><text x="350" y="148">코드 실행</text>
                <rect x="410" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)"/><text x="460" y="148">파일/메모리</text>
                <rect x="530" y="128" width="100" height="30" rx="7" fill="var(--card)" stroke="var(--border)"/><text x="580" y="148">외부 API</text>
              </g>
              <g stroke="var(--border)" strokeWidth="1.5">
                <line x1="330" y1="104" x2="120" y2="128"/><line x1="340" y1="104" x2="240" y2="128"/>
                <line x1="350" y1="104" x2="350" y2="128"/><line x1="360" y1="104" x2="460" y2="128"/><line x1="370" y1="104" x2="580" y2="128"/>
              </g>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">MCP라는 공통 규격 하나로 모델이 수많은 도구·데이터에 표준 방식으로 연결된다.</p>
        </Card>

        <Note label="의미: ">
          도구 사용으로 LLM은 "말하는 기계"에서 <strong>"일하는 기계"</strong>로 바뀌었다.
          이 능력이 다음 장의 "에이전트"를 가능하게 한다.
        </Note>
      </section>

      {/* 15 = t4 */}
      <section id="t4" className="scroll-mt-20 space-y-6">
        <Kicker num="15">AI 에이전트와 하네스</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">스스로 계획하고 실행하는 AI</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          2025~2026년 AI의 최대 키워드는 단연 <strong className="text-foreground">에이전트(Agent)</strong>다.
          목표를 받아 <em>스스로 계획을 세우고 도구를 써가며 여러 단계를 실행</em>하는 AI.
        </p>

        <Card>
          <svg viewBox="0 0 700 180" className="w-full h-auto" aria-label="에이전트 루프: 계획 실행 관찰 반복">
            <g fontFamily="sans-serif" textAnchor="middle">
              <circle cx="160" cy="90" r="42" fill="var(--brand-violet)" opacity=".2" stroke="var(--brand-violet)" strokeWidth="2"/>
              <text x="160" y="86" fill="var(--brand-violet)" fontSize="13" fontWeight="bold">계획</text>
              <text x="160" y="103" fill="var(--muted-foreground)" fontSize="10">Plan</text>
              <circle cx="350" cy="90" r="42" fill="var(--brand-cyan)" opacity=".15" stroke="var(--brand-cyan)" strokeWidth="2"/>
              <text x="350" y="86" fill="var(--brand-cyan)" fontSize="13" fontWeight="bold">실행</text>
              <text x="350" y="103" fill="var(--muted-foreground)" fontSize="10">Act(도구)</text>
              <circle cx="540" cy="90" r="42" fill="var(--brand-emerald)" opacity=".15" stroke="var(--brand-emerald)" strokeWidth="2"/>
              <text x="540" y="86" fill="var(--brand-emerald)" fontSize="13" fontWeight="bold">관찰</text>
              <text x="540" y="103" fill="var(--muted-foreground)" fontSize="10">Observe</text>
              <defs>
                <marker id="aa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 z" fill="var(--muted-foreground)"/>
                </marker>
              </defs>
              <path d="M202 90 L308 90" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#aa)"/>
              <path d="M392 90 L498 90" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#aa)"/>
              <path d="M540 132 Q540 165 160 165 Q160 140 160 132" stroke="var(--brand-violet)" strokeWidth="2" fill="none" strokeDasharray="5 4" markerEnd="url(#aa)"/>
              <text x="350" y="158" fill="var(--muted-foreground)" fontSize="11">목표 달성까지 반복</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">에이전트는 이 루프를 자율적으로 돌린다. 계획하고, 도구로 실행하고, 결과를 보고, 다시 조정한다.</p>
        </Card>

        <p className="text-sm leading-7 text-muted-foreground">
          똑똑한 모델 하나만으론 신뢰할 수 있는 에이전트가 안 된다. 모델은 실수하고, 무한 루프에 빠지고, 위험한 행동을 할 수 있다.
          그래서 모델 <em className="not-italic font-semibold text-foreground">바깥</em>에 이를 통제하는 코드 골격을 두는데, 이것을{' '}
          <span className="font-bold" style={{ color: 'var(--brand-cyan)' }}>하네스(harness)</span> 또는 <strong className="text-foreground">스캐폴딩(scaffolding)</strong>이라 한다.
        </p>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">하네스가 맡는 일</p>
          <div className="divide-y divide-border/40">
            {[
              { k: '실행 제어', v: '도구를 안전하게 호출, 권한·한도 관리' },
              { k: '재시도·검증', v: '결과를 확인하고 틀리면 다시 시도' },
              { k: '메모리', v: '긴 작업의 진행 상황·과거 결과를 기억' },
              { k: '오케스트레이션', v: '여러 단계·여러 에이전트를 조율' },
            ].map(({ k, v }) => (
              <div key={k} className="py-3 grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4 text-sm">
                <span className="font-semibold text-foreground">{k}</span>
                <span className="text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Note label="한 줄 정리: ">
          에이전트 = <strong>LLM(두뇌) + 도구(손발) + 하네스(골격·통제) + 루프(반복)</strong>.
          "모델을 더 똑똑하게"에서 "<em>모델 주변을 잘 설계해서</em> 실수 없이 일을 끝내게"로 무게중심이 옮겨간 것이 2026년의 큰 흐름이다.
        </Note>
      </section>

      {/* 16 = t5 */}
      <section id="t5" className="scroll-mt-20 space-y-6">
        <Kicker num="16">추론 모델 · 테스트타임 컴퓨트</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">"생각할 시간"을 주면 더 똑똑해진다</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          2025년 AI의 가장 큰 패러다임 전환. 모델을 더 크게 키우는 대신,{' '}
          <strong className="text-foreground">답하기 전에 더 오래 "생각"하게</strong> 만들어 성능을 끌어올리는 길이 열렸다.
        </p>

        <Card>
          <svg viewBox="0 0 700 150" className="w-full h-auto" aria-label="일반 모델 vs 추론 모델">
            <g fontFamily="sans-serif">
              <text x="60" y="45" fill="var(--muted-foreground)" fontSize="13" fontWeight="bold">일반 LLM</text>
              <rect x="60" y="58" width="90" height="30" rx="6" fill="var(--card)" stroke="var(--border)"/><text x="105" y="78" fill="var(--foreground)" fontSize="12" textAnchor="middle">질문</text>
              <text x="170" y="78" fill="var(--brand-violet)" fontSize="18">→</text>
              <rect x="195" y="58" width="90" height="30" rx="6" fill="var(--brand-emerald)" opacity=".25" stroke="var(--brand-emerald)"/><text x="240" y="78" fill="var(--foreground)" fontSize="12" textAnchor="middle">즉답</text>
              <text x="300" y="78" fill="var(--muted-foreground)" fontSize="11">빠르지만 실수 가능</text>

              <text x="60" y="118" fill="var(--brand-violet)" fontSize="13" fontWeight="bold">추론 모델</text>
              <rect x="60" y="100" width="70" height="26" rx="6" fill="var(--card)" stroke="var(--border)"/><text x="95" y="117" fill="var(--foreground)" fontSize="11" textAnchor="middle">질문</text>
              <text x="135" y="117" fill="var(--brand-violet)" fontSize="16">→</text>
              <rect x="155" y="100" width="200" height="26" rx="6" fill="var(--brand-violet)" opacity=".25" stroke="var(--brand-violet)"/><text x="255" y="117" fill="var(--foreground)" fontSize="11" textAnchor="middle">속으로 단계별 추론(길게)</text>
              <text x="360" y="117" fill="var(--brand-violet)" fontSize="16">→</text>
              <rect x="382" y="100" width="80" height="26" rx="6" fill="var(--brand-emerald)" opacity=".25" stroke="var(--brand-emerald)"/><text x="422" y="117" fill="var(--foreground)" fontSize="11" textAnchor="middle">답</text>
              <text x="478" y="117" fill="var(--muted-foreground)" fontSize="11">느리지만 정확</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">추론 모델은 답 전에 "생각하는 시간"을 길게 쓴다. 어려운 문제에 강하다.</p>
        </Card>

        <ul className="space-y-1.5 text-sm leading-7">
          {[
            'OpenAI o1 (2024) → o3: 추론에 특화한 첫 상용 모델 계열. 수학·코딩·과학에서 도약.',
            'DeepSeek R1 (2025년 1월): 순수 강화학습만으로 o1급 추론을 달성하고 오픈소스로 공개해 충격. 비용도 크게 낮춤.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-muted-foreground/40 shrink-0">·</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/, '<strong class="text-foreground">$1</strong>:') }} />
            </li>
          ))}
        </ul>

        <Callout label="왜 큰 전환인가: ">
          그동안 발전은 "모델·데이터를 키우는 사전학습 스케일링"이 주도했다.
          추론 모델은 <strong>"추론 때 계산을 더 쓰는" 새 축</strong>을 열었다.
          이는 곧 <em className="not-italic font-semibold text-foreground">AI가 더 많은 반도체(GPU)를 먹는다</em>는 뜻이라,
          반도체 수요를 다시 한번 밀어 올린다.
        </Callout>
      </section>

      {/* 17 = t6 */}
      <section id="t6" className="scroll-mt-20 space-y-6">
        <Kicker num="17">효율 · 아키텍처 · 멀티모달</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">더 싸게, 더 작게, 더 다양하게</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <InfoBox icon="🧩" title="MoE (Mixture of Experts)">
            모델 안에 여러 <strong>"전문가" 서브네트워크</strong>를 두고, 입력마다 관련 있는 일부 전문가만 켠다.
            큰 용량의 지능을 <strong>작은 비용으로</strong> 쓴다.
          </InfoBox>
          <InfoBox icon="🎨" title="멀티모달 (Multimodal)">
            이제 AI는 <strong>이미지·음성·영상·문서를 함께</strong> 이해하고 생성한다.
            트랜스포머가 "모든 것을 토큰(숫자)으로" 다루기에 가능한 일.
          </InfoBox>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <InfoBox icon="📉" title="양자화 (Quantization)">
            가중치 숫자의 정밀도를 낮춰(예: 32비트→4비트) 모델 크기·연산을 확 줄인다.
            약간의 정확도 손실로 큰 효율.
          </InfoBox>
          <InfoBox icon="🎓" title="증류 (Distillation)">
            크고 똑똑한 "선생 모델"의 행동을 작은 "학생 모델"이 따라 배워,
            작지만 쓸 만한 모델을 만든다. 폰에서 돌릴 AI의 비결.
          </InfoBox>
        </div>

        <Note label="5부 요약: ">
          컨텍스트(12) → RAG 검색(13) → 도구·MCP(14) → 에이전트·하네스(15) → 추론 모델(16) → 효율·멀티모달(17).
          공통 주제는 <strong>"모델 자체보다 그 주변 시스템을 설계하는 시대"</strong>다.
          이 모든 것이 더 많은 연산, 즉 반도체로 이어진다.
        </Note>
      </section>

      {/* ── PART 6 ── */}
      <PartTag id="p6" num="PART 6">실제 세계와 산업</PartTag>

      {/* 18 */}
      <section id="c12" className="scroll-mt-20 space-y-6">
        <Kicker num="18">AI와 반도체</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">왜 AI 혁명은 곧 반도체 혁명인가</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          AI의 발전은 알고리즘만의 이야기가 아니다.{' '}
          <strong className="text-foreground">그것을 굴릴 하드웨어(반도체)가 없으면 한 줄도 학습 못 한다.</strong>
        </p>

        <p className="text-sm leading-7 text-muted-foreground">
          신경망의 "입력×가중치 합산"(4장)은 수학적으로 <strong className="text-foreground">행렬 곱셈</strong>이다.
          층마다, 데이터마다 이 곱셈이 수십억 번 일어난다.
          즉 딥러닝 = <em className="not-italic font-semibold text-foreground">"같은 단순 계산을 천문학적으로 많이, 동시에"</em>.
          이건 <strong className="text-foreground">GPU가 가장 잘하는 일</strong> 그 자체다.
        </p>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">AI를 돌리는 칩들</p>
          <div className="divide-y divide-border/40">
            {[
              { k: 'GPU', v: '단순 코어 수천 개로 병렬 행렬연산. AI 학습의 표준 (엔비디아 지배).' },
              { k: 'TPU·NPU', v: 'AI 연산만을 위해 설계한 전용칩(구글 TPU, 스마트폰 NPU 등).' },
              { k: 'HBM', v: 'GPU 옆에 쌓아 붙인 초고속 메모리. 데이터를 빠르게 공급 (삼성·SK하이닉스).' },
            ].map(({ k, v }) => (
              <div key={k} className="py-3 grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4 text-sm">
                <span className="font-semibold text-foreground">{k}</span>
                <span className="text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-sm leading-7 text-muted-foreground">
          반도체의 <strong className="text-foreground">메모리 월</strong>이 AI에서 특히 심각하다.
          모델이 거대해 가중치·데이터를 메모리에서 GPU로 끝없이 날라야 하는데, 그 통로가 좁으면 비싼 GPU가 논다.
          그래서 <span className="font-bold" style={{ color: 'var(--brand-cyan)' }}>HBM</span>(고대역폭 메모리)이 AI 시대의 핵심 부품이 됐다.
        </p>

        <Card>
          <svg viewBox="0 0 700 160" className="w-full h-auto" aria-label="AI와 반도체의 순환">
            <g fontFamily="sans-serif" textAnchor="middle">
              <rect x="60" y="55" width="150" height="50" rx="10" fill="var(--brand-violet)" opacity=".25" stroke="var(--brand-violet)"/>
              <text x="135" y="78" fill="var(--brand-violet)" fontSize="13" fontWeight="bold">AI 수요 폭증</text>
              <text x="135" y="95" fill="var(--muted-foreground)" fontSize="10">더 큰 모델</text>
              <defs>
                <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 z" fill="var(--muted-foreground)"/>
                </marker>
              </defs>
              <path d="M215 70 L300 70" stroke="var(--border)" strokeWidth="2" markerEnd="url(#ah)"/>
              <rect x="305" y="55" width="160" height="50" rx="10" fill="var(--brand-cyan)" opacity=".2" stroke="var(--brand-cyan)"/>
              <text x="385" y="78" fill="var(--brand-cyan)" fontSize="13" fontWeight="bold">반도체 수요↑</text>
              <text x="385" y="95" fill="var(--muted-foreground)" fontSize="10">GPU·HBM·검사장비</text>
              <path d="M470 70 L555 70" stroke="var(--border)" strokeWidth="2" markerEnd="url(#ah)"/>
              <rect x="560" y="55" width="120" height="50" rx="10" fill="var(--brand-emerald)" opacity=".2" stroke="var(--brand-emerald)"/>
              <text x="620" y="78" fill="var(--brand-emerald)" fontSize="13" fontWeight="bold">더 강한 AI</text>
              <text x="620" y="95" fill="var(--muted-foreground)" fontSize="10">성능 향상</text>
              <path d="M620 110 Q620 140 135 140 Q135 120 135 110" stroke="var(--brand-violet)" strokeWidth="2" fill="none" strokeDasharray="5 4" markerEnd="url(#ah)"/>
              <text x="380" y="155" fill="var(--muted-foreground)" fontSize="11">선순환</text>
            </g>
          </svg>
          <p className="text-xs text-center text-muted-foreground mt-2">AI가 반도체 수요를 키우고, 더 좋은 반도체가 더 강한 AI를 가능케 하는 선순환. KLA 같은 검사 회사도 이 흐름의 수혜자다.</p>
        </Card>

        <Note label="교차점: ">
          AI(특히 컴퓨터 비전)와 반도체 검사가 만나는 자리.
          KLA/ICOS의 결함 검출은 <strong>딥러닝 비전이 실제 산업에 박히는</strong> 대표 사례이고,
          3D 비전·SW 배경이 정확히 거기에 들어맞는다.
        </Note>
      </section>

      {/* 19 */}
      <section id="c13" className="scroll-mt-20 space-y-6">
        <Kicker num="19">AI의 한계와 리스크</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">강력하지만 만능은 아니다</h2>

        <ul className="space-y-2 text-sm leading-7">
          {[
            '환각(Hallucination): 그럴듯하지만 틀린 내용을 자신 있게 생성(11장). 사실 검증이 필수.',
            '편향(Bias): 학습 데이터에 든 사회적 편향을 그대로 학습·증폭할 수 있다.',
            '블랙박스: 왜 그런 답을 냈는지 내부를 설명하기 어렵다(설명가능성 문제).',
            '데이터 의존: 학습에 없던 상황엔 약하다. 데이터 품질이 곧 성능.',
            '비용·에너지: 거대 모델 학습엔 막대한 전기·GPU·돈이 든다.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-muted-foreground/40 shrink-0">·</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^(]+)(\([^)]+\))?:/, '<strong class="text-foreground">$1</strong>$2:') }} />
            </li>
          ))}
        </ul>

        <Callout label="균형 잡힌 태도: ">
          "AI가 다 한다"도, "AI는 허상이다"도 둘 다 틀렸다.{' '}
          <strong>특정 작업(패턴 인식·생성)에선 초인적이지만, 진짜 이해·상식·책임은 아직 사람의 몫</strong>이다.
          도구로서 강력하되 맹신은 금물, 이 감각이 준전공자의 시각이다.
        </Callout>
      </section>

      {/* 20 — glossary */}
      <section id="c14" className="scroll-mt-20 space-y-6">
        <Kicker num="20">핵심 용어 사전</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">이것만 알면 AI 대화가 끊기지 않는다</h2>
        <p className="text-sm text-muted-foreground">모르는 게 나오면 여기로 돌아오자.</p>

        <Card>
          <div>
            {[
              { w: '머신러닝', s: 'Machine Learning', d: '데이터에서 규칙·패턴을 스스로 학습하는 기법. AI의 한 갈래.' },
              { w: '딥러닝', s: 'Deep Learning', d: '여러 층의 신경망으로 학습하는 머신러닝. 요즘 AI의 주류.' },
              { w: '신경망', s: 'Neural Network', d: '뉴런(가중합+활성화)을 층층이 연결한 모델.' },
              { w: '파라미터 / 가중치', s: 'Parameter / Weight', d: '모델이 학습으로 조정하는 "손잡이". 많을수록 표현력↑(또한 계산량↑).' },
              { w: '손실 함수', s: 'Loss', d: '예측이 정답과 얼마나 다른지 재는 숫자. 줄이는 게 학습 목표.' },
              { w: '경사하강법', s: 'Gradient Descent', d: '손실이 줄어드는 방향으로 가중치를 조금씩 옮기는 방법.' },
              { w: '역전파', s: 'Backpropagation', d: '오차를 뒤에서 앞으로 전파해 각 가중치의 기여(기울기)를 계산.' },
              { w: '과적합', s: 'Overfitting', d: '학습 데이터(잡음까지)를 외워 새 데이터에 약해진 상태.' },
              { w: '일반화', s: 'Generalization', d: '본 적 없는 데이터에도 잘 맞히는 능력. AI의 진짜 목표.' },
              { w: '지도/비지도/강화학습', s: '', d: '정답 줌 / 정답 없이 구조 발견 / 보상으로 학습.' },
              { w: 'CNN', s: '합성곱 신경망', d: '필터로 이미지 특징을 훑는 구조. 컴퓨터 비전·결함 검출의 핵심.' },
              { w: '어텐션', s: 'Attention', d: '관련 깊은 부분에 더 집중하게 하는 메커니즘. 트랜스포머의 핵심.' },
              { w: '트랜스포머', s: 'Transformer', d: '어텐션 기반 구조. 현대 LLM·생성형 AI의 뼈대.' },
              { w: '토큰 / 임베딩', s: 'Token / Embedding', d: '텍스트를 자른 조각 / 그 의미를 담은 숫자 벡터.' },
              { w: 'LLM', s: '거대 언어모델', d: '방대한 텍스트로 "다음 토큰 예측"을 학습한 대형 트랜스포머. 예: GPT.' },
              { w: '사전학습 / 파인튜닝', s: '', d: '대규모로 기본기 학습 / 특정 용도·태도로 다듬기.' },
              { w: 'RLHF', s: '', d: '사람 선호 피드백으로 모델을 정렬하는 강화학습. "쓸 만한" 챗봇의 비결.' },
              { w: '환각', s: 'Hallucination', d: '그럴듯하지만 틀린 내용을 생성하는 현상. 검증 필요.' },
              { w: 'GPU / HBM', s: '', d: '병렬 연산 칩 / 그 옆의 초고속 메모리. AI 학습의 하드웨어 양대 축.' },
              { w: '컨텍스트 윈도우', s: 'Context Window', d: '모델이 한 번에 볼 수 있는 토큰의 양. "작업 기억"의 크기.' },
              { w: '프롬프트 / 퓨샷', s: 'Prompt / Few-shot', d: '모델에 주는 지시문 / 예시 몇 개를 보여줘 패턴을 따르게 하는 인컨텍스트 학습.' },
              { w: 'RAG', s: '검색 증강 생성', d: '답 전에 관련 문서를 검색해 근거로 넣어주는 기법. 최신·사내 지식, 환각 완화.' },
              { w: '도구 사용 / 함수 호출', s: 'Tool use / Function calling', d: '모델이 검색·계산·실행 등 외부 도구를 직접 호출하는 능력. AI의 "손발".' },
              { w: 'MCP', s: 'Model Context Protocol', d: '모델과 도구·데이터를 잇는 표준 규격. "AI 도구의 USB-C".' },
              { w: '에이전트', s: 'Agent', d: '목표를 받아 스스로 계획·실행·관찰을 반복하는 AI. LLM+도구+하네스+루프.' },
              { w: '하네스 / 스캐폴딩', s: 'Harness / Scaffolding', d: '모델을 감싸 실행·재시도·안전·메모리를 통제하는 코드 골격.' },
              { w: '추론 모델', s: 'Reasoning Model', d: '답 전에 단계적으로 "생각"하는 모델(o1, o3, DeepSeek R1). 어려운 문제에 강함.' },
              { w: 'MoE', s: '전문가 혼합', d: '입력마다 관련 전문가 일부만 켜는 구조. 큰 용량을 적은 비용으로.' },
              { w: '양자화 / 증류', s: 'Quantization / Distillation', d: '정밀도를 낮춰 경량화 / 큰 모델의 지식을 작은 모델로 옮기기.' },
              { w: '멀티모달 / 확산모델', s: 'Multimodal / Diffusion', d: '텍스트+이미지+음성을 함께 처리 / 노이즈에서 그림을 복원하는 이미지 생성 방식.' },
            ].map(({ w, s, d }, i) => (
              <div key={i} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4 py-3 border-t border-border/40 first:border-t-0 text-sm">
                <div>
                  <span className="font-semibold text-foreground">{w}</span>
                  {s && <span className="block text-[11px] text-muted-foreground">{s}</span>}
                </div>
                <span className="text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </Card>

        <Note label="한 호흡에 외우는 전체 흐름: ">
          AI = 데이터로 배우는 기계 → 학습은 손잡이(가중치)를 손실이 줄도록 조정(경사하강·역전파) → 뉴런을 쌓은 신경망, 외우지 말고 일반화 → 이미지는 CNN, 순서는 어텐션 → 어텐션만으로 만든 트랜스포머 → 다음 단어 예측을 키운 LLM → 이 모든 걸 굴리는 건 GPU·HBM(반도체).
          그래서 <strong>AI와 반도체는 한 몸</strong>이다.
        </Note>
      </section>

    </div>
  )
}

/* ── helpers ── */

function PartTag({ id, num, children }: { id: string; num: string; children: string }) {
  return (
    <div id={id} className="scroll-mt-20 rounded-2xl border border-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand-violet)_6%,transparent)] px-6 py-4 flex items-center gap-4">
      <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg" style={{ background: 'var(--brand-violet)', color: 'var(--background)' }}>{num}</span>
      <span className="font-display text-lg font-semibold text-foreground">{children}</span>
    </div>
  )
}

function Kicker({ num, children }: { num: string; children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[13px] font-bold shrink-0"
        style={{ background: 'var(--brand-violet)', color: 'var(--background)' }}
      >
        {num}
      </span>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{children}</p>
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6">
      {children}
    </div>
  )
}

function InfoBox({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-5">
      <div className="font-semibold text-sm text-foreground mb-2">{icon} {title}</div>
      <div className="text-sm text-muted-foreground leading-6">{children}</div>
    </div>
  )
}

function Note({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[color-mix(in_oklab,var(--brand-emerald)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand-emerald)_8%,transparent)] p-4 text-sm leading-7">
      {label && <span className="font-semibold" style={{ color: 'var(--brand-emerald)' }}>{label}</span>}
      <span className="text-foreground/80">{children}</span>
    </div>
  )
}

function Callout({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[color-mix(in_oklab,var(--brand-amber)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand-amber)_8%,transparent)] p-4 text-sm leading-7">
      {label && <span className="font-semibold" style={{ color: 'var(--brand-amber)' }}>{label}</span>}
      <span className="text-foreground/80">{children}</span>
    </div>
  )
}

function Analogy({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-xl border border-[color-mix(in_oklab,var(--brand-cyan)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand-cyan)_8%,transparent)] p-4 text-sm leading-7">
      <span className="text-3xl shrink-0 leading-none mt-0.5">{emoji}</span>
      <div className="text-foreground/80">{children}</div>
    </div>
  )
}

function Deep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand-violet)_8%,transparent)] p-4 text-sm leading-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.15em] font-semibold mb-2" style={{ color: 'var(--brand-violet)' }}>한 걸음 더 · {title}</div>
      <div className="text-foreground/80">{children}</div>
    </div>
  )
}

function Quiz({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="rounded-xl border border-dashed border-border bg-card/40 backdrop-blur-sm p-4 group">
      <summary className="cursor-pointer text-sm font-medium text-foreground/80 hover:text-foreground list-none flex items-center gap-2">
        <span className="text-muted-foreground/50 group-open:rotate-90 transition-transform">▶</span>
        ✅ {q}
      </summary>
      <div className="mt-3 text-sm leading-7 text-muted-foreground pl-4">{children}</div>
    </details>
  )
}
