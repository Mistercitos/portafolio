import Image from 'next/image'
import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import type { CaseStudy } from '@/lib/cases'

/**
 * Layout dedicado del case study de StockAI.
 *
 * StockAI es un design challenge acotado en tiempo, no un trabajo profesional.
 * El layout se estructura alrededor de eso: el cambio de paradigma de un
 * formulario manual a un flujo con IA, la auditoría que lo originó, las dos
 * personas que había que servir, y un core moment que concentró el esfuerzo.
 *
 * Secciones exclusivas de StockAI:
 * - El cambio de paradigma — antes / después del flujo
 * - La auditoría — los problemas encontrados, por severidad
 * - Las dos personas — Maya y David, lado a lado
 * - El core moment — la pantalla protagonista, panel destacado
 *
 * Acento: azul + dorado, los colores de marca de StockAI.
 */

const BLUE = '#1E6FA8'
const BLUE_TINT = 'rgba(30, 111, 168, 0.09)'
const BLUE_BORDER = 'rgba(30, 111, 168, 0.34)'
const GOLD_TINT = 'rgba(253, 184, 51, 0.16)'
const STOCKAI_IMAGE_BASE = '/images/work/stockai'

const STOCKAI_IMAGES = {
  hero: `${STOCKAI_IMAGE_BASE}/case-stockai-01-hero-replenishment.webp`,
  execution: [
    `${STOCKAI_IMAGE_BASE}/case-stockai-02-ai-insights-dashboard.webp`,
    `${STOCKAI_IMAGE_BASE}/case-stockai-03-quick-path.webp`,
    `${STOCKAI_IMAGE_BASE}/case-stockai-04-smart-setup.webp`,
  ],
  coreMoment: `${STOCKAI_IMAGE_BASE}/case-stockai-06-ai-review-high-fidelity.webp`,
}

const SEVERITY: Record<string, { color: string; tint: string }> = {
  Crítico: { color: '#C0392B', tint: 'rgba(192, 57, 43, 0.10)' },
  Mayor: { color: '#B45309', tint: 'rgba(180, 83, 9, 0.10)' },
}

const PARADIGM = {
  before: {
    label: 'Antes — el usuario como operador',
    steps: ['Configurar', 'Calcular', 'Revisar'],
  },
  after: {
    label: 'Después — el usuario como decisor',
    steps: ['La IA propone', 'El usuario decide', 'El sistema ejecuta'],
  },
}

const AUDIT = [
  {
    severity: 'Crítico',
    title: 'La IA era invisible',
    body: 'No aparecía en ninguna pantalla del flujo. El producto se veía como un ERP, no como inteligencia.',
  },
  {
    severity: 'Crítico',
    title: 'Configuración manual pesada',
    body: 'Los pasos 1 y 2 obligaban a configurar a mano cada replenishment, sin una sola recomendación.',
  },
  {
    severity: 'Mayor',
    title: 'Sin impacto de revenue visible',
    body: 'La pantalla de revisión mostraba unidades, nunca el impacto financiero de la decisión.',
  },
  {
    severity: 'Mayor',
    title: 'Nula transparencia de la IA',
    body: 'Cuando había cálculo, no se explicaba la lógica. Imposible confiar en una caja negra.',
  },
  {
    severity: 'Mayor',
    title: 'Sin acciones masivas',
    body: 'Cada tienda se aprobaba de a una. Inviable para quien gestiona decenas de tiendas.',
  },
]

const PERSONAS = [
  {
    initial: 'M',
    name: 'Maya',
    role: 'Inventory Manager',
    cadence: 'Uso diario · sesiones de 15-30 min',
    points: [
      'Ejecuta el día a día del inventario',
      'Frustrada con los clics repetitivos',
      'No ve el impacto financiero de sus decisiones',
      'Depende del planner para las decisiones grandes',
    ],
  },
  {
    initial: 'D',
    name: 'David',
    role: 'Merchandising Planner',
    cadence: 'Uso semanal · sesiones de 1-2 horas',
    points: [
      'Define la estrategia de allocation',
      'Desconfía de la IA tipo caja negra',
      'Debe justificar cada decisión al CSCO',
      'Excel le sigue resultando más rápido para analizar',
    ],
  },
]

const CORE_STATS = [
  { metric: '$340K', label: 'Impacto en revenue de la decisión' },
  { metric: '$85K', label: 'Sobrestock evitado' },
  { metric: '60%', label: 'Del esfuerzo del challenge, en esta pantalla' },
]

