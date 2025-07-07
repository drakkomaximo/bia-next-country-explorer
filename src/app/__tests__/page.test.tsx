import { render, screen } from '@testing-library/react'
import Home from '../page'

jest.mock('@/services/countriesApi', () => ({
  fetchAllCountries: jest.fn(),
  fetchRegions: jest.fn().mockResolvedValue(['Europe', 'Asia', 'Africa'])
}))

jest.mock('@/lib/content', () => ({
  navigation: {
    title: 'Where in the world?'
  },
  search: {
    placeholder: 'Search for a country...'
  },
  regionFilter: {
    placeholder: 'Filter by Region'
  },
  themeToggle: {
    ariaLabelDark: 'Switch to light mode',
    ariaLabelLight: 'Switch to dark mode'
  },
  countryDetail: {
    flagAlt: 'Flag of {country}',
    population: 'Population:'
  },
  noData: {
    title: 'No countries found',
    description: 'Try adjusting your search criteria'
  },
  loading: {
    loading: 'Loading...'
  },
  error: {
    fetchCountries: 'Failed to fetch countries',
    noDataFromApi: 'No data from API'
  }
}))

jest.mock('@/hooks/useCountries', () => ({
  useCountries: () => ({
    countries: [],
    loading: false,
    error: null
  })
}))

describe('Home Page', () => {
  it('should render the page with navigation and search components', () => {
    render(<Home />)

    expect(screen.getByText('Where in the world?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument()
    expect(screen.getByText('Filter by Region')).toBeInTheDocument()
  })
}) 