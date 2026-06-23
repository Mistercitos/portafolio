import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { Placeholder } from '@/app/components/Placeholder'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import type { CaseStudy } from '@/lib/cases'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'

/**
 * Layout dedicado del case study de Outbuild (ex IPSUM).
 *
 * A diferencia del layout genérico, este se estructura alrededor de lo que
 * hace único a Outbuild: una historia de evolución de rol —de diseñador de
 * marketing a Product Designer + Head of Marketing— y un producto, ProPlanner,
 * pensado para el contexto extremo de una obra de construcción.
 *
 * Secciones exclusivas de Outbuild:
 * - La trayectoria — progresión visual de cómo creció el rol
 * - El telón de fondo — estallido social + pandemia como contexto
 * - Diseñar para la obra — panel de constraints reales del terreno
 * - Un producto que se conecta — ecosistema de integraciones, Procore destacado
 * - De IPSUM a Outbuild — panel de transformación de marca, cierre en alto
 */

// Acento del proyecto — teal. Outbuild trabaja en tonos teal.
const TEAL = '#0D9488'
const TEAL_LIGHT = '#5EEAD4'
const TEAL_TINT = 'rgba(13, 148, 136, 0.09)'
const TEAL_BORDER = 'rgba(13, 148, 136, 0.38)'

const ROLE_STAGES = [
  {
    phase: 'Entrada',
    title: 'Diseñador de marketing',
    body: 'Contratado con una misión concreta: crear el material de marketing que haría crecer la base de clientes.',
  },
  {
    phase: 'Expansión',
    title: 'Rediseño del sitio web',
    body: 'El primer encargo cumplido abrió el segundo — un rediseño completo del sitio web corporativo, de punta a punta.',
  },
  {
    phase: 'Liderazgo',
    title: 'Head of Marketing',
    body: 'Cuando la dirección del área quedó disponible, la compañía me pidió asumirla y responder por todo el marketing.',
  },
  {
    phase: 'Producto',
    title: 'Product Designer',
    body: 'Con responsabilidades sobre la plataforma, pasé a diseñar ProPlanner como su Product Designer.',
  },
]

const CONSTRAINTS = [
  {
    icon: 'signal',
    title: 'Conectividad intermitente',
    body: 'Las obras de construcción rara vez tienen buena señal. Las tareas críticas tenían que resistir una conexión que se cae.',
  },
  {
    icon: 'cube',
    title: 'Modelos BIM',
    body: 'Archivos pesados y complejos que el producto debía manejar sin volverse lento ni intimidante para el usuario.',
  },
  {
    icon: 'user',
    title: 'Usuarios sin software',
    body: 'Buena parte de los usuarios en terreno no tenía historia previa de uso de herramientas digitales.',
  },
  {
    icon: 'split',
    title: 'Dos perfiles opuestos',
    body: 'El jefe de terreno, en movimiento, y el planificador de oficina, con visión completa. Un solo producto para ambos.',
  },
]

const INTEGRATIONS = [
  {
    name: 'GeoVictoria',
    role: 'Control de asistencia',
    body: 'Conectó la planificación del proyecto con la marcación real de asistencia del personal en obra.',
    strategic: false,
  },
  {
    name: 'Modelos BIM',
    role: 'Información del proyecto',
    body: 'Soporte de modelos BIM para que la planificación se apoyara en la información real de cada proyecto.',
    strategic: false,
  },
  {
    name: 'Procore',
    role: 'Integración global',
    body: 'La conexión con uno de los referentes globales del construction-tech — integrar ProPlanner al ecosistema de herramientas que las constructoras ya usaban a diario.',
    strategic: true,
  },
]

