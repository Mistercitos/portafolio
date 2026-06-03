'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

const PRESETS = [
  { name: 'Base', wght: 500, wdth: 100 },
  { name: 'Display', wght: 700, wdth: 105 },
  { name: 'Editorial', wght: 350, wdth: 95 },
  { name: 'Small text', wght: 450, wdth: 100 },
]

const COPY = {
  es: {
    sample: 'Diseño con código en mente.',
    weight: 'Peso',
    width: 'Ancho',
    presets: 'Presets',
    output: 'Salida CSS',
  },
  en: {
    sample: 'Design with code in mind.',
    weight: 'Weight',
    width: 'Width',
    presets: 'Presets',
    output: 'CSS output',
  },
} satisfies Record<Locale, Record<string, string>>

export function VariableFontLabDemo({ locale = 'es' }: { locale?: Locale }) {
  const [wght, setWght] = useState(500)
  const [wdth, setWdth] = useState(100)
  const copy = COPY[locale]
  const [sample, setSample] = useState(copy.sample)

  const apply = (preset: (typeof PRESETS)[number]) => {
    setWght(preset.wght)
    setWdth(preset.wdth)
  }

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <input value={sample} onChange={(e) => setSample(e.target.value)} style={inputStyle} />

      <div style={previewStyle}>
        <p
          style={{
            margin: 0,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: wght,
            fontStretch: `${wdth}%`,
            fontVariationSettings: `'wght' ${wght}, 'wdth' ${wdth}`,
            lineHeight: 1.15,
            color: 'var(--text)',
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          {sample}
        </p>
      </div>

      <div style={{ display: 'grid', gap: 18 }}>
        <Slider label={copy.weight} axis="wght" value={wght} min={100} max={900} step={10} onChange={setWght} />
        <Slider label={copy.width} axis="wdth" value={wdth} min={75} max={125} step={1} onChange={setWdth} />
      </div>

      <div>
        <p style={pillLabel}>{copy.presets}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => apply(p)} style={buttonStyle}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={pillLabel}>{copy.output}</p>
        <pre style={codeStyle}>
          <code>{`font-variation-settings: 'wght' ${wght}, 'wdth' ${wdth};`}</code>
        </pre>
      </div>
    </div>
  )
}

function Slider({
  label,
  axis,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  axis: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {label} <span style={{ color: 'var(--muted)' }}>({axis})</span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: '100%' }} />
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '0.5px solid var(--border-strong)',
  background: 'var(--panel)',
  color: 'var(--text)',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
}
const previewStyle: React.CSSProperties = {
  padding: '32px 20px',
  borderRadius: 14,
  background: 'var(--surface-subtle)',
  border: '0.5px solid var(--border)',
  minHeight: 140,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 999,
  border: '0.5px solid var(--border-strong)',
  background: 'transparent',
  color: 'var(--text-secondary)',
  fontSize: 12,
  cursor: 'pointer',
}
const pillLabel: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}
const codeStyle: React.CSSProperties = {
  margin: 0,
  padding: 14,
  borderRadius: 10,
  background: 'var(--surface-subtle)',
  border: '0.5px solid var(--border)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  color: 'var(--text)',
  overflow: 'auto',
  lineHeight: 1.6,
}
