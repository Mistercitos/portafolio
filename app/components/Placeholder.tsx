import type { CSSProperties } from 'react'

type Variant = 'hero' | 'gallery' | 'mobile' | 'process'

type Props = {
  label: string
  caption?: string
  /** CSS aspect-ratio value, ej "16 / 9", "4 / 3", "9 / 19.5". Override automatic por variant. */
  aspect?: string
  variant?: Variant
  style?: CSSProperties
}

const ASPECT_BY_VARIANT: Record<Variant, string> = {
  hero: '16 / 9',
  gallery: '4 / 3',
  mobile: '9 / 19.5',
  process: '3 / 2',
}

/**
 * Placeholder visual para spots donde irán imágenes reales (hero shots, galleries,
 * mobile flows, process artifacts). Intencional, no "imagen rota".
 *
 * Cuando Christian suba imágenes reales se reemplaza por <Image> de next/image
 * directamente — el aspect ratio y el spot ya están definidos.
 */
export function Placeholder({ label, caption, aspect, variant = 'gallery', style }: Props) {
  const ratio = aspect ?? ASPECT_BY_VARIANT[variant]
  const isMobile = variant === 'mobile'

  return (
    <figure
      role="img"
      aria-label={`Imagen pendiente: ${label}`}
      style={{
        margin: 0,
        width: isMobile ? 'fit-content' : '100%',
        maxWidth: isMobile ? 240 : '100%',
        aspectRatio: ratio,
        borderRadius: variant === 'hero' ? 24 : 16,
        background: 'var(--surface-subtle)',
        border: '0.5px dashed var(--border-strong)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Cross-hatch sutil de fondo (papel técnico) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            135deg,
            transparent 0,
            transparent 22px,
            var(--divider) 22px,
            var(--divider) 23px
          )`,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Marcadores de esquina */}
      {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((pos) => (
        <CornerMark key={pos} pos={pos} />
      ))}

      {/* Contenido centrado */}
      <figcaption
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '20px 24px',
          textAlign: 'center',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--muted)' }}
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p
          className="serif"
          style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            maxWidth: '32ch',
          }}
        >
          {label}
        </p>
        {caption ? (
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
            }}
          >
            {caption}
          </p>
        ) : null}
      </figcaption>
    </figure>
  )
}

function CornerMark({ pos }: { pos: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const [v, h] = pos.split('-') as ['top' | 'bottom', 'left' | 'right']
  const offset = 12
  const size = 10
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        [v]: offset,
        [h]: offset,
        width: size,
        height: size,
        borderTop: v === 'top' ? `0.5px solid var(--border-strong)` : 'none',
        borderBottom: v === 'bottom' ? `0.5px solid var(--border-strong)` : 'none',
        borderLeft: h === 'left' ? `0.5px solid var(--border-strong)` : 'none',
        borderRight: h === 'right' ? `0.5px solid var(--border-strong)` : 'none',
      }}
    />
  )
}
