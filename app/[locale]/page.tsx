import { HeroScroll } from '@/app/components/HeroScroll'
import { CaseStudyCard } from '@/app/components/CaseStudyCard'
import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import { getCases, getFeaturedCases } from '@/lib/cases'
import { getPublishedPosts } from '@/lib/posts'
import { localizedPath, toLocale, type Locale } from '@/lib/i18n'

type Principle = { n: string; title: string; body: string }
type LabItem = { title: string; body: string }
type HomeContent = {
  featuredEyebrow: string
  featuredTitle: string
  featuredBody: string
  moreOne: string
  moreMany: string
  moreTitle: string
  moreBody: string
  seeAll: string
  labEyebrow: string
  labTitle: string
  labBody: string
  labCta: string
  labItems: LabItem[]
  writingEyebrow: string
  writingTitle: string
  writingBody: string
  writingCta: string
  readArticle: string
  howEyebrow: string
  howTitle: string
  howBody: string
  principles: Principle[]
}

const HOME: Record<Locale, HomeContent> = {
  es: {
    featuredEyebrow: 'Trabajo destacado',
    featuredTitle: 'Los proyectos que mejor muestran cómo trabajo.',
    featuredBody:
      'Marketplaces, B2B SaaS y un design challenge reciente. De cada uno cuento el problema, las decisiones que tomé y cómo le fue.',
    moreOne: 'proyecto más',
    moreMany: 'proyectos más',
    moreTitle: 'El paso por agencia y tres exploraciones personales.',
    moreBody:
      'También hay contexto de marca, agencia, productos conceptuales y exploraciones personales que completan la historia.',
    seeAll: 'Ver todos los case studies',
    labEyebrow: 'Lab',
    labTitle: 'Componentes, patrones y experimentos vivos.',
    labBody:
      'Un espacio para probar interacciones, estados, tokens y pequeñas decisiones de interfaz que suelen perderse cuando solo se muestran pantallas finales.',
    labCta: 'Explorar Lab',
    labItems: [
      {
        title: 'Multi-input AI',
        body: 'Voz, texto y datos estructurados convergiendo en un mismo resultado editable.',
      },
      {
        title: 'Design tokens',
        body: 'Color, tipografía y estados como decisiones de sistema, no como valores sueltos.',
      },
      {
        title: 'Empty states',
        body: 'Microcopy y jerarquía para convertir ausencia de datos en orientación real.',
      },
    ],
    writingEyebrow: 'Blog',
    writingTitle: 'Escribo sobre decisiones de producto.',
    writingBody:
      'Notas sobre diseño operacional, IA en interfaces complejas, design systems y el cruce entre diseño e ingeniería.',
    writingCta: 'Ir al Blog',
    readArticle: 'Leer artículo',
    howEyebrow: 'Cómo trabajo',
    howTitle: 'Diseño que sobrevive al contacto con ingeniería.',
    howBody:
      'Cuatro principios que aplico desde el discovery hasta el commit final. Sin ellos, el diseño se queda en Figma.',
    principles: [
      {
        n: '01',
        title: 'Diseño desde el problema.',
        body: 'Antes de abrir Figma necesito entender el problema y el contexto de negocio. Una decisión de UX que no se puede explicar fuera de Figma rara vez sobrevive mucho tiempo.',
      },
      {
        n: '02',
        title: 'Pienso en sistemas.',
        body: 'Tokens, componentes y un acuerdo claro entre diseño e ingeniería sobre cómo se construye. Un design system no sirve si vive solo en Figma; tiene que existir también en el código.',
      },
      {
        n: '03',
        title: 'Cuando ayuda, escribo el código.',
        body: 'Sé programar frontend y lo uso cuando acorta el camino entre una idea y algo que funciona. No reemplazo a ingeniería; hago que el traspaso entre diseño y desarrollo cueste menos.',
      },
      {
        n: '04',
        title: 'Los trade-offs van escritos.',
        body: 'Cada decisión importante tiene un costo, y prefiero dejarlo anotado desde el brief. Sale mucho más caro descubrir un trade-off en un PR que haberlo discutido antes.',
      },
    ],
  },
  en: {
    featuredEyebrow: 'Selected work',
    featuredTitle: 'The projects that best show how I work.',
    featuredBody:
      'Marketplaces, B2B SaaS, and a recent design challenge. For each one I walk through the problem, the decisions I made, and how it turned out.',
    moreOne: 'more project',
    moreMany: 'more projects',
    moreTitle: 'The agency years and three personal explorations.',
    moreBody:
      'There is also brand work, agency context, concept products, and personal explorations that round out the story.',
    seeAll: 'See all case studies',
    labEyebrow: 'Lab',
    labTitle: 'Live components, patterns, and experiments.',
    labBody:
      'A space to test interactions, states, tokens, and small interface decisions that often disappear when only final screens are shown.',
    labCta: 'Explore Lab',
    labItems: [
      {
        title: 'Multi-input AI',
        body: 'Voice, text, and structured data converging into one editable result.',
      },
      {
        title: 'Design tokens',
        body: 'Color, type, and states treated as system decisions, not isolated values.',
      },
      {
        title: 'Empty states',
        body: 'Microcopy and hierarchy that turn missing data into real orientation.',
      },
    ],
    writingEyebrow: 'Blog',
    writingTitle: 'I write about product decisions.',
    writingBody:
      'Notes on operational design, AI in complex interfaces, design systems, and the crossover between design and engineering.',
    writingCta: 'Go to Blog',
    readArticle: 'Read article',
    howEyebrow: 'How I work',
    howTitle: 'Design that survives contact with engineering.',
    howBody:
      'Four principles I apply from discovery to the final commit. Without them, design stays stuck in Figma.',
    principles: [
      {
        n: '01',
        title: 'I design from the problem.',
        body: "Before I open Figma I need to understand the problem and the business context. A UX decision you can't explain outside of Figma rarely survives for long.",
      },
      {
        n: '02',
        title: 'I think in systems.',
        body: 'Tokens, components, and a clear agreement between design and engineering on how things get built. A design system is useless if it only lives in Figma; it has to exist in the code too.',
      },
      {
        n: '03',
        title: 'When it helps, I write the code.',
        body: "I can build frontend, and I use it when it shortens the path between an idea and something that works. I don't replace engineering; I make the handoff between design and development cost less.",
      },
      {
        n: '04',
        title: 'Trade-offs go in writing.',
        body: "Every important decision has a cost, and I'd rather note it down from the brief. It's far more expensive to discover a trade-off in a PR than to have discussed it beforehand.",
      },
    ],
  },
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await params).locale)
  const t = HOME[locale]
  const featured = getFeaturedCases(locale)
  const remainingCount = getCases(locale).length - featured.length
  const [latestPost] = getPublishedPosts(locale)

  return (
    <>
      <HeroScroll locale={locale} />

      <section
        style={{
          paddingBlock: '80px 40px',
          position: 'relative',
          zIndex: 1,
          background: 'var(--bg)',
        }}
        id="trabajo-destacado"
      >
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 40 }}>
              <div>
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
                  {t.featuredEyebrow}
                </p>
                <h2
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                  }}
                >
                  {t.featuredTitle}
                </h2>
                <p
                  style={{
                    margin: '20px 0 0',
                    maxWidth: '46ch',
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t.featuredBody}
                </p>
              </div>
            </div>
          </Reveal>

          <Stagger gap={0.1} style={{ display: 'grid', gap: 16 }}>
            {featured.map((c) => (
              <StaggerItem key={c.slug}>
                <CaseStudyCard caseStudy={c} locale={locale} size="lg" />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <div
              style={{
                marginTop: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                padding: '28px 32px',
                borderRadius: 20,
                border: '0.5px solid var(--border)',
                background: 'var(--surface-subtle)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ maxWidth: '58ch' }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--subtle)',
                  }}
                >
                  {remainingCount}{' '}
                  {remainingCount === 1 ? t.moreOne : t.moreMany}
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
                  {t.moreTitle}
                </p>
                <p
                  style={{
                    margin: '8px 0 0',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t.moreBody}
                </p>
              </div>
              <ViewTransitionLink
                href={localizedPath('/trabajo', locale)}
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
                  letterSpacing: '0.01em',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                {t.seeAll}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </ViewTransitionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        style={{
          paddingBlock: '64px 40px',
          position: 'relative',
          zIndex: 1,
          background: 'var(--bg)',
        }}
        id="lab-preview"
      >
        <div className="container">
          <Reveal>
            <div
              className="responsive-category-header"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.35fr)',
                gap: 64,
                alignItems: 'start',
                paddingBlock: 40,
                borderTop: '0.5px solid var(--divider)',
                borderBottom: '0.5px solid var(--divider)',
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
                    marginBottom: 12,
                  }}
                >
                  {t.labEyebrow}
                </p>
                <h2
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(28px, 3.4vw, 44px)',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                  }}
                >
                  {t.labTitle}
                </h2>
                <p
                  style={{
                    margin: '18px 0 0',
                    maxWidth: '44ch',
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t.labBody}
                </p>
                <ViewTransitionLink
                  href={localizedPath('/lab', locale)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 24,
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--accent)',
                  }}
                >
                  {t.labCta}
                  <span aria-hidden>→</span>
                </ViewTransitionLink>
              </div>

              <Stagger gap={0.1} style={{ display: 'grid', gap: 0 }}>
                {t.labItems.map((item, i) => (
                  <StaggerItem key={item.title}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '44px minmax(0, 1fr)',
                        gap: 18,
                        paddingBlock: 22,
                        borderTop: i === 0 ? 'none' : '0.5px solid var(--divider)',
                      }}
                    >
                      <span
                        className="serif"
                        style={{
                          fontSize: 14,
                          fontStyle: 'italic',
                          color: 'var(--accent)',
                          marginTop: 3,
                        }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: 'var(--text)' }}>
                          {item.title}
                        </p>
                        <p
                          style={{
                            margin: '6px 0 0',
                            fontSize: 14,
                            lineHeight: 1.65,
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>

      {latestPost ? (
        <section
          style={{
            paddingBlock: '64px 40px',
            position: 'relative',
            zIndex: 1,
            background: 'var(--bg)',
          }}
          id="blog-preview"
        >
          <div className="container">
            <Reveal>
              <div
                className="responsive-category-header"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.35fr)',
                  gap: 64,
                  alignItems: 'start',
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
                      marginBottom: 12,
                    }}
                  >
                    {t.writingEyebrow}
                  </p>
                  <h2
                    className="serif"
                    style={{
                      margin: 0,
                      fontSize: 'clamp(28px, 3.4vw, 44px)',
                      fontWeight: 500,
                      fontStyle: 'italic',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      color: 'var(--text)',
                    }}
                  >
                    {t.writingTitle}
                  </h2>
                  <p
                    style={{
                      margin: '18px 0 0',
                      maxWidth: '44ch',
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {t.writingBody}
                  </p>
                </div>

                <div
                  style={{
                    paddingBlock: 28,
                    borderTop: '0.5px solid var(--divider)',
                    borderBottom: '0.5px solid var(--divider)',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--subtle)',
                    }}
                  >
                    {latestPost.category} · {latestPost.readingMinutes} min
                  </p>
                  <h3
                    style={{
                      margin: '14px 0 0',
                      fontSize: 'clamp(22px, 2.5vw, 32px)',
                      fontWeight: 500,
                      lineHeight: 1.18,
                      letterSpacing: '-0.02em',
                      color: 'var(--text)',
                    }}
                  >
                    {latestPost.title}
                  </h3>
                  <p
                    style={{
                      margin: '14px 0 0',
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {latestPost.excerpt}
                  </p>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginTop: 24 }}>
                    <ViewTransitionLink
                      href={localizedPath(`/escribo/${latestPost.slug}`, locale)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '12px 18px',
                        borderRadius: 999,
                        background: 'var(--accent)',
                        color: 'var(--text-inverse)',
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {t.readArticle}
                      <span aria-hidden>→</span>
                    </ViewTransitionLink>
                    <ViewTransitionLink
                      href={localizedPath('/escribo', locale)}
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {t.writingCta}
                    </ViewTransitionLink>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section
        style={{
          paddingBlock: '80px 40px',
          position: 'relative',
          zIndex: 1,
          background: 'var(--bg)',
        }}
        id="how-i-work"
      >
        <div className="container">
          <Reveal>
            <div className="responsive-category-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: 80, alignItems: 'flex-start' }}>
              <div>
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
                  {t.howEyebrow}
                </p>
                <h2
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(28px, 3.4vw, 44px)',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                  }}
                >
                  {t.howTitle}
                </h2>
                <p
                  style={{
                    margin: '18px 0 0',
                    maxWidth: '42ch',
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t.howBody}
                </p>
              </div>
              <Stagger gap={0.12} style={{ display: 'grid', gap: 24 }}>
                {t.principles.map((it) => (
                  <StaggerItem key={it.n} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <span
                      className="serif"
                      style={{
                        fontSize: 14,
                        fontStyle: 'italic',
                        color: 'var(--accent)',
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    >
                      {it.n}
                    </span>
                    <div>
                      <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.005em' }}>
                        {it.title}
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                        {it.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
