import { useEffect, useState } from 'react';
import { fetchAllCountries } from '@/services/countriesApi';
import content from '@/lib/content';

interface Country {
  name: {
    common: string;
    nativeName?: Record<string, { common: string }>;
  };
  flags: { svg: string };
  population: number;
  region: string;
  capital: string[];
  cca3: string;
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAllCountries()
      .then(data => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
          setError(content.error.noDataFromApi);
        }
        setLoading(false);
      })
      .catch(() => {
        setCountries([]);
        setError(content.error.fetchCountries);
        setLoading(false);
      });
  }, []);

  return { countries, loading, error };
} 