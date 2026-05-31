'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Item = {
  id: string
  title: string
  category: 'Marketplace' | 'B2B SaaS' | 'Consumer' | 'Enterprise'
  status: 'Active' | 'In review' | 'Paused'
  priority: 1 | 2 | 3
}

const ITEMS: Item[] = [
  { id: '1', title: 'Onboarding revamp', category: 'B2B SaaS', status: 'Active', priority: 1 },
  { id: '2', title: 'Pricing page refresh', category: 'Marketplace', status: 'In review', priority: 2 },
  { id: '3', title: 'Mobile checkout', category: 'Consumer', status: 'Active', priority: 1 },
  { id: '4', title: 'Admin dashboard v2', category: 'Enterprise', status: 'Paused', priority: 3 },
  { id: '5', title: 'Empty state library', category: 'B2B SaaS', status: 'Active', priority: 2 },
  { id: '6', title: 'Search filters', category: 'Marketplace', status: 'Active', priority: 1 },
  { id: '7', title: 'Settings restructure', category: 'Enterprise', status: 'In review', priority: 3 },
  { id: '8', title: 'Notification center', category: 'B2B SaaS', status: 'Active', priority: 2 },
  { id: '9', title: 'Brand refresh', category: 'Consumer', status: 'Paused', priority: 3 },
]

const CATEGORIES = ['Marketplace', 'B2B SaaS', 'Consumer', 'Enterprise'] as const
const STATUSES = ['Active', 'In review', 'Paused'] as const

/**
 * Smart filter chips with live count.
 *
 * Pattern: cada filter chip lleva su count actual. Click → filtra
 * con motion. Combinable: filtros se acumulan. "Limpiar" reset todo.
 */
export function SmartFilterChipsDemo() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return ITEMS.filter((it) => {
      if (categoryFilter && it.category !== categoryFilter) return false
      if (statusFilter && it.status !== statusFilter) return false
      return true
    })
  }, [categoryFilter, statusFilter])

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const it of ITEMS) {
      if (statusFilter && it.status !== statusFilter) continue
      map.set(it.category, (map.get(it.category) ?? 0) + 1)
    }
    return map
  }, [statusFilter])

  const statusCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const it of ITEMS) {
      if (categoryFilter && it.category !== categoryFilter) continue
      map.set(it.status, (map.get(it.status) ?? 0) + 1)
    }
    return map
  }, [categoryFilter])

  const hasFilters = categoryFilter || statusFilter

  return (
    <div style={{ display: 'grid', gap: 22 }}>
      <div>
        <p style={pillLabel}>Categoría</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CATEGORIES.map((c) => {
            const count = categoryCounts.get(c) ?? 0
            const active = categoryFilter === c
            return (
              <Chip
                key={c}
                label={c}
                count={count}
                active={active}
                onClick={() => setCategoryFilter(active ? null : c)}
              />
            )
          })}
        </div>
      </div>

      <div>
        <p style={pillLabel}>Status</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {STATUSES.map((s) => {
            const count = statusCounts.get(s) ?? 0
            const active = statusFilter === s
            return (
              <Chip
                key={s}
                label={s}
                count={count}
                active={active}
                onClick={() => setStatusFilter(active ? null : s)}
              />
            )
          })}
        </div>
      </div>

      {hasFilters ? (
        <button
          onClick={() => {
            setCategoryFilter(null)
            setStatusFilter(null)
          }}
          style={{
            alignSelf: 'flex-start',
            padding: '6px 12px',
            borderRadius: 999,
            border: '0.5px solid var(--border-strong)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          × Limpiar filtros
        </button>
      ) : null}

      <div
        style={{
          paddingTop: 18,
          borderTop: '0.5px solid var(--divider)',
        }}
      >
        <p style={{ margin: '0 0 12px', fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
        </p>
        <AnimatePresence mode="popLayout">
          <div style={{ display: 'grid', gap: 8 }}>
            {filtered.map((it, i) => (
              <motion.div
                key={it.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'var(--panel)',
                  border: '0.5px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{it.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                    {it.category} · {it.status}
                  </p>
                </div>
                <span style={priorityDot(it.priority)} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={count === 0 && !active}
      style={{
        padding: '7px 12px',
        borderRadius: 999,
        border: '0.5px solid',
        borderColor: active ? 'var(--accent)' : 'var(--border-strong)',
        background: active ? 'var(--accent-weak)' : 'transparent',
        color: active ? 'var(--accent)' : count === 0 ? 'var(--subtle)' : 'var(--text-secondary)',
        fontSize: 12,
        fontWeight: 500,
        cursor: count === 0 && !active ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'all var(--t-fast) var(--ease)',
        opacity: count === 0 && !active ? 0.5 : 1,
      }}
    >
      {label}
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: active ? 0.9 : 0.55 }}>
        {count}
      </span>
    </button>
  )
}

function priorityDot(p: 1 | 2 | 3): React.CSSProperties {
  const color = p === 1 ? '#EF4444' : p === 2 ? '#F59E0B' : '#10B981'
  return {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }
}

const pillLabel: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}
