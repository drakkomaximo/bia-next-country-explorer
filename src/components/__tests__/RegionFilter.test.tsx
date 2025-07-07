import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegionFilter from '../RegionFilter'
import { fetchRegions } from '@/services/countriesApi'

jest.mock('@/services/countriesApi')
const mockedFetchRegions = fetchRegions as jest.MockedFunction<typeof fetchRegions>

jest.mock('@/lib/content', () => ({
  regionFilter: {
    placeholder: 'Filter by Region'
  }
}))

describe('RegionFilter', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render select with placeholder', async () => {
    mockedFetchRegions.mockResolvedValueOnce(['Europe', 'Asia', 'Africa'])

    render(<RegionFilter {...defaultProps} />)

    expect(await screen.findByText('Filter by Region')).toBeInTheDocument()
  })

  it('should call onChange when user selects a region', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()
    mockedFetchRegions.mockResolvedValueOnce(['Europe', 'Asia', 'Africa'])
    
    render(<RegionFilter {...defaultProps} onChange={mockOnChange} />)

    const select = await screen.findByRole('combobox')
    
    await waitFor(() => {
      expect(screen.getByText('Europe')).toBeInTheDocument()
    })
    
    await user.selectOptions(select, 'Europe')

    expect(mockOnChange).toHaveBeenCalledWith('Europe')
  })
}) 