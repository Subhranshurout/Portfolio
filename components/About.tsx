'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { SectionHeader } from './SectionHeader'
import { FadeIn } from './motion/FadeIn'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Subhranshurout' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/subhranshu-rout-a32601239' },
]

function AboutPhoto() {
  const hasPhoto = false // Set true when /public/images/profile.png is added

  if (hasPhoto) {
    return (
      <Image
        src="/images/profile.png"
        alt="Subhranshu Rout"
        width={200}
        height={200}
        className="about-photo"
      />
    )
  }

  return (
    <div className="about-photo-placeholder" aria-hidden>
      <span className="about-photo-placeholder__monogram">SR</span>
    </div>
  )
}

export function About() {
  const ref = useRef(null)
  const hydrated = useHydrated()
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = prefersReducedMotion()
  const animate = hydrated && !reduced

  return (
    <section id="about" ref={ref} className="spacing-section gradient-bg-section border-b">
      <div className="container mx-auto">
        <FadeIn>
          <SectionHeader label="About" title="Professional summary" />
          <div className="about-layout">
            <div className="about-photo-wrap md:order-2">
              <AboutPhoto />
            </div>
            <div className="about-content max-w-[640px] md:order-1">
              <div className="prose-block" style={{ color: 'var(--text-secondary)' }}>
                {[
                  <>
                    iOS developer with{' '}
                    <strong style={{ color: 'var(--text-heading)', fontWeight: 600 }}>
                      3+ years
                    </strong>{' '}
                    of experience architecting and shipping production-grade native applications.
                    Deep work across Swift, SwiftUI, and UIKit in regulated healthcare, system
                    parental controls, OTT streaming, and RTC products.
                  </>,
                  <>
                    I focus on clean architecture (MVVM, modular layers), Swift Concurrency, and
                    measurable performance — Instruments profiling, memory discipline, and fast
                    launch times for real users.
                  </>,
                  <>
                    Based in Ahmedabad, India. I own delivery from technical design through
                    TestFlight and App Store Connect, working closely with product, design, and
                    backend teams.
                  </>,
                ].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={animate ? { opacity: 0, y: 16 } : false}
                    animate={animate && isInView ? { opacity: 1, y: 0 } : false}
                    transition={{ ...getTransition('medium'), delay: 0.15 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              <motion.div
                className="about-links"
                initial={animate ? { opacity: 0 } : false}
                animate={animate && isInView ? { opacity: 1 } : false}
                transition={{ ...getTransition('medium'), delay: 0.45 }}
              >
                {socialLinks.map((link, index) => (
                  <span key={link.name} className="inline-flex items-center gap-3">
                    {index > 0 && <span className="about-links__divider">·</span>}
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </span>
                ))}
                <span className="about-links__divider">·</span>
                <a href="/resume.pdf" download>
                  Resume
                </a>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
