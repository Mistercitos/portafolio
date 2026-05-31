import type { Metadata } from 'next'
import { CaseStudyCard } from '@/app/components/CaseStudyCard'
import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import { getCases, getCasesByKind, type CaseStudy } from '@/lib/cases'
import { localizedPath, toLocale, type Locale } from '@/lib/i18n'

type WorkContent = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  intro: string
  statProjects: string
  statProfessional: string
  statChallenges: string
  statExplorations: string
  cat01Eyebrow: string
  cat01Title: string
  cat01Subtitle: string
  cat02Eyebrow: string
  cat02Title: string
  cat02Subtitle: string
  cat03Eyebrow: string
  cat03Title: string
  cat03Subtitle: string
  projectOne: string
  projectMany: string
  blogEyebrow: string
  blogTitle: string
  blogCta: string
}

const WORK: Record<Locale, WorkContent> = {
  es: {
    metaTitle: 'Trabajo',
    metaDescription:
      'Case studies de mi trabajo en SaaS, B2B y marketplaces: Wolf, Outbuild, LFI, StockAI y exploraciones personales. Con métricas reales y las decisiones de diseño detrás de cada uno.',
    eyebrow: 'Trabajo',
    title: 'Trabajo que llega a producción en sistemas complejos.',
    intro:
      'Cada case cuenta el contexto, las decisiones y los resultados, con números reales. Algunas pantallas están adaptadas por confidencialidad; el proceso y los resultados son los originales.',
    statProjects: 'Proyectos',
    statProfessional: 'Profesionales',
    statChallenges: 'Design challenges',
    statExplorations: 'Exploraciones',
    cat01Eyebrow: 'Trabajo profesional',
    cat01Title: 'Donde trabajé.',
    cat01Subtitle:
      'Marketplaces, B2B SaaS y mi paso por agencia. Proyectos pagados, con equipos y clientes de verdad detrás.',
    cat02Eyebrow: 'Design challenges',
    cat02Title: 'Briefs con plazo fijo.',
    cat02Subtitle:
      'Ejercicios de diseño con plazo fijo. Muestran cómo trabajo bajo presión y cómo priorizo cuando no alcanza para pulir todo.',
    cat03Eyebrow: 'Exploraciones personales',
    cat03Title: 'Hipótesis sin cliente.',
    cat03Subtitle:
      'Conceptos que arranqué por mi cuenta para probar ideas, sin presión comercial. Los validé con entrevistas reales, y los muestro como lo que son: exploraciones.',
    projectOne: 'proyecto',
    projectMany: 'proyectos',
    blogEyebrow: '¿Quieres ver cómo pienso?',
    blogTitle: 'Léeme antes de verme.',
    blogCta: 'Ver mis posts',
  },
  en: {
    metaTitle: 'Work',
    metaDescription:
      'Case studies from my work in SaaS, B2B, and marketplaces: Wolf, Outbuild, LFI, StockAI, and personal explorations. Real metrics and the design decisions behind each one.',
    eyebrow: 'Work',
    title: 'Work that ships to production in complex systems.',
    intro:
      'Every case covers the context, the decisions, and the outcomes, with real numbers. Some screens are adapted for confidentiality; the process and the results are the originals.',
    statProjects: 'Projects',
    statProfessional: 'Professional',
    statChallenges: 'Design challenges',
    statExplorations: 'Explorations',
    cat01Eyebrow: 'Professional work',
    cat01Title: 'Where I worked.',
    cat01Subtitle:
      'Marketplaces, B2B SaaS, and my agency years. Paid projects, with real teams and clients behind them.',
    cat02Eyebrow: 'Design challenges',
    cat02Title: 'Time-boxed briefs.',
    cat02Subtitle:
      "Design exercises with a fixed deadline. They show how I work under pressure and how I prioritize when there isn't time to polish everything.",
    cat03Eyebrow: 'Personal explorations',
    cat03Title: 'Hypotheses with no client.',
    cat03Subtitle:
      'Concepts I started on my own to test ideas, with no commercial pressure. I validated them with real interviews, and I show them for what they are: explorations.',
    projectOne: 'project',
    projectMany: 'projects',
    blogEyebrow: 'Want to see how I think?',
    blogTitle: 'Read me before you meet me.',
    blogCta: 'Read my posts',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = WORK[locale]
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: localizedPath('/trabajo', locale),
      languages: { es: '/trabajo', en: '/en/trabajo', 'x-default': '/trabajo' },
    },
  }
}

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await params).locale)
  const t = WORK[locale]
  const professional = getCasesByKind('professional', locale)
  const challenges = getCasesByKind('challenge', locale)
  const personal = getCasesByKind('personal', locale)
  const total = getCases(locale).length

  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 1080 }}>
      <Reveal>
        <header style={{ marginBottom: 24, maxWidth: '64ch' }}>
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
              fontSize: 16,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
            }}
          >
            {t.intro}
          </p>
        </header>
      </Reveal>

      {/* Mini-overview con stats narrativos */}
      <Reveal delay={0.1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            paddingBlock: 32,
            marginBottom: 80,
            borderBlock: '0.5px solid var(--divider)',
          }}
        >
          <OverviewStat label={t.statProjects} value={total.toString()} />
          <OverviewStat label={t.statProfessional} value={professional.length.toString()} />
          <OverviewStat label={t.statChallenges} value={challenges.length.toString()} />
          <OverviewStat label={t.statExplorations} value={personal.length.toString()} />
        </div>
      </Reveal>

      {/* 01 — Professional work */}
      <CategorySection
        number="01"
        eyebrow={t.cat01Eyebrow}
        title={t.cat01Title}
        subtitle={t.cat01Subtitle}
        cases={professional}
        locale={locale}
        projectOne={t.projectOne}
        projectMany={t.projectMany}
      />

      {/* 02 — Recent design challenges */}
      <CategorySection
        number="02"
        eyebrow={t.cat02Eyebrow}
        title={t.cat02Title}
        subtitle={t.cat02Subtitle}
        cases={challenges}
        locale={locale}
        projectOne={t.projectOne}
        projectMany={t.projectMany}
      />

      {/* 03 — Personal explorations */}
      <CategorySection
        number="03"
        eyebrow={t.cat03Eyebrow}
        title={t.cat03Title}
        subtitle={t.cat03Subtitle}
        cases={personal}
        locale={locale}
        projectOne={t.projectOne}
        projectMany={t.projectMany}
      />

      {/* CTA hacia el blog */}
      <Reveal>
        <div
          style={{
            marginTop: 56,
            paddingTop: 40,
            borderTop: '0.5px solid var(--divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--subtle)',
              }}
            >
              {t.blogEyebrow}
            </p>
            <p
              className="serif"
              style={{
                margin: '8px 0 0',
                fontSize: 22,
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
              }}
            >
              {t.blogTitle}
            </p>
          </div>
          <ViewTransitionLink
            href={localizedPath('/escribo', locale)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 22px',
              borderRadius: 999,
              border: '0.5px solid var(--border-strong)',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t.blogCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </ViewTransitionLink>
        </div>
      </Reveal>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* OverviewStat — número grande + label                                     */
/* ─────────────────────────────────────────────────────────────────────── */

function OverviewStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="serif"
        style={{
          margin: 0,
          fontSize: 'clamp(36px, 4.4vw, 56px)',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
        }}
      >
        {value}
      </p>
      <p
        style={{
          margin: '6px 0 0',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        {label}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* CategorySection — header de categoría + grid de cases                    */
/* ─────────────────────────────────────────────────────────────────────── */

function CategorySection({
  number,
  eyebrow,
  title,
  subtitle,
  cases,
  locale,
  projectOne,
  projectMany,
}: {
  number: string
  eyebrow: string
  title: string
  subtitle: string
  cases: CaseStudy[]
  locale: Locale
  projectOne: string
  projectMany: string
}) {
  if (cases.length === 0) return null

  return (
    <section style={{ marginBottom: 96 }}>
      <Reveal>
        <header
          className="responsive-category-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
            gap: 48,
            alignItems: 'flex-start',
            marginBottom: 40,
            paddingTop: 24,
            borderTop: '0.5px solid var(--divider)',
          }}
        >
          <div>
            <p
              className="serif"
              style={{
                margin: 0,
                fontSize: 14,
                fontStyle: 'italic',
                color: 'var(--accent)',
                marginBottom: 14,
                letterSpacing: '0.04em',
              }}
            >
              {number} · {eyebrow}
            </p>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 3.8vw, 52px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              {title}
            </h2>
          </div>
          <div style={{ paddingTop: 10 }}>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '52ch',
              }}
            >
              {subtitle}
            </p>
            <p
              style={{
                margin: '14px 0 0',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--subtle)',
              }}
            >
              {cases.length} {cases.length === 1 ? projectOne : projectMany}
            </p>
          </div>
        </header>
      </Reveal>

      <Stagger gap={0.08} style={{ display: 'grid', gap: 16 }}>
        {cases.map((c) => (
          <StaggerItem key={c.slug}>
            <CaseStudyCard caseStudy={c} locale={locale} size="lg" />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
