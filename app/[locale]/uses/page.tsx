import type { Metadata } from 'next'
import { Reveal } from '@/app/components/Reveal'
import { getUses } from '@/lib/uses'
import { toLocale, type Locale } from '@/lib/i18n'

type UsesContent = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  intro: string
}

const USES: Record<Locale, UsesContent> = {
  es: {
    metaTitle: 'Uses',
    metaDescription:
      'Hardware, software, tipografías y libros que uso en el día a día como Senior Product Designer y UX Engineer.',
    eyebrow: 'Uses',
    title: 'Lo que uso.',
    intro:
      'Mi stack diario para diseño y frontend. No es una lista exhaustiva: solo lo que de verdad uso cada semana.',
  },
  en: {
    metaTitle: 'Uses',
    metaDescription:
      'Hardware, software, typefaces, and books I use day to day as a Senior Product Designer and UX Engineer.',
    eyebrow: 'Uses',
    title: 'What I use.',
    intro:
      'My daily stack for design and frontend. Not an exhaustive list — just what I genuinely use every week.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = USES[locale]
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: locale === 'en' ? '/en/uses' : '/uses',
      languages: { es: '/uses', en: '/en/uses', 'x-default': '/uses' },
    },
  }
}

export default async function UsesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await params).locale)
  const t = USES[locale]
  const uses = getUses(locale)

  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 880 }}>
      <Reveal>
        <header style={{ marginBottom: 64, maxWidth: '60ch' }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 14,
            }}
          >
            {t.eyebrow}
          </p>
          <h1
            className="serif"
            style={{
              margin: 0,
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              margin: '24px 0 0',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
            }}
          >
            {t.intro}
          </p>
        </header>
      </Reveal>

      <div style={{ display: 'grid', gap: 64 }}>
        {uses.map((category, i) => (
          <Reveal key={category.name} delay={i * 0.05}>
            <section>
              <h2
                style={{
                  margin: '0 0 24px',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  paddingBottom: 8,
                  borderBottom: '0.5px solid var(--border)',
                }}
              >
                {category.name}
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 22 }}>
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(180px, 1fr) minmax(0, 2fr)',
                      gap: 24,
                      alignItems: 'baseline',
                    }}
                  >
                    <div>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: 'var(--text)',
                            borderBottom: '1px solid var(--accent)',
                            paddingBottom: 1,
                          }}
                        >
                          {item.name} ↗
                        </a>
                      ) : (
                        <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)' }}>
                          {item.name}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
