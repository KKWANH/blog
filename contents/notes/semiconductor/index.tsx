export const title = '반도체 기초 강의'
export const subtitle = '모래 한 줌이 생각하는 기계가 되기까지'
export const description =
  '반도체가 무엇인지, 왜 만들기 어려운지, 검사가 왜 중요한지. 전공 지식 없이 그림으로 따라가는 7장 강의.'
export const excerpt =
  '트랜지스터에서 집적회로, 8대 공정, 검사까지 — 반도체를 처음부터 시각적으로 쌓아 올린다.'
export const date = '2026-06-15'
export const readTime = '20 min'
export const lang = 'ko'
export const showToc = true
export const toc = [
  { id: 'c1', label: '1. 반도체란 무엇인가', level: 2 },
  { id: 'c2', label: '2. 트랜지스터 = 전자 스위치', level: 2 },
  { id: 'c3', label: '3. 집적회로 (IC)', level: 2 },
  { id: 'c4', label: '4. 미세화 (Node)', level: 2 },
  { id: 'c5', label: '5. 반도체 8대 공정', level: 2 },
  { id: 'c6', label: '6. 왜 이렇게 어려운가', level: 2 },
  { id: 'c7', label: '7. 반도체 생태계', level: 2 },
]
export const category = '노트'

export default function SemiconductorPage() {
  return (
    <div className="space-y-20 pb-8">

      {/* ── 1 ── */}
      <section id="c1" className="scroll-mt-20 space-y-6">
        <Kicker num="1">반도체란 무엇인가</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">
          전기를 "통할까 말까" 조절하는 물질
        </h2>
        <p className="text-muted-foreground leading-7">
          세상의 물질은 전기가 통하는 정도로 나눌 수 있다. 반도체(半導體)는 글자 그대로{' '}
          <strong className="text-foreground">"반쯤 통하는 물질"</strong>. 평소엔 안 통하다가,
          조건을 주면 통한다. 이 "조절 가능"이 모든 것의 출발점이다.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {[
            { ico: '🔌', t: '도체', s: '항상 통함\n(구리, 금속)', accent: false },
            { ico: '🎚️', t: '반도체', s: '조건 따라 통함/안 통함\n(실리콘)', accent: true },
            { ico: '🧱', t: '부도체', s: '절대 안 통함\n(고무, 유리)', accent: false },
          ].map(({ ico, t, s, accent }) => (
            <div
              key={t}
              className={`rounded-2xl border p-5 text-center ${
                accent
                  ? 'border-[color-mix(in_oklab,var(--brand-cyan)_40%,transparent)] bg-[color-mix(in_oklab,var(--brand-cyan)_8%,transparent)]'
                  : 'border-border/60 bg-card/40'
              }`}
            >
              <div className="text-3xl mb-2">{ico}</div>
              <div className="font-medium text-sm text-foreground">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-5 whitespace-pre-line">{s}</div>
            </div>
          ))}
        </div>

        <Card>
          <p className="text-sm leading-7">
            <span className="font-semibold" style={{ color: 'var(--brand-cyan)' }}>왜 실리콘(모래)인가?</span>{' '}
            지구에 흔하고 싸고, 성질이 안정적이다. 순수 실리콘은 거의 부도체지만, 여기에{' '}
            <em className="text-foreground not-italic font-medium">불순물을 살짝 섞으면(도핑, doping)</em>{' '}
            전기 성질을 마음대로 조절할 수 있다. 이게 반도체의 마법이다.
          </p>
        </Card>

        <Analogy emoji="🚰">
          비유하면 <strong>수도꼭지</strong>다. 도체는 항상 열린 수도, 부도체는 막힌 벽, 반도체는{' '}
          <em className="not-italic font-semibold" style={{ color: 'var(--brand-cyan)' }}>틀었다 잠갔다 할 수 있는 꼭지</em>.
          이 "꼭지"로 0과 1을 만든다.
        </Analogy>
      </section>

      {/* ── 2 ── */}
      <section id="c2" className="scroll-mt-20 space-y-6">
        <Kicker num="2">트랜지스터 = 전자 스위치</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">
          모든 칩의 가장 작은 부품
        </h2>
        <p className="text-muted-foreground leading-7">
          반도체로 만드는 가장 중요한 부품이 <strong className="text-foreground">트랜지스터</strong>다.
          하는 일은 딱 하나,{' '}
          <em className="not-italic font-semibold" style={{ color: 'var(--brand-cyan)' }}>전기를 켜고 끄는 스위치</em>.
          사람이 손으로 누르는 게 아니라, 전기 신호로 켜지는 스위치다.
        </p>

        <Card>
          <svg viewBox="0 0 700 180" role="img" aria-label="트랜지스터 스위치 다이어그램" className="w-full">
            <defs>
              <linearGradient id="sg1" x1="0" x2="1">
                <stop offset="0" stopColor="var(--brand-cyan)" />
                <stop offset="1" stopColor="var(--brand-violet)" />
              </linearGradient>
            </defs>
            <rect x="40" y="80" width="120" height="40" rx="8" fill="var(--card)" stroke="var(--border)" />
            <text x="100" y="105" fill="var(--foreground)" fontSize="15" textAnchor="middle" fontFamily="sans-serif">소스 (입력)</text>
            <rect x="160" y="80" width="180" height="40" fill="var(--muted)" />
            <text x="250" y="105" fill="var(--muted-foreground)" fontSize="13" textAnchor="middle" fontFamily="sans-serif">통로 (채널)</text>
            <rect x="220" y="30" width="60" height="40" rx="6" fill="url(#sg1)" />
            <text x="250" y="55" fill="var(--background)" fontSize="14" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">게이트</text>
            <line x1="250" y1="70" x2="250" y2="80" stroke="var(--brand-cyan)" strokeWidth="3" />
            <rect x="340" y="80" width="120" height="40" rx="8" fill="var(--card)" stroke="var(--border)" />
            <text x="400" y="105" fill="var(--foreground)" fontSize="15" textAnchor="middle" fontFamily="sans-serif">드레인 (출력)</text>
            <text x="585" y="70" fill="var(--brand-emerald)" fontSize="14" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">게이트에 전기 ON</text>
            <text x="585" y="92" fill="var(--muted-foreground)" fontSize="13" textAnchor="middle" fontFamily="sans-serif">→ 통로 열림 → 전류 흐름</text>
            <text x="585" y="118" fill="var(--destructive)" fontSize="14" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">게이트 OFF</text>
            <text x="585" y="140" fill="var(--muted-foreground)" fontSize="13" textAnchor="middle" fontFamily="sans-serif">→ 통로 막힘 → 차단</text>
          </svg>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[color-mix(in_oklab,var(--brand-emerald)_40%,transparent)] bg-[color-mix(in_oklab,var(--brand-emerald)_8%,transparent)] p-5 text-center">
            <div className="text-4xl font-black tracking-wide" style={{ color: 'var(--brand-emerald)' }}>1</div>
            <div className="font-semibold mt-1 text-sm">ON (켜짐)</div>
            <div className="text-xs text-muted-foreground mt-1">전류가 흐름. 컴퓨터는 이걸 "1"로 읽음</div>
          </div>
          <div className="rounded-xl border border-[color-mix(in_oklab,var(--destructive)_40%,transparent)] bg-[color-mix(in_oklab,var(--destructive)_8%,transparent)] p-5 text-center">
            <div className="text-4xl font-black tracking-wide" style={{ color: 'var(--destructive)' }}>0</div>
            <div className="font-semibold mt-1 text-sm">OFF (꺼짐)</div>
            <div className="text-xs text-muted-foreground mt-1">전류 차단. 컴퓨터는 이걸 "0"으로 읽음</div>
          </div>
        </div>

        <Note label="핵심:">
          {' '}트랜지스터 = 0과 1을 만드는 스위치. 컴퓨터의 모든 계산, 사진, 영상, AI는 결국{' '}
          <strong>수십억 개 스위치의 0/1 조합</strong>일 뿐이다.
        </Note>
      </section>

      {/* ── 3 ── */}
      <section id="c3" className="scroll-mt-20 space-y-6">
        <Kicker num="3">집적회로 (IC)</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">
          스위치 수백억 개를 손톱만 한 칩에
        </h2>
        <p className="text-muted-foreground leading-7">
          트랜지스터 하나로는 아무것도 못 한다. 이걸{' '}
          <strong className="text-foreground">수십억~수백억 개</strong> 모아서 회로로 연결한 게{' '}
          <em className="not-italic font-semibold" style={{ color: 'var(--brand-cyan)' }}>집적회로(IC), 곧 "칩"</em>이다.
          최신 AI 칩(엔비디아) 한 개엔{' '}
          <span className="font-semibold" style={{ color: 'var(--brand-amber)' }}>1,000억 개 이상</span>의 트랜지스터가 들어간다.
        </p>

        <Card>
          <svg viewBox="0 0 700 150" role="img" aria-label="트랜지스터에서 칩으로" className="w-full">
            <g fontFamily="sans-serif">
              <rect x="20" y="55" width="40" height="40" rx="6" fill="url(#sg1)" />
              <text x="40" y="120" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">트랜지스터 1개</text>
              <text x="105" y="80" fill="var(--brand-violet)" fontSize="24" textAnchor="middle">→</text>
              <g fill="var(--brand-cyan)">
                <rect x="150" y="45" width="14" height="14" rx="2" /><rect x="170" y="45" width="14" height="14" rx="2" /><rect x="190" y="45" width="14" height="14" rx="2" /><rect x="210" y="45" width="14" height="14" rx="2" />
                <rect x="150" y="65" width="14" height="14" rx="2" /><rect x="170" y="65" width="14" height="14" rx="2" /><rect x="190" y="65" width="14" height="14" rx="2" /><rect x="210" y="65" width="14" height="14" rx="2" />
                <rect x="150" y="85" width="14" height="14" rx="2" /><rect x="170" y="85" width="14" height="14" rx="2" /><rect x="190" y="85" width="14" height="14" rx="2" /><rect x="210" y="85" width="14" height="14" rx="2" />
              </g>
              <text x="187" y="120" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">수십억 개 집적</text>
              <text x="270" y="80" fill="var(--brand-violet)" fontSize="24" textAnchor="middle">→</text>
              <rect x="320" y="40" width="80" height="70" rx="8" fill="var(--card)" stroke="var(--brand-cyan)" strokeWidth="2" />
              <rect x="335" y="55" width="50" height="40" rx="4" fill="var(--muted)" />
              <g stroke="var(--brand-cyan)" strokeWidth="2">
                <line x1="320" y1="55" x2="308" y2="55" /><line x1="320" y1="70" x2="308" y2="70" /><line x1="320" y1="85" x2="308" y2="85" />
                <line x1="400" y1="55" x2="412" y2="55" /><line x1="400" y1="70" x2="412" y2="70" /><line x1="400" y1="85" x2="412" y2="85" />
              </g>
              <text x="360" y="130" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">칩 (IC)</text>
              <text x="455" y="80" fill="var(--brand-violet)" fontSize="24" textAnchor="middle">→</text>
              <text x="560" y="65" fontSize="34" textAnchor="middle">📱💻🚗</text>
              <text x="560" y="120" fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">우리 일상</text>
            </g>
          </svg>
        </Card>

        <Analogy emoji="🏙️">
          칩 하나는 <strong>거대한 도시</strong>다. 트랜지스터는 건물, 회로 배선은 도로. 손톱 크기 안에
          서울보다 복잡한 "도시"가 들어있고, 그 도로 폭이 머리카락의{' '}
          <em className="not-italic font-semibold" style={{ color: 'var(--brand-cyan)' }}>수만분의 1</em>이다.
        </Analogy>
      </section>

      {/* ── 4 ── */}
      <section id="c4" className="scroll-mt-20 space-y-6">
        <Kicker num="4">미세화 (Node)</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">
          작게 만들수록 빠르고 똑똑하다
        </h2>
        <p className="text-muted-foreground leading-7">
          트랜지스터를 작게 만들수록 같은 면적에 더 많이 넣을 수 있다. 단위는{' '}
          <strong className="text-foreground">나노미터(nm)</strong>.
          1nm = 10억분의 1미터. "3nm 공정"은 회로 선폭이 그만큼 작다는 뜻.
        </p>

        <Card>
          <div className="space-y-4">
            {[
              { sz: '머리카락', bar: 100, desc: '약 80,000 nm 굵기' },
              { sz: '적혈구', bar: 55, desc: '약 7,000 nm' },
              { sz: '코로나바이러스', bar: 14, desc: '약 100 nm' },
              { sz: '최신 칩', bar: 4, desc: '3 nm 공정 (바이러스보다 30배 작다)' },
              { sz: '원자', bar: 1.5, desc: '약 0.2 nm (이제 한계에 근접 중)' },
            ].map(({ sz, bar, desc }) => (
              <div key={sz} className="grid grid-cols-[7rem_1fr] gap-4 items-center py-2 border-b border-border/30 last:border-0">
                <span className="font-bold text-sm text-right" style={{ color: 'var(--brand-cyan)' }}>{sz}</span>
                <div>
                  <div className="h-3.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${bar}%`, background: 'linear-gradient(90deg, var(--brand-cyan), var(--brand-violet))' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Callout label="무어의 법칙 ">
          "트랜지스터 수가 약 2년마다 2배가 된다"는 경험칙. 60년간 맞아떨어졌지만, 이제 원자 크기에 가까워져 점점 어려워지고 있다.
          그래서 <strong>"제대로 만들었는지 검사"</strong>가 갈수록 더 중요해진다.
        </Callout>
      </section>

      {/* ── 5 ── */}
      <section id="c5" className="scroll-mt-20 space-y-6">
        <Kicker num="5">어떻게 만드나</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">
          반도체 8대 공정
        </h2>
        <p className="text-muted-foreground leading-7">
          웨이퍼(둥근 실리콘 원판) 위에 회로를{' '}
          <strong className="text-foreground">그리고 → 깎고 → 쌓기</strong>를 1,000번 넘게 반복한다.
          크게 8단계로 보면 이렇다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { n: '1', t: '웨이퍼 제조', en: 'Wafer', d: '모래(실리콘)를 녹여 둥근 원판으로. 칩의 도화지.', insp: false },
            { n: '2', t: '산화', en: 'Oxidation', d: '표면에 얇은 보호막(절연막)을 입힌다.', insp: false },
            { n: '3', t: '포토 (노광)', en: 'Photolithography', d: '빛으로 회로 설계도를 웨이퍼에 그린다. ASML 장비의 영역.', insp: false },
            { n: '4', t: '식각', en: 'Etching', d: '필요 없는 부분을 미세하게 깎아낸다.', insp: false },
            { n: '5', t: '증착·이온주입', en: 'Deposition / Implant', d: '새 막을 쌓고, 불순물을 넣어(도핑) 전기 성질을 만든다.', insp: false },
            { n: '6', t: '금속 배선', en: 'Metallization', d: '트랜지스터들을 전선으로 연결한다.', insp: false },
            { n: '7', t: '검사·계측 👁️', en: 'Inspection / Metrology', d: '단계마다 결함·먼지를 찾고 치수를 측정. KLA의 핵심 영역.', insp: true },
            { n: '8', t: '패키징·테스트', en: 'Packaging / Test', d: '칩을 잘라 포장하고 최종 검사. KLA Leuven(ICOS) 영역.', insp: true },
          ].map(({ n, t, en, d, insp }) => (
            <div
              key={n}
              className={`relative rounded-xl border p-5 ${
                insp
                  ? 'border-[color-mix(in_oklab,var(--brand-emerald)_40%,transparent)] bg-[color-mix(in_oklab,var(--brand-emerald)_6%,transparent)]'
                  : 'border-border/60 bg-card/40'
              }`}
            >
              <span
                className="absolute -top-3 left-4 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: 'var(--brand-violet)', color: 'var(--background)' }}
              >
                {n}
              </span>
              <div className="mt-1">
                <div className="font-semibold text-sm text-foreground">{t}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--brand-cyan)' }}>{en}</div>
                <div className="text-xs text-muted-foreground leading-5">{d}</div>
              </div>
            </div>
          ))}
        </div>

        <Note label="여기가 너의 자리:">
          {' '}3~8단계 거의 매번 "검사"가 끼어든다. 검사 = 카메라로 찍어 결함을 찾는 일이니,
          본질적으로 <strong>컴퓨터 비전 + 소프트웨어</strong> 문제다.
        </Note>
      </section>

      {/* ── 6 ── */}
      <section id="c6" className="scroll-mt-20 space-y-6">
        <Kicker num="6">왜 이렇게 어려운가</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">
          먼지 한 톨이 수백억을 날린다
        </h2>

        <Card>
          <div className="space-y-4 text-sm leading-7">
            {[
              { hl: '① 상상 못 할 정밀도', body: '원자 몇 개 크기의 구조를 1,000단계에 걸쳐 단 하나도 안 틀리게 만들어야 한다.' },
              { hl: '② 먼지가 적', body: '눈에 안 보이는 먼지 한 톨이 칩을 망친다. 그래서 공장은 수술실보다 수천 배 깨끗한 클린룸이다.' },
              { hl: '③ 수율(Yield) 싸움', body: '만든 칩 중 정상품 비율이 곧 돈. 1%만 올려도 수천억 차이.' },
              { hl: '④ 천문학적 비용', body: '최신 공장 하나에 수십조 원. 웨이퍼 한 장도 수백억 가치.' },
            ].map(({ hl, body }) => (
              <p key={hl}>
                <span className="font-semibold" style={{ color: 'var(--brand-cyan)' }}>{hl}</span>{' — '}{body}
              </p>
            ))}
          </div>
        </Card>

        <Callout label="그래서 '검사'가 생존이다. ">
          아무리 잘 만들어도, 불량을 못 걸러내면 수백억짜리 웨이퍼를 통째로 버린다.
          검사는 비용이 아니라 <strong>보험이자 무기</strong>다. 칩이 복잡해질수록(AI 시대) 검사의 가치는 더 올라간다.
        </Callout>
      </section>

      {/* ── 7 ── */}
      <section id="c7" className="scroll-mt-20 space-y-6">
        <Kicker num="7">반도체 생태계</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">
          누가 무엇을 하는가
        </h2>
        <p className="text-muted-foreground leading-7">
          반도체는 한 회사가 다 못 한다. 역할이 철저히 나뉘어 있다.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { t: '설계 (팹리스)', ex: '칩을 디자인\n엔비디아, 퀄컴, 애플' },
            { t: '제조 (파운드리)', ex: '대신 만들어줌\nTSMC, 삼성' },
            { t: '장비', ex: '만드는 기계\nASML, AMAT, Lam, KLA' },
            { t: '소재', ex: '재료·화학\n신에쓰, JSR' },
          ].map(({ t, ex }) => (
            <div key={t} className="rounded-xl border border-border/60 bg-card/40 p-4 text-center">
              <div className="font-semibold text-sm text-foreground">{t}</div>
              <div className="mt-2 text-xs text-muted-foreground leading-5 whitespace-pre-line">{ex}</div>
            </div>
          ))}
        </div>

        <Card>
          <p className="text-lg font-display tracking-tight">KLA의 위치 한 줄 요약</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            설계도(팹리스)를 받아 공장(파운드리)이 장비로 칩을 만든다. KLA는 그{' '}
            <strong className="text-foreground">장비 회사</strong> 중에서도{' '}
            <em className="not-italic font-semibold" style={{ color: 'var(--brand-cyan)' }}>"제대로 만들어졌는지 검사하는"</em>{' '}
            자리를 거의 독점한다. 만드는 게 아니라{' '}
            <strong className="text-foreground">판정하는</strong> 회사다.
          </p>
        </Card>

        <Note label="한 문장으로 정리:">
          {' '}반도체는 모래로 만든 수십억 개의 스위치다. 너무 작아 먼지 하나에도 망가지므로,
          "잘 만들어졌는지 보는 눈"이 반드시 필요하다. 그 눈이 바로 KLA, 그리고 그 눈은 결국{' '}
          <strong>비전 + 소프트웨어</strong>로 만들어진다.
        </Note>
      </section>

    </div>
  )
}

/* ── helpers ── */

function Kicker({ num, children }: { num: string; children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[13px] font-bold shrink-0"
        style={{ background: 'var(--brand-cyan)', color: 'var(--background)' }}
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
