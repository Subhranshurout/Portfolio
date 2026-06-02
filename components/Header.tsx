'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'
import { smoothScrollTo, getHeaderHeight, getActiveSectionId } from '@/lib/smoothScroll'

const SECTION_IDS = ['about', 'experience', 'projects', 'expertise', 'contact'] as const

const navItems = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#expertise', label: 'Expertise', id: 'expertise' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export function Header() {
  const hydrated = useHydrated()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setIsScrolled(currentScrollY > 20)

          const headerHeight = getHeaderHeight()
          setActiveSection(
            getActiveSectionId([...SECTION_IDS], headerHeight)
          )
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Trap focus in mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !menuPanelRef.current) return

    const panel = menuPanelRef.current
    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

    panel.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => panel.removeEventListener('keydown', handleTabKey)
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        smoothScrollTo(sectionId, getHeaderHeight())
      }
    }, 200)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  return (
    <>
      <motion.header
        initial={hydrated ? { y: -100 } : false}
        animate={hydrated ? { y: 0 } : false}
        transition={getTransition('fast')}
        className={`fixed top-0 left-0 right-0 z-[1030] site-header transition-all duration-300 ${isScrolled ? 'site-header--scrolled' : ''}`}
        style={{
          height: 'var(--header-height-mobile)',
        }}
      >
        <nav
          className="container mx-auto px-4 h-full max-w-7xl flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo - Left */}
          <motion.a
            href="#"
            onClick={e => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setIsMobileMenuOpen(false)
            }}
            className="flex items-center gap-3 group"
            whileHover={prefersReducedMotion() ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Circular icon with initial */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold border"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              SR
            </div>
            <span
              className="text-xl font-bold hidden sm:block"
              style={{ color: 'var(--text-primary)' }}
            >
              Subhranshu Rout
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center nav-desktop">
            {navItems.map(item => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => handleNavClick(e, item.id)}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-heading)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <motion.a
              href="#contact"
              onClick={e => handleNavClick(e, 'contact')}
              className="btn-nav-cta"
              whileHover={prefersReducedMotion() ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact
            </motion.a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              className="mobile-menu-trigger"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              type="button"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 rounded-full origin-center"
                  style={{ backgroundColor: 'var(--text-primary)' }}
                  transition={getTransition('fast')}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--text-primary)' }}
                  transition={getTransition('fast')}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 rounded-full origin-center"
                  style={{ backgroundColor: 'var(--text-primary)' }}
                  transition={getTransition('fast')}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={getTransition('fast')}
              className="mobile-menu-backdrop lg:hidden"
              onClick={toggleMobileMenu}
              aria-hidden="true"
            />

            <motion.div
              ref={menuPanelRef}
              id="mobile-menu"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={getTransition('medium')}
              className="mobile-menu-panel lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="mobile-menu-panel__inner">
                <div className="mobile-menu-panel__header">
                  <div className="mobile-menu-panel__brand">
                    <div className="mobile-menu-panel__monogram" aria-hidden="true">
                      SR
                    </div>
                    <div>
                      <p id="mobile-menu-title" className="mobile-menu-panel__name">
                        Subhranshu Rout
                      </p>
                      <p className="mobile-menu-panel__role">iOS Developer</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMobileMenu}
                    className="mobile-menu-trigger mobile-menu-trigger--in-panel"
                    aria-label="Close menu"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <nav className="mobile-menu-nav" aria-label="Mobile navigation">
                  <p className="section-label mobile-menu-nav__label">Navigate</p>
                  <div className="mobile-menu-list">
                    {navItems.map(item => {
                      const isActive = activeSection === item.id
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={e => handleNavClick(e, item.id)}
                          className={`mobile-menu-link${isActive ? ' mobile-menu-link--active' : ''}`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <span>{item.label}</span>
                          {isActive ? (
                            <span className="mobile-menu-link__badge" aria-hidden="true">
                              Current
                            </span>
                          ) : (
                            <svg
                              className="mobile-menu-link__chevron"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </a>
                      )
                    })}
                  </div>
                </nav>

                <div className="mobile-menu-panel__footer">
                  <a
                    href="#contact"
                    onClick={e => handleNavClick(e, 'contact')}
                    className="btn-nav-cta mobile-menu-cta"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
