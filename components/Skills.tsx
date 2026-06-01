'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    title: 'Architecture & Scale',
    subtitle: 'MVVM · Clean Architecture',
    description:
      'Modular, testable codebases with dependency injection and repository patterns—built for long-term maintainability and team velocity.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: 'Performance Engineering',
    subtitle: 'Instruments · Memory',
    description:
      'Profile-driven optimization of launch time, rendering cycles, and memory—eliminating leaks and UI jank on production traffic.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Domain SDKs & APIs',
    subtitle: 'Apple · Azure · REST',
    description:
      'Family Controls, AVFoundation, Azure Communication Services, WebSockets, and secure REST/JSON integrations for complex product domains.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Release & Delivery',
    subtitle: 'App Store Connect',
    description:
      'End-to-end ownership of signing, TestFlight, provisioning, and production releases—aligned with agile cross-functional delivery.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    ),
  },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="spacing-section" style={{ backgroundColor: 'var(--bg-elevated)' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Engineering Focus
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I deliver production-grade native iOS across regulated healthcare, system-level parental controls, high-traffic
              OTT, and real-time social/video products—pairing modern Swift concurrency with rigorous architecture and
              performance discipline.
            </p>
            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-xl font-semibold shadow-md transition-all duration-200 mt-4 inline-block gradient-primary text-white"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card p-6 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                  }}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {service.title}
                  {service.subtitle && (
                    <span className="text-base font-normal block mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {service.subtitle}
                    </span>
                  )}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
