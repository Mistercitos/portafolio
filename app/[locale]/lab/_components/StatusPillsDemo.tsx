'use client'

import { useState } from 'react'

const STATUSES = [
  { label: 'Activo', kind: 'success' },
  { label: 'En revisión', kind: 'warning' },
  { label: 'Pausado', kind: 'neutral' },
  { label: 'Crítico', kind: 'critical' },
  { label: 'Listo', kind: 'info' },
] as const

type Kind = (typeof STATUSES)[number]['kind']
type Size = 'sm' | 'md' | 'lg'
type Variant = 'solid' | 'soft' | 'outline'

const COLORS: Record<Kind, { bg: string; fg: string; ring: string }> = {
  success: { bg: '#10B981', fg: '#FFFFFF', ring: 'rgba(16, 185, 129, 0.35)' },
  warning: { bg: '#F59E0B', fg: '#3A2400', ring: 'rgba(245, 158, 11, 0.35)' },
  neutral: { bg: 'rgba(20, 18, 14, 0.7)', fg: '#FAF7F2', ring: 'var(--border-strong)' },
  critical: { bg: '#EF4444', fg: '#FFFFFF', ring: 'rgba(239, 68, 68, 0.35)' },
  info: { bg: '#3B82F6', fg: '#FFFFFF', ring: 'rgba(59, 130, 246, 0.35)' },
}

/**
 * Status pill system.
 *
 * Pattern: pills de status con 3 variants (solid, soft, outline) × 3 sizes
 * (sm, md, lg) × kinds semánticos. Mostrar el sistema completo de un vistazo.
 */
export function StatusPillsDemo() {
  const [size, setSize] = useState<Size>('md')
  const [variant, setVariant] = useState<Variant>('soft')
  const [withDot, setWithDot] = useState(true)

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
        <SegmentedControl
          label="Variante"
          options={['solid', 'soft', 'outline']}
          value={variant}
          onChange={(v) => setVariant(v as Variant)}
        />
        <SegmentedControl
          label="Tamaño"
          options={['sm', 'md', 'lg']}
          value={size}
          onChange={(v) => setSize(v as Size)}
        />
        <Toggle label="Indicador" value={withDot} onChange={setWithDot} />
      </div>

      <div
        style={{
          display: 'grid',
          gap: 16,
          padding: 24,
          borderRadius: 16,
          background: 'var(--surface-subtle)',
          border: '0.5px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          {STATUSES.map((s) => (
            <Pill key={s.label} label={s.label} kind={s.kind} size={size} variant={variant} dot={withDot} />
          ))}
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>
        15 combinaciones (5 tipos × 3 variantes) × 3 tamaños — un solo componente.
      </p>
    </div>
  )
}

function Pill({
  label,
  kind,
  size,
  variant,
  dot,
}: {
  label: string
  kind: Kind
  size: Size
  variant: Variant
  dot: boolean
}) {
  const c = COLORS[kind]
  const sizes: Record<Size, { padX: number; padY: number; font: number; dotSize: number }> = {
    sm: { padX: 8, padY: 3, font: 11, dotSize: 5 },
    md: { padX: 10, padY: 4, font: 12, dotSize: 6 },
    lg: { padX: 14, padY: 6, font: 13, dotSize: 7 },
  }
  const s = sizes[size]

  let bg: string
  let fg: string
  let border: string
  if (variant === 'solid') {
    bg = c.bg
    fg = c.fg
    border = c.bg
  } else if (variant === 'soft') {
    bg = c.ring
    fg = c.bg
    border = 'transparent'
  } else {
    bg = 'transparent'
    fg = c.bg
    border = c.bg
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: `${s.padY}px ${s.padX}px`,
        borderRadius: 999,
        background: bg,
        color: fg,
        border: `0.5px solid ${border}`,
        fontSize: s.font,
        fontWeight: 500,
        letterSpacing: '0.02em',
        lineHeight: 1.2,
      }}
    >
      {dot ? (
        <span
          aria-hidden
          style={{
            width: s.dotSize,
            height: s.dotSize,
            borderRadius: '50%',
            background: variant === 'solid' ? fg : c.bg,
          }}
        />
      ) : null}
      {label}
    </span>
  )
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <p style={controlLabel}>{label}</p>
      <div style={{ display: 'flex', borderRadius: 999, border: '0.5px solid var(--border-strong)', overflow: 'hidden' }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              flex: 1,
              padding: '6px 0',
              border: 'none',
              background: value === opt ? 'var(--accent-weak)' : 'transparent',
              color: value === opt ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {optionLabel(opt)}
          </button>
        ))}
      </div>
    </div>
  )
}

function optionLabel(value: string) {
  const labels: Record<string, string> = {
    solid: 'Sólida',
    soft: 'Suave',
    outline: 'Contorno',
    sm: 'Pequeño',
    md: 'Mediano',
    lg: 'Grande',
  }
  return labels[value] ?? value
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <p style={controlLabel}>{label}</p>
      <button
        onClick={() => onChange(!value)}
        aria-pressed={value}
        style={{
          width: '100%',
          padding: '6px 12px',
          borderRadius: 999,
          border: `0.5px solid ${value ? 'var(--accent)' : 'var(--border-strong)'}`,
          background: value ? 'var(--accent-weak)' : 'transparent',
          color: value ? 'var(--accent)' : 'var(--text-secondary)',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        {value ? '✓ Activo' : 'Inactivo'}
      </button>
    </div>
  )
}

const controlLabel: React.CSSProperties = {
  margin: '0 0 6px',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}
