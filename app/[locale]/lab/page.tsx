import type { Metadata } from 'next'
import { Reveal } from '@/app/components/Reveal'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'

import { ConfidenceCardDemo } from './_components/ConfidenceCardDemo'
import { MultiInputAIDemo } from './_components/MultiInputAIDemo'
import { SmartFilterChipsDemo } from './_components/SmartFilterChipsDemo'

import { BulkAllocationDemo } from './_components/BulkAllocationDemo'
import { TokenPlaygroundDemo } from './_components/TokenPlaygroundDemo'
import { VariableFontLabDemo } from './_components/VariableFontLabDemo'

import { InlineEditableCellDemo } from './_components/InlineEditableCellDemo'
import { NumberTickerDemo } from './_components/NumberTickerDemo'

import { StatusPillsDemo } from './_components/StatusPillsDemo'
import { EmptyStatesDemo } from './_components/EmptyStatesDemo'
import { localizedPath, toLocale, type Locale } from '@/lib/i18n'

type Demo = {
  id: string
  title: string
  description: string
  tags: string[]
  component: (locale: Locale) => React.ReactNode
}

type Category = {
  number: string
  eyebrow: string
  title: string
  subtitle: string
  demos: Demo[]
}

type LabContent = {
  metaDescription: string
  eyebrow: string
  title: string
  intro: string
  stats: {
    demos: string
    categories: string
    interactive: string
    screenshots: string
  }
  ctaEyebrow: string
  ctaTitle: string
  ctaButton: string
  demoSingular: string
  demoPlural: string
  categories: Category[]
}

