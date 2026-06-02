'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { FadeIn } from './motion/FadeIn'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'

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

          <div className="experience-timeline">
            <span className="experience-timeline__dot" aria-hidden />

            <motion.div
              initial={animate ? { opacity: 0, y: 16 } : false}
              animate={animate && isInView ? { opacity: 1, y: 0 } : false}
              transition={getTransition('medium')}
            >
              <p className="experience-date">Feb 2023 — Present</p>
              <h3 className="experience-role">iOS Application Developer</h3>
              <p className="experience-company">Yudiz Solutions · Ahmedabad, India</p>
              <p className="experience-description" style={{ marginTop: '16px' }}>
                End-to-end ownership of native iOS products spanning parental control, healthcare
                telehealth, OTT, and creator engagement platforms.
              </p>
            </motion.div>

            <ul className="experience-list">
              {responsibilities.map((item, index) => (
                <motion.li
                  key={index}
                  initial={animate ? { opacity: 0, x: -8 } : false}
                  animate={animate && isInView ? { opacity: 1, x: 0 } : false}
                  transition={{ ...getTransition('medium'), delay: 0.12 + index * 0.07 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
