'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MotionControl } from '@/components/motion-provider'
import { photographyPublished } from '@/lib/photographs'

const navigation = [
  { href: '/#work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/travel', label: 'Travel' },
  ...(photographyPublished || process.env.NODE_ENV === 'development' ? [{ href: '/photography', label: 'Photos' }] : []),
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = header.current
    if (!element) return
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--site-header-height', `${element.getBoundingClientRect().height}px`)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header ref={header} className="notebook-header">
      <div className="site-width header-inner">
        <Link href="/" className="wordmark" aria-label="Kwanho Kim, home" onClick={() => setOpen(false)}>
          <span className="wordmark-name">kwanho<span className="wordmark-domain">.dev</span></span>
        </Link>
        <div className="header-controls">
          <button
            ref={menuButton}
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="main-navigation" className="main-nav" aria-label="Main navigation" data-open={open}>
            {navigation.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <Link key={href} href={href} aria-current={active ? pathname === href ? 'page' : 'location' : undefined} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              )
            })}
          </nav>
          <a href="/CV.pdf" className="header-cv">CV <ArrowUpRight aria-hidden="true" /></a>
          <MotionControl compact />
        </div>
      </div>
    </header>
  )
}
