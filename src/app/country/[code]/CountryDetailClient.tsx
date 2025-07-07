'use client'

import React from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useCountryDetail } from '@/hooks/useCountryDetail';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import ErrorMessage from '@/components/ErrorMessage';
import content from '@/lib/content';

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

export default function CountryDetailClient({ code }: { code: string }) {
  const { country, loading, error } = useCountryDetail(code);
  const borders = country?.borders || [];

  if (loading) {
    return <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}><Navigation /><div className="max-w-desktop mx-auto px-4 py-8 text-center text-lg font-nunito-sans">{content.loading.loading}</div></div>;
  }
  if (error || !country) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <Navigation />
        <div className="max-w-desktop mx-auto px-4 py-8">
          <ErrorMessage message={error || content.countryDetail.notFound} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navigation />
      <div className="max-w-desktop mx-auto px-4 md:px-16 py-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 px-6 py-2 font-nunito-sans rounded" style={{ background: 'var(--color-card)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}><ArrowLeft className="w-4 h-4" /> Back</Link>
        <div className="flex flex-col lg:flex-row gap-12 md:gap-24 items-start">
          <Image src={country.flags?.svg} alt={content.countryDetail.flagAlt.replace('{country}', country.name?.common || '')} className="w-full max-w-2xl lg:max-w-[35rem] max-h-[22rem] object-cover rounded shadow mx-auto md:mx-0" width={500} height={300} />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8 font-nunito-sans" style={{ color: 'var(--color-text)' }}>{country.name?.common}</h2>
            <div className="flex flex-col justify-between md:flex-row gap-8 mb-8">
              <div>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.nativeName}</span> {getNativeName(country)}</p>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.population}</span> {country.population?.toLocaleString()}</p>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.region}</span> {country.region}</p>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.subRegion}</span> {country.subregion || 'N/A'}</p>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.capital}</span> {country.capital?.[0] || 'N/A'}</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.topLevelDomain}</span> {country.tld?.[0]}</p>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.currencies}</span> {country.currencies ? Object.values(country.currencies).map((c: any) => c.name).join(', ') : 'N/A'}</p>
                <p className="mb-2"><span className="font-semibold">{content.countryDetail.languages}</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-2">
              <span className="font-semibold">{content.countryDetail.borderCountries}</span>
              <div className="flex flex-wrap gap-2">
                {borders.length === 0 ? content.countryDetail.none : borders.map((b: string) => (
                  <Link key={b} href={`/country/${b}`} className="px-4 py-1 rounded text-sm font-nunito-sans" style={{ background: 'var(--color-card)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}>{b}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 