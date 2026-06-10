import Image from 'next/image'
import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'
import type { CaseStudy } from '@/lib/cases'

/**
 * Layout dedicado del case study de Wolf. Bilingüe vía el diccionario WOLF.
 */

// Acento del proyecto — morado. Wolf trabaja en tonos morados y grises.
const PURPLE = '#7C3AED'
const PURPLE_TINT = 'rgba(124, 58, 237, 0.09)'
const PURPLE_BORDER = 'rgba(124, 58, 237, 0.38)'
const WOLF_IMAGE_BASE = '/images/work/wolf'

const WOLF_IMAGES = {
  hero: `${WOLF_IMAGE_BASE}/case-wolf-01-hero-platform-overview.webp`,
  surfaces: {
    JobSeekers: `${WOLF_IMAGE_BASE}/case-wolf-02-jobseekers-mobile-surface.webp`,
    Clients: `${WOLF_IMAGE_BASE}/case-wolf-03-clients-web-surface.webp`,
    Admin: `${WOLF_IMAGE_BASE}/case-wolf-04-admin-console-surface.webp`,
  },
  discovery: `${WOLF_IMAGE_BASE}/case-wolf-05-discovery-user-profiles.webp`,
  designSystem: `${WOLF_IMAGE_BASE}/case-wolf-10-design-system-library.webp`,
  conference: `${WOLF_IMAGE_BASE}/case-wolf-11-conference-material.webp`,
  marketing: `${WOLF_IMAGE_BASE}/case-wolf-12-marketing-user-education.webp`,
}

type Surface = { name: string; kind: string; body: string; accent: string }
type WolfContent = {
  heroShot: string
  surfaces: Surface[]
  aiInputs: string[]
  s1Eyebrow: string
  s1Title: string
  s2Eyebrow: string
  s2Title: string
  s3Eyebrow: string
  s3Title: string
  discoveryShot: string
  jsEyebrow: string
  jsTitle: string
  jsBody: string
  jsScreens: string[]
  decEyebrow: string
  decTitle: string
  aiEyebrow: string
  aiTitle: string
  aiIntro: string
  aiResultBadge: string
  aiResultTitle: string
  aiResultDesc: string
  labBadge: string
  labTitle: string
  labDesc: string
  labCta: string
  sysEyebrow: string
  sysTitle: string
  sysShot: string
  resultsEyebrow: string
  resultsTitle: string
  brandEyebrow: string
  brandTitle: string
  brandShot1: string
  brandShot2: string
  learnEyebrow: string
  learnTitle: string
}

