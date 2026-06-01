import { render, screen, within } from '@testing-library/react'
import { Header } from '../Header'
import { ThemeProvider } from '../ThemeProvider'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('Header', () => {
  it('renders navigation links', () => {
    renderWithProviders(<Header />)

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })

    expect(within(nav).getByText('About')).toBeInTheDocument()
    expect(within(nav).getByText('Experience')).toBeInTheDocument()
    expect(within(nav).getByText('Projects')).toBeInTheDocument()
    expect(within(nav).getByText('Expertise')).toBeInTheDocument()
    expect(within(nav).getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('has accessible navigation landmark', () => {
    renderWithProviders(<Header />)

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('renders theme toggle', () => {
    renderWithProviders(<Header />)

    const themeToggles = screen.getAllByRole('button', { name: /Switch to/i })
    expect(themeToggles.length).toBeGreaterThan(0)
  })

  it('renders contact button', () => {
    renderWithProviders(<Header />)

    const contactButtons = screen.getAllByRole('link', { name: 'Contact' })
    expect(contactButtons.length).toBeGreaterThan(0)
  })
})
