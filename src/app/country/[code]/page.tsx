import CountryDetailClient from './CountryDetailClient';
import type { Metadata } from 'next';
import { fetchCountryByCode } from '@/services/countriesApi';

interface Country {
  name?: {
    common?: string;
    nativeName?: Record<string, { common: string }>;
  };
  flags?: { svg?: string };
  population?: number;
  region?: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  borders?: string[];
}

function getNativeName(country: Country) {
  if (!country || !country.name || !country.name.nativeName) return country?.name?.common || '';
  const nativeNames = Object.values(country.name.nativeName).filter(Boolean);
  for (const n of nativeNames) {
    if (n && typeof n === 'object' && 'common' in n && n.common) {
      return n.common;
    }
  }
  return country.name?.common || '';
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  try {
    const { code } = await params;
    const country = await fetchCountryByCode(code);
    if (!country || !country.name) {
      return {
        title: 'Country Not Found',
        description: 'No country data available.'
      };
    }
    const nativeName = getNativeName(country);
    return {
      title: `${country.name.common}${nativeName && nativeName !== country.name.common ? ` (${nativeName})` : ''} | ${code}`,
      description: `Details and information about ${country.name.common}${nativeName && nativeName !== country.name.common ? ` (${nativeName})` : ''}.`,
    };
  } catch {
    return {
      title: 'Country Not Found',
      description: 'No country data available.'
    };
  }
}

export default async function CountryDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <CountryDetailClient code={code || ''} />;
} 