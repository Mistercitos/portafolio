'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, AnimatePresence } from 'framer-motion'

const PRESETS = [
  { label: 'Ingresos', value: 48230, prefix: '$', delta: 12.4 },
  { label: 'Usuarios activos', value: 14820, prefix: '', delta: -2.1 },
  { label: 'Conversión', value: 4.8, prefix: '', suffix: '%', decimals: 1, delta: 0.7 },
]

/**
 * Number ticker with delta indicator.
 *
 * Pattern: métricas que cambian tienen que comunicar tres cosas a la vez:
 * el valor, su cambio reciente, y la dirección. Number anima al cambiar.
 * Delta pill cambia color por signo.
 */
export function NumberTickerDemo() {
  const [presetIdx, setPresetIdx] = useState(0)
  const preset = PRESETS[presetIdx]
  const [displayValue, setDisplayValue] = useState(preset.value)
  const previousRef = useRef(preset.value)

  useEffect(() => {
    const from = previousRef.current
    const to = preset.value
    previousRef.current = to
    const ctrl = animate(from, to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(v),
    })
    return () => ctrl.stop()
  }, [preset.value])

  const fmt = (n: number) => {
    if (preset.decimals) return n.toFixed(preset.decimals)
    return Math.round(n).toLocaleString('es-CL')
  }

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setPresetIdx(i)}
            style={{
              padding: '7px 12px',
              borderRadius: 999,
              border: '0.5px solid',
              borderColor: presetIdx === i ? 'var(--accent)' : 'var(--border-strong)',
              background: presetIdx === i ? 'var(--accent-weak)' : 'transparent',
              color: presetIdx === i ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        style={{
          padding: 32,
          borderRadius: 16,
          background: 'var(--surface-subtle)',
          border: '0.5px solid var(--border)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={preset.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 8,
              }}
            >
              {preset.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <p
                className="serif"
                style={{
                  margin: 0,
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  lineHeight: 1,
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {preset.prefix ?? ''}
                {fmt(displayValue)}
                {preset.suffix ?? ''}
              </p>
              <DeltaPill delta={preset.delta} />
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)' }}>vs. periodo anterior</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setPresetIdx((presetIdx + 1) % PRESETS.length)}
          style={{
            padding: '10px 16px',
            borderRadius: 999,
            border: '0.5px solid var(--border-strong)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          → Siguiente métrica
        </button>
      </div>
    </div>
  )
}

function DeltaPill({ delta }: { delta: number }) {
  const positive = delta >= 0
  const color = positive ? '#0F6E56' : '#A32D2D'
  const bg = positive ? 'rgba(16, 185, 129, 0.14)' : 'rgba(239, 68, 68, 0.14)'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '5px 10px',
        borderRadius: 999,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 500,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <span aria-hidden style={{ fontSize: 10 }}>{positive ? '↑' : '↓'}</span>
      {positive ? '+' : ''}
      {delta.toFixed(1)}%
    </span>
  )
}
