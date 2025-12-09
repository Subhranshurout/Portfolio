'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full glass p-1 flex items-center min-w-[44px] min-h-[44px] touch-manipulation"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-accent"
        animate={{
          x: theme === 'dark' ? 0 : 24,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
      <span className="absolute inset-0 flex items-center justify-between px-1.5 text-xs">
        <span>🌙</span>
        <span>☀️</span>
      </span>
    </motion.button>
  )
}

