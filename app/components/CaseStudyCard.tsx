'use client'

import { useRouter } from 'next/navigation'
import { ViewTransitionLink } from './ViewTransitionLink'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'
import type { CaseStudy } from '@/lib/cases'

type Props = {
  caseStudy: CaseStudy
  locale: Locale
  size?: 'lg' | 'md'
}

/**
 * Card de case study en el home.
 * El cover (con view-transition-name="cover-{slug}") hace FLIP a la posición
 * del hero del case study cuando se navega a /trabajo/{slug}.
 */
export function CaseStudyCard({ caseStudy, locale, size = 'md' }: Props) {
  const router = useRouter()
  const href = localizedPath(`/trabajo/${caseStudy.slug}`, locale)

  // Prefetch agresivo en hover — combinado con ViewTransitionLink hace que
  // la navegación se sienta instantánea.
  const prefetch = () => router.prefetch(href)

  const coverSize = size === 'lg' ? 92 : 68

  return (
    <ViewTransitionLink
      href={href}
      onMouseEnter={prefetch}
      style={{
        display: 'block',
        padding: size === 'lg' ? '24px' : '20px',
        borderRadius: 18,
        background: 'var(--panel)',
        border: '0.5px solid var(--border)',
        transition:
          'transform var(--t) var(--ease), border-color var(--t) var(--ease), box-shadow var(--t) var(--ease)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        <div
          style={{
            // El name compartido entre las dos páginas — el browser hace FLIP.
            viewTransitionName: `cover-${caseStudy.slug}`,
            width: coverSize,
            height: coverSize,
            flexShrink: 0,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${caseStudy.coverGradient[0]}, ${caseStudy.coverGradient[1]})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF7F2',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: size === 'lg' ? 38 : 28,
            letterSpacing: '-0.02em',
          }}
        >
          {caseStudy.coverInitial}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 8,
            }}
          >
            <span>{caseStudy.category}</span>
            <span aria-hidden style={{ opacity: 0.5 }}>·</span>
            <span>
              {caseStudy.yearStart} —{' '}
              {caseStudy.yearEnd === 'present'
                ? getUI(locale).caseMeta.present
                : caseStudy.yearEnd}
            </span>
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: size === 'lg' ? 22 : 18,
              fontWeight: 500,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
            }}
          >
            {caseStudy.title}
          </h3>

          <p
            style={{
              margin: '12px 0 0',
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {caseStudy.oneLiner}
          </p>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            {caseStudy.outcomes.slice(0, 3).map((o) => (
              <div
                key={o.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingRight: 14,
                  borderRight: '0.5px solid var(--divider)',
                }}
              >
                <span
                  className="serif"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    fontStyle: 'italic',
                    color: 'var(--text)',
                    lineHeight: 1.1,
                  }}
                >
                  {o.metric}
                </span>
                <span style={{ fontSize: 10, color: 'var(--subtle)', letterSpacing: '0.08em', marginTop: 2 }}>
                  {o.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          style={{
            color: 'var(--muted)',
            fontSize: 18,
            alignSelf: 'flex-end',
          }}
        >
          →
        </div>
      </div>
    </ViewTransitionLink>
  )
}
