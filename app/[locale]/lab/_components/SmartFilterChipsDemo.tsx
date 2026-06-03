'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Locale } from '@/lib/i18n'

type Item = {
  id: string
  title: string
  category: string
  status: string
  priority: 1 | 2 | 3
}

const DATA: Record<Locale, { items: Item[]; categories: string[]; statuses: string[]; labels: Record<string, string> }> = {
  es: {
    categories: ['Marketplace', 'B2B SaaS', 'Consumo', 'Enterprise'],
    statuses: ['Activo', 'En revisión', 'Pausado'],
    labels: { category: 'Categoría', status: 'Estado', clear: 'Limpiar filtros', one: 'resultado', many: 'resultados' },
    items: [
      { id: '1', title: 'Rediseño de onboarding', category: 'B2B SaaS', status: 'Activo', priority: 1 },
      { id: '2', title: 'Actualización de pricing', category: 'Marketplace', status: 'En revisión', priority: 2 },
      { id: '3', title: 'Checkout mobile', category: 'Consumo', status: 'Activo', priority: 1 },
      { id: '4', title: 'Dashboard admin v2', category: 'Enterprise', status: 'Pausado', priority: 3 },
      { id: '5', title: 'Biblioteca de empty states', category: 'B2B SaaS', status: 'Activo', priority: 2 },
      { id: '6', title: 'Filtros de búsqueda', category: 'Marketplace', status: 'Activo', priority: 1 },
      { id: '7', title: 'Reestructura de settings', category: 'Enterprise', status: 'En revisión', priority: 3 },
      { id: '8', title: 'Centro de notificaciones', category: 'B2B SaaS', status: 'Activo', priority: 2 },
      { id: '9', title: 'Actualización de marca', category: 'Consumo', status: 'Pausado', priority: 3 },
    ],
  },
  en: {
    categories: ['Marketplace', 'B2B SaaS', 'Consumer', 'Enterprise'],
    statuses: ['Active', 'In review', 'Paused'],
    labels: { category: 'Category', status: 'Status', clear: 'Clear filters', one: 'result', many: 'results' },
    items: [
      { id: '1', title: 'Onboarding redesign', category: 'B2B SaaS', status: 'Active', priority: 1 },
      { id: '2', title: 'Pricing update', category: 'Marketplace', status: 'In review', priority: 2 },
      { id: '3', title: 'Mobile checkout', category: 'Consumer', status: 'Active', priority: 1 },
      { id: '4', title: 'Admin dashboard v2', category: 'Enterprise', status: 'Paused', priority: 3 },
      { id: '5', title: 'Empty states library', category: 'B2B SaaS', status: 'Active', priority: 2 },
      { id: '6', title: 'Search filters', category: 'Marketplace', status: 'Active', priority: 1 },
      { id: '7', title: 'Settings restructure', category: 'Enterprise', status: 'In review', priority: 3 },
      { id: '8', title: 'Notification center', category: 'B2B SaaS', status: 'Active', priority: 2 },
      { id: '9', title: 'Brand update', category: 'Consumer', status: 'Paused', priority: 3 },
    ],
  },
}

export function SmartFilterChipsDemo({ locale = 'es' }: { locale?: Locale }) {
  const { items, categories, statuses, labels } = DATA[locale]
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (categoryFilter && it.category !== categoryFilter) return false
      if (statusFilter && it.status !== statusFilter) return false
      return true
    })
  }, [items, categoryFilter, statusFilter])

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const it of items) {
      if (statusFilter && it.status !== statusFilter) continue
      map.set(it.category, (map.get(it.category) ?? 0) + 1)
    }
    return map
  }, [items, statusFilter])

  const statusCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const it of items) {
      if (categoryFilter && it.category !== categoryFilter) continue
      map.set(it.status, (map.get(it.status) ?? 0) + 1)
    }
    return map
  }, [items, categoryFilter])

  const hasFilters = categoryFilter || statusFilter

  return (
    <div style={{ display: 'grid', gap: 22 }}>
      <FilterGroup label={labels.category} options={categories} counts={categoryCounts} value={categoryFilter} onChange={setCategoryFilter} />
      <FilterGroup label={labels.status} options={statuses} counts={statusCounts} value={statusFilter} onChange={setStatusFilter} />

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
          × {labels.clear}
        </button>
      ) : null}

      <div style={{ paddingTop: 18, borderTop: '0.5px solid var(--divider)' }}>
        <p style={{ margin: '0 0 12px', fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)' }}>
          {filtered.length} {filtered.length === 1 ? labels.one : labels.many}
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

function FilterGroup({
  label,
  options,
  counts,
  value,
  onChange,
}: {
  label: string
  options: string[]
  counts: Map<string, number>
  value: string | null
  onChange: (value: string | null) => void
}) {
  return (
    <div>
      <p style={pillLabel}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map((option) => {
          const count = counts.get(option) ?? 0
          const active = value === option
          return (
            <Chip
              key={option}
              label={option}
              count={count}
              active={active}
              onClick={() => onChange(active ? null : option)}
            />
          )
        })}
      </div>
    </div>
  )
}

function Chip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
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
        opacity: count === 0 && !active ? 0.5 : 1,
      }}
    >
      {label}
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: active ? 0.9 : 0.55 }}>{count}</span>
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
