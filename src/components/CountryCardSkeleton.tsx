import React from 'react';

export default function CountryCardSkeleton() {
  return (
    <div
      className="block rounded-lg overflow-hidden p-0 m-0"
      style={{
        background: 'var(--color-card)',
        color: 'var(--color-text)',
        boxShadow: 'var(--color-shadow)',
        minHeight: 320,
      }}
    >
      <div className="w-full h-40 animate-pulse bg-gray-200 dark:bg-gray-700" style={{ borderRadius: '0.5rem 0.5rem 0 0' }} />
      <div className="p-6">
        <div className="h-6 w-2/3 mb-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-4 w-1/2 mb-2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-4 w-1/3 mb-2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
} 