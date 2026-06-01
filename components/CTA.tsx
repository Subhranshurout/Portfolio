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
    <section
      className="cta-section border-y"
      style={{ backgroundColor: 'var(--cta-bg)', color: 'var(--cta-text)', borderColor: 'var(--border-medium)' }}
    >
      <div className="container mx-auto text-center max-w-2xl">
        <FadeIn className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Ready to build on iOS?</h2>
          <p className="text-base opacity-80 leading-relaxed">
            Available for full-time roles, contract work, and technical consulting on native Apple platforms.
          </p>
          <motion.button
            onClick={handleContactClick}
            className="px-7 py-3.5 rounded-full text-sm font-semibold mt-2 h-12 btn-secondary"
            whileHover={reduced ? {} : { scale: 1.02, y: -1 }}
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
