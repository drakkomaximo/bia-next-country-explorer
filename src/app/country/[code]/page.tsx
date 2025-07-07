import CountryDetailClient from './CountryDetailClient';
import type { Metadata } from 'next';
import { fetchCountryByCode } from '@/services/countriesApi';

function getNativeName(country: any) {
  if (!country || !country.name || !country.name.nativeName) return country?.name?.common || '';
  const nativeNames = Object.values(country.name.nativeName).filter(Boolean);
  for (const n of nativeNames) {
    if (n && typeof n === 'object' && 'common' in n && n.common) {
      return n.common;
    }
  }
  return country.name?.common || '';
}

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const country = await fetchCountryByCode(resolvedParams.code);
    if (!country || !country.name) {
      return {
        title: 'Country Not Found',
        description: 'No country data available.'
      };
    }
    const nativeName = getNativeName(country);
    return {
      title: `${country.name.common}${nativeName && nativeName !== country.name.common ? ` (${nativeName})` : ''} | ${params.code}`,
      description: `Details and information about ${country.name.common}${nativeName && nativeName !== country.name.common ? ` (${nativeName})` : ''}.`,
    };
  } catch (e) {
    return {
      title: 'Country Not Found',
      description: 'No country data available.'
    };
  }
}

export default async function CountryDetailPage({ params }: { params: { code: string } }) {
  const resolvedParams = await params;
  return <CountryDetailClient code={resolvedParams.code} />;
} 