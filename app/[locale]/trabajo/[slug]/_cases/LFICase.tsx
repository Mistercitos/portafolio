import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { Placeholder } from '@/app/components/Placeholder'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import type { CaseStudy } from '@/lib/cases'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'

const BLUE = '#2563EB'
const BLUE_TINT = 'rgba(37, 99, 235, 0.09)'
const BLUE_BORDER = 'rgba(37, 99, 235, 0.38)'

const CLIENTS: Record<Locale, Array<{ name: string; sector: string }>> = {
  es: [
    { name: 'Scotiabank', sector: 'Banca' },
    { name: 'Walmart Chile', sector: 'Retail' },
    { name: 'Marca Chile', sector: 'Gobierno' },
    { name: 'Consejo para la Transparencia', sector: 'Gobierno' },
    { name: 'Study Melbourne', sector: 'Gobierno · Australia' },
    { name: 'Clínica Alemana', sector: 'Salud' },
    { name: 'Colbún', sector: 'Energía' },
    { name: 'Generadora Metropolitana', sector: 'Energía' },
    { name: 'Universidad Santo Tomás', sector: 'Educación' },
    { name: 'Universidad Finis Terrae', sector: 'Educación' },
    { name: 'Viña Casas del Bosque', sector: 'Vino' },
  ],
  en: [
    { name: 'Scotiabank', sector: 'Banking' },
    { name: 'Walmart Chile', sector: 'Retail' },
    { name: 'Marca Chile', sector: 'Government' },
    { name: 'Consejo para la Transparencia', sector: 'Government' },
    { name: 'Study Melbourne', sector: 'Government · Australia' },
    { name: 'Clínica Alemana', sector: 'Healthcare' },
    { name: 'Colbún', sector: 'Energy' },
    { name: 'Generadora Metropolitana', sector: 'Energy' },
    { name: 'Universidad Santo Tomás', sector: 'Education' },
    { name: 'Universidad Finis Terrae', sector: 'Education' },
    { name: 'Viña Casas del Bosque', sector: 'Wine' },
  ],
}

const SCOTIA_WORK: Record<Locale, string[]> = {
  es: [
    'Comunicación interna',
    'Mailing',
    'Cambio de imagen de marca',
    'Señalética de la torre',
    'Material impreso',
  ],
  en: [
    'Internal communication',
    'Email campaigns',
    'Brand transition',
    'Tower signage',
    'Printed material',
  ],
}

