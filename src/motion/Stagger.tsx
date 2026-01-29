import { motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from './tokens'

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: motionTokens.distance.ySmall },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.base, ease: motionTokens.ease.easeOut },
  },
}

export function Stagger({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={containerVariants} initial="hidden" animate="show">
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  )
}
