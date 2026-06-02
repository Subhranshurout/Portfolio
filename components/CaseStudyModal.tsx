'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { getTransition } from '@/lib/motionTokens'
import { ProjectThumbnail } from './ProjectThumbnail'

type Project = {
  id: string
  title: string
  category: string
  role: string
  tech: string[]
  description: string
  highlights: string[]
  thumbnail: { abbr: string; label: string }
  metrics?: Record<string, string | undefined>
}

interface CaseStudyModalProps {
  project: Project | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeButtonRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose()
    }
    if (project) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [project, onClose])

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          aria-hidden
        />

        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={getTransition('medium')}
          className="relative z-10 card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center border text-lg"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
            aria-label="Close"
            type="button"
          >
            ×
          </button>

          <ProjectThumbnail projectId={project.id} />

          <div className="p-6 md:p-8">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {project.category}
            </p>
            <h2
              id="modal-title"
              className="text-2xl font-semibold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h2>
            <p className="text-base mb-2" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
              Role: {project.role}
            </p>

            {project.metrics && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-3 rounded-lg text-center"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {value}
                    </div>
                    <div
                      className="text-xs capitalize mt-0.5"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Highlights
            </h3>
            <ul className="space-y-3 mb-8">
              {project.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'var(--text-primary)' }}
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Tech stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <span key={tech} className="skill-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
