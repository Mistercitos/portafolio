'use client'

import { useState } from 'react'

type Role = {
  id: string
  label: string
  rate: number
  category: 'kitchen' | 'service' | 'support'
}

const ROLES: Role[] = [
  { id: 'cook', label: 'Cocinero', rate: 22, category: 'kitchen' },
  { id: 'server', label: 'Server', rate: 18, category: 'service' },
  { id: 'dish', label: 'Dishwasher', rate: 16, category: 'support' },
  { id: 'busser', label: 'Busser', rate: 17, category: 'service' },
  { id: 'prep', label: 'Prep cook', rate: 19, category: 'kitchen' },
  { id: 'host', label: 'Host', rate: 17, category: 'service' },
  { id: 'bar', label: 'Bartender', rate: 24, category: 'service' },
]

type Selection = { roleId: string; count: number }

export function JobTypeSelectorDemo() {
  const [selected, setSelected] = useState<Selection[]>([])
  const [shift, setShift] = useState(8)
  const [createdAt, setCreatedAt] = useState<string | null>(null)

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
    return sum + role.rate * shift * s.count
  }, 0)

  const totalWorkers = selected.reduce((sum, s) => sum + s.count, 0)

  const createJob = () => {
    if (selected.length === 0) return
    setCreatedAt(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }))
    setTimeout(() => {
      setSelected([])
      setCreatedAt(null)
    }, 2400)
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: 32,
        padding: 32,
        borderRadius: 22,
        background: 'var(--panel)',
        border: '0.5px solid var(--border)',
        boxShadow: 'var(--shadow-soft)',
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
            marginBottom: 6,
          }}
        >
          Paso 1
        </p>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>
          Asignar JobTypes
        </h3>
        <p style={{ margin: '4px 0 14px', fontSize: 13, color: 'var(--muted)' }}>
          Cada chip agrega un worker del rol. Antes esto era 1 JobType por Job — ahora un Job puede
          tener varios JobTypes en una sola operación.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ROLES.map((r) => {
            const selectedCount = selected.find((s) => s.roleId === r.id)?.count ?? 0
            return (
              <button
                key={r.id}
                onClick={() => add(r.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '0.5px solid',
                  borderColor: selectedCount > 0 ? 'var(--accent)' : 'var(--border-strong)',
                  background: selectedCount > 0 ? 'var(--accent-weak)' : 'transparent',
                  color: selectedCount > 0 ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all var(--t-fast) var(--ease)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {r.label}
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                  ${r.rate}/h
                </span>
                {selectedCount > 0 ? (
                  <span
                    aria-hidden
                    style={{
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
                    }}
                  >
                    {selectedCount}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
            }}
          >
            Paso 2 — Turno
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--muted)',
            }}
          >
            {shift}h
          </p>
        </div>
        <input
          type="range"
          min={4}
          max={12}
          step={1}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
            marginBottom: 10,
          }}
        >
          Paso 3 — Resumen
        </p>
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--surface-subtle)',
            border: '0.5px dashed var(--border)',
            minHeight: 80,
          }}
        >
          {selected.length === 0 ? (
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: 'var(--subtle)',
                textAlign: 'center',
                padding: '12px 0',
              }}
            >
              Sin JobTypes asignados todavía
            </p>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {selected.map((s) => {
                const role = ROLES.find((r) => r.id === s.roleId)!
                return (
                  <div
                    key={s.roleId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: 'var(--panel)',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
                        {role.label}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                        ${role.rate}/h · {s.count} {s.count === 1 ? 'worker' : 'workers'} · turno {shift}h
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CountButton onClick={() => change(s.roleId, -1)} aria-label="Disminuir">−</CountButton>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 13,
                          minWidth: 20,
                          textAlign: 'center',
                          color: 'var(--text)',
                        }}
                      >
                        {s.count}
                      </span>
                      <CountButton onClick={() => change(s.roleId, 1)} aria-label="Aumentar">+</CountButton>
                      <CountButton onClick={() => remove(s.roleId)} aria-label="Eliminar">×</CountButton>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          paddingTop: 24,
          borderTop: '0.5px solid var(--divider)',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.06em',
              color: 'var(--muted)',
            }}
          >
            {totalWorkers} {totalWorkers === 1 ? 'worker' : 'workers'} · turno {shift}h
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
          onClick={createJob}
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
          {createdAt ? `✓ Job creado · ${createdAt}` : 'Crear Job'}
        </button>
      </div>
    </div>
  )
}

function CountButton({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode
  onClick: () => void
  'aria-label'?: string
}) {
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
      {...props}
    >
      {children}
    </button>
  )
}
