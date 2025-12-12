import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('site-theme');
      if (stored) return stored === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark-mode');
      localStorage.setItem('site-theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      localStorage.setItem('site-theme', 'light');
    }
  }, [dark]);

  return (
    <button
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      aria-pressed={dark}
      onClick={() => setDark((s) => !s)}
      className="theme-toggle"
    >
      <span className="theme-toggle-icon" aria-hidden>{dark ? '🌞' : '🌙'}</span>
      <span className="theme-toggle-label">{dark ? 'Light' : 'Dark'}</span>
    </button>
  );
};

export default ThemeToggle;
