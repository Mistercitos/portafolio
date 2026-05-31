'use client'

import { useEffect } from 'react'

/**
 * Inertial smooth scroll global con Lenis.
 *
 * Por qué Lenis y no scroll nativo:
 * - El scroll de wheel en Chrome/Edge es "tick-tick", no inercial.
 * - Macs con touchpad tienen inercia pero Windows con mouse no — necesitamos
 *   consistencia.
 * - Lenis delega el RAF al compositor, no bloquea main thread.
 *
 * Fallbacks:
 * - prefers-reduced-motion: reduce → no carga Lenis, scroll nativo.
 * - Si lenis no está instalado → log + scroll nativo (degrada elegante).
 * - Elementos con scroll interno (e.g. <pre> de código) NO son afectados.
 *
 * Coexiste con framer-motion useScroll: Lenis dispara eventos de scroll
 * estándar en window, así que las animaciones scroll-driven del hero
 * siguen funcionando con la suavidad agregada.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let cleanup: (() => void) | undefined

    ;(async () => {
      try {
        const { default: Lenis } = await import('lenis')
        const lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
          // Permitir scroll dentro de overflow: auto (e.g. <pre> code blocks)
          // sin que Lenis intercepte
          prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
        })

        const loop = (time: number) => {
          lenis.raf(time)
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        cleanup = () => {
          cancelAnimationFrame(raf)
          lenis.destroy()
        }
      } catch {
        // Lenis no instalado todavía. Para activarlo: `npm install lenis`
        if (typeof console !== 'undefined') {
          console.info('[SmoothScroll] Lenis no instalado. Corré `npm install` para activarlo.')
        }
      }
    })()

    return () => cleanup?.()
  }, [])

  return <>{children}</>
}
