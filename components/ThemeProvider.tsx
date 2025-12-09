'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      // Validate stored theme value
      const validThemes: Theme[] = ['light', 'dark']
      const isValidTheme = stored && validThemes.includes(stored)
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = isValidTheme ? stored : (prefersDark ? 'dark' : 'light')
      setTheme(initialTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    } catch (error) {
      // Handle localStorage errors (quota exceeded, disabled, etc.)
      console.debug('Theme initialization error:', error)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'light'
      setTheme(initialTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    } catch (error) {
      // Handle localStorage errors (quota exceeded, disabled, etc.)
      console.debug('Theme toggle error:', error)
      // Still update the theme even if localStorage fails
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  // Always provide the context, even before mounting
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

