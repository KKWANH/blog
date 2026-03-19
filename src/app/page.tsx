import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { readTree } from "@/lib/content";
import TreeList from "@/components/TreeList";

export default function Home() {
  const tree = readTree();
  return (
    <main className="page-shell home-shell">
      <section className="front-page">
        <div className="front-page__rule" />
        <p className="front-page__meta">Vol. 1, No. 001  *  KKim Journal  *  Markdown Edition</p>
        <h1 className="front-page__masthead">The KKim Journal</h1>
        <div className="front-page__rule" />
        <div className="front-page__lead">
          <div className="front-page__lead-copy">
            <p className="front-page__kicker">Writing Desk</p>
            <h2 className="front-page__headline">A calm space to write and think.</h2>
            <p className="front-page__summary">
              Markdown-first notes, folder-based archives, and a quieter reading surface inspired by old print.
            </p>
            <Link href="/hello-world" className="paper-button">
              Read the sample post
            </Link>
          </div>
          <div className="front-page__lead-panel">
            <p className="front-page__panel-title">Editorial Structure</p>
            <p>
              Directories become routes. Underscore folders stay private for media. Posts remain plain Markdown, with optional HTML blocks for richer layouts.
            </p>
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
