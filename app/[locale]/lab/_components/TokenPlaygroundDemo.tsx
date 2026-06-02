'use client'

import { useState } from 'react'

const PRESETS = [
  { name: 'Default', accent: '#B85131', radius: 16, weight: 500 },
  { name: 'Estilo Linear', accent: '#5E6AD2', radius: 8, weight: 500 },
  { name: 'Estilo Stripe', accent: '#635BFF', radius: 6, weight: 400 },
  { name: 'Estilo Vercel', accent: '#000000', radius: 12, weight: 500 },
]

export function TokenPlaygroundDemo() {
  const [accent, setAccent] = useState('#B85131')
  const [radius, setRadius] = useState(16)
  const [weight, setWeight] = useState(500)

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setAccent(p.accent)
    setRadius(p.radius)
    setWeight(p.weight)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 32,
      }}
    >
      {/* Controls */}
      <div
        style={{
          padding: 24,
          borderRadius: 18,
          background: 'var(--panel)',
          border: '0.5px solid var(--border)',
          display: 'grid',
          gap: 24,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 8,
            }}
          >
            Presets
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: '0.5px solid var(--border-strong)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <Slider
          label="Color de acento"
          mono={accent.toUpperCase()}
          control={
            <input
              type="color"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              style={{
                width: '100%',
                height: 40,
                borderRadius: 8,
                border: '0.5px solid var(--border)',
                cursor: 'pointer',
                background: 'transparent',
              }}
            />
          }
        />

        <Slider
          label="Radio de borde"
          mono={`${radius}px`}
          control={
            <input
              type="range"
              min={0}
              max={28}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          }
        />

        <Slider
          label="Peso tipográfico"
          mono={String(weight)}
          control={
            <input
              type="range"
              min={300}
              max={700}
              step={100}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          }
        />

        <div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 8,
            }}
          >
            Salida
          </p>
          <pre
            style={{
              margin: 0,
              padding: 14,
              borderRadius: 8,
              background: 'var(--surface-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text)',
              overflow: 'auto',
              lineHeight: 1.6,
            }}
          >
            <code>{`:root {
  --accent: ${accent.toUpperCase()};
  --radius: ${radius}px;
  --weight: ${weight};
}`}</code>
          </pre>
        </div>
      </div>

      {/* Preview */}
      <div
        style={{
          padding: 24,
          borderRadius: 18,
          background: 'var(--surface-subtle)',
          border: '0.5px dashed var(--border-strong)',
          display: 'grid',
          gap: 18,
          alignContent: 'start',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
          }}
        >
          Preview en vivo
        </p>

        <button
          style={{
            padding: '14px 22px',
            borderRadius: radius,
            border: 'none',
            background: accent,
            color: '#FAF7F2',
            fontSize: 14,
            fontWeight: weight,
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          Acción primaria
        </button>

        <button
          style={{
            padding: '14px 22px',
            borderRadius: radius,
            border: `1px solid ${accent}`,
            background: 'transparent',
            color: accent,
            fontSize: 14,
            fontWeight: weight,
            cursor: 'pointer',
          }}
        >
          Secundaria
        </button>

        <div
          style={{
            padding: 16,
            borderRadius: radius,
            background: 'var(--panel)',
            border: '0.5px solid var(--border)',
          }}
        >
          <p style={{ margin: 0, fontSize: 13, fontWeight: weight, color: 'var(--text)' }}>
            Título de tarjeta
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted)' }}>
            Una card de muestra que respeta los tokens.
          </p>
          <span
            style={{
              display: 'inline-block',
              marginTop: 12,
              padding: '4px 10px',
              borderRadius: 999,
              background: `${accent}1a`,
              color: accent,
              fontSize: 11,
              fontWeight: weight,
            }}
          >
            Badge
          </span>
        </div>

        <input
          placeholder="Campo de texto"
          style={{
            padding: '12px 14px',
            borderRadius: radius,
            border: '0.5px solid var(--border-strong)',
            background: 'var(--panel)',
            fontSize: 13,
            fontWeight: weight,
            color: 'var(--text)',
            fontFamily: 'inherit',
          }}
        />
      </div>
    </div>
  )
}

function Slider({
  label,
  mono,
  control,
}: {
  label: string
  mono: string
  control: React.ReactNode
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{mono}</span>
      </div>
      {control}
    </div>
  )
}
