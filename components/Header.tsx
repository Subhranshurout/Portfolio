'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { getTransition } from '@/lib/motionTokens'
import { smoothScrollTo, getHeaderHeight } from '@/lib/smoothScroll'

const navItems = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setIsScrolled(currentScrollY > 50)
          setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
          setLastScrollY(currentScrollY)

          // Update active section
          const sections = ['about', 'experience', 'projects', 'skills', 'contact']
          const headerHeight = getHeaderHeight()
          const current = sections.find((id) => {
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
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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

  // Trap focus in mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const nav = navRef.current
    if (!nav) return

    const focusableElements = nav.querySelectorAll<HTMLElement>(
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

    nav.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => nav.removeEventListener('keydown', handleTabKey)
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Scroll immediately while menu is still open (more reliable)
    // This ensures the click event is fully processed before any state changes
    const element = document.getElementById(sectionId)
    if (element) {
      smoothScrollTo(sectionId, getHeaderHeight())
    } else {
      console.warn(`Section with id "${sectionId}" not found`)
      // Fallback: try scrolling to hash
      window.location.hash = sectionId
    }
    
    // Close menu after a short delay to allow scroll to start
    // This prevents the menu closing animation from interfering
    setTimeout(() => {
      setIsMobileMenuOpen(false)
    }, 100)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={getTransition('fast')}
          className={`fixed top-0 left-0 right-0 z-[1030] transition-all duration-[180ms] ${
            isScrolled
              ? 'glass shadow-lg backdrop-blur-xl border-b border-border'
              : 'bg-transparent'
          }`}
          style={{
            height: 'var(--header-height-mobile)',
          }}
        >
          <nav
            ref={navRef}
            className="container mx-auto px-4 h-full max-w-7xl"
            aria-label="Main navigation"
            id="mainNav"
            hidden={false}
          >
            <div className="flex items-center justify-between h-full gap-4">
              {/* Logo */}
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setIsMobileMenuOpen(false)
                }}
                className="text-lg sm:text-xl font-bold gradient-text whitespace-nowrap min-w-[44px] min-h-[44px] flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Subhranshu Rout - Home"
              >
                Subhranshu Rout
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-[180ms] min-h-[44px] flex items-center ${
                        isActive
                          ? 'text-accent'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                          initial={false}
                          transition={getTransition('medium')}
                          style={{ willChange: 'transform' }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  )
                })}
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <ThemeToggle />
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="px-4 py-2 gradient-primary text-white rounded-lg font-medium text-sm whitespace-nowrap min-h-[44px] flex items-center"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={getTransition('fast')}
                >
                  Hire Me
                </motion.a>
              </div>

              {/* Mobile Actions */}
              <div className="lg:hidden flex items-center gap-2">
                <ThemeToggle />
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="px-3 py-2 gradient-primary text-white rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap min-h-[44px] flex items-center touch-manipulation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={getTransition('fast')}
                >
                  Hire Me
                </motion.a>
                
                {/* Mobile Menu Button */}
                <button
                  ref={menuButtonRef}
                  onClick={toggleMobileMenu}
                  className="p-2.5 glass rounded-lg hover:bg-accent/10 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  type="button"
                >
                  <motion.div
                    animate={isMobileMenuOpen ? 'open' : 'closed'}
                    className="w-6 h-6 flex flex-col justify-center gap-1.5 relative"
                    initial={false}
                  >
                    <motion.span
                      variants={{
                        closed: { rotate: 0, y: 0, opacity: 1 },
                        open: { rotate: 45, y: 6, opacity: 1 },
                      }}
                      className="w-full h-0.5 bg-text-primary rounded-full origin-center"
                      transition={getTransition('fast')}
                    />
                    <motion.span
                      variants={{
                        closed: { opacity: 1, scale: 1 },
                        open: { opacity: 0, scale: 0 },
                      }}
                      className="w-full h-0.5 bg-text-primary rounded-full"
                      transition={getTransition('fast')}
                    />
                    <motion.span
                      variants={{
                        closed: { rotate: 0, y: 0, opacity: 1 },
                        open: { rotate: -45, y: -6, opacity: 1 },
                      }}
                      className="w-full h-0.5 bg-text-primary rounded-full origin-center"
                      transition={getTransition('fast')}
                    />
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  id="mobile-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={getTransition('fast')}
                  className="lg:hidden overflow-hidden border-t border-border mt-2"
                >
                  <div className="py-4 space-y-1">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.id
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.id)}
                          className={`block px-4 py-3 rounded-lg transition-all duration-[180ms] min-h-[44px] flex items-center touch-manipulation ${
                            isActive
                              ? 'bg-accent/20 text-accent font-semibold border-l-2 border-accent'
                              : 'text-text-secondary hover:text-text-primary hover:bg-glass'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {item.label}
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
