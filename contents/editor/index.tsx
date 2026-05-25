export const title = "Editor's Introduction"
export const subtitle =
  'The CV covers what was built. This page covers how and why.'
export const description =
  'Long-form profile combining narrative, structured data, and timelines to explain the path from early math/science writing into real-time distributed systems work across robotics and automotive.'
export const excerpt =
  'A long-form profile of how the early math/science essays became 42 Seoul, SEA:ME, Bosch, and Pickit 3D — and what shipping production code looks like in practice.'
export const date = '2026-05-25'
export const readTime = '14 min'
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
              Full-stack engineer for real-time, distributed systems — from the
              ROS graph to the operator screen, through every failure mode between them.
            </h2>
            <p className="max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
              The short version is on the CV. This page carries what didn&apos;t fit
              there: the decision logic behind each role, the side builds, and
              the engineering patterns I keep running into.
            </p>
            <p className="max-w-2xl text-sm leading-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Currently
              </span>{' '}
              <span className="text-foreground">Leuven, Belgium</span>
              <span className="text-muted-foreground">
                {' '}— wrapped Pickit 3D in March 2026, now shipping{' '}
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
                .
              </span>
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Started coding"
                value="Age 14"
                caption="While writing math and science essays."
              />
              <StatCard
                label="Foundation"
                value="42 Seoul"
                caption="Peer learning, C, systems, project rigor."
              />
              <StatCard
                label="Mobility track"
                value="SEA:ME"
                caption="Master-level program in Wolfsburg."
              />
              <StatCard
                label="Most recent role"
                value="Pickit 3D"
                caption="3D vision · robotic picking. Aug 2025 — Mar 2026."
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
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-8 text-foreground/80">
            Written reconnect logic that determined whether a robot arm
            re-homed safely after a WiFi drop. Built a log pipeline where
            timezone drift caused incident timelines to diverge across sites.
            Designed an evidence engine that traces every LLM output to its
            source — because at scale, hallucination isn&apos;t a caveat,
            it&apos;s a system failure. Those aren&apos;t edge cases — that&apos;s
            the actual work.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/75">
            The work consistently demands range. The ROS node fails and the
            symptom appears in the operator&apos;s browser. The UI reports one
            thing and the message contract says another. Fixing it requires
            reading the full path — from transport layer to JavaScript event
            loop to hardware callback. In robotics and automotive, that range
            is rarely optional. A specialist in one layer leaves the others as
            blind spots. The systems that hold under pressure are usually
            debugged by someone who can read all of them.
          </p>
        </Panel>
      </section>

      {/* ===== 3 · Skills (from CV) ===== */}
      <section id="working-language-and-tools" className="space-y-8">
        <header>
          <SectionEyebrow>Skills</SectionEyebrow>
          <SectionTitle>What I reach for, grouped by what it has to survive.</SectionTitle>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <Panel>
            <h3 className="font-display text-xl tracking-tight">Languages & frameworks</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              <DomainRow label="Languages" value="C · C++ · Python · TypeScript / JavaScript" />
              <DomainRow label="Frameworks" value="ROS1 / ROS2 · Node · React" />
              <DomainRow label="Tools" value="Docker · Git · Linux / Bash · Cloudflare" />
              <DomainRow
                label="Spoken"
                value="Korean (native) · English C1, IELTS 7.5 · Japanese A1"
              />
            </ul>
          </Panel>

          <Panel>
            <h3 className="font-display text-xl tracking-tight">Systems & performance</h3>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex gap-3">
                <span className="select-none text-foreground/40">·</span>
                <span>WebSocket / ROS reconnect and backoff logic built for field conditions</span>
              </li>
              <li className="flex gap-3">
                <span className="select-none text-foreground/40">·</span>
                <span>Message validation and data contracts at service boundaries (C, Python, TypeScript)</span>
              </li>
              <li className="flex gap-3">
                <span className="select-none text-foreground/40">·</span>
                <span>End-to-end log pipelines: timezone handling, upload/convert chains, triage tooling</span>
              </li>
              <li className="flex gap-3">
                <span className="select-none text-foreground/40">·</span>
                <span>Configuration UI with safe defaults and input validation for system/network parameters</span>
              </li>
              <li className="flex gap-3">
                <span className="select-none text-foreground/40">·</span>
                <span>Cross-layer debugging from application errors through protocol and transport layers to hardware interfaces</span>
              </li>
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
            <div className="mt-5 space-y-4 text-base leading-7 text-foreground/80">
              <p>
                The school ran a specific kind of contest: not
                &ldquo;solve this problem&rdquo; but &ldquo;explain this phenomenon
                rigorously.&rdquo; The output was scored on clarity of reasoning,
                not just correct answers. You could arrive at a wrong conclusion
                elegantly and score higher than someone who got it right by accident.
              </p>
              <p>Writing math and science essays forced me to:</p>
              <ul className="ml-4 list-disc space-y-1.5">
                <li>State every assumption before using it</li>
                <li>Prove relationships step by step, no jumps</li>
                <li>Test logic against edge cases before claiming it holds</li>
              </ul>
              <p>
                That discipline is the same one I apply to systems now. If I
                can&apos;t explain why a system works, I don&apos;t trust it yet.
                If a boundary condition isn&apos;t covered, the test suite is lying.
              </p>
              <p className="font-mono text-sm text-foreground">
                define → model → break → revise
              </p>
              <p className="text-sm leading-6 text-foreground/60 italic">
                The scoring function changed — from a judge&apos;s pen to a
                production incident. The discipline didn&apos;t.
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

      {/* ===== 5 · Experience ===== */}
      <section id="journey-timeline" className="space-y-8">
        <header>
          <SectionEyebrow>Experience</SectionEyebrow>
          <SectionTitle>Each role added a constraint the previous one didn&apos;t have.</SectionTitle>
        </header>

        <div className="grid gap-4">
          <RoleCard
            tag="Role"
            period="Aug 2025 — Mar 2026"
            location="Leuven, Belgium"
            title="Pickit 3D · Research & Software Engineer"
            stack="C · C++ · Python · TypeScript · React · WebSocket · ROS1 · Docker · Git"
            why="First production ownership with real operators. The system can't be paused between runs — everything has to work, recover, and report correctly while a robot arm is mid-pick."
            bullets={[
              'Delivered production-support features across React UI + API + ROS / streaming layers to unblock on-site operations and shorten the troubleshooting cycle.',
              'Built a reusable Python WebSocket client with reconnect/backoff and message validation; now used as the integration baseline across internal tools.',
              'Built an internal log workflow — timezone-aware download → upload/convert pipeline → multilingual UI — that cut manual log handling and sped up incident triage.',
              'Shipped a configuration UI for system/network settings with input validation and safe defaults, reducing misconfiguration-related support requests.',
            ]}
            accent="var(--brand-amber)"
          />
          <RoleCard
            tag="Internship"
            period="Jun 2024 — Nov 2024"
            location="Hildesheim, Germany"
            title="Robert Bosch · V2X Communication"
            stack="C · Python · TypeScript · React · ROS2 · Docker · Git"
            why="V2X is safety-critical automotive communication — an interface bug is not a ticket, it's an incident. First time my data contract decisions had formal consequences."
            bullets={[
              'Implemented a V2X vehicle demonstrator for safety-critical scenarios, defining message/data interfaces and validating end-to-end behaviour in test runs.',
              'Integrated communication modules and designed data contracts / interfaces to decouple components and accelerate iteration.',
              'Built a React-based HMI for an eBike safety prototype with clear state modelling and operator-friendly interactions.',
              'Performed data analysis and cross-layer troubleshooting in automotive systems.',
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
              'Four-module curriculum co-initiated with Volkswagen: embedded systems, autonomous driving, connected vehicles, and a capstone team project with automotive industry partners.',
              'Embedded module: low-level C/C++ on ARM platforms (Raspberry Pi, Jetson), bare-metal drivers, sensor integration, and real-time constraints that the software stack has to respect — not negotiate around.',
              'Autonomous driving module: ROS-based perception pipeline covering lane detection, sensor fusion, and path planning. The CNN lane-keeping project below ran here.',
              'Connected vehicles module: CAN bus communication, AUTOSAR architecture fundamentals, and V2X protocol design — the vocabulary that made the Bosch V2X internship immediately legible.',
              'First time engineering for reproducibility and certification, not just for demos: edge cases matter when the vehicle is moving; a fix that works 99% of the time is a 1% liability.',
              'Learned the bridge language between software and systems engineering: message contracts become interface specifications, bugs become failure modes, latency becomes safety margin.',
            ]}
            accent="var(--brand-cyan)"
          />
          <RoleCard
            tag="Program"
            period="Sep 2020 — Present"
            location="Seoul · Wolfsburg"
            title="École 42 · Common Core and Advanced Core"
            stack="C · Unix · algorithms · systems"
            why="Foundational rigor in systems thinking and C before anything else mattered."
            bullets={[
              'Built from scratch in C — custom libc (libft), printf, get_next_line, then progressively harder systems problems: process control, inter-process communication, file descriptor management, memory handling with no safety net.',
              'Minishell: implemented a POSIX-compatible shell — lexer, parser, built-ins, pipe chains, redirections, signal handling. The project requires a precise model of what the kernel does on fork, exec, and dup. Anything vague in that model shows up as a bug.',
              'Philosophers (dining concurrency): mutex-based and semaphore-based solutions under strict timing and resource constraints. Learned exactly where assumptions about thread scheduling order break in practice — and why race conditions in tests are worse than race conditions in production, because they hide.',
              'CPP modules 00–09: moved from C to C++ through operator overloading, inheritance, templates, STL, and exception handling — each module reviewed by peers, not by an automated grader.',
              'Peer evaluation model: every submission is reviewed by three peers from any level of the program. This trains the discipline of writing code that is readable and provably correct, not just functional — and of giving and receiving precise technical criticism under time pressure.',
            ]}
            accent="var(--brand-emerald)"
          />
        </div>
      </section>

      {/* ===== 6 · Projects ===== */}
      <section id="projects" className="space-y-8">
        <header>
          <SectionEyebrow>Projects & leadership</SectionEyebrow>
          <SectionTitle>The side work — what I build when there&apos;s no deadline, no spec, and no one else to debug it.</SectionTitle>
        </header>

        <div className="grid gap-4">
          <ProjectCard
            tag="Side project"
            period="2025 — present"
            location="earprint.kwanho.dev"
            title="Earprint · YouTube Music taste analyzer"
            stack="Next.js · TypeScript · Neon pgvector · Cloudflare Workers · Chrome MV3 · Gemini"
            bullets={[
              'Chrome MV3 extension that scrapes the user’s YouTube Music likes; the web app enriches them through Deezer, Last.fm, and a Gemini analysis pass.',
              'Renders a taste profile, an interactive artist map, and a five-mode recommender (song / genre / unheard genre / indie / mix) with Tinder-style rating.',
              'Auth.js + Google OAuth, Neon Postgres with pgvector for embedding-based recommendations, Cloudflare Workers via OpenNext, with a separate Cron Worker for scheduled jobs.',
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
            stack="TypeScript · Python · Fastify · React · SQLite · Anthropic / OpenAI / Gemini / Moonshot Kimi / Ollama · Docker · Cloudflare Tunnel"
            bullets={[
              'Multi-provider LLM application with one interface across Anthropic Claude, OpenAI, Gemini, Moonshot Kimi, and local Ollama; per-model token usage priced and reported as inference cost per run.',
              'Agent mode that decomposes a task into steps, runs tools (web search, file reading, document analysis), and re-plans as results arrive — with a human approval step before actions execute.',
              'Evidence engine that maps every generated claim to its source and flags unsupported claims; a built-in guardrail against hallucination.',
              'Context-selection filter and a document ingestion pipeline (PDF + OCR fallback, DOCX, XLSX, Markdown, CSV) so only relevant content reaches the model.',
              'Reusable prompt templates and run definitions; deployed over Cloudflare Tunnel with a local / remote access split and request-origin checks.',
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
              'Built an AR overlay system that recolors traffic signals and road markings in real time for colorblind drivers — transparent display output, camera input, YOLOv5 object detection, prototyped end-to-end in ROS2 / Gazebo.',
              'Architected a plugin-based Python client so each new sensor modality (depth camera, eye-tracker) is a self-contained plugin, not a codebase change — eye-tracking was the first live plugin, feeding gaze data directly into the detection pipeline.',
              'Led and presented the cross-functional team to 1st place at BCX 2024, competing against automotive and tech teams from Bosch, Mercedes-Benz, Volkswagen, and others across Europe.',
            ]}
            accent="var(--brand-violet)"
          />
          <ProjectCard
            tag="Academic"
            period="Aug 2023 — Dec 2023"
            location="Wolfsburg, Germany"
            title="Autonomous Lane-Keeping-Assist · SEA:ME"
            stack="Python · CNN · CARLA"
            bullets={[
              'Trained a CNN on camera frames captured from CARLA (Unreal Engine-based autonomous driving simulator) to detect lane boundaries and output a real-time steering correction signal.',
              'Architecture: image preprocessing pipeline (resize, normalize, augment) → convolutional feature extractor → regression head outputting steering angle. Evaluated across CARLA test scenarios with varied road geometry, lighting conditions, and traffic.',
              'Built the data pipeline from scratch: capture loop, annotation tooling, train/val/test split logic, and a client for batch export and evaluation — discovering early that model quality is bounded by data quality long before it is bounded by architecture choices.',
              'Observed that the regression head amplified prediction noise at high speed, creating oscillation. Traced it to low-confidence frames under sharp curvature — a failure mode that only appears outside the training distribution.',
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
              'Founded and led Rush03, a rock band and student community at École 42 Seoul — 50 members mixing students from every stage of the program, from beginners to advanced core.',
              'Delivered three live events for 200–300 attendees: performance sets, open stage sessions, a student band showcase. Managed venue, equipment, scheduling, and cross-team rehearsal logistics with no external support.',
              'Built the planning process the next cohort inherited: timeline templates, equipment checklists, rehearsal schedules with contingency buffers, and a risk-response playbook for the three most common failure modes — equipment failure, no-show performers, venue changes.',
              'Discovered something about coordination at scale: the bottleneck is almost never the work itself, it\'s the shared model of what "done" means. Every process built for Rush03 was an attempt to make that shared model explicit before the day of the event.',
            ]}
            accent="var(--brand-emerald)"
          />
        </div>
      </section>

      {/* ===== 7 · Education + Credentials ===== */}
      <section id="education-and-certification" className="space-y-8">
        <header>
          <SectionEyebrow>Education & credentials</SectionEyebrow>
          <SectionTitle>The formal record.</SectionTitle>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel className="p-0 md:p-0 overflow-hidden">
            <div className="p-6 md:p-7 pb-2">
              <h3 className="font-display text-xl tracking-tight">Degrees & training</h3>
            </div>
            <Table
              headers={['Period', 'Program', 'Institution / result']}
              rows={[
                ['Feb 2026 — present', 'B.Sc. Mechatronics', 'Korea National Open University'],
                ['Mar 2023 — Feb 2025', 'B.Sc. Artificial Intelligence', 'Korea National Open University · GPA 3.44 / 4.5'],
                ['Apr 2019 — Aug 2020', 'B.Sc. Computer Engineering', 'Korea Academic Credit Bank · GPA 4.24 / 4.5'],
                ['Apr 2019 — Aug 2022', 'B.Sc. Business Administration', 'Korea Academic Credit Bank · GPA 3.77 / 4.5'],
                ['Sep 2020 — present', 'École 42 · Common & Advanced Core', 'Seoul / Wolfsburg'],
                ['Jul 2023 — Jun 2024', 'SEA:ME · Master-level program', 'Wolfsburg · Automotive & Mobility'],
              ]}
            />
          </Panel>

          <Panel className="p-0 md:p-0 overflow-hidden">
            <div className="p-6 md:p-7 pb-2">
              <h3 className="font-display text-xl tracking-tight">Selected certifications</h3>
            </div>
            <Table
              headers={['Date', 'Credential', 'Issuer']}
              rows={[
                ['Mar 2025', 'IELTS Academic 7.5 (C1)', 'British Council'],
                ['Nov 2020', 'Engineer Information Processing', 'HRD Korea — system development / info processing / PM'],
                ['Dec 2019', 'Computer Specialist in Spreadsheet & DB · Level I', 'KCCI — advanced productivity & data management'],
                ['Oct 2019', 'Network Advisor · Level 2', 'ICQA — network administration'],
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
            The CV is the two-page summary. This page is the context behind it.
          </SectionTitle>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            The PDF is for applications. This page is for anyone who wants to
            understand how the decisions were made, not just what they were.
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
              <h3 className="font-display text-2xl tracking-tight">Industry CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Software engineering, robotics deployment, real-time systems,
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
            Four problems that show up everywhere, in different clothes.
          </h3>
          <p className="mt-3 text-sm italic text-muted-foreground">
            The stack changes. The failure modes don&apos;t.
          </p>

          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            <ThemeItem
              label="Invisible assumptions"
              body="Every system that broke in unexpected ways had one thing in common: someone forgot to write down an assumption they were making. The type system didn't capture it. The tests didn't cover it. The documentation didn't mention it. Then a timezone changed, or a packet hit a size limit, or a new operator followed the UI literally instead of the way it was intended. Systems that hold under pressure are systems where the assumptions were found before production found them."
            />
            <ThemeItem
              label="Operator reality"
              body="Operators don't read manuals. They form a mental model from the first five interactions, then operate from memory. A UI that requires sequential steps will be used non-sequentially. A config field that should never be left blank will be left blank. Working at Pickit meant shipping code that real operators would use in front of a running robot arm — and that constraint changes every design decision. Error states become UX problems. Edge cases become SLA incidents."
            />
            <ThemeItem
              label="Interface clarity"
              body="Two teams, one interface: that's where most production systems quietly die. Not from bad engineering on either side, but because each team built to a different implicit spec. The data contract wasn't written down. The message format was 'understood.' The field order was 'obvious.' At Bosch, V2X interfaces fed into safety-critical scenarios — every field, every encoding, every edge case was defined upfront, not negotiated after integration. That discipline is transferable to every service boundary."
            />
            <ThemeItem
              label="Decisions over time"
              body="The architecture that seemed obvious under deadline pressure is the architecture that's hardest to change 18 months later. Not because it was wrong — but because it crystallised assumptions that were reasonable at the time and became constraints on every subsequent decision. The log pipeline built quickly for one site doesn't handle the third site's timezone. The reconnect logic written for one ROS version breaks silently on another. Tracking these patterns isn't pessimism — it's the discipline of building systems you'll still trust a year from now."
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
    <li className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/80">
        {label}
      </span>
      <span>{value}</span>
    </li>
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
            <span className="select-none text-foreground/40">·</span>
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
                  className={`px-5 py-4 align-top leading-7 text-sm ${
                    cellIndex === 0
                      ? 'text-foreground/90 font-medium'
                      : 'text-foreground/75'
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
    <li className="rounded-xl border border-border/40 bg-background/30 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </li>
  )
}
