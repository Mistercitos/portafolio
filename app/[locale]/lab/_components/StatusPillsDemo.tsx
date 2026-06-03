'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

const STATUS_LABELS = {
  es: [
    { label: 'Activo', kind: 'success' },
    { label: 'En revisión', kind: 'warning' },
    { label: 'Pausado', kind: 'neutral' },
    { label: 'Crítico', kind: 'critical' },
    { label: 'Listo', kind: 'info' },
  ],
  en: [
    { label: 'Active', kind: 'success' },
    { label: 'In review', kind: 'warning' },
    { label: 'Paused', kind: 'neutral' },
    { label: 'Critical', kind: 'critical' },
    { label: 'Done', kind: 'info' },
  ],
} as const

type Kind = (typeof STATUS_LABELS.es)[number]['kind']
type Size = 'sm' | 'md' | 'lg'
type Variant = 'solid' | 'soft' | 'outline'

const COLORS: Record<Kind, { bg: string; fg: string; ring: string }> = {
  success: { bg: '#10B981', fg: '#FFFFFF', ring: 'rgba(16, 185, 129, 0.35)' },
  warning: { bg: '#F59E0B', fg: '#3A2400', ring: 'rgba(245, 158, 11, 0.35)' },
  neutral: { bg: 'rgba(20, 18, 14, 0.7)', fg: '#FAF7F2', ring: 'var(--border-strong)' },
  critical: { bg: '#EF4444', fg: '#FFFFFF', ring: 'rgba(239, 68, 68, 0.35)' },
  info: { bg: '#3B82F6', fg: '#FFFFFF', ring: 'rgba(59, 130, 246, 0.35)' },
}

const COPY = {
  es: {
    variant: 'Variante',
    size: 'Tamaño',
    indicator: 'Indicador',
    active: 'Activo',
    inactive: 'Inactivo',
    combinations: '15 combinaciones (5 tipos x 3 variantes) x 3 tamaños - un solo componente.',
    option: { solid: 'Sólida', soft: 'Suave', outline: 'Contorno', sm: 'Pequeño', md: 'Mediano', lg: 'Grande' },
  },
  en: {
    variant: 'Variant',
    size: 'Size',
    indicator: 'Indicator',
    active: 'Active',
    inactive: 'Inactive',
    combinations: '15 combinations (5 types x 3 variants) x 3 sizes - one component.',
    option: { solid: 'Solid', soft: 'Soft', outline: 'Outline', sm: 'Small', md: 'Medium', lg: 'Large' },
  },
} satisfies Record<Locale, {
  variant: string
  size: string
  indicator: string
  active: string
  inactive: string
  combinations: string
  option: Record<string, string>
}>

export function StatusPillsDemo({ locale = 'es' }: { locale?: Locale }) {
  const [size, setSize] = useState<Size>('md')
  const [variant, setVariant] = useState<Variant>('soft')
  const [withDot, setWithDot] = useState(true)
  const copy = COPY[locale]
  const statuses = STATUS_LABELS[locale]

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
        <SegmentedControl label={copy.variant} options={['solid', 'soft', 'outline']} value={variant} labels={copy.option} onChange={(v) => setVariant(v as Variant)} />
        <SegmentedControl label={copy.size} options={['sm', 'md', 'lg']} value={size} labels={copy.option} onChange={(v) => setSize(v as Size)} />
        <Toggle label={copy.indicator} value={withDot} activeLabel={copy.active} inactiveLabel={copy.inactive} onChange={setWithDot} />
      </div>

      <div style={{ display: 'grid', gap: 16, padding: 24, borderRadius: 16, background: 'var(--surface-subtle)', border: '0.5px solid var(--border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          {statuses.map((s) => (
            <Pill key={s.label} label={s.label} kind={s.kind} size={size} variant={variant} dot={withDot} />
          ))}
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>{copy.combinations}</p>
    </div>
  )
}

function Pill({ label, kind, size, variant, dot }: { label: string; kind: Kind; size: Size; variant: Variant; dot: boolean }) {
  const c = COLORS[kind]
  const sizes: Record<Size, { padX: number; padY: number; font: number; dotSize: number }> = {
    sm: { padX: 8, padY: 3, font: 11, dotSize: 5 },
    md: { padX: 10, padY: 4, font: 12, dotSize: 6 },
    lg: { padX: 14, padY: 6, font: 13, dotSize: 7 },
  }
  const s = sizes[size]
  const bg = variant === 'solid' ? c.bg : variant === 'soft' ? c.ring : 'transparent'
  const fg = variant === 'solid' ? c.fg : c.bg
  const border = variant === 'solid' ? c.bg : variant === 'soft' ? 'transparent' : c.bg

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: `${s.padY}px ${s.padX}px`, borderRadius: 999, background: bg, color: fg, border: `0.5px solid ${border}`, fontSize: s.font, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1.2 }}>
      {dot ? <span aria-hidden style={{ width: s.dotSize, height: s.dotSize, borderRadius: '50%', background: variant === 'solid' ? c.fg : c.bg }} /> : null}
      {label}
    </span>
  )
}

function SegmentedControl<T extends string>({ label, options, value, labels, onChange }: { label: string; options: readonly T[]; value: T; labels: Record<string, string>; onChange: (v: T) => void }) {
  return (
    <div>
      <p style={controlLabel}>{label}</p>
      <div style={{ display: 'flex', borderRadius: 999, border: '0.5px solid var(--border-strong)', overflow: 'hidden' }}>
        {options.map((opt) => (
          <button key={opt} onClick={() => onChange(opt)} style={{ flex: 1, padding: '6px 0', border: 'none', background: value === opt ? 'var(--accent-weak)' : 'transparent', color: value === opt ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
            {labels[opt]}
          </button>
        ))}
      </div>
    </div>
  )
}

function Toggle({ label, value, activeLabel, inactiveLabel, onChange }: { label: string; value: boolean; activeLabel: string; inactiveLabel: string; onChange: (v: boolean) => void }) {
  return (
    <div>
      <p style={controlLabel}>{label}</p>
      <button onClick={() => onChange(!value)} aria-pressed={value} style={{ width: '100%', padding: '6px 12px', borderRadius: 999, border: `0.5px solid ${value ? 'var(--accent)' : 'var(--border-strong)'}`, background: value ? 'var(--accent-weak)' : 'transparent', color: value ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
        {value ? activeLabel : inactiveLabel}
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
