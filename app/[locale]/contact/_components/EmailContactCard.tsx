'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

type Reason = {
  id: string
  label: string
  subject: string
  body?: string
}

type CardStrings = {
  directEmail: string
  copy: string
  copied: string
  copyAria: string
  whatAbout: string
  helper: string
  subject: string
  openEmail: string
  reasons: Reason[]
}

const STRINGS: Record<Locale, CardStrings> = {
  es: {
    directEmail: 'Email directo',
    copy: 'Copiar',
    copied: '✓ Copiado',
    copyAria: 'Copiar email al portapapeles',
    whatAbout: '¿De qué se trata?',
    helper:
      'Elige el tipo de mensaje y abro tu cliente de email con el asunto y una plantilla de inicio.',
    subject: 'Asunto',
    openEmail: 'Abrir email',
    reasons: [
      {
        id: 'job',
        label: 'Oportunidad laboral',
        subject: 'Oportunidad laboral · Senior Product Designer',
        body: 'Hola Christian,\n\nTe escribo desde [empresa] sobre una posición de [rol] en nuestro equipo de [contexto].\n\n[Breve descripción del producto y stage]\n\nMe gustaría hablar contigo para entender si encaja.\n\n[Tu nombre]',
      },
      {
        id: 'freelance',
        label: 'Freelance / consultoría',
        subject: 'Freelance · Proyecto',
        body: 'Hola Christian,\n\nTengo un proyecto donde necesitamos:\n— Tipo: [design system / AI UX / marketplace / B2B SaaS]\n— Duración estimada: [semanas]\n— Modalidad: [remoto / hybrid]\n\n[Contexto breve]\n\nDime si te interesa que hablemos.\n\n[Tu nombre]',
      },
      {
        id: 'collab',
        label: 'Colaboración / speaking',
        subject: 'Colaboración · Speaking · Workshop',
        body: 'Hola Christian,\n\nMe interesa invitarte a [evento / podcast / workshop] sobre [tema].\n\n[Detalles]\n\n[Tu nombre]',
      },
      {
        id: 'other',
        label: 'Otra cosa',
        subject: 'Hola',
        body: '',
      },
    ],
  },
  en: {
    directEmail: 'Direct email',
    copy: 'Copy',
    copied: '✓ Copied',
    copyAria: 'Copy email to clipboard',
    whatAbout: "What's it about?",
    helper:
      "Pick the type of message and I'll open your email client with the subject line and a starter template.",
    subject: 'Subject',
    openEmail: 'Open email',
    reasons: [
      {
        id: 'job',
        label: 'Job opportunity',
        subject: 'Job opportunity · Senior Product Designer',
        body: "Hi Christian,\n\nI'm reaching out from [company] about a [role] position on our [context] team.\n\n[Brief description of the product and stage]\n\nI'd like to talk to see if it's a fit.\n\n[Your name]",
      },
      {
        id: 'freelance',
        label: 'Freelance / consulting',
        subject: 'Freelance · Project',
        body: "Hi Christian,\n\nI have a project where we need:\n— Type: [design system / AI UX / marketplace / B2B SaaS]\n— Estimated duration: [weeks]\n— Setup: [remote / hybrid]\n\n[Brief context]\n\nLet me know if you'd like to talk.\n\n[Your name]",
      },
      {
        id: 'collab',
        label: 'Collaboration / speaking',
        subject: 'Collaboration · Speaking · Workshop',
        body: "Hi Christian,\n\nI'd like to invite you to [event / podcast / workshop] about [topic].\n\n[Details]\n\n[Your name]",
      },
      {
        id: 'other',
        label: 'Something else',
        subject: 'Hello',
        body: '',
      },
    ],
  },
}

export function EmailContactCard({ email, locale }: { email: string; locale: Locale }) {
  const t = STRINGS[locale]
  const [reasonId, setReasonId] = useState<string>('job')
  const [copied, setCopied] = useState(false)

  const reason = t.reasons.find((r) => r.id === reasonId) ?? t.reasons[0]
  const params = new URLSearchParams()
  params.set('subject', reason.subject)
  if (reason.body) params.set('body', reason.body)
  const mailtoHref = `mailto:${email}?${params.toString()}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div
      style={{
        padding: 32,
        borderRadius: 22,
        background: 'var(--panel)',
        border: '0.5px solid var(--border)',
        boxShadow: 'var(--shadow-soft)',
        display: 'grid',
        gap: 28,
      }}
    >
      {/* Email + copy */}
      <div>
        <p style={pillLabel}>{t.directEmail}</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
            marginTop: 8,
          }}
        >
          <a
            href={`mailto:${email}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(18px, 2.4vw, 26px)',
              color: 'var(--text)',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            {email}
          </a>
          <button
            onClick={copy}
            aria-label={t.copyAria}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: '0.5px solid var(--border-strong)',
              background: copied ? 'var(--accent-weak)' : 'transparent',
              color: copied ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all var(--t-fast) var(--ease)',
            }}
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>
      </div>

      {/* Pre-filled subjects */}
      <div style={{ paddingTop: 24, borderTop: '0.5px solid var(--divider)' }}>
        <p style={pillLabel}>{t.whatAbout}</p>
        <p style={{ margin: '6px 0 16px', fontSize: 13, color: 'var(--muted)' }}>{t.helper}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {t.reasons.map((r) => {
            const active = r.id === reasonId
            return (
              <button
                key={r.id}
                onClick={() => setReasonId(r.id)}
                aria-pressed={active}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: `0.5px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
                  background: active ? 'var(--accent-weak)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  transition: 'all var(--t-fast) var(--ease)',
                }}
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Preview subject + send button */}
      <div
        style={{
          paddingTop: 24,
          borderTop: '0.5px solid var(--divider)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ ...pillLabel, marginBottom: 6 }}>{t.subject}</p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--text)',
              wordBreak: 'break-word',
            }}
          >
            {reason.subject}
          </p>
        </div>
        <a
          href={mailtoHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 22px',
            borderRadius: 999,
            background: 'var(--accent)',
            color: 'var(--text-inverse)',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {t.openEmail}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}

const pillLabel: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}
