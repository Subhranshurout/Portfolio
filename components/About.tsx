'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="container mx-auto px-4 py-20">
      <motion.div
        className="card p-6 sm:p-8 md:p-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          👋 About Me
        </motion.h2>
        <motion.div
          className="space-y-4 text-text-secondary leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <p className="text-base sm:text-lg">
            I am Subhranshu Sekhar Rout, an experienced iOS Developer specializing in Swift,
            SwiftUI, UIKit, and scalable mobile architectures. Over the last few years, I've built
            intuitive, high-performance, and visually compelling iOS applications while working on
            fast-moving, cross-functional product teams.
          </p>
          <p className="text-base sm:text-lg">
            My work revolves around delivering clean, maintainable code with a strong focus on user
            experience, performance optimization, and platform-specific best practices. I enjoy
            transforming product ideas into polished apps and collaborating with designers, backend
            developers, and stakeholders to ship production-ready features.
          </p>
          <div className="mt-6 p-4 sm:p-6 glass rounded-lg border-l-4 border-accent">
            <p className="text-text-primary text-base sm:text-lg leading-relaxed">
              <strong className="text-accent">✨ Personal Brand Statement:</strong> I'm passionate
              about building purposeful digital experiences on Apple devices — crafting apps that
              don't just work well but feel delightful and intuitive. My work blends creativity,
              clean architecture, and a deep respect for the user experience.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
