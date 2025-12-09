'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const highlights = [
  {
    icon: '📱',
    text: 'Building scalable app architectures (MVVM, Clean Architecture)',
  },
  {
    icon: '🎨',
    text: 'Designing modern and interactive UI with SwiftUI & Auto Layout',
  },
  {
    icon: '☁️',
    text: 'Integrating complex APIs, SDKs, and third-party libraries',
  },
  {
    icon: '📤',
    text: 'Managing entire App Store Connect deployment cycle',
  },
  {
    icon: '✅',
    text: 'Debugging and optimizing app performance and memory',
  },
]

export function Highlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="highlights" ref={ref} className="container mx-auto px-4 py-20">
      <motion.div
        className="card p-8 md:p-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          💼 Professional Highlights
        </motion.h2>
        <motion.p
          className="text-text-secondary mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          An enthusiastic and detail-oriented iOS Developer with hands-on experience in crafting
          native iOS applications for consumer, entertainment, parental control, and e-commerce
          domains.
        </motion.p>
        <div className="flex flex-wrap gap-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="glass px-6 py-4 rounded-full flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.4 + index * 0.1,
                duration: 0.4,
                ease: [0.22, 0.9, 0.35, 1],
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-2xl">{highlight.icon}</span>
              <span className="text-sm font-medium text-text-primary">{highlight.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
