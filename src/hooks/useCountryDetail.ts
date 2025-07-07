import { useEffect, useState } from 'react';
import { fetchCountryByCode } from '@/services/countriesApi';
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

export function useCountryDetail(code: string) {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    setError(null);
    fetchCountryByCode(code)
      .then(data => {
        setCountry(data);
        setLoading(false);
      })
      .catch(() => {
        setCountry(null);
        setError(content.error.fetchCountry);
        setLoading(false);
      });
  }, [code]);

  return { country, loading, error };
} 