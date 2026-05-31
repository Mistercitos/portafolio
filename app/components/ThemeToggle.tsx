'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Light siempre por default. Dark solo si el usuario lo eligió antes.
    // No respetamos prefers-color-scheme del OS — la marca es light-first.
    const stored = (localStorage.getItem('theme') as Theme | null) ?? null
    const initial: Theme = stored === 'dark' ? 'dark' : 'light'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsViewTransitions = 'startViewTransition' in document

    if (!supportsViewTransitions || reduceMotion) {
      applyTheme(next)
      return
    }

    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    // Inyecta los keyframes específicos para este wipe
    const styleEl = document.createElement('style')
    styleEl.id = 'theme-wipe-style'
    styleEl.textContent = `
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }
      ::view-transition-new(root) {
        clip-path: circle(0 at ${x}px ${y}px);
        animation: theme-wipe-in 540ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      @keyframes theme-wipe-in {
        to { clip-path: circle(${endRadius}px at ${x}px ${y}px); }
      }
    `
    document.head.appendChild(styleEl)

    const transition = document.startViewTransition(() => applyTheme(next))
    transition.finished.finally(() => styleEl.remove())
  }

  const applyTheme = (t: Theme) => {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
  }

  if (!mounted) {
    // Placeholder mientras hidrata — evita flash
    return <span style={{ width: 44, height: 44, display: 'inline-block' }} aria-hidden />
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      style={{
        width: 44,
        height: 44,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: '0.5px solid var(--border-strong)',
        background: 'transparent',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease)',
      }}
    >
      {theme === 'dark' ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  )
}
