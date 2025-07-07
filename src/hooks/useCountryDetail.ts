import { useEffect, useState } from 'react';
import { fetchCountryByCode } from '@/services/countriesApi';
import content from '@/lib/content';

export function useCountryDetail(code: string) {
  const [country, setCountry] = useState<any>(null);
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