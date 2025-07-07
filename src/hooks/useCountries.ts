import { useEffect, useState } from 'react';
import { fetchAllCountries } from '@/services/countriesApi';
import content from '@/lib/content';

export function useCountries() {
  const [countries, setCountries] = useState<any[]>([]);
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