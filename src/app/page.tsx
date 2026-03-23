import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { flattenPages, getPageSummary, readPage, readTree, toPath } from "@/lib/content";
import { getComponentPage } from "@/lib/content-pages";

const profileFacts = [
  { label: "Editor", value: "Kwanho Kim" },
  { label: "Coverage", value: "Systems, robotics, interfaces, project notes, and the occasional personal view behind them." },
  { label: "Base", value: "Wolfsburg / Seoul" },
  { label: "Contact", value: "kwanho0096@gmail.com" },
  { label: "Viewpoint", value: "Edited from an engineering desk with a preference for clarity, structure, and honest notes." },
];

const featuredWork = [
  {
    eyebrow: "Desk One",
    title: "Systems under load",
    copy: "Field notes on software that has to stay legible when timing, failure, and pressure become real.",
  },
  {
    eyebrow: "Desk Two",
    title: "Machines in the loop",
    copy: "Writing on robotics, physical interfaces, and the engineering decisions that shape behavior in the world.",
  },
  {
    eyebrow: "Desk Three",
    title: "Public engineering",
    copy: "Editorial notes that turn private implementation details into arguments worth sharing, testing, and debating.",
  },
];

export default function Home() {
  const tree = readTree();
  const latestPosts = flattenPages(tree)
    .map((node) => {
      const componentPage = getComponentPage(node.slug);
      if (componentPage) {
        return {
          href: toPath(node.slug),
          slug: node.slug.join("/"),
          title: componentPage.title,
          date: componentPage.publishedAt ? new Date(componentPage.publishedAt) : null,
          summary: componentPage.summary ?? null,
        };
      }

      const page = readPage(node.slug);
      if (!page) return null;
      const rawDate = typeof page.frontmatter.date === "string" ? page.frontmatter.date : null;
      const date = rawDate ? new Date(rawDate) : null;

      return {
        href: toPath(node.slug),
        slug: node.slug.join("/"),
        title: page.title,
        date,
        summary: getPageSummary(page),
      };
    })
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => {
      const aTime = a.date ? a.date.getTime() : 0;
      const bTime = b.date ? b.date.getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 4);
  const leadPostHref = latestPosts[0]?.href ?? "/hello-world";

  return (
    <main className="page-shell home-shell">
      <section className="home-hero">
        <div className="home-hero__rule" />
        <div className="home-hero__copy">
          <p className="home-hero__meta">Vol. 1, No. 001 · Edited by Kwanho Kim · Notes, essays, and engineering dispatches</p>
          <h1 className="home-hero__title">The Kkim Journal</h1>
          <p className="home-hero__role">Edited by Kwanho Kim</p>
          <p className="home-hero__ledger">
            Wolfsburg / Seoul · Systems · Robotics · Public engineering · Human-centered interfaces
          </p>
          <p className="home-hero__attitude">Engineering notes, project logs, and occasional essays.</p>
          <p className="home-hero__summary">
            A place to publish what I build, what I learn from it, and what feels worth keeping after the work is done.
          </p>
          <div className="hero-actions">
            {[
              { label: "Editor's Introduction", href: "/editor", external: false },
              { label: "Read Latest", href: leadPostHref, external: false },
              { label: "GitHub", href: "https://github.com/KKWANH", external: true },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/kwanhokim/", external: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hero-action"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="home-hero__aside">
          <p className="section-eyebrow">Editor&apos;s Note</p>
          <p className="home-hero__aside-text">
            Some entries stay close to implementation. Others are more reflective. The point is to keep both the work and the point of view in one place.
          </p>
          <p className="home-hero__aside-note">
            Open the menu beside the theme toggle to browse the full journal tree.
          </p>
        </div>
        <div className="home-hero__rule" />
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p className="section-eyebrow">From The Editor</p>
          <h2 className="section-title">A working desk, not a manifesto.</h2>
        </div>
        <div className="profile-layout">
          <div className="profile-copy">
            <p>
              This site started as a way to keep technical work from disappearing into private notes. Over time it also became a place to keep the personal judgment around that work visible.
            </p>
            <p>
              Most entries begin from software, robotics, or interface work. Some stay technical. Some drift closer to diary or essay. That mix is intentional.
            </p>
          </div>
          <dl className="profile-facts">
            {profileFacts.map((fact) => (
              <div key={fact.label} className="profile-fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="home-panel__divider" />
        <div className="section-heading section-heading--dense">
          <p className="section-eyebrow">Regular Coverage</p>
          <h2 className="section-title">Recurring desks inside the journal.</h2>
        </div>
        <div className="feature-grid">
          {featuredWork.map((item) => (
            <article key={item.title} className="feature-card">
              <p className="feature-card__eyebrow">{item.eyebrow}</p>
              <h3 className="feature-card__title">{item.title}</h3>
              <p className="feature-card__copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="latest-blog">
        <div className="section-heading">
          <p className="section-eyebrow">Current Issue</p>
          <h2 className="section-title">Recent dispatches from the journal desk.</h2>
        </div>
        {latestPosts.length === 0 ? (
          <p className="empty-state">
            No posts yet. Create a folder under <code>content/</code> and add an <code>index.md</code>.
          </p>
        ) : (
          <ol className="post-list">
            {latestPosts.map((post, index) => (
              <li key={post.href} className="post-list__item">
                <p className="post-list__index">{String(index + 1).padStart(2, '0')}</p>
                <div className="post-list__content">
                  <p className="post-list__meta">
                    {post.date
                      ? new Intl.DateTimeFormat("en", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(post.date)
                      : "Undated note"}
                  </p>
                  <h3 className="post-list__title">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  {post.summary ? <p className="post-list__summary">{post.summary}</p> : null}
                  <p className="post-list__slug">/{post.slug} · editorial note</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="home-section home-section--compact">
        <div className="closing-note">
          <p className="section-eyebrow">Editorial Position</p>
          <p className="closing-note__text">
            This is still a portfolio, but it works better as a record of thinking than as a polished showcase alone.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
