'use client'

import { useMemo, useState } from 'react'
import type { Locale } from '@/lib/i18n'

type Role = {
  id: string
  label: string
  rate: number
}

type Selection = { roleId: string; count: number }

const ROLES: Record<Locale, Role[]> = {
  es: [
    { id: 'designer', label: 'Diseñador', rate: 65 },
    { id: 'designer-sr', label: 'Diseñador senior', rate: 95 },
    { id: 'engineer', label: 'Ingeniero', rate: 75 },
    { id: 'engineer-sr', label: 'Ingeniero senior', rate: 110 },
    { id: 'pm', label: 'Product Manager', rate: 85 },
    { id: 'researcher', label: 'Researcher UX', rate: 70 },
    { id: 'qa', label: 'Ingeniero QA', rate: 55 },
  ],
  en: [
    { id: 'designer', label: 'Designer', rate: 65 },
    { id: 'designer-sr', label: 'Senior designer', rate: 95 },
    { id: 'engineer', label: 'Engineer', rate: 75 },
    { id: 'engineer-sr', label: 'Senior engineer', rate: 110 },
    { id: 'pm', label: 'Product Manager', rate: 85 },
    { id: 'researcher', label: 'UX Researcher', rate: 70 },
    { id: 'qa', label: 'QA Engineer', rate: 55 },
  ],
}

const COPY = {
  es: {
    step1: 'Paso 1',
    assignRoles: 'Asignar roles',
    description:
      'Cada chip suma una persona del rol. Antes era 1 rol por entrada; ahora un proyecto puede tener múltiples roles en una operación.',
    step2: 'Paso 2 - Horas / persona',
    step3: 'Paso 3 - Resumen',
    empty: 'Sin roles asignados todavía',
    person: 'persona',
    people: 'personas',
    each: 'c/u',
    assigned: 'Asignado',
    assign: 'Asignar al proyecto',
    locale: 'es-CL',
  },
  en: {
    step1: 'Step 1',
    assignRoles: 'Assign roles',
    description:
      'Each chip adds one person for that role. Before, this was one role per entry; now a project can include multiple roles in one operation.',
    step2: 'Step 2 - Hours / person',
    step3: 'Step 3 - Summary',
    empty: 'No roles assigned yet',
    person: 'person',
    people: 'people',
    each: 'each',
    assigned: 'Assigned',
    assign: 'Assign to project',
    locale: 'en-US',
  },
} satisfies Record<Locale, Record<string, string>>

export function BulkAllocationDemo({ locale = 'es' }: { locale?: Locale }) {
  const roles = useMemo(() => ROLES[locale], [locale])
  const copy = COPY[locale]
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
    const role = roles.find((r) => r.id === s.roleId)
    if (!role) return sum
    return sum + role.rate * hours * s.count
  }, 0)

  const totalPeople = selected.reduce((sum, s) => sum + s.count, 0)

  const submit = () => {
    if (selected.length === 0) return
    setSubmittedAt(new Date().toLocaleTimeString(copy.locale, { hour: '2-digit', minute: '2-digit' }))
    setTimeout(() => {
      setSelected([])
      setSubmittedAt(null)
    }, 2400)
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <p style={pillLabel}>{copy.step1}</p>
        <h3 style={stepTitle}>{copy.assignRoles}</h3>
        <p style={stepDesc}>{copy.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {roles.map((r) => {
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
          <p style={pillLabel}>{copy.step2}</p>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{hours}h</p>
        </div>
        <input type="range" min={8} max={160} step={4} value={hours} onChange={(e) => setHours(Number(e.target.value))} style={{ width: '100%' }} />
      </div>

      <div>
        <p style={pillLabel}>{copy.step3}</p>
        <div style={summaryBox}>
          {selected.length === 0 ? (
            <p style={emptyText}>{copy.empty}</p>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {selected.map((s) => {
                const role = roles.find((r) => r.id === s.roleId)!
                return (
                  <div key={s.roleId} style={rowStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{role.label}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                        ${role.rate}/h · {s.count} {s.count === 1 ? copy.person : copy.people} · {hours}h
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
            {totalPeople} {totalPeople === 1 ? copy.person : copy.people} · {hours}h {copy.each}
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
            ${total.toLocaleString(copy.locale)}
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
          }}
        >
          {submittedAt ? `${copy.assigned} · ${submittedAt}` : copy.assign}
        </button>
      </div>
    </div>
  )
}

function CountButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={countButtonStyle}>
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
const countButtonStyle: React.CSSProperties = {
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
