import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { flattenPages, readPage, readTree, toPath } from "@/lib/content";

const heroLinks = [
  { label: "GitHub", href: "https://github.com/KKWANH", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kwanhokim/", external: true },
  { label: "Resume", href: "mailto:kwanho0096@gmail.com?subject=Resume%20request", external: false },
];

const profileFacts = [
  { label: "Focus", value: "Real-time systems, robotics, and human-centered interfaces." },
  { label: "Base", value: "Wolfsburg / Seoul" },
  { label: "Contact", value: "kwanho0096@gmail.com" },
  { label: "Approach", value: "Structured engineering with an experimental, design-aware edge." },
];

const featuredWork = [
  {
    eyebrow: "Systems",
    title: "Real-time engineering",
    copy: "I care about software that reacts quickly, stays observable, and remains understandable under pressure.",
  },
  {
    eyebrow: "Robotics",
    title: "Physical-world interfaces",
    copy: "I am drawn to products where software meets sensors, motion, and human decision-making.",
  },
  {
    eyebrow: "Product",
    title: "Human-centered tools",
    copy: "I want technical systems to feel intentional from both the implementation side and the user side.",
  },
];

export default function Home() {
  const tree = readTree();
  const latestPosts = flattenPages(tree)
    .map((node) => {
      const page = readPage(node.slug);
      if (!page) return null;
      const rawDate = typeof page.frontmatter.date === "string" ? page.frontmatter.date : null;
      const date = rawDate ? new Date(rawDate) : null;

      return {
        href: toPath(node.slug),
        slug: node.slug.join("/"),
        title: page.title,
        date,
      };
    })
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => {
      const aTime = a.date ? a.date.getTime() : 0;
      const bTime = b.date ? b.date.getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 4);

  return (
    <main className="page-shell home-shell">
      <section className="home-hero">
        <div className="home-hero__rule" />
        <div className="home-hero__copy">
          <p className="home-hero__meta">Vol. 1, No. 001 · Kwanho Kim&apos;s Blog · Notes and Work</p>
          <h1 className="home-hero__title">Kwanho Kim</h1>
          <p className="home-hero__role">Software Engineer &amp; Creative Technologist</p>
          <p className="home-hero__ledger">
            Wolfsburg / Seoul · Real-time systems · Robotics · Human-centered interfaces
          </p>
          <p className="home-hero__summary">
            Building real-time systems, robotics, and human-centered interfaces with an engineering mindset that values clarity, performance, and form.
          </p>
          <div className="hero-actions">
            {heroLinks.map((link) => (
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
          <p className="section-eyebrow">Current Direction</p>
          <p className="home-hero__aside-text">
            Professional at first glance, distinctive on second look. This is where I collect work, writing, and the reasoning behind both.
          </p>
          <p className="home-hero__aside-note">
            Open the menu beside the theme toggle to browse the full journal tree.
          </p>
        </div>
        <div className="home-hero__rule" />
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p className="section-eyebrow">About / Profile</p>
          <h2 className="section-title">Engineering with structure, speed, and a human point of view.</h2>
        </div>
        <div className="profile-layout">
          <div className="profile-copy">
            <p>
              I am interested in software that must be both technically sound and experientially coherent, especially when it touches real-time behavior, physical systems, or interfaces people rely on.
            </p>
            <p>
              The goal of this blog is simple: document what I build, show how I think, and leave a clear trail of ideas worth following.
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
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p className="section-eyebrow">Featured Work</p>
          <h2 className="section-title">The themes I want my work to be known for.</h2>
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

      <section className="home-section">
        <div className="section-heading">
          <p className="section-eyebrow">Latest Blog</p>
          <h2 className="section-title">Recent notes, experiments, and writing.</h2>
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
                  <p className="post-list__slug">/{post.slug}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="home-section home-section--compact">
        <div className="closing-note">
          <p className="section-eyebrow">Why This Exists</p>
          <p className="closing-note__text">
            A portfolio can show outcomes. A blog shows judgment. This space is for both.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
