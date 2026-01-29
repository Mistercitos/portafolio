import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { motionTokens } from '../motion/tokens'

const ROTATION_INTERVAL = 4000

export function HeroRotator({ lines }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return undefined
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length)
    }, ROTATION_INTERVAL)
    return () => clearInterval(interval)
  }, [lines.length, reduceMotion])

  const line = reduceMotion ? lines[0] : lines[index]

  return (
    <div className="relative min-h-[2.4rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={line}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: motionTokens.duration.rotator, ease: motionTokens.ease.easeInOut }}
          className="absolute left-0 top-0"
        >
          {line}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
