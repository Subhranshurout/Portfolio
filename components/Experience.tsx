'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { FadeIn } from './motion/FadeIn'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'
import { fadeUp } from '@/lib/motionVariants'

const responsibilities = [
  'Architect and scale production-ready native iOS apps with Swift, SwiftUI, and UIKit',
  'Enforce MVVM and Clean Architecture for reusability, testability, and clear separation of concerns',
  'Optimize memory, rendering, and launch time using Xcode Instruments',
  'Design networking and persistence layers — URLSession, REST APIs, JSON, and Core Data',
  'Own App Store provisioning, TestFlight, signing, and production releases',
  'Collaborate with product, UX, and backend in agile delivery cycles',
]

export function Experience() {
  const ref = useRef(null)
  const hydrated = useHydrated()
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = prefersReducedMotion()
  const animate = hydrated && !reduced

  return (
    <section
      id="experience"
      ref={ref}
      className="spacing-section"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="container mx-auto max-w-3xl">
        <FadeIn>
          <SectionHeader label="Experience" title="Professional experience" />

          <div className="border-l-2 pl-6 md:pl-8" style={{ borderColor: 'var(--border-medium)' }}>
            <motion.div
              className="relative -left-[calc(1.5rem+5px)] md:-left-[calc(2rem+5px)] mb-6"
              initial={animate ? { scale: 0 } : false}
              animate={animate && isInView ? { scale: 1 } : false}
              transition={getTransition('medium')}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: 'var(--text-primary)', boxShadow: '0 0 0 4px var(--bg)' }}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial={animate ? 'hidden' : false}
              animate={animate && isInView ? 'visible' : false}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Feb 2023 — Present
              </p>
              <h3
                className="text-xl font-semibold tracking-tight mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                iOS Application Developer
              </h3>
              <p className="text-base font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
                Yudiz Solutions · Ahmedabad, India
              </p>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                End-to-end ownership of native iOS products spanning parental control, healthcare
                telehealth, OTT, and creator engagement platforms.
              </p>
            </motion.div>

            <ul className="space-y-4">
              {responsibilities.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={animate ? { opacity: 0, x: -12 } : false}
                  animate={animate && isInView ? { opacity: 1, x: 0 } : false}
                  transition={{ ...getTransition('medium'), delay: 0.12 + index * 0.07 }}
                >
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'var(--text-primary)' }}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
