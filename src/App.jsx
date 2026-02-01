
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { HeroRotator } from './components/HeroRotator'
import { MotionCard } from './components/MotionCard'
import { Chip } from './components/ui/Chip'
import { Panel } from './components/ui/Panel'
import { Section as UiSection } from './components/ui/Section'
import { LanguageProvider, useI18n } from './context/LanguageContext'
import { getLangFromPath } from './i18n'
import { Reveal } from './motion/Reveal'
import { Stagger, StaggerItem } from './motion/Stagger'
import { PageTransition } from './motion/PageTransition'
import { motionTokens } from './motion/tokens'

const NAV_LINKS = [
  { key: 'work', href: '/work' },
  { key: 'best', href: '/best-of-both-worlds' },
  { key: 'about', href: '/about' },
]


const WORK_PROFESSIONAL = [
  {
    title: 'Wolf - Marketplace Platform for Staffing Companies',
    meta: 'Design Lead - Product & UX Strategy - Web + Mobile',
    teaser:
      'Multi-sided marketplace with high-frequency operational workflows, design system foundations, and a JobSeeker mobile app built from scratch.',
    href: '/work/wolf',
    category: 'Marketplace',
  },
  {
    title: 'Outbuild / Ipsum - Construction Project Management Platform',
    meta: 'Senior Product Designer - Marketing Director - B2B SaaS',
    teaser:
      'Digitizing complex construction workflows with clarity, adoption-first UX, and product positioning for international expansion.',
    href: '/work/outbuild',
    category: 'B2B SaaS',
  },
  {
    title: 'LFI - Digital Agency',
    meta: 'Digital Graphic Designer - Multi-industry',
    teaser:
      'High-volume, high-visibility digital and audiovisual assets across corporate and public-sector clients - brand consistency at scale.',
    href: '/work/lfi',
    category: 'Agency',
  },
]

const WORK_PERSONAL = [
  {
    title: 'Astros - Travel Planning & Social Experience',
    meta: 'Product Concept - Web/Mobile - 2021',
    teaser:
      'A centralized travel system with a useful social layer for coordination - not noise.',
    href: '/work/astros',
  },
  {
    title: 'DeliveryNow - Sustainable Food Delivery Experience',
    meta: 'Product Concept - Mobile - 2021',
    teaser:
      'Exploring how a delivery experience can encourage conscious consumption without adding friction.',
    href: '/work/deliverynow',
  },
  {
    title: 'PlannyMe - Personal Planning & Agenda Management',
    meta: 'Product Concept - Mobile - 2022',
    teaser:
      'A calm, flexible planning experience designed to reduce friction and support habit-building over pressure.',
    href: '/work/plannyme',
  },
]

