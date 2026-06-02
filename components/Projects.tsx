'use client'

import { useState } from 'react'
import projectsData from '@/data/projects.json'
import { CaseStudyModal } from './CaseStudyModal'
import { ProjectThumbnail } from './ProjectThumbnail'
import { SectionHeader } from './SectionHeader'
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
        <div className="section-intro section-intro--center section-intro--work">
          <SectionHeader
            label="Work"
            title="Selected projects"
            description="Production iOS apps across parental control, healthcare, OTT, commerce, and real-time engagement."
            align="center"
            spacious
          />
        </div>

        <StaggerGrid className="projects-grid projects-grid--work max-w-6xl mx-auto">
            {projects.map(project => (
              <StaggerItem
                key={project.id}
                role="button"
                tabIndex={0}
                className="project-card group"
                onClick={() => setSelectedProject(project)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProject(project)
                  }
                }}
              >
                <ProjectThumbnail projectId={project.id} />
                <div className="card-body">
                  <p className="project-card__category">{project.category}</p>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__description">{project.description}</p>
                  <span className="project-card__link">
                    View case study
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
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
