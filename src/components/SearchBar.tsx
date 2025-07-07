import { Search } from 'lucide-react';
import React from 'react';
import content from '@/lib/content';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex items-center w-full md:w-80 mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <input
        type="text"
        placeholder={content.search.placeholder}
        className="w-full md:w-80 pl-10 pr-3 p-3 rounded font-nunito-sans border-none outline-none"
        style={{ background: 'var(--color-input)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
} 