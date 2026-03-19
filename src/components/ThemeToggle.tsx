'use client';

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
        <span className="theme-toggle__icon theme-toggle__icon--sun" />
        <span className="theme-toggle__icon theme-toggle__icon--moon" />
      </span>
    </button>
  );
}
