'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ViewTransitionLink } from './ViewTransitionLink'
import { localizedPath, type Locale } from '@/lib/i18n'

/**
 * Hero del home — Apple-style: cohesión + curtain reveal.
 *
 * Filosofía:
 * - El hero se trata como UNA pieza, no como capas que se desarman.
 * - Sticky position: el hero queda en su lugar mientras haces scroll.
 * - La siguiente sección (con z-index superior + bg sólido) sube por encima
 *   del hero como una cortina, cubriéndolo gradualmente.
 * - El hero hace un sutil scale 1→0.96 + opacity 1→0 mientras es cubierto —
 *   sensación de "alejarse en profundidad". NO se mueven sus elementos por
 *   separado.
 * - Spring physics sobre el progreso del scroll: movimiento con masa.
 *
 * Performance:
 * - Solo transform + opacity (compositor-friendly).
 * - prefers-reduced-motion mata todo el motion, deja contenido estático.
 */

type HeroContent = {
  eyebrow: string
  line1: string
  line2: string
  fallingWord: string
  tail: string
  intro: string
  ctaPrimary: string
  ctaSecondary: string
  scrollHint: string
}

const HERO: Record<Locale, HeroContent> = {
  es: {
    eyebrow: 'Senior Product Designer · UX Engineer',
    line1: 'Diseño y escalo',
    line2: 'productos digitales',
    fallingWord: 'complejos',
    tail: '.',
    intro:
      'Llevo más de 7 años diseñando productos en SaaS, B2B y marketplaces para clientes de Estados Unidos y Latinoamérica. Diseño pensando en cómo se va a construir, y muchas veces lo construyo yo mismo.',
    ctaPrimary: 'Ver case studies',
    ctaSecondary: '¿Cómo trabajo?',
    scrollHint: 'Scroll',
  },
  en: {
    eyebrow: 'Senior Product Designer · UX Engineer',
    line1: 'I design',
    line2: 'and scale',
    fallingWord: 'complex',
    tail: ' digital products.',
    intro:
      "I've spent 7+ years designing products in SaaS, B2B, and marketplaces for clients in the US and Latin America. I design with how it will be built in mind — and often I build it myself.",
    ctaPrimary: 'View case studies',
    ctaSecondary: 'How I work',
    scrollHint: 'Scroll',
  },
}

