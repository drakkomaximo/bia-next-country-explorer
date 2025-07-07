import { render, screen } from '@testing-library/react'
import CountryCard from '../CountryCard'

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('CountryCard', () => {
  const defaultProps = {
    code: 'TST',
    flag: 'test-flag.svg',
    name: 'Test Country',
    population: 1000000,
    region: 'Test Region',
    capital: 'Test Capital'
  }

  it('should render country information correctly', () => {
    render(<CountryCard {...defaultProps} />)

    expect(screen.getByText('Test Country')).toBeInTheDocument()
    expect(screen.getByText(/1[.,]000[.,]000/)).toBeInTheDocument()
    expect(screen.getByText('Test Region')).toBeInTheDocument()
    expect(screen.getByText('Test Capital')).toBeInTheDocument()
  })

  it('should render flag image with correct alt text', () => {
    render(<CountryCard {...defaultProps} />)

    const flagImage = screen.getByAltText('Flag of Test Country')
    expect(flagImage).toBeInTheDocument()
    expect(flagImage).toHaveAttribute('src', 'test-flag.svg')
  })

  it('should render link with correct href', () => {
    render(<CountryCard {...defaultProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/country/TST')
  })
}) 