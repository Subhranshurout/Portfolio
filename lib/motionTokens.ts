/**
 * Motion Tokens - Centralized animation configuration
 * Respects prefers-reduced-motion and provides consistent timing
 */

export const motionTokens = {
  duration: {
    fast: 180,
    medium: 360,
    slow: 600,
  },
  easing: {
    default: [0.22, 0.9, 0.35, 1] as [number, number, number, number],
    easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
    easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  },
  stagger: {
    fast: 0.04,
    medium: 0.08,
    slow: 0.12,
  },
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get animation duration respecting user preferences
 */
export function getDuration(type: 'fast' | 'medium' | 'slow'): number {
  if (prefersReducedMotion()) {
    return 0.01
  }
  return motionTokens.duration[type] / 1000 // Convert to seconds for Framer Motion
}

/**
 * Get transition config for Framer Motion
 */
export function getTransition(
  type: 'fast' | 'medium' | 'slow' = 'medium',
  customEasing?: [number, number, number, number]
) {
  return {
    duration: getDuration(type),
    ease: customEasing || motionTokens.easing.default,
  }
}
