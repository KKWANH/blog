'use client';

export default function ThemeToggle() {
  function handleClick() {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains('dark');
    root.classList.toggle('dark', nextIsDark);
    window.localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
    >
      Toggle theme
    </button>
  );
}
