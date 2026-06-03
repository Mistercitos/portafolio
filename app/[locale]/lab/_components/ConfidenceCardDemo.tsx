'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale } from '@/lib/i18n'

type Recommendation = {
  id: string
  title: string
  detail: string
  confidence: number
  impact: string
  reasoning: { label: string; value: string }[]
}

const RECOMMENDATIONS: Record<Locale, Recommendation[]> = {
  es: [
    {
      id: 'r1',
      title: 'Aumentar stock - Item A',
      detail: '180 -> 240 unidades',
      confidence: 95,
      impact: '+$28K',
      reasoning: [
        { label: 'Velocidad de venta', value: '+18% (14 dias)' },
        { label: 'Nivel de stock', value: '8% de seguridad' },
        { label: 'Patron estacional', value: 'Q4 fuerte' },
        { label: 'Items similares', value: '+22% promedio' },
      ],
    },
    {
      id: 'r2',
      title: 'Redistribuir - Item B',
      detail: '95 unidades a hub B',
      confidence: 82,
      impact: '+$12K',
      reasoning: [
        { label: 'Velocidad de venta', value: '+9% (14 dias)' },
        { label: 'Nivel de stock', value: '14% de seguridad' },
        { label: 'Patron estacional', value: 'Neutral' },
        { label: 'Items similares', value: '+11% promedio' },
      ],
    },
    {
      id: 'r3',
      title: 'Pausar reorden - Item C',
      detail: 'Pausar por 2 semanas',
      confidence: 68,
      impact: '-$3K riesgo',
      reasoning: [
        { label: 'Velocidad de venta', value: '-6% (14 dias)' },
        { label: 'Nivel de stock', value: '38% sobre objetivo' },
        { label: 'Patron estacional', value: 'Suave' },
        { label: 'Items similares', value: '-4% promedio' },
      ],
    },
  ],
  en: [
    {
      id: 'r1',
      title: 'Increase stock - Item A',
      detail: '180 -> 240 units',
      confidence: 95,
      impact: '+$28K',
      reasoning: [
        { label: 'Sales velocity', value: '+18% (14 days)' },
        { label: 'Stock level', value: '8% safety buffer' },
        { label: 'Seasonal pattern', value: 'Strong Q4' },
        { label: 'Similar items', value: '+22% average' },
      ],
    },
    {
      id: 'r2',
      title: 'Redistribute - Item B',
      detail: '95 units to hub B',
      confidence: 82,
      impact: '+$12K',
      reasoning: [
        { label: 'Sales velocity', value: '+9% (14 days)' },
        { label: 'Stock level', value: '14% safety buffer' },
        { label: 'Seasonal pattern', value: 'Neutral' },
        { label: 'Similar items', value: '+11% average' },
      ],
    },
    {
      id: 'r3',
      title: 'Pause reorder - Item C',
      detail: 'Pause for 2 weeks',
      confidence: 68,
      impact: '-$3K risk',
      reasoning: [
        { label: 'Sales velocity', value: '-6% (14 days)' },
        { label: 'Stock level', value: '38% above target' },
        { label: 'Seasonal pattern', value: 'Soft' },
        { label: 'Similar items', value: '-4% average' },
      ],
    },
  ],
}

const COPY = {
  es: {
    threshold: 'Umbral para aprobacion masiva',
    confidence: 'confianza',
    aiConfidence: 'Confianza de IA',
    hide: 'Ocultar razonamiento',
    why: 'Por que',
    adjust: 'Ajustar manualmente',
    approve: 'Aprobar',
  },
  en: {
    threshold: 'Bulk approval threshold',
    confidence: 'confidence',
    aiConfidence: 'AI confidence',
    hide: 'Hide reasoning',
    why: 'Why',
    adjust: 'Adjust manually',
    approve: 'Approve',
  },
} satisfies Record<Locale, Record<string, string>>

export function ConfidenceCardDemo({ locale = 'es' }: { locale?: Locale }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [threshold, setThreshold] = useState(80)
  const [animatedConfidence, setAnimatedConfidence] = useState<Record<string, number>>({})
  const recommendations = useMemo(() => RECOMMENDATIONS[locale], [locale])
  const copy = COPY[locale]

  useEffect(() => {
    recommendations.forEach((r) => {
      const t = setTimeout(() => {
        setAnimatedConfidence((prev) => ({ ...prev, [r.id]: r.confidence }))
      }, 200)
      return () => clearTimeout(t)
    })
  }, [recommendations])

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <p style={pillLabel}>{copy.threshold}</p>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>
            &gt;= {threshold}% {copy.confidence}
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
        {recommendations.map((r) => {
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
                      {copy.aiConfidence}
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
                  <button onClick={() => setExpandedId(isExpanded ? null : r.id)} style={ghostButton}>
                    {isExpanded ? copy.hide : copy.why}
                  </button>
                  <button style={ghostButton}>{copy.adjust}</button>
                  <button
                    disabled={!aboveThreshold}
                    style={{
                      ...primaryButton,
                      ...(aboveThreshold ? {} : { background: 'var(--accent-weak)', color: 'var(--accent)', cursor: 'not-allowed' }),
                    }}
                  >
                    {copy.approve}
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
