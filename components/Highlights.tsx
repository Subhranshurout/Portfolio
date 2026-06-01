'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const highlights = [
  {
    icon: '🏗️',
    text: 'MVVM & Clean Architecture at production scale',
  },
  {
    icon: '⚡',
    text: 'Instruments-driven memory & launch-time optimization',
  },
  {
    icon: '🔒',
    text: 'Family Controls, Screen Time & regulated healthcare flows',
  },
  {
    icon: '📡',
    text: 'RTC, WebSockets & Azure Communication Services',
  },
  {
    icon: '📤',
    text: 'App Store Connect, TestFlight & release ownership',
  },
]

export function Highlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="highlights" ref={ref} className="spacing-section" style={{ backgroundColor: 'var(--bg-elevated)' }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="card p-8 md:p-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-primary)' }}
          >
            Core Strengths
          </motion.h2>
          <motion.p
            className="mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{ color: 'var(--text-secondary)' }}
          >
            Senior iOS engineer shipping native apps across Parental Control, Healthcare (HIPAA-aligned), OTT, and
            Real-Time Communication—with emphasis on system frameworks, performance, and store-ready architecture.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="px-6 py-4 rounded-full flex items-center gap-3 transition-colors border"
                style={{
                  backgroundColor: 'var(--accent-light)',
                  borderColor: 'var(--border-subtle)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.4,
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-2xl">{highlight.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {highlight.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
