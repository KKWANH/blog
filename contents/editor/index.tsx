export const title = "Editor's Introduction"
export const subtitle = 'Why this journal exists, how it is organized, and what kind of engineering it is trying to understand.'
export const description = 'An introduction to the thinking model behind The KKIM Journal.'
export const excerpt =
  'A short statement of context, observation, position, and direction behind a journal about systems that must survive real conditions.'
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
            I work where robotics, vision systems, and software meet real conditions.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Most of what I have built so far has not lived in controlled environments. Systems
            usually fail for ordinary reasons: timing, interfaces, edge cases, incomplete data, or
            assumptions that collapse once the world stops cooperating.
          </p>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            That changed how I think about engineering. I no longer find it useful to ask whether a
            system is elegant in isolation. The more useful question is whether it can hold its
            shape once conditions become messy.
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

      <section id="snapshot" className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article className="border border-border bg-secondary/20 p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Current Work</p>
          <h3 className="mt-3 font-serif text-2xl">Robotics + vision</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Leuven, Belgium. Working on 3D vision-based robotic picking systems for industrial use,
            with emphasis on deployments, failure analysis, and robustness.
          </p>
        </article>

        <article className="border border-border bg-secondary/20 p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Automotive</p>
          <h3 className="mt-3 font-serif text-2xl">V2X + HMI</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Robert Bosch GmbH, Hildesheim. Built a V2X demonstrator, integrated communication
            modules, and shipped a React-based HMI for safety-oriented mobility scenarios.
          </p>
        </article>

        <article className="border border-border bg-secondary/20 p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Education</p>
          <h3 className="mt-3 font-serif text-2xl">Four parallel tracks</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Mechatronics, artificial intelligence, computer engineering, and business
            administration, alongside the 42 Seoul and 42 Wolfsburg core programs.
          </p>
        </article>

        <article className="border border-border bg-secondary/20 p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Working Rule</p>
          <h3 className="mt-3 font-serif text-2xl">Stress reveals structure</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The criterion is not elegance in isolation. It is whether a system continues to hold
            once timing, noise, edge cases, and real operators are introduced.
          </p>
        </article>
      </section>

      <section id="position" className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-l-2 border-foreground pl-5 text-foreground">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Position</p>
          <p className="mt-3 text-xl leading-8">
            This journal is where I try to understand the boundary between systems that look
            correct and systems that actually hold up.
          </p>
        </div>

        <div className="space-y-5 text-muted-foreground leading-8">
          <p>
            Some entries are technical. Some are not. The common thread is the same question: what
            makes a system continue to work once the environment stops being clean?
          </p>
          <p>
            The site itself follows the same rule. Content lives next to the code and assets that
            define it, because separation adds ceremony but does not add understanding.
          </p>
        </div>
      </section>

      <section id="experience" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground">Selected Experience</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            The CV details where the work happened. This is the compressed version.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="border-t border-border pt-5">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Leuven, Belgium · Aug 2025 ~ ongoing</p>
            <h3 className="mt-3 font-serif text-2xl">Industrial robotics and 3D vision</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground leading-7">
              <li>Worked on 3D vision-based robotic picking systems for industrial applications.</li>
              <li>Integrated vision software with robotic platforms and supported real deployments.</li>
              <li>Investigated failure cases and improved robustness through testing and debugging.</li>
            </ul>
          </article>

          <article className="border-t border-border pt-5">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Hildesheim, Germany · Jun 2024 ~ Nov 2024</p>
            <h3 className="mt-3 font-serif text-2xl">Automotive communication systems</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground leading-7">
              <li>Developed a V2X-based vehicle demonstrator for safety-critical scenarios.</li>
              <li>Integrated communication modules and designed data interfaces.</li>
              <li>Built a React-based HMI for eBike safety applications.</li>
            </ul>
          </article>

          <article className="border-t border-border pt-5">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Seoul, South Korea · May 2023 ~ Jun 2023</p>
            <h3 className="mt-3 font-serif text-2xl">System QA and product comparison</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground leading-7">
              <li>Conducted system QA and identified improvement areas for an education platform.</li>
              <li>Compared competing systems to support product decisions.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="education" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground">Education</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            The academic path is not linear, but it is consistent.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="border border-border p-5">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Seoul, South Korea</p>
            <h3 className="mt-3 font-serif text-2xl">Degree work</h3>
            <ul className="mt-4 space-y-3 text-muted-foreground leading-7">
              <li>B.Sc. in Mechatronics, Feb 2026 ~ ongoing.</li>
              <li>B.Sc. in Artificial Intelligence, GPA 3.44/4.5, Mar 2024 ~ Feb 2025.</li>
              <li>B.Sc. in Computer Engineering, GPA 4.24/4.5, Apr 2019 ~ Aug 2020.</li>
              <li>B.Sc. in Business Administration, GPA 3.77/4.5, Apr 2019 ~ Aug 2022.</li>
            </ul>
          </article>

          <article className="border border-border p-5">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Seoul → Wolfsburg</p>
            <h3 className="mt-3 font-serif text-2xl">Applied software training</h3>
            <ul className="mt-4 space-y-3 text-muted-foreground leading-7">
              <li>Graduate Common Core in 42 Seoul, Sep 2020 ~ Aug 2022.</li>
              <li>Advanced Core in 42 Wolfsburg, transferred and continued Jul 2023 ~ Aug 2025.</li>
              <li>Master&apos;s-level program in Software Engineering Automotive &amp; Mobility Ecosystem, Wolfsburg, Jul 2023 ~ Jun 2024.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="curriculum-vitae" className="grid gap-8 border-y border-border py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground">Curriculum Vitae</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            The CV is useful, but it is not the main explanation.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            If the question is where I have worked, studied, or shipped things, the PDFs are the
            short answer. If the question is how I think, this page is more accurate.
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

      <section id="projects-and-skills" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <figure className="w-full max-w-md justify-self-start space-y-3 border border-border bg-secondary/40 p-4">
          <img
            src="./_media/profile2.jpg"
            alt="Abstract portrait illustration"
            className="aspect-[4/5] w-full object-cover object-center"
          />
        </figure>

        <div className="space-y-6">
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Projects, tools, and side work matter because they show operating range.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            The CV currently includes work beyond formal roles: leading a team that won one of
            Bosch&apos;s large automotive hackathons in Berlin, implementing CNN-based lane detection
            in the Carla simulator, and leading a 50-member rock band community that organized
            multi-hundred-person concerts in Seoul.
          </p>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            The technical toolkit behind that work is straightforward: C, C++, Python,
            TypeScript, Assembly, React, ROS 1/2, Docker, Git, GitHub, Figma, and the Carla
            simulator. The domains are similarly consistent: robotics, computer vision, V2X
            communication, HMI, embedded systems, and web programming.
          </p>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            The current CV also lists certifications from 2019 through 2025, including national
            credentials in information processing, spreadsheet and database tooling, and network
            administration. Languages are Korean, English, and beginner German.
          </p>
        </div>
      </section>
    </div>
  )
}
