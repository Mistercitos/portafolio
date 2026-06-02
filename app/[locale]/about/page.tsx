import type { Metadata } from 'next'
import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { Placeholder } from '@/app/components/Placeholder'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import { getTimeline, getBeliefs, getSkillsMatrix } from '@/lib/timeline'
import { localizedPath, toLocale, type Locale } from '@/lib/i18n'

type Stat = { value: string; label: string }
type AboutContent = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  subtitle: string
  intro1: string
  intro2: string
  metaBase: string
  metaBaseValue: string
  metaLangs: string
  metaLangsValue: string
  metaSetup: string
  metaSetupValue: string
  photoLabel: string
  photoCaption: string
  stats: Stat[]
  philEyebrow: string
  philTitle: string
  philIntro: string
  careerEyebrow: string
  careerTitle: string
  careerIntro: string
  skillsEyebrow: string
  skillsTitle: string
  skillsIntro: string
  formalEyebrow: string
  formalTitle: string
  educationLabel: string
  edu1: string
  edu1Sub: string
  edu2: string
  edu2Sub: string
  languagesLabel: string
  langEs: string
  langEsLevel: string
  langEn: string
  langEnLevel: string
  setupLabel: string
  setupValue: string
  setupValueSub: string
  cvLabel: string
  cvEs: string
  cvEn: string
  cvNote: string
  ctaEyebrow: string
  ctaTitle: string
  ctaBody: string
  ctaContact: string
}

