import { Placeholder } from './Placeholder'
import type { Block } from '@/lib/posts'

/**
 * Renderer simple para bloques tipo Portable Text.
 * Mantenemos esta interfaz cerca de Sanity Portable Text para migrar sin reescribir.
 */
export function PortableTextRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: '64ch' }}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return (
              <p key={i} style={paragraphStyle}>
                {b.text}
              </p>
            )

          case 'h2':
            return (
              <h2
                key={i}
                className="serif"
                style={{
                  margin: '32px 0 -4px',
                  fontSize: 'clamp(28px, 3vw, 38px)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                }}
              >
                {b.text}
              </h2>
            )

          case 'h3':
            return (
              <h3
                key={i}
                style={{
                  margin: '16px 0 -8px',
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: 'var(--text)',
                }}
              >
                {b.text}
              </h3>
            )

          case 'pullquote':
            return (
              <blockquote
                key={i}
                className="serif"
                style={{
                  margin: '24px 0',
                  padding: '0 0 0 24px',
                  borderLeft: '2px solid var(--accent)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 22,
                  lineHeight: 1.4,
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}
              >
                {b.text}
              </blockquote>
            )

          case 'ul':
            return (
              <ul key={i} style={listStyle}>
                {b.items.map((it, j) => (
                  <li key={j} style={listItemStyle}>
                    {it}
                  </li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={i} style={{ ...listStyle, counterReset: 'pt-list' }}>
                {b.items.map((it, j) => (
                  <li key={j} style={{ ...listItemStyle, counterIncrement: 'pt-list' }}>
                    <span
                      className="serif"
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        fontStyle: 'italic',
                        fontSize: 13,
                        color: 'var(--accent)',
                      }}
                    >
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    {it}
                  </li>
                ))}
              </ol>
            )

          case 'code':
            return (
              <figure key={i} style={{ margin: 0 }}>
                {b.filename ? (
                  <figcaption
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--subtle)',
                      letterSpacing: '0.02em',
                      marginBottom: 6,
                    }}
                  >
                    {b.filename}
                  </figcaption>
                ) : null}
                <pre
                  style={{
                    margin: 0,
                    padding: 16,
                    borderRadius: 12,
                    background: 'var(--surface-subtle)',
                    border: '0.5px solid var(--border)',
                    overflow: 'auto',
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: 'var(--text)',
                    }}
                  >
                    {b.code}
                  </code>
                </pre>
              </figure>
            )

          case 'placeholder':
            return (
              <Placeholder
                key={i}
                label={b.label}
                caption={b.caption}
                variant={b.variant ?? 'gallery'}
                style={{ margin: '12px 0' }}
              />
            )

          case 'stats':
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${b.items.length}, minmax(0, 1fr))`,
                  gap: 18,
                  padding: '20px 0',
                  borderBlock: '0.5px solid var(--divider)',
                  margin: '12px 0',
                }}
              >
                {b.items.map((it, j) => (
                  <div key={j}>
                    <p
                      className="serif"
                      style={{
                        margin: 0,
                        fontSize: 'clamp(28px, 3.6vw, 44px)',
                        fontStyle: 'italic',
                        fontWeight: 500,
                        lineHeight: 1.05,
                        color: 'var(--text)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {it.value}
                    </p>
                    <p
                      style={{
                        margin: '6px 0 0',
                        fontSize: 12,
                        color: 'var(--muted)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {it.label}
                    </p>
                  </div>
                ))}
              </div>
            )

          case 'divider':
            return (
              <hr
                key={i}
                style={{
                  border: 'none',
                  borderTop: '0.5px solid var(--divider)',
                  margin: '20px 0',
                }}
              />
            )
        }
      })}
    </div>
  )
}

const paragraphStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
}

const listStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'grid',
  gap: 12,
}

const listItemStyle: React.CSSProperties = {
  position: 'relative',
  paddingLeft: 28,
  fontSize: 17,
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
}
