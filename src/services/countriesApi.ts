import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';
const FIELDS = 'name,population,region,capital,flags,cca3';

export async function fetchAllCountries() {
  const res = await axios.get(`${BASE_URL}/all?fields=${FIELDS}`);
  return res.data;
}

export async function fetchCountryByCode(code: string) {
  try {
    const res = await axios.get(`${BASE_URL}/alpha/${code}`);
    if (!res.data || !Array.isArray(res.data) || res.data.length === 0) return null;
    return res.data[0];
  } catch {
    return null;
  }
}

export async function fetchRegions() {
  const res = await axios.get(`${BASE_URL}/all?fields=region`);
  const regions = res.data.map((c: { region: string }) => c.region).filter(Boolean);
  return Array.from(new Set(regions)).sort();
} 