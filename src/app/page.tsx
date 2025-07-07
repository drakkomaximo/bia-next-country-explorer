'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from '@/components/Navigation'
import CountryCard from '@/components/CountryCard'
import SearchBar from '@/components/SearchBar'
import RegionFilter from '@/components/RegionFilter'
import BackToTop from '@/components/BackToTop'
import CountryCardSkeleton from '@/components/CountryCardSkeleton'
import { useCountries } from '@/hooks/useCountries';
import { useRouter, useSearchParams } from 'next/navigation';
import NoData from '@/components/NoData';
import ErrorMessage from '@/components/ErrorMessage';
import content from '@/lib/content';

interface Country {
  cca3: string;
  flags: { svg: string };
  name: { common: string };
  population: number;
  region: string;
  capital?: string[];
}

const BATCH_SIZE = 12;
const DEBOUNCE_MS = 300;

export default function Home() {
  const { countries, loading, error } = useCountries();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialRegion = searchParams.get('region') || '';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [region, setRegion] = useState(initialRegion);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [fade, setFade] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (region) params.set('region', region);
    router.replace(`/?${params.toString()}`);
  }, [search, region, router]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, DEBOUNCE_MS);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const filtered = countries
    .filter((c: Country) => {
      const matchesName = c.name.common.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region ? c.region === region : true;
      return matchesName && matchesRegion;
    })
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  useEffect(() => {
    setShowSkeleton(true);
    setFade(false);
    const timeout = setTimeout(() => {
      setVisibleCount(BATCH_SIZE);
      setShowSkeleton(false);
      setFade(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, region, countries]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      visibleCount < filtered.length
    ) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filtered.length));
    }
  }, [visibleCount, filtered.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleReset = () => {
    setSearchInput('');
    setSearch('');
    setRegion('');
    router.replace('/');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="sticky top-0 z-50" style={{ background: 'var(--color-bg)' }}>
        <Navigation />
        <div className="max-w-desktop mx-auto px-4 md:px-16 py-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <SearchBar value={searchInput} onChange={setSearchInput} />
            <RegionFilter value={region} onChange={setRegion} />
          </div>
        </div>
      </div>

      <div className="max-w-desktop mx-auto px-4 md:px-16 pb-8">
        {(loading || showSkeleton) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <CountryCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} onAction={() => router.replace('/')} actionLabel="Go to Home" />
        ) : filtered.length === 0 ? (
          <NoData onReset={handleReset} />
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            style={{
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.4s',
            }}
          >
            {filtered.slice(0, visibleCount).map((country: Country) => (
              <CountryCard
                key={country.cca3}
                code={country.cca3}
                flag={country.flags.svg}
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital ? country.capital[0] : 'N/A'}
              />
            ))}
          </div>
        )}
        {!loading && visibleCount < filtered.length && fade && (
          <div className="text-center py-8 font-nunito-sans">{content.loading.loading}</div>
        )}
      </div>

      <BackToTop />
    </div>
  );
}
