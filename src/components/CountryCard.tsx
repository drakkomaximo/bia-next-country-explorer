import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import content from '@/lib/content';
    
export interface CountryCardProps {
  code: string;
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

export default function CountryCard({ code, flag, name, population, region, capital }: CountryCardProps) {
  return (
    <Link href={`/country/${code}`} className="block rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl p-0 m-0" style={{ background: 'var(--color-card)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}>
      <Image src={flag} alt={content.countryDetail.flagAlt.replace('{country}', name)} className="w-full h-40 object-cover" width={500} height={300} />
      <div className="p-6">
        <h2 className="text-lg font-extrabold mb-4 font-nunito-sans" style={{ color: 'var(--color-text)' }}>{name}</h2>
        <p className="text-sm font-nunito-sans mb-1"><b>{content.countryDetail.population}</b> {population.toLocaleString()}</p>
        <p className="text-sm font-nunito-sans mb-1"><b>{content.countryDetail.region}</b> {region}</p>
        <p className="text-sm font-nunito-sans"><b>{content.countryDetail.capital}</b> {capital}</p>
      </div>
    </Link>
  );
} 