export function HeroScroll({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const hc = HERO[locale]

  // Scroll-driven exit progress (primeros 700px)
  const { scrollY } = useScroll()
  const rawExitP = useTransform(scrollY, [0, 700], [0, 1])
  const exitP = useSpring(rawExitP, {
    stiffness: 90,
    damping: 32,
    restDelta: 0.001,
  })

  // ─── Hero como UNA pieza ──────────────────────────────────────────────
  const heroScale = useTransform(exitP, [0, 1], reduce ? [1, 1] : [1, 0.96])
  const heroOpacity = useTransform(exitP, [0.2, 0.9], [1, 0])

  // Cursor parallax sutil sobre el bloque completo (no por elemento)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 60, damping: 28 })
  const cursorY = useSpring(mouseY, { stiffness: 60, damping: 28 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, mouseX, mouseY])

  const contentCursorX = useTransform(cursorX, [-1, 1], reduce ? [0, 0] : [4, -4])
  const contentCursorY = useTransform(cursorY, [-1, 1], reduce ? [0, 0] : [3, -3])

  return (
    <section
      ref={ref}
      aria-label="Hero"
      style={{
        position: 'relative',
        height: '135svh',
        minHeight: 900,
        background: 'var(--bg)',
      }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
          zIndex: 0,
          background: 'var(--bg)',
        }}
      >
        {/* Bloque único — TODO el hero se transforma como una sola pieza */}
        <motion.div
          style={{
            height: '100%',
            position: 'relative',
            scale: heroScale,
            opacity: heroOpacity,
            transformOrigin: 'center 45%',
            willChange: 'transform, opacity',
          }}
        >
          {/* Líneas editoriales — parte del bloque cohesivo */}
          <EditorialLines />

          {/* Contenido principal */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              paddingBlock: 'clamp(72px, 8svh, 132px) clamp(36px, 6svh, 92px)',
              x: contentCursorX,
              y: contentCursorY,
            }}
          >
            <div className="container" style={{ maxWidth: 920 }}>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  margin: 0,
                  fontSize: 12,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--subtle)',
                  marginBottom: 24,
                }}
              >
                {hc.eyebrow}
              </motion.p>

              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(52px, min(8.2vw, 10svh), 124px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  fontWeight: 600,
                  color: 'var(--text)',
                  maxWidth: '11ch',
                }}
              >
                <PhraseReveal text={hc.line1} delay={0.05} reduce={!!reduce} />
                <br />
                <PhraseReveal text={hc.line2} delay={0.18} reduce={!!reduce} />
                <br />
                <FallingWord word={hc.fallingWord} delay={0.6} reduce={!!reduce} />
                <span style={{ color: 'var(--text)' }}>{hc.tail}</span>
              </h1>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 1.2 } },
                }}
                style={{ display: 'flex', gap: 8, marginTop: 30, flexWrap: 'wrap' }}
              >
                {['Marketplace', 'B2B SaaS', 'Design systems'].map((chip) => (
                  <motion.span
                    key={chip}
                    variants={{
                      hidden: { opacity: 0, x: 12 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 999,
                      border: '0.5px solid var(--border-strong)',
                      background: 'color-mix(in oklab, var(--bg-elevated) 65%, transparent)',
                      color: 'var(--text-secondary)',
                      fontSize: 12,
                      letterSpacing: '0.04em',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    {chip}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  margin: 'clamp(24px, 3svh, 32px) 0 0',
                  maxWidth: '50ch',
                  fontSize: 'clamp(15px, 1.7svh, 17px)',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                }}
              >
                {hc.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  marginTop: 'clamp(24px, 3.2svh, 32px)',
                  flexWrap: 'wrap',
                }}
              >
                <ViewTransitionLink
                  href={localizedPath('/trabajo', locale)}
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
                    transition: 'transform var(--t) var(--ease), box-shadow var(--t) var(--ease)',
                  }}
                >
                  {hc.ctaPrimary}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </ViewTransitionLink>

                <ViewTransitionLink
                  href={localizedPath('/about', locale)}
                  style={{ fontSize: 14, color: 'var(--text-secondary)' }}
                >
                  {hc.ctaSecondary}
                </ViewTransitionLink>
              </motion.div>
            </div>
          </motion.div>
          {/* Scroll hint */}
          <ScrollHint reduce={!!reduce} label={hc.scrollHint} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* PhraseReveal — frase entra con blur + y                                  */
/* ─────────────────────────────────────────────────────────────────────── */

function PhraseReveal({
  text,
  delay = 0,
  reduce,
}: {
  text: string
  delay?: number
  reduce: boolean
}) {
  if (reduce) {
    return <span style={{ display: 'inline-block' }}>{text}</span>
  }
  return (
    <motion.span
      initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'inline-block' }}
    >
      {text}
    </motion.span>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* FallingWord — letras caen con spring + rotación random                   */
/* ─────────────────────────────────────────────────────────────────────── */

function FallingWord({
  word,
  delay = 0,
  reduce,
}: {
  word: string
  delay?: number
  reduce: boolean
}) {
  if (reduce) {
    return (
      <span className="serif" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>
        {word}
      </span>
    )
  }

  const letters = word.split('').map((char, i) => {
    const seedY = -80 - ((i * 37) % 60)
    const seedRotate = -22 + ((i * 53) % 44)
    const seedX = -10 + ((i * 23) % 20)
    return { char, seedY, seedRotate, seedX, i }
  })

  return (
    <span
      className="serif"
      style={{
        display: 'inline-block',
        fontStyle: 'italic',
        fontWeight: 500,
        color: 'var(--accent)',
      }}
    >
      {letters.map(({ char, seedY, seedRotate, seedX, i }) => (
        <motion.span
          key={i}
          initial={{
            y: seedY,
            x: seedX,
            rotate: seedRotate,
            opacity: 0,
            filter: 'blur(12px)',
          }}
          animate={{
            y: 0,
            x: 0,
            rotate: 0,
            opacity: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 18,
            mass: 1.1,
            delay: delay + i * 0.055,
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Líneas editoriales horizontales sutiles                                  */
/* ─────────────────────────────────────────────────────────────────────── */

function EditorialLines() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '33%',
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--divider)',
          transformOrigin: '0% 50%',
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '67%',
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--divider)',
          transformOrigin: '0% 50%',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Scroll hint                                                              */
/* ─────────────────────────────────────────────────────────────────────── */

function ScrollHint({ reduce, label }: { reduce: boolean; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.7 }}
      style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--subtle)',
        zIndex: 4,
      }}
    >
      {label}
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { y: [0, 5, 0] }}
        transition={reduce ? undefined : { duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
        style={{
          display: 'inline-block',
          width: 22,
          height: 1,
          background: 'currentColor',
          opacity: 0.55,
        }}
      />
    </motion.div>
  )
}
