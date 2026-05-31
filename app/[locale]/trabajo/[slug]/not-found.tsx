import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: 120, textAlign: 'center' }}>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--subtle)',
          marginBottom: 16,
        }}
      >
        404
      </p>
      <h1
        className="serif"
        style={{
          margin: 0,
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.1,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
        }}
      >
        Ese case study no existe (todavía).
      </h1>
      <ViewTransitionLink
        href="/"
        style={{
          display: 'inline-block',
          marginTop: 28,
          padding: '12px 22px',
          borderRadius: 999,
          background: 'var(--accent)',
          color: 'var(--text-inverse)',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Volver al inicio
      </ViewTransitionLink>
    </div>
  )
}
