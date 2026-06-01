'use client'

import { motion } from 'framer-motion'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'
import { fadeUp, staggerContainer, viewport } from '@/lib/motionVariants'

type StaggerGridProps = {
  children: React.ReactNode
  className?: string
}

export function StaggerGrid({ children, className }: StaggerGridProps) {
  const hydrated = useHydrated()
  const reduced = prefersReducedMotion()

  if (!hydrated || reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  role?: string
  tabIndex?: number
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  const hydrated = useHydrated()
  const reduced = prefersReducedMotion()

  if (!hydrated || reduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={getTransition('medium')}
      whileHover={{ y: -4, transition: getTransition('fast') }}
      whileTap={{ scale: 0.99 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
