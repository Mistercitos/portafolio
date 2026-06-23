import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import { Placeholder } from '@/app/components/Placeholder'
import { WolfCase } from './_cases/WolfCase'
import { OutbuildCase } from './_cases/OutbuildCase'
import { LFICase } from './_cases/LFICase'
import { StockAICase } from './_cases/StockAICase'
import { AstrosCase } from './_cases/AstrosCase'
import { DeliveryNowCase } from './_cases/DeliveryNowCase'
import { PlannyMeCase } from './_cases/PlannyMeCase'
import { cases, getCaseBySlug } from '@/lib/cases'
import { getUI, localizedPath, toLocale } from '@/lib/i18n'

const EXECUTION_VARIANTS = ['hero', 'gallery', 'mobile', 'process'] as const

const BASE = 'https://chrisdelbarco.design'

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = toLocale(rawLocale)
  const c = getCaseBySlug(slug, locale)
  if (!c) return { title: locale === 'en' ? 'Case study not found' : 'Case study no encontrado' }
  const ogImage = `/api/og?title=${encodeURIComponent(c.title)}&eyebrow=${encodeURIComponent(
    `Case study · ${c.category}`,
  )}`
  const path = `/trabajo/${c.slug}`
  return {
    title: c.title,
    description: c.oneLiner,
    alternates: {
      canonical: localizedPath(path, locale),
      languages: {
        es: path,
        en: `/en${path}`,
        'x-default': path,
      },
    },
    openGraph: {
      type: 'article',
      locale: getUI(locale).ogLocale,
      title: c.title,
      description: c.oneLiner,
      images: [{ url: ogImage, width: 1200, height: 630, alt: c.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.title,
      description: c.oneLiner,
      images: [ogImage],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params
  const locale = toLocale(rawLocale)
  const c = getCaseBySlug(slug, locale)
  if (!c) notFound()

  const ui = getUI(locale)
  const path = `/trabajo/${c.slug}`
  const url = `${BASE}${localizedPath(path, locale)}`
  const homeName = locale === 'en' ? 'Home' : 'Inicio'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: c.title,
        description: c.oneLiner,
        url,
        dateCreated: String(c.yearStart),
        inLanguage: locale,
        author: { '@type': 'Person', name: 'Christian Del Barco', url: BASE },
        creator: { '@type': 'Person', name: 'Christian Del Barco' },
        keywords: [...c.industries, ...c.techStack].join(', '),
        about: c.category,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeName,
            item: `${BASE}${localizedPath('/', locale)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: ui.nav.work,
            item: `${BASE}${localizedPath('/trabajo', locale)}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: c.title,
            item: url,
          },
        ],
      },
    ],
  }

  // Mismo layout dedicado para ambos idiomas: cambia el contenido, no la composicion visual.
  if (c.slug === 'wolf') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <WolfCase caseStudy={c} locale={locale} />
      </>
    )
  }

  if (c.slug === 'outbuild') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <OutbuildCase caseStudy={c} locale={locale} />
      </>
    )
  }

  if (c.slug === 'lfi') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LFICase caseStudy={c} locale={locale} />
      </>
    )
  }

  if (c.slug === 'stockai') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <StockAICase caseStudy={c} locale={locale} />
      </>
    )
  }

  if (c.slug === 'astros') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AstrosCase caseStudy={c} locale={locale} />
      </>
    )
  }

  if (c.slug === 'deliverynow') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <DeliveryNowCase caseStudy={c} locale={locale} />
      </>
    )
  }

  if (c.slug === 'plannyme') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PlannyMeCase caseStudy={c} locale={locale} />
      </>
    )
  }

  // Layout genérico de respaldo (todos los slugs actuales tienen layout dedicado).
  return (
    <article style={{ paddingTop: 40 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container" style={{ maxWidth: 920 }}>
        <ViewTransitionLink
          href={localizedPath('/', locale)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: 'var(--text-secondary)',
            marginBottom: 40,
          }}
        >
          <span aria-hidden>←</span>
          {ui.caseChrome.backToHome}
        </ViewTransitionLink>

        <header
          className="responsive-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 200px) minmax(0, 1fr)',
            gap: 48,
            alignItems: 'flex-start',
            paddingBottom: 56,
            borderBottom: '0.5px solid var(--divider)',
          }}
        >
          <div
            style={{
              viewTransitionName: `cover-${c.slug}`,
              width: 200,
              height: 200,
              borderRadius: 28,
              background: `linear-gradient(135deg, ${c.coverGradient[0]}, ${c.coverGradient[1]})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF7F2',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 88,
              letterSpacing: '-0.02em',
              boxShadow: 'var(--shadow-medium)',
            }}
          >
            {c.coverInitial}
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--subtle)',
                marginBottom: 16,
              }}
            >
              {c.yearStart} — {c.yearEnd === 'present' ? ui.caseMeta.present : c.yearEnd} · {c.role}
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(36px, 4.6vw, 64px)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
              }}
            >
              {c.title}
            </h1>
            <p
              style={{
                margin: '20px 0 0',
                maxWidth: '60ch',
                fontSize: 17,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
              }}
            >
              {c.oneLiner}
            </p>

            <dl
              style={{
                marginTop: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 18,
              }}
            >
              <Meta label={ui.caseMeta.company} value={c.company} />
              <Meta label={ui.caseMeta.team} value={c.teamSize} />
              <Meta label={ui.caseMeta.platform} value={c.platforms.join(', ')} />
              <Meta label={ui.caseMeta.stack} value={c.techStack.slice(0, 3).join(', ')} />
            </dl>
          </div>
        </header>

        <Reveal>
          <div style={{ marginTop: 48 }}>
            <Placeholder
              label={`Hero shot — ${c.company}`}
              caption="16:9"
              variant="hero"
            />
          </div>
        </Reveal>

        <Reveal>
          <section style={{ marginTop: 56, marginBottom: 80 }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--subtle)',
                marginBottom: 24,
              }}
            >
              {ui.caseSection.results}
            </p>
            <Stagger
              gap={0.12}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
                gap: 24,
              }}
            >
              {c.outcomes.map((o) => (
                <StaggerItem key={o.label}>
                  <p
                    className="serif"
                    style={{
                      margin: 0,
                      fontSize: 'clamp(40px, 5vw, 72px)',
                      fontStyle: 'italic',
                      fontWeight: 500,
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      color: 'var(--text)',
                    }}
                  >
                    {o.metric}
                  </p>
                  <p
                    style={{
                      margin: '8px 0 0',
                      fontSize: 12,
                      letterSpacing: '0.06em',
                      color: 'var(--muted)',
                    }}
                  >
                    {o.label}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        </Reveal>

        <Section eyebrow={ui.caseSection.context} title={c.company}>
          <p style={paragraphStyle}>{c.context}</p>
        </Section>

        <Section eyebrow={ui.caseSection.challenge} title="">
          <Stagger gap={0.1} style={{ display: 'grid', gap: 18 }}>
            {c.challenge.map((ch) => (
              <StaggerItem key={ch.title} style={{ paddingLeft: 20, borderLeft: '2px solid var(--accent)' }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>{ch.title}</h3>
                <p style={{ ...paragraphStyle, marginTop: 6 }}>{ch.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section eyebrow={ui.caseSection.discovery} title="">
          <p style={paragraphStyle}>{c.research}</p>
        </Section>

        <Section eyebrow={ui.caseSection.decisions} title="">
          <Stagger gap={0.14} style={{ display: 'grid', gap: 28 }}>
            {c.decisions.map((d) => (
              <StaggerItem key={d.title}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: 999,
                    border: '0.5px solid var(--border-strong)',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    marginBottom: 10,
                  }}
                >
                  {d.kind}
                </div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                  {d.title}
                </h3>
                <p style={{ ...paragraphStyle, marginTop: 10 }}>{d.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section eyebrow={ui.caseSection.execution} title="">
          <div style={{ display: 'grid', gap: 56 }}>
            {c.execution.map((ex, i) => {
              const variant = EXECUTION_VARIANTS[i % EXECUTION_VARIANTS.length]
              return (
                <div key={ex.title}>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                    {ex.title}
                  </h3>
                  <p style={{ ...paragraphStyle, marginTop: 10, marginBottom: 24 }}>{ex.body}</p>
                  <div style={variant === 'mobile' ? { display: 'flex', justifyContent: 'center' } : undefined}>
                    <Placeholder label={ex.title} caption="" variant={variant} />
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        <Section eyebrow={ui.caseSection.takeaways} title="">
          <ol style={{ display: 'grid', gap: 14, margin: 0, padding: 0, listStyle: 'none' }}>
            {c.takeaways.map((tk, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  paddingBottom: 14,
                  borderBottom: i < c.takeaways.length - 1 ? '0.5px solid var(--divider)' : 'none',
                }}
              >
                <span
                  className="serif"
                  style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--accent)', flexShrink: 0, marginTop: 4 }}
                >
                  0{i + 1}
                </span>
                <p style={{ margin: 0, fontSize: 17, color: 'var(--text)', lineHeight: 1.55 }}>{tk}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </article>
  )
}

const paragraphStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  maxWidth: '64ch',
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        style={{
          margin: 0,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--subtle)',
          marginBottom: 4,
        }}
      >
        {label}
      </dt>
      <dd style={{ margin: 0, fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{value}</dd>
    </div>
  )
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Reveal>
      <section style={{ paddingBlock: '48px 8px' }}>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
            marginBottom: title ? 12 : 28,
          }}
        >
          {eyebrow}
        </p>
        {title ? (
          <h2
            className="serif"
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 28,
            }}
          >
            {title}
          </h2>
        ) : null}
        {children}
      </section>
    </Reveal>
  )
}
