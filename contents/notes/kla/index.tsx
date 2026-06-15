import {
  NoteRoot,
  Section,
  Kicker,
  H2,
  H3,
  P,
  Card,
  Grid2,
  Box,
  Note,
  Callout,
  Deep,
  Quiz,
  Flow,
  StatGrid,
  Timeline,
  NTable,
  Punch,
  Bars,
  Glossary,
  Hl,
  HlG,
  B,
  Em,
} from '@/components/notes'

export const title = 'KLA Corporation'
export const subtitle =
  '반도체를 만들지 않는다 — 만들어진 반도체가 제대로 만들어졌는지 검사·계측하는 세계 1위 회사. 역사, 사업 구조, 시장 지위, 그리고 KLA Leuven까지 한눈에 정리.'
export const description =
  'KLA Corporation 정리 — 한 줄 정체부터 핵심 숫자, 50년 역사, 3대 사업, 시장 점유율, 경쟁 구도, KLA Leuven(옛 ICOS)까지. 반도체 공정 제어(Process Control)의 사실상 독점 기업.'
export const excerpt =
  '1975년 창립, 본사 Milpitas, 매출 약 $12.2B, 광학 웨이퍼 검사 점유율 85%+. "ASML이 공장을 짓게 한다면 KLA는 그 공장이 제대로 돌아가게 한다."'
export const date = '2026-06-15'
export const readTime = '18 min'
export const lang = 'ko'
export const showToc = true
export const category = '노트'
export const toc = [
  { id: 's1', label: '1. 한 줄 정체', level: 2 },
  { id: 's2', label: '2. 핵심 숫자', level: 2 },
  { id: 's3', label: '3. 50년 역사', level: 2 },
  { id: 's4', label: '4. 미션 · 비전 · 가치', level: 2 },
  { id: 's5', label: '5. 리더십 · 규모', level: 2 },
  { id: 's6', label: '6. 3대 사업 부문', level: 2 },
  { id: 's7', label: '7. 제품 · 기술', level: 2 },
  { id: 's8', label: '8. 공정 제어의 가치', level: 2 },
  { id: 's9', label: '9. 시장 점유율', level: 2 },
  { id: 's10', label: '10. 경쟁 구도', level: 2 },
  { id: 's11', label: '11. KLA Leuven (= ICOS)', level: 2 },
  { id: 's12', label: '12. 요점 정리 Q&A', level: 2 },
  { id: 's13', label: '＊ 핵심 용어', level: 2 },
]

