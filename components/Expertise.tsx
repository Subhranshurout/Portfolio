'use client'

import technicalSkills from '@/data/technical-skills.json'
import { SectionHeader } from './SectionHeader'
import { FadeIn } from './motion/FadeIn'
import { motion } from 'framer-motion'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'
import { viewport } from '@/lib/motionVariants'

export function Expertise() {
  const hydrated = useHydrated()
  const reduced = prefersReducedMotion()
  const animate = hydrated && !reduced

  return (
    <section id="expertise" className="spacing-section expertise-section" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto">
        <FadeIn>
          <SectionHeader
            label="Expertise"
            title="Education & technical stack"
            description="Formal training in electronics and telecommunications, applied to production iOS engineering."
            spacious
          />
        </FadeIn>

        <div className="expertise-layout">
          <FadeIn delay={0.1} y={20}>
            <div className="card card--natural expertise-card card--interactive">
              <p className="section-label expertise-card__label">Education</p>
              <h3 className="expertise-card__title">B.Tech — Electronics & Telecommunication</h3>
              <p className="expertise-card__meta">DRIEMS University · Cuttack, Odisha · 2023</p>
              <div className="expertise-card__cgpa">
                <span className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  9.2
                </span>
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  CGPA / 10
                </span>
              </div>
            </div>
          </FadeIn>

          <motion.div
            className="card card--natural expertise-card card--interactive"
            initial={animate ? { opacity: 0, y: 24 } : false}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={viewport}
            transition={{ ...getTransition('medium'), delay: 0.2 }}
          >
            <p className="section-label expertise-card__label">Technical skills</p>
            <div className="skills-groups">
              {technicalSkills.map((group, groupIndex) => (
                <motion.div
                  key={group.category}
                  className="skills-group"
                  initial={animate ? { opacity: 0, y: 12 } : false}
                  whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                  viewport={viewport}
                  transition={{ ...getTransition('medium'), delay: 0.25 + groupIndex * 0.06 }}
                >
                  <h4 className="skills-group__title">{group.category}</h4>
                  <div className="skills-tags">
                    {group.items.map((item, tagIndex) => (
                      <motion.span
                        key={item}
                        className="skill-tag"
                        initial={animate ? { opacity: 0, scale: 0.92 } : false}
                        whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
                        viewport={viewport}
                        transition={{ ...getTransition('fast'), delay: 0.3 + groupIndex * 0.06 + tagIndex * 0.02 }}
                        whileHover={reduced ? {} : { y: -2 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
