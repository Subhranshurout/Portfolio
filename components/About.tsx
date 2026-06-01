'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { FadeIn } from './motion/FadeIn'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Subhranshurout' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/subhranshu-rout-a32601239' },
]

export function About() {
  const ref = useRef(null)
  const hydrated = useHydrated()
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = prefersReducedMotion()
  const animate = hydrated && !reduced

  return (
    <section
      id="about"
      ref={ref}
      className="spacing-section gradient-bg-section border-b"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="container mx-auto">
        <FadeIn className="max-w-3xl">
          <SectionHeader label="About" title="Professional summary" />

          <div
            className="prose-block text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {[
              <>
                iOS developer with{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>3+ years</strong>{' '}
                of experience architecting and shipping production-grade native applications. Deep
                work across Swift, SwiftUI, and UIKit in regulated healthcare, system parental
                controls, OTT streaming, and RTC products.
              </>,
              <>
                I focus on clean architecture (MVVM, modular layers), Swift Concurrency, and
                measurable performance — Instruments profiling, memory discipline, and fast launch
                times for real users.
              </>,
              <>
                Based in Ahmedabad, India. I own delivery from technical design through TestFlight
                and App Store Connect, working closely with product, design, and backend teams.
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
            className="flex flex-wrap items-center gap-4 mt-10 pt-10 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
            initial={animate ? { opacity: 0 } : false}
            animate={animate && isInView ? { opacity: 1 } : false}
            transition={{ ...getTransition('medium'), delay: 0.45 }}
          >
            {socialLinks.map(link => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: 'var(--text-primary)' }}
                whileHover={reduced ? {} : { y: -1 }}
              >
                {link.name}
              </motion.a>
            ))}
            <span style={{ color: 'var(--border-medium)' }}>·</span>
            <motion.a
              href="/resume.pdf"
              download
              className="text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: 'var(--text-primary)' }}
              whileHover={reduced ? {} : { y: -1 }}
            >
              Resume
            </motion.a>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}
