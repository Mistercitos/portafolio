import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { Placeholder } from '@/app/components/Placeholder'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import type { CaseStudy } from '@/lib/cases'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'

/**
 * Layout dedicado del case study de PlannyMe — exploración personal.
 *
 * PlannyMe es un concepto de planner que rechaza la cultura de la
 * productividad agresiva. El layout se estructura alrededor de su decisión
 * más definitoria: el tono. Cómo le habla el producto a la persona.
 *
 * Sección exclusiva de PlannyMe:
 * - El tono lo cambia todo — lenguaje agresivo vs lenguaje human-first
 */

const ROSE = '#E11D48'
const ROSE_TINT = 'rgba(225, 29, 72, 0.07)'
const ROSE_BORDER = 'rgba(225, 29, 72, 0.30)'

const HARSH_TONE = ['0% completado', 'Racha perdida', 'Vas atrasado']
const CALM_TONE = ['Hoy estuvo tranquilo', 'Mañana es otro día', 'Buen mes, sin apuro']

export function PlannyMeCase({ caseStudy: c, locale = 'es' }: { caseStudy: CaseStudy; locale?: Locale }) {
  const ui = getUI(locale)
  return (
    <div className="container" style={{ maxWidth: 1100, paddingTop: 40, paddingBottom: 40 }}>
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
          Exploración personal · {c.yearStart}
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(64px, 10vw, 132px)',
            fontWeight: 600,
            lineHeight: 0.96,
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
            maxWidth: '22ch',
          }}
        >
          {c.title.split(' — ')[1] ?? c.title}
        </p>

        <p
          style={{
            margin: '28px 0 0',
            maxWidth: '62ch',
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
          <Meta label="Tipo" value="Exploración personal" />
          <Meta label="Rol" value={c.role} />
          <Meta label="Plataforma" value={c.platforms.join(' · ')} />
          <Meta label="Disciplinas" value={c.techStack.join(' · ')} />
        </dl>
      </header>

      {/* Hero shot */}
      <Reveal>
        <Placeholder
          label="PlannyMe — concepto de planner calmado"
          caption="Hero shot · 16:9"
          variant="hero"
        />
      </Reveal>

      {/* ── EL PROBLEMA ────────────────────────────────────────────────── */}
      <Section eyebrow="El problema" title="La productividad convertida en deporte">
        <p style={proseStyle}>{c.context}</p>
      </Section>

      {/* ── DISCOVERY ──────────────────────────────────────────────────── */}
      <Section eyebrow="Discovery" title="Doce personas que abandonaron sus apps">
        <p style={proseStyle}>{c.research}</p>
        <div style={{ marginTop: 32 }}>
          <Placeholder
            label="Síntesis de encuestas · patrones de abandono"
            caption="Process artifacts · 3:2"
            variant="process"
          />
        </div>
      </Section>

      {/* ── EL DESAFÍO ─────────────────────────────────────────────────── */}
      <Section eyebrow={ui.caseSection.challenge} title={locale === 'en' ? 'Three product tensions' : 'Tres tensiones del producto'}>
        <Stagger gap={0.1} style={{ display: 'grid', gap: 18 }}>
          {c.challenge.map((ch) => (
            <StaggerItem
              key={ch.title}
              style={{ paddingLeft: 20, borderLeft: `2px solid ${ROSE}` }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>
                {ch.title}
              </h3>
              <p style={{ ...proseStyle, marginTop: 6 }}>{ch.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── DECISIONES ─────────────────────────────────────────────────── */}
      <Section eyebrow={ui.caseSection.decisions} title={locale === 'en' ? 'Three design decisions' : 'Tres decisiones de diseño'}>
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
              <h3
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 500,
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}
              >
                {d.title}
              </h3>
              <p style={{ ...proseStyle, marginTop: 10 }}>{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── EL TONO LO CAMBIA TODO (signature) ─────────────────────────── */}
      <Section eyebrow="El concepto" title="El tono lo cambia todo">
        <p style={{ ...proseStyle, marginBottom: 36 }}>
          La diferencia entre una app que pesa y una que acompaña casi nunca está en las
          funcionalidades — está en cómo te habla. PlannyMe se define en esa decisión.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {/* Tono agresivo */}
          <div
            style={{
              padding: 26,
              borderRadius: 20,
              border: '0.5px solid var(--border)',
              background: 'var(--surface-subtle)',
            }}
          >
            <p
              style={{
                margin: '0 0 18px',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--subtle)',
                fontWeight: 600,
              }}
            >
              Cómo te habla una app de productividad
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {HARSH_TONE.map((phrase) => (
                <span
                  key={phrase}
                  style={{
                    padding: '11px 14px',
                    borderRadius: 10,
                    background: 'var(--panel)',
                    border: '0.5px solid var(--border)',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>

          {/* Tono PlannyMe */}
          <div
            style={{
              padding: 26,
              borderRadius: 20,
              border: `0.5px solid ${ROSE_BORDER}`,
              background: ROSE_TINT,
            }}
          >
            <p
              style={{
                margin: '0 0 18px',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: ROSE,
                fontWeight: 600,
              }}
            >
              Cómo te habla PlannyMe
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {CALM_TONE.map((phrase) => (
                <span
                  key={phrase}
                  className="serif"
                  style={{
                    padding: '11px 16px',
                    borderRadius: 10,
                    background: 'var(--panel)',
                    border: `0.5px solid ${ROSE_BORDER}`,
                    fontSize: 17,
                    fontStyle: 'italic',
                    color: 'var(--text)',
                  }}
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── EJECUCIÓN ──────────────────────────────────────────────────── */}
      <Section eyebrow={ui.caseSection.execution} title={locale === 'en' ? 'What I designed' : 'Lo que diseñé'}>
        <div style={{ display: 'grid', gap: 56 }}>
          {c.execution.map((ex, i) => (
            <div key={ex.title}>
              <h3
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 500,
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}
              >
                {ex.title}
              </h3>
              <p style={{ ...proseStyle, marginTop: 10, marginBottom: 20 }}>{ex.body}</p>
              <Placeholder
                label={ex.title}
                caption={i === 0 ? 'Flow mobile · 9:19.5' : 'Pantalla · 4:3'}
                variant={i === 0 ? 'mobile' : 'gallery'}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ── RESULTADOS ─────────────────────────────────────────────────── */}
      <OutcomeSection outcomes={c.outcomes} ui={ui} locale={locale} />

      {/* ── APRENDIZAJES ───────────────────────────────────────────────── */}
      <Section eyebrow={ui.caseSection.takeaways} title={locale === 'en' ? 'What I took forward' : 'Lo que me llevo'}>
        <ol style={{ display: 'grid', gap: 14, margin: 0, padding: 0, listStyle: 'none' }}>
          {c.takeaways.map((t, i) => (
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
                style={{
                  fontSize: 14,
                  fontStyle: 'italic',
                  color: ROSE,
                  flexShrink: 0,
                  marginTop: 4,
                }}
              >
                0{i + 1}
              </span>
              <p style={{ margin: 0, fontSize: 17, color: 'var(--text)', lineHeight: 1.55 }}>{t}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CaseCTA ui={ui} locale={locale} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */

function OutcomeSection({ outcomes, ui, locale }: { outcomes: CaseStudy['outcomes']; ui: ReturnType<typeof getUI>; locale: Locale }) {
  return (
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
          {ui.caseSection.results}
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
          {locale === 'en' ? 'How far the exploration went' : 'Hasta dónde llegó la exploración'}
        </h2>
        <Stagger gap={0.1} style={{ display: 'grid', gap: 0 }}>
          {outcomes.map((o, i) => (
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
                  borderBottom: i === outcomes.length - 1 ? '0.5px solid var(--divider)' : 'none',
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
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                  {o.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </Reveal>
  )
}

function CaseCTA({ ui, locale }: { ui: ReturnType<typeof getUI>; locale: Locale }) {
  return (
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

const proseStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  maxWidth: '64ch',
}



