export const title = "Editor's Introduction"
export const subtitle =
  'A long-form profile — narrative, tables, and the engineering principles behind the projects on the rest of this domain.'
export const description =
  'Long-form profile combining narrative, structured data, and timelines to explain the path from early math/science writing into robotics, automotive, and industrial vision work.'
export const excerpt =
  'A long-form profile of how the early math/science essays became 42 Seoul, SEA:ME, Bosch, and Pickit 3D — and what the engineering principles look like in practice.'
export const date = '2026-04-09'
export const readTime = '14 min'
export const showToc = false
export const bodyClassName = 'editor-profile-page'

/* -----------------------------------------------------------------
 * Visual primitives — small Tailwind-only helpers that recur enough
 * across this page that inlining them noisier than naming them.
 * ----------------------------------------------------------------- */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-tight leading-[1.1]">
      {children}
    </h2>
  )
}

function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <article
      className={`rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 md:p-8 ${className}`}
    >
      {children}
    </article>
  )
}

function StatCard({
  label,
  value,
  caption,
}: {
  label: string
  value: string
  caption: string
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl tracking-tight">{value}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{caption}</p>
    </div>
  )
}

/* -----------------------------------------------------------------
 * Page
 * ----------------------------------------------------------------- */

export default function EditorIntroductionPage() {
  return (
    <div className="space-y-24 pb-8">
      {/* ===== 1 · Thesis / portrait grid ===== */}
      <section id="editorial-introduction" className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <SectionEyebrow>Thesis</SectionEyebrow>
            <h2 className="font-display text-3xl leading-[1.08] tracking-tight md:text-5xl">
              From a 14-year-old writing math and science essays to shipping systems
              in robotics, automotive, and industrial vision.
            </h2>
            <p className="max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
              The page below is intentionally dense. It combines narrative with
              structured data — timelines, evidence rows, certifications — so the
              same story can be read, scanned, or verified depending on what you
              need from it.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Started coding"
                value="Age 14"
                caption="While writing math/science essays."
              />
              <StatCard
                label="Core training"
                value="42 Seoul"
                caption="Peer learning, C, systems, project rigor."
              />
              <StatCard
                label="Mobility track"
                value="SEA:ME"
                caption="Software engineering for automotive ecosystems."
              />
              <StatCard
                label="Most recent role"
                value="Pickit 3D"
                caption="Industrial robotic picking. Aug 2025 — Mar 2026."
              />
            </div>
          </div>

          <div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            data-editor-photo-grid
          >
            <img
              src="./_media/profile5.JPG"
              alt="Portrait of Kwanho Kim"
              className="block aspect-[4/5] w-full rounded-xl object-cover object-center"
            />
            <img
              src="./_media/profile6.JPG"
              alt="Portrait of Kwanho Kim in profile"
              className="block aspect-[4/5] w-full rounded-xl object-cover object-center"
            />
            <img
              src="./_media/profile7.JPG"
              alt="Portrait sequence highlighting editorial profile"
              className="block aspect-[16/7] w-full rounded-xl object-cover object-center sm:col-span-2 lg:col-span-1 xl:col-span-2"
            />
            <img
              src="./_media/profile4.jpg"
              alt="Portrait of Kwanho Kim - extended"
              className="block aspect-[3/5] w-full rounded-xl object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ===== 2 · Guiding position / pulled quote ===== */}
      <section id="guiding-position">
        <Panel className="relative">
          <SectionEyebrow>Position</SectionEyebrow>
          <h3 className="mt-4 font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">
            Stress reveals structure.
          </h3>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-8 text-muted-foreground">
            Elegant systems in ideal conditions are easy to produce. Durable
            systems under noise, delay, hardware limits, and real operators are
            not.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            Every major section below cross-links narrative with data. If a
            claim matters, it shows up as a timeline item, a row in a table, or
            an expandable block — not as a single paragraph.
          </p>
        </Panel>
      </section>

      {/* ===== 3 · Stack ===== */}
      <section id="working-language-and-tools" className="space-y-8">
        <header>
          <SectionEyebrow>Tools</SectionEyebrow>
          <SectionTitle>The stack I reach for, by what it has to survive.</SectionTitle>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel>
            <p className="text-base leading-8 text-muted-foreground">
              C, C++, Python, TypeScript, Assembly, React, ROS 1/2, Docker, Git,
              GitHub, Figma, Qt, Flutter, and CARLA are used as tools — not
              identity markers. The constant is keeping system shape under real
              constraints.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Spoken languages: Korean (native), English (professional), beginner German.
            </p>
          </Panel>

          <Panel>
            <h3 className="font-display text-xl tracking-tight">Stack by domain</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              <DomainRow
                label="Robotics & vision"
                value="C++, Python, ROS, deployment debugging."
              />
              <DomainRow
                label="Automotive & HMI"
                value="TypeScript, React, V2X interfaces, safety-first UX."
              />
              <DomainRow
                label="Embedded & prototyping"
                value="Qt, Flutter, Raspberry Pi, Arduino."
              />
              <DomainRow
                label="Workflow & delivery"
                value="Docker, GitHub, CI habits, structured test loops."
              />
            </ul>
          </Panel>
        </div>
      </section>

      {/* ===== 4 · Origin essays ===== */}
      <section id="origin-essays" className="space-y-8">
        <header>
          <SectionEyebrow>Origin</SectionEyebrow>
          <SectionTitle>
            I didn&apos;t start by building systems.
            <br />
            <span className="text-muted-foreground">
              I started by trying to explain them.
            </span>
          </SectionTitle>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Age 14 · Pol Math School
            </p>
            <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
              <p>Writing math and science essays forced me to:</p>
              <ul className="ml-4 list-disc space-y-1.5">
                <li>Define assumptions explicitly</li>
                <li>Prove relationships step by step</li>
                <li>Test logic against edge cases</li>
              </ul>
              <p>That habit stayed. I still treat systems the same way:</p>
              <p className="font-mono text-sm text-foreground">
                define → model → break → revise
              </p>
              <p className="text-sm italic">
                The difference now: I pressure-test against reality instead of paper.
              </p>
            </div>
          </Panel>

          <Panel className="p-0 md:p-0 overflow-hidden">
            <Table
              headers={['Essay / Study Topic', 'Domain', 'Method', 'Became this habit']}
              rows={[
                [
                  'Coordinate calculation from distances between three points in space',
                  'Geometry / computation',
                  'Rigorous derivation, verified against test cases',
                  'Always validate models against edge cases before trusting them.',
                ],
                [
                  'DNA replication via Scratch',
                  'Biology + simulation',
                  'Break a complex phenomenon into explicit rules; test each',
                  'Decompose systems into verifiable components.',
                ],
                [
                  'Regular pentagon in the complex plane',
                  'Pure mathematics',
                  'Symbolic proof + explicit notation of every assumption',
                  'Write systems as if someone has to prove them correct. Invisible assumptions kill systems.',
                ],
                [
                  "Darwin's evolution via EvoDots simulation",
                  'Scientific reasoning + tooling',
                  'Use simulation to test competing theories; observe which survives',
                  'Pressure-test designs. Elegance that fails under pressure is not elegant.',
                ],
              ]}
            />
          </Panel>
        </div>
      </section>

      {/* ===== 5 · Journey timeline ===== */}
      <section id="journey-timeline" className="space-y-8">
        <header>
          <SectionEyebrow>Timeline</SectionEyebrow>
          <SectionTitle>Each transition was intentional. Each closed a gap.</SectionTitle>
        </header>

        <div className="grid gap-4">
          <RoleCard
            period="Sep 2020 — Aug 2022"
            location="Seoul"
            title="42 Seoul: common core, systems discipline"
            why="Needed foundational rigor in systems thinking and C before anything else mattered."
            bullets={[
              'Built strong collaboration habits through peer evaluation, mixed-team projects, and hackathon delivery cycles.',
              'Strengthened C, debugging, and memory behavior through repeated team-based implementation.',
              'Developed an execution loop: test early, share feedback quickly, iterate as a team.',
            ]}
            accent="var(--brand-emerald)"
          />
          <RoleCard
            period="Jul 2023 — Jun 2024"
            location="Wolfsburg"
            title="SEA:ME: software meeting physical systems"
            why="Moved from pure software to systems where code meets hardware, operators, and real-world constraints."
            bullets={[
              'Software engineering in automotive and mobility contexts, with Volkswagen as co-initiator.',
              'Connected embedded, communication, and product-level decisions in one workflow.',
              'First time managing trade-offs between elegance and industrial feasibility.',
            ]}
            accent="var(--brand-cyan)"
          />
          <RoleCard
            period="Jun 2024 — Nov 2024"
            location="Stuttgart"
            title="Robert Bosch: safety-critical systems in production"
            why="Wanted to test the philosophy against safety-critical requirements where failures have real consequences."
            bullets={[
              'Built a V2X demonstrator for safety-critical automotive scenarios.',
              'Integrated across communication, software, and HMI layers.',
              'Learned what "shipped and reliable" actually means in automotive.',
            ]}
            accent="var(--brand-violet)"
          />
          <RoleCard
            period="Aug 2025 — Mar 2026"
            location="Leuven"
            title="Pickit 3D: operationalizing systems under real noise"
            why="Final test: does the philosophy hold when the system has to survive operator error, WiFi dropouts, and hardware variability all at once?"
            bullets={[
              '3D vision-powered robotic picking in production settings.',
              'Diagnosed real deployment failures (WebSocket instability, ROS node desync, timezone normalization in the log pipeline).',
              'Reduced on-site debugging cycles and prevented recurrence with validation checks.',
            ]}
            accent="var(--brand-amber)"
          />
        </div>
      </section>

      {/* ===== 6 · Evidence ===== */}
      <section id="interactive-cv-map" className="space-y-8">
        <header>
          <SectionEyebrow>Evidence</SectionEyebrow>
          <SectionTitle>Problem → approach → outcome.</SectionTitle>
        </header>

        <Panel className="p-0 md:p-0 overflow-hidden">
          <Table
            headers={['Domain', 'Problem diagnosed', 'Approach', 'Result']}
            rows={[
              [
                'Industrial robotics',
                'ROS nodes desynchronizing under packet loss; vision pipeline failing on noisy WiFi.',
                'Exponential backoff, heartbeat validation, log pipeline with timezone-aware normalization.',
                'Reduced on-site debugging cycles; recurrence blocked at validation.',
              ],
              [
                'Automotive systems',
                'V2X latency tolerance unclear; HMI interaction patterns untested for safety scenarios.',
                'React HMI with an explicit state machine for safety transitions; communication layer with deterministic delivery guarantees.',
                'Demonstrator delivered; ready for OEM validation.',
              ],
              [
                'Applied AI & simulation',
                'CNN lane detection overfitting to CARLA weather; poor transfer to real camera data.',
                'Domain randomization in simulation; multi-condition training pipeline.',
                'Model generalization improved; usable foundation for real-world deployment.',
              ],
              [
                'Full-stack & product',
                'Editorial content + deployment infra decoupled; hard to maintain and iterate.',
                'Code-content co-location in TSX; per-page media folders; dynamic transpilation with path rewriting.',
                'Editorial + engineering workflow unified — this site is the artifact.',
              ],
            ]}
          />
        </Panel>
      </section>

      {/* ===== 7 · Education + Credentials ===== */}
      <section id="education-and-certification" className="space-y-8">
        <header>
          <SectionEyebrow>Education & credentials</SectionEyebrow>
          <SectionTitle>Parallel tracks, formal degrees, practical certs.</SectionTitle>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel className="p-0 md:p-0 overflow-hidden">
            <div className="p-6 md:p-7 pb-2">
              <h3 className="font-display text-xl tracking-tight">Degrees & training</h3>
            </div>
            <Table
              headers={['Period', 'Program', 'Result']}
              rows={[
                ['2026 — present', 'B.Sc. Mechatronics', 'In progress'],
                ['2024 — 2025', 'B.Sc. Artificial Intelligence', 'GPA 3.44 / 4.5'],
                ['2019 — 2020', 'B.Sc. Computer Engineering', 'GPA 4.24 / 4.5'],
                ['2019 — 2022', 'B.Sc. Business Administration', 'GPA 3.77 / 4.5'],
                ['2020 — 2022', '42 Seoul Common Core', 'Completed'],
                ['2023 — 2025', '42 Wolfsburg Advanced Core', 'Transferred & continued'],
              ]}
            />
          </Panel>

          <Panel className="p-0 md:p-0 overflow-hidden">
            <div className="p-6 md:p-7 pb-2">
              <h3 className="font-display text-xl tracking-tight">Selected certifications</h3>
            </div>
            <Table
              headers={['Year', 'Credential', 'Issuer / level']}
              rows={[
                ['2025', 'Network management certification', 'Professional qualification'],
                ['2022', 'TOEIC Speaking 160', 'Advanced Low'],
                ['2021', 'TOEIC 860', 'Language certification'],
                ['2020', 'Engineer Information Processing', 'HRD Korea'],
                ['2020', 'Craftsman Electronic Apparatus', 'HRD Korea'],
                ['2019', 'Computer Specialist in Spreadsheet & DB · Level I', 'KCCI'],
              ]}
            />
          </Panel>
        </div>
      </section>

      {/* ===== 8 · CV download ===== */}
      <section id="curriculum-vitae" className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <SectionEyebrow>Curriculum Vitae</SectionEyebrow>
          <SectionTitle>
            PDF for formal use. This page for engineering context.
          </SectionTitle>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            The two CV files remain the official summary artifacts. This editor
            page adds the missing context — decision style, system constraints,
            and the actual evidence behind the bullets.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/CV.pdf"
            download
            className="group flex min-h-44 flex-col justify-between rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40"
          >
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                PDF · Industry
              </p>
              <h3 className="font-display text-2xl tracking-tight">Industrial CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Product engineering, robotics deployment, software integration,
                operations.
              </p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
              Download ↓
            </span>
          </a>

          <div
            aria-disabled="true"
            className="flex min-h-44 flex-col justify-between rounded-2xl border border-dashed border-border bg-card/20 p-5 opacity-60"
          >
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                PDF · Academic
              </p>
              <h3 className="font-display text-2xl tracking-tight">Academic CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Graduate applications, research trajectory, formal educational
                history.
              </p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Coming soon
            </span>
          </div>
        </div>
      </section>

      {/* ===== 9 · Recurring themes ===== */}
      <section id="what-this-journal-tracks">
        <Panel>
          <SectionEyebrow>Recurring themes</SectionEyebrow>
          <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight leading-[1.1]">
            What I keep coming back to.
          </h3>
          <p className="mt-3 text-sm italic text-muted-foreground">
            The real engineering: what breaks, why it breaks, what we learn from it.
          </p>

          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            <ThemeItem
              label="Invisible assumptions"
              body="How systems pass all tests, then fail in production the moment an assumption is violated."
            />
            <ThemeItem
              label="Operator reality"
              body="How software and hardware behave under human error, fatigue, and real-world constraints designers didn't anticipate."
            />
            <ThemeItem
              label="Interface clarity"
              body="How systems die because two teams can't see the same problem. Clarity in interface design prevents that death."
            />
            <ThemeItem
              label="Decisions over time"
              body="How architecture choices made under pressure look different 18 months later, after three production incidents."
            />
          </ul>
        </Panel>
      </section>
    </div>
  )
}

