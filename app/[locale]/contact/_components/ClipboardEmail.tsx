'use client'

import { useState } from 'react'

export function ClipboardEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback: forzar mailto
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <a
        href={`mailto:${email}`}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(18px, 2.4vw, 24px)',
          color: 'var(--text)',
          borderBottom: '1px solid var(--accent)',
          paddingBottom: 2,
        }}
      >
        {email}
      </a>
      <button
        onClick={copy}
        aria-label="Copiar email al portapapeles"
        style={{
          padding: '8px 14px',
          borderRadius: 999,
          border: '0.5px solid var(--border-strong)',
          background: copied ? 'var(--accent-weak)' : 'transparent',
          color: copied ? 'var(--accent)' : 'var(--text-secondary)',
          fontSize: 12,
          cursor: 'pointer',
          letterSpacing: '0.04em',
          transition: 'all var(--t-fast) var(--ease)',
        }}
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
    </div>
  )
}
