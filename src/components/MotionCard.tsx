import { motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from '../motion/tokens'

export function MotionCard({ as: Component = 'div', className = '', children, ...props }) {
  const reduceMotion = useReducedMotion()

  const variants = reduceMotion
    ? {
        rest: {},
        hover: { boxShadow: '0 10px 25px rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.25)' },
        tap: {},
      }
    : {
        rest: {},
        hover: {
          y: -4,
          scale: 1.01,
          boxShadow: '0 18px 40px rgba(0,0,0,0.28)',
          borderColor: 'rgba(255,255,255,0.3)',
        },
        tap: { y: -1, scale: 0.995 },
      }

  return (
    <motion.div
      variants={variants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.easeOut }}
    >
      <Component
        className={`${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60`}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  )
}