const LFI_COPY = {
  es: {
    metaClientsLabel: 'Clientes',
    metaClientsValue: 'Más de 10 marcas',
    metaProjectsLabel: 'Proyectos',
    metaDisciplinesLabel: 'Disciplinas',
    heroLabel: 'Selección de piezas — LFI Agencia Digital',
    heroCaption: 'Hero shot · 16:9',
    contextTitle: 'Mi primer estudio de diseño',
    rosterEyebrow: 'El roster',
    rosterTitle: 'Diez marcas, siete sectores',
    rosterBody:
      'En poco más de un año pasé por un abanico de clientes que pocas veces se ve junto: banca, gobierno —incluido un cliente internacional—, educación, salud, energía, retail y vino. Cada logo es un sistema de marca distinto que hubo que aprender y respetar.',
    challengeTitle: 'Tres frentes del trabajo de agencia',
    discoveryTitle: 'Entender la marca antes de tocarla',
    processLabel: 'Auditoría de sistemas de marca · referencias por cliente',
    processCaption: 'Process artifacts · 3:2',
    decisionsTitle: 'Tres decisiones que marcaron mi forma de trabajar',
    scotiaEyebrow: 'El cliente insignia',
    scotiaIntro:
      'Scotiabank fue el cliente más grande con el que trabajé en LFI, y me tocó en un momento poco común: la compra de BBVA Chile. Mi foco principal fue la comunicación interna y el mailing — el flujo de piezas que mantiene informada y alineada a una organización de miles de personas, justo cuando esa organización estaba creciendo y transformándose.',
    scotiaBrand:
      'Esa adquisición trajo un cambio de imagen de marca —nuevo logo, nueva paleta de colores— y la llegada de Scotiabank Azul, la marca con la que se integraron las operaciones que venían de BBVA. Los lineamientos bajaban desde la casa matriz en Canadá, y parte del trabajo era aterrizar esas guías globales a cada pieza local sin perder nada en el camino.',
    scotiaMetric:
      'de la señalética y el material impreso de la Torre Scotiabank, su edificio corporativo, salió de mi escritorio.',
    scotiaReflection:
      'Pasar de una pieza de mailing a la señalética de un edificio completo es cambiar de disciplina sin cambiar de cliente: del detalle de una plantilla a cómo cientos de personas se orientan, cada día, dentro de una torre.',
    scotiaPlaceholder: 'Torre Scotiabank — señalética y wayfinding',
    scotiaCaption: 'Diseño de entorno · 16:9',
    executionTitle: 'Lo que produje, canal por canal',
    digitalPlaceholder: 'Piezas digitales — redes y mailing',
    printPlaceholder: 'Material impreso y de marca',
    resultsTitle: 'El impacto del trabajo',
    takeawaysTitle: 'Lo que me llevo',
  },
  en: {
    metaClientsLabel: 'Clients',
    metaClientsValue: '10+ brands',
    metaProjectsLabel: 'Projects',
    metaDisciplinesLabel: 'Disciplines',
    heroLabel: 'Selection of work — LFI Digital Agency',
    heroCaption: 'Hero shot · 16:9',
    contextTitle: 'My first design studio',
    rosterEyebrow: 'The roster',
    rosterTitle: 'Ten brands, seven sectors',
    rosterBody:
      'In just over a year, I worked across a client roster you rarely see together: banking, government —including an international client—, education, healthcare, energy, retail, and wine. Each logo was a different brand system to learn and respect.',
    challengeTitle: 'Three fronts of agency work',
    discoveryTitle: 'Understanding the brand before touching it',
    processLabel: 'Brand-system audit · client references',
    processCaption: 'Process artifacts · 3:2',
    decisionsTitle: 'Three decisions that shaped how I work',
    scotiaEyebrow: 'Signature client',
    scotiaIntro:
      'Scotiabank was the largest client I worked with at LFI, and the timing was unusual: the acquisition of BBVA Chile. My main focus was internal communication and email — the stream of pieces that keeps an organization of thousands informed and aligned while it is growing and transforming.',
    scotiaBrand:
      'That acquisition brought a brand transition: a new logo, a new color palette, and the arrival of Scotiabank Azul, the brand used to integrate the BBVA operations. Guidelines came from headquarters in Canada, and part of the work was translating those global rules into local pieces without losing consistency.',
    scotiaMetric:
      'of the signage and printed material for the Scotiabank Tower, its corporate headquarters, came from my desk.',
    scotiaReflection:
      'Moving from an email piece to the signage of an entire building means changing discipline without changing client: from the detail of a template to how hundreds of people orient themselves every day inside a tower.',
    scotiaPlaceholder: 'Scotiabank Tower — signage and wayfinding',
    scotiaCaption: 'Environmental design · 16:9',
    executionTitle: 'What I produced, channel by channel',
    digitalPlaceholder: 'Digital pieces — social and email',
    printPlaceholder: 'Printed and brand material',
    resultsTitle: 'The impact of the work',
    takeawaysTitle: 'What I took forward',
  },
} satisfies Record<Locale, Record<string, string>>

