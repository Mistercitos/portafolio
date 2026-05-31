'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

type StaggerProps = {
  children: ReactNode
  /** Tiempo entre cada child (segundos). Default 0.08. */
  gap?: number
  /** Delay inicial antes del primer child. Default 0.1. */
  delayChildren?: number
  /** Margin de IntersectionObserver. Default '-10% 0px'. */
  margin?: string
  className?: string
  style?: CSSProperties
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const itemVariantsReduced = {
  hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/**
 * Orquestador de reveals secuenciales. Cada hijo directo que sea <StaggerItem>
 * (o cualquier motion component con `variants={itemVariants}`) entra con el
 * stagger declarado.
 *
 * Ejemplo:
 *   <Stagger>
 *     <StaggerItem>...</StaggerItem>
 *     <StaggerItem>...</StaggerItem>
 *   </Stagger>
 */
export function Stagger({
  children,
  gap = 0.08,
  delayChildren = 0.1,
  margin = '-10% 0px',
  className,
  style,
}: StaggerProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : gap,
            delayChildren: reduce ? 0 : delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/** Hijo de <Stagger>. Se anima en orden según el gap del Stagger padre. */
export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      variants={reduce ? itemVariantsReduced : itemVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
