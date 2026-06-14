export const title = 'KLA 완전암기'
export const subtitle = '투어 전 마지막 정리 — 역사, 비전, 구조, 사업, 숫자'
export const description =
  'KLA Corporation 완전 정리. 한 줄 정체부터 핵심 숫자, 역사, 3대 사업, 시장 점유율, KLA Leuven(ICOS)까지.'
export const excerpt =
  '1975년 창립, 본사 Milpitas, 매출 $12.2B, 광학 웨이퍼 검사 점유율 85%+. 반도체 공정 제어의 사실상 독점 회사.'
export const date = '2026-06-15'
export const readTime = '25 min'
export const lang = 'ko'
export const showToc = true
export const toc = [
  { id: 's1', label: '1. 한 줄 정체', level: 2 },
  { id: 's2', label: '2. 외울 핵심 숫자', level: 2 },
  { id: 's3', label: '3. 역사 50년', level: 2 },
  { id: 's4', label: '4. 미션 · 비전 · 가치', level: 2 },
  { id: 's5', label: '5. 리더십 · 규모', level: 2 },
  { id: 's6', label: '6. 3대 사업 부문', level: 2 },
  { id: 's7', label: '7. 제품 · 기술', level: 2 },
  { id: 's8', label: '8. 시장 점유율', level: 2 },
  { id: 's9', label: '9. 경쟁 구도', level: 2 },
  { id: 's10', label: '10. KLA Leuven (= ICOS)', level: 2 },
  { id: 's11', label: '11. 빠른 암기 체크', level: 2 },
  { id: 's12', label: '12. 투어 태도', level: 2 },
]
export const category = '노트'

