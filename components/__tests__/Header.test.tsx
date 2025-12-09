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
    
    const themeToggle = screen.getByRole('button', { name: /Switch to/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('renders hire me button', () => {
    renderWithProviders(<Header />)
    
    const hireMeButton = screen.getByText('Hire Me')
    expect(hireMeButton).toBeInTheDocument()
  })
})
