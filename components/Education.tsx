'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import technicalSkills from '@/data/technical-skills.json'

export function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" ref={ref} className="spacing-section gradient-bg-section">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="card p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Education
            </h2>
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                B.Tech — Electronics & Telecommunication Engineering
              </h3>
              <p className="mb-1" style={{ color: 'var(--text-secondary)' }}>
                DRIEMS University | Cuttack, Odisha
              </p>
              <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
                Graduated: 2023
              </p>
              <p className="font-semibold" style={{ color: 'var(--accent)' }}>
                CGPA: 8.83 / 10
              </p>
            </div>
          </motion.div>

          <motion.div
            className="card p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Technical Skills
            </h2>
            <div className="space-y-5">
              {technicalSkills.map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + index * 0.05 }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--accent)' }}>
                    {group.category}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {group.items.join(' · ')}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