/* -----------------------------------------------------------------
 * Section-local helpers
 * ----------------------------------------------------------------- */

function DomainRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="grid gap-1 sm:grid-cols-[10.5rem_1fr] sm:gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/80">
        {label}
      </span>
      <span>{value}</span>
    </li>
  )
}

function RoleCard({
  period,
  location,
  title,
  why,
  bullets,
  accent,
}: {
  period: string
  location: string
  title: string
  why: string
  bullets: string[]
  accent: string
}) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 md:p-7">
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          {period}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {location}
        </span>
      </header>
      <h3 className="mt-3 font-display text-2xl tracking-tight leading-tight">{title}</h3>
      <p className="mt-4 max-w-3xl rounded-md border-l-2 border-border bg-background/40 px-4 py-2 text-sm italic leading-7 text-muted-foreground" style={{ borderLeftColor: accent }}>
        <span className="font-medium not-italic text-foreground">Why here:</span> {why}
      </p>
      <ul className="mt-5 ml-1 space-y-2 text-sm leading-7 text-muted-foreground">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex gap-3">
            <span className="select-none text-foreground/40">·</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Table({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-border/60 px-5 py-3 text-left font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border/40 last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-5 py-4 align-top leading-6 ${
                    cellIndex === 0
                      ? 'text-foreground/90 font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ThemeItem({ label, body }: { label: string; body: string }) {
  return (
    <li className="rounded-xl border border-border/40 bg-background/30 p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p>
    </li>
  )
}
