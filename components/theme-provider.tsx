'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'dark' | 'light'
type ThemeContextValue = { theme: Theme; toggle: () => void }
const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kwanho-theme') as Theme | null
      const initialTheme = (saved === 'light' || saved === 'dark') ? saved : 'dark'
      setTheme(initialTheme)
      document.documentElement.dataset.theme = initialTheme
      if (initialTheme === 'light') {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      } else {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      }
    } catch {}
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    if (next === 'light') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }
    try { localStorage.setItem('kwanho-theme', next) } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'
  const label = isLight ? 'Switch to dark mode' : 'Switch to light mode'
  return (
    <button
      type="button"
      className={`theme-toggle ${compact ? 'theme-compact' : ''}`}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {isLight ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
      <span className={compact ? 'sr-only' : undefined}>{isLight ? 'Dark' : 'Light'}</span>
    </button>
  )
}
