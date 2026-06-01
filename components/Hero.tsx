'use client'

import { motion } from 'framer-motion'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

const stats = [
  { number: '3+', label: 'Years Experience' },
  { number: '5', label: 'Production Apps' },
  { number: '4', label: 'Industry Domains' },
]

function HeroKicker() {
  return (
    <p className="hero-kicker">
      <span className="hero-kicker__accent">iOS</span>
      <span className="hero-kicker__rest"> Developer</span>
    </p>
  )
}

function HeroHeadline() {
  return (
    <h1 className="hero-headline text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight mb-8">
      <span className="hero-headline__name">Subhranshu Rout</span>
      <span className="hero-headline__muted"> builds native </span>
      <span className="hero-headline__ios">iOS</span>
      <span className="hero-headline__muted"> products with precision and performance.</span>
    </h1>
  )
}

function HeroBody() {
  return (
    <p
      className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
      style={{ color: 'var(--text-secondary)' }}
    >
      <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>3+ years</strong> shipping
      production apps in parental control, healthcare, OTT, e-commerce, and real-time communication
      — Swift, SwiftUI, UIKit, and system-level Apple frameworks.
    </p>
  )
}

function HeroStats() {
  return (
    <div
      className="grid grid-cols-3 gap-px max-w-lg rounded-xl overflow-hidden border"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      {stats.map(stat => (
        <div
          key={stat.label}
          className="px-4 py-5 text-center"
          style={{ background: 'var(--bg-elevated)' }}
        >
          <div
            className="text-xl md:text-2xl font-semibold tracking-tight mb-0.5"
            style={{ color: 'var(--text-primary)' }}
          >
            {stat.number}
          </div>
          <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  const hydrated = useHydrated()
  const reduced = prefersReducedMotion()
  const animated = hydrated && !reduced

  const handleScrollToWork = () => {
    const element = document.getElementById('projects')
    if (element) {
      const headerHeight = window.innerWidth >= 1024 ? 80 : window.innerWidth >= 768 ? 72 : 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  if (!animated) {
    return (
      <section className="relative min-h-[88vh] flex items-center gradient-bg-hero border-b hero-section">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <HeroKicker />
            <HeroHeadline />
            <HeroBody />
            <div className="flex flex-col sm:flex-row gap-4 mb-20 md:mb-24">
              <button
                onClick={handleScrollToWork}
                className="px-7 py-3.5 rounded-full text-sm font-semibold btn-primary h-12"
              >
                View projects
              </button>
              <a
                href="/resume.pdf"
                download
                className="px-7 py-3.5 rounded-full text-sm font-semibold btn-secondary h-12 flex items-center justify-center"
              >
                Download CV
              </a>
            </div>
            <HeroStats />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[88vh] flex items-center gradient-bg-hero border-b hero-section">
      <div className="container mx-auto">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} transition={getTransition('medium')}>
            <HeroKicker />
          </motion.div>
          <motion.div variants={fadeUp} transition={getTransition('medium')}>
            <HeroHeadline />
          </motion.div>
          <motion.div variants={fadeUp} transition={getTransition('medium')}>
            <HeroBody />
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-20 md:mb-24"
            variants={fadeUp}
            transition={getTransition('medium')}
          >
            <motion.button
              onClick={handleScrollToWork}
              className="px-7 py-3.5 rounded-full text-sm font-semibold btn-primary h-12"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              View projects
            </motion.button>
            <motion.a
              href="/resume.pdf"
              download
              className="px-7 py-3.5 rounded-full text-sm font-semibold btn-secondary h-12 flex items-center justify-center"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Download CV
            </motion.a>
          </motion.div>
          <motion.div variants={fadeUp} transition={getTransition('slow')}>
            <motion.div
              className="grid grid-cols-3 gap-px max-w-lg rounded-xl overflow-hidden border"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="px-4 py-5 text-center"
                  style={{ background: 'var(--bg-elevated)' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...getTransition('medium'), delay: 0.4 + index * 0.08 }}
                >
                  <div
                    className="text-xl md:text-2xl font-semibold tracking-tight mb-0.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
