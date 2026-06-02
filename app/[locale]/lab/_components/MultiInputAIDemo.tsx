'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Mode = 'voice' | 'text' | 'paste'

const SAMPLE_NLP =
  'Necesito 4 diseñadores y 2 ingenieros para el sprint del 15 al 22 de mayo en el proyecto Atlas, presupuesto 80h c/u.'

const SAMPLE_PASTE = `Diseñadores, 4, 80h
Ingenieros, 2, 80h
Proyecto, Atlas
Inicio, 2026-05-15
Fin, 2026-05-22`

const PARSED_OUTPUT = [
  { field: 'Proyecto', value: 'Atlas' },
  { field: 'Fecha de inicio', value: '15 mayo 2026' },
  { field: 'Fecha de término', value: '22 mayo 2026' },
  { field: 'Diseñadores', value: '4 × 80h' },
  { field: 'Ingenieros', value: '2 × 80h' },
]

/**
 * Multi-input AI assist.
 *
 * Pattern: la misma intención del usuario puede expresarse de tres formas
 * (voz, texto natural, paste estructurado). Las tres convergen en el mismo
 * objeto interno + pantalla de preview compartida.
 */
export function MultiInputAIDemo() {
  const [mode, setMode] = useState<Mode>('text')
  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState(false)
  const [processing, setProcessing] = useState(false)

  const process = () => {
    if (input.trim().length === 0) return
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setParsed(true)
    }, 900)
  }

  const reset = () => {
    setParsed(false)
    setInput('')
  }

  const setMode_ = (m: Mode) => {
    setMode(m)
    setParsed(false)
    if (m === 'text') setInput(SAMPLE_NLP)
    if (m === 'paste') setInput(SAMPLE_PASTE)
    if (m === 'voice') setInput('')
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {(['text', 'paste', 'voice'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode_(m)}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: '0.5px solid',
              borderColor: mode === m ? 'var(--accent)' : 'var(--border-strong)',
              background: mode === m ? 'var(--accent-weak)' : 'transparent',
              color: mode === m ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {m === 'text' ? 'NLP' : m === 'paste' ? 'Pegar Excel' : 'Voz'}
          </button>
        ))}
      </div>

      <div>
        {mode === 'voice' ? (
          <div
            style={{
              padding: 32,
              borderRadius: 14,
              border: '0.5px dashed var(--border-strong)',
              background: 'var(--surface-subtle)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                margin: '0 auto 14px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-inverse)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
              Mantén presionado y dicta: &ldquo;4 diseñadores y 2 ingenieros, sprint del 15 al 22 de
              mayo, 80h cada uno&rdquo;
            </p>
          </div>
        ) : (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'text' ? 'Describe en lenguaje natural...' : 'Pega filas separadas por coma o tab...'}
            rows={mode === 'paste' ? 6 : 4}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: '0.5px solid var(--border-strong)',
              background: 'var(--panel)',
              color: 'var(--text)',
              fontFamily: mode === 'paste' ? 'var(--font-mono)' : 'inherit',
              fontSize: mode === 'paste' ? 12 : 14,
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
            }}
          />
        )}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={process}
          disabled={input.trim().length === 0 || processing}
          style={{
            padding: '12px 20px',
            borderRadius: 999,
            border: 'none',
            background: input.trim().length === 0 ? 'var(--accent-weak)' : 'var(--accent)',
            color: input.trim().length === 0 ? 'var(--accent)' : 'var(--text-inverse)',
            fontSize: 14,
            fontWeight: 500,
            cursor: input.trim().length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          {processing ? 'Procesando…' : '✨ Procesar con IA'}
        </button>
        {parsed ? (
          <button
            onClick={reset}
            style={{
              padding: '12px 20px',
              borderRadius: 999,
              border: '0.5px solid var(--border-strong)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Reiniciar
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {parsed ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: 18,
              borderRadius: 14,
              background: 'rgba(16, 185, 129, 0.06)',
              border: '0.5px solid rgba(16, 185, 129, 0.35)',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#0F6E56',
                marginBottom: 12,
              }}
            >
              ✓ Parseado · pantalla de preview compartida
            </p>
            <div style={{ display: 'grid', gap: 8 }}>
              {PARSED_OUTPUT.map((row) => (
                <div
                  key={row.field}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBlock: 6,
                    borderBottom: '0.5px solid var(--divider)',
                  }}
                >
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.field}</span>
                  <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
