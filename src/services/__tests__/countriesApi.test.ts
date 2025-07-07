import axios from 'axios'
import { fetchAllCountries, fetchCountryByCode, fetchRegions } from '../countriesApi'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('countriesApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchAllCountries', () => {
    it('should fetch all countries successfully', async () => {
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

      mockedAxios.get.mockResolvedValueOnce({ data: mockCountries })

      const result = await fetchAllCountries()

      expect(result).toEqual(mockCountries)
    })

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'))

      await expect(fetchAllCountries()).rejects.toThrow('API Error')
    })
  })

  describe('fetchCountryByCode', () => {
    it('should fetch country by code successfully', async () => {
      const mockCountry = {
        name: { common: 'Test Country' },
        population: 1000000,
        region: 'Test Region',
        capital: ['Test Capital'],
        flags: { svg: 'test-flag.svg' },
        cca3: 'TST'
      }

      mockedAxios.get.mockResolvedValueOnce({ data: [mockCountry] })

      const result = await fetchCountryByCode('TST')

      expect(result).toEqual(mockCountry)
    })

    it('should return null when country not found', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] })

      const result = await fetchCountryByCode('INVALID')

      expect(result).toBeNull()
    })
  })

  describe('fetchRegions', () => {
    it('should fetch regions successfully', async () => {
      const mockCountries = [
        { region: 'Europe' },
        { region: 'Asia' },
        { region: 'Europe' },
        { region: 'Africa' }
      ]

      mockedAxios.get.mockResolvedValueOnce({ data: mockCountries })

      const result = await fetchRegions()

      expect(result).toEqual(['Africa', 'Asia', 'Europe'])
    })
  })
}) 