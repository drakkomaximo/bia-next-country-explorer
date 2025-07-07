import React, { useEffect, useState } from 'react';
import { fetchRegions } from '@/services/countriesApi';
import { ChevronDown } from 'lucide-react';
import content from '@/lib/content';

interface RegionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RegionFilter({ value, onChange }: RegionFilterProps) {
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    fetchRegions().then((regions) => setRegions(regions as string[]));
  }, []);

  return (
    <div className="relative w-full md:w-60 mb-6">
      <select
        className="w-full p-3 pr-10 rounded font-nunito-sans border-none outline-none appearance-none"
        style={{ background: 'var(--color-input)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">{content.regionFilter.placeholder}</option>
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
    </div>
  );
} 