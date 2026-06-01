/** Default visible state — avoids content stuck hidden after bfcache restore. */
export const visible = { opacity: 1, y: 0, x: 0 }

export function visibleIf(inView: boolean, hidden: { opacity: number; y?: number; x?: number }) {
  return inView ? visible : hidden
}
