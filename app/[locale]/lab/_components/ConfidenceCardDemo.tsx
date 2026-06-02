'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RECOMMENDATIONS = [
  {
    id: 'r1',
    title: 'Aumentar stock — Item A',
    detail: '180 → 240 unidades',
    confidence: 95,
    impact: '+$28K',
    reasoning: [
      { label: 'Velocidad de venta', value: '+18% (14 días)' },
      { label: 'Nivel de stock', value: '8% de seguridad' },
      { label: 'Patrón estacional', value: 'Q4 fuerte' },
      { label: 'Ítems similares', value: '+22% promedio' },
    ],
  },
  {
    id: 'r2',
    title: 'Redistribuir — Item B',
    detail: '95 unidades a hub B',
    confidence: 82,
    impact: '+$12K',
    reasoning: [
      { label: 'Velocidad de venta', value: '+9% (14 días)' },
      { label: 'Nivel de stock', value: '14% de seguridad' },
      { label: 'Patrón estacional', value: 'Neutral' },
      { label: 'Ítems similares', value: '+11% promedio' },
    ],
  },
  {
    id: 'r3',
    title: 'Pausar reorden — Item C',
    detail: 'Pausar por 2 semanas',
    confidence: 68,
    impact: '−$3K riesgo',
    reasoning: [
      { label: 'Velocidad de venta', value: '−6% (14 días)' },
      { label: 'Nivel de stock', value: '38% sobre objetivo' },
      { label: 'Patrón estacional', value: 'Suave' },
      { label: 'Ítems similares', value: '−4% promedio' },
    ],
  },
]

/**
 * Confidence-driven decision card.
 *
 * Pattern: cada recomendación AI viene con bar de confianza visible,
 * razonamiento expandible inline, y override siempre disponible.
 * El usuario decide qué tan rápido confiar.
 */
export function ConfidenceCardDemo() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [threshold, setThreshold] = useState(80)
  const [animatedConfidence, setAnimatedConfidence] = useState<Record<string, number>>({})

  useEffect(() => {
    RECOMMENDATIONS.forEach((r) => {
      const t = setTimeout(() => {
        setAnimatedConfidence((prev) => ({ ...prev, [r.id]: r.confidence }))
      }, 200)
      return () => clearTimeout(t)
    })
  }, [])

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <p style={pillLabel}>Umbral para aprobación masiva</p>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>
            ≥ {threshold}% confianza
          </p>
        </div>
        <input
          type="range"
          min={50}
          max={100}
          step={1}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {RECOMMENDATIONS.map((r) => {
          const isExpanded = expandedId === r.id
          const aboveThreshold = r.confidence >= threshold
          const conf = animatedConfidence[r.id] ?? 0
          return (
            <div
              key={r.id}
              style={{
                borderRadius: 14,
                border: '0.5px solid var(--border)',
                background: 'var(--panel)',
                overflow: 'hidden',
                transition: 'border-color var(--t-fast) var(--ease)',
                ...(aboveThreshold && { borderColor: 'rgba(15, 110, 86, 0.45)' }),
              }}
            >
              <div style={{ padding: 18, display: 'grid', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{r.title}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>{r.detail}</p>
                  </div>
                  <p
                    className="serif"
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontStyle: 'italic',
                      fontWeight: 500,
                      color: aboveThreshold ? '#0F6E56' : 'var(--text)',
                    }}
                  >
                    {r.impact}
                  </p>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: '0.08em', color: 'var(--subtle)' }}>
                      Confianza de IA
                    </p>
                    <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>
                      {r.confidence}%
                    </p>
                  </div>
                  <div style={{ height: 4, background: 'var(--surface-subtle)', borderRadius: 999 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${conf}%` }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        height: '100%',
                        background: aboveThreshold ? '#10B981' : r.confidence >= 70 ? '#F59E0B' : '#EF4444',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : r.id)}
                    style={ghostButton}
                  >
                    {isExpanded ? '↑ Ocultar razonamiento' : '↓ ¿Por qué?'}
                  </button>
                  <button style={ghostButton}>Ajustar manualmente</button>
                  <button
                    disabled={!aboveThreshold}
                    style={{
                      ...primaryButton,
                      ...(aboveThreshold ? {} : { background: 'var(--accent-weak)', color: 'var(--accent)', cursor: 'not-allowed' }),
                    }}
                  >
                    Aprobar
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden', borderTop: '0.5px solid var(--divider)' }}
                  >
                    <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                      {r.reasoning.map((item) => (
                        <div key={item.label}>
                          <p style={{ margin: 0, fontSize: 11, letterSpacing: '0.06em', color: 'var(--subtle)' }}>
                            {item.label}
                          </p>
                          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text)' }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const pillLabel: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}
const ghostButton: React.CSSProperties = {
  padding: '7px 13px',
  borderRadius: 999,
  border: '0.5px solid var(--border-strong)',
  background: 'transparent',
  color: 'var(--text-secondary)',
  fontSize: 12,
  fontWeight: 500,
  cursor: 'pointer',
}
const primaryButton: React.CSSProperties = {
  padding: '7px 14px',
  borderRadius: 999,
  border: 'none',
  background: 'var(--accent)',
  color: 'var(--text-inverse)',
  fontSize: 12,
  fontWeight: 500,
  cursor: 'pointer',
  marginLeft: 'auto',
}