const WOLF: Record<Locale, WolfContent> = {
  es: {
    heroShot: 'Producto Wolf — vista general de la plataforma',
    surfaces: [
      {
        name: 'JobSeekers',
        kind: 'App móvil',
        body: 'Para los trabajadores. Buscan empleos, filtran por ubicación y tipo de trabajo, y postulan en segundos desde el teléfono.',
        accent: '#7C3AED',
      },
      {
        name: 'Clients',
        kind: 'Plataforma web',
        body: 'Para restaurantes, clínicas, hospitales y hoteles. Publican solicitudes de personal por turno, horario y rol.',
        accent: '#9061F9',
      },
      {
        name: 'Admin',
        kind: 'Consola web',
        body: 'Para las staffing companies. Gestionan contrataciones, asignación de turnos y todas las operaciones del marketplace.',
        accent: '#6B7280',
      },
    ],
    aiInputs: ['Prompt de texto', 'Archivo Excel', 'Foto', 'Dictado por voz'],
    s1Eyebrow: 'El producto',
    s1Title: 'Tres superficies, un ecosistema',
    s2Eyebrow: 'El desafío',
    s2Title: 'Tres frentes simultáneos',
    s3Eyebrow: 'Discovery',
    s3Title: 'Research antes de las pantallas',
    discoveryShot: 'Perfiles de usuario · síntesis de entrevistas y encuestas',
    jsEyebrow: 'El proyecto que destrabó el crecimiento',
    jsTitle: 'La app de JobSeekers, de cero a producción',
    jsBody:
      'La diseñé completa: research, flujos de usuario, biblioteca de componentes en Figma y cada pantalla. La entrega fue incremental — una pantalla validada pasaba a desarrollo mientras avanzaba con la siguiente, y acompañé a ingeniería componente por componente para que la implementación no perdiera fidelidad. Cuando salió, las descargas, las postulaciones y los nuevos clientes llegaron solos.',
    jsScreens: ['Búsqueda y filtros', 'Detalle de oferta', 'Postulación', 'Perfil del trabajador'],
    decEyebrow: 'Decisiones',
    decTitle: 'Tres decisiones que definieron el producto',
    aiEyebrow: 'Feature destacada',
    aiTitle: 'Creación de solicitudes con IA',
    aiIntro:
      'Diseñé un creador de solicitudes donde el punto de partida lo elige el cliente. La IA interpreta cualquiera de cuatro formatos de entrada y arma la solicitud completa — horarios, tipos de trabajo y cantidad de trabajadores.',
    aiResultBadge: '✦ Generado por IA',
    aiResultTitle: 'Solicitud estructurada',
    aiResultDesc:
      'Horarios, tipos de trabajo y cantidad de trabajadores — lista para revisar y publicar.',
    labBadge: '✦ Componente en vivo',
    labTitle: 'Prueba el creador multi-input en el Lab',
    labDesc:
      'El patrón de esta feature está vivo y manipulable: voz, texto y datos estructurados convergiendo en un mismo resultado. Pruébalo directamente.',
    labCta: 'Ir al Lab →',
    sysEyebrow: 'Ejecución',
    sysTitle: 'El sistema de componentes',
    sysShot: 'Biblioteca de componentes — Figma',
    resultsEyebrow: 'Resultados',
    resultsTitle: 'El impacto del trabajo',
    brandEyebrow: 'Más allá del producto',
    brandTitle: 'Marca, marketing y conferencias',
    brandShot1: 'Material de conferencia — stands y presentaciones',
    brandShot2: 'Piezas de marketing y educación de usuarios',
    learnEyebrow: 'Aprendizajes',
    learnTitle: 'Lo que me llevo',
  },
  en: {
    heroShot: 'Wolf product — platform overview',
    surfaces: [
      {
        name: 'JobSeekers',
        kind: 'Mobile app',
        body: 'For the workers. They search for jobs, filter by location and job type, and apply in seconds from their phone.',
        accent: '#7C3AED',
      },
      {
        name: 'Clients',
        kind: 'Web platform',
        body: 'For restaurants, clinics, hospitals, and hotels. They post staffing requests by shift, schedule, and role.',
        accent: '#9061F9',
      },
      {
        name: 'Admin',
        kind: 'Web console',
        body: 'For the staffing companies. They manage hiring, shift assignment, and every marketplace operation.',
        accent: '#6B7280',
      },
    ],
    aiInputs: ['Text prompt', 'Excel file', 'Photo', 'Voice dictation'],
    s1Eyebrow: 'The product',
    s1Title: 'Three surfaces, one ecosystem',
    s2Eyebrow: 'The challenge',
    s2Title: 'Three fronts at once',
    s3Eyebrow: 'Discovery',
    s3Title: 'Research before the screens',
    discoveryShot: 'User profiles · synthesis of interviews and surveys',
    jsEyebrow: 'The project that unblocked growth',
    jsTitle: 'The JobSeeker app, from zero to production',
    jsBody:
      'I designed it end to end: research, user flows, the Figma component library, and every screen. Delivery was incremental — a validated screen moved to development while I pushed ahead with the next, and I worked alongside engineering component by component so the implementation never lost fidelity. When it shipped, the downloads, the applications, and the new clients followed on their own.',
    jsScreens: ['Search & filters', 'Job detail', 'Application', 'Worker profile'],
    decEyebrow: 'Decisions',
    decTitle: 'Three decisions that defined the product',
    aiEyebrow: 'Featured feature',
    aiTitle: 'AI-assisted request creation',
    aiIntro:
      'I designed a request builder where the client picks the starting point. The AI interprets any of four input formats and assembles the full request — schedules, job types, and worker counts.',
    aiResultBadge: '✦ AI-generated',
    aiResultTitle: 'Structured request',
    aiResultDesc:
      'Schedules, job types, and worker counts — ready to review and publish.',
    labBadge: '✦ Live component',
    labTitle: 'Try the multi-input builder in the Lab',
    labDesc:
      'The pattern behind this feature is live and interactive: voice, text, and structured data converging on a single result. Try it yourself.',
    labCta: 'Go to the Lab →',
    sysEyebrow: 'Execution',
    sysTitle: 'The component system',
    sysShot: 'Component library — Figma',
    resultsEyebrow: 'Results',
    resultsTitle: 'The impact of the work',
    brandEyebrow: 'Beyond the product',
    brandTitle: 'Brand, marketing, and conferences',
    brandShot1: 'Conference material — booths and presentations',
    brandShot2: 'Marketing pieces and user education',
    learnEyebrow: 'Takeaways',
    learnTitle: 'What I take away',
  },
}

