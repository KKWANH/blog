import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import HeaderControls from "@/components/HeaderControls";
import { readTree } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Kkim Journal",
  description: "A markdown-first journal edited by Kwanho Kim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tree = readTree();

  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var stored = localStorage.getItem('theme');
              var isDark = stored ? stored === 'dark' : true;
              document.documentElement.classList.toggle('dark', isDark);
            } catch {}
          `}
        </Script>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="site-logo">the kkim journal.</Link>
            <HeaderControls tree={tree} />
          </div>
        </header>
        <div className="site-body">{children}</div>
      </body>
    </html>
  );
}
