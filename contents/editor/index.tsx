export const title = "Editor's Introduction"
export const subtitle =
  'A full editorial profile: history, essays, engineering path, and the systems mindset behind this journal.'
export const description =
  'A detailed introduction that combines narrative, tables, and interactive sections to explain the path from early math/science writing to robotics and industrial deployment.'
export const excerpt =
  'An in-depth editorial dossier covering early essays, 42 training, SEA:ME, Bosch, Pickit 3D, and the working principles used to build systems that survive outside the lab.'
export const date = '2026-04-09'
export const readTime = '14 min'
export const showToc = false
export const bodyClassName = 'editor-profile-page'

export default function EditorIntroductionPage() {
  return (
    <div className="space-y-20 pb-6">
      <section
        id="editorial-introduction"
        className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,hsl(var(--secondary))_0%,transparent_45%),radial-gradient(circle_at_85%_15%,hsl(var(--secondary))_0%,transparent_38%)] p-6 md:p-9"
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Editor&apos;s Dossier</p>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
              From a 14-year-old writing math and science essays to shipping systems in robotics,
              automotive, and industrial vision.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              This page is intentionally dense. It combines narrative and factual structure so the
              story is not only readable, but also verifiable. The backbone comes from CV data and
              past records: Pol Math School essay work, 42 learning path, SEA:ME, Bosch, and
              Pickit 3D.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
              <article className="min-h-44 border border-border bg-background/75 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Started coding</p>
                <p className="mt-2 font-serif text-3xl">Age 14</p>
                <p className="mt-1 text-sm text-muted-foreground">While writing math/science essays.</p>
              </article>
              <article className="min-h-44 border border-border bg-background/75 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Core training</p>
                <p className="mt-2 font-serif text-3xl">42 Seoul</p>
                <p className="mt-1 text-sm text-muted-foreground">Peer learning, C, systems, project rigor.</p>
              </article>
              <article className="min-h-44 border border-border bg-background/75 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Mobility track</p>
                <p className="mt-2 font-serif text-3xl">SEA:ME</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Software engineering for automotive ecosystems.</p>
              </article>
              <article className="min-h-44 border border-border bg-background/75 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Recent focus</p>
                <p className="mt-2 font-serif text-3xl">Pickit 3D</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Industrial robotic picking, Aug 2025 - Mar 2026.</p>
              </article>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" data-editor-photo-grid>
            <img
              src="./_media/profile5.JPG"
              alt="Portrait of Kwanho Kim"
              className="block aspect-[4/5] w-full object-cover object-center"
            />
            <img
              src="./_media/profile6.JPG"
              alt="Portrait of Kwanho Kim in profile"
              className="block aspect-[4/5] w-full object-cover object-center"
            />
            <img
              src="./_media/profile7.JPG"
              alt="Portrait sequence highlighting editorial profile"
              className="block aspect-[16/7] w-full object-cover object-center sm:col-span-2 lg:col-span-1 xl:col-span-2"
            />
            <img
              src="./_media/profile4.jpg"
              alt="Portrait of Kwanho Kim - extended"
              className="block aspect-[3/5] w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section id="guiding-position" className="space-y-6">
        <div className="border-l-2 border-foreground pl-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Editorial Position</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
            Stress reveals structure.
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Elegant systems in ideal conditions are easy to produce. Durable systems under noise,
            delay, hardware limits, and real operators are not.
          </p>
        </div>

        <p className="max-w-3xl text-muted-foreground leading-8">
          Every major section below cross-links narrative and data. If a statement matters, it appears as a timeline item, a row in a table, or an expandable detail block.
        </p>
      </section>

      <section id="working-language-and-tools" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Working language and tools</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            Technical stack used across robotics, mobility, and product engineering.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="border border-border bg-secondary/20 p-6">
            <p className="text-muted-foreground leading-8">
              C, C++, Python, TypeScript, Assembly, React, ROS 1/2, Docker, Git, GitHub, Figma,
              Qt, Flutter, and CARLA are used as tools, not identity markers. The constant is
              maintaining system shape under real constraints.
            </p>
            <p className="mt-4 text-muted-foreground leading-8">
              Languages: Korean (native), English (professional).
            </p>
          </article>

          <article className="border border-border bg-secondary/20 p-6">
            <h3 className="font-serif text-2xl">Stack by domain</h3>
            <ul className="mt-4 space-y-3 text-muted-foreground leading-7">
              <li>Robotics and vision: C++, Python, ROS, deployment debugging.</li>
              <li>Automotive and HMI: TypeScript, React, V2X interfaces, safety-first UX.</li>
              <li>Embedded and prototyping: Qt, Flutter, Raspberry Pi, Arduino.</li>
              <li>Workflow and delivery: Docker, GitHub, CI habits, structured test loops.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="origin-essays" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Origin Story</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            I didn&apos;t start by building systems.
          </h2>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl text-muted-foreground">
            I started by trying to explain them.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="border border-border bg-secondary/20 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Age 14 · Pol Math School</p>
            <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                Writing math and science essays forced me to:
              </p>
              <ul className="ml-4 space-y-2 list-disc">
                <li>Define assumptions explicitly</li>
                <li>Prove relationships step by step</li>
                <li>Test logic against edge cases</li>
              </ul>
              <p className="mt-4">
                That habit stayed. Today, I still treat systems the same way:
              </p>
              <p className="font-medium text-foreground">
                define → model → break → revise
              </p>
              <p className="text-xs italic mt-3">
                The difference now: I pressure-test against reality instead of paper.
              </p>
            </div>
          </article>

          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead className="bg-secondary/35 text-left">
                <tr>
                  <th className="border-b border-border px-4 py-3 font-medium">Essay / Study Topic</th>
                  <th className="border-b border-border px-4 py-3 font-medium">Domain</th>
                  <th className="border-b border-border px-4 py-3 font-medium">Method</th>
                  <th className="border-b border-border px-4 py-3 font-medium">Became this habit</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground text-xs">
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="px-4 py-3">Coordinate calculation from distances between three points in space</td>
                  <td className="px-4 py-3">Geometry / computation</td>
                  <td className="px-4 py-3">Rigorous derivation → verification against test cases</td>
                  <td className="px-4 py-3">Always validate models against edge cases before trusting them.</td>
                </tr>
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="px-4 py-3">DNA replication via Scratch</td>
                  <td className="px-4 py-3">Biology + simulation</td>
                  <td className="px-4 py-3">Break complex phenomenon into explicit rules and test each</td>
                  <td className="px-4 py-3">Decompose systems into verifiable components.</td>
                </tr>
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="px-4 py-3">Regular pentagon in complex plane and equation roots</td>
                  <td className="px-4 py-3">Pure mathematics</td>
                  <td className="px-4 py-3">Symbolic proof + explicit notation of all assumptions</td>
                  <td className="px-4 py-3">Write systems as if someone must prove them correct. Invisible assumptions kill systems.</td>
                </tr>
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="px-4 py-3">Darwin's evolution via EvoDots simulation</td>
                  <td className="px-4 py-3">Scientific reasoning + tooling</td>
                  <td className="px-4 py-3">Use simulation to test competing theories; observe which survives</td>
                  <td className="px-4 py-3">Pressure-test designs. Elegance that fails under pressure is not elegant.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="journey-timeline" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Timeline</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            Each transition was intentional. Each one closed a gap.
          </h2>
        </div>

        <div className="grid gap-4">
          <details className="group border border-border bg-secondary/15 p-5" open>
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sep 2020 - Aug 2022</p>
                <p className="text-sm text-muted-foreground group-open:hidden">Open</p>
              </div>
              <h3 className="mt-2 font-serif text-2xl">42 Seoul: common core and systems discipline</h3>
            </summary>
            <div className="mt-4 space-y-3 text-muted-foreground leading-7">
              <p className="text-sm italic border-l-2 border-muted-foreground pl-3">
                <strong>Why here:</strong> Needed foundational rigor in systems thinking and C before anything else mattered.
              </p>
              <ul className="space-y-2 list-disc ml-4">
                <li>Built strong collaboration through peer evaluation, diverse team projects, and hackathon delivery cycles.</li>
                <li>Strengthened C, debugging, and memory behavior through repeated team-based implementation.</li>
                <li>Developed execution habit: test early, share feedback quickly, iterate as a team.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-secondary/15 p-5">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Jul 2023 - Jun 2024</p>
                <p className="text-sm text-muted-foreground group-open:hidden">Open</p>
              </div>
              <h3 className="mt-2 font-serif text-2xl">SEA:ME in Wolfsburg: bridging software and physical systems</h3>
            </summary>
            <div className="mt-4 space-y-3 text-muted-foreground leading-7">
              <p className="text-sm italic border-l-2 border-muted-foreground pl-3">
                <strong>Why here:</strong> Moved from pure software to systems where code meets hardware, operators, and real-world constraints.
              </p>
              <ul className="space-y-2 list-disc ml-4">
                <li>Studied software engineering in automotive and mobility contexts.</li>
                <li>Connected embedded, communication, and product-level decisions in one workflow.</li>
                <li>First time managing tradeoffs between elegance and industrial feasibility.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-secondary/15 p-5">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Jun 2024 - Nov 2024</p>
                <p className="text-sm text-muted-foreground group-open:hidden">Open</p>
              </div>
              <h3 className="mt-2 font-serif text-2xl">Robert Bosch: safety-critical systems in production</h3>
            </summary>
            <div className="mt-4 space-y-3 text-muted-foreground leading-7">
              <p className="text-sm italic border-l-2 border-muted-foreground pl-3">
                <strong>Why here:</strong> Needed to test design philosophy against safety-critical requirements where failures have real consequences.
              </p>
              <ul className="space-y-2 list-disc ml-4">
                <li>Built V2X demonstrator for safety-critical automotive scenarios.</li>
                <li>Integrated across communication, software, and HMI layers.</li>
                <li>Learned what "shipped and reliable" really means in automotive.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-secondary/15 p-5">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Aug 2025 - Mar 2026</p>
                <p className="text-sm text-muted-foreground group-open:hidden">Open</p>
              </div>
              <h3 className="mt-2 font-serif text-2xl">Pickit 3D: operationalizing systems under real noise</h3>
            </summary>
            <div className="mt-4 space-y-3 text-muted-foreground leading-7">
              <p className="text-sm italic border-l-2 border-muted-foreground pl-3">
                <strong>Why here:</strong> Final test: does the philosophy hold when the system must survive operator error, WiFi dropouts, and hardware variability all at once?
              </p>
              <ul className="space-y-2 list-disc ml-4">
                <li>Worked on 3D vision-powered robotic picking in production settings.</li>
                <li>Diagnosed real deployment failures (WebSocket instability, node desynchronization, log pipeline timezone normalization).</li>
                <li>Reduced on-site debugging cycles and prevented recurrence via validation checks.</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      <section id="interactive-cv-map" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Interactive CV Map</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            Evidence density: problem → solution → impact.
          </h2>
        </div>

        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead className="bg-secondary/35 text-left">
              <tr>
                <th className="border-b border-border px-4 py-3 font-medium">Domain</th>
                <th className="border-b border-border px-4 py-3 font-medium">Problem diagnosed</th>
                <th className="border-b border-border px-4 py-3 font-medium">Technical approach</th>
                <th className="border-b border-border px-4 py-3 font-medium">Result</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground text-xs">
              <tr className="odd:bg-background even:bg-secondary/10">
                <td className="px-4 py-3 font-medium">Industrial robotics</td>
                <td className="px-4 py-3">ROS nodes desynchronizing under packet loss; vision pipeline failing on noisy WiFi</td>
                <td className="px-4 py-3">Exponential backoff, heartbeat validation, log pipeline with timezone-aware normalization</td>
                <td className="px-4 py-3">Reduced on-site debugging cycles; prevented recurrence via validation checks</td>
              </tr>
              <tr className="odd:bg-background even:bg-secondary/10">
                <td className="px-4 py-3 font-medium">Automotive systems</td>
                <td className="px-4 py-3">V2X communication latency tolerance unclear; HMI interaction patterns untested for safety scenarios</td>
                <td className="px-4 py-3">React HMI with explicit state machine for safety transitions; communication layer with deterministic delivery guarantees</td>
                <td className="px-4 py-3">Demonstrator delivered; ready for OEM validation</td>
              </tr>
              <tr className="odd:bg-background even:bg-secondary/10">
                <td className="px-4 py-3 font-medium">Applied AI and simulation</td>
                <td className="px-4 py-3">CNN lane detection overfitting to CARLA weather conditions; poor transfer to real camera data</td>
                <td className="px-4 py-3">Domain randomization in simulation; multi-condition training pipeline</td>
                <td className="px-4 py-3">Model generalization improved; foundation for real-world deployment</td>
              </tr>
              <tr className="odd:bg-background even:bg-secondary/10">
                <td className="px-4 py-3 font-medium">Full-stack/product engineering</td>
                <td className="px-4 py-3">Editorial content + deployment infrastructure decoupled; hard to maintain and iterate</td>
                <td className="px-4 py-3">Code-content co-location in TSX; per-page media folders; dynamic transpilation with path rewriting</td>
                <td className="px-4 py-3">Editorial + engineering workflows unified; this journal is the artifact</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="education-and-certification" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Education and Credentials</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            Parallel tracks, formal degrees, and practical certifications.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="border border-border p-5">
            <h3 className="font-serif text-2xl">Degree and training timeline</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead className="bg-secondary/30 text-left">
                  <tr>
                    <th className="border-b border-border px-3 py-2 font-medium">Period</th>
                    <th className="border-b border-border px-3 py-2 font-medium">Program</th>
                    <th className="border-b border-border px-3 py-2 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2026 - ongoing</td>
                    <td className="px-3 py-2">B.Sc. Mechatronics</td>
                    <td className="px-3 py-2">In progress</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2024 - 2025</td>
                    <td className="px-3 py-2">B.Sc. Artificial Intelligence</td>
                    <td className="px-3 py-2">GPA 3.44/4.5</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2019 - 2020</td>
                    <td className="px-3 py-2">B.Sc. Computer Engineering</td>
                    <td className="px-3 py-2">GPA 4.24/4.5</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2019 - 2022</td>
                    <td className="px-3 py-2">B.Sc. Business Administration</td>
                    <td className="px-3 py-2">GPA 3.77/4.5</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2020 - 2022</td>
                    <td className="px-3 py-2">42 Seoul Common Core</td>
                    <td className="px-3 py-2">Completed</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2023 - 2025</td>
                    <td className="px-3 py-2">42 Wolfsburg Advanced Core</td>
                    <td className="px-3 py-2">Transferred and continued</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="border border-border p-5">
            <h3 className="font-serif text-2xl">Selected certifications</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead className="bg-secondary/30 text-left">
                  <tr>
                    <th className="border-b border-border px-3 py-2 font-medium">Year</th>
                    <th className="border-b border-border px-3 py-2 font-medium">Credential</th>
                    <th className="border-b border-border px-3 py-2 font-medium">Issuer / level</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2025</td>
                    <td className="px-3 py-2">Network management certification (listed in current CV)</td>
                    <td className="px-3 py-2">Professional qualification</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2022</td>
                    <td className="px-3 py-2">TOEIC Speaking 160</td>
                    <td className="px-3 py-2">Advanced Low</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2021</td>
                    <td className="px-3 py-2">TOEIC 860</td>
                    <td className="px-3 py-2">Language certification</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2020</td>
                    <td className="px-3 py-2">Engineer Information Processing</td>
                    <td className="px-3 py-2">HRD Korea</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2020</td>
                    <td className="px-3 py-2">Craftsman Electronic Apparatus</td>
                    <td className="px-3 py-2">HRD Korea</td>
                  </tr>
                  <tr className="odd:bg-background even:bg-secondary/10">
                    <td className="px-3 py-2">2019</td>
                    <td className="px-3 py-2">Computer Specialist in Spreadsheet and Database Level I</td>
                    <td className="px-3 py-2">KCCI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </section>

      <section id="curriculum-vitae" className="grid gap-8 border-y border-border py-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Curriculum Vitae</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            PDF for formal use, this page for engineering context.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            The two CV files remain the official summary artifacts. This editor page adds missing
            context: decision style, system constraints, and evidence across projects and domains.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/CV.pdf"
            download
            className="flex min-h-44 flex-col justify-between border border-border bg-secondary/35 p-5 transition-colors hover:bg-secondary/55"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">PDF / Industry</p>
              <h3 className="font-serif text-2xl">Industrial CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Product engineering, robotics deployment, software integration, and operations.
              </p>
            </div>
            <span className="text-sm uppercase tracking-[0.18em] text-foreground">Download file</span>
          </a>

          <div
            aria-disabled="true"
            className="flex min-h-44 flex-col justify-between border border-border bg-secondary/20 p-5 opacity-60"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">PDF / Academic</p>
              <h3 className="font-serif text-2xl">Academic CV</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Graduate applications, research trajectory, and formal educational history.
              </p>
            </div>
            <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Coming soon</span>
          </div>
        </div>
      </section>

      <section id="what-this-journal-tracks" className="space-y-6">
        <article className="border border-border bg-secondary/20 p-6">
          <h3 className="font-serif text-3xl leading-tight mb-1">What this journal tracks</h3>
          <p className="text-sm text-muted-foreground mb-6 italic">The real engineering: what breaks, why it breaks, and what we learn.</p>
          <ul className="space-y-4 text-muted-foreground leading-7">
            <li className="flex gap-3">
              <span className="text-foreground font-medium min-w-fit">▸ Invisible assumptions</span>
              <span>How systems pass all tests, then fail in production the moment an assumption was violated.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-medium min-w-fit">▸ Operator reality</span>
              <span>How software and hardware interact under human error, fatigue, and real-world constraints that designers didn&apos;t anticipate.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-medium min-w-fit">▸ Interface clarity</span>
              <span>How systems die because teams could not see the same problem. Clarity in interface design prevents that death.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-medium min-w-fit">▸ Decisions and time</span>
              <span>How architecture choices made under pressure look very different after 18 months of operation and three production incidents.</span>
            </li>
          </ul>
        </article>
      </section>
    </div>
  )
}
