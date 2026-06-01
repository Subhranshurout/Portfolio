/** Opens the system mail client without navigating the current page away. */
export function openMailto(mailtoUrl: string): void {
  const link = document.createElement('a')
  link.href = mailtoUrl
  link.setAttribute('rel', 'noopener noreferrer')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
