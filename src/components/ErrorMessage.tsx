import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import content from '@/lib/content';

interface ErrorMessageProps {
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export default function ErrorMessage({ message = 'An unexpected error occurred. Please try again.', onAction, actionLabel = 'Go to Home' }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-4">
      <div className="flex flex-col items-center gap-4 p-8 rounded-lg" style={{ background: 'var(--color-card)', boxShadow: 'var(--color-shadow)' }}>
        <AlertTriangle className="w-16 h-16 text-red-500 mb-2" />
        <h2 className="text-2xl font-extrabold font-nunito-sans mb-2 text-center">{content.error.title}</h2>
        <p className="text-base font-nunito-sans text-center mb-4">{message || content.error.defaultMessage}</p>
        {onAction ? (
          <button
            onClick={onAction}
            className="inline-block px-6 py-2 rounded font-nunito-sans text-base font-semibold transition-all"
            style={{ background: 'var(--color-input)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}
          >
            {actionLabel || content.error.goHome}
          </button>
        ) : (
          <Link href="/" className="inline-block px-6 py-2 rounded font-nunito-sans text-base font-semibold transition-all" style={{ background: 'var(--color-input)', color: 'var(--color-text)', boxShadow: 'var(--color-shadow)' }}>
            {content.error.goHome}
          </Link>
        )}
      </div>
    </div>
  );
} 