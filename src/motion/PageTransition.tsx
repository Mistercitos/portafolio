import { motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from './tokens'

export function PageTransition({ children }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(2px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(2px)' }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.easeOut }}
    >
      {children}
    </motion.div>
  )
}
