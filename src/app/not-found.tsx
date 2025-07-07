import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import content from '@/lib/content';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex flex-col items-center gap-6 p-8 rounded-lg" style={{ background: 'var(--color-card)', boxShadow: 'var(--color-shadow)' }}>
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-2" />
        <h1 className="text-3xl font-extrabold font-nunito-sans mb-2 text-center">{content.notFound.title}</h1>
        <p className="text-lg font-nunito-sans text-center mb-4">{content.notFound.description}</p>
        <Link href="/" className="inline-block px-6 py-2 rounded font-nunito-sans text-base font-semibold transition-all cursor-pointer" style={{ background: 'var(--color-input)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}>
          {content.notFound.goHome}
        </Link>
      </div>
    </div>
  );
} 