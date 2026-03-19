import Link from "next/link";
import { readTree } from "@/lib/content";
import TreeList from "@/components/TreeList";

export default function Home() {
  const tree = readTree();
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
          <div className="relative p-10 sm:p-14">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              A calm space to write and think.
            </h1>
            <p className="mt-3 text-zinc-200 max-w-xl">
              Markdown-first notes, organized by folders. Minimal, timeless typography.
            </p>
            <div className="mt-6">
              <Link href="/hello-world" className="inline-flex items-center rounded-md bg-white/95 px-4 py-2 text-zinc-900 hover:bg-white">
                Read the sample post
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-8">
        {tree.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            No posts yet. Create a folder under <code>content/</code> and add an <code>index.md</code>.
          </p>
        ) : (
          <TreeList nodes={tree} />
        )}
      </section>
      <footer className="mt-16 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/hello-world" className="hover:underline">View sample post</Link>
      </footer>
    </main>
  );
}
