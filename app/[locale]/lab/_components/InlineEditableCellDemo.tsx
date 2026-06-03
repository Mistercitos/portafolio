'use client'

import { useState, useRef, useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

type Row = {
  id: string
  project: string
  owner: string
  hours: number
  status: string
}

const DATA = {
  es: {
    headers: ['Proyecto', 'Responsable', 'Horas', 'Estado'],
    hint: 'Haz clic en cualquier celda para editar · Enter para guardar · Esc para cancelar',
    statuses: ['En curso', 'En riesgo', 'Listo'],
    rows: [
      { id: '1', project: 'Rediseño de onboarding', owner: 'Maya R.', hours: 48, status: 'En curso' },
      { id: '2', project: 'Biblioteca de empty states', owner: 'David C.', hours: 24, status: 'En curso' },
      { id: '3', project: 'Filtros de búsqueda', owner: 'Lina M.', hours: 36, status: 'En riesgo' },
      { id: '4', project: 'Actualización de marca', owner: 'Carlos P.', hours: 80, status: 'Listo' },
    ],
  },
  en: {
    headers: ['Project', 'Owner', 'Hours', 'Status'],
    hint: 'Click any cell to edit · Enter to save · Esc to cancel',
    statuses: ['In progress', 'At risk', 'Done'],
    rows: [
      { id: '1', project: 'Onboarding redesign', owner: 'Maya R.', hours: 48, status: 'In progress' },
      { id: '2', project: 'Empty states library', owner: 'David C.', hours: 24, status: 'In progress' },
      { id: '3', project: 'Search filters', owner: 'Lina M.', hours: 36, status: 'At risk' },
      { id: '4', project: 'Brand update', owner: 'Carlos P.', hours: 80, status: 'Done' },
    ],
  },
} satisfies Record<Locale, { headers: string[]; hint: string; statuses: string[]; rows: Row[] }>

export function InlineEditableCellDemo({ locale = 'es' }: { locale?: Locale }) {
  const copy = DATA[locale]
  const [rows, setRows] = useState<Row[]>(copy.rows)
  const [editing, setEditing] = useState<{ id: string; field: keyof Row } | null>(null)

  const update = <K extends keyof Row>(id: string, field: K, value: Row[K]) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr', gap: 0, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--subtle)', paddingBottom: 8, borderBottom: '0.5px solid var(--divider)' }}>
        {copy.headers.map((h) => <span key={h}>{h}</span>)}
      </div>

      {rows.map((r) => (
        <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr', gap: 0, paddingBlock: 6, borderBottom: '0.5px solid var(--divider)', alignItems: 'center' }}>
          <EditableText value={r.project} isEditing={editing?.id === r.id && editing.field === 'project'} onStartEdit={() => setEditing({ id: r.id, field: 'project' })} onSave={(v) => { update(r.id, 'project', v); setEditing(null) }} onCancel={() => setEditing(null)} />
          <EditableText value={r.owner} isEditing={editing?.id === r.id && editing.field === 'owner'} onStartEdit={() => setEditing({ id: r.id, field: 'owner' })} onSave={(v) => { update(r.id, 'owner', v); setEditing(null) }} onCancel={() => setEditing(null)} />
          <EditableNumber value={r.hours} isEditing={editing?.id === r.id && editing.field === 'hours'} onStartEdit={() => setEditing({ id: r.id, field: 'hours' })} onSave={(v) => { update(r.id, 'hours', v); setEditing(null) }} onCancel={() => setEditing(null)} />
          <StatusSelect statuses={copy.statuses} value={r.status} onChange={(v) => update(r.id, 'status', v)} />
        </div>
      ))}

      <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--muted)' }}>{copy.hint}</p>
    </div>
  )
}

function EditableText({ value, isEditing, onStartEdit, onSave, onCancel }: { value: string; isEditing: boolean; onStartEdit: () => void; onSave: (v: string) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      setDraft(value)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [isEditing, value])

  if (isEditing) {
    return <input ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={() => onSave(draft)} onKeyDown={(e) => { if (e.key === 'Enter') onSave(draft); if (e.key === 'Escape') onCancel() }} style={editInputStyle} />
  }

  return <button onClick={onStartEdit} style={cellButtonStyle}><span style={{ fontSize: 14, color: 'var(--text)' }}>{value}</span></button>
}

function EditableNumber({ value, isEditing, onStartEdit, onSave, onCancel }: { value: number; isEditing: boolean; onStartEdit: () => void; onSave: (v: number) => void; onCancel: () => void }) {
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

  if (isEditing) return <input ref={inputRef} type="number" value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={tryParse} onKeyDown={(e) => { if (e.key === 'Enter') tryParse(); if (e.key === 'Escape') onCancel() }} style={{ ...editInputStyle, fontFamily: 'var(--font-mono)' }} />

  return <button onClick={onStartEdit} style={cellButtonStyle}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)' }}>{value}h</span></button>
}

function StatusSelect({ statuses, value, onChange }: { statuses: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ appearance: 'none', WebkitAppearance: 'none', padding: '5px 12px', borderRadius: 999, border: 'none', background: 'rgba(16, 185, 129, 0.12)', color: '#0F6E56', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', cursor: 'pointer', width: 'fit-content' }}>
      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
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
}
