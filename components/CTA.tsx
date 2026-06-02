'use client'

import { motion } from 'framer-motion'
import { FadeIn } from './motion/FadeIn'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'

export function CTA() {
  const reduced = prefersReducedMotion()

  const handleContactClick = () => {
    const element = document.getElementById('contact')
    if (element) {
      const headerHeight = window.innerWidth >= 1024 ? 80 : window.innerWidth >= 768 ? 72 : 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className="cta-section border-y" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="container mx-auto max-w-2xl">
        <FadeIn className="space-y-6">
          <h2 className="cta-section__title">Ready to build on iOS?</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Available for full-time roles, contract work, and technical consulting on native Apple
            platforms.
          </p>
          <motion.button
            onClick={handleContactClick}
            className="btn-primary px-7 py-3 min-h-[44px]"
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={getTransition('fast')}
          >
            Get in touch
          </motion.button>
        </FadeIn>
      </div>
    </section>
  )
}
