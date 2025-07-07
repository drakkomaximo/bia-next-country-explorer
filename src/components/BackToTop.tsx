'use client'

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import content from '@/lib/content';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full transition-all duration-300 cursor-pointer"
          style={{ 
            background: 'var(--color-card)', 
            color: 'var(--color-text)', 
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
            border: '1px solid var(--color-placeholder)',
          }}
          onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.28)')}
          onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(0,0,0,0.18)')}
          aria-label={content.backToTop.ariaLabel}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
} 