export function StockAICase({ caseStudy: c }: { caseStudy: CaseStudy }) {
  return (
    <div className="container" style={{ maxWidth: 1100, paddingTop: 40, paddingBottom: 40 }}>
      {/* Back link */}
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
          Design Challenge · 4 días · Senior Product Designer
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
          <Meta label="Formato" value="Design Challenge" />
          <Meta label="Rol" value={c.role} />
          <Meta label="Duración" value="4 días" />
          <Meta label="Plataforma" value={c.platforms.join(' · ')} />
          <Meta label="Stack" value={c.techStack.join(' · ')} />
        </dl>
      </header>

      {/* Hero shot */}
      <Reveal>
        <CaseImage
          src={STOCKAI_IMAGES.hero}
          alt="StockAI — flujo de replenishment rediseñado"
          ratio="16 / 9"
          variant="hero"
          priority
        />
      </Reveal>

      {/* ── EL CONTEXTO ────────────────────────────────────────────────── */}
      <Section eyebrow="El brief" title="Un producto que prometía IA y entregaba un formulario">
        <p style={proseStyle}>{c.context}</p>
      </Section>

      {/* ── EL CAMBIO DE PARADIGMA (signature) ─────────────────────────── */}
      <Section eyebrow="El cambio de paradigma" title="De configurar a aprobar">
        <p style={{ ...proseStyle, marginBottom: 36 }}>
          El producto no fallaba por mala UX — fallaba porque la IA era invisible. El rediseño parte
          de un solo movimiento: cambiar el rol del usuario. Dejar de ser quien configura para pasar
          a ser quien decide.
        </p>

        <div style={{ display: 'grid', gap: 16 }}>
          <ParadigmRow data={PARADIGM.before} tone="before" />
          <ParadigmRow data={PARADIGM.after} tone="after" />
        </div>
      </Section>

      {/* ── LA AUDITORÍA (signature) ───────────────────────────────────── */}
      <Section eyebrow="Discovery" title="La auditoría que originó el rediseño">
        <p style={{ ...proseStyle, marginBottom: 36 }}>{c.research}</p>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: 13,
            letterSpacing: '0.04em',
            color: 'var(--subtle)',
          }}
        >
          De los 7 problemas, estos cinco —los críticos y mayores— guiaron el rediseño.
        </p>
        <Stagger gap={0.08} style={{ display: 'grid', gap: 0 }}>
          {AUDIT.map((issue, i) => {
            const sev = SEVERITY[issue.severity]
            return (
              <StaggerItem key={issue.title}>
                <div
                  className="responsive-category-header"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px minmax(0, 1fr)',
                    gap: 28,
                    alignItems: 'start',
                    paddingBlock: 24,
                    borderTop: '0.5px solid var(--divider)',
                    borderBottom: i === AUDIT.length - 1 ? '0.5px solid var(--divider)' : 'none',
                  }}
                >
                  <span
                    style={{
                      justifySelf: 'start',
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: sev.tint,
                      color: sev.color,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {issue.severity}
                  </span>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 19,
                        fontWeight: 600,
                        color: 'var(--text)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {issue.title}
                    </h3>
                    <p
                      style={{
                        margin: '6px 0 0',
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {issue.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Section>

      {/* ── LAS DOS PERSONAS (signature) ───────────────────────────────── */}
      <Section eyebrow="Las personas" title="Dos usuarios, un solo producto">
        <p style={{ ...proseStyle, marginBottom: 36 }}>
          Maya y David usan StockAI de formas opuestas. Servir a ambos sin duplicar el producto fue
          el marco de todo el rediseño.
        </p>
        <Stagger
          gap={0.12}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {PERSONAS.map((p) => (
            <StaggerItem key={p.name}>
              <div
                style={{
                  height: '100%',
                  padding: 28,
                  borderRadius: 20,
                  border: '0.5px solid var(--border)',
                  background: 'var(--panel)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: BLUE_TINT,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 22,
                      color: BLUE,
                      flexShrink: 0,
                    }}
                  >
                    {p.initial}
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'var(--text)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {p.name}
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: 13, color: BLUE, fontWeight: 500 }}>
                      {p.role}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    margin: '0 0 16px',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    color: 'var(--subtle)',
                  }}
                >
                  {p.cadence}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 9 }}>
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      style={{
                        display: 'flex',
                        gap: 10,
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span aria-hidden style={{ color: BLUE, flexShrink: 0 }}>
                        —
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ── DECISIONES ─────────────────────────────────────────────────── */}
      <Section eyebrow="Decisiones" title="Tres decisiones que definieron el rediseño">
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

      {/* ── LA EJECUCIÓN — 3 PANTALLAS ─────────────────────────────────── */}
      <Section eyebrow="Ejecución" title="Tres pantallas que reconstruyen el flujo">
        <div style={{ display: 'grid', gap: 56 }}>
          {c.execution.slice(0, 3).map((ex, i) => {
            const image = STOCKAI_IMAGES.execution[i] ?? STOCKAI_IMAGES.hero

            return (
              <div key={ex.title}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                  <span
                    className="serif"
                    style={{ fontSize: 15, fontStyle: 'italic', color: BLUE, flexShrink: 0 }}
                  >
                    0{i + 1}
                  </span>
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
                </div>
                <p style={{ ...proseStyle, marginBottom: 20 }}>{ex.body}</p>
                <CaseImage
                  src={image}
                  alt={`StockAI — ${ex.title}`}
                  ratio={i === 0 ? '16 / 9' : '4 / 3'}
                  variant={i === 0 ? 'hero' : 'gallery'}
                />
              </div>
            )
          })}
        </div>
      </Section>

      {/* ── EL CORE MOMENT (signature) ─────────────────────────────────── */}
      <Reveal>
        <section
          style={{
            marginTop: 64,
            padding: '48px 40px',
            borderRadius: 28,
            background: 'var(--surface-subtle)',
            border: `0.5px solid ${BLUE_BORDER}`,
          }}
          className="responsive-section"
        >
          <span
            style={{
              display: 'inline-block',
              padding: '5px 12px',
              borderRadius: 999,
              background: GOLD_TINT,
              color: 'var(--text)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            ✦ El core moment
          </span>
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
            }}
          >
            AI Review &amp; Approve
          </h2>
          <p style={{ ...proseStyle, marginTop: 18 }}>{c.execution[3]?.body}</p>

          {/* Stats del core moment */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 24,
              margin: '36px 0 8px',
            }}
          >
            {CORE_STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(34px, 4.4vw, 52px)',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: BLUE,
                  }}
                >
                  {s.metric}
                </p>
                <p
                  style={{
                    margin: '8px 0 0',
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <CaseImage
              src={STOCKAI_IMAGES.coreMoment}
              alt="StockAI — AI Review & Approve en alta fidelidad"
              ratio="16 / 9"
              variant="hero"
            />
          </div>
        </section>
      </Reveal>

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
            El impacto proyectado
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
          <p
            style={{
              margin: '20px 0 0',
              fontSize: 13,
              fontStyle: 'italic',
              color: 'var(--subtle)',
            }}
          >
            Métricas objetivo definidas en el challenge — un ejercicio de diseño, no datos de
            producción.
          </p>
        </section>
      </Reveal>

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
                  color: BLUE,
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
}: {
  src: string
  alt: string
  ratio: string
  variant?: 'hero' | 'gallery'
  priority?: boolean
}) {
  return (
    <figure
      style={{
        margin: 0,
        width: '100%',
        aspectRatio: ratio,
        borderRadius: variant === 'hero' ? 24 : 16,
        border: '0.5px solid var(--border)',
        background: 'var(--surface-subtle)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: variant === 'hero' ? 'var(--shadow-soft)' : 'none',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 720px) calc(100vw - 32px), 1100px"
        style={{ objectFit: 'cover' }}
      />
    </figure>
  )
}

function ParadigmRow({
  data,
  tone,
}: {
  data: { label: string; steps: string[] }
  tone: 'before' | 'after'
}) {
  const isAfter = tone === 'after'
  return (
    <div
      style={{
        padding: '24px 26px',
        borderRadius: 20,
        border: isAfter ? `0.5px solid ${BLUE_BORDER}` : '0.5px solid var(--border)',
        background: isAfter ? BLUE_TINT : 'var(--surface-subtle)',
      }}
    >
      <p
        style={{
          margin: '0 0 16px',
          fontSize: 11,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color: isAfter ? BLUE : 'var(--subtle)',
          fontWeight: 600,
        }}
      >
        {data.label}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {data.steps.map((step, i) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                padding: '10px 16px',
                borderRadius: 12,
                background: 'var(--panel)',
                border: isAfter ? `0.5px solid ${BLUE_BORDER}` : '0.5px solid var(--border)',
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--text)',
              }}
            >
              {step}
            </span>
            {i < data.steps.length - 1 ? (
              <span aria-hidden style={{ color: isAfter ? BLUE : 'var(--subtle)', fontSize: 18 }}>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
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
