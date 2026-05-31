'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  /** Distancia del traslado vertical al entrar. Default 24. */
  y?: number
  /** Cantidad de blur al entrar. Default 8. 0 para desactivar. */
  blur?: number
  /** Margin de IntersectionObserver (cuándo dispara). Default '-10% 0px'. */
  margin?: string
  /** Once: solo se anima la primera vez en viewport. Default true. */
  once?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Entrada al viewport con stack coherente con el hero:
 * - opacity 0 → 1
 * - y +24 → 0
 * - blur(8px) → blur(0px)
 * - duration 0.8s con ease `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo-ish)
 *
 * Respeta prefers-reduced-motion: en ese caso devuelve el contenido estático.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = 8,
  margin = '-10% 0px',
  once = true,
  className,
  style,
}: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
