'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { getTransition } from '@/lib/motionTokens'

type Project = {
  id: string
  title: string
  category: string
  role: string
  tech: string[]
  description: string
  highlights: string[]
  metrics?: Record<string, string | undefined>
  image?: string
}

interface CaseStudyModalProps {
  project: Project | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (project) {
      // Store the element that opened the modal
      previousActiveElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      // Focus the close button after a short delay to allow animation
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
      // Restore focus to the element that opened the modal
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose()
      }
    }
    if (project) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [project, onClose])

  // Focus trap
  useEffect(() => {
    if (!project || !modalRef.current) return

    const modal = modalRef.current
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener('keydown', handleTabKey)
    return () => modal.removeEventListener('keydown', handleTabKey)
  }, [project])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1050] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal content */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={getTransition('medium')}
          className="relative z-10 card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 glass rounded-full flex items-center justify-center text-text-primary hover:bg-accent/20 transition-colors touch-manipulation min-w-[44px] min-h-[44px]"
            aria-label="Close modal"
            type="button"
          >
            <span className="text-xl">✕</span>
          </button>

          <div className="p-6 sm:p-8 md:p-12">
            {/* Hero image placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary-1 to-primary-2 rounded-lg mb-6 sm:mb-8 flex items-center justify-center text-4xl sm:text-6xl">
              {project.title.charAt(0)}
            </div>

            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1.5 glass rounded-full text-xs sm:text-sm mb-4">
                {project.category}
              </span>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text"
              >
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-text-secondary mb-4 leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                <strong className="text-accent">Role:</strong> {project.role}
              </p>
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="glass p-3 sm:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-accent mb-1">{value}</div>
                    <div className="text-xs sm:text-sm text-text-secondary capitalize">{key}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-text-primary">
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-text-secondary leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, ...getTransition('medium') }}
                  >
                    <span className="text-accent mt-1 flex-shrink-0">▸</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-text-primary">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 gradient-primary text-white rounded-full text-xs sm:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