export default function KLAPage() {
  return (
    <NoteRoot accent="var(--brand-cyan)">
      {/* 1 */}
      <Section id="s1">
        <Kicker num="1">한 줄 정체</Kicker>
        <H2>KLA가 정확히 뭐 하는 회사인가</H2>
        <Punch>
          KLA는 반도체를 <Hl>만들지 않는다</Hl>.<br />
          만든 반도체가 <Hl>제대로 만들어졌는지 검사·계측</Hl>하는<br />
          세계 1위 회사다.
        </Punch>
        <P>
          업계 표현으로는{' '}
          <Em>"ASML이 공장을 짓게 한다면, KLA는 그 공장이 제대로 돌아가게 한다."</Em> 칩 제조 1,000여 단계 사이사이에
          끼어들어 "결함이 있나, 치수가 맞나"를 판정하는 <B>공정 제어(Process Control)</B>의 절대 강자다. 이 분야
          점유율이 사실상 독점 수준이라 "반도체 업계의 숨은 권력자"로 불린다.
        </P>
      </Section>

      {/* 2 */}
      <Section id="s2">
        <Kicker num="2">핵심 숫자</Kicker>
        <H2>이 회사를 숫자로 요약하면</H2>
        <StatGrid
          stats={[
            { v: '1975', l: '창립 연도\n(KLA Instruments)' },
            { v: '1997', l: 'Tencor와 합병\n→ KLA-Tencor' },
            { v: '2019', l: '사명 변경\n→ KLA Corporation' },
            { v: 'Milpitas', l: '본사\n캘리포니아, 미국' },
            { v: '~15,000', l: '전 세계 직원 수' },
            { v: '$12.2B', l: '매출 (FY2025)\n전년 대비 +24%' },
            { v: '~35–40%', l: '영업이익률\n(제조업 최상위)' },
            { v: '85%+', l: '광학 웨이퍼\n검사 점유율' },
            { v: '56%+', l: '공정 제어\n전체 점유율' },
            { v: '80%+', l: '레티클(마스크)\n검사 점유율' },
            { v: 'R. Wallace', l: 'CEO 겸 President\n(약 20년 재임)' },
            { v: 'KLAC', l: '나스닥 티커\n(장비 빅4)' },
          ]}
        />
        <Callout label="한 문장으로: ">
          "1975년 창립, 본사 미국 Milpitas, 매출 약 <B>122억 달러</B>, 직원 약 <B>1.5만 명</B>, 광학 웨이퍼 검사
          점유율 <B>85% 이상</B>의 검사·계측 1위 회사." 이 한 문장에 회사의 정체가 거의 다 들어 있다.
        </Callout>
      </Section>

      {/* 3 */}
      <Section id="s3">
        <Kicker num="3">역사</Kicker>
        <H2>50년, 검사 한 우물</H2>
        <Timeline
          items={[
            { y: '1975', t: 'Ken Levy와 Bob Anderson이 캘리포니아에서 KLA Instruments 창립. 반도체 결함 검사에 집중.' },
            { y: '1976', t: '첫 제품 모델 1000 출시. 당시 획기적인 자동 레티클/웨이퍼 검사 장비.' },
            {
              y: '1976',
              t: '한편 Tencor Instruments가 설립(박막 두께 정밀 측정, 1984년 레이저 스캐닝 입자 검출 개발).',
            },
            {
              y: '1997',
              t: (
                <>
                  KLA Instruments + Tencor 합병 → <B>KLA-Tencor</B> 탄생. 검사 + 계측을 한 회사로. 합산 매출 이미 10억
                  달러+.
                </>
              ),
            },
            { y: '2006', t: 'ADE 인수 (웨이퍼 계측 강화).' },
            {
              y: '2008',
              t: (
                <>
                  ICOS Vision Systems(벨기에, KU Leuven 스핀오프) 인수 → 후공정·패키징 2D/3D 검사 확보.{' '}
                  <HlG>= 오늘날 KLA Leuven</HlG>.
                </>
              ),
            },
            { y: '2019', t: 'Orbotech(이스라엘) 인수 완료 → PCB, 평판디스플레이(FPD), 첨단 패키징 검사로 확장.' },
            {
              y: '2019',
              t: (
                <>
                  사명을 <B>KLA Corporation</B>으로 단순화. 검사·계측을 넘어선 넓은 포트폴리오를 반영.
                </>
              ),
            },
          ]}
        />
        <P>
          역사를 네 마디로 압축하면:{' '}
          <B>1975 창립 → 1997 Tencor 합병(검사+계측) → 2008 ICOS(=Leuven) → 2019 Orbotech + 사명 변경.</B>
        </P>
      </Section>

      {/* 4 */}
      <Section id="s4">
        <Kicker num="4">미션 · 비전 · 가치</Kicker>
        <H2>회사가 스스로 말하는 정체성</H2>
        <Grid2>
          <Box icon="🎯" title="미션 (Mission)">
            차별화된 <B>검사·계측 솔루션</B>을 제공해, 고객이 학습과 혁신을 가속하도록 돕는 기술 리더가 되는 것.
          </Box>
          <Box icon="🔭" title="비전 (Vision)">
            <B>공정 제어와 수율 관리(yield management)</B>의 리더로서 세상의 디지털 전환을 가능하게 하는 것.
          </Box>
        </Grid2>
        <Card>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
            🧭 핵심 가치 (Core Values)
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            한마디로 <span className="font-semibold" style={{ color: 'var(--brand-amber)' }}>Integrity(정직·신뢰)</span>가
            토대다. 검사 데이터가 수십억 달러짜리 생산 결정을 좌우하므로 "데이터의 정확성과 신뢰"가 회사의 생명이다.
            여기에 <B>끈기(perseverance)</B>와 <B>탁월함(excellence)·고성과 팀워크</B>를 더한다.
          </p>
        </Card>
        <Note label="왜 흥미로운가: ">
          "데이터 정확성에 대한 집착"은 추상적 구호가 아니라 곧 검사·계측의 본질이자 소프트웨어 품질·신뢰성의 문제다.
          KLA를 "측정 회사"가 아니라 "신뢰 가능한 데이터 회사"로 보면 사업의 결이 더 선명해진다.
        </Note>
      </Section>

      {/* 5 */}
      <Section id="s5">
        <Kicker num="5">리더십 · 본사 · 규모</Kicker>
        <H2>누가, 어디서, 얼마나 크게</H2>
        <NTable
          head={['항목', '내용']}
          rows={[
            [<B>CEO 겸 President</B>, 'Rick Wallace (Richard P. Wallace). KLA에서 30년 이상, CEO만 약 20년. 이사회 멤버.'],
            [<B>Semi PC President</B>, 'Ahmad Khan. 핵심 제품·고객 조직(Semiconductor Products and Customers) 총괄.'],
            [<B>본사</B>, '미국 캘리포니아 Milpitas (실리콘밸리).'],
            [<B>직원</B>, '전 세계 약 15,000명.'],
            [<B>상장</B>, '나스닥 KLAC. 반도체 장비 "빅4" 중 하나.'],
            [<B>매출</B>, 'FY2025 약 $12.2B (전년 +24%). AI·HBM 투자 수요가 견인.'],
          ]}
        />
        <P>
          KLA는 글로벌 R&D·서비스 거점을 여러 나라에 두며, 그중 하나가 벨기에 <B>Leuven</B> 사이트(옛 ICOS, 11장)다.
          매년 3월경 Investor Day로 중기 전략을 공유한다.
        </P>
      </Section>

      {/* 6 */}
      <Section id="s6">
        <Kicker num="6">3대 사업 부문</Kicker>
        <H2>무엇으로 돈을 버는가</H2>
        <P>
          공식 보고 부문은 셋. 그중 <B>반도체 공정 제어</B>가 매출의 약 90%로 압도적이다.
        </P>
        <NTable
          head={['부문', '하는 일', '비중']}
          rows={[
            [
              <B>Semiconductor Process Control</B>,
              '웨이퍼 검사, 레티클(마스크) 검사, 계측 — 회사의 심장',
              <Hl>~90%</Hl>,
            ],
            [
              <B>Specialty Semiconductor Process</B>,
              '특수 공정 장비(식각·증착 일부), 첨단 패키징·MEMS·파워반도체',
              '소규모',
            ],
            [<B>PCB & Component Inspection</B>, '인쇄회로기판·부품·디스플레이 검사 (옛 Orbotech, ICOS 일부)', '소규모'],
          ]}
        />
        <H3>제품 라인별 매출 (FY2025, 근사치)</H3>
        <Bars
          rows={[
            { nm: '결함 검사', pct: 100, val: '$6.2B' },
            { nm: '서비스', pct: 43, val: '$2.7B' },
            { nm: '패터닝(계측)', pct: 35, val: '$2.2B' },
            { nm: '특수 공정', pct: 8, val: '$0.5B' },
            { nm: 'PCB·부품', pct: 6, val: '$0.4B' },
          ]}
          unit={
            <>
              <B>결함 검사($6.2B)가 단연 1위</B>, 그다음 서비스($2.7B)와 패터닝/계측($2.2B). 서비스 매출이 크다는 건 한 번
              깔린 장비에서 <B>꾸준한 반복 수익</B>이 나온다는 뜻 — 강력한 락인(lock-in)이다.
            </>
          }
        />
        <Deep title="한 걸음 더 · '면도기-면도날' 모델과 사이클 방어">
          서비스 매출 $2.7B가 중요한 이유는 단순히 크기 때문이 아니다. 장비 회사는 본래 <B>경기 사이클에 취약</B>하다 — 팹이
          투자를 줄이면 신규 장비 주문이 뚝 끊긴다. 그런데 한 번 팹에 깔린 검사 장비는 공장이 돌아가는 한 유지보수·부품·
          소프트웨어 업그레이드를 계속 사야 한다. 이 <Em>설치 기반(installed base)에서 나오는 반복 수익</Em>이 불황기의 바닥을
          받쳐주고, 고객을 묶어둔다(전환 비용↑). "장비를 한 번 판다"가 아니라 "수율 보장을 구독시킨다"에 가까운 구조라, KLA의
          이익률이 제조업 최상위(35~40%)인 비결의 하나다.
        </Deep>
      </Section>

      {/* 7 */}
      <Section id="s7">
        <Kicker num="7">제품 · 기술</Kicker>
        <H2>KLA가 파는 "눈"의 종류</H2>
        <Card>
          <ul className="space-y-2.5">
            {[
              ['광학 검사 (Optical inspection)', '빛으로 빠르게 넓은 면적의 결함을 찾음. Brightfield(밝은 시야)·Darkfield(어두운 시야) 두 방식.'],
              ['전자빔 검사 (E-beam)', '느리지만 광학으로 못 보는 나노급 미세 결함까지 검출. 속도↔해상도의 정반대 끝.'],
              ['레티클(포토마스크) 검사', '회로 원판인 마스크의 결함 검사. 마스크 한 장의 결함은 모든 웨이퍼로 복제되므로 치명적 (점유율 80%+).'],
              ['계측 (Metrology)', '선폭(CD), 막 두께, 층 정렬(Overlay)을 정밀 측정. "있나/없나"가 아니라 "정확히 얼마인가".'],
              ['패키징·부품 검사', '후공정의 2D/3D 비전 검사 — KLA Leuven/ICOS의 전문 영역(11장).'],
              ['소프트웨어·데이터 분석', '검사 데이터를 AI로 분석해 수율을 끌어올리는 솔루션. 장비를 넘어선 부가가치이자 락인의 핵심.'],
            ].map(([name, desc]) => (
              <li key={name as string} className="flex gap-3 text-sm leading-7">
                <span className="shrink-0 mt-0.5" style={{ color: 'var(--brand-cyan)' }}>
                  ▹
                </span>
                <span>
                  <B>{name}</B> — <span className="text-muted-foreground">{desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <Deep title="한 걸음 더 · Brightfield vs Darkfield">
          밝은 시야(Brightfield)는 표면을 정면으로 비춰 패턴 자체의 이상을 보고, 어두운 시야(Darkfield)는 비스듬히 쏜 빛이
          결함에 부딪혀 <B>튕겨 나오는 산란광</B>만 모아 본다. 그래서 Darkfield는 미세한 입자·긁힘을 어두운 배경 위 밝은
          점으로 도드라지게 잡는다. 두 방식 모두에서 KLA가 점유율 1위다.
        </Deep>
      </Section>

      {/* 8 */}
      <Section id="s8">
        <Kicker num="8">공정 제어의 가치</Kicker>
        <H2>왜 "검사"가 아니라 "공정 제어"인가</H2>
        <P>
          검사·계측의 진짜 목적은 단순히 불량을 골라내는 게 아니다. 그 데이터를 공정에 <B>피드백</B>해 불량의 원인을 잡는
          것이다. "이 단계에서 자꾸 결함이 난다 → 장비를 이렇게 조정하라." 그래서 사업명이 단순한 Inspection이 아니라{' '}
          <Hl>Process Control(공정 제어)</Hl>이다.
        </P>
        <Flow
          steps={[
            { icon: '📷', title: '이미지 획득', desc: '광학·전자빔으로 웨이퍼 촬영' },
            { icon: '🧮', title: '결함 검출', desc: '정상 패턴과 비교, 이상 탐지' },
            { icon: '🏷️', title: '분류', desc: '결함 종류 자동 분류(AI/딥러닝)' },
            { icon: '🔧', title: '공정 피드백', desc: '원인 찾아 장비 조정 → 수율↑' },
          ]}
        />
        <Note label="핵심: ">
          이 흐름 전체가 <B>컴퓨터 비전 + 데이터 분석 + 소프트웨어</B> 문제다. 광학·물리가 이미지를 "만든다"면,
          그 이미지를 신뢰 가능한 판정으로 바꾸는 일은 소프트웨어의 몫이다. KLA의 해자(moat)가 장비 하드웨어만이 아니라
          수십 년 쌓은 결함 데이터와 알고리즘에 있는 이유다.
        </Note>
        <Deep title="한 걸음 더 · 수율의 경제학 (검사가 왜 돈이 되나)">
          최신 팹은 웨이퍼 한 장에 수천 달러가 들고, 한 달에 수만~수십만 장을 돌린다. 여기서 <B>수율(정상 칩 비율)이 1%포인트
          오르면</B> 곧장 수백만~수천만 달러의 추가 이익이 된다. 검사·계측 장비는 그 자체로는 칩을 한 개도 안 만들지만,
          "어디서 불량이 나는지"를 빨리 짚어 수율을 끌어올린다. 즉 KLA가 파는 건 장비가 아니라 <Em>수율(=돈)</Em>이다. 그래서
          호황·불황을 가리지 않고 팹은 검사에 투자하고, 미세화·적층으로 공정이 까다로워질수록 검사의 ROI는 더 커진다.
        </Deep>
      </Section>

      {/* 9 */}
      <Section id="s9">
        <Kicker num="9">시장 점유율</Kicker>
        <H2>숫자로 보는 "사실상 독점"</H2>
        <Bars
          rows={[
            { nm: '광학 웨이퍼 검사', pct: 85, val: '85%+' },
            { nm: '레티클 검사', pct: 80, val: '80%+' },
            { nm: 'Brightfield', pct: 60, val: '~60%' },
            { nm: '공정 제어 전체', pct: 56, val: '56%+' },
            { nm: 'Darkfield', pct: 52, val: '50%+' },
            { nm: 'CD 계측', pct: 45, val: '~45%' },
            { nm: 'Overlay 계측', pct: 40, val: '~40%' },
          ]}
          unit={
            <>
              2위(Applied Materials)는 계측·검사 시장에서 한 자릿수 점유율. <B>거의 모든 분야에서 KLA가 압도</B>한다. 그래서
              영업이익률이 35~40%로 제조업 최상위권이고, AI 칩이 복잡해질수록 검사 가치가 올라 격차가 더 벌어지는 중이다.
            </>
          }
        />
      </Section>

      {/* 10 */}
      <Section id="s10">
        <Kicker num="10">경쟁 구도</Kicker>
        <H2>반도체 장비 "빅4"에서의 위치</H2>
        <NTable
          head={['회사', '역할', '관계']}
          rows={[
            ['ASML 🇳🇱', '노광 (빛으로 회로 그리기)', '다른 공정, KLA가 검사'],
            ['Applied Materials 🇺🇸', '증착·식각 + 일부 검사', '검사에선 KLA의 약한 경쟁자'],
            ['Lam Research 🇺🇸', '식각', '다른 공정'],
            [
              <span className="font-semibold" style={{ color: 'var(--brand-cyan)' }}>
                KLA 🇺🇸
              </span>,
              <B>검사·계측 (심판)</B>,
              '이 분야 사실상 독점',
            ],
          ]}
        />
        <P>
          장비 빅4 = <B>ASML(노광) · AMAT(증착·식각) · Lam(식각) · KLA(검사)</B>. 서로 영역이 거의 겹치지 않는다. KLA는
          "만드는" 4강이 아니라 <B>"판정하는"</B> 유일한 자리를 차지한다. 고객은 TSMC, 삼성, 인텔, SK하이닉스, 마이크론 등
          사실상 모든 주요 반도체 회사다.
        </P>
      </Section>

      {/* 11 */}
      <Section id="s11">
        <Kicker num="11">KLA Leuven (= ICOS)</Kicker>
        <H2>벨기에 Leuven의 후공정 비전 검사 거점</H2>
        <div
          className="nt-card rounded-2xl border p-6 md:p-8 space-y-5"
          style={{
            borderColor: 'color-mix(in oklab, var(--brand-emerald) 38%, transparent)',
            background:
              'linear-gradient(135deg, color-mix(in oklab, var(--brand-emerald) 9%, transparent), color-mix(in oklab, var(--card) 55%, transparent))',
          }}
        >
          <p className="text-base leading-7">
            KLA Leuven은 KLA가 <B>2008년 인수한 벨기에 회사 ICOS Vision Systems</B>다. KU Leuven에서 나온 스핀오프로, 본래{' '}
            <B>머신 비전 검사</B> 전문 회사였다.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            본사 KLA가 주로 <B>전공정(앞단, 웨이퍼 검사)</B>을 담당한다면, Leuven/ICOS는 <B>후공정(뒷단)</B>이 전문이다. 칩을
            자르고 포장하는 단계에서 <HlG>2D·3D 비전으로 IC 패키지, 부품, 웨이퍼를 검사</HlG>한다(역사적으로 LED·솔라셀
            검사도 강했다).
          </p>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">🔑 핵심 3가지</p>
            <ul className="space-y-2 text-sm leading-7">
              <li className="flex gap-3">
                <span className="shrink-0" style={{ color: 'var(--brand-emerald)' }}>
                  ▹
                </span>
                <span>
                  <B>정체:</B> 옛 ICOS Vision Systems, 2008년 KLA 인수, KU Leuven 스핀오프.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" style={{ color: 'var(--brand-emerald)' }}>
                  ▹
                </span>
                <span>
                  <B>전문:</B> 후공정(패키징·부품) 2D/3D 비전 검사.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" style={{ color: 'var(--brand-emerald)' }}>
                  ▹
                </span>
                <span>
                  <B>본질:</B> 컴퓨터 비전 + 3D 비전 + 소프트웨어 회사.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <Deep title="한 걸음 더 · 전공정 vs 후공정 검사, 그리고 왜 후공정이 뜨나">
          오래 KLA의 본진은 <B>전공정</B>(웨이퍼에 회로를 새기는 단계) 검사였다 — 가장 미세하고 가장 비싼 영역. 반면{' '}
          <B>후공정</B>(자르고 쌓고 붙이는 단계)은 상대적으로 검사 강도가 낮았다. 그런데 미세화가 한계에 부딪히면서 성능 향상의
          무게추가 "더 작게"에서 "<Em>더 잘 붙이기</Em>"(HBM·칩렛·2.5D)로 옮겨갔고, 그만큼 후공정에서 검사할 연결 지점이
          폭증했다. KLA가 2008년 ICOS(→Leuven)를 인수해 후공정 2D/3D 비전을 확보해 둔 것이 지금 와서 절묘하게 맞아떨어진
          이유다 — 전공정의 강자가 후공정 성장 파도까지 올라타는 그림.
        </Deep>
        <Note label="왜 지금 더 중요한가: ">
          AI 시대엔 칩을 쌓고 붙이는 <B>첨단 패키징(HBM·칩렛)</B>이 폭증한다. 그럴수록 연결 지점(범프·본딩)이 많아져 하나만
          어긋나도 비싼 묶음 전체가 불량이 되고, 따라서 후공정 검사 수요가 빠르게 커진다. Leuven이 정확히 그 흐름의
          한가운데 있다.
        </Note>
      </Section>

      {/* 12 */}
      <Section id="s12">
        <Kicker num="12">요점 정리</Kicker>
        <H2>한 문장씩 답해보는 Q&amp;A</H2>
        <div className="space-y-3">
          {[
            ['KLA는 한 문장으로 무슨 회사?', '반도체를 만들지 않고, 만든 반도체가 제대로 됐는지 검사·계측하는 세계 1위 공정 제어 회사.'],
            ['창립 연도와 본사는?', '1975년 창립(KLA Instruments), 본사 미국 캘리포니아 Milpitas.'],
            ['회사 역사 4마디로?', '1975 창립 → 1997 Tencor 합병(검사+계측) → 2008 ICOS 인수(=Leuven) → 2019 Orbotech 인수 + 사명 변경.'],
            ['매출·직원·CEO는?', '매출 약 $12.2B(FY2025, +24%), 직원 약 15,000명, CEO 겸 President는 Rick Wallace.'],
            ['대표 점유율 숫자 3개?', '광학 웨이퍼 검사 85%+, 공정 제어 전체 56%+, 레티클 검사 80%+.'],
            ['3대 사업 부문은?', 'Semiconductor Process Control(~90%), Specialty Semiconductor Process, PCB & Component Inspection.'],
            ['장비 빅4와 KLA의 역할은?', 'ASML(노광)·AMAT(증착·식각)·Lam(식각)·KLA(검사). KLA만 "판정"을 맡고 그 분야 사실상 독점.'],
            ['KLA Leuven은 원래 무슨 회사?', 'ICOS Vision Systems(KU Leuven 스핀오프), 2008년 KLA가 인수. 후공정 2D/3D 비전 검사 전문.'],
          ].map(([q, a]) => (
            <Quiz key={q as string} q={q}>
              {a}
            </Quiz>
          ))}
        </div>
        <Note label="한 호흡에 정리: ">
          KLA = 반도체를 <B>만들지 않고 판정하는</B> 회사 → 1975년부터 검사 한 우물 → 공정 제어 점유율 사실상 독점 →
          매출의 90%가 검사·계측 → 미세화·첨단 패키징이 어려워질수록 더 필요해지는, 반도체 산업의 숨은 권력자.
        </Note>
      </Section>

      {/* glossary */}
      <Section id="s13">
        <Kicker num="＊">핵심 용어</Kicker>
        <H2>자주 나오는 단어 정리</H2>
        <Glossary
          terms={[
            { w: '공정 제어', en: 'Process Control', m: '검사·계측 데이터를 공정에 피드백해 수율을 관리하는 분야. KLA의 핵심 사업.' },
            { w: '검사 / 계측', en: 'Inspection / Metrology', m: '결함이 있나 찾기 / 치수가 설계대로인가 재기.' },
            { w: '레티클', en: 'Reticle / Photomask', m: '회로 패턴 원판. 한 장의 결함이 모든 웨이퍼로 복제돼 검사가 치명적으로 중요.' },
            { w: 'Overlay', en: '오버레이', m: '여러 층이 정확히 겹쳐졌는지 보는 계측. 미세화될수록 정렬 허용오차가 가혹해진다.' },
            { w: '전공정 / 후공정', en: 'Front-end / Back-end', m: '웨이퍼에 회로 새기기 / 잘라서 패키징·검사. KLA Leuven은 후공정 검사.' },
            { w: '수율', en: 'Yield', m: '만든 칩 중 정상 작동 비율. 공정 제어의 최종 목표이자 반도체 수익의 핵심 지표.' },
          ]}
        />
      </Section>
    </NoteRoot>
  )
}
