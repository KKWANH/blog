import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { readTree } from "@/lib/content";
import TreeList from "@/components/TreeList";

export default function Home() {
  const tree = readTree();
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-card__body">
          <h1 className="hero-card__title">
              A calm space to write and think.
          </h1>
          <p className="hero-card__copy">
            Markdown-first notes, organized by folders. Minimal, clear, and stable across light and dark themes.
          </p>
          <div className="hero-card__actions">
            <Link href="/hello-world" className="hero-card__button">
              Read the sample post
            </Link>
          </div>
        </div>
      </section>
      <section className="content-index">
        {tree.length === 0 ? (
          <p className="empty-state">
            No posts yet. Create a folder under <code>content/</code> and add an <code>index.md</code>.
          </p>
        ) : (
          <TreeList nodes={tree} />
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
