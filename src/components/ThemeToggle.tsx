'use client';

import { MoonStar, SunMedium } from 'lucide-react';

export default function ThemeToggle() {
  function handleToggle() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle color theme"
      onClick={handleToggle}
    >
      <span className="theme-toggle__frame" aria-hidden="true">
        <SunMedium className="theme-toggle__glyph theme-toggle__glyph--sun" strokeWidth={1.7} />
        <MoonStar className="theme-toggle__glyph theme-toggle__glyph--moon" strokeWidth={1.7} />
      </span>
    </button>
  );
}
