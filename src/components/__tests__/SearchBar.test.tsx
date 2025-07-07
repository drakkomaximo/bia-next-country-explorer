import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'

jest.mock('@/lib/content', () => ({
  search: {
    placeholder: 'Search for a country...'
  }
}))

describe('SearchBar', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render search input with placeholder', () => {
    render(<SearchBar {...defaultProps} />)

    const input = screen.getByPlaceholderText('Search for a country...')
    expect(input).toBeInTheDocument()
  })

  it('should display the provided value', () => {
    render(<SearchBar {...defaultProps} value="Test Country" />)

    const input = screen.getByDisplayValue('Test Country')
    expect(input).toBeInTheDocument()
  })

  it('should call onChange when user types', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()
    
    render(<SearchBar {...defaultProps} onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText('Search for a country...')
    await user.type(input, 'Spain')

    expect(mockOnChange).toHaveBeenCalled()
  })
}) 