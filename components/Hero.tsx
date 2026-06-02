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

function HeroContent() {
  const handleScrollToWork = () => {
    const element = document.getElementById('projects')
    if (element) {
      const headerHeight = window.innerWidth >= 1024 ? 80 : window.innerWidth >= 768 ? 72 : 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <>
      <p className="hero-kicker">iOS Developer</p>
      <h1 className="hero-headline">
        <span className="hero-headline__name">Subhranshu Rout</span>
        <span className="hero-headline__rest">
          {' '}
          builds native iOS products with precision and performance.
        </span>
      </h1>
      <p className="hero-differentiator">
        Specialized in parental controls, healthcare compliance, and real-time video.
      </p>
      <p className="hero-body">
        <strong style={{ color: 'var(--text-heading)', fontWeight: 600 }}>3+ years</strong> shipping
        production apps in parental control, healthcare, OTT, e-commerce, and real-time
        communication — Swift, SwiftUI, UIKit, and system-level Apple frameworks.
      </p>
      <div className="hero-actions">
        <button onClick={handleScrollToWork} className="btn-primary">
          View projects
        </button>
        <a href="/resume.pdf" download className="btn-secondary flex items-center justify-center">
          Download CV
        </a>
      </div>
      <div className="hero-stats">
        {stats.map(stat => (
          <div key={stat.label} className="hero-stat">
            <div className="hero-stat__number">{stat.number}</div>
            <div className="hero-stat__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export function Hero() {
  const hydrated = useHydrated()
  const reduced = prefersReducedMotion()
  const animated = hydrated && !reduced

  if (!animated) {
    return (
      <section className="hero-section gradient-bg-hero border-b">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <HeroContent />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-section gradient-bg-hero border-b">
      <div className="container mx-auto">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} transition={getTransition('medium')}>
            <HeroContent />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
