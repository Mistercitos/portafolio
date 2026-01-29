import { motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from './tokens'

const baseVariants = {
  hidden: { opacity: 0, y: motionTokens.distance.yBase },
  show: { opacity: 1, y: 0 },
}

export function Reveal({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={baseVariants}
      initial="hidden"
      whileInView="show"
      transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.easeOut }}
      viewport={{ amount: 0.25, once: true }}
    >
      {children}
    </motion.div>
  )
}
