export const title = 'Notes'
export const description = '공부하면서 정리한 노트. 반도체, AI, 기업 분석.'
export const excerpt = '반도체 기초, AI 완전정복, KLA 완전암기 — 직접 공부하며 쓴 정리 노트.'
export const date = '2026-06-15'
export const category = '노트'
export const showToc = false

const notes = [
  {
    href: '/notes/semiconductor',
    label: '반도체',
    title: '반도체 기초 강의',
    subtitle: '모래 한 줌이 생각하는 기계가 되기까지',
    excerpt: '트랜지스터에서 집적회로, 8대 공정, 검사까지 — 반도체를 처음부터 시각적으로 쌓아 올린다.',
    readTime: '20 min',
    accent: 'var(--brand-cyan)',
  },
  {
    href: '/notes/ai',
    label: 'AI',
    title: 'AI 완전정복',
    subtitle: '퍼셉트론부터 에이전트까지, 20장 완주',
    excerpt: '퍼셉트론·CNN·Transformer·LLM·RAG·에이전트·추론 최적화까지 — 개념의 흐름을 따라 처음부터 끝까지.',
    readTime: '35 min',
    accent: 'var(--brand-violet)',
  },
  {
    href: '/notes/kla',
    label: 'KLA',
    title: 'KLA 완전암기',
    subtitle: 'KLA Corporation 핵심 수치·역사·전략 12섹션',
    excerpt: 'KLA의 숫자, 역사, 사업부, 경쟁사, KLA Leuven까지 — 면접 전날 밤에도 완주할 수 있는 밀도.',
    readTime: '25 min',
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
    </div>
  )
}
