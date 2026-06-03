'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Locale } from '@/lib/i18n'

const STATES = {
  es: [
    { id: 'no-results', eyebrow: 'Sin resultados', title: 'Prueba con otros filtros.', body: 'Tu búsqueda no encontró coincidencias. Quita un filtro o amplía el criterio para revisar más resultados.', action: 'Limpiar filtros' },
    { id: 'first-use', eyebrow: 'Primera vez', title: 'Empieza creando tu primer proyecto.', body: 'Aquí aparecerán los proyectos que crees. El primero toma cerca de 2 minutos.', action: 'Crear proyecto' },
    { id: 'error', eyebrow: 'Algo falló', title: 'No pudimos cargar los datos.', body: 'Hubo un problema de conexión con el servidor. Tu avance está guardado; actualiza la página para intentarlo otra vez.', action: 'Reintentar' },
    { id: 'permission', eyebrow: 'Permisos', title: 'No tienes acceso a esta sección.', body: 'Pide acceso a un administrador del espacio de trabajo o cambia a uno donde ya tengas permisos.', action: 'Pedir acceso' },
  ],
  en: [
    { id: 'no-results', eyebrow: 'No results', title: 'Try different filters.', body: 'Your search did not find any matches. Remove a filter or broaden the criteria to review more results.', action: 'Clear filters' },
    { id: 'first-use', eyebrow: 'First time', title: 'Start by creating your first project.', body: 'The projects you create will appear here. The first one takes about 2 minutes.', action: 'Create project' },
    { id: 'error', eyebrow: 'Something failed', title: 'We could not load the data.', body: 'There was a connection problem with the server. Your progress is saved; refresh the page to try again.', action: 'Retry' },
    { id: 'permission', eyebrow: 'Permissions', title: 'You do not have access to this section.', body: 'Ask a workspace admin for access or switch to a workspace where you already have permissions.', action: 'Request access' },
  ],
} as const

export function EmptyStatesDemo({ locale = 'es' }: { locale?: Locale }) {
  const states = STATES[locale]
  const [activeId, setActiveId] = useState<string>(states[0].id)
  const active = states.find((s) => s.id === activeId) ?? states[0]

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {states.map((s) => (
          <button key={s.id} onClick={() => setActiveId(s.id)} style={tabStyle(activeId === s.id)}>
            {s.eyebrow}
          </button>
        ))}
      </div>

      <div style={{ minHeight: 280, padding: 32, borderRadius: 16, background: 'var(--surface-subtle)', border: '0.5px dashed var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: 'center', maxWidth: 380 }}>
            <Glyph id={active.id} />
            <p style={{ margin: '0 0 10px', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>
              {active.eyebrow}
            </p>
            <h3 className="serif" style={{ margin: '0 0 12px', fontSize: 24, fontStyle: 'italic', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', letterSpacing: '-0.01em' }}>
              {active.title}
            </h3>
            <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {active.body}
            </p>
            <button style={{ padding: '10px 18px', borderRadius: 999, border: 'none', background: 'var(--accent)', color: 'var(--text-inverse)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              {active.action}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Glyph({ id }: { id: string }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { color: 'var(--muted)', display: 'block', margin: '0 auto 18px' },
    'aria-hidden': true,
  }
  if (id === 'no-results') {
    return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
  }
  if (id === 'first-use') return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
  if (id === 'error') return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
  if (id === 'permission') return <svg {...common}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
  return null
}

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '7px 12px',
  borderRadius: 999,
  border: '0.5px solid',
  borderColor: active ? 'var(--accent)' : 'var(--border-strong)',
  background: active ? 'var(--accent-weak)' : 'transparent',
  color: active ? 'var(--accent)' : 'var(--text-secondary)',
  fontSize: 12,
  fontWeight: 500,
  cursor: 'pointer',
})
