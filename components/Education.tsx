'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const achievements = [
    '3★ Coder at HackerRank (Problem Solving).',
    'Delivered multiple production apps impacting thousands of users.',
    'Trusted for working on complex, sensitive modules (Auth, Events, Parental Controls).',
  ]

  return (
    <section
      id="education"
      ref={ref}
      className="container mx-auto px-4 py-20"
    >
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
      >
        {/* Education */}
        <motion.div
          className="card p-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">🎓 Education</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                B.Tech — Electronics & Telecommunication Engineering
              </h3>
              <p className="text-text-secondary mb-1">DRIEMS University (2019–2023)</p>
              <p className="text-accent font-semibold">CGPA: 8.83</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                Intermediate / Matriculation
              </h3>
              <p className="text-text-secondary">
                Royal College (2017–2019) / Royal School (2015–2017)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="card p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">🌟 Achievements</h2>
          <ul className="space-y-4 mb-6">
            {achievements.map((achievement, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <span className="text-accent mt-1">▸</span>
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>
          <div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">🌍 Languages</h3>
            <p className="text-text-secondary">
              English, Hindi, Odiya (Full Professional Proficiency)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

