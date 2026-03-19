import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "KKim Blog",
  description: "Markdown-first blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = stored ? stored === 'dark' : prefersDark;
                document.documentElement.classList.toggle('dark', isDark);
              } catch {}
            `,
          }}
        />
        <header className="sticky top-0 z-10 bg-white/70 dark:bg-black/50 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">KKim</Link>
            <nav className="flex items-center gap-3">
              <Link href="/hello-world" className="text-sm text-zinc-700 dark:text-zinc-300 hover:underline">Sample</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