const CASES = {
  wolf: {
    title: 'Wolf - Marketplace Platform for Staffing Companies',
    role: 'Design Lead - Product & UX Strategy',
    platforms: 'Web + Mobile',
    industries: 'Staffing - Workforce - Marketplace',
    year: '2022-2026',
    overview:
      'Wolf is a multi-sided staffing marketplace connecting enterprises, staffing companies, and job seekers in fast-moving operational environments. My focus was to align product strategy, UX, and design systems to scale workflows across roles.',
    challenge: [
      { title: 'Multi-sided complexity', body: 'Serving job seekers, staffing partners, and enterprise admins with distinct goals and tools.' },
      { title: 'Operational speed', body: 'Designing workflows for high-frequency scheduling and compliance-heavy decisions.' },
    ],
    roleItems: [
      'Product and UX strategy across web and mobile surfaces',
      'Design system definition and adoption with engineering',
      'Discovery, prototyping, handoff, and QA',
      'Cross-team alignment with product, engineering, and operations',
    ],
    strategy: [
      { title: 'Strategy decisions', body: 'Prioritized core workflows that drive staffing throughput and reduced cognitive load across roles.' },
      { title: 'UX decisions', body: 'Introduced reusable patterns for scheduling, approval, and status visibility.' },
      { title: 'Technical constraints', body: 'Aligned system components with frontend architecture to speed delivery.' },
    ],
    execution: [
      { title: 'Design System & engineering collaboration', body: 'Built a scalable component library and documentation for rapid releases.' },
      { title: 'Web platform', body: 'Streamlined enterprise dashboards for capacity planning and staffing oversight.' },
      { title: 'Mobile app (JobSeekers)', body: 'Created a mobile-first experience for shifts, availability, and notifications.' },
    ],
    outcomes: [
      'Faster staffing workflows through consistent UI patterns',
      'Improved operational visibility for enterprise teams',
      'Scaled design system adoption across product squads',
    ],
    takeaways: [
      'Clear ownership and system thinking reduce complexity',
      'Operational products demand fast, low-friction UX',
      'Design systems are essential for scale and velocity',
    ],
  },
  outbuild: {
    title: 'Outbuild / Ipsum - Construction Project Management Platform',
    role: 'Senior Product Designer - Marketing Director',
    platforms: 'Web',
    industries: 'Construction - B2B SaaS',
    year: '2019-2021',
    overview:
      'Outbuild/Ipsum digitized construction workflows that were historically analog, fragmented, and hard to scale. The goal was usability, adoption, and clarity across distributed teams.',
    challenge: [
      { title: 'Adoption-focused design', body: 'Designing for teams new to digital workflows while avoiding disruption.' },
      { title: 'Low connectivity environments', body: 'Ensuring critical tasks worked reliably in low-connectivity scenarios.' },
    ],
    roleItems: [
      'End-to-end UX strategy and workflow mapping',
      'Design system foundations for consistent delivery',
      'Product positioning alongside marketing direction',
    ],
    strategy: [
      { title: 'Strategy decisions', body: 'Focused on the highest-impact field workflows and reporting clarity.' },
      { title: 'UX decisions', body: 'Designed for minimal input, fast scanning, and predictable navigation.' },
    ],
    execution: [
      { title: 'Execution', body: 'Delivered responsive workflows for project managers, foremen, and exec views.' },
    ],
    outcomes: [
      'Higher adoption from field teams through simplified flows',
      'Improved reporting visibility for leadership',
      'Clear UX standards that scaled across features',
    ],
    takeaways: [
      'Adoption requires empathy for real-world constraints',
      'Clarity beats complexity in operational SaaS',
    ],
  },
  lfi: {
    title: 'LFI - Digital Agency',
    role: 'Digital Graphic Designer',
    platforms: 'Multi-channel',
    industries: 'Enterprise - Public Sector',
    year: '2018-2019',
    overview:
      'At LFI, I delivered high-volume, brand-consistent assets for enterprise and public-sector clients while maintaining speed and quality.',
    challenge: [
      { title: 'Execution at scale', body: 'Delivering high-volume assets without sacrificing brand consistency.' },
      { title: 'Multi-channel delivery', body: 'Ensuring visual coherence across digital and audiovisual touchpoints.' },
    ],
    roleItems: [
      'End-to-end asset production and QA',
      'Brand system adherence and refinement',
      'Cross-team collaboration for fast turnarounds',
    ],
    strategy: [
      { title: 'Strategy decisions', body: 'Established reusable visual modules for rapid production.' },
    ],
    execution: [
      { title: 'Execution', body: 'Produced high-volume assets across campaigns, corporate and public-sector clients.' },
    ],
    outcomes: [
      'Improved consistency across multi-channel campaigns',
      'Faster delivery cycles through modular design',
    ],
    takeaways: [
      'Consistency is a product in itself',
      'Reusable patterns speed delivery without losing quality',
    ],
  },
  deliverynow: {
    title: 'DeliveryNow - Sustainable Food Delivery Experience',
    role: 'Product Concept',
    platforms: 'Mobile',
    industries: 'Logistics - Delivery',
    year: '2021',
    overview:
      'DeliveryNow explored how delivery experiences can encourage sustainable choices while keeping workflows efficient.',
  },
  plannyme: {
    title: 'PlannyMe - Personal Planning & Agenda Management',
    role: 'Product Concept',
    platforms: 'Mobile',
    industries: 'Productivity',
    year: '2022',
    overview:
      'PlannyMe focused on a calm planning experience to support habit-building and reduce friction.',
  },
  astros: {
    title: 'Astros - Travel Planning & Social Experience',
    role: 'Product Concept',
    platforms: 'Web/Mobile',
    industries: 'Travel',
    year: '2021',
    overview:
      'Astros explored a centralized travel system with a purposeful social layer for coordination.',
  },
}
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

function AppRoutes() {
  const location = useLocation()
  const lang = getLangFromPath(location.pathname)

  return (
    <LanguageProvider lang={lang}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<CaseStudy />} />
            <Route path="best-of-both-worlds" element={<BestOfBothWorlds />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="es" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<CaseStudy />} />
            <Route path="best-of-both-worlds" element={<BestOfBothWorlds />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </LanguageProvider>
  )
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return null
}

