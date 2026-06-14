export const title = 'Kwanho Kim — Engineering Profile'
export const subtitle =
  'Full-stack engineer for real-time systems in robotics and automotive.'
export const description =
  'Kwanho Kim — software engineer with production experience across ROS/robotics, V2X automotive communication, and full-stack systems. Background in 42 Seoul, SEA:ME, Bosch, and Pickit 3D.'
export const excerpt =
  'From 42 Seoul and SEA:ME through Bosch and Pickit 3D: the technical path, the decisions behind each role, and the engineering patterns that keep showing up.'
export const date = '2026-05-25'
export const readTime = '12 min'
export const showToc = false
export const bodyClassName = 'editor-profile-page'

/* -----------------------------------------------------------------
 * Visual primitives
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

/* -----------------------------------------------------------------
 * Page
 * ----------------------------------------------------------------- */

export default function EditorIntroductionPage() {
  return (
    <div className="space-y-24 pb-8">

      {/* ===== 1 · Hero ===== */}
      <section id="editorial-introduction" className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">

          {/* Left — text */}
          <div className="space-y-6">
            <SectionEyebrow>Profile</SectionEyebrow>
            <h2 className="font-display text-3xl leading-[1.08] tracking-tight md:text-5xl">
              Systems fail at boundaries.
              <br />
              <span className="text-muted-foreground">I work on the boundaries.</span>
            </h2>
            <p className="max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
              Software engineer with production experience across robotics
              (ROS1/2, WebSocket, embedded C), automotive (V2X, CAN, AUTOSAR),
              and full-stack product work (React, TypeScript, Node). 42 Seoul
              for systems fundamentals, SEA:ME for automotive depth, Bosch for
              safety-critical constraints, Pickit 3D for operator-facing
              production reality.
            </p>
            <p className="max-w-2xl text-sm leading-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Status
              </span>{' '}
              <span className="text-foreground">Leuven, Belgium</span>
              <span className="text-muted-foreground">
                {' '}— building{' '}
                <a
                  href="https://earprint.kwanho.dev"
                  className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  Earprint
                </a>{' '}
                and{' '}
                <a
                  href="https://ai.kwanho.dev"
                  className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  Ariadne
                </a>
                .{' '}
              </span>
              <span className="font-medium text-foreground">Available for full-time roles.</span>
            </p>

            {/* Career timeline strip */}
            <div className="pt-2">
              <div className="flex items-stretch gap-0 overflow-x-auto pb-1">
                {[
                  { year: '14', label: 'Started coding', sub: 'Essays', accent: false },
                  { year: '2020', label: '42 Seoul', sub: 'Systems, C', accent: false },
                  { year: '2023', label: 'SEA:ME', sub: 'Automotive', accent: false },
                  { year: '2024', label: 'Bosch', sub: 'V2X', accent: false },
                  { year: '2025', label: 'Pickit 3D', sub: 'Robotics', accent: false },
                  { year: '2026', label: 'Open to roles', sub: 'Leuven · BE', accent: true },
                ].map((step, i) => (
                  <div key={i} className="flex items-center shrink-0">
                    <div className={`flex flex-col items-center px-3 py-2 first:pl-0 rounded-lg ${step.accent ? 'bg-[color-mix(in_oklab,var(--brand-emerald)_10%,transparent)] border border-[color-mix(in_oklab,var(--brand-emerald)_25%,transparent)]' : ''}`}>
                      <span className={`font-mono text-xs uppercase tracking-[0.14em] ${step.accent ? 'text-[var(--brand-emerald)]' : 'text-muted-foreground'}`}>
                        {step.year}
                      </span>
                      <span className={`mt-1 text-sm font-medium ${step.accent ? 'text-[var(--brand-emerald)]' : 'text-foreground/90'}`}>
                        {step.label}
                      </span>
                      <span className={`text-[11px] ${step.accent ? 'text-[color-mix(in_oklab,var(--brand-emerald)_70%,var(--muted-foreground))]' : 'text-muted-foreground'}`}>
                        {step.sub}
                      </span>
                    </div>
                    {i < 5 && (
                      <span className="shrink-0 text-muted-foreground/25 text-xs mx-1.5">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — photos */}
          <div className="grid grid-cols-2 gap-3" data-editor-photo-grid>
            <img
              src="./_media/profile5.JPG"
              alt="Kwanho Kim"
              className="col-span-1 aspect-[3/4] w-full rounded-xl object-cover object-center"
            />
            <img
              src="./_media/profile6.JPG"
              alt="Kwanho Kim"
              className="col-span-1 aspect-[3/4] w-full rounded-xl object-cover object-center mt-6"
            />
            <img
              src="./_media/profile7.JPG"
              alt="Kwanho Kim"
              className="col-span-2 aspect-[16/7] w-full rounded-xl object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ===== 2 · Position ===== */}
      <section id="guiding-position">
        <Panel className="relative">
          <SectionEyebrow>Position</SectionEyebrow>
          <h3 className="mt-4 font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">
            The robot arm crashes. The operator sees an error.
            <br />
            <span className="text-muted-foreground">
              Six layers between them. I own all six.
            </span>
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm leading-7">
            <div className="rounded-xl border border-border/40 bg-background/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Pickit 3D</p>
              <p className="text-foreground/80">Reconnect logic that determined whether a robot arm re-homed safely after a WiFi drop — or kept trying until an operator intervened.</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Bosch</p>
              <p className="text-foreground/80">V2X interface specification that was the only thing preventing a safety-scenario mismatch from shipping as a test pass.</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Ariadne</p>
              <p className="text-foreground/80">Evidence engine that traces every LLM output to its source — because at scale, hallucination isn&apos;t a caveat, it&apos;s a system failure.</p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-foreground/60 italic">
            Full-stack range in robotics and automotive isn&apos;t a résumé category — it&apos;s the only way to close the bugs that span layers. A specialist in one layer leaves every other layer as a blind spot. I don&apos;t leave blind spots.
          </p>
        </Panel>
      </section>

      {/* ===== 3 · Skills ===== */}
      <section id="working-language-and-tools" className="space-y-8">
        <header>
          <SectionEyebrow>Skills</SectionEyebrow>
          <SectionTitle>Stack and capabilities.</SectionTitle>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <Panel>
            <h3 className="font-display text-xl tracking-tight mb-5">Stack</h3>
            <div className="space-y-5">
              {([
                { label: 'Systems & Languages', color: 'var(--brand-amber)', skills: [
                  { name: 'TypeScript / JS', lvl: 5 },
                  { name: 'Python', lvl: 4 },
                  { name: 'C', lvl: 4 },
                  { name: 'C++', lvl: 3 },
                  { name: 'Linux / Bash', lvl: 4 },
                ]},
                { label: 'Robotics & Infra', color: 'var(--brand-cyan)', skills: [
                  { name: 'ROS 1 / ROS 2', lvl: 4 },
                  { name: 'WebSocket', lvl: 5 },
                  { name: 'Docker', lvl: 4 },
                  { name: 'Git', lvl: 5 },
                ]},
                { label: 'Web & Product', color: 'var(--brand-violet)', skills: [
                  { name: 'React', lvl: 5 },
                  { name: 'Node / Fastify', lvl: 4 },
                  { name: 'Next.js', lvl: 3 },
                  { name: 'Cloudflare', lvl: 3 },
                ]},
              ] as Array<{label: string; color: string; skills: Array<{name: string; lvl: number}>}>).map(({ label, color, skills }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2.5" style={{ color }}>
                    {label}
                  </p>
                  <div className="space-y-2">
                    {skills.map(({ name, lvl }) => (
                      <div key={name} className="grid grid-cols-[7rem_1fr] items-center gap-3">
                        <span className="text-xs text-foreground/70 text-right truncate">{name}</span>
                        <div className="flex gap-1 items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className="h-1.5 flex-1 rounded-full"
                              style={{
                                background: i < lvl
                                  ? `color-mix(in oklab, ${color} 80%, transparent)`
                                  : 'color-mix(in oklab, var(--border) 80%, transparent)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-border/30">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Spoken languages
                </p>
                <p className="text-xs text-foreground/70 leading-6">
                  Korean (native) · English C1, IELTS 7.5 · Japanese A1
                </p>
              </div>
            </div>
          </Panel>

          <Panel>
            <h3 className="font-display text-xl tracking-tight">What I&apos;ve shipped</h3>
            <ul className="mt-5 space-y-2.5 text-sm leading-7">
              {[
                ['Reconnect / backoff systems', 'WebSocket and ROS clients that recover from network failure in the field without operator intervention'],
                ['Data contract design', 'V2X and ROS2 interface specs defining every field, encoding, and edge case before first integration'],
                ['Operator-facing UIs', 'HMIs and config panels where error states are first-class, not afterthoughts'],
                ['Log and observability tooling', 'Timezone-aware download / convert / triage pipelines for distributed field deployments'],
                ['Cross-layer debugging', 'Tracing failures from protocol encoding through ROS topic contracts to UI state'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <span className="select-none text-foreground/30 mt-0.5">·</span>
                  <span>
                    <span className="font-medium text-foreground/90">{title}</span>
                    <span className="text-muted-foreground"> — {desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>

      {/* ===== 4 · Origin ===== */}
      <section id="origin-essays" className="space-y-8">
        <header>
          <SectionEyebrow>Origin</SectionEyebrow>
          <SectionTitle>
            I didn&apos;t start by building systems.
            <br />
            <span className="text-muted-foreground">I started by trying to explain them.</span>
          </SectionTitle>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* Story */}
          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Age 14 · Pol Math School
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-foreground/80">
              <p>
                The school ran a specific kind of contest: not
                &ldquo;solve this problem&rdquo; but &ldquo;explain this phenomenon
                rigorously.&rdquo; Scored on clarity of reasoning, not just correct
                answers. You could arrive at a wrong conclusion elegantly and score
                higher than someone who got it right by accident.
              </p>
              <ul className="ml-4 list-disc space-y-1 text-foreground/70">
                <li>State every assumption before using it</li>
                <li>Prove relationships step by step, no jumps</li>
                <li>Test logic against edge cases before claiming it holds</li>
              </ul>
              <p className="font-mono text-sm text-foreground">
                define → model → break → revise
              </p>
              <p className="text-sm leading-6 text-foreground/50 italic">
                The scoring function changed — from a judge&apos;s pen to a
                production incident. The discipline didn&apos;t.
              </p>
            </div>
          </Panel>

          {/* Essay cards — NO table, NO horizontal scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
            {[
              {
                topic: 'Coordinate calculation from distances between three points in space',
                domain: 'Geometry / computation',
                method: 'Rigorous derivation, verified against test cases',
                lesson: 'Always validate models against edge cases before trusting them.',
              },
              {
                topic: 'DNA replication via Scratch',
                domain: 'Biology + simulation',
                method: 'Break a complex phenomenon into explicit rules; test each',
                lesson: 'Decompose systems into verifiable components.',
              },
              {
                topic: 'Regular pentagon in the complex plane',
                domain: 'Pure mathematics',
                method: 'Symbolic proof + explicit notation of every assumption',
                lesson: 'Invisible assumptions kill systems.',
              },
              {
                topic: "Darwin's evolution via EvoDots simulation",
                domain: 'Scientific reasoning + tooling',
                method: 'Use simulation to test competing theories; observe which survives',
                lesson: 'Elegance that fails under pressure is not elegant.',
              },
            ].map((e) => (
              <EssayCard key={e.topic} {...e} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Editorial photo break ===== */}
      <div className="relative h-72 md:h-[26rem] overflow-hidden rounded-2xl" data-editor-photo-grid>
        <img
          src="./_media/profile4.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
            Leuven · 2025
          </p>
        </div>
      </div>

      {/* ===== 5 · Experience ===== */}
      <section id="journey-timeline" className="space-y-8">
        <header>
          <SectionEyebrow>Experience</SectionEyebrow>
          <SectionTitle>Each role added a constraint the previous one couldn&apos;t prepare you for.</SectionTitle>
        </header>

        <div className="grid gap-4">
          <RoleCard
            tag="Role"
            period="Aug 2025 — Mar 2026"
            location="Leuven, Belgium"
            title="Pickit 3D · Research & Software Engineer"
            stack="C · C++ · Python · TypeScript · React · WebSocket · ROS1 · Docker"
            why="First production ownership with real operators and no pause button. A robot arm mid-pick cannot wait for a developer to SSH in."
            bullets={[
              'Owned the operator-facing feature cycle across React UI, WebSocket streaming, Fastify API, and ROS1 — shipped fixes that unblocked robot pick-and-place operations within the same sprint they were reported.',
              'Designed a Python WebSocket library with exponential backoff and message schema validation — adopted as the integration baseline across multiple internal tools.',
              'Built end-to-end log tooling: timezone-normalized download, cloud upload/convert pipeline, multilingual triage UI — eliminated a multi-hour manual handoff per field incident.',
            ]}
            accent="var(--brand-amber)"
          />
          <RoleCard
            tag="Internship"
            period="Jun 2024 — Nov 2024"
            location="Hildesheim, Germany"
            title="Robert Bosch · V2X Communication"
            stack="C · Python · TypeScript · React · ROS2 · Docker"
            why="V2X is safety-critical automotive communication — an interface bug isn't a ticket, it's a scenario failure. First time my data contract decisions had formal consequences."
            bullets={[
              'Built a V2X vehicle demonstrator for safety-critical ITS-G5 scenarios: authored the message interface specification (every field, encoding, edge case) before implementation, then validated end-to-end across multiple test runs.',
              'Designed V2X ↔ vehicle software interface contracts upfront — decoupling the Bosch safety module from vehicle-side integrators and eliminating integration-phase renegotiation.',
              'Designed and implemented a React HMI for an eBike safety prototype: explicit state machine, operator-first interaction model, clear separation of active / passive safety states.',
            ]}
            accent="var(--brand-violet)"
          />
          <RoleCard
            tag="Program"
            period="Jul 2023 — Jun 2024"
            location="Wolfsburg, Germany"
            title="SEA:ME · Master-level program in Automotive & Mobility"
            stack="C · C++ · CARLA · ROS · Python"
            why="First time writing code that had to survive hardware variability and industrial deployment constraints, not just pass tests in a controlled environment."
            bullets={[
              'Four-module curriculum co-initiated with Volkswagen: embedded systems (ARM, bare-metal C/C++), autonomous driving (ROS perception pipeline), connected vehicles (CAN, AUTOSAR, V2X), and a capstone with automotive industry partners.',
              'First time engineering for reproducibility and certification: edge cases matter when the vehicle is moving; a fix that works 99% of the time is a 1% liability.',
              'Learned the bridge vocabulary: message contracts become interface specs, bugs become failure modes, latency becomes safety margin.',
            ]}
            accent="var(--brand-cyan)"
          />
          <RoleCard
            tag="Program"
            period="Sep 2020 — ongoing"
            location="Seoul · Wolfsburg"
            title="École 42 · Common Core and Advanced Core"
            stack="C · Unix · algorithms · systems"
            why="42 is self-paced and peer-reviewed — no fixed graduation, no instructors. The constraint forces you to build the mental model yourself rather than inherit someone else's abstraction."
            bullets={[
              'Built from scratch in C — custom libc (libft), printf, get_next_line, then progressively harder systems: process control, IPC, FD management, memory handling with no safety net.',
              'Minishell: POSIX-compatible shell — lexer, parser, built-ins, pipe chains, redirections, signal handling. Requires a precise model of what the kernel does on fork, exec, and dup.',
              'Peer evaluation model: every submission reviewed by three peers. Trains the discipline of writing code that is readable and provably correct, not just functional.',
            ]}
            accent="var(--brand-emerald)"
          />
        </div>
      </section>

      {/* ===== 6 · Projects ===== */}
      <section id="projects" className="space-y-8">
        <header>
          <SectionEyebrow>Projects & leadership</SectionEyebrow>
          <SectionTitle>Shipped independently — no spec, no team, no one else to debug it.</SectionTitle>
        </header>

        <div className="grid gap-4">
          <ProjectCard
            tag="Side project"
            period="2025 — present"
            location="earprint.kwanho.dev"
            title="Earprint · YouTube Music taste analyzer"
            stack="Next.js · TypeScript · Neon pgvector · Cloudflare Workers · Chrome MV3 · Gemini · Deezer · Last.fm"
            bullets={[
              'Chrome MV3 extension with bulk playlist import — multiple YouTube Music playlists at once including private Recaps; artist cleanup pass via Gemini to recover real artist names from fan-uploaded videos.',
              'Taste DNA profile: reminiscence-bump imprint scoring + familiarity↔novelty index; Music Zodiac (12 listening archetypes from top genres and moods); Gemini-written psychology profile generated once per analysis credit.',
              'Worldcup bracket from full library (8–256 tracks, multiple modes); shareable profile pages /s/<id> with dynamic OG images; Auth.js + Neon pgvector embedding-based recommendations, Cloudflare Workers.',
            ]}
            href="https://earprint.kwanho.dev"
            repo="https://github.com/KKWANH/earprint"
            accent="var(--brand-emerald)"
          />
          <ProjectCard
            tag="Side project"
            period="May 2026"
            location="ai.kwanho.dev"
            title="Ariadne · Local-first LLM workspace"
            stack="TypeScript · Python · Fastify · React · SQLite · Anthropic / OpenAI / Gemini / Kimi / Ollama · Docker · Cloudflare Tunnel"
            bullets={[
              'Four chat modes — Instant (<2 s TTFT), Standard (thinking + grounded, Sources footer), Agent (plan-execute ~38 s), Deep (orchestrate multi-step) — across Claude, OpenAI, Gemini, Kimi, and Ollama.',
              'Hybrid search (BM25 + vector + symbol + RRF, Hit@1 82.4%); workspace memory injected into context; sandboxed TS/JS dashboards rendered per-query in the Surface panel.',
              'Actions engine (actions.yaml), cron scheduler, and webhook triggers; templates and run definitions with staged diff; evidence engine tracing every claim to its source document.',
            ]}
            href="https://ai.kwanho.dev"
            accent="var(--brand-cyan)"
          />
          <ProjectCard
            tag="Hackathon · 1st prize"
            period="Feb 2024"
            location="Berlin, Germany"
            title="ColorSavesLife · Bosch ConnectedExperience (BCX) 2024"
            stack="Python · C++ · ROS2 · Gazebo · YOLOv5 · eye-tracking"
            repo="https://github.com/KKWANH/ColorSavesLife"
            bullets={[
              'AR overlay system recoloring traffic signals and road markings in real time for colorblind drivers — transparent display output, YOLOv5 detection, prototyped end-to-end in ROS2 / Gazebo.',
              'Plugin-based Python architecture: each sensor modality (depth camera, eye-tracker) is a self-contained plugin — eye-tracking was the first live plugin, feeding gaze data into the detection pipeline.',
              'Led and presented the cross-functional team to 1st place at BCX 2024, competing against automotive and tech teams from Bosch, Mercedes-Benz, Volkswagen, and others across Europe.',
            ]}
            accent="var(--brand-violet)"
          />
          <ProjectCard
            tag="Academic"
            period="Aug — Dec 2023"
            location="Wolfsburg, Germany"
            title="Autonomous Lane-Keeping-Assist · SEA:ME"
            stack="Python · CNN · CARLA"
            bullets={[
              'Trained a CNN on CARLA camera frames to detect lane boundaries and output a real-time steering correction signal — image preprocessing, convolutional extractor, regression head.',
              'Built the full data pipeline from scratch: capture loop, annotation tooling, train/val/test split, batch export and evaluation.',
              'Traced a key failure mode: regression head amplified prediction noise at high speed under sharp curvature — a failure that only appears outside the training distribution.',
            ]}
            accent="var(--brand-amber)"
          />
          <ProjectCard
            tag="Leadership"
            period="Aug 2022 — Jul 2023"
            location="Seoul, South Korea"
            title="Rush03 · Rock band, keyboardist & leader at École 42 Seoul"
            stack="Community of 50 · 3 events · 200–300 attendees"
            bullets={[
              'Founded and led Rush03 — 50-member rock band and student community at 42 Seoul, mixing every stage of the program. Delivered three live events for 200–300 attendees.',
              'Built the planning process the next cohort inherited: timeline templates, equipment checklists, rehearsal schedules, and a risk-response playbook for the three most common failure modes.',
              'Discovered something about coordination at scale: the bottleneck is almost never the work itself — it\'s the shared model of what "done" means.',
            ]}
            accent="var(--brand-emerald)"
          />
        </div>
      </section>

      {/* ===== 7 · Education ===== */}
      <section id="education-and-certification" className="space-y-8">
        <header>
          <SectionEyebrow>Education & credentials</SectionEyebrow>
          <SectionTitle>Degrees, programs, and certifications.</SectionTitle>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Degrees — clean list, no table */}
          <Panel>
            <h3 className="font-display text-xl tracking-tight mb-1">Degrees & training</h3>
            <div className="mt-4 divide-y divide-border/40">
              {[
                { period: 'Feb 2026 — ongoing', program: 'B.Sc. Mechatronics', meta: 'Korea National Open University' },
                { period: 'Mar 2023 — Feb 2025', program: 'B.Sc. Artificial Intelligence', meta: 'Korea National Open University · GPA 3.44 / 4.5' },
                { period: 'Apr 2019 — Aug 2020', program: 'B.Sc. Computer Engineering', meta: 'Korea Academic Credit Bank · GPA 4.24 / 4.5' },
                { period: 'Apr 2019 — Aug 2022', program: 'B.Sc. Business Administration', meta: 'Korea Academic Credit Bank · GPA 3.77 / 4.5' },
                { period: 'Sep 2020 — ongoing', program: 'École 42 · Common & Advanced Core', meta: 'Seoul / Wolfsburg' },
                { period: 'Jul 2023 — Jun 2024', program: 'SEA:ME · Master-level program', meta: 'Wolfsburg · Automotive & Mobility' },
              ].map((d) => (
                <CredentialRow key={d.program} {...d} />
              ))}
            </div>
          </Panel>

          {/* Certifications — cards, no table */}
          <Panel>
            <h3 className="font-display text-xl tracking-tight mb-4">Selected certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { date: 'Mar 2025', credential: 'IELTS Academic 7.5 (C1)', issuer: 'British Council' },
                { date: 'Nov 2020', credential: 'Engineer Information Processing', issuer: 'HRD Korea — system development / info processing / PM' },
                { date: 'Dec 2019', credential: 'Computer Specialist in Spreadsheet & DB · Level I', issuer: 'KCCI — advanced productivity & data management' },
                { date: 'Oct 2019', credential: 'Network Advisor · Level 2', issuer: 'ICQA — network administration' },
              ].map((c) => (
                <CertCard key={c.credential} {...c} />
              ))}
            </div>
          </Panel>
        </div>
      </section>

      {/* ===== 8 · CV + Contact ===== */}
      <section id="curriculum-vitae" className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <SectionEyebrow>Curriculum Vitae</SectionEyebrow>
          <SectionTitle>Download the CV, or reach out directly.</SectionTitle>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            Open to full-time roles in robotics, automotive, and real-time
            systems — especially where the stack spans more than one layer.
          </p>
          <a
            href="mailto:contact@kwanho.dev"
            className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            contact@kwanho.dev ↗
          </a>
        </div>
        <div>
          <a
            href="/CV.pdf"
            download
            className="group flex min-h-36 flex-col justify-between rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40"
          >
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                PDF · Two-page summary
              </p>
              <h3 className="font-display text-2xl tracking-tight">Industry CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Software engineering, robotics, automotive systems, full-stack.
                Updated June 2026.
              </p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
              Download ↓
            </span>
          </a>
        </div>
      </section>

      {/* ===== 9 · Recurring themes ===== */}
      <section id="what-this-journal-tracks">
        <Panel>
          <SectionEyebrow>Recurring themes</SectionEyebrow>
          <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight leading-[1.1]">
            Four failure modes that follow me across every stack.
          </h3>
          <p className="mt-3 text-sm italic text-muted-foreground">
            The languages change. The problems don&apos;t.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            <ThemeItem
              label="Layer blindness"
              body="Every system that broke in unexpected ways had one thing in common: someone forgot to write down an assumption they were making. The type system didn't capture it. The tests didn't cover it. Then a timezone changed, or a packet hit a size limit, or a new operator followed the UI literally instead of the way it was intended."
            />
            <ThemeItem
              label="Operator reality"
              body="Operators don't read manuals. They form a mental model from the first five interactions, then operate from memory. A UI that requires sequential steps will be used non-sequentially. Working at Pickit meant shipping code that real operators used in front of a running robot arm — that constraint changes every design decision."
            />
            <ThemeItem
              label="Interface clarity"
              body="Two teams, one interface: that's where most production systems quietly die. Not from bad engineering on either side, but because each team built to a different implicit spec. At Bosch, V2X interfaces fed into safety-critical scenarios — every field, every encoding, every edge case was defined upfront, not negotiated after integration."
            />
            <ThemeItem
              label="Decisions over time"
              body="The architecture that seemed obvious under deadline pressure is the hardest to change 18 months later — not because it was wrong, but because it crystallised assumptions that were reasonable at the time and became constraints on every subsequent decision. Tracking these patterns isn't pessimism. It's the discipline of building systems you'll still trust a year from now."
            />
          </ul>
        </Panel>
      </section>

      {/* ===== 10 · Contact CTA ===== */}
      <section id="contact" className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-8 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <SectionEyebrow>Available now</SectionEyebrow>
            <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight leading-[1.1]">
              Open to full-time roles in robotics, automotive, and real-time systems.
            </h3>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
              Based in Leuven, Belgium. Open to relocation or remote.
              Especially interested in roles where the stack spans hardware and product.
            </p>
          </div>
          <a
            href="mailto:contact@kwanho.dev"
            className="inline-flex items-center gap-3 rounded-xl border border-foreground/30 bg-foreground/5 px-6 py-4 font-mono text-sm tracking-wide text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/60 hover:bg-foreground/10 whitespace-nowrap"
          >
            contact@kwanho.dev ↗
          </a>
        </div>
      </section>
    </div>
  )
}

/* -----------------------------------------------------------------
 * Section-local helpers
 * ----------------------------------------------------------------- */

function DomainRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/80">
        {label}
      </span>
      <span>{value}</span>
    </li>
  )
}

function EssayCard({
  topic,
  domain,
  method,
  lesson,
}: {
  topic: string
  domain: string
  method: string
  lesson: string
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 p-4 flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium text-foreground/90 leading-snug">{topic}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {domain}
        </p>
      </div>
      <div className="pt-3 border-t border-border/30 space-y-2 text-xs leading-6">
        <p className="text-muted-foreground">
          <span className="text-foreground/50 font-medium">Method: </span>
          {method}
        </p>
        <p className="text-foreground/80">
          <span className="text-brand-cyan mr-1">→</span>
          {lesson}
        </p>
      </div>
    </div>
  )
}

function CredentialRow({
  period,
  program,
  meta,
}: {
  period: string
  program: string
  meta: string
}) {
  return (
    <div className="py-3.5 grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground leading-6">
        {period}
      </span>
      <div>
        <p className="text-sm font-medium text-foreground/90">{program}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{meta}</p>
      </div>
    </div>
  )
}

function CertCard({
  date,
  credential,
  issuer,
}: {
  date: string
  credential: string
  issuer: string
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {date}
      </p>
      <p className="mt-2 text-sm font-medium text-foreground/90 leading-snug">{credential}</p>
      <p className="mt-1.5 text-xs text-muted-foreground leading-5">{issuer}</p>
    </div>
  )
}

function RoleCard({
  tag,
  period,
  location,
  title,
  stack,
  why,
  bullets,
  accent,
}: {
  tag: string
  period: string
  location: string
  title: string
  stack: string
  why: string
  bullets: string[]
  accent: string
}) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 md:p-7">
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
        <span
          className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: accent, borderColor: 'color-mix(in oklab, ' + accent + ' 40%, transparent)' }}
        >
          {tag}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80">
          {period}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {location}
        </span>
      </header>
      <h3 className="mt-3 font-display text-2xl tracking-tight leading-tight">{title}</h3>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground">{stack}</p>
      <p
        className="mt-4 max-w-3xl rounded-md border-l-2 bg-background/40 px-4 py-2 text-sm italic leading-7 text-muted-foreground"
        style={{ borderLeftColor: accent }}
      >
        <span className="font-medium not-italic text-foreground">Why here:</span> {why}
      </p>
      <ul className="mt-5 ml-1 space-y-3 text-sm leading-7 text-foreground/80">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex gap-3">
            <span className="select-none text-foreground/40 mt-0.5 shrink-0">·</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function ProjectCard({
  tag,
  period,
  location,
  title,
  stack,
  bullets,
  href,
  repo,
  accent,
}: {
  tag: string
  period: string
  location: string
  title: string
  stack: string
  bullets: string[]
  href?: string
  repo?: string
  accent: string
}) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 md:p-7">
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
        <span
          className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: accent, borderColor: 'color-mix(in oklab, ' + accent + ' 40%, transparent)' }}
        >
          {tag}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80">
          {period}
        </span>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
          >
            {location} ↗
          </a>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {location}
          </span>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
          >
            GitHub ↗
          </a>
        )}
      </header>
      <h3 className="mt-3 font-display text-2xl tracking-tight leading-tight">{title}</h3>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground">{stack}</p>
      <ul className="mt-5 ml-1 space-y-3 text-sm leading-7 text-foreground/80">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex gap-3">
            <span className="select-none text-foreground/40 mt-0.5 shrink-0">·</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function ThemeItem({ label, body }: { label: string; body: string }) {
  return (
    <li className="rounded-xl border border-border/40 bg-background/30 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </li>
  )
}
