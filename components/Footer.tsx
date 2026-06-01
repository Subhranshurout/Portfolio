'use client'

import { motion } from 'framer-motion'
import { FadeIn } from './motion/FadeIn'
import { prefersReducedMotion } from '@/lib/motionTokens'

const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const reduced = prefersReducedMotion()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = window.innerWidth >= 1024 ? 80 : window.innerWidth >= 768 ? 72 : 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <footer className="py-10 border-t" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-subtle)' }}>
      <FadeIn y={16}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold"
              style={{ background: 'var(--text-primary)', color: 'var(--bg-elevated)' }}
            >
              SR
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Subhranshu Rout
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer">
            {footerLinks.map(link => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--text-secondary)' }}
                whileHover={reduced ? {} : { y: -1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © {currentYear} Subhranshu Rout
          </p>
        </div>
      </FadeIn>
    </footer>
  )
}
