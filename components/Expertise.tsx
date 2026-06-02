'use client'

import technicalSkills from '@/data/technical-skills.json'
import { SectionHeader } from './SectionHeader'

export function Expertise() {
  return (
    <section
      id="expertise"
      className="spacing-section expertise-section"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="container mx-auto">
        <div className="section-intro section-intro--expertise">
          <SectionHeader
            label="Expertise"
            title="Education & technical stack"
            description="Formal training in electronics and telecommunications, applied to production iOS engineering."
            spacious
          />
        </div>

        <div className="expertise-layout">
          <div className="expertise-card">
            <p className="section-label">Education</p>
            <h3 className="expertise-card__title">B.Tech — Electronics & Telecommunication</h3>
            <p className="expertise-card__meta">DRIEMS University · Cuttack, Odisha · 2023</p>
            <div className="expertise-card__cgpa">
              <span className="expertise-card__cgpa-value">9.2</span>
              <span className="expertise-card__cgpa-label">CGPA / 10</span>
            </div>
          </div>

          <div className="expertise-card">
            <p className="section-label">Technical skills</p>
            <div className="skills-groups">
              {technicalSkills.map(group => (
                <div key={group.category} className="skills-group">
                  <h4 className="skills-group__title">{group.category}</h4>
                  <div className="skills-tags">
                    {group.items.map(item => (
                      <span key={item} className="skill-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
