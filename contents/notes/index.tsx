export const title = 'Notes'
export const description = '공부하면서 정리한 노트. 반도체, AI, 기업 분석.'
export const excerpt = '반도체 완전정복, AI 완전정복, KLA Corporation — 직접 공부하며 그림으로 정리한 노트.'
export const date = '2026-06-15'
export const category = '노트'
export const showToc = false

const notes = [
  {
    href: '/notes/semiconductor',
    label: '반도체',
    title: '반도체 완전정복',
    subtitle: '모래에서 인공지능까지, 18장',
    excerpt: '원자 한 개부터 트랜지스터·CMOS·메모리·8대 공정·검사·패키징까지 — 비전공자를 위한 시각적 강의.',
    readTime: '35 min',
    accent: 'var(--brand-cyan)',
  },
  {
    href: '/notes/ai',
    label: 'AI',
    title: 'AI 완전정복',
    subtitle: '데이터로 배운다는 발상부터 에이전트까지, 20장',
    excerpt: '뉴런·CNN·Transformer·LLM부터 RAG·도구/MCP·에이전트·추론 모델까지 — 개념의 흐름을 처음부터 끝까지.',
    readTime: '40 min',
    accent: 'var(--brand-violet)',
  },
  {
    href: '/notes/kla',
    label: 'KLA',
    title: 'KLA Corporation',
    subtitle: '반도체를 검사하는 세계 1위 회사, 한눈에',
    excerpt: 'KLA의 숫자·역사·사업부·경쟁 구도·KLA Leuven까지 — 반도체 공정 제어의 사실상 독점 기업을 12섹션으로.',
    readTime: '18 min',
    accent: 'var(--brand-emerald)',
  },
]

export default function NotesIndexPage() {
  return (
    <div className="space-y-8 pb-8">
      <p className="text-muted-foreground leading-7 max-w-2xl">
        공부하면서 직접 정리한 노트입니다. 외부 링크 없이 읽을 수 있도록 필요한 개념을 안에 담았습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <a
            key={note.href}
            href={note.href}
            className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 transition-all hover:-translate-y-1 hover:border-foreground/30"
          >
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: note.accent }}
              >
                {note.label} · {note.readTime}
              </p>
              <h2 className="mt-2 font-display text-xl tracking-tight leading-snug">
                {note.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{note.subtitle}</p>
            </div>
            <p className="text-sm leading-6 text-muted-foreground line-clamp-3">{note.excerpt}</p>
            <span
              className="mt-auto font-mono text-[11px] transition-colors text-muted-foreground group-hover:text-foreground"
              style={{}}
            >
              Read →
            </span>
          </a>
        ))}
      </div>

      <aside className="mt-10 flex items-start gap-3 rounded-xl border border-border/50 bg-card/30 px-5 py-4 text-xs leading-6 text-muted-foreground">
        <span aria-hidden className="mt-0.5 text-sm leading-none">
          ⓘ
        </span>
        <span>
          <span className="font-mono uppercase tracking-[0.18em] text-muted-foreground/80">AI-generated</span> · 이
          노트들은 <strong className="font-semibold text-foreground">Claude(AI)</strong>로 작성·정리한 콘텐츠입니다. 사실
          확인을 거쳤지만 오류가 있을 수 있으니, 중요한 내용은 원 출처로 다시 확인하시길 권합니다.
        </span>
      </aside>
    </div>
  )
}
