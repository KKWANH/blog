'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/components/theme-provider'
import { externalLinks } from '@/lib/projects'

const navItems = [
  { href: '/#projects', label: 'Projects' },
  { href: '/editor', label: 'Editor' },
  { href: '/travel', label: 'Travel' },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-0 -z-10 bg-background/70 backdrop-blur-md border-b border-border/50" />
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="relative inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-card transition-transform group-hover:rotate-[8deg]"
          >
            <span className="absolute inset-1 rounded-[4px] bg-[conic-gradient(from_220deg,var(--brand-emerald),var(--brand-cyan),var(--brand-violet),var(--brand-emerald))] opacity-90" />
          </span>
          <span className="font-mono text-sm tracking-tight">
            kwanho<span className="text-muted-foreground">.dev</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-3">
          {navItems.map((item) => {
            const isActive =
              item.href === '/#projects'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hidden md:inline-flex items-center px-2.5 py-1.5 text-xs uppercase tracking-[0.16em] rounded-md transition-colors ${
                  isActive
                    ? 'text-foreground bg-secondary/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <a
            href={externalLinks.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>

          {mounted ? (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          ) : (
            <span className="inline-flex h-8 w-8" aria-hidden />
          )}
        </nav>
      </div>

      {/* Mobile inline nav */}
      <div className="md:hidden border-t border-border/50">
        <nav className="max-w-6xl mx-auto flex items-center gap-0.5 px-4 py-1.5 overflow-x-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === '/#projects'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-foreground bg-secondary/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
