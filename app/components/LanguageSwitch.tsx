'use client'

import { usePathname } from 'next/navigation'
import { alternatePath, getUI, type Locale } from '@/lib/i18n'

/**
 * Selector de idioma ES / EN.
 *
 * Calcula la ruta equivalente en el otro idioma a partir del pathname actual y,
 * antes de navegar, persiste la elección en la cookie `NEXT_LOCALE` para que el
 * middleware no vuelva a redirigir al visitante a su idioma detectado.
 */
export function LanguageSwitch({
  locale,
  variant = 'default',
}: {
  locale: Locale
  variant?: 'default' | 'drawer'
}) {
  const pathname = usePathname() || '/'
  const t = getUI(locale).langSwitch

  function hrefFor(target: Locale) {
    return alternatePath(pathname, target)
  }

  function persist(target: Locale) {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`
  }

  const isDrawer = variant === 'drawer'

  return (
    <div
      role="group"
      aria-label={locale === 'es' ? 'Idioma' : 'Language'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        borderRadius: 999,
        border: '0.5px solid var(--border-strong)',
        background: 'transparent',
      }}
    >
      {(['es', 'en'] as Locale[]).map((target) => {
        const active = target === locale
        return (
          <a
            key={target}
            href={hrefFor(target)}
            hrefLang={target}
            aria-label={target === 'es' ? t.ariaToEs : t.ariaToEn}
            aria-current={active ? 'true' : undefined}
            onClick={() => persist(target)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: isDrawer ? 44 : 30,
              height: isDrawer ? 32 : 24,
              padding: isDrawer ? '0 12px' : '0 8px',
              borderRadius: 999,
              fontSize: isDrawer ? 13 : 11,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? 'var(--text-inverse)' : 'var(--text-secondary)',
              transition:
                'background var(--t-fast) var(--ease), color var(--t-fast) var(--ease)',
              pointerEvents: active ? 'none' : 'auto',
            }}
          >
            {target}
          </a>
        )
      })}
    </div>
  )
}
