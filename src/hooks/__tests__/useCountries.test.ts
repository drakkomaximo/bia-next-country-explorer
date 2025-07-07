import { renderHook, waitFor } from '@testing-library/react'
import { useCountries } from '../useCountries'
import { fetchAllCountries } from '@/services/countriesApi'

jest.mock('@/services/countriesApi')
const mockedFetchAllCountries = fetchAllCountries as jest.MockedFunction<typeof fetchAllCountries>

jest.mock('@/lib/content', () => ({
  error: {
    noDataFromApi: 'No data from API',
    fetchCountries: 'Failed to fetch countries'
  }
}))

describe('useCountries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch countries successfully', async () => {
    const mockCountries = [
      {
        name: { common: 'Test Country' },
        population: 1000000,
        region: 'Test Region',
        capital: ['Test Capital'],
        flags: { svg: 'test-flag.svg' },
        cca3: 'TST'
      }
    ]

    mockedFetchAllCountries.mockResolvedValueOnce(mockCountries)

    const { result } = renderHook(() => useCountries())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.countries).toEqual(mockCountries)
    expect(result.current.error).toBeNull()
  })

  it('should handle API errors', async () => {
    mockedFetchAllCountries.mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(() => useCountries())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.countries).toEqual([])
    expect(result.current.error).toBe('Failed to fetch countries')
  })
}) 