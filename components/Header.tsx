'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'
import { smoothScrollTo, getHeaderHeight } from '@/lib/smoothScroll'

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

          // Update active section
          const sections = ['about', 'experience', 'projects', 'expertise', 'contact']
          const headerHeight = getHeaderHeight()
          const current = sections.find(id => {
            const element = document.getElementById(id)
            if (element) {
              const rect = element.getBoundingClientRect()
              return rect.top <= headerHeight + 50 && rect.bottom >= headerHeight
            }
            return false
          })
          setActiveSection(current || '')
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
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map(item => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => handleNavClick(e, item.id)}
                  className="text-sm font-medium transition-colors duration-200 relative"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ backgroundColor: 'var(--accent)' }}
                      layoutId="activeIndicator"
                      transition={getTransition('medium')}
                    />
                  )}
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
              className="px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap h-11 flex items-center justify-center transition-all duration-200 btn-primary"
              whileHover={prefersReducedMotion() ? {} : { scale: 1.02, y: -1 }}
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
              className="h-11 w-11 flex items-center justify-center rounded-lg transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
              }}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              type="button"
              whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
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

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={getTransition('fast')}
              className="fixed inset-0 z-[1020] lg:hidden backdrop-blur-sm"
              onClick={toggleMobileMenu}
              aria-hidden="true"
              style={{
                backgroundColor: 'var(--bg)',
                opacity: 0.8,
              }}
            />

            {/* Menu Panel - Slides from top */}
            <motion.div
              ref={menuPanelRef}
              id="mobile-menu"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                ...getTransition('medium'),
                type: 'spring',
                damping: 25,
                stiffness: 200,
              }}
              className="fixed top-0 left-0 right-0 z-[1031] lg:hidden overflow-y-auto shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                minHeight: '100vh',
              }}
            >
              <div className="flex flex-col min-h-screen pt-20 pb-8">
                {/* Menu Header */}
                <div className="px-6 pb-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <h2
                      id="mobile-menu-title"
                      className="text-2xl font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Menu
                    </h2>
                    <button
                      onClick={toggleMobileMenu}
                      className="h-10 w-10 flex items-center justify-center rounded-lg transition-colors"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                      aria-label="Close menu"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-6 py-8 space-y-2" aria-label="Mobile navigation">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={e => handleNavClick(e, item.id)}
                        className="block px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200"
                        style={{
                          backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                          color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                          borderLeft: isActive
                            ? `4px solid var(--accent)`
                            : '4px solid transparent',
                        }}
                        aria-current={isActive ? 'page' : undefined}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05,
                          ...getTransition('fast'),
                        }}
                        whileHover={prefersReducedMotion() ? {} : { x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        {item.label}
                      </motion.a>
                    )
                  })}
                </nav>

                {/* Mobile Footer */}
                <div className="px-6 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <motion.a
                    href="#contact"
                    onClick={e => handleNavClick(e, 'contact')}
                    className="block w-full px-6 py-3 rounded-full font-semibold text-center transition-all duration-200 btn-primary"
                    whileHover={prefersReducedMotion() ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
