import { ViewTransitionLink } from './ViewTransitionLink'

type Props = {
  section: string
  preview: string
  expected?: string
}

export function ComingSoon({ section, preview, expected }: Props) {
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 720 }}>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--subtle)',
          marginBottom: 14,
        }}
      >
        {section}
      </p>
      <h1
        className="serif"
        style={{
          margin: 0,
          fontSize: 'clamp(40px, 5.4vw, 72px)',
          fontWeight: 500,
          fontStyle: 'italic',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          color: 'var(--text)',
        }}
      >
        En construcción.
      </h1>
      <p
        style={{
          margin: '28px 0 0',
          fontSize: 17,
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
        }}
      >
        {preview}
      </p>
      {expected ? (
        <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--muted)' }}>
          Estimado: {expected}
        </p>
      ) : null}
      <ViewTransitionLink
        href="/"
        style={{
          display: 'inline-block',
          marginTop: 36,
          fontSize: 14,
          color: 'var(--text-secondary)',
          borderBottom: '1px solid var(--accent)',
          paddingBottom: 2,
        }}
      >
        ← Volver al inicio
      </ViewTransitionLink>
    </div>
  )
}
