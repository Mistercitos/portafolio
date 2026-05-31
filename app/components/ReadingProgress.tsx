'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Barra horizontal sticky al top que indica progreso de lectura del article.
 * Spring-suavizada para sentirse calibrada, no nerviosa.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'var(--accent)',
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 60,
      }}
    />
  )
}
