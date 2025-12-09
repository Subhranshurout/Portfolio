'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    title: 'Languages & Frameworks',
    icon: '💻',
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Core Data', 'Core Animation'],
  },
  {
    title: 'Architectures',
    icon: '🏗️',
    skills: ['MVVM', 'MVC', 'Clean Architecture'],
  },
  {
    title: 'Tools & Integrations',
    icon: '🔌',
    skills: [
      'REST APIs / JSON',
      'URLSession / Alamofire',
      'Family Controls',
      'Push Notifications',
      'Git',
      'App Store Connect',
    ],
  },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      ref={ref}
      className="container mx-auto px-4 py-20"
    >
      <motion.div
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
          🧠 Technical Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              className="card p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + groupIndex * 0.1,
                duration: 0.5,
              }}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-bold mb-4 text-text-primary flex items-center gap-2">
                <span>{group.icon}</span>
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 gradient-primary text-white rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.4 + groupIndex * 0.1 + skillIndex * 0.05,
                      duration: 0.3,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

