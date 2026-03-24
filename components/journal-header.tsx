import Link from 'next/link'
import { HeaderControls } from '@/components/content-drawer'
import { getContentTree } from '@/lib/content'

const primaryNavItems = [
  { href: '/editor', label: 'Editor' },
  { href: '/travel', label: 'Travel' },
  { href: '/archive', label: 'Archive' },
] as const

export function JournalHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const tree = getContentTree()

  return (
    <header className="border-b border-border">
      {/* Top bar with date and theme toggle */}
      <div className="flex items-center justify-between px-6 py-2 text-xs tracking-wide text-muted-foreground border-b border-border">
        <span className="uppercase">{currentDate}</span>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {primaryNavItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground transition-colors uppercase">
                {item.label}
              </Link>
            ))}
          </nav>
          <HeaderControls tree={tree} />
        </div>
      </div>

      {/* Main masthead */}
      <div className="py-8 md:py-12 px-6 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="dark:font-sans font-serif">The KKIM Journal</span>
          </h1>
        </Link>
        <p className="mt-3 text-sm md:text-base text-muted-foreground tracking-widest uppercase">
          Ideas · Essays · Technical Writings
        </p>
      </div>

      {/* Mobile navigation */}
      <nav className="md:hidden flex items-center justify-center gap-6 px-6 pb-4 text-xs tracking-wide text-muted-foreground border-b border-border">
        {primaryNavItems.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-foreground transition-colors uppercase">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
