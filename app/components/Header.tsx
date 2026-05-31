'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ViewTransitionLink } from './ViewTransitionLink'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitch } from './LanguageSwitch'
import { getUI, localizedPath, type Locale } from '@/lib/i18n'

export function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = getUI(locale)

  const navItems = [
    { href: localizedPath('/trabajo', locale), label: t.nav.work },
    { href: localizedPath('/escribo', locale), label: t.nav.writing },
    { href: localizedPath('/lab', locale), label: t.nav.lab },
    { href: localizedPath('/about', locale), label: t.nav.about },
  ]
  const contactItem = { href: localizedPath('/contact', locale), label: t.nav.contact }
  const homeHref = localizedPath('/', locale)

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll cuando el menú mobile está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const isActive = (href: string) => {
    if (href === homeHref) return pathname === homeHref
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled
            ? 'color-mix(in oklab, var(--bg) 88%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
          borderBottom: scrolled ? '0.5px solid var(--border)' : '0.5px solid transparent',
          transition: 'background var(--t) var(--ease), border-color var(--t) var(--ease)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBlock: scrolled ? 14 : 20,
            transition: 'padding var(--t) var(--ease)',
          }}
        >
          <ViewTransitionLink
            href={homeHref}
            style={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <span style={{ color: 'var(--accent)' }}>.</span>
            <span>chrisdelbarco</span>
          </ViewTransitionLink>

          {/* Desktop nav */}
          <nav className="hide-on-mobile" style={{ alignItems: 'center', gap: 28 }}>
            <ul style={{ display: 'flex', gap: 24, margin: 0, padding: 0, listStyle: 'none' }}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} active={isActive(item.href)}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <ViewTransitionLink
              href={contactItem.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                borderRadius: 999,
                background: isActive(contactItem.href) ? 'var(--accent)' : 'transparent',
                border: '0.5px solid',
                borderColor: 'var(--accent)',
                color: isActive(contactItem.href) ? 'var(--text-inverse)' : 'var(--accent)',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.01em',
                transition:
                  'background var(--t-fast) var(--ease), color var(--t-fast) var(--ease)',
              }}
            >
              {contactItem.label}
            </ViewTransitionLink>

            <LanguageSwitch locale={locale} />
            <ThemeToggle />
          </nav>

          {/* Mobile controls */}
          <div className="show-on-mobile" style={{ alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.header.openMenu}
              aria-expanded={menuOpen}
              style={hamburgerStyle}
            >
              <span style={hamburgerLineStyle} />
              <span style={hamburgerLineStyle} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'color-mix(in oklab, var(--bg) 60%, transparent)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 100,
              }}
              aria-hidden
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={t.header.menuLabel}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: 'var(--bg)',
                borderBottom: '0.5px solid var(--border)',
                zIndex: 101,
                paddingBottom: 24,
              }}
            >
              <div
                className="container"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBlock: 20,
                }}
              >
                <ViewTransitionLink
                  href={homeHref}
                  style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}
                >
                  <span style={{ color: 'var(--accent)' }}>.</span>chrisdelbarco
                </ViewTransitionLink>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t.header.closeMenu}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '0.5px solid var(--border-strong)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 18,
                    lineHeight: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </button>
              </div>

              <nav className="container" style={{ paddingTop: 12 }}>
                <ul
                  style={{
                    display: 'grid',
                    gap: 4,
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                  }}
                >
                  {[...navItems, contactItem].map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <ViewTransitionLink
                        href={item.href}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          paddingBlock: 16,
                          borderBottom: '0.5px solid var(--divider)',
                          fontSize: 'clamp(28px, 7vw, 40px)',
                          fontWeight: 500,
                          letterSpacing: '-0.02em',
                          color: isActive(item.href) ? 'var(--accent)' : 'var(--text)',
                        }}
                      >
                        <span>{item.label}</span>
                        {isActive(item.href) ? (
                          <span
                            className="serif"
                            style={{
                              fontSize: 14,
                              fontStyle: 'italic',
                              color: 'var(--accent)',
                            }}
                          >
                            {t.header.current}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--muted)', fontSize: 14 }} aria-hidden>
                            →
                          </span>
                        )}
                      </ViewTransitionLink>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginTop: 24 }}
                >
                  <LanguageSwitch locale={locale} variant="drawer" />
                </motion.div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <ViewTransitionLink
      href={href}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        color: active ? 'var(--text)' : 'var(--text-secondary)',
        fontWeight: 500,
        letterSpacing: '0.01em',
        transition: 'color var(--t-fast) var(--ease)',
      }}
    >
      <span>{children}</span>
      {active ? (
        <motion.span
          layoutId="nav-active-dot"
          aria-hidden
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : null}
    </ViewTransitionLink>
  )
}

const hamburgerStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
  border: '0.5px solid var(--border-strong)',
  background: 'transparent',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0,
}

const hamburgerLineStyle: React.CSSProperties = {
  display: 'block',
  width: 14,
  height: 1,
  background: 'var(--text-secondary)',
}
