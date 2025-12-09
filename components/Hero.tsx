'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'

const keywords = ['iOS', 'Swift', 'SwiftUI']

export function Hero() {
  const [currentKeyword, setCurrentKeyword] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [shouldAnimateParticles, setShouldAnimateParticles] = useState(true)

  useEffect(() => {
    setShouldAnimateParticles(!prefersReducedMotion())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword(prev => (prev + 1) % keywords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleScrollToWork = () => {
    const element = document.getElementById('projects')
    if (element) {
      const headerHeight = window.innerWidth >= 1280 ? 64 : window.innerWidth >= 768 ? 56 : 48
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion() ? 0 : 0.1,
        delayChildren: prefersReducedMotion() ? 0 : 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion() ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: getTransition('medium'),
    },
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: 'var(--header-height-mobile)' }}
    >
      {/* Animated gradient background */}
      {!prefersReducedMotion() && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, var(--color-primary-1) 0%, transparent 50%)`,
            transition: 'background 300ms ease-out',
            willChange: 'background',
          }}
        />
      )}

      {/* Particle layer - only on non-reduced motion */}
      {shouldAnimateParticles && (
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Hero content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            Hi — I'm <span className="gradient-text">Subhranshu</span>.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>I build delightful{' '}
            <motion.span
              key={currentKeyword}
              initial={{ opacity: 0, y: prefersReducedMotion() ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion() ? 0 : -20 }}
              className="inline-block gradient-text"
              transition={getTransition('medium')}
            >
              {keywords[currentKeyword]}
            </motion.span>{' '}
            experiences.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-8 sm:mb-12 max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: 'var(--line-height-relaxed)',
            }}
          >
            iOS developer focused on clean architecture, delightful interactions, and
            production-grade apps.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={handleScrollToWork}
              className="px-6 sm:px-8 py-3 sm:py-4 gradient-primary text-white rounded-lg font-semibold text-base sm:text-lg w-full sm:w-auto min-h-[44px] touch-manipulation"
              whileHover={prefersReducedMotion() ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={getTransition('fast')}
            >
              View Work
            </motion.button>
            <motion.a
              href="/resume.pdf"
              download
              className="px-6 sm:px-8 py-3 sm:py-4 glass rounded-lg font-semibold text-base sm:text-lg w-full sm:w-auto text-center min-h-[44px] flex items-center justify-center touch-manipulation"
              whileHover={prefersReducedMotion() ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={getTransition('fast')}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {!prefersReducedMotion() && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-accent rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
