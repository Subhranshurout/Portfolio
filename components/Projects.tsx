'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import projectsData from '@/data/projects.json'
import { CaseStudyModal } from './CaseStudyModal'

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
type Filter = 'All' | 'iOS' | 'Mobile'

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filters: Filter[] = ['All', 'iOS', 'Mobile']
  const filteredProjects =
    filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter)

  return (
    <>
      <section id="projects" ref={ref} className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 gradient-text text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            🚀 Major Projects Showcase
          </motion.h2>

          {/* Filter chips */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {filters.map(f => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all min-h-[44px] touch-manipulation ${
                  filter === f
                    ? 'gradient-primary text-white'
                    : 'glass text-text-secondary hover:text-text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {f}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: [0.22, 0.9, 0.35, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="card p-4 sm:p-6 cursor-pointer group touch-manipulation"
                  onClick={() => setSelectedProject(project as unknown as Project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedProject(project as unknown as Project)
                    }
                  }}
                  aria-label={`View case study for ${project.title}`}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary-1 to-primary-2 rounded-lg mb-4 flex items-center justify-center text-3xl sm:text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                    {project.title.charAt(0)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm glass rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    className="text-accent font-medium text-sm sm:text-base min-h-[44px] flex items-center"
                    whileHover={{ x: 4 }}
                    tabIndex={-1}
                  >
                    View Case Study →
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