export function WolfCase({ caseStudy: c, locale }: { caseStudy: CaseStudy; locale: Locale }) {
  const t = WOLF[locale]
  const ui = getUI(locale)
  const yearEnd = c.yearEnd === 'present' ? ui.caseMeta.present : c.yearEnd
  const impactCopy =
    locale === 'en'
      ? {
          eyebrow: 'Impact snapshot',
          title: 'The value before the process',
          body: 'A quick read of the scale and business context before the full case study.',
        }
      : {
          eyebrow: 'Impacto rápido',
          title: 'El valor antes del proceso',
          body: 'Una lectura rápida de escala y contexto de negocio antes de entrar al case completo.',
        }

  return (
    <div className="container" style={{ maxWidth: 1100, paddingTop: 40, paddingBottom: 40 }}>
      {/* Back link */}
      <ViewTransitionLink
        href={localizedPath('/trabajo', locale)}
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
        {ui.caseChrome.backToWork}
      </ViewTransitionLink>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <header style={{ paddingBottom: 64, maxWidth: 880 }}>
        <div
          style={{
            viewTransitionName: `cover-${c.slug}`,
            width: 128,
            height: 128,
            borderRadius: 26,
            background: `linear-gradient(135deg, ${c.coverGradient[0]}, ${c.coverGradient[1]})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF7F2',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 60,
            letterSpacing: '-0.02em',
            boxShadow: 'var(--shadow-medium)',
            marginBottom: 36,
          }}
        >
          {c.coverInitial}
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
            marginBottom: 20,
          }}
        >
          {c.yearStart} — {yearEnd} · {c.role}
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(72px, 11vw, 148px)',
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: '-0.045em',
            color: 'var(--text)',
          }}
        >
          {c.title.split(' — ')[0]}
        </h1>

        <p
          className="serif"
          style={{
            margin: '24px 0 0',
            fontSize: 'clamp(24px, 3vw, 40px)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.22,
            letterSpacing: '-0.015em',
            color: 'var(--text)',
            maxWidth: '20ch',
          }}
        >
          {c.title.split(' — ')[1] ?? c.title}
        </p>

        <p
          style={{
            margin: '28px 0 0',
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
            marginTop: 44,
            display: 'grid',
            gap: 0,
            borderBottom: '0.5px solid var(--divider)',
          }}
        >
          <Meta label={ui.caseMeta.company} value={c.company} />
          <Meta label={ui.caseMeta.team} value={c.teamSize} />
          <Meta label={ui.caseMeta.platform} value={c.platforms.join(' · ')} />
          <Meta label={ui.caseMeta.stack} value={c.techStack.join(' · ')} />
        </dl>
      </header>

      {/* Hero shot */}
      <Reveal>
        <CaseImage src={WOLF_IMAGES.hero} alt={t.heroShot} ratio="16 / 9" variant="hero" priority />
      </Reveal>

      <Reveal>
        <section
          style={{
            marginTop: 32,
            padding: '32px',
            borderRadius: 24,
            border: `0.5px solid ${PURPLE_BORDER}`,
            background: PURPLE_TINT,
          }}
          className="responsive-section"
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: PURPLE,
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            {impactCopy.eyebrow}
          </p>
          <div
            className="responsive-category-header"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.35fr)',
              gap: 36,
              alignItems: 'start',
            }}
          >
            <div>
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
                }}
              >
                {impactCopy.title}
              </h2>
              <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {impactCopy.body}
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 18,
              }}
            >
              {c.outcomes.slice(0, 4).map((o) => (
                <div key={o.label}>
                  <p
                    className="serif"
                    style={{
                      margin: 0,
                      fontSize: 'clamp(30px, 4vw, 48px)',
                      fontStyle: 'italic',
                      fontWeight: 500,
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      color: PURPLE,
                    }}
                  >
                    {o.metric}
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.45, color: 'var(--text-secondary)' }}>
                    {o.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── TRES SUPERFICIES ───────────────────────────────────────────── */}
      <Section eyebrow={t.s1Eyebrow} title={t.s1Title}>
        <p style={{ ...proseStyle, marginBottom: 32 }}>{c.context}</p>
        <Stagger gap={0.1} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="responsive-grid-2col">
          {t.surfaces.map((s) => (
            <StaggerItem key={s.name}>
              <div
                style={{
                  borderRadius: 18,
                  border: '0.5px solid var(--border)',
                  background: 'var(--panel)',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <CaseImage
                  src={WOLF_IMAGES.surfaces[s.name as keyof typeof WOLF_IMAGES.surfaces]}
                  alt={`${s.name} — ${s.kind}`}
                  ratio="4 / 3"
                  style={{ border: 'none', borderRadius: 0 }}
                />
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span
                      aria-hidden
                      style={{ width: 8, height: 8, borderRadius: '50%', background: s.accent }}
                    />
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: 'var(--text)' }}>
                      {s.name}
                    </p>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── EL DESAFÍO ─────────────────────────────────────────────────── */}
      <Section eyebrow={t.s2Eyebrow} title={t.s2Title}>
        <Stagger gap={0.1} style={{ display: 'grid', gap: 18 }}>
          {c.challenge.map((ch) => (
            <StaggerItem key={ch.title} style={{ paddingLeft: 20, borderLeft: `2px solid ${PURPLE}` }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>{ch.title}</h3>
              <p style={{ ...proseStyle, marginTop: 6 }}>{ch.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── DISCOVERY ──────────────────────────────────────────────────── */}
      <Section eyebrow={t.s3Eyebrow} title={t.s3Title}>
        <p style={proseStyle}>{c.research}</p>
        <div style={{ marginTop: 32 }}>
          <CaseImage src={WOLF_IMAGES.discovery} alt={t.discoveryShot} ratio="3 / 2" />
        </div>
      </Section>

      {/* ── APP DE JOBSEEKERS (protagonista) ───────────────────────────── */}
      <Reveal>
        <section
          style={{
            marginTop: 64,
            padding: '48px 40px',
            borderRadius: 28,
            background: 'var(--surface-subtle)',
            border: '0.5px solid var(--border)',
          }}
          className="responsive-section"
        >
          <p
            className="serif"
            style={{
              margin: 0,
              fontSize: 14,
              fontStyle: 'italic',
              color: PURPLE,
              marginBottom: 14,
              letterSpacing: '0.04em',
            }}
          >
            {t.jsEyebrow}
          </p>
          <h2
            className="serif"
            style={{
              margin: 0,
              fontSize: 'clamp(30px, 3.8vw, 48px)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              maxWidth: '20ch',
            }}
          >
            {t.jsTitle}
          </h2>
          <p style={{ ...proseStyle, marginTop: 18, marginBottom: 36 }}>{t.jsBody}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}
          >
            {t.jsScreens.map((screen, i) => (
              <div
                key={screen}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  border: '0.5px solid var(--border)',
                  background: 'var(--panel)',
                }}
              >
                <span
                  className="serif"
                  style={{
                    display: 'block',
                    marginBottom: 10,
                    fontSize: 13,
                    fontStyle: 'italic',
                    color: PURPLE,
                  }}
                >
                  0{i + 1}
                </span>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>
                  {screen}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── DECISIONES ─────────────────────────────────────────────────── */}
      <Section eyebrow={t.decEyebrow} title={t.decTitle}>
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
              <p style={{ ...proseStyle, marginTop: 10 }}>{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── CREADOR CON IA ─────────────────────────────────────────────── */}
      <Section eyebrow={t.aiEyebrow} title={t.aiTitle}>
        <p style={{ ...proseStyle, marginBottom: 32 }}>{t.aiIntro}</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 24,
            alignItems: 'center',
            marginBottom: 32,
          }}
          className="responsive-grid-2col"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {t.aiInputs.map((label, i) => (
              <div
                key={label}
                style={{
                  padding: '16px 14px',
                  borderRadius: 14,
                  border: '0.5px solid var(--border)',
                  background: 'var(--panel)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <InputIcon kind={['text', 'sheet', 'photo', 'voice'][i]} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{label}</span>
              </div>
            ))}
          </div>

          <div
            aria-hidden
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: PURPLE,
              fontSize: 28,
            }}
          >
            →
          </div>

          <div
            style={{
              padding: 24,
              borderRadius: 18,
              border: `0.5px solid ${PURPLE_BORDER}`,
              background: PURPLE_TINT,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: PURPLE,
                marginBottom: 8,
              }}
            >
              {t.aiResultBadge}
            </p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
              {t.aiResultTitle}
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {t.aiResultDesc}
            </p>
          </div>
        </div>
        <ViewTransitionLink
          href={localizedPath('/lab', locale)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            padding: '28px 32px',
            borderRadius: 20,
            background: PURPLE_TINT,
            border: `0.5px solid ${PURPLE_BORDER}`,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '52ch' }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: PURPLE,
                marginBottom: 10,
              }}
            >
              {t.labBadge}
            </p>
            <p
              className="serif"
              style={{
                margin: 0,
                fontSize: 22,
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
              }}
            >
              {t.labTitle}
            </p>
            <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {t.labDesc}
            </p>
          </div>
          <span
            aria-hidden
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 500,
              color: PURPLE,
              whiteSpace: 'nowrap',
            }}
          >
            {t.labCta}
          </span>
        </ViewTransitionLink>
      </Section>

      {/* ── SISTEMA DE COMPONENTES ─────────────────────────────────────── */}
      <Section eyebrow={t.sysEyebrow} title={t.sysTitle}>
        <p style={{ ...proseStyle, marginBottom: 28 }}>{c.execution[1]?.body}</p>
        <CaseImage src={WOLF_IMAGES.designSystem} alt={t.sysShot} ratio="4 / 3" />
      </Section>

      {/* ── RESULTADOS ─────────────────────────────────────────────────── */}
      <Reveal>
        <section style={{ marginTop: 96, marginBottom: 8 }} className="responsive-section">
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 12,
            }}
          >
            {t.resultsEyebrow}
          </p>
          <h2
            className="serif"
            style={{
              margin: '0 0 40px',
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            {t.resultsTitle}
          </h2>
          <Stagger gap={0.1} style={{ display: 'grid', gap: 0 }}>
            {c.outcomes.map((o, i) => (
              <StaggerItem key={o.label}>
                <div
                  className="responsive-category-header"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
                    gap: 40,
                    alignItems: 'center',
                    paddingBlock: 36,
                    borderTop: '0.5px solid var(--divider)',
                    borderBottom:
                      i === c.outcomes.length - 1 ? '0.5px solid var(--divider)' : 'none',
                  }}
                >
                  <p
                    className="serif"
                    style={{
                      margin: 0,
                      fontSize: 'clamp(32px, 4vw, 52px)',
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
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.5,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {o.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      {/* ── MARCA Y CONFERENCIAS ───────────────────────────────────────── */}
      <Section eyebrow={t.brandEyebrow} title={t.brandTitle}>
        <p style={{ ...proseStyle, marginBottom: 28 }}>{c.execution[3]?.body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <CaseImage src={WOLF_IMAGES.conference} alt={t.brandShot1} ratio="4 / 3" />
          <CaseImage src={WOLF_IMAGES.marketing} alt={t.brandShot2} ratio="4 / 3" />
        </div>
      </Section>

      {/* ── APRENDIZAJES ───────────────────────────────────────────────── */}
      <Section eyebrow={t.learnEyebrow} title={t.learnTitle}>
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
                style={{ fontSize: 14, fontStyle: 'italic', color: PURPLE, flexShrink: 0, marginTop: 4 }}
              >
                0{i + 1}
              </span>
              <p style={{ margin: 0, fontSize: 17, color: 'var(--text)', lineHeight: 1.55 }}>{tk}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <Reveal>
        <div
          style={{
            marginTop: 64,
            paddingTop: 40,
            borderTop: '0.5px solid var(--divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <p
            className="serif"
            style={{
              margin: 0,
              fontSize: 22,
              fontStyle: 'italic',
              fontWeight: 500,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            {ui.caseChrome.nextProject}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ViewTransitionLink
              href={localizedPath('/trabajo', locale)}
              style={{
                padding: '12px 22px',
                borderRadius: 999,
                border: '0.5px solid var(--border-strong)',
                color: 'var(--text)',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {ui.caseChrome.seeAllWork}
            </ViewTransitionLink>
            <ViewTransitionLink
              href={localizedPath('/contact', locale)}
              style={{
                padding: '12px 22px',
                borderRadius: 999,
                background: 'var(--accent)',
                color: 'var(--text-inverse)',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {ui.caseChrome.letsTalk}
            </ViewTransitionLink>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */

function CaseImage({
  src,
  alt,
  ratio,
  variant = 'gallery',
  priority = false,
  style,
}: {
  src: string
  alt: string
  ratio: string
  variant?: 'hero' | 'gallery' | 'mobile'
  priority?: boolean
  style?: React.CSSProperties
}) {
  const isMobile = variant === 'mobile'

  return (
    <figure
      style={{
        margin: 0,
        width: isMobile ? 'fit-content' : '100%',
        maxWidth: isMobile ? 240 : '100%',
        aspectRatio: ratio,
        borderRadius: variant === 'hero' ? 24 : 16,
        border: '0.5px solid var(--border)',
        background: 'var(--surface-subtle)',
        overflow: 'hidden',
        position: 'relative',
        justifySelf: isMobile ? 'center' : undefined,
        boxShadow: variant === 'hero' ? 'var(--shadow-soft)' : 'none',
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={isMobile ? '240px' : '(max-width: 720px) calc(100vw - 32px), 1100px'}
        style={{ objectFit: 'cover' }}
      />
    </figure>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '130px minmax(0, 1fr)',
        gap: 24,
        paddingBlock: 16,
        borderTop: '0.5px solid var(--divider)',
        alignItems: 'baseline',
      }}
    >
      <dt
        style={{
          margin: 0,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--subtle)',
        }}
      >
        {label}
      </dt>
      <dd style={{ margin: 0, fontSize: 15, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>
        {value}
      </dd>
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
      <section style={{ paddingBlock: '80px 8px' }} className="responsive-section">
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </p>
        <h2
          className="serif"
          style={{
            margin: '0 0 28px',
            fontSize: 'clamp(28px, 3.2vw, 40px)',
            fontWeight: 500,
            fontStyle: 'italic',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  )
}

function InputIcon({ kind }: { kind: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { color: PURPLE },
    'aria-hidden': true,
  }
  switch (kind) {
    case 'text':
      return (
        <svg {...common}>
          <path d="M4 7V5h16v2M9 19h6M12 5v14" />
        </svg>
      )
    case 'sheet':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
      )
    case 'photo':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      )
    case 'voice':
      return (
        <svg {...common}>
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      )
    default:
      return null
  }
}

const proseStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  maxWidth: '64ch',
}
