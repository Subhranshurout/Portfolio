import { render, screen } from '@testing-library/react'
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
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has accessible navigation landmark', () => {
    renderWithProviders(<Header />)
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('renders theme toggle', () => {
    renderWithProviders(<Header />)
    
    // There are multiple theme toggles (desktop and mobile), so use getAllByRole
    const themeToggles = screen.getAllByRole('button', { name: /Switch to/i })
    expect(themeToggles.length).toBeGreaterThan(0)
  })

  it('renders hire me button', () => {
    renderWithProviders(<Header />)
    
    // There are multiple "Hire Me" buttons (desktop and mobile), so use getAllByText
    const hireMeButtons = screen.getAllByText('Hire Me')
    expect(hireMeButtons.length).toBeGreaterThan(0)
  })
})
