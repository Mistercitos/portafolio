import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { Placeholder } from '@/app/components/Placeholder'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import type { CaseStudy } from '@/lib/cases'

/**
 * Layout dedicado del case study de DeliveryNow — exploración personal.
 *
 * DeliveryNow es un concepto de delivery sostenible. El layout se estructura
 * alrededor de su movimiento central: invertir el default. La sostenibilidad
 * deja de ser un opt-in escondido para volverse el estado por defecto.
 *
 * Sección exclusiva de DeliveryNow:
 * - La inversión del default — opt-in escondido vs opt-out por defecto
 */

const GREEN = '#059669'
const GREEN_TINT = 'rgba(5, 150, 105, 0.09)'
const GREEN_BORDER = 'rgba(5, 150, 105, 0.34)'

export function DeliveryNowCase({ caseStudy: c }: { caseStudy: CaseStudy }) {
  return (
    <div className="container" style={{ maxWidth: 1100, paddingTop: 40, paddingBottom: 40 }}>
      <ViewTransitionLink
        href="/trabajo"
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
        Volver a todo el trabajo
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
            fontSize: 'clamp(56px, 8.5vw, 116px)',
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: '-0.04em',
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
          label="DeliveryNow — concepto de delivery sostenible"
          caption="Hero shot · 16:9"
          variant="hero"
        />
      </Reveal>

      {/* ── EL PROBLEMA ────────────────────────────────────────────────── */}
      <Section eyebrow="El problema" title="Pedir comida no debería costarle al planeta">
        <p style={proseStyle}>{c.context}</p>
      </Section>

      {/* ── DISCOVERY ──────────────────────────────────────────────────── */}
      <Section eyebrow="Discovery" title="Lo que hacen las apps que ya existen">
        <p style={proseStyle}>{c.research}</p>
        <div style={{ marginTop: 32 }}>
          <Placeholder
            label="Análisis competitivo · 5 apps de delivery"
            caption="Process artifacts · 3:2"
            variant="process"
          />
        </div>
      </Section>

      {/* ── EL DESAFÍO ─────────────────────────────────────────────────── */}
      <Section eyebrow="El desafío" title="Tres tensiones del producto">
        <Stagger gap={0.1} style={{ display: 'grid', gap: 18 }}>
          {c.challenge.map((ch) => (
            <StaggerItem
              key={ch.title}
              style={{ paddingLeft: 20, borderLeft: `2px solid ${GREEN}` }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>
                {ch.title}
              </h3>
              <p style={{ ...proseStyle, marginTop: 6 }}>{ch.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── LA INVERSIÓN DEL DEFAULT (signature) ───────────────────────── */}
      <Section eyebrow="El concepto" title="Invertir el default">
        <p style={{ ...proseStyle, marginBottom: 36 }}>
          La opción sostenible siempre existió — escondida, opcional, presentada como un esfuerzo
          extra. DeliveryNow no agrega una opción nueva: cambia cuál es el punto de partida.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          <DefaultCard
            label="El patrón actual · opt-in"
            checked={false}
            option="Sin cubiertos descartables"
            body="Escondido en el checkout y presentado como un esfuerzo extra. Casi nadie lo activa."
          />
          <DefaultCard
            label="DeliveryNow · por defecto"
            checked
            option="Sin cubiertos descartables"
            body="Viene activado. Si los necesitas, los pides. Invertir el default cambia la base del comportamiento."
          />
        </div>
      </Section>

      {/* ── DECISIONES ─────────────────────────────────────────────────── */}
      <Section eyebrow="Decisiones" title="Tres decisiones de diseño">
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

      {/* ── EJECUCIÓN ──────────────────────────────────────────────────── */}
      <Section eyebrow="Ejecución" title="Lo que diseñé">
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
                caption={i === 2 ? 'Flow mobile · 9:19.5' : 'Pantalla · 4:3'}
                variant={i === 2 ? 'mobile' : 'gallery'}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ── RESULTADOS ─────────────────────────────────────────────────── */}
      <OutcomeSection outcomes={c.outcomes} />

      {/* ── APRENDIZAJES ───────────────────────────────────────────────── */}
      <Section eyebrow="Aprendizajes" title="Lo que me llevo">
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
                  color: GREEN,
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

      <CaseCTA />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */

function DefaultCard({
  label,
  checked,
  option,
  body,
}: {
  label: string
  checked: boolean
  option: string
  body: string
}) {
  return (
    <div
      style={{
        height: '100%',
        padding: 26,
        borderRadius: 20,
        border: checked ? `0.5px solid ${GREEN_BORDER}` : '0.5px solid var(--border)',
        background: checked ? GREEN_TINT : 'var(--surface-subtle)',
      }}
    >
      <p
        style={{
          margin: '0 0 18px',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: checked ? GREEN : 'var(--subtle)',
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span
          aria-hidden
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: checked ? GREEN : 'transparent',
            border: checked ? `1px solid ${GREEN}` : '1.5px solid var(--border-strong)',
            color: '#FAF7F2',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {checked ? '✓' : ''}
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--text)',
          }}
        >
          {option}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
        {body}
      </p>
    </div>
  )
}

function OutcomeSection({ outcomes }: { outcomes: CaseStudy['outcomes'] }) {
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
          Resultados
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
          Hasta dónde llegó la exploración
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

function CaseCTA() {
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
          ¿Seguimos con otro proyecto?
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ViewTransitionLink
            href="/trabajo"
            style={{
              padding: '12px 22px',
              borderRadius: 999,
              border: '0.5px solid var(--border-strong)',
              color: 'var(--text)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Ver todo el trabajo
          </ViewTransitionLink>
          <ViewTransitionLink
            href="/contact"
            style={{
              padding: '12px 22px',
              borderRadius: 999,
              background: 'var(--accent)',
              color: 'var(--text-inverse)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Hablemos
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
