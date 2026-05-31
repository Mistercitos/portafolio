'use client'

import { useState, useRef, useEffect } from 'react'

type Row = {
  id: string
  project: string
  owner: string
  hours: number
  status: 'On track' | 'At risk' | 'Done'
}

const INITIAL: Row[] = [
  { id: '1', project: 'Onboarding revamp', owner: 'Maya R.', hours: 48, status: 'On track' },
  { id: '2', project: 'Empty state library', owner: 'David C.', hours: 24, status: 'On track' },
  { id: '3', project: 'Search filters', owner: 'Lina M.', hours: 36, status: 'At risk' },
  { id: '4', project: 'Brand refresh', owner: 'Carlos P.', hours: 80, status: 'Done' },
]

const STATUSES: Row['status'][] = ['On track', 'At risk', 'Done']

/**
 * Inline editable cell.
 *
 * Pattern: tabla donde cada cell se vuelve editable on click — sin modal,
 * sin row expand. Enter guarda, Esc cancela, click fuera guarda. Validación
 * inline para campos numéricos.
 */
export function InlineEditableCellDemo() {
  const [rows, setRows] = useState<Row[]>(INITIAL)
  const [editing, setEditing] = useState<{ id: string; field: keyof Row } | null>(null)

  const update = <K extends keyof Row>(id: string, field: K, value: Row[K]) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr', gap: 0, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--subtle)', paddingBottom: 8, borderBottom: '0.5px solid var(--divider)' }}>
        <span>Project</span>
        <span>Owner</span>
        <span>Hours</span>
        <span>Status</span>
      </div>

      {rows.map((r) => (
        <div
          key={r.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr',
            gap: 0,
            paddingBlock: 6,
            borderBottom: '0.5px solid var(--divider)',
            alignItems: 'center',
          }}
        >
          <EditableText
            value={r.project}
            isEditing={editing?.id === r.id && editing.field === 'project'}
            onStartEdit={() => setEditing({ id: r.id, field: 'project' })}
            onSave={(v) => {
              update(r.id, 'project', v)
              setEditing(null)
            }}
            onCancel={() => setEditing(null)}
          />
          <EditableText
            value={r.owner}
            isEditing={editing?.id === r.id && editing.field === 'owner'}
            onStartEdit={() => setEditing({ id: r.id, field: 'owner' })}
            onSave={(v) => {
              update(r.id, 'owner', v)
              setEditing(null)
            }}
            onCancel={() => setEditing(null)}
          />
          <EditableNumber
            value={r.hours}
            isEditing={editing?.id === r.id && editing.field === 'hours'}
            onStartEdit={() => setEditing({ id: r.id, field: 'hours' })}
            onSave={(v) => {
              update(r.id, 'hours', v)
              setEditing(null)
            }}
            onCancel={() => setEditing(null)}
          />
          <StatusSelect value={r.status} onChange={(v) => update(r.id, 'status', v)} />
        </div>
      ))}

      <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--muted)' }}>
        Click cualquier cell para editar · Enter para guardar · Esc para cancelar
      </p>
    </div>
  )
}

function EditableText({
  value,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
}: {
  value: string
  isEditing: boolean
  onStartEdit: () => void
  onSave: (v: string) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      setDraft(value)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [isEditing, value])

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onSave(draft)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSave(draft)
          if (e.key === 'Escape') onCancel()
        }}
        style={editInputStyle}
      />
    )
  }

  return (
    <button onClick={onStartEdit} style={cellButtonStyle}>
      <span style={{ fontSize: 14, color: 'var(--text)' }}>{value}</span>
    </button>
  )
}

function EditableNumber({
  value,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
}: {
  value: number
  isEditing: boolean
  onStartEdit: () => void
  onSave: (v: number) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState(String(value))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      setDraft(String(value))
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [isEditing, value])

  const tryParse = () => {
    const n = Number(draft)
    if (Number.isFinite(n) && n >= 0) onSave(n)
    else onCancel()
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={tryParse}
        onKeyDown={(e) => {
          if (e.key === 'Enter') tryParse()
          if (e.key === 'Escape') onCancel()
        }}
        style={{ ...editInputStyle, fontFamily: 'var(--font-mono)' }}
      />
    )
  }

  return (
    <button onClick={onStartEdit} style={cellButtonStyle}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)' }}>{value}h</span>
    </button>
  )
}

function StatusSelect({ value, onChange }: { value: Row['status']; onChange: (v: Row['status']) => void }) {
  const colors: Record<Row['status'], { bg: string; fg: string }> = {
    'On track': { bg: 'rgba(16, 185, 129, 0.12)', fg: '#0F6E56' },
    'At risk': { bg: 'rgba(245, 158, 11, 0.14)', fg: '#A35F0B' },
    Done: { bg: 'rgba(20, 18, 14, 0.08)', fg: 'var(--text)' as string },
  }
  const c = colors[value]
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Row['status'])}
      style={{
        appearance: 'none',
        WebkitAppearance: 'none',
        padding: '5px 12px',
        borderRadius: 999,
        border: 'none',
        background: c.bg,
        color: c.fg,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.06em',
        cursor: 'pointer',
        width: 'fit-content',
      }}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}

const editInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  borderRadius: 6,
  border: '0.5px solid var(--accent)',
  background: 'var(--accent-weak)',
  color: 'var(--text)',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
}

const cellButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  borderRadius: 6,
  border: '0.5px solid transparent',
  background: 'transparent',
  color: 'var(--text)',
  fontSize: 14,
  cursor: 'text',
  textAlign: 'left',
  transition: 'background var(--t-fast) var(--ease)',
}