const LAB: Record<Locale, LabContent> = {
  es: {
    metaDescription:
      'Diez componentes funcionales en vivo: AI patterns, design system foundations, data UI y UX patterns. Se pueden manipular, no son capturas.',
    eyebrow: 'Lab',
    title: 'Componentes que funcionan.',
    intro:
      'Demos en vivo, no capturas. Puedes manipularlos directamente: son los mismos componentes que uso para llevar producto a producción. Cada uno resuelve un patrón concreto que aparece en los SaaS de hoy, desde la confianza en la IA hasta los detalles pequeños que solo se notan cuando faltan.',
    stats: {
      demos: 'Demos funcionales',
      categories: 'Categorías',
      interactive: 'Interactivos',
      screenshots: 'Capturas',
    },
    ctaEyebrow: '¿Quieres ver cómo se usan en producto?',
    ctaTitle: 'Mira los case studies.',
    ctaButton: 'Ver trabajo →',
    demoSingular: 'demo',
    demoPlural: 'demos',
    categories: [
      {
        number: '01',
        eyebrow: 'AI Patterns',
        title: 'Diseñar inteligencia visible.',
        subtitle:
          'Patrones para productos donde la IA es protagonista. Confianza que se muestra, lógica que se puede inspeccionar, y acciones masivas que respetan un umbral de seguridad.',
        demos: [
          {
            id: 'confidence-card',
            title: 'Tarjeta de aprobación por confianza',
            description:
              'Cada recomendación de la IA muestra su nivel de confianza como porcentaje y como barra. Al expandir una fila se ven los datos detrás del razonamiento. La aprobación masiva solo se aplica por encima del umbral.',
            tags: ['AI UX', 'Confianza', 'Acciones masivas'],
            component: (locale) => <ConfidenceCardDemo locale={locale} />,
          },
          {
            id: 'multi-input-ai',
            title: 'Asistente IA multi-input',
            description:
              'La misma intención se puede expresar por voz, por lenguaje natural o pegando datos estructurados. Las tres rutas terminan en la misma pantalla de revisión.',
            tags: ['AI UX', 'Modos de entrada', 'Convergencia'],
            component: (locale) => <MultiInputAIDemo locale={locale} />,
          },
          {
            id: 'smart-filter-chips',
            title: 'Filtros inteligentes con contador',
            description:
              'Filtros combinables, cada uno con su contador en vivo. La lista se reordena con una animación cuando cambia la selección.',
            tags: ['Data UI', 'Filtros', 'Conteo en vivo'],
            component: (locale) => <SmartFilterChipsDemo locale={locale} />,
          },
        ],
      },
      {
        number: '02',
        eyebrow: 'Design System Foundations',
        title: 'Las piezas que se repiten.',
        subtitle:
          'Componentes base que aparecen en cualquier producto de cierta escala. Los muestro sin contexto, en su forma más cruda, para que se lean como un sistema y no como una pantalla suelta.',
        demos: [
          {
            id: 'bulk-allocation',
            title: 'Selector de asignación masiva',
            description:
              'Asignar varios roles a un proyecto en una sola operación, con cantidad por rol y el total recalculado en vivo.',
            tags: ['Patrones masivos', 'Formularios', 'Total en vivo'],
            component: (locale) => <BulkAllocationDemo locale={locale} />,
          },
          {
            id: 'token-playground',
            title: 'Playground de design tokens',
            description:
              'Tokens controlados por sliders, con preview en vivo. Los presets simulan cómo se vería el sistema con otra marca.',
            tags: ['Tokens', 'Temas', 'Re-skin'],
            component: (locale) => <TokenPlaygroundDemo locale={locale} />,
          },
          {
            id: 'variable-font-lab',
            title: 'Laboratorio de ejes tipográficos',
            description:
              'Sliders de peso y ancho con preview en vivo, presets, y el CSS exacto de salida.',
            tags: ['Tipografía', 'Fuentes variables', 'CSS'],
            component: (locale) => <VariableFontLabDemo locale={locale} />,
          },
        ],
      },
      {
        number: '03',
        eyebrow: 'Data UI',
        title: 'Donde la decisión vive.',
        subtitle:
          'Patrones para pantallas con mucha información: edición en línea sin modales y métricas que comunican cambio y dirección.',
        demos: [
          {
            id: 'inline-editable-cell',
            title: 'Celda editable en línea',
            description:
              'Una tabla donde cada celda se vuelve editable al hacer clic. Enter guarda, Esc cancela, y un clic afuera también guarda.',
            tags: ['Tablas', 'Edición en línea', 'Teclado'],
            component: (locale) => <InlineEditableCellDemo locale={locale} />,
          },
          {
            id: 'number-ticker',
            title: 'Indicador numérico con delta',
            description:
              'Cuando una métrica cambia, comunica el valor, cuánto se movió y hacia dónde.',
            tags: ['Métricas', 'Motion', 'Cifras tabulares'],
            component: (locale) => <NumberTickerDemo locale={locale} />,
          },
        ],
      },
      {
        number: '04',
        eyebrow: 'UX Patterns',
        title: 'Detalles que se notan cuando faltan.',
        subtitle:
          'Status pills sistematizados y empty states que no se limitan a decir que no hay datos.',
        demos: [
          {
            id: 'status-pills',
            title: 'Sistema de status pills',
            description:
              '5 tipos semánticos por 3 variantes y 3 tamaños, con punto opcional.',
            tags: ['Estados', 'Variantes', 'Tamaños'],
            component: (locale) => <StatusPillsDemo locale={locale} />,
          },
          {
            id: 'empty-states',
            title: 'Galería de empty states',
            description:
              'Cada empty state funciona como un pequeño onboarding: nombra el problema, da contexto y ofrece la salida.',
            tags: ['Empty states', 'UX writing', 'Onboarding'],
            component: (locale) => <EmptyStatesDemo locale={locale} />,
          },
        ],
      },
    ],
  },
  en: {
    metaDescription:
      'Ten live functional components: AI patterns, design system foundations, data UI, and UX patterns. Interactive demos, not screenshots.',
    eyebrow: 'Lab',
    title: 'Components that actually work.',
    intro:
      'Live demos, not screenshots. You can manipulate them directly: they are the same kinds of components I use to ship product to production. Each one solves a concrete SaaS pattern, from trust in AI to the small details that only become visible when they are missing.',
    stats: {
      demos: 'Functional demos',
      categories: 'Categories',
      interactive: 'Interactive',
      screenshots: 'Screenshots',
    },
    ctaEyebrow: 'Want to see how they work inside real products?',
    ctaTitle: 'Explore the case studies.',
    ctaButton: 'See work →',
    demoSingular: 'demo',
    demoPlural: 'demos',
    categories: [
      {
        number: '01',
        eyebrow: 'AI Patterns',
        title: 'Designing visible intelligence.',
        subtitle:
          'Patterns for products where AI is central: visible confidence, inspectable reasoning, and bulk actions that respect a safety threshold.',
        demos: [
          {
            id: 'confidence-card',
            title: 'Confidence approval card',
            description:
              'Each AI recommendation shows its confidence level as a percentage and a bar. Expanding a row reveals the signals behind the reasoning.',
            tags: ['AI UX', 'Confidence', 'Bulk actions'],
            component: (locale) => <ConfidenceCardDemo locale={locale} />,
          },
          {
            id: 'multi-input-ai',
            title: 'Multi-input AI assistant',
            description:
              'The same intent can start from voice, natural language, or pasted structured data. All paths converge into the same review screen.',
            tags: ['AI UX', 'Input modes', 'Convergence'],
            component: (locale) => <MultiInputAIDemo locale={locale} />,
          },
          {
            id: 'smart-filter-chips',
            title: 'Smart filter chips with counts',
            description:
              'Composable filters, each with a live count. The list reorders with motion when the selection changes.',
            tags: ['Data UI', 'Filters', 'Live counts'],
            component: (locale) => <SmartFilterChipsDemo locale={locale} />,
          },
        ],
      },
      {
        number: '02',
        eyebrow: 'Design System Foundations',
        title: 'The pieces that repeat.',
        subtitle:
          'Foundational components that show up in any scaled product, shown in their raw form so they read as a system, not as isolated screens.',
        demos: [
          {
            id: 'bulk-allocation',
            title: 'Bulk allocation selector',
            description:
              'Assign multiple roles to a project in one operation, with quantities per role and a live recalculated total.',
            tags: ['Bulk patterns', 'Forms', 'Live total'],
            component: (locale) => <BulkAllocationDemo locale={locale} />,
          },
          {
            id: 'token-playground',
            title: 'Design tokens playground',
            description:
              'Tokens controlled by sliders, with a live preview. Presets simulate how the system would behave with another brand layer.',
            tags: ['Tokens', 'Themes', 'Re-skin'],
            component: (locale) => <TokenPlaygroundDemo locale={locale} />,
          },
          {
            id: 'variable-font-lab',
            title: 'Variable font axis lab',
            description:
              'Weight and width sliders with a live preview, presets, and the exact CSS output.',
            tags: ['Typography', 'Variable fonts', 'CSS'],
            component: (locale) => <VariableFontLabDemo locale={locale} />,
          },
        ],
      },
      {
        number: '03',
        eyebrow: 'Data UI',
        title: 'Where decisions happen.',
        subtitle:
          'Patterns for dense information screens: inline editing without modals and metrics that communicate value, movement, and direction.',
        demos: [
          {
            id: 'inline-editable-cell',
            title: 'Inline editable cell',
            description:
              'A table where each cell becomes editable on click. Enter saves, Esc cancels, and clicking away also saves.',
            tags: ['Tables', 'Inline editing', 'Keyboard'],
            component: (locale) => <InlineEditableCellDemo locale={locale} />,
          },
          {
            id: 'number-ticker',
            title: 'Number ticker with delta',
            description:
              'When a metric changes, it communicates the value, how much it moved, and in which direction.',
            tags: ['Metrics', 'Motion', 'Tabular numbers'],
            component: (locale) => <NumberTickerDemo locale={locale} />,
          },
        ],
      },
      {
        number: '04',
        eyebrow: 'UX Patterns',
        title: 'Details you notice when they are missing.',
        subtitle:
          'Systematized status pills and empty states that do more than say there is no data.',
        demos: [
          {
            id: 'status-pills',
            title: 'Status pill system',
            description:
              'Five semantic types across three variants and three sizes, with an optional status dot.',
            tags: ['Status', 'Variants', 'Sizes'],
            component: (locale) => <StatusPillsDemo locale={locale} />,
          },
          {
            id: 'empty-states',
            title: 'Empty states gallery',
            description:
              'Each empty state works like a small onboarding moment: it names the problem, gives context, and offers the next step.',
            tags: ['Empty states', 'UX writing', 'Onboarding'],
            component: (locale) => <EmptyStatesDemo locale={locale} />,
          },
        ],
      },
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  return {
    title: 'Lab',
    description: LAB[locale].metaDescription,
    alternates: {
      canonical: localizedPath('/lab', locale),
      languages: { es: '/lab', en: '/en/lab', 'x-default': '/lab' },
    },
  }
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await params).locale)
  const t = LAB[locale]
  const totalDemos = t.categories.reduce((sum, c) => sum + c.demos.length, 0)

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
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
            }}
          >
            {t.intro}
          </p>
        </header>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
            paddingBlock: 32,
            marginBottom: 64,
            borderBlock: '0.5px solid var(--divider)',
          }}
        >
          <Stat label={t.stats.demos} value={totalDemos.toString()} />
          <Stat label={t.stats.categories} value={t.categories.length.toString()} />
          <Stat label={t.stats.interactive} value="100%" />
          <Stat label={t.stats.screenshots} value="0" />
        </div>
      </Reveal>

      {t.categories.map((cat) => (
        <CategorySection
          key={cat.number}
          category={cat}
          locale={locale}
          demoSingular={t.demoSingular}
          demoPlural={t.demoPlural}
        />
      ))}

      <Reveal>
        <div
          style={{
            marginTop: 56,
            padding: '36px 32px',
            borderRadius: 22,
            background: 'var(--surface-subtle)',
            border: '0.5px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
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
                fontSize: 24,
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
              }}
            >
              {t.ctaTitle}
            </h3>
          </div>
          <ViewTransitionLink
            href={localizedPath('/trabajo', locale)}
            style={{
              justifySelf: 'end',
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
            {t.ctaButton}
          </ViewTransitionLink>
        </div>
      </Reveal>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
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

function CategorySection({
  category,
  locale,
  demoSingular,
  demoPlural,
}: {
  category: Category
  locale: Locale
  demoSingular: string
  demoPlural: string
}) {
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
            marginBottom: 48,
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
              {category.number} · {category.eyebrow}
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
              {category.title}
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
              {category.subtitle}
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
              {category.demos.length} {category.demos.length === 1 ? demoSingular : demoPlural}
            </p>
          </div>
        </header>
      </Reveal>

      <div style={{ display: 'grid', gap: 32 }}>
        {category.demos.map((demo, i) => (
          <Reveal key={demo.id} delay={i * 0.06}>
            <DemoCard demo={demo} locale={locale} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function DemoCard({ demo, locale }: { demo: Demo; locale: Locale }) {
  return (
    <article
      style={{
        borderRadius: 22,
        background: 'var(--panel)',
        border: '0.5px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <header
        className="responsive-category-header"
        style={{
          padding: '24px 28px',
          borderBottom: '0.5px solid var(--divider)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 20,
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 500,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            {demo.title}
          </h3>
          <p
            style={{
              margin: '8px 0 0',
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '64ch',
            }}
          >
            {demo.description}
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end' }}>
          {demo.tags.map((t) => (
            <span
              key={t}
              style={{
                padding: '3px 9px',
                borderRadius: 999,
                border: '0.5px solid var(--border-strong)',
                fontSize: 10,
                letterSpacing: '0.06em',
                color: 'var(--muted)',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </header>
      <div style={{ padding: 28 }}>{demo.component(locale)}</div>
    </article>
  )
}
