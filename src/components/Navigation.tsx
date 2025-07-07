import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import content from '@/lib/content'

export default function Navigation() {
  return (
    <nav className="w-full" style={{ background: 'var(--color-card)', boxShadow: 'var(--color-shadow)' }}>
      <div className="max-w-desktop mx-auto px-4 md:px-16 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold font-nunito-sans m-0 p-0">
            <Link href="/" className="hover:underline" style={{ color: 'var(--color-text)', cursor: 'pointer', textDecoration: 'none' }}>
              {content.navigation.title}
            </Link>
          </h1>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 