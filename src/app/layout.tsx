import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
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
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var stored = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var isDark = stored ? stored === 'dark' : prefersDark;
              document.documentElement.classList.toggle('dark', isDark);
            } catch {}
          `}
        </Script>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="site-logo">kwanho kim&apos;s blog.</Link>
            <ThemeToggle />
          </div>
        </header>
        <div className="site-body">{children}</div>
      </body>
    </html>
  );
}
