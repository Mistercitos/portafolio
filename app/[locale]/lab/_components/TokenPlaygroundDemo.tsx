'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

const PRESETS = {
  es: [
    { name: 'Default', accent: '#B85131', radius: 16, weight: 500 },
    { name: 'Estilo Linear', accent: '#5E6AD2', radius: 8, weight: 500 },
    { name: 'Estilo Stripe', accent: '#635BFF', radius: 6, weight: 400 },
    { name: 'Estilo Vercel', accent: '#000000', radius: 12, weight: 500 },
  ],
  en: [
    { name: 'Default', accent: '#B85131', radius: 16, weight: 500 },
    { name: 'Linear style', accent: '#5E6AD2', radius: 8, weight: 500 },
    { name: 'Stripe style', accent: '#635BFF', radius: 6, weight: 400 },
    { name: 'Vercel style', accent: '#000000', radius: 12, weight: 500 },
  ],
} as const

const COPY = {
  es: {
    presets: 'Presets',
    accent: 'Color de acento',
    radius: 'Radio de borde',
    weight: 'Peso tipográfico',
    output: 'Salida',
    preview: 'Preview en vivo',
    primary: 'Acción primaria',
    secondary: 'Secundaria',
    cardTitle: 'Título de tarjeta',
    cardBody: 'Una card de muestra que respeta los tokens.',
    input: 'Campo de texto',
  },
  en: {
    presets: 'Presets',
    accent: 'Accent color',
    radius: 'Border radius',
    weight: 'Font weight',
    output: 'Output',
    preview: 'Live preview',
    primary: 'Primary action',
    secondary: 'Secondary',
    cardTitle: 'Card title',
    cardBody: 'A sample card that follows the tokens.',
    input: 'Text field',
  },
} satisfies Record<Locale, Record<string, string>>

export function TokenPlaygroundDemo({ locale = 'es' }: { locale?: Locale }) {
  const presets = PRESETS[locale]
  const copy = COPY[locale]
  const [accent, setAccent] = useState('#B85131')
  const [radius, setRadius] = useState(16)
  const [weight, setWeight] = useState(500)

  const applyPreset = (p: (typeof presets)[number]) => {
    setAccent(p.accent)
    setRadius(p.radius)
    setWeight(p.weight)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32 }}>
      <div style={{ padding: 24, borderRadius: 18, background: 'var(--panel)', border: '0.5px solid var(--border)', display: 'grid', gap: 24 }}>
        <div>
          <p style={labelStyle}>{copy.presets}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {presets.map((p) => (
              <button key={p.name} onClick={() => applyPreset(p)} style={presetButton}>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <Control label={copy.accent} mono={accent.toUpperCase()}>
          <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 8, border: '0.5px solid var(--border)', cursor: 'pointer', background: 'transparent' }} />
        </Control>
        <Control label={copy.radius} mono={`${radius}px`}>
          <input type="range" min={0} max={28} value={radius} onChange={(e) => setRadius(Number(e.target.value))} style={{ width: '100%' }} />
        </Control>
        <Control label={copy.weight} mono={String(weight)}>
          <input type="range" min={300} max={700} step={100} value={weight} onChange={(e) => setWeight(Number(e.target.value))} style={{ width: '100%' }} />
        </Control>

        <div>
          <p style={labelStyle}>{copy.output}</p>
          <pre style={codeStyle}>
            <code>{`:root {
  --accent: ${accent.toUpperCase()};
  --radius: ${radius}px;
  --weight: ${weight};
}`}</code>
          </pre>
        </div>
      </div>

      <div style={{ padding: 24, borderRadius: 18, background: 'var(--surface-subtle)', border: '0.5px dashed var(--border-strong)', display: 'grid', gap: 18, alignContent: 'start' }}>
        <p style={labelStyle}>{copy.preview}</p>
        <button style={{ padding: '14px 22px', borderRadius: radius, border: 'none', background: accent, color: '#FAF7F2', fontSize: 14, fontWeight: weight, cursor: 'pointer' }}>
          {copy.primary}
        </button>
        <button style={{ padding: '14px 22px', borderRadius: radius, border: `1px solid ${accent}`, background: 'transparent', color: accent, fontSize: 14, fontWeight: weight, cursor: 'pointer' }}>
          {copy.secondary}
        </button>
        <div style={{ padding: 16, borderRadius: radius, background: 'var(--panel)', border: '0.5px solid var(--border)' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: weight, color: 'var(--text)' }}>{copy.cardTitle}</p>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted)' }}>{copy.cardBody}</p>
          <span style={{ display: 'inline-block', marginTop: 12, padding: '4px 10px', borderRadius: 999, background: `${accent}1a`, color: accent, fontSize: 11, fontWeight: weight }}>
            Badge
          </span>
        </div>
        <input placeholder={copy.input} style={{ padding: '12px 14px', borderRadius: radius, border: '0.5px solid var(--border-strong)', background: 'var(--panel)', fontSize: 13, fontWeight: weight, color: 'var(--text)', fontFamily: 'inherit' }} />
      </div>
    </div>
  )
}

function Control({ label, mono, children }: { label: string; mono: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{mono}</span>
      </div>
      {children}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
  marginBottom: 8,
}
const presetButton: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 999,
  border: '0.5px solid var(--border-strong)',
  background: 'transparent',
  color: 'var(--text-secondary)',
  fontSize: 11,
  letterSpacing: '0.04em',
  cursor: 'pointer',
}
const codeStyle: React.CSSProperties = {
  margin: 0,
  padding: 14,
  borderRadius: 8,
  background: 'var(--surface-subtle)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  color: 'var(--text)',
  overflow: 'auto',
  lineHeight: 1.6,
}