export function OutbuildCase({ caseStudy: c, locale = 'es' }: { caseStudy: CaseStudy; locale?: Locale }) {
  const ui = getUI(locale)
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
        {/* Cover — marca del proyecto, mantiene el shared element transition */}
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
          {c.yearStart} — {c.yearEnd} · {c.role}
        </p>

        {/* Nombre del proyecto — ancla visual */}
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

        {/* Descriptor — lede editorial */}
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
          <Meta label="Empresa" value={c.company} />
          <Meta label="Producto" value="ProPlanner" />
          <Meta label="Equipo" value={c.teamSize} />
          <Meta label="Plataforma" value={c.platforms.join(' · ')} />
          <Meta label="Disciplinas" value={c.techStack.join(' · ')} />
        </dl>
      </header>

      {/* Hero shot */}
      <Reveal>
        <Placeholder
          label="ProPlanner — vista general de la plataforma de gestión de proyectos"
          caption="Hero shot · 16:9"
          variant="hero"
        />
      </Reveal>

      {/* ── EL CONTEXTO ────────────────────────────────────────────────── */}
      <Section eyebrow="El contexto" title="Construir software para la construcción">
        <p style={proseStyle}>{c.context}</p>
      </Section>

      {/* ── LA TRAYECTORIA (signature) ─────────────────────────────────── */}
      <Section eyebrow="La trayectoria" title="Un rol que no dejó de crecer">
        <p style={{ ...proseStyle, marginBottom: 40 }}>
          No entré como Product Designer. Entré para resolver un problema de marketing — y cada
          encargo cumplido fue ampliando el siguiente. En menos de dos años el rol pasó por cuatro
          etapas, sin que ninguna reemplazara del todo a la anterior.
        </p>

        <Stagger
          gap={0.1}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '44px 0',
          }}
        >
          {ROLE_STAGES.map((s, i) => (
            <StaggerItem key={s.title}>
              <div style={{ borderTop: `2px solid ${TEAL}`, paddingRight: 24, height: '100%' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: TEAL,
                    color: '#FAF7F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                    marginTop: -18,
                  }}
                >
                  {`0${i + 1}`}
                </div>
                <p
                  style={{
                    margin: '16px 0 0',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: TEAL,
                  }}
                >
                  {s.phase}
                </p>
                <h3
                  style={{
                    margin: '8px 0 0',
                    fontSize: 19,
                    fontWeight: 600,
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: '8px 0 0',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Distribución de tiempo 60/40 */}
        <div style={{ marginTop: 44 }}>
          <div
            style={{
              display: 'flex',
              height: 48,
              borderRadius: 12,
              overflow: 'hidden',
              border: '0.5px solid var(--border)',
            }}
          >
            <div
              style={{
                flex: '0 0 60%',
                background: TEAL,
                color: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 18,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              60% · Producto
            </div>
            <div
              style={{
                flex: '0 0 40%',
                background: TEAL_TINT,
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 18,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              40% · Marketing y marca
            </div>
          </div>
          <p
            style={{
              margin: '12px 0 0',
              fontSize: 13,
              color: 'var(--subtle)',
            }}
          >
            La distribución de mi tiempo una vez que el rol abarcó las dos disciplinas a la vez.
          </p>
        </div>
      </Section>

      {/* ── EL TELÓN DE FONDO (signature) ──────────────────────────────── */}
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
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 18,
            }}
          >
            2019 – 2021 · El telón de fondo
          </p>
          <p
            className="serif"
            style={{
              margin: 0,
              fontSize: 'clamp(21px, 2.5vw, 30px)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '-0.015em',
              color: 'var(--text)',
              maxWidth: '40ch',
            }}
          >
            El alcance del rol creció rápido, pero no creció en un vacío.
          </p>
          <p style={{ ...proseStyle, marginTop: 20, maxWidth: '68ch' }}>
            Todo esto ocurrió mientras Chile vivía las réplicas del estallido social de octubre de
            2019 y el mundo entraba en pandemia — un contexto que, de un día para otro, obligó a la
            compañía a dejar la oficina y reinventarse como un equipo completamente remoto. Sostener
            el estándar de diseño, dirigir el marketing y aprender el oficio de Product Designer
            ocurrió, todo, sobre ese terreno movedizo.
          </p>
        </section>
      </Reveal>

      {/* ── DISEÑAR PARA LA OBRA (signature) ───────────────────────────── */}
      <Section eyebrow="Discovery" title="Diseñar para la obra, no para la oficina">
        <p style={proseStyle}>{c.research}</p>

        <Stagger
          gap={0.1}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 16,
            marginTop: 36,
          }}
        >
          {CONSTRAINTS.map((con) => (
            <StaggerItem key={con.title}>
              <div
                style={{
                  height: '100%',
                  padding: 22,
                  borderRadius: 18,
                  border: '0.5px solid var(--border)',
                  background: 'var(--panel)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: TEAL_TINT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <ConstraintIcon kind={con.icon} />
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {con.title}
                </h3>
                <p
                  style={{
                    margin: '8px 0 0',
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {con.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div style={{ marginTop: 32 }}>
          <Placeholder
            label="ProPlanner en contexto de obra — uso en terreno"
            caption="Contexto de uso · 3:2"
            variant="process"
          />
        </div>
      </Section>

      {/* ── DECISIONES ─────────────────────────────────────────────────── */}
      <Section eyebrow="Decisiones" title="Tres decisiones que definieron el trabajo">
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

      {/* ── EL PRODUCTO: PROPLANNER ────────────────────────────────────── */}
      <Section eyebrow="El producto" title="ProPlanner, de la planilla a la plataforma">
        <p style={{ ...proseStyle, marginBottom: 32 }}>{c.execution[0]?.body}</p>
        <Placeholder
          label="ProPlanner — carta Gantt y programación de actividades"
          caption="Pantalla principal · 16:9"
          variant="hero"
        />
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          <Placeholder label="Planificación de recursos del proyecto" variant="gallery" />
          <Placeholder label="Vista general de un proyecto en obra" variant="gallery" />
        </div>
      </Section>

      {/* ── UN PRODUCTO QUE SE CONECTA (signature) ─────────────────────── */}
      <Section eyebrow="Ejecución" title="Un producto que se conecta al rubro">
        <p style={{ ...proseStyle, marginBottom: 32 }}>{c.execution[1]?.body}</p>
        <Stagger
          gap={0.1}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          {INTEGRATIONS.map((int) => (
            <StaggerItem key={int.name}>
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  padding: '24px 22px',
                  borderRadius: 18,
                  border: int.strategic
                    ? `1px solid ${TEAL_BORDER}`
                    : '0.5px solid var(--border)',
                  background: int.strategic ? TEAL_TINT : 'var(--panel)',
                }}
              >
                {int.strategic ? (
                  <span
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      padding: '4px 9px',
                      borderRadius: 999,
                      background: TEAL,
                      color: '#FAF7F2',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Líder global
                  </span>
                ) : null}
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: int.strategic ? TEAL : 'var(--subtle)',
                    marginBottom: 8,
                  }}
                >
                  {int.role}
                </p>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 21,
                    fontWeight: 600,
                    color: 'var(--text)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {int.name}
                </h3>
                <p
                  style={{
                    margin: '10px 0 0',
                    fontSize: 14,
                    lineHeight: 1.62,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {int.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
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
            El impacto del trabajo
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

      {/* ── MARCA Y MARKETING ──────────────────────────────────────────── */}
      <Section eyebrow="Más allá del producto" title="Marca, marketing y dirección de área">
        <p style={{ ...proseStyle, marginBottom: 28 }}>{c.execution[2]?.body}</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          <Placeholder label="Rediseño del sitio web corporativo" variant="gallery" />
          <Placeholder label="Material de marketing y captación de clientes" variant="gallery" />
          <Placeholder label="Sistema de marca — transición IPSUM a Outbuild" variant="gallery" />
        </div>
      </Section>

      {/* ── DE IPSUM A OUTBUILD (signature, cierre en alto) ────────────── */}
      <Reveal>
        <section
          style={{
            marginTop: 64,
            padding: '48px 40px',
            borderRadius: 28,
            background: 'var(--surface-subtle)',
            border: `0.5px solid ${TEAL_BORDER}`,
          }}
          className="responsive-section"
        >
          <p
            className="serif"
            style={{
              margin: 0,
              fontSize: 14,
              fontStyle: 'italic',
              color: TEAL,
              marginBottom: 14,
              letterSpacing: '0.04em',
            }}
          >
            El desenlace
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
            }}
          >
            De IPSUM a Outbuild
          </h2>

          {/* Transformación de marca */}
          <div
            style={{
              margin: '36px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                style={{
                  margin: '0 0 6px',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--subtle)',
                }}
              >
                En Latinoamérica
              </p>
              <span
                className="serif"
                style={{
                  fontSize: 'clamp(30px, 4.4vw, 52px)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: 'var(--subtle)',
                }}
              >
                IPSUM
              </span>
            </div>
            <span
              aria-hidden
              style={{ fontSize: 30, color: TEAL, lineHeight: 1 }}
            >
              →
            </span>
            <div>
              <p
                style={{
                  margin: '0 0 6px',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: TEAL,
                }}
              >
                En Estados Unidos
              </p>
              <span
                className="serif"
                style={{
                  fontSize: 'clamp(34px, 5vw, 60px)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${TEAL}, ${TEAL_LIGHT})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Outbuild
              </span>
            </div>
          </div>

          <p style={{ ...proseStyle, marginBottom: 16 }}>{c.execution[3]?.body}</p>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--text)',
              fontWeight: 500,
              maxWidth: '60ch',
            }}
          >
            La apuesta fue competir en el mercado más grande del mundo del construction-tech. Un
            producto que nació resolviendo la planificación de obras en Latinoamérica terminó
            cruzando a Estados Unidos.
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
                  color: TEAL,
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

function ConstraintIcon({ kind }: { kind: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { color: TEAL },
    'aria-hidden': true,
  }
  switch (kind) {
    case 'signal':
      return (
        <svg {...common}>
          <path d="M5 12.5a10 10 0 0 1 14 0" />
          <path d="M8.5 16a5 5 0 0 1 7 0" />
          <circle cx="12" cy="19.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'cube':
      return (
        <svg {...common}>
          <path d="M12 2l9 5v10l-9 5-9-5V7z" />
          <path d="M12 12l9-5M12 12v10M12 12L3 7" />
        </svg>
      )
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      )
    case 'split':
      return (
        <svg {...common}>
          <path d="M12 22v-8M12 14c0-5-7-5-7-10M12 14c0-5 7-5 7-10" />
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