export default function KLAPage() {
  return (
    <div className="space-y-20 pb-8">

      {/* ── 1 ── */}
      <section id="s1" className="scroll-mt-20 space-y-6">
        <Kicker num="1">한 줄 정체</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">KLA가 정확히 뭐 하는 회사인가</h2>

        <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-8 text-center space-y-3">
          <p className="text-xl font-display leading-relaxed tracking-tight">
            KLA는 반도체를{' '}
            <span className="font-semibold" style={{ color: 'var(--brand-cyan)' }}>만들지 않는다</span>.<br />
            만든 반도체가{' '}
            <span className="font-semibold" style={{ color: 'var(--brand-cyan)' }}>제대로 만들어졌는지 검사·측정</span>하는<br />
            세계 1위 회사다.
          </p>
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          업계 표현:{' '}
          <em className="not-italic font-semibold" style={{ color: 'var(--brand-cyan)' }}>
            "ASML이 공장을 짓게 한다면, KLA는 그 공장이 제대로 돌아가게 한다."
          </em>{' '}
          칩 제조 1,000여 단계마다 끼어들어 "결함이 있나, 치수가 맞나"를 판정하는{' '}
          <strong className="text-foreground">공정 제어(Process Control)</strong>의 절대 강자.
          이 분야 점유율이 사실상 독점 수준이라 "반도체 업계의 숨은 권력자"로 불린다.
        </p>
      </section>

      {/* ── 2 ── */}
      <section id="s2" className="scroll-mt-20 space-y-6">
        <Kicker num="2">외울 핵심 숫자</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">이 12개만 머리에 새기면 끝</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { v: '1975', l: '창립 연도\n(KLA Instruments)' },
            { v: '1997', l: 'Tencor와 합병\n→ KLA-Tencor' },
            { v: '2019', l: '사명 변경\n→ KLA Corporation' },
            { v: 'Milpitas', l: '본사\n캘리포니아, 미국' },
            { v: '~15,000', l: '전 세계 직원 수' },
            { v: '$12.2B', l: '매출 (FY2025)\n전년 대비 +24%' },
            { v: '~35-40%', l: '영업이익률\n(제조업 최상위)' },
            { v: '85%+', l: '광학 웨이퍼\n검사 점유율' },
            { v: '56%+', l: '공정 제어\n전체 점유율' },
            { v: '80%+', l: '레티클(마스크)\n검사 점유율' },
            { v: 'R. Wallace', l: 'CEO 겸 President\n(약 20년 재임)' },
            { v: '3개', l: '사업 부문\n(아래 6장)' },
          ].map(({ v, l }) => (
            <div key={v} className="rounded-xl border border-border/60 bg-card/40 p-4 text-center">
              <div
                className="text-2xl font-extrabold leading-tight"
                style={{ background: 'linear-gradient(90deg, var(--brand-cyan), var(--brand-violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {v}
              </div>
              <div className="mt-1.5 text-xs text-muted-foreground leading-4 whitespace-pre-line">{l}</div>
            </div>
          ))}
        </div>

        <Callout label="딱 하나만 고른다면: ">
          "1975년 창립, 본사 미국 Milpitas, 매출 약{' '}
          <strong>122억 달러</strong>, 직원 약 <strong>1.5만 명</strong>,
          광학 웨이퍼 검사 점유율 <strong>85% 이상</strong>의 검사·계측 1위 회사."
          이 한 문장이면 충분하다.
        </Callout>
      </section>

      {/* ── 3 ── */}
      <section id="s3" className="scroll-mt-20 space-y-6">
        <Kicker num="3">역사</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">50년, 검사 한 우물</h2>

        <Card>
          <div className="relative pl-7">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border/60" />
            {[
              { y: '1975', t: 'Ken Levy와 Bob Anderson이 캘리포니아에서 KLA Instruments 창립. 반도체 결함 검사에 집중.' },
              { y: '1976', t: '첫 제품 모델 1000 출시. 당시 획기적인 자동 웨이퍼(레티클) 검사 장비.' },
              { y: '1976', t: 'Tencor Instruments 설립(박막 두께 정밀 측정, 1984년 레이저 스캐닝 입자 검출 개발).' },
              { y: '1997', t: 'KLA Instruments + Tencor 합병 → KLA-Tencor 탄생. 검사 + 계측을 한 회사로. 합산 매출 10억 달러+.' },
              { y: '2006', t: 'ADE 인수 (웨이퍼 계측 강화).' },
              { y: '2008', t: 'ICOS Vision Systems(벨기에, KU Leuven 스핀오프) 인수 → 후공정·패키징 2D/3D 검사 확보. = 오늘날 KLA Leuven.' },
              { y: '2019', t: 'Orbotech(이스라엘) 인수 완료 → PCB, 평판디스플레이, 첨단 패키징 검사로 사업 확장.' },
              { y: '2019', t: '사명을 KLA Corporation으로 단순화. 검사·계측을 넘어선 넓은 포트폴리오를 반영.' },
            ].map(({ y, t }, i) => (
              <div key={i} className="relative mb-5 last:mb-0">
                <div
                  className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2"
                  style={{ background: 'var(--brand-cyan)', borderColor: 'var(--background)' }}
                />
                <span className="font-extrabold text-sm" style={{ color: 'var(--brand-cyan)' }}>{y}</span>
                <p className="mt-0.5 text-sm text-muted-foreground leading-6"
                   dangerouslySetInnerHTML={{ __html: t.replace(/KLA Leuven/g, '<strong class="text-foreground">KLA Leuven</strong>').replace(/KLA-Tencor/g, '<strong class="text-foreground">KLA-Tencor</strong>').replace(/KLA Corporation/g, '<strong class="text-foreground">KLA Corporation</strong>') }} />
              </div>
            ))}
          </div>
        </Card>

        <p className="text-xs text-muted-foreground leading-6">
          암기 포인트:{' '}
          <strong className="text-foreground">1975 창립 → 1997 Tencor 합병(검사+계측) → 2008 ICOS(=Leuven) → 2019 Orbotech + 사명 변경.</strong>{' '}
          이 네 마디면 역사 끝.
        </p>
      </section>

      {/* ── 4 ── */}
      <section id="s4" className="scroll-mt-20 space-y-6">
        <Kicker num="4">미션 · 비전 · 가치</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">회사가 스스로 말하는 정체성</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <InfoBox icon="🎯" title="미션 (Mission)">
            차별화된 <strong>검사·계측 솔루션</strong>을 제공해, 고객이 학습과 혁신을 가속하도록 돕는 기술 리더가 되는 것.
          </InfoBox>
          <InfoBox icon="🔭" title="비전 (Vision)">
            <strong>공정 제어와 수율 관리(yield management)</strong>의 리더로서 세상의 디지털 전환을 가능하게 하는 것.
          </InfoBox>
        </div>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">🧭 핵심 가치 (Core Values)</p>
          <p className="text-sm leading-7 text-muted-foreground">
            한마디로{' '}
            <span className="font-semibold" style={{ color: 'var(--brand-amber)' }}>Integrity(정직·신뢰)</span>가 토대다.
            검사 데이터가 수십억 달러짜리 생산 결정을 좌우하므로, "데이터의 정확성과 신뢰"가 회사의 생명이다.
            여기에 <strong className="text-foreground">끈기(perseverance)</strong>와{' '}
            <strong className="text-foreground">탁월함(excellence)·고성과 팀워크</strong>를 강조한다.
          </p>
        </Card>

        <Note label="투어에서 쓰기 좋은 연결: ">
          "데이터 정확성에 대한 KLA의 집착"은 곧 검사·계측의 본질이고, 소프트웨어 품질·신뢰성과 직결된다.
          디버깅·시스템 통합 강점과 자연스럽게 이어진다.
        </Note>
      </section>

      {/* ── 5 ── */}
      <section id="s5" className="scroll-mt-20 space-y-6">
        <Kicker num="5">리더십 · 본사 · 규모</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">누가, 어디서, 얼마나 크게</h2>

        <Card>
          <div className="divide-y divide-border/40">
            {[
              { k: 'CEO 겸 President', v: 'Rick Wallace (Richard P. Wallace). KLA에서 30년 이상, CEO만 약 20년. 이사회 멤버.' },
              { k: 'Semi PC President', v: 'Ahmad Khan. 핵심 제품·고객 조직(Semiconductor Products and Customers) 총괄.' },
              { k: '본사', v: '미국 캘리포니아 Milpitas (실리콘밸리).' },
              { k: '직원', v: '전 세계 약 15,000명.' },
              { k: '상장', v: '나스닥 KLAC. 반도체 장비 "빅4" 중 하나.' },
              { k: '매출', v: 'FY2025 약 $12.2B (전년 +24%). AI·HBM 투자 수요가 견인.' },
            ].map(({ k, v }) => (
              <div key={k} className="py-3 grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <span className="font-semibold text-sm text-foreground">{k}</span>
                <span className="text-sm text-muted-foreground leading-6">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── 6 ── */}
      <section id="s6" className="scroll-mt-20 space-y-6">
        <Kicker num="6">3대 사업 부문</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">무엇으로 돈을 버는가</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          공식 보고 부문은 셋. 그중{' '}
          <strong className="text-foreground">반도체 공정 제어</strong>가 매출의 약 90%로 압도적이다.
        </p>

        <Card>
          <div className="divide-y divide-border/40">
            {[
              { seg: 'Semiconductor Process Control', desc: '웨이퍼 검사, 레티클(마스크) 검사, 계측 (회사의 심장)', share: '~90%', accent: true },
              { seg: 'Specialty Semiconductor Process', desc: '특수 공정 장비 (식각·증착 등 일부, 첨단 패키징·MEMS·파워반도체)', share: '소규모', accent: false },
              { seg: 'PCB & Component Inspection', desc: '인쇄회로기판·부품·디스플레이 검사 (옛 Orbotech, ICOS 일부)', share: '소규모', accent: false },
            ].map(({ seg, desc, share, accent }) => (
              <div key={seg} className="py-4 grid gap-1 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="font-semibold text-sm text-foreground">{seg}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                </div>
                <span
                  className="font-bold text-sm self-start sm:self-center mt-1 sm:mt-0"
                  style={{ color: accent ? 'var(--brand-cyan)' : undefined }}
                >
                  {share}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <h3 className="font-display text-xl tracking-tight mt-2">제품 라인별 매출 (FY2025, 근사치)</h3>
        <Card>
          <div className="space-y-3">
            {[
              { nm: '결함 검사', val: '$6.2B', pct: 100 },
              { nm: '서비스', val: '$2.7B', pct: 43 },
              { nm: '패터닝(계측)', val: '$2.2B', pct: 35 },
              { nm: '특수 공정', val: '$0.5B', pct: 8 },
              { nm: 'PCB·부품', val: '$0.4B', pct: 6 },
            ].map(({ nm, val, pct }) => (
              <div key={nm} className="grid grid-cols-[7rem_1fr_4rem] gap-3 items-center text-sm">
                <span className="font-medium text-foreground/80 truncate">{nm}</span>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--brand-cyan), var(--brand-violet))' }}
                  />
                </div>
                <span className="text-right font-bold" style={{ color: 'var(--brand-cyan)' }}>{val}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            핵심 암기: <strong className="text-foreground">결함 검사($6.2B)가 단연 1위</strong>,
            그다음 서비스($2.7B)와 패터닝/계측($2.2B).
            서비스 매출이 크다는 건 한 번 깔린 장비에서 <strong className="text-foreground">꾸준한 반복 수익</strong>이 나온다는 뜻(강력한 락인).
          </p>
        </Card>
      </section>

      {/* ── 7 ── */}
      <section id="s7" className="scroll-mt-20 space-y-6">
        <Kicker num="7">제품 · 기술</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">KLA가 파는 "눈"의 종류</h2>

        <ul className="space-y-2">
          {[
            { name: '광학 검사 (Optical inspection)', desc: '빛으로 빠르게 넓은 면적의 결함을 찾음. Brightfield/Darkfield 두 방식.' },
            { name: '전자빔 검사 (E-beam)', desc: '느리지만 광학으로 못 보는 미세 결함까지 검출.' },
            { name: '레티클(포토마스크) 검사', desc: '회로 원판인 마스크의 결함 검사 (점유율 80%+).' },
            { name: '계측 (Metrology)', desc: '선폭(CD), 막 두께, 층 정렬(Overlay) 측정.' },
            { name: '패키징·부품 검사', desc: '후공정의 2D/3D 비전 검사 — KLA Leuven/ICOS의 전문 영역.' },
            { name: '소프트웨어·데이터 분석', desc: '검사 데이터를 AI로 분석해 수율을 올리는 솔루션. 장비를 넘어선 부가가치.' },
          ].map(({ name, desc }) => (
            <li key={name} className="flex gap-3 text-sm leading-7">
              <span className="text-muted-foreground/40 shrink-0 mt-0.5">·</span>
              <span>
                <span className="font-semibold text-foreground/90">{name}</span>
                {' — '}
                <span className="text-muted-foreground">{desc}</span>
              </span>
            </li>
          ))}
        </ul>

        <Note label="너의 연결점: ">
          광학·전자빔은 광학·물리 전문가의 영역이지만,{' '}
          <strong>그 위에서 도는 결함 검출·분류·데이터 분석 소프트웨어</strong>가 네 자리다.
          "광학계가 만든 이미지를 받아 신뢰성 있는 검출로 만드는" 비전·SW 엔지니어.
          KLA Leuven은 특히 이 후공정 비전 검사가 전문이다.
        </Note>
      </section>

      {/* ── 8 ── */}
      <section id="s8" className="scroll-mt-20 space-y-6">
        <Kicker num="8">시장 점유율</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">숫자로 보는 "사실상 독점"</h2>

        <Card>
          <div className="divide-y divide-border/40">
            {[
              { field: '광학 웨이퍼 검사 (전체)', share: '85% 이상', accent: true },
              { field: '공정 제어·계측·검사 (전체 시장)', share: '56% 이상', accent: false },
              { field: 'Brightfield 검사', share: '약 60%', accent: false },
              { field: 'Darkfield 검사', share: '50% 이상', accent: false },
              { field: '레티클(포토마스크) 검사', share: '80% 이상', accent: false },
              { field: 'CD 계측 (선폭)', share: '약 45%', accent: false },
              { field: 'Overlay 계측 (층 정렬)', share: '약 40%', accent: false },
            ].map(({ field, share, accent }) => (
              <div key={field} className="py-3 grid grid-cols-[1fr_auto] gap-4 items-center text-sm">
                <span className="text-muted-foreground">{field}</span>
                <span className="font-bold" style={{ color: accent ? 'var(--brand-cyan)' : undefined }}>{share}</span>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-sm text-muted-foreground leading-7">
          2위 경쟁사(Applied Materials)는 계측·검사 시장에서 한 자릿수 점유율.{' '}
          <strong className="text-foreground">거의 모든 분야에서 KLA가 압도</strong>한다.
          그래서 매출 대비 영업이익률이 35~40%로 제조업 최상위권.
          AI 칩이 복잡해질수록 검사 가치가 올라 점유율이 더 벌어지는 중.
        </p>
      </section>

      {/* ── 9 ── */}
      <section id="s9" className="scroll-mt-20 space-y-6">
        <Kicker num="9">경쟁 구도</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">반도체 장비 "빅4"에서의 위치</h2>

        <Card>
          <div className="divide-y divide-border/40">
            {[
              { co: 'ASML 🇳🇱', role: '노광 (빛으로 회로 그리기)', rel: '다른 공정, KLA가 검사', hl: false },
              { co: 'Applied Materials 🇺🇸', role: '증착·식각 + 일부 검사', rel: '검사에선 KLA의 약한 경쟁자', hl: false },
              { co: 'Lam Research 🇺🇸', role: '식각', rel: '다른 공정', hl: false },
              { co: 'KLA 🇺🇸', role: '검사·계측 (심판)', rel: '이 분야 사실상 독점', hl: true },
            ].map(({ co, role, rel, hl }) => (
              <div key={co} className={`py-3 grid gap-1 sm:grid-cols-3 sm:gap-4 text-sm ${hl ? 'text-foreground' : ''}`}>
                <span className={`font-semibold ${hl ? 'text-foreground' : 'text-foreground/70'}`}
                  style={hl ? { color: 'var(--brand-cyan)' } : {}}>{co}</span>
                <span className="text-muted-foreground">{role}</span>
                <span className="text-muted-foreground">{rel}</span>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-sm text-muted-foreground leading-7">
          암기: 장비 빅4 = <strong className="text-foreground">ASML(노광) · AMAT(증착·식각) · Lam(식각) · KLA(검사)</strong>.
          서로 영역이 거의 안 겹친다. KLA는 "만드는" 4강이 아니라{' '}
          <strong className="text-foreground">"판정하는"</strong> 유일한 자리를 차지한다.
          고객은 TSMC, 삼성, 인텔, SK하이닉스, 마이크론 등 사실상 모든 주요 반도체 회사.
        </p>
      </section>

      {/* ── 10 ── */}
      <section id="s10" className="scroll-mt-20 space-y-6">
        <Kicker num="10">KLA Leuven (= ICOS)</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">내일 네가 실제로 가는 곳</h2>

        <div className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-emerald)_40%,transparent)] bg-[color-mix(in_oklab,var(--brand-emerald)_6%,transparent)] p-6 md:p-8 space-y-5">
          <p className="text-base leading-7">
            KLA Leuven은 KLA가 <strong>2008년 인수한 벨기에 회사 ICOS Vision Systems</strong>다.
            KU Leuven에서 나온 스핀오프로, 본래{' '}
            <strong>머신 비전 검사</strong> 전문 회사였다.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            본사 KLA가 주로 <strong className="text-foreground">전공정(앞단, 웨이퍼 검사)</strong>을 한다면,
            Leuven/ICOS는 <strong className="text-foreground">후공정(뒷단)</strong>이 전문이다.
            칩을 자르고 포장하는 단계에서{' '}
            <span className="font-semibold" style={{ color: 'var(--brand-emerald)' }}>2D·3D 비전으로 IC 패키지, 부품, 웨이퍼를 검사</span>한다.
          </p>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">🔑 외울 핵심 3가지</p>
            <ul className="space-y-2 text-sm leading-7">
              <li className="flex gap-3">
                <span className="text-muted-foreground/40 shrink-0">·</span>
                <span><strong className="text-foreground">정체:</strong> 옛 ICOS Vision Systems, 2008년 KLA 인수, KU Leuven 스핀오프.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground/40 shrink-0">·</span>
                <span><strong className="text-foreground">전문:</strong> 후공정(패키징·부품) 2D/3D 비전 검사.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground/40 shrink-0">·</span>
                <span><strong className="text-foreground">본질:</strong> 컴퓨터 비전 + 3D 비전 + 소프트웨어 회사 = 너의 영역.</span>
              </li>
            </ul>
          </div>
        </div>

        <Note label="왜 지금 더 중요한가: ">
          AI 시대엔 칩을 쌓고 붙이는 <strong>첨단 패키징(HBM·칩렛)</strong>이 폭증하는데,
          그럴수록 연결 지점이 많아져 후공정 검사 수요가 커진다.
          Leuven이 정확히 그 흐름의 한가운데 있다. 네 Pickit 3D 비전 경험이 여기에 그대로 꽂힌다.
        </Note>
      </section>

      {/* ── 11 ── */}
      <section id="s11" className="scroll-mt-20 space-y-6">
        <Kicker num="11">빠른 암기 체크</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">눈 감고 답할 수 있나</h2>

        <div className="space-y-3">
          {[
            { q: 'KLA는 한 문장으로 무슨 회사?', a: '반도체를 만들지 않고, 만든 반도체가 제대로 됐는지 검사·계측하는 세계 1위 공정 제어 회사.' },
            { q: '창립 연도와 본사는?', a: '1975년 창립(KLA Instruments), 본사 미국 캘리포니아 Milpitas.' },
            { q: '회사 역사 4마디로?', a: '1975 창립 → 1997 Tencor 합병(검사+계측) → 2008 ICOS 인수(=Leuven) → 2019 Orbotech 인수 + 사명 변경.' },
            { q: '매출·직원·CEO는?', a: '매출 약 $12.2B(FY2025, +24%), 직원 약 15,000명, CEO 겸 President는 Rick Wallace.' },
            { q: '대표 점유율 숫자 3개?', a: '광학 웨이퍼 검사 85%+, 공정 제어 전체 56%+, 레티클 검사 80%+.' },
            { q: '3대 사업 부문은?', a: 'Semiconductor Process Control(~90%), Specialty Semiconductor Process, PCB & Component Inspection.' },
            { q: '장비 빅4와 KLA의 역할은?', a: 'ASML(노광)·AMAT(증착·식각)·Lam(식각)·KLA(검사). KLA만 "판정"을 맡고 그 분야 사실상 독점.' },
            { q: 'KLA Leuven은 원래 무슨 회사?', a: 'ICOS Vision Systems(KU Leuven 스핀오프), 2008년 KLA가 인수. 후공정 2D/3D 비전 검사 전문.' },
          ].map(({ q, a }) => (
            <details key={q} className="rounded-xl border border-dashed border-border bg-card/40 backdrop-blur-sm p-4 group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80 hover:text-foreground list-none flex items-center gap-2">
                <span className="text-muted-foreground/50 group-open:rotate-90 transition-transform">▶</span>
                {q}
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted-foreground pl-4">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 12 ── */}
      <section id="s12" className="scroll-mt-20 space-y-6">
        <Kicker num="12">투어 태도</Kicker>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">아는 걸 과시하지 말 것</h2>

        <Card>
          <p className="text-sm leading-7 text-muted-foreground">
            이 자료의 목적은 <strong className="text-foreground">네 마음의 확신</strong>이지,
            남에게 지식을 뽐내기 위함이 아니다. 다 외우되, 투어에서는{' '}
            <strong className="text-foreground">듣고 질문하는 사람</strong>이 되자.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7">
            {[
              '먼저 듣고, 진심 어린 질문을 던진다. "아는 척"보다 "관심 있는 사람"이 훨씬 매력적이다.',
              '숫자를 줄줄 읊지 말 것. 대신 그 지식이 좋은 질문으로 자연스럽게 묻어 나오게.',
              '반도체 전문가인 척 금지. "비전·SW는 자신 있고, 도메인은 빠르게 배운다"가 가장 강한 포지션.',
              '겸손하되 위축되지 말 것. 너는 이미 충분히 준비됐다.',
              'Pickit 관련 기밀(IP)은 절대 언급하지 않는다.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <span className="text-muted-foreground/40 shrink-0 mt-0.5">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Note label="한 줄 마음가짐: ">
          "나는 KLA가 어떤 회사인지 이미 안다. 그러니 긴장하지 않고, 궁금한 것을 묻고,
          내가 어디서 기여할 수 있는지 자연스럽게 보여주면 된다."
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