const ABOUT: Record<Locale, AboutContent> = {
  es: {
    metaTitle: 'Sobre mí',
    metaDescription:
      'Senior Product Designer + UX Engineer con más de 7 años en SaaS, B2B y marketplaces. Diseño productos y escribo el código que los lleva a producción.',
    eyebrow: 'Sobre mí',
    subtitle: 'Senior Product Designer que también escribe el código que diseña.',
    intro1:
      'Llevo más de 7 años liderando diseño en SaaS, plataformas B2B y marketplaces para mercados de Estados Unidos y Latinoamérica. Hago estrategia de UX, construyo design systems y escribo frontend. La gracia está en que esas tres cosas trabajen juntas y no una contra otra.',
    intro2:
      'Escribo código de producción en React y JavaScript cuando acelera la entrega. No es para reemplazar a ingeniería; es para que entre ver un problema y verlo resuelto en producción pase menos tiempo.',
    metaBase: 'Base',
    metaBaseValue: 'Santiago, Chile · GMT-3',
    metaLangs: 'Idiomas',
    metaLangsValue: 'Español · Inglés profesional',
    metaSetup: 'Modalidad',
    metaSetupValue: 'Remoto · LATAM y US',
    photoLabel: 'Foto editorial',
    photoCaption: 'Portrait · 4:5',
    stats: [
      { value: '7+', label: 'Años de carrera' },
      { value: '4', label: 'Industrias atendidas' },
      { value: '3', label: 'Países (CL, PE, US)' },
      { value: '12+', label: 'Ingenieros con los que trabajé' },
    ],
    philEyebrow: 'Filosofía · 01',
    philTitle: 'Esto creo.',
    philIntro:
      'Cinco frases sobre cómo entiendo este oficio. Más que un proceso, son opiniones formadas. Si no compartes alguna, es bastante probable que no encajemos trabajando juntos.',
    careerEyebrow: 'Trayectoria · 02',
    careerTitle: 'Siete años cruzando diseño e ingeniería.',
    careerIntro:
      'De una agencia digital a un marketplace multi-lado, pasando por construction-tech. Cada etapa me enseñó algo distinto: a entregar rápido, a manejar operaciones complejas y a trabajar a escala enterprise.',
    skillsEyebrow: 'Skills · 03',
    skillsTitle: 'Qué sé hacer.',
    skillsIntro:
      'Más que una lista completa, es lo que uso en el día a día. Si buscas un Senior Product Designer que además escribe código, aquí está lo que pongo sobre la mesa.',
    formalEyebrow: 'Lo formal · 04',
    formalTitle: 'Educación, idiomas y CV.',
    educationLabel: 'Educación',
    edu1: 'Licenciatura en Comunicación Digital y Multimedia',
    edu1Sub: 'Universidad del Pacífico, Chile · 2017',
    edu2: 'Carrera de Desarrollo Frontend',
    edu2Sub: 'Coderhouse · React, Vue.js, Node.js, JavaScript',
    languagesLabel: 'Idiomas',
    langEs: 'Español',
    langEsLevel: '· Nativo',
    langEn: 'Inglés',
    langEnLevel: '· Avanzado / Profesional',
    setupLabel: 'Modalidad',
    setupValue: 'Remoto',
    setupValueSub: '· LATAM y US',
    cvLabel: 'Descargar CV',
    cvEs: 'Español ↓',
    cvEn: 'English ↓',
    cvNote: 'PDF · Actualizado a 2026',
    ctaEyebrow: '¿Hablamos?',
    ctaTitle: 'Si lo que leíste te interesa, escríbeme.',
    ctaBody:
      'Respondo en menos de 24 horas. Si prefieres algo más corto, LinkedIn también funciona.',
    ctaContact: 'Contacto',
  },
  en: {
    metaTitle: 'About',
    metaDescription:
      'Senior Product Designer and UX Engineer with 7+ years in SaaS, B2B, and marketplaces. I design products and write the code that ships them.',
    eyebrow: 'About',
    subtitle: 'A Senior Product Designer who also writes the code he designs.',
    intro1:
      "I've spent 7+ years leading design in SaaS, B2B platforms, and marketplaces for US and Latin American markets. I do UX strategy, build design systems, and write frontend. The point is making those three work together instead of against each other.",
    intro2:
      "I write production code in React and JavaScript when it speeds up delivery. It's not to replace engineering; it's so less time passes between seeing a problem and seeing it solved in production.",
    metaBase: 'Based in',
    metaBaseValue: 'Santiago, Chile · GMT-3',
    metaLangs: 'Languages',
    metaLangsValue: 'Spanish · Professional English',
    metaSetup: 'Setup',
    metaSetupValue: 'Remote · LATAM & US',
    photoLabel: 'Editorial photo',
    photoCaption: 'Portrait · 4:5',
    stats: [
      { value: '7+', label: 'Years in the field' },
      { value: '4', label: 'Industries served' },
      { value: '3', label: 'Countries (CL, PE, US)' },
      { value: '12+', label: "Engineers I've worked with" },
    ],
    philEyebrow: 'Philosophy · 01',
    philTitle: 'What I believe.',
    philIntro:
      "Five statements on how I understand this craft. More than a process, they're formed opinions. If you don't share one of them, there's a fair chance we wouldn't be a good fit working together.",
    careerEyebrow: 'Career · 02',
    careerTitle: 'Seven years crossing design and engineering.',
    careerIntro:
      'From a digital agency to a multi-sided marketplace, by way of construction tech. Each stage taught me something different: to deliver fast, to handle complex operations, and to work at enterprise scale.',
    skillsEyebrow: 'Skills · 03',
    skillsTitle: 'What I can do.',
    skillsIntro:
      "More than a complete list, it's what I use day to day. If you're looking for a Senior Product Designer who also writes code, this is what I bring to the table.",
    formalEyebrow: 'The formal stuff · 04',
    formalTitle: 'Education, languages, and résumé.',
    educationLabel: 'Education',
    edu1: "Bachelor's in Digital and Multimedia Communication",
    edu1Sub: 'Universidad del Pacífico, Chile · 2017',
    edu2: 'Frontend Development Program',
    edu2Sub: 'Coderhouse · React, Vue.js, Node.js, JavaScript',
    languagesLabel: 'Languages',
    langEs: 'Spanish',
    langEsLevel: '· Native',
    langEn: 'English',
    langEnLevel: '· Advanced / Professional',
    setupLabel: 'Setup',
    setupValue: 'Remote',
    setupValueSub: '· LATAM & US',
    cvLabel: 'Download résumé',
    cvEs: 'Spanish ↓',
    cvEn: 'English ↓',
    cvNote: 'PDF · Updated 2026',
    ctaEyebrow: 'Shall we talk?',
    ctaTitle: 'If what you read resonates, get in touch.',
    ctaBody:
      "I reply within 24 hours. If you'd rather use something shorter, LinkedIn works too.",
    ctaContact: 'Contact',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Christian Del Barco',
  jobTitle: 'Senior Product Designer',
  url: 'https://chrisdelbarco.design',
  email: 'cdelbarcog92@gmail.com',
  sameAs: ['https://linkedin.com/in/cdelbarco', 'https://github.com/Mistercitos'],
  address: { '@type': 'PostalAddress', addressLocality: 'Santiago', addressCountry: 'CL' },
  knowsLanguage: ['Spanish', 'English'],
  knowsAbout: [
    'Product Design',
    'UX Strategy',
    'Design Systems',
    'React',
    'JavaScript',
    'Marketplaces',
    'B2B SaaS',
  ],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = ABOUT[locale]
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: locale === 'en' ? '/en/about' : '/about',
      languages: { es: '/about', en: '/en/about', 'x-default': '/about' },
    },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await params).locale)
  const t = ABOUT[locale]
  const timeline = getTimeline(locale)
  const beliefs = getBeliefs(locale)
  const skillsMatrix = getSkillsMatrix(locale)

  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 1080 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* HERO — asimétrico */}
      <Reveal>
        <header
          className="responsive-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
            gap: 64,
            alignItems: 'flex-start',
            marginBottom: 48,
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
                marginBottom: 18,
              }}
            >
              {t.eyebrow}
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(48px, 6.2vw, 88px)',
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
              }}
            >
              Christian Del Barco.
            </h1>
            <p
              className="serif"
              style={{
                margin: '20px 0 0',
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.4,
                color: 'var(--text-secondary)',
                letterSpacing: '-0.01em',
                maxWidth: '24ch',
              }}
            >
              {t.subtitle}
            </p>
            <div style={{ marginTop: 32, display: 'grid', gap: 18, maxWidth: '58ch' }}>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {t.intro1}
              </p>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {t.intro2}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <Placeholder label={t.photoLabel} caption={t.photoCaption} aspect="4 / 5" />
            <div
              style={{
                display: 'grid',
                gap: 10,
                padding: '18px 20px',
                borderRadius: 14,
                background: 'var(--surface-subtle)',
                border: '0.5px solid var(--border)',
              }}
            >
              <MetaRow label={t.metaBase} value={t.metaBaseValue} />
              <MetaRow label={t.metaLangs} value={t.metaLangsValue} />
              <MetaRow label={t.metaSetup} value={t.metaSetupValue} />
            </div>
          </div>
        </header>
      </Reveal>

      {/* STATS narrativos */}
      <Reveal delay={0.1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
            paddingBlock: 36,
            marginBottom: 96,
            borderBlock: '0.5px solid var(--divider)',
          }}
        >
          {t.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Reveal>

      {/* ESTO CREO — filosofía con voz */}
      <section style={{ marginBottom: 96 }}>
        <Reveal>
          <header style={{ marginBottom: 48, maxWidth: '64ch' }}>
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
              {t.philEyebrow}
            </p>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: 'clamp(36px, 4.6vw, 64px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
              }}
            >
              {t.philTitle}
            </h2>
            <p
              style={{
                margin: '20px 0 0',
                fontSize: 15,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '52ch',
              }}
            >
              {t.philIntro}
            </p>
          </header>
        </Reveal>

        <Stagger gap={0.1} style={{ display: 'grid', gap: 0 }}>
          {beliefs.map((b) => (
            <StaggerItem key={b.n}>
              <article
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px minmax(0, 1fr)',
                  gap: 32,
                  paddingBlock: 28,
                  borderTop: '0.5px solid var(--divider)',
                }}
              >
                <p
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 24,
                    fontStyle: 'italic',
                    fontWeight: 500,
                    color: 'var(--accent)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {b.n}
                </p>
                <p
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {b.statement}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* TRAYECTORIA */}
      <section style={{ marginBottom: 96 }}>
        <Reveal>
          <header style={{ marginBottom: 48, maxWidth: '64ch' }}>
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
              {t.careerEyebrow}
            </p>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: 'clamp(36px, 4.6vw, 64px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
              }}
            >
              {t.careerTitle}
            </h2>
            <p
              style={{
                margin: '20px 0 0',
                fontSize: 15,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '52ch',
              }}
            >
              {t.careerIntro}
            </p>
          </header>
        </Reveal>

        <div style={{ display: 'grid', gap: 32 }}>
          {timeline.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article
                className="responsive-category-header"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
                  gap: 48,
                  alignItems: 'flex-start',
                  padding: '32px 0',
                  borderTop: '0.5px solid var(--divider)',
                }}
              >
                <div>
                  <p
                    className="serif"
                    style={{
                      margin: 0,
                      fontSize: 28,
                      fontStyle: 'italic',
                      fontWeight: 500,
                      color: 'var(--text)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                    }}
                  >
                    {item.period.split(' — ')[0]}
                  </p>
                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: 13,
                      color: 'var(--muted)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item.period}
                  </p>
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 500,
                      color: 'var(--text)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.role}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--muted)' }}>
                    {item.company} · {item.context}
                  </p>
                  <ul
                    style={{
                      margin: '20px 0 0',
                      padding: 0,
                      listStyle: 'none',
                      display: 'grid',
                      gap: 12,
                    }}
                  >
                    {item.bullets.slice(0, 3).map((b, j) => (
                      <li
                        key={j}
                        style={{
                          position: 'relative',
                          paddingLeft: 22,
                          fontSize: 15,
                          lineHeight: 1.65,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 10,
                            width: 10,
                            height: 2,
                            background: 'var(--accent)',
                            borderRadius: 1,
                          }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {item.techStack ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 999,
                            border: '0.5px solid var(--border-strong)',
                            fontSize: 11,
                            letterSpacing: '0.04em',
                            color: 'var(--muted)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS MATRIX */}
      <section style={{ marginBottom: 96 }}>
        <Reveal>
          <header style={{ marginBottom: 48, maxWidth: '64ch' }}>
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
              {t.skillsEyebrow}
            </p>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: 'clamp(36px, 4.6vw, 64px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
              }}
            >
              {t.skillsTitle}
            </h2>
            <p
              style={{
                margin: '20px 0 0',
                fontSize: 15,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '52ch',
              }}
            >
              {t.skillsIntro}
            </p>
          </header>
        </Reveal>

        <div style={{ display: 'grid', gap: 0 }}>
          {skillsMatrix.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.05}>
              <div
                className="responsive-category-header"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2.4fr)',
                  gap: 32,
                  paddingBlock: 24,
                  borderTop: '0.5px solid var(--divider)',
                  alignItems: 'baseline',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {group.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 999,
                        background: 'var(--surface-subtle)',
                        border: '0.5px solid var(--border)',
                        fontSize: 13,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCACIÓN + CV + DISPONIBILIDAD */}
      <section style={{ marginBottom: 96 }}>
        <Reveal>
          <header style={{ marginBottom: 40 }}>
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
              {t.formalEyebrow}
            </p>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
              }}
            >
              {t.formalTitle}
            </h2>
          </header>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 32,
            }}
          >
            <div>
              <p style={metaLabel}>{t.educationLabel}</p>
              <p style={{ margin: 0, fontSize: 16, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45 }}>
                {t.edu1}
              </p>
              <p style={{ margin: '4px 0 18px', fontSize: 13, color: 'var(--muted)' }}>{t.edu1Sub}</p>
              <p style={{ margin: 0, fontSize: 16, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45 }}>
                {t.edu2}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>{t.edu2Sub}</p>
            </div>

            <div>
              <p style={metaLabel}>{t.languagesLabel}</p>
              <p style={{ margin: 0, fontSize: 16, color: 'var(--text)' }}>
                {t.langEs} <span style={{ color: 'var(--muted)' }}>{t.langEsLevel}</span>
              </p>
              <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--text)' }}>
                {t.langEn} <span style={{ color: 'var(--muted)' }}>{t.langEnLevel}</span>
              </p>
              <p style={{ ...metaLabel, marginTop: 28 }}>{t.setupLabel}</p>
              <p style={{ margin: 0, fontSize: 16, color: 'var(--text)' }}>
                {t.setupValue} <span style={{ color: 'var(--muted)' }}>{t.setupValueSub}</span>
              </p>
            </div>

            <div>
              <p style={metaLabel}>{t.cvLabel}</p>
              <a
                href="/cv-es.pdf"
                download
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 15,
                  color: 'var(--text)',
                  borderBottom: '1px solid var(--accent)',
                  paddingBottom: 2,
                }}
              >
                {t.cvEs}
              </a>
              <br />
              <a
                href="/cv-en.pdf"
                download
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  marginTop: 12,
                }}
              >
                {t.cvEn}
              </a>
              <p style={{ margin: '20px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>
                {t.cvNote}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA final */}
      <Reveal>
        <div
          style={{
            padding: '48px 40px',
            borderRadius: 24,
            background: 'var(--surface-subtle)',
            border: '0.5px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 28,
            alignItems: 'center',
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
              {t.ctaEyebrow}
            </p>
            <h3
              className="serif"
              style={{
                margin: '8px 0 0',
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              {t.ctaTitle}
            </h3>
            <p
              style={{
                margin: '14px 0 0',
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                maxWidth: '46ch',
              }}
            >
              {t.ctaBody}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifySelf: 'end' }}>
            <ViewTransitionLink
              href={localizedPath('/contact', locale)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 22px',
                borderRadius: 999,
                background: 'var(--accent)',
                color: 'var(--text-inverse)',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t.ctaContact}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </ViewTransitionLink>
            <a
              href="https://linkedin.com/in/cdelbarco"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 22px',
                borderRadius: 999,
                border: '0.5px solid var(--border-strong)',
                background: 'transparent',
                color: 'var(--text)',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="serif"
        style={{
          margin: 0,
          fontSize: 'clamp(40px, 4.8vw, 64px)',
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
          margin: '8px 0 0',
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

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
      <span
        style={{
          fontSize: 11,
          color: 'var(--subtle)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

const metaLabel: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
  marginBottom: 14,
}
