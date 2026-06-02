/**
 * Smooth scroll utility with proper offset and accessibility
 * Optimized for mobile devices
 */
export function smoothScrollTo(
  targetId: string,
  offset: number = 0,
  behavior: ScrollBehavior = 'smooth'
): void {
  const element = document.getElementById(targetId)
  if (!element) {
    console.warn(`Element with id "${targetId}" not found`)
    return
  }

  // Calculate scroll position with offset
  const elementPosition = element.getBoundingClientRect().top
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
  const targetScrollY = currentScrollY + elementPosition - offset

  // Use requestAnimationFrame for smooth execution
  requestAnimationFrame(() => {
    // For mobile, use scrollTo with explicit calculation
    // This is more reliable than scrollIntoView with offset
    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior,
    })

    // Update focus for accessibility
    // Use a longer delay for smooth scroll to ensure it completes
    const focusDelay = behavior === 'smooth' ? 600 : 100
    setTimeout(() => {
      try {
        element.setAttribute('tabindex', '-1')
        element.focus({ preventScroll: true }) // preventScroll to avoid double scroll
        // Remove tabindex after focus to avoid tab order issues
        setTimeout(() => {
          element.removeAttribute('tabindex')
        }, 1000)
      } catch (e) {
        // Focus might fail in some cases, that's okay
        console.debug('Focus failed:', e)
      }
    }, focusDelay)
  })
}

/**
 * Get header height from the live header element (falls back to CSS tokens).
 */
export function getHeaderHeight(): number {
  if (typeof window === 'undefined') return 64

  const header = document.querySelector<HTMLElement>('.site-header, header')
  if (header) {
    return header.getBoundingClientRect().height
  }

  const root = document.documentElement
  const token =
    window.innerWidth >= 1024
      ? '--header-height-desktop'
      : window.innerWidth >= 768
        ? '--header-height-tablet'
        : '--header-height-mobile'
  const parsed = parseInt(getComputedStyle(root).getPropertyValue(token), 10)
  return Number.isFinite(parsed) ? parsed : 64
}

/**
 * Section id for scroll-spy: last section whose top has crossed below the header.
 */
export function getActiveSectionId(
  sectionIds: string[],
  headerHeight: number,
  offset = 120
): string {
  const activationLine = headerHeight + offset
  let active = ''

  for (const id of sectionIds) {
    const element = document.getElementById(id)
    if (!element) continue
    if (element.getBoundingClientRect().top <= activationLine) {
      active = id
    }
  }

  return active
}
