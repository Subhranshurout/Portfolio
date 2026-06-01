'use client'

import { motion } from 'framer-motion'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'
import { viewport } from '@/lib/motionVariants'

type FadeInProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  once?: boolean
  className?: string
}

export function FadeIn({ children, delay = 0, y = 24, once = true, className }: FadeInProps) {
  const hydrated = useHydrated()
  const reduced = prefersReducedMotion()

  if (!hydrated || reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewport, once }}
      transition={{ ...getTransition('medium'), delay }}
    >
      {children}
    </motion.div>
  )
}
