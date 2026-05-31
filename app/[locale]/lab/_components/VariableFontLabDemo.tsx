'use client'

import { useState } from 'react'

const PRESETS = [
  { name: 'Default', wght: 500, wdth: 100 },
  { name: 'Display', wght: 700, wdth: 105 },
  { name: 'Editorial', wght: 350, wdth: 95 },
  { name: 'Caption', wght: 450, wdth: 100 },
]

/**
 * Variable Font axis lab.
 *
 * Pattern: variable fonts no son "una fuente con N pesos" — son un sistema
 * de axes interpolables. Este demo expone wght y wdth en sliders y muestra
 * el output CSS exacto. Para validar settings antes de aplicar en producción.
 */
export function VariableFontLabDemo() {
  const [wght, setWght] = useState(500)
  const [wdth, setWdth] = useState(100)
  const [sample, setSample] = useState('Diseño con código en mente.')

  const apply = (preset: (typeof PRESETS)[number]) => {
    setWght(preset.wght)
    setWdth(preset.wdth)
  }

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <input
          value={sample}
          onChange={(e) => setSample(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 10,
            border: '0.5px solid var(--border-strong)',
            background: 'var(--panel)',
            color: 'var(--text)',
            fontSize: 14,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
      </div>

      <div
        style={{
          padding: '32px 20px',
          borderRadius: 14,
          background: 'var(--surface-subtle)',
          border: '0.5px solid var(--border)',
          minHeight: 140,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
            transition: 'font-weight 60ms linear, font-stretch 60ms linear',
          }}
        >
          {sample}
        </p>
      </div>

      <div style={{ display: 'grid', gap: 18 }}>
        <Slider
          label="Weight"
          axis="wght"
          value={wght}
          min={100}
          max={900}
          step={10}
          onChange={setWght}
        />
        <Slider
          label="Width"
          axis="wdth"
          value={wdth}
          min={75}
          max={125}
          step={1}
          onChange={setWdth}
        />
      </div>

      <div>
        <p style={pillLabel}>Presets</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => apply(p)}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                border: '0.5px solid var(--border-strong)',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={pillLabel}>CSS output</p>
        <pre
          style={{
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
          }}
        >
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {label} <span style={{ color: 'var(--muted)' }}>({axis})</span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
    </div>
  )
}

const pillLabel: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}