export function LFICase({ caseStudy: c, locale = 'es' }: { caseStudy: CaseStudy; locale?: Locale }) {
  const ui = getUI(locale)
  const t = LFI_COPY[locale]
  const clients = CLIENTS[locale]
  const scotiaWork = SCOTIA_WORK[locale]
  const [titleLead, titleRest] = c.title.split(' — ')

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
          {c.yearStart} — {c.yearEnd} · {c.role}
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
          {titleLead}
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
          {titleRest ?? c.title}
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
          <Meta label={ui.caseMeta.company} value={c.company} />
          <Meta label={t.metaClientsLabel} value={t.metaClientsValue} />
          <Meta label={t.metaProjectsLabel} value={c.teamSize} />
          <Meta label={ui.caseMeta.platform} value={c.platforms.join(' · ')} />
          <Meta label={t.metaDisciplinesLabel} value={c.techStack.join(' · ')} />
        </dl>
      </header>

      <Reveal>
        <Placeholder label={t.heroLabel} caption={t.heroCaption} variant="hero" />
      </Reveal>

      <Section eyebrow={ui.caseSection.context} title={t.contextTitle}>
        <p style={proseStyle}>{c.context}</p>
      </Section>

      <Section eyebrow={t.rosterEyebrow} title={t.rosterTitle}>
        <p style={{ ...proseStyle, marginBottom: 36 }}>{t.rosterBody}</p>
        <Stagger
          gap={0.06}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 12,
          }}
        >
          {clients.map((client) => (
            <StaggerItem key={client.name}>
              <div
                style={{
                  height: '100%',
                  padding: '20px 18px',
                  borderRadius: 14,
                  border: '0.5px solid var(--border)',
                  background: 'var(--panel)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: BLUE,
                    fontWeight: 600,
                  }}
                >
                  {client.sector}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {client.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section eyebrow={ui.caseSection.challenge} title={t.challengeTitle}>
        <Stagger gap={0.1} style={{ display: 'grid', gap: 18 }}>
          {c.challenge.map((ch) => (
            <StaggerItem key={ch.title} style={{ paddingLeft: 20, borderLeft: `2px solid ${BLUE}` }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>
                {ch.title}
              </h3>
              <p style={{ ...proseStyle, marginTop: 6 }}>{ch.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section eyebrow={ui.caseSection.discovery} title={t.discoveryTitle}>
        <p style={proseStyle}>{c.research}</p>
        <div style={{ marginTop: 32 }}>
          <Placeholder label={t.processLabel} caption={t.processCaption} variant="process" />
        </div>
      </Section>

      <Section eyebrow={ui.caseSection.decisions} title={t.decisionsTitle}>
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
          <p
            className="serif"
            style={{
              margin: 0,
              fontSize: 14,
              fontStyle: 'italic',
              color: BLUE,
              marginBottom: 14,
              letterSpacing: '0.04em',
            }}
          >
            {t.scotiaEyebrow}
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
            Scotiabank
          </h2>
          <p style={{ ...proseStyle, marginTop: 18 }}>{t.scotiaIntro}</p>
          <p style={{ ...proseStyle, marginTop: 16 }}>{t.scotiaBrand}</p>

          <div
            style={{
              display: 'flex',
              gap: 28,
              alignItems: 'baseline',
              flexWrap: 'wrap',
              margin: '36px 0 24px',
            }}
          >
            <span
              className="serif"
              style={{
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 'clamp(64px, 9vw, 120px)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: BLUE,
              }}
            >
              90%
            </span>
            <p
              style={{
                margin: 0,
                maxWidth: '26ch',
                fontSize: 16,
                lineHeight: 1.55,
                color: 'var(--text)',
                fontWeight: 500,
              }}
            >
              {t.scotiaMetric}
            </p>
          </div>

          <p style={{ ...proseStyle, marginBottom: 28 }}>{t.scotiaReflection}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {scotiaWork.map((area) => (
              <span
                key={area}
                style={{
                  padding: '7px 14px',
                  borderRadius: 999,
                  border: `0.5px solid ${BLUE_BORDER}`,
                  background: BLUE_TINT,
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text)',
                }}
              >
                {area}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Placeholder label={t.scotiaPlaceholder} caption={t.scotiaCaption} variant="hero" />
          </div>
        </section>
      </Reveal>

      <Section eyebrow={ui.caseSection.execution} title={t.executionTitle}>
        <Stagger
          gap={0.1}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {c.execution.map((ex) => (
            <StaggerItem key={ex.title}>
              <div
                style={{
                  height: '100%',
                  padding: 24,
                  borderRadius: 18,
                  border: '0.5px solid var(--border)',
                  background: 'var(--panel)',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {ex.title}
                </h3>
                <p
                  style={{
                    margin: '10px 0 0',
                    fontSize: 14,
                    lineHeight: 1.62,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {ex.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          <Placeholder label={t.digitalPlaceholder} variant="gallery" />
          <Placeholder label={t.printPlaceholder} variant="gallery" />
        </div>
      </Section>

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
                    borderBottom: i === c.outcomes.length - 1 ? '0.5px solid var(--divider)' : 'none',
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

      <Section eyebrow={ui.caseSection.takeaways} title={t.takeawaysTitle}>
        <ol style={{ display: 'grid', gap: 14, margin: 0, padding: 0, listStyle: 'none' }}>
          {c.takeaways.map((takeaway, i) => (
            <li
              key={takeaway}
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
              <p style={{ margin: 0, fontSize: 17, color: 'var(--text)', lineHeight: 1.55 }}>{takeaway}</p>
            </li>
          ))}
        </ol>
      </Section>

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
