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

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Diez componentes funcionales en vivo: AI patterns, design system foundations, data UI y UX patterns. Se pueden manipular, no son capturas.',
}

type Demo = {
  id: string
  title: string
  description: string
  tags: string[]
  component: React.ReactNode
}

type Category = {
  number: string
  eyebrow: string
  title: string
  subtitle: string
  demos: Demo[]
}

const CATEGORIES: Category[] = [
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
        component: <ConfidenceCardDemo />,
      },
      {
        id: 'multi-input-ai',
        title: 'Asistente IA multi-input',
        description:
          'La misma intención se puede expresar por voz, por lenguaje natural o pegando datos estructurados. Las tres rutas terminan en la misma pantalla de revisión. La entrada es flexible; la verificación, siempre la misma.',
        tags: ['AI UX', 'Modos de entrada', 'Convergencia'],
        component: <MultiInputAIDemo />,
      },
      {
        id: 'smart-filter-chips',
        title: 'Filtros inteligentes con contador',
        description:
          'Filtros combinables, cada uno con su contador en vivo. Se acumulan: categoría y estado filtran al mismo tiempo. La lista se reordena con una animación cuando cambia la selección.',
        tags: ['Data UI', 'Filtros', 'Conteo en vivo'],
        component: <SmartFilterChipsDemo />,
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
          'Asignar varios roles a un proyecto en una sola operación, con cantidad por rol y el total recalculado en vivo. Reemplaza el patrón de un rol a la vez, que obliga a repetir el mismo flujo una y otra vez.',
        tags: ['Patrones masivos', 'Formularios', 'Total en vivo'],
        component: <BulkAllocationDemo />,
      },
      {
        id: 'token-playground',
        title: 'Playground de design tokens',
        description:
          'Tokens (color de acento, radio, peso) controlados por sliders, con preview en vivo. Los presets simulan cómo se vería el sistema con otra marca: una capa de alias permite cambiar el branding sin tocar los componentes.',
        tags: ['Tokens', 'Temas', 'Re-skin'],
        component: <TokenPlaygroundDemo />,
      },
      {
        id: 'variable-font-lab',
        title: 'Laboratorio de ejes tipográficos',
        description:
          'Una fuente variable no es un puñado de pesos sueltos: son ejes que se interpolan. Sliders de peso y ancho con preview en vivo, presets, y el CSS exacto de salida. Sirve para validar font-variation-settings antes de llevarlo a producción.',
        tags: ['Tipografía', 'Fuentes variables', 'CSS'],
        component: <VariableFontLabDemo />,
      },
    ],
  },
  {
    number: '03',
    eyebrow: 'Data UI',
    title: 'Donde la decisión vive.',
    subtitle:
      'Patrones para pantallas con mucha información. Edición en línea sin modales, y métricas que comunican el cambio y la dirección sin obligar a leer un párrafo.',
    demos: [
      {
        id: 'inline-editable-cell',
        title: 'Celda editable en línea',
        description:
          'Una tabla donde cada celda se vuelve editable al hacer clic. Sin modal y sin expandir la fila. Enter guarda, Esc cancela, y un clic afuera también guarda. Los campos numéricos se validan en línea.',
        tags: ['Tablas', 'Edición en línea', 'Teclado'],
        component: <InlineEditableCellDemo />,
      },
      {
        id: 'number-ticker',
        title: 'Indicador numérico con delta',
        description:
          'Cuando una métrica cambia, tiene que comunicar el valor, cuánto se movió y hacia dónde. El número se anima al cambiar, y la píldora de delta cambia de color según el signo. Usa cifras tabulares para que todo quede alineado.',
        tags: ['Métricas', 'Motion', 'Cifras tabulares'],
        component: <NumberTickerDemo />,
      },
    ],
  },
  {
    number: '04',
    eyebrow: 'UX Patterns',
    title: 'Detalles que se notan cuando faltan.',
    subtitle:
      'Status pills bien sistematizados y empty states que no se limitan a decir que no hay datos. Cosas que la mayoría de los productos hace mal y que un buen design system resuelve una sola vez, para todas las pantallas.',
    demos: [
      {
        id: 'status-pills',
        title: 'Sistema de status pills',
        description:
          '5 tipos semánticos por 3 variantes (sólida, suave, contorno) por 3 tamaños, con punto opcional. 90 combinaciones de un solo componente, todas visibles con un control.',
        tags: ['Estados', 'Variantes', 'Tamaños'],
        component: <StatusPillsDemo />,
      },
      {
        id: 'empty-states',
        title: 'Galería de empty states',
        description:
          'Cada empty state funciona como un pequeño onboarding. El título nombra el problema, el texto da el contexto y el botón ofrece la salida. Nunca un "no hay datos" genérico: siempre con voz humana.',
        tags: ['Empty states', 'UX writing', 'Onboarding'],
        component: <EmptyStatesDemo />,
      },
    ],
  },
]

export default function LabPage() {
  const totalDemos = CATEGORIES.reduce((sum, c) => sum + c.demos.length, 0)

  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 1080 }}>
      {/* Header */}
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
            Lab
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
            Componentes que funcionan.
          </h1>
          <p
            style={{
              margin: '24px 0 0',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
            }}
          >
            Demos en vivo, no capturas. Puedes manipularlos directamente: son los mismos
            componentes que uso para llevar producto a producción. Cada uno resuelve un patrón
            concreto que aparece en los SaaS de hoy, desde la confianza en la IA hasta los detalles
            pequeños que solo se notan cuando faltan.
          </p>
        </header>
      </Reveal>

      {/* Overview stats */}
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
          <Stat label="Demos funcionales" value={totalDemos.toString()} />
          <Stat label="Categorías" value={CATEGORIES.length.toString()} />
          <Stat label="Interactivos" value="100%" />
          <Stat label="Capturas" value="0" />
        </div>
      </Reveal>

      {/* Categories */}
      {CATEGORIES.map((cat) => (
        <CategorySection key={cat.number} category={cat} />
      ))}

      {/* CTA */}
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
              ¿Quieres ver cómo se usan en producto?
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
              Mira los case studies.
            </h3>
          </div>
          <ViewTransitionLink
            href="/trabajo"
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
            Ver trabajo →
          </ViewTransitionLink>
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

function CategorySection({ category }: { category: Category }) {
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
              {category.demos.length} {category.demos.length === 1 ? 'demo' : 'demos'}
            </p>
          </div>
        </header>
      </Reveal>

      <div style={{ display: 'grid', gap: 32 }}>
        {category.demos.map((demo, i) => (
          <Reveal key={demo.id} delay={i * 0.06}>
            <DemoCard demo={demo} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function DemoCard({ demo }: { demo: Demo }) {
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
      <div style={{ padding: 28 }}>{demo.component}</div>
    </article>
  )
}
