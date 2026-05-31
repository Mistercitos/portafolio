import { ViewTransitionLink } from './ViewTransitionLink'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'

const SOCIAL_LINKS = [
  {
    href: 'mailto:cdelbarcog92@gmail.com',
    label: 'cdelbarcog92@gmail.com',
    external: false,
    primary: true,
  },
  { href: 'https://linkedin.com/in/cdelbarco', label: 'LinkedIn', external: true, primary: false },
  { href: 'https://github.com/Mistercitos', label: 'GitHub', external: true, primary: false },
]

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear()
  const t = getUI(locale)

  const navLinks = [
    { href: localizedPath('/trabajo', locale), label: t.nav.work },
    { href: localizedPath('/escribo', locale), label: t.nav.writing },
    { href: localizedPath('/lab', locale), label: t.nav.lab },
    { href: localizedPath('/about', locale), label: t.nav.about },
    { href: localizedPath('/uses', locale), label: t.nav.uses },
    { href: localizedPath('/contact', locale), label: t.nav.contact },
  ]

  return (
    <footer
      style={{
        marginTop: 120,
        paddingBlock: '64px 48px',
        borderTop: '0.5px solid var(--border)',
      }}
    >
      <div
        className="container responsive-grid-2col"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)',
          gap: 40,
          alignItems: 'flex-start',
        }}
      >
        {/* Tagline + ubicación */}
        <div style={{ maxWidth: 360 }}>
          <p
            className="serif"
            style={{
              fontSize: 22,
              fontStyle: 'italic',
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}
          >
            {t.footer.taglinePre}
            <span style={{ color: 'var(--accent)' }}>{t.footer.taglineAccent}</span>
            {t.footer.taglinePost}
          </p>
          <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            {t.footer.location}
          </p>
        </div>

        {/* Navegación */}
        <nav>
          <p style={footerLabel}>{t.footer.navHeading}</p>
          <ul style={{ display: 'grid', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <ViewTransitionLink
                  href={link.href}
                  style={{ fontSize: 14, color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </ViewTransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <p style={footerLabel}>{t.footer.contactHeading}</p>
          <ul style={{ display: 'grid', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  style={{
                    fontSize: 14,
                    color: link.primary ? 'var(--text)' : 'var(--text-secondary)',
                    borderBottom: link.primary ? '1px solid var(--accent)' : 'none',
                    paddingBottom: link.primary ? 1 : 0,
                  }}
                >
                  {link.label}
                  {link.external ? ' ↗' : ''}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="container"
        style={{
          marginTop: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 11,
          color: 'var(--subtle)',
          letterSpacing: '0.04em',
        }}
      >
        <span>© {year} Christian Del Barco</span>
        <span>{t.footer.builtWith}</span>
      </div>
    </footer>
  )
}

const footerLabel: React.CSSProperties = {
  margin: '0 0 14px',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}
