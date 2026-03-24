export const title = "Editor's Introduction"
export const subtitle = 'How this journal is structured after moving to a filesystem-first workflow.'
export const description = 'An introduction to the writing system behind The KKIM Journal.'
export const excerpt =
  'The site now treats local folders as the publishing source of truth, keeping writing, assets, and structure in the repository.'
export const date = '2026-03-23'
export const readTime = '6 min'
export const showToc = false

export default function EditorIntroductionPage() {
  return (
    <div className="space-y-14">
      <section id="editorial-introduction" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground">Editor&apos;s Introduction</p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            The journal is now written directly from the repository.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Each page lives in its own folder, the folder can carry local media, and a page can
            stay plain Markdown or become a custom TSX composition when the writing needs more
            structure.
          </p>
        </div>

        <figure className="w-full max-w-md justify-self-end space-y-3 border border-border bg-secondary/40 p-4">
          <img
            src="./_media/profile4.jpg"
            alt="Abstract portrait illustration"
            className="aspect-[4/5] w-full object-cover object-center"
          />
        </figure>
      </section>

      <section id="working-model" className="grid gap-8 lg:grid-cols-3">
        <article className="border-t border-border pt-5">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">01</p>
          <h3 className="mt-3 font-serif text-2xl">Markdown stays lightweight</h3>
          <p className="mt-3 text-muted-foreground leading-7">
            Most writing should remain close to text files. The site accepts inline HTML, so the
            common case still feels simple.
          </p>
        </article>

        <article className="border-t border-border pt-5">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">02</p>
          <h3 className="mt-3 font-serif text-2xl">TSX handles exceptions</h3>
          <p className="mt-3 text-muted-foreground leading-7">
            When a page needs a custom grid, notes, callouts, or a more deliberate visual sequence,
            it can export a component instead.
          </p>
        </article>

        <article className="border-t border-border pt-5">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">03</p>
          <h3 className="mt-3 font-serif text-2xl">Folders define navigation</h3>
          <p className="mt-3 text-muted-foreground leading-7">
            The header drawer reads the tree as-is, so content structure and site structure now stay
            aligned by default.
          </p>
        </article>
      </section>

      <section id="structure-rules" className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-l-2 border-foreground pl-5 text-foreground">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Working rule</p>
          <p className="mt-3 text-xl leading-8">
            If a thought belongs in the site, it should already live next to the code and assets
            that explain it.
          </p>
        </div>

        <div className="space-y-5 text-muted-foreground leading-8">
          <p>
            This makes the journal less like a separate publishing layer and more like a readable
            extension of the working tree. Drafting, revising, and organizing are all grounded in
            the same place.
          </p>
          <p>
            The goal is not novelty. It is fewer moving parts, fewer mismatches between content and
            presentation, and a system that remains understandable when the site grows.
          </p>
        </div>
      </section>

      <section id="curriculum-vitae" className="grid gap-8 border-y border-border py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground">Curriculum Vitae</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            Download the current CV in the format that fits the context.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            The industrial and academic versions live here as direct PDF downloads and can be updated independently.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/CV.industrial.pdf"
            download
            className="flex min-h-40 flex-col justify-between border border-border bg-secondary/35 p-5 transition-colors hover:bg-secondary/55"
          >
            <div className="space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">PDF / Industry</p>
              <h3 className="font-serif text-2xl">Industrial CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Intended for product, engineering, and applied research roles.
              </p>
            </div>
            <span className="text-sm uppercase tracking-[0.18em] text-foreground">Download</span>
          </a>

          <a
            href="/CV.academic.pdf"
            download
            className="flex min-h-40 flex-col justify-between border border-border bg-secondary/35 p-5 transition-colors hover:bg-secondary/55"
          >
            <div className="space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">PDF / Academic</p>
              <h3 className="font-serif text-2xl">Academic CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Intended for research, graduate study, and academic applications.
              </p>
            </div>
            <span className="text-sm uppercase tracking-[0.18em] text-foreground">Download</span>
          </a>
        </div>
      </section>

      <section id="editorial-introduction" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <figure className="w-full max-w-md justify-self-start space-y-3 border border-border bg-secondary/40 p-4">
          <img
            src="./_media/profile2.jpg"
            alt="Abstract portrait illustration"
            className="aspect-[4/5] w-full object-cover object-center"
          />
        </figure>

        <div className="space-y-6">
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Any text with some fonts look very fancy and meaningful.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Each page lives in its own folder, the folder can carry local media, and a page can
            stay plain Markdown or become a custom TSX composition when the writing needs more
            structure.
          </p>
        </div>        
      </section>
    </div>
  )
}
