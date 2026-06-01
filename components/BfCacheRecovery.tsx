'use client'

import { useEffect } from 'react'

/**
 * After mailto / back-navigation, Chrome can restore a frozen page where
 * in-view animations never re-run — content stays invisible. Reload fixes it.
 */
export function BfCacheRecovery() {
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload()
      }
    }

    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  return null
}
