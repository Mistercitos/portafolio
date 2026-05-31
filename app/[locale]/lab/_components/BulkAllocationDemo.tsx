'use client'

import { useState } from 'react'

type Role = {
  id: string
  label: string
  rate: number
  category: 'design' | 'engineering' | 'product' | 'quality'
}

const ROLES: Role[] = [
  { id: 'designer', label: 'Designer', rate: 65, category: 'design' },
  { id: 'designer-sr', label: 'Senior Designer', rate: 95, category: 'design' },
  { id: 'engineer', label: 'Engineer', rate: 75, category: 'engineering' },
  { id: 'engineer-sr', label: 'Senior Engineer', rate: 110, category: 'engineering' },
  { id: 'pm', label: 'Product Manager', rate: 85, category: 'product' },
  { id: 'researcher', label: 'Researcher', rate: 70, category: 'product' },
  { id: 'qa', label: 'QA Engineer', rate: 55, category: 'quality' },
]

type Selection = { roleId: string; count: number }

/**
 * Bulk allocation selector.
 *
 * Pattern: asignar múltiples roles a un proyecto en una sola operación,
 * con cantidad por rol y total auto-calculado. Reemplaza el patrón "un rol
 * por entry" que fuerza a duplicar el flow N veces.
 */
export function BulkAllocationDemo() {
  const [selected, setSelected] = useState<Selection[]>([])
  const [hours, setHours] = useState(40)
  const [submittedAt, setSubmittedAt] = useState<string | null>(null)

  const add = (id: string) => {
    setSelected((prev) => {
      const existing = prev.find((s) => s.roleId === id)
      if (existing) return prev.map((s) => (s.roleId === id ? { ...s, count: s.count + 1 } : s))
      return [...prev, { roleId: id, count: 1 }]
    })
  }

  const change = (id: string, delta: number) => {
    setSelected((prev) =>
      prev
        .map((s) => (s.roleId === id ? { ...s, count: s.count + delta } : s))
        .filter((s) => s.count > 0),
    )
  }

  const remove = (id: string) => setSelected((prev) => prev.filter((s) => s.roleId !== id))

  const total = selected.reduce((sum, s) => {
    const role = ROLES.find((r) => r.id === s.roleId)
    if (!role) return sum
    return sum + role.rate * hours * s.count
  }, 0)

  const totalPeople = selected.reduce((sum, s) => sum + s.count, 0)

  const submit = () => {
    if (selected.length === 0) return
    setSubmittedAt(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }))
    setTimeout(() => {
      setSelected([])
      setSubmittedAt(null)
    }, 2400)
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <p style={pillLabel}>Paso 1</p>
        <h3 style={stepTitle}>Asignar roles</h3>
        <p style={stepDesc}>
          Cada chip suma una persona del rol. Antes era 1 rol por entry — ahora un proyecto puede
          tener múltiples roles en una operación.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ROLES.map((r) => {
            const selectedCount = selected.find((s) => s.roleId === r.id)?.count ?? 0
            return (
              <button
                key={r.id}
                onClick={() => add(r.id)}
                style={{
                  ...chipStyle,
                  borderColor: selectedCount > 0 ? 'var(--accent)' : 'var(--border-strong)',
                  background: selectedCount > 0 ? 'var(--accent-weak)' : 'transparent',
                  color: selectedCount > 0 ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {r.label}
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>${r.rate}/h</span>
                {selectedCount > 0 ? <span style={countBadge}>{selectedCount}</span> : null}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={pillLabel}>Paso 2 — Horas / persona</p>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{hours}h</p>
        </div>
        <input
          type="range"
          min={8}
          max={160}
          step={4}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <p style={pillLabel}>Paso 3 — Resumen</p>
        <div style={summaryBox}>
          {selected.length === 0 ? (
            <p style={emptyText}>Sin roles asignados todavía</p>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {selected.map((s) => {
                const role = ROLES.find((r) => r.id === s.roleId)!
                return (
                  <div key={s.roleId} style={rowStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{role.label}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                        ${role.rate}/h · {s.count} {s.count === 1 ? 'persona' : 'personas'} · {hours}h
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CountButton onClick={() => change(s.roleId, -1)}>−</CountButton>
                      <span style={countText}>{s.count}</span>
                      <CountButton onClick={() => change(s.roleId, 1)}>+</CountButton>
                      <CountButton onClick={() => remove(s.roleId)}>×</CountButton>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div style={footerStyle}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            {totalPeople} {totalPeople === 1 ? 'persona' : 'personas'} · {hours}h c/u
          </p>
          <p
            className="serif"
            style={{
              margin: '4px 0 0',
              fontSize: 32,
              fontWeight: 500,
              fontStyle: 'italic',
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            ${total.toLocaleString('es-CL')}
          </p>
        </div>
        <button
          onClick={submit}
          disabled={selected.length === 0}
          style={{
            padding: '14px 24px',
            borderRadius: 999,
            border: 'none',
            background: selected.length === 0 ? 'var(--accent-weak)' : 'var(--accent)',
            color: selected.length === 0 ? 'var(--accent)' : 'var(--text-inverse)',
            fontSize: 14,
            fontWeight: 500,
            cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
            transition: 'all var(--t-fast) var(--ease)',
          }}
        >
          {submittedAt ? `✓ Asignado · ${submittedAt}` : 'Asignar al proyecto'}
        </button>
      </div>
    </div>
  )
}

function CountButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 26,
        height: 26,
        borderRadius: '50%',
        border: '0.5px solid var(--border-strong)',
        background: 'transparent',
        color: 'var(--text-secondary)',
        fontSize: 12,
        lineHeight: 1,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  )
}

const pillLabel: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
  marginBottom: 6,
}
const stepTitle: React.CSSProperties = { margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }
const stepDesc: React.CSSProperties = { margin: '4px 0 14px', fontSize: 13, color: 'var(--muted)' }
const chipStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 999,
  border: '0.5px solid',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all var(--t-fast) var(--ease)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
}
const countBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 18,
  height: 18,
  padding: '0 6px',
  borderRadius: 999,
  background: 'var(--accent)',
  color: 'var(--text-inverse)',
  fontSize: 10,
  fontWeight: 500,
}
const summaryBox: React.CSSProperties = {
  padding: 16,
  borderRadius: 12,
  background: 'var(--surface-subtle)',
  border: '0.5px dashed var(--border)',
  minHeight: 80,
}
const emptyText: React.CSSProperties = {
  margin: 0,
  fontSize: 13,
  color: 'var(--subtle)',
  textAlign: 'center',
  padding: '12px 0',
}
const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '8px 12px',
  borderRadius: 8,
  background: 'var(--panel)',
}
const countText: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  minWidth: 20,
  textAlign: 'center',
  color: 'var(--text)',
}
const footerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  paddingTop: 20,
  borderTop: '0.5px solid var(--divider)',
  flexWrap: 'wrap',
}
