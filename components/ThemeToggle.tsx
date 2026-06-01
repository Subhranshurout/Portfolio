'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'
import { useHydrated } from '@/lib/useHydrated'

export function ThemeToggle() {
  const hydrated = useHydrated()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative h-11 w-11 rounded-lg overflow-hidden touch-manipulation flex items-center justify-center transition-all border"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileHover={prefersReducedMotion() ? {} : { scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={getTransition('fast')}
      type="button"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Icon container */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            // Sun icon for dark mode (clicking will switch to light)
            <motion.svg
              key="sun"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={hydrated ? { opacity: 0, rotate: -90, scale: 0.5 } : false}
              animate={hydrated ? { opacity: 1, rotate: 0, scale: 1 } : false}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={getTransition('medium')}
              style={{ color: 'var(--text-primary)' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </motion.svg>
          ) : (
            // Moon icon for light mode (clicking will switch to dark)
            <motion.svg
              key="moon"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={hydrated ? { opacity: 0, rotate: 90, scale: 0.5 } : false}
              animate={hydrated ? { opacity: 1, rotate: 0, scale: 1 } : false}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={getTransition('medium')}
              style={{ color: 'var(--text-primary)' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

    </motion.button>
  )
}
