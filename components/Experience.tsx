'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const responsibilities = [
    'Designing and developing robust iOS applications using Swift, SwiftUI & UIKit.',
    'Creating visually engaging interfaces using Auto Layout, Core Animation, and SwiftUI layouts.',
    'Implementing essential iOS behaviors: Deep linking, Background tasks, Push notifications, App lifecycle & state management.',
    'Managing provisioning profiles, certificates, builds, and deployment through App Store Connect.',
  ]

  return (
    <section
      id="experience"
      ref={ref}
      className="container mx-auto px-4 py-20"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          🧑‍💻 Professional Experience
        </motion.h2>

        <motion.div
          className="card p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-text-primary">
            iOS Application Developer — Yudiz Solutions
          </h3>
          <p className="text-text-secondary italic mb-6">
            📍 Ahmedabad, India | Feb 2023 – Present
          </p>
          <p className="text-text-secondary mb-6">
            At Yudiz Solutions, I am responsible for the end-to-end development
            of native iOS applications.
          </p>
          <h4 className="text-xl font-semibold mb-4 text-text-primary">
            Core Responsibilities:
          </h4>
          <ul className="space-y-3">
            {responsibilities.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.4,
                }}
              >
                <span className="text-accent mt-1">▸</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}

