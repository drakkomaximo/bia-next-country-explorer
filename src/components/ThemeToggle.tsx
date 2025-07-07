'use client'

import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import content from '@/lib/content'

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 justify-center h-10 rounded-lg transition-all duration-200 cursor-pointer font-nunito-sans text-sm"
      style={{
        background: 'var(--color-card)',
        color: 'var(--color-text)',
      }}
      aria-label={isDarkMode ? content.themeToggle.ariaLabelLight : content.themeToggle.ariaLabelDark}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      <span className="ml-2">
        {isDarkMode ? content.themeToggle.light : content.themeToggle.dark}
      </span>
    </button>
  )
} 