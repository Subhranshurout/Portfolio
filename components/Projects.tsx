'use client'

import { useState } from 'react'
import projectsData from '@/data/projects.json'
import { CaseStudyModal } from './CaseStudyModal'
import { ProjectThumbnail } from './ProjectThumbnail'
import { SectionHeader } from './SectionHeader'
import { FadeIn } from './motion/FadeIn'
import { StaggerGrid, StaggerItem } from './motion/StaggerGrid'

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

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projects = projectsData as Project[]

  return (
    <>
      <section id="projects" className="spacing-section projects-section gradient-bg-section">
        <div className="container mx-auto">
          <FadeIn>
            <SectionHeader
              label="Work"
              title="Selected projects"
              description="Production iOS apps across parental control, healthcare, OTT, commerce, and real-time engagement."
              align="center"
              spacious
            />
          </FadeIn>

          <StaggerGrid className="projects-grid max-w-6xl mx-auto">
            {projects.map(project => (
              <StaggerItem
                key={project.id}
                role="button"
                tabIndex={0}
                className="card card--natural card--interactive cursor-pointer group"
                onClick={() => setSelectedProject(project)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProject(project)
                  }
                }}
              >
                <div className="overflow-hidden rounded-t-[inherit]">
                  <ProjectThumbnail abbr={project.thumbnail.abbr} label={project.thumbnail.label} />
                </div>
                <div className="card-body">
                  <p className="project-card__category text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                    {project.category}
                  </p>
                  <h3 className="project-card__title text-lg font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="project-card__description">{project.description}</p>
                  <span
                    className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    View case study
                    <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  )
}
