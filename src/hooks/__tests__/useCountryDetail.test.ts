import { renderHook, waitFor } from '@testing-library/react'
import { useCountryDetail } from '../useCountryDetail'
import { fetchCountryByCode } from '@/services/countriesApi'

jest.mock('@/services/countriesApi')
const mockedFetchCountryByCode = fetchCountryByCode as jest.MockedFunction<typeof fetchCountryByCode>

jest.mock('@/lib/content', () => ({
  error: {
    fetchCountry: 'Failed to fetch country'
  }
}))

describe('useCountryDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch country successfully', async () => {
    const mockCountry = {
      name: { common: 'Test Country' },
      population: 1000000,
      region: 'Test Region',
      capital: ['Test Capital'],
      flags: { svg: 'test-flag.svg' },
      cca3: 'TST'
    }

    mockedFetchCountryByCode.mockResolvedValueOnce(mockCountry)

    const { result } = renderHook(() => useCountryDetail('TST'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.country).toEqual(mockCountry)
    expect(result.current.error).toBeNull()
  })

  it('should handle API errors', async () => {
    mockedFetchCountryByCode.mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(() => useCountryDetail('TST'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.country).toBeNull()
    expect(result.current.error).toBe('Failed to fetch country')
  })
}) 