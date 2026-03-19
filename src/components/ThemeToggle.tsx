'use client';

import { useEffect, useRef } from 'react';

function readTheme() {
  if (typeof window === 'undefined') return false;
  const stored = window.localStorage.getItem('theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = readTheme();
    }
  }, []);

  function handleChange(next: boolean) {
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <label className="theme-switch" aria-label="Toggle theme">
      <input
        ref={inputRef}
        type="checkbox"
        defaultChecked={false}
        onChange={(event) => handleChange(event.target.checked)}
      />
      <span className="theme-slider" />
    </label>
  );
}
