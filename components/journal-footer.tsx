import Link from 'next/link'

export function JournalFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-16">
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Top section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-8 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold dark:font-sans font-serif">
                The KKIM Journal
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                A publication of ideas, essays, and technical writings.
              </p>
            </div>

            <nav className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  Navigation
                </span>
                <Link href="/" className="hover:text-muted-foreground transition-colors">
                  Home
                </Link>
                <Link href="/archive" className="hover:text-muted-foreground transition-colors">
                  Archive
                </Link>
                <Link href="/editor" className="hover:text-muted-foreground transition-colors">
                  Editor
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  Categories
                </span>
                <Link href="/archive?category=essay" className="hover:text-muted-foreground transition-colors">
                  Essays
                </Link>
                <Link href="/archive?category=technical" className="hover:text-muted-foreground transition-colors">
                  Technical
                </Link>
                <Link href="/archive?category=opinion" className="hover:text-muted-foreground transition-colors">
                  Opinion
                </Link>
              </div>
            </nav>
          </div>

          {/* Bottom section */}
          <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
            <p>© {currentYear} The KKIM Journal. All rights reserved.</p>
            <p className="tracking-wider uppercase">
              Published by Kwanho Kim
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
