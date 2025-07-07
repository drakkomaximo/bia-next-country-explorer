import Link from 'next/link';
import { SearchX } from 'lucide-react';
import content from '@/lib/content';

export default function NoData({ onReset }: { onReset?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-4">
      <div className="flex flex-col items-center gap-4 p-8 rounded-lg" style={{ background: 'var(--color-card)', boxShadow: 'var(--color-shadow)' }}>
        <SearchX className="w-16 h-16 text-red-500 mb-2" />
        <h2 className="text-2xl font-extrabold font-nunito-sans mb-2 text-center">{content.noData.title}</h2>
        <p className="text-base font-nunito-sans text-center mb-4">{content.noData.description}</p>
        {onReset ? (
          <button
            onClick={onReset}
            className="inline-block px-6 py-2 rounded font-nunito-sans text-base font-semibold transition-all"
            style={{ background: 'var(--color-input)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}
          >
            {content.noData.clearFilters}
          </button>
        ) : (
          <Link href="/" className="inline-block px-6 py-2 rounded font-nunito-sans text-base font-semibold transition-all" style={{ background: 'var(--color-input)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}>
            {content.noData.goHome}
          </Link>
        )}
      </div>
    </div>
  );
} 