function AppLayout() {
  return (
    <div className="bg-charcoal text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { lang, t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const prefix = lang === 'es' ? '/es' : ''
  const LANGS = [
    { code: 'EN', label: 'English', value: 'en', prefix: '' },
    { code: 'ES', label: 'Español', value: 'es', prefix: '/es' },
  ]
  const basePath = location.pathname.replace(/^\/es(?=\/|$)/, '') || '/'
  const langMenuRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 48)
        frame = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => setMenuOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  useEffect(() => {
    if (!langOpen) return
    const onClick = (event) => {
      if (!langMenuRef.current) return
      if (!langMenuRef.current.contains(event.target)) {
        setLangOpen(false)
      }
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setLangOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-[padding,background,box-shadow] duration-200 ${
        isScrolled
          ? 'bg-[var(--surface-1)] shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur'
          : 'bg-charcoal'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-200 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <Link to={`${prefix}/`} className="text-sm font-semibold tracking-[0.1em]">
          <span className="accent">.</span>ChristianDelBarco
        </Link>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.35em] md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={`${prefix}${link.href}`}
              className={({ isActive }) =>
                `pb-1 transition hover:text-white ${isActive ? 'is-active' : 'text-white/60'}`
              }
            >
              <span className="accent-underline">{t.nav[link.key]}</span>
            </NavLink>
          ))}
          <Link
            to={`${prefix}/contact`}
            className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white transition hover:border-white hover:bg-[var(--surface-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
          >
            {t.nav.contact}
          </Link>
          <div className="lang-menu" ref={langMenuRef}>
            <button
              type="button"
              className="lang-menu__trigger"
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((prev) => !prev)}
            >
              <span className="lang-menu__label">
                {LANGS.find((option) => option.value === lang)?.code}
              </span>
              <span className="lang-menu__caret" aria-hidden="true">▾</span>
            </button>
            {langOpen ? (
              <div className="lang-menu__panel" role="menu">
                {LANGS.map((option) => {
                  const isActive = option.value === lang
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="menuitem"
                      className={`lang-menu__option ${isActive ? 'is-active' : ''}`}
                      onClick={() => {
                        if (!isActive) navigate(`${option.prefix}${basePath}`)
                        setLangOpen(false)
                      }}
                    >
                      <span className="lang-menu__code">{option.code}</span>
                      <span className="lang-menu__name">{option.label}</span>
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>
        </nav>
        <button
          className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-2 text-xs uppercase tracking-[0.4em] text-white md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-charcoal/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-6 text-sm uppercase tracking-[0.35em]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={`${prefix}${link.href}`}
                className="text-white/70 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link
              to={`${prefix}/contact`}
              className="rounded-full border border-white/30 px-4 py-3 text-center text-xs uppercase tracking-[0.4em] text-white hover:bg-[var(--surface-2)]"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
            <div className="lang-menu lang-menu--mobile" ref={langMenuRef}>
              <button
                type="button"
                className="lang-menu__trigger"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((prev) => !prev)}
              >
                <span className="lang-menu__label">
                  {LANGS.find((option) => option.value === lang)?.code}
                </span>
                <span className="lang-menu__caret" aria-hidden="true">▾</span>
              </button>
              {langOpen ? (
                <div className="lang-menu__panel" role="menu">
                  {LANGS.map((option) => {
                    const isActive = option.value === lang
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="menuitem"
                        className={`lang-menu__option ${isActive ? 'is-active' : ''}`}
                        onClick={() => {
                          if (!isActive) navigate(`${option.prefix}${basePath}`)
                          setLangOpen(false)
                          setMenuOpen(false)
                        }}
                      >
                        <span className="lang-menu__code">{option.code}</span>
                        <span className="lang-menu__name">{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const { t } = useI18n()
  const SOCIALS = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/cdelbarco/',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-9.5 7H7v7h2.5v-7Zm-.25-3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM17 13.25c0-2.06-1.1-3.25-2.87-3.25-1.35 0-2.02.75-2.36 1.28V10H9.5v7h2.5v-3.6c0-.95.18-1.86 1.36-1.86s1.32 1.13 1.32 1.92V17H17v-3.75Z"
          />
        </svg>
      ),
    },
    {
      label: 'Behance',
      href: 'https://www.behance.net/chrisdelbarco',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M8.6 12.08c.96-.28 1.63-1.05 1.63-2.12 0-1.67-1.13-2.66-3.2-2.66H3v10h4.33c2.38 0 3.72-1.06 3.72-3.04 0-1.37-.75-2.26-2.45-2.18Zm-3.1-3.05h1.93c.97 0 1.54.42 1.54 1.22 0 .84-.57 1.28-1.6 1.28H5.5V9.03Zm2.15 6.27H5.5V12.9h2.18c1.1 0 1.7.45 1.7 1.2 0 .82-.6 1.2-1.73 1.2ZM21 12.78c0-2.64-1.53-4.1-3.86-4.1-2.43 0-4.04 1.65-4.04 4.17 0 2.63 1.62 4.19 4.17 4.19 1.63 0 2.86-.74 3.44-2.04l-1.63-.5c-.29.62-.86.95-1.72.95-1.15 0-1.86-.62-1.96-1.7H21v-.97Zm-5.96-.67c.1-.98.77-1.6 1.9-1.6 1.07 0 1.69.59 1.77 1.6h-3.67ZM14.5 7.2h4.1V5.8h-4.1v1.4Z"
          />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Mistercitos',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.46-1.17-1.13-1.48-1.13-1.48-.93-.63.07-.62.07-.62 1.03.07 1.58 1.06 1.58 1.06.92 1.57 2.41 1.12 3 .85.09-.66.36-1.12.65-1.38-2.21-.25-4.54-1.11-4.54-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.37.32.7.95.7 1.92v2.84c0 .27.18.59.69.48A10 10 0 0 0 12 2Z"
          />
        </svg>
      ),
    },
  ]

  return (
    <footer className="mt-24 border-t border-white/8 bg-black/20">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="text-sm text-white/45">{t.footer.name}</div>
          <div className="flex flex-wrap items-center gap-5 md:justify-end">
            <span className="text-xs text-white/35">
              {t.footer.copyright.replace('{year}', new Date().getFullYear())}
            </span>
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-white/45 transition hover:text-[var(--accent)]"
                >
                  <span className="sr-only">{social.label}</span>
                  <span className="block h-5 w-5">{social.icon}</span>
                </a>
              ))}
            </div>
            <button
              className="text-xs text-white/50 transition hover:text-[var(--accent)]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              type="button"
            >
              {t.common.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  const location = useLocation()
  const { t } = useI18n()

  useEffect(() => {
    if (location.hash === '#approach') {
      const el = document.getElementById('approach')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  return (
    <>
      <Section size="text" className="py-28">
        <HeroRotatingValue />
      </Section>
      <Section size="text" className="py-20" id="approach">
        <ApproachGrid />
      </Section>
      <Section size="cards" className="py-20">
        <PortfolioGuide />
      </Section>
      <Section size="text" className="py-20">
        <ProofPoints title={t.proofPoints.title} items={t.proofPoints.items} />
      </Section>
      <Section size="text" className="py-28">
        <CTASection />
      </Section>
    </>
  )
}

function Work() {
  const [activeSection, setActiveSection] = useState('professional')
  const [activeFilter, setActiveFilter] = useState('All')
  const { t } = useI18n()
  const filterOptions = [
    { label: t.work.professional.filters[0], value: 'All' },
    { label: t.work.professional.filters[1], value: 'Marketplace' },
    { label: t.work.professional.filters[2], value: 'B2B SaaS' },
    { label: t.work.professional.filters[3], value: 'Agency' },
  ]
  const filterCounts = useMemo(() => {
    return filterOptions.reduce((acc, option) => {
      if (option.value === 'All') {
        acc[option.value] = WORK_PROFESSIONAL.length
        return acc
      }
      acc[option.value] = WORK_PROFESSIONAL.filter((card) => card.category === option.value).length
      return acc
    }, {})
  }, [filterOptions])

  useEffect(() => {
    const sections = ['professional', 'personal']
    const observers = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const professionalCards =
    activeFilter === 'All'
      ? WORK_PROFESSIONAL
      : WORK_PROFESSIONAL.filter((card) => card.category === activeFilter)

  const handleAnchorClick = (event, targetId) => {
    event.preventDefault()
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <Section size="text" className="pt-24 pb-16">
        <div className="container">
          <section className="section" style={{ paddingTop: 120 }}>
            <div style={{ maxWidth: 820 }}>
              <h1 style={{ fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.02, margin: 0 }}>
                {renderAccentText(t.work.heroTitle, t.work.heroAccent)}
              </h1>
              <p style={{ marginTop: 18, color: 'var(--muted)', lineHeight: 1.7, fontSize: 16 }}>
                {t.work.heroBody}
              </p>

              <div style={{ marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {t.work.heroChips.map((chip) => (
                  <Chip key={chip} variant="ghost">
                    {chip}
                  </Chip>
                ))}
              </div>

              <div style={{ marginTop: 24 }} className="accentLine" />

              <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                <ActivePill
                  as="a"
                  href="#professional"
                  onClick={(event) => handleAnchorClick(event, 'professional')}
                  active={activeSection === 'professional'}
                  className="pill--segment"
                >
                  {t.work.quickNav.professional}
                </ActivePill>
                <ActivePill
                  as="a"
                  href="#personal"
                  onClick={(event) => handleAnchorClick(event, 'personal')}
                  active={activeSection === 'personal'}
                  className="pill--segment"
                >
                  {t.work.quickNav.personal}
                </ActivePill>
              </div>
            </div>
          </section>
        </div>
      </Section>
      <Section size="cards" className="py-28 space-y-8" id="professional">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t.work.professional.title}</h2>
        </Reveal>
        <p className="mt-8 max-w-5xl text-base text-white/70">
          {t.work.professional.intro}
        </p>
        <Reveal>
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">{t.work.professional.focusLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.35em] text-white/70">
                {t.work.professional.focusItems.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">{t.work.professional.filterLabel}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                {filterOptions.map((filter) => (
                  <ActivePill
                    key={filter.value}
                    as="button"
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    active={activeFilter === filter.value}
                    className="pill--filter"
                  >
                    <span className="pill-label">{filter.label}</span>
                    <span className="pill-count">{filterCounts[filter.value]}</span>
                  </ActivePill>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="caseGrid">
            <AnimatePresence mode="popLayout">
              {professionalCards.map((card) => (
                <motion.div
                  key={card.href}
                  initial={{ opacity: 0, y: motionTokens.distance.ySmall }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: motionTokens.distance.ySmall }}
                  transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.easeOut }}
                >
                  <CaseCard card={card} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Reveal>
        <div className="mt-10 rounded-2xl border border-white/10 bg-[var(--surface-1)] px-6 py-5">
          <div className="flex items-baseline gap-3">
            <span className="mt-1 text-white/40" aria-hidden="true">
              🔒
            </span>
            <div>
              <h3 className="text-lg font-semibold">{t.work.confidentiality.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/70">
                {t.work.confidentiality.body}
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section size="cards" className="py-28 space-y-8 border-t border-white/10 mt-20 pt-20" id="personal">
        <h2 className="text-3xl font-semibold">{t.work.personal.title}</h2>
        <p className="mt-8 max-w-5xl text-base text-white/70">
          {t.work.personal.intro}
        </p>
        <div className="caseGrid">
          {WORK_PERSONAL.map((card) => (
            <CaseCard key={card.href} card={card} variant="personal" />
          ))}
        </div>
      </Section>
    </>
  )
}

function CaseStudy() {
  const { slug } = useParams()
  const data = CASES[slug]
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''

  if (!data) {
    return (
      <Section size="text" className="py-16">
        <h1 className="text-3xl font-semibold">{t.case.notFound}</h1>
        <Link to={`${prefix}/work`} className="mt-6 inline-block text-sm uppercase tracking-[0.35em] text-white/70">
          {t.common.backToWork}
        </Link>
      </Section>
    )
  }

  return (
    <>
      <Section size="text" className="py-28">
        <div className="caseHeroGrid">
          <header>
            <h1 className="text-4xl font-semibold md:text-5xl">{data.title}</h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#outcomes"
                className="btn-secondary focus-ring text-xs uppercase tracking-[0.4em]"
              >
                {t.common.seeOutcomes}
              </a>
              <Link
                to={`${prefix}/contact`}
                className="btn-primary focus-ring text-xs uppercase tracking-[0.4em]"
              >
                {t.common.contact}
              </Link>
            </div>
          </header>

          <Panel className="panelContent">
            <div className="caseMetaGrid">
              <div className="caseMetaRow">
                <span>{t.case.meta.role}</span>
                <strong className="text-white/80">{data.role}</strong>
              </div>
              <div className="caseMetaRow">
                <span>{t.case.meta.platforms}</span>
                <strong className="text-white/80">{data.platforms}</strong>
              </div>
              <div className="caseMetaRow">
                <span>{t.case.meta.industries}</span>
                <strong className="text-white/80">{data.industries}</strong>
              </div>
              {data.year ? (
                <div className="caseMetaRow">
                  <span>{t.case.meta.year}</span>
                  <strong className="text-white/80">{data.year}</strong>
                </div>
              ) : null}
            </div>
            <div className="mt-6">
              <div className="eyebrow">{t.case.meta.highlights}</div>
              <ul className="list">
                {(data.outcomes || []).slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>

        {data.outcomes?.length ? (
          <div className="caseOutcomesGrid mt-10">
            {data.outcomes.slice(0, 3).map((item) => (
              <div key={item} className="caseOutcomeCard">
                <div className="caseOutcomeLabel">{t.case.meta.outcome}</div>
                <div className="caseOutcomeText">{item}</div>
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      <Section size="text" className="py-28">
        <div className="grid gap-10 xl:grid-cols-[1fr_280px]">
          <div>
            <CaseSection title={t.case.overview} id="overview">
              <p>{data.overview || t.case.fallbacks.overview}</p>
            </CaseSection>
            <CaseSection title={t.case.challenge} id="challenge">
              <div className="mt-6 space-y-6">
                {(data.challenge || []).map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{item.body}</p>
                  </div>
                ))}
              </div>
            </CaseSection>
            <CaseSection title={t.case.role} id="role">
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {(data.roleItems || [t.case.fallbacks.role]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 text-white/40">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CaseSection>
            <CaseSection title={t.case.strategy} id="strategy">
              <div className="mt-6 space-y-6">
                {(data.strategy || []).map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{item.body}</p>
                  </div>
                ))}
              </div>
            </CaseSection>
            <CaseSection title={t.case.execution} id="execution">
              <div className="mt-6 space-y-6">
                {(data.execution || []).map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{item.body}</p>
                  </div>
                ))}
              </div>
            </CaseSection>
            <CaseSection title={t.case.outcomes} id="outcomes">
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {(data.outcomes || [t.case.fallbacks.outcomes]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 text-white/40">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CaseSection>
            <CaseSection title={t.case.takeaways} id="takeaways">
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {(data.takeaways || [t.case.fallbacks.takeaways]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 text-white/40">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CaseSection>
            <CaseSection>
              <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] p-6">
                <p className="text-sm text-white/70">
                  {t.case.ctaBody}
                </p>
                <Link
                  to={`${prefix}/contact`}
                  className="btn-primary focus-ring mt-6 inline-flex items-center text-xs uppercase tracking-[0.4em]"
                >
                  {t.common.contact}
                </Link>
              </div>
            </CaseSection>
          </div>

          <aside className="hidden xl:block">
            <div className="caseStickyNav">
              <p className="text-xs tracking-[0.25em] uppercase text-white/50">{t.case.toc}</p>
              <nav className="mt-4 space-y-2 text-sm">
                {[
                  { id: 'overview', label: t.case.overview },
                  { id: 'challenge', label: t.case.challenge },
                  { id: 'role', label: t.case.role },
                  { id: 'strategy', label: t.case.strategy },
                  { id: 'execution', label: t.case.execution },
                  { id: 'outcomes', label: t.case.outcomes },
                  { id: 'takeaways', label: t.case.takeaways },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block text-white/70 hover:text-white">
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
function BestOfBothWorlds() {
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''
  return (
    <>
      <div className="container">
        <section className="section" style={{ paddingTop: 120 }}>
          <div style={{ maxWidth: 820 }}>
            <h1 style={{ fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.02, margin: 0 }}>
              {renderAccentText(t.best.heroTitle, t.best.heroAccent)}
            </h1>
            <p style={{ marginTop: 18, color: 'var(--muted)', lineHeight: 1.7, fontSize: 16 }}>
              {t.best.heroBody}
            </p>

            <div style={{ marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {t.best.heroChips.map((chip) => (
                <Chip key={chip} variant="ghost">
                  {chip}
                </Chip>
              ))}
            </div>

            <div style={{ marginTop: 24 }} className="accentLine" />
          </div>
        </section>

        <UiSection
          eyebrow={t.best.context.eyebrow}
          title={t.best.context.title}
          subtitle={t.best.context.subtitle}
        >
          <div className="gridTwo" style={{ marginTop: 28 }}>
            <Panel style={{ padding: 22 }}>
              <div className="eyebrow">{t.best.context.panelTitle}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', lineHeight: 1.8 }}>
                {t.best.context.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Panel>

            <div style={{ alignSelf: 'center', color: 'var(--muted)', lineHeight: 1.75 }}>
              <p style={{ marginTop: 0 }}>{t.best.context.body1}</p>
              <p style={{ marginBottom: 0 }}>{t.best.context.body2}</p>
            </div>
          </div>
        </UiSection>

        <UiSection
          eyebrow={t.best.capabilities.eyebrow}
          title={t.best.capabilities.title}
          subtitle={t.best.capabilities.subtitle}
        >
          <div className="gridThree" style={{ marginTop: 28 }}>
            {t.best.capabilities.cards.map((card) => (
              <Panel key={card.title} style={{ padding: 22 }}>
                <div className="eyebrow">{card.eyebrow}</div>
                <h3 style={{ margin: '6px 0 10px' }}>{card.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {card.chips.map((chip) => (
                    <Chip key={chip} variant="ghost">
                      {chip}
                    </Chip>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </UiSection>

        <UiSection
          eyebrow={t.best.proof.eyebrow}
          title={t.best.proof.title}
          subtitle={t.best.proof.subtitle}
        >
          <Panel style={{ padding: 26 }}>
            <div className="gridTwoEqual">
              <div>
                <div className="eyebrow">{t.best.proof.systemsLabel}</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', lineHeight: 1.85 }}>
                  {t.best.proof.systems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div style={{ marginTop: 18 }} className="eyebrow">
                  {t.best.proof.collaborationLabel}
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', lineHeight: 1.85 }}>
                  {t.best.proof.collaboration.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="eyebrow">{t.best.proof.outcomesLabel}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {t.best.proof.outcomes.map((chip) => (
                    <Chip key={chip} variant="accent">
                      {chip}
                    </Chip>
                  ))}
                </div>

                <div style={{ marginTop: 18, color: 'var(--muted)', lineHeight: 1.75 }}>
                  {t.best.proof.note}
                </div>
              </div>
            </div>
          </Panel>
        </UiSection>

        <section className="section" style={{ paddingBottom: 120 }}>
          <Panel style={{ padding: 26 }}>
            <div className="gridCTA">
              <div>
                <h3 style={{ margin: 0, fontSize: 28 }}>
                  {t.best.finalCta.title}
                </h3>
                <p style={{ margin: '10px 0 0', color: 'var(--muted)' }}>
                  {t.best.finalCta.body}
                </p>
              </div>
              <Link className="btn-primary focus-ring text-xs uppercase tracking-[0.4em]" to={`${prefix}/contact`} style={{ textDecoration: 'none' }}>
                {t.best.finalCta.button}
              </Link>
            </div>
          </Panel>
        </section>
      </div>
    </>
  )
}

function About() {
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''
  return (
    <>
      <main className="container">
        <section className="section" style={{ paddingTop: 120 }}>
          <div className="heroGrid">
            <div>
              <h1 style={{ fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.02, margin: 0 }}>
                {t.about.heroTitle}
              </h1>
              <p style={{ marginTop: 18, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 720 }}>
                {t.about.heroBody}
              </p>

              <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {t.about.heroChips.map((chip) => (
                  <Chip key={chip} variant="ghost">
                    {chip}
                  </Chip>
                ))}
              </div>

              <div style={{ marginTop: 22 }} className="accentLine" />
            </div>

            <Panel style={{ padding: 20 }} className="atGlance">
              <div className="eyebrow">{t.about.glance.eyebrow}</div>
              <div className="proofGrid">
                {t.about.glance.cards.map((card) => (
                  <div key={card.label} className="proofCard">
                    <div className="proofLabel">{card.label}</div>
                    <div className="proofValue">{card.value}</div>
                  </div>
                ))}
              </div>
              <div className="hr" />
              <div className="eyebrow">{t.about.glance.principleLabel}</div>
              <p style={{ margin: '10px 0 0', color: 'var(--muted)', lineHeight: 1.7 }}>
                {t.about.glance.principle}
              </p>
            </Panel>
          </div>
        </section>

        <UiSection
          eyebrow={t.about.operating.eyebrow}
          title={t.about.operating.title}
          subtitle={t.about.operating.subtitle}
        >
          <div className="splitGrid">
            <Panel style={{ padding: 22 }}>
              <div className="eyebrow">{t.about.operating.left.title}</div>
              <ul className="list">
                {t.about.operating.left.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {t.about.operating.left.chips.map((chip) => (
                  <Chip key={chip} variant="ghost">
                    {chip}
                  </Chip>
                ))}
              </div>
            </Panel>

            <Panel style={{ padding: 22 }}>
              <div className="eyebrow">{t.about.operating.right.title}</div>
              <ul className="list">
                {t.about.operating.right.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {t.about.operating.right.chips.map((chip) => (
                  <Chip key={chip} variant="ghost">
                    {chip}
                  </Chip>
                ))}
              </div>
            </Panel>
          </div>
        </UiSection>

        <UiSection
          eyebrow={t.about.languages.eyebrow}
          title={t.about.languages.title}
          subtitle={t.about.languages.subtitle}
        >
          <Panel>
            <div className="panelContent">
              <div className="flex flex-wrap gap-3">
                {t.about.languages.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Panel>
        </UiSection>

        <UiSection
          eyebrow={t.about.proof.eyebrow}
          title={t.about.proof.title}
          subtitle={t.about.proof.subtitle}
        >
          <Panel>
            <div className="panelContent splitList">
              <div>
                <div className="listTitle">{t.about.proof.outcomesTitle}</div>
                <ul className="list">
                  {t.about.proof.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="listTitle">{t.about.proof.signalsTitle}</div>
                <ul className="list">
                  {t.about.proof.signals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        </UiSection>

        <section className="section" style={{ paddingBottom: 120 }}>
          <Panel style={{ padding: 26 }}>
            <div className="gridCTA">
              <div>
                <h3 style={{ margin: 0, fontSize: 28 }}>{t.about.finalCta.title}</h3>
                <p style={{ margin: '10px 0 0', color: 'var(--muted)' }}>{t.about.finalCta.body}</p>
              </div>
              <Link className="btn-primary focus-ring text-xs uppercase tracking-[0.4em]" to={`${prefix}/contact`} style={{ textDecoration: 'none' }}>
                {t.about.finalCta.button}
              </Link>
            </div>
          </Panel>
        </section>
      </main>
    </>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const { t, lang } = useI18n()
  const EMAIL = 'cdelbarcog92@gmail.com'
  const LINKS = [
    { label: t.contact.emailCta, href: `mailto:${EMAIL}` },
    { label: t.contact.linkedin, href: 'https://www.linkedin.com/in/cdelbarco/', external: true },
    { label: t.contact.behance, href: 'https://www.behance.net/chrisdelbarco', external: true },
    { label: t.contact.github, href: 'https://github.com/Mistercitos', external: true },
  ]

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <>
      <Section size="text" className="py-28">
        <h1 className="text-4xl font-semibold md:text-5xl">{t.contact.title}</h1>
        <p className="mt-8 text-base text-white/70">
          {t.contact.subtitle}
        </p>
      </Section>
      <Section size="text" className="py-20">
        <section className="mt-14">
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur md:p-12">
            <div className="text-xs tracking-[0.22em] text-white/40">{t.contact.directLabel}</div>

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <a
                href={`mailto:${EMAIL}`}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium text-white/85 transition hover:text-white"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={onCopy}
                className="w-fit text-xs text-white/40 underline-offset-4 transition hover:text-[var(--accent)] hover:underline"
              >
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-5 py-2 text-xs tracking-[0.25em] text-[var(--accent)] shadow-[0_0_0_1px_rgba(255,90,31,0.15),0_10px_30px_rgba(255,90,31,0.08)] transition hover:border-[var(--accent)]/70 hover:bg-[var(--accent)]/20"
              >
                {t.contact.emailCta.toUpperCase()}
              </a>
              {LINKS.filter((link) => link.label !== t.contact.emailCta).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs tracking-[0.25em] text-white/70 transition hover:border-[var(--accent)]/60 hover:text-[var(--accent)]"
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-sm text-white/55">{t.contact.note}</p>
          </div>
        </section>
      </Section>
    </>
  )
}

function NotFound() {
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''
  return (
    <Section size="text" className="py-16">
      <h1 className="text-3xl font-semibold">{t.case.notFound}</h1>
      <Link to={`${prefix}/`} className="mt-6 inline-block text-sm uppercase tracking-[0.35em] text-white/70">
        {t.common.backHome}
      </Link>
    </Section>
  )
}

function HeroRotatingValue() {
  const reduceMotion = useReducedMotion()
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''
  return (
    <Stagger className="flex min-h-[80vh] flex-col justify-center gap-10 pt-12 md:pt-16">
      <StaggerItem>
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          {t.home.eyebrow}
        </p>
      </StaggerItem>
      <StaggerItem>
        <h1 className="text-4xl font-semibold leading-[1.02] md:text-7xl">
          {renderAccentText(t.home.h1, t.home.h1Accent)}
        </h1>
      </StaggerItem>
      <StaggerItem>
        <AccentText className="text-xl font-medium md:text-2xl">
          <HeroRotator lines={t.home.rotatingLines} />
        </AccentText>
      </StaggerItem>
      <StaggerItem>
        <p className="max-w-prose text-base text-white/70 leading-relaxed">
          {t.home.intro}
        </p>
      </StaggerItem>
      <StaggerItem>
        <div className="flex flex-wrap gap-4">
          <Link
            to={`${prefix}/work`}
            className="btn-primary focus-ring text-xs uppercase tracking-[0.4em]"
          >
            {t.home.ctaPrimary}
          </Link>
          <a
            href={`${prefix}/#approach`}
            className="btn-secondary focus-ring text-xs uppercase tracking-[0.4em]"
          >
            {t.home.ctaSecondary}
          </a>
        </div>
      </StaggerItem>
      <StaggerItem>
        {reduceMotion ? (
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>{t.home.scrollHint}</span>
          </div>
        ) : (
          <motion.p
            className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/35"
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{
              duration: motionTokens.duration.loop,
              ease: motionTokens.ease.easeInOut,
              repeat: Infinity,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>{t.home.scrollHint}</span>
          </motion.p>
        )}
      </StaggerItem>
    </Stagger>
  )
}

function ApproachGrid() {
  const { t } = useI18n()
  return (
    <Reveal>
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold">{t.approach.title}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {t.approach.items.map((item, index) => (
            <MotionCard
              key={item.title}
              className={`rounded-2xl border p-6 ${
                index === 0
                  ? 'border-white/30 bg-[rgba(255,255,255,0.05)]'
                  : 'border-white/10 bg-[var(--surface-1)]'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.35em] accent opacity-80">
                {item.label}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-white/70">{item.body}</p>
            </MotionCard>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

function PortfolioGuide() {
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''
  return (
    <Reveal>
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold">{t.portfolioGuide.title}</h2>
        <p className="mt-8 max-w-5xl text-base text-white/70">
          {t.portfolioGuide.intro}
        </p>
        <CardGrid>
          {t.portfolioGuide.cards.map((card) => (
            <MotionCard
              key={card.href}
              as={Link}
              to={`${prefix}${card.href}`}
              aria-label={card.title}
              className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[var(--surface-1)] p-6 transition"
            >
              <div>
                <h3 className="text-xl font-semibold text-white/90 transition group-hover:text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm text-white/70">{card.body}</p>
              </div>
              <span className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/70">
                {card.cta}
                <motion.span
                  className="inline-block hover-accent"
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.easeOut }}
                >
                  →
                </motion.span>
              </span>
            </MotionCard>
          ))}
        </CardGrid>
      </div>
    </Reveal>
  )
}

function ProofPoints({ title, items }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="grid gap-6 text-sm text-white/70 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-2 h-px w-6 bg-white/40" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CTASection() {
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''
  return (
    <Reveal>
      <div className="rounded-3xl border border-white/10 bg-[var(--surface-2)] p-8">
        <h2 className="text-3xl font-semibold">{t.ctaSection.title}</h2>
        <p className="mt-8 text-base text-white/70">
          {t.ctaSection.body}
        </p>
        <Link
          to={`${prefix}/contact`}
          className="btn-primary focus-ring mt-6 inline-flex items-center text-xs uppercase tracking-[0.4em]"
        >
          {t.ctaSection.button}
        </Link>
      </div>
    </Reveal>
  )
}

function Section({ children, size = 'text', className = '', id }) {
  const widthClass = size === 'cards' ? 'max-w-6xl' : 'max-w-5xl'
  return (
    <section id={id} className={className}>
      <div className={`mx-auto w-full px-6 ${widthClass}`}>{children}</div>
    </section>
  )
}

function CardGrid({ children }) {
  return <div className="mt-8 grid gap-6 md:grid-cols-3 md:auto-rows-fr">{children}</div>
}

function CaseCard({ card }) {
  const { lang, t } = useI18n()
  const prefix = lang === 'es' ? '/es' : ''
  const highlights = card.outcomes || card.highlights

  return (
    <MotionCard className="card">
      <article className="caseCard">
        <header>
          <h3 className="caseTitle">{card.title}</h3>
          <div className="caseMeta">{card.meta}</div>
          <p className="caseSummary">{card.teaser}</p>
        </header>

        {highlights?.length ? (
          <div className="caseHighlights">
            {highlights.slice(0, 3).map((item) => (
              <div key={item} className="bullet">
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="caseHighlights" aria-hidden="true" />
        )}

        <footer className="caseFooter">
          <Link className="caseLink" to={`${prefix}${card.href}`}>
            {t.common.readCase}
          </Link>
        </footer>
      </article>
    </MotionCard>
  )
}

function AccentText({ className = '', children }) {
  return <span className={`accent ${className}`}>{children}</span>
}

function ActivePill({ as: Component = 'button', active = false, className = '', ...props }) {
  return (
    <Component
      data-active={active ? 'true' : 'false'}
      aria-selected={active}
      className={`pill focus-ring rounded-full border px-4 py-2 text-xs uppercase tracking-[0.35em] ${className}`}
      {...props}
    />
  )
}


function BulletInline({ items }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-4 text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
      {items.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
    </ul>
  )
}

function CapabilityClusters({ clusters }) {
  return (
    <div className="mt-6 space-y-6">
      {clusters.map((cluster) => (
        <div key={cluster.label}>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{cluster.label}</p>
          <ul className="mt-3 flex flex-wrap gap-4 text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
            {cluster.items.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function CaseSection({ title, children, id }) {
  return (
    <div className="mt-16" id={id ?? (title ? title.toLowerCase().replace(/\s+/g, '-') : undefined)}>
      {title && (
        <div className="flex items-center gap-3">
          <span className="h-5 w-[2px] bg-white/30" aria-hidden="true" />
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
      )}
      <div className="mt-8 text-sm text-white/70">{children}</div>
    </div>
  )
}

function renderAccentText(text, accent) {
  if (!accent || !text.includes(accent)) return text
  const parts = text.split(accent)
  return (
    <>
      {parts[0]}
      <span className="accent">{accent}</span>
      {parts[1]}
    </>
  )
}

export default App
