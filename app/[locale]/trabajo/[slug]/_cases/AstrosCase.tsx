import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { Placeholder } from '@/app/components/Placeholder'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import type { CaseStudy } from '@/lib/cases'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'

/**
 * Layout dedicado del case study de Astros â€” exploraciÃ³n personal.
 *
 * Astros es un concepto de travel planning con una capa social. El layout se
 * estructura alrededor de su tesis: centralizar un plan que hoy vive disperso,
 * y servir a dos roles â€”el que organiza y el que sigueâ€” con dos vistas.
 *
 * Secciones exclusivas de Astros:
 * - El problema â€” las apps dispersas convergiendo en una sola
 * - Dos vistas â€” Mi vista / Plan del grupo
 */

const VIOLET = '#5B21B6'
const VIOLET_TINT = 'rgba(91, 33, 182, 0.09)'
const VIOLET_BORDER = 'rgba(91, 33, 182, 0.34)'

const SCATTERED = ['Maps', 'Notes', 'WhatsApp', 'Booking', 'Excel']

const VIEWS = [
  {
    name: 'Mi vista',
    tag: 'Individual Â· hoy',
    body: 'Solo el bloque del dÃ­a: lo que tengo que hacer ahora, sin el ruido del plan completo.',
  },
  {
    name: 'Plan del grupo',
    tag: 'Compartido Â· completo',
    body: 'El itinerario entero, los gastos y las decisiones tomadas â€” el estado real del viaje para todos.',
  },
]

export function AstrosCase({ caseStudy: c, locale = 'es' }: { caseStudy: CaseStudy; locale?: Locale }) {
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
        <span aria-hidden>â†</span>
        {ui.caseChrome.backToWork}
      </ViewTransitionLink>

      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
          ExploraciÃ³n personal Â· {c.yearStart}
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
          {c.title.split(' â€” ')[0]}
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
          {c.title.split(' â€” ')[1] ?? c.title}
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
          <Meta label="Tipo" value="ExploraciÃ³n personal" />
          <Meta label="Rol" value={c.role} />
          <Meta label="Plataforma" value={c.platforms.join(' Â· ')} />
          <Meta label="Disciplinas" value={c.techStack.join(' Â· ')} />
        </dl>
      </header>

      {/* Hero shot */}
      <Reveal>
        <Placeholder
          label="Astros â€” concepto de travel planning"
          caption="Hero shot Â· 16:9"
          variant="hero"
        />
      </Reveal>

      {/* â”€â”€ EL PROBLEMA (signature) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <Section eyebrow="El problema" title="Un plan que vive en mil lugares">
        <p style={{ ...proseStyle, marginBottom: 36 }}>{c.context}</p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            padding: '28px 26px',
            borderRadius: 20,
            border: '0.5px solid var(--border)',
            background: 'var(--surface-subtle)',
          }}
        >
          <div style={{ flex: '1 1 240px' }}>
            <p
              style={{
                margin: '0 0 12px',
                fontSize: 11,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: 'var(--subtle)',
                fontWeight: 600,
              }}
            >
              Antes Â· disperso
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SCATTERED.map((app) => (
                <span
                  key={app}
                  style={{
                    padding: '8px 13px',
                    borderRadius: 10,
                    background: 'var(--panel)',
                    border: '0.5px solid var(--border)',
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <span aria-hidden style={{ fontSize: 26, color: VIOLET }}>
            â†’
          </span>

          <div style={{ flex: '0 0 auto' }}>
            <p
              style={{
                margin: '0 0 12px',
                fontSize: 11,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: VIOLET,
                fontWeight: 600,
              }}
            >
              DespuÃ©s Â· un solo lugar
            </p>
            <span
              style={{
                display: 'inline-block',
                padding: '14px 24px',
                borderRadius: 12,
                background: VIOLET_TINT,
                border: `1px solid ${VIOLET_BORDER}`,
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              Astros
            </span>
          </div>
        </div>
      </Section>

      {/* â”€â”€ DISCOVERY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <Section eyebrow="Discovery" title="Ocho viajeros, un mismo dolor">
        <p style={proseStyle}>{c.research}</p>
        <div style={{ marginTop: 32 }}>
          <Placeholder
            label="SÃ­ntesis de entrevistas Â· journey del viaje grupal"
            caption="Process artifacts Â· 3:2"
            variant="process"
          />
        </div>
      </Section>

      {/* â”€â”€ EL DESAFÃO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <Section eyebrow={ui.caseSection.challenge} title={locale === 'en' ? 'Three product tensions' : 'Tres tensiones del producto'}>
        <Stagger gap={0.1} style={{ display: 'grid', gap: 18 }}>
          {c.challenge.map((ch) => (
            <StaggerItem
              key={ch.title}
              style={{ paddingLeft: 20, borderLeft: `2px solid ${VIOLET}` }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>
                {ch.title}
              </h3>
              <p style={{ ...proseStyle, marginTop: 6 }}>{ch.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* â”€â”€ DECISIONES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      {/* â”€â”€ DOS VISTAS (signature) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <Section eyebrow="El concepto" title="Una app, dos vistas">
        <p style={{ ...proseStyle, marginBottom: 36 }}>
          El grupo siempre tiene un organizador y varios que solo quieren seguir. En vez de obligar
          a todos a configurar, Astros separa el producto en dos vistas explÃ­citas.
        </p>
        <Stagger
          gap={0.12}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {VIEWS.map((v) => (
            <StaggerItem key={v.name}>
              <div
                style={{
                  height: '100%',
                  padding: 26,
                  borderRadius: 20,
                  border: `0.5px solid ${VIOLET_BORDER}`,
                  background: VIOLET_TINT,
                }}
              >
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: VIOLET,
                    fontWeight: 600,
                  }}
                >
                  {v.tag}
                </p>
                <h3
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontStyle: 'italic',
                    fontWeight: 500,
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {v.name}
                </h3>
                <p
                  style={{
                    margin: '12px 0 0',
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {v.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* â”€â”€ EJECUCIÃ“N â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                caption={i === 1 ? 'Flow mobile Â· 9:19.5' : 'Pantalla Â· 4:3'}
                variant={i === 1 ? 'mobile' : 'gallery'}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* â”€â”€ RESULTADOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <OutcomeSection outcomes={c.outcomes} ui={ui} locale={locale} />

      {/* â”€â”€ APRENDIZAJES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                  color: VIOLET,
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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



