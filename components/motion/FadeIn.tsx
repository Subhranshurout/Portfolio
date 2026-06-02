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
  /** Opacity-only fade — avoids mobile overlap from translateY */
  noOffset?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
  noOffset = false,
}: FadeInProps) {
  const hydrated = useHydrated()
  const reduced = prefersReducedMotion()

  if (!hydrated || reduced) {
    return <div className={className}>{children}</div>
  }

  const initial = noOffset ? { opacity: 0 } : { opacity: 0, y }
  const animate = noOffset ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ ...viewport, once }}
      transition={{ ...getTransition('medium'), delay }}
    >
      {children}
    </motion.div>
  )
}
