# Country Explorer

A professional Next.js application to explore countries of the world, featuring search, region filter, infinite scroll, country detail, dark/light mode, accessibility, and centralized content.

## 🚀 Main Features

- **Next.js 14** (App Router, TypeScript)
- **Search and region filter** with URL persistence
- **Infinite scroll** in the country grid
- **Country detail** with full information and border country links
- **Dark/Light mode** with smooth transitions and persistence
- **Centralized UI texts** in `src/lib/content.ts` for easy maintenance and translation
- **Accessibility**: alt texts, aria-labels, keyboard navigation
- **SEO**: dynamic metadata, semantic tags, descriptive alts
- **Responsive design** faithful to Figma/style guide
- **Skeleton loaders** and professional handling of errors and empty states
- **Visually hidden but functional scrollbars** (`scrollbar-hide` and global CSS)

## 🎨 Implemented Style Guide

### Colors
- **Dark Blue** (Dark Mode Elements): `hsl(209, 23%, 22%)`
- **Very Dark Blue** (Dark Mode Background): `hsl(207, 26%, 17%)`
- **Very Dark Blue Text** (Light Mode Text): `hsl(200, 15%, 8%)`
- **Dark Gray** (Light Mode Input): `hsl(0, 0%, 52%)`
- **Very Light Gray** (Light Mode Background): `hsl(0, 0%, 98%)`
- **White** (Dark Mode Text & Light Mode Elements): `hsl(0, 0%, 100%)`

### Typography
- **Font**: Nunito Sans
- **Weights**: 300 (light), 600 (semibold), 800 (extrabold)
- **Sizes**: 14px (homepage), 16px (detail page)

### Layout
- **Desktop**: 1440px max width

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Zustand](https://zustand-demo.pmnd.rs/) - Manejo de estado
- [Lucide React](https://lucide.dev/) - Iconos

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles and utilities (scrollbar-hide, colors, etc.)
│   ├── layout.tsx            # Main layout
│   ├── not-found.tsx         # Custom 404 page
│   ├── page.tsx              # Main page (grid, filters, search)
│   └── country/
│       └── [code]/
│           ├── page.tsx              # Dynamic country detail route
│           └── CountryDetailClient.tsx
├── components/
│   ├── BackToTop.tsx         # Floating back-to-top button
│   ├── CountryCard.tsx       # Country card
│   ├── CountryCardSkeleton.tsx # Country skeleton loader
│   ├── ErrorMessage.tsx      # Reusable error UI
│   ├── Navigation.tsx        # Navigation bar
│   ├── NoData.tsx            # Empty state UI
│   ├── RegionFilter.tsx      # Region filter
│   ├── SearchBar.tsx         # Search bar
│   ├── ThemeProvider.tsx     # Theme provider
│   └── ThemeToggle.tsx       # Theme toggle button
├── hooks/
│   ├── useCountries.ts       # Hook for country list
│   └── useCountryDetail.ts   # Hook for country detail
├── lib/
│   └── content.ts            # Centralized UI texts for the whole app
├── services/
│   └── countriesApi.ts       # RestCountries API logic
└── store/
    └── themeStore.ts         # Zustand store for theme
```

## 📦 Installation & Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd bia-next-country-explorer
```
2. Install dependencies:
```bash
pnpm install
```
3. Start the development server:
```bash
pnpm run dev
```
4. Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy on Vercel

1. Push your repository to GitHub/GitLab.
2. Go to [vercel.com](https://vercel.com/) and create a new project by importing your repo.
3. Vercel will auto-detect Next.js. No extra config needed.
4. If you use environment variables, add them in the Vercel dashboard.
5. Deploy and access your app at the provided Vercel URL.

## 🧪 Testing

The project includes comprehensive test coverage for components, hooks, and API services using Jest and React Testing Library.

### Test Structure

```
src/
├── components/
│   └── __tests__/
│       ├── CountryCard.test.tsx
│       ├── SearchBar.test.tsx
│       └── RegionFilter.test.tsx
├── hooks/
│   └── __tests__/
│       ├── useCountries.test.ts
│       └── useCountryDetail.test.ts
└── app/
    └── __tests__/
        └── page.test.tsx
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Coverage

- **Components**: CountryCard, SearchBar, RegionFilter
- **Hooks**: useCountries, useCountryDetail  
- **Pages**: Main page integration tests
- **API Services**: Mocked API calls and error handling

### Testing Setup

The project uses:
- **Jest** as the test runner
- **React Testing Library** for component testing
- **@testing-library/jest-dom** for custom matchers
- **@testing-library/user-event** for user interactions
- **MSW (Mock Service Worker)** for API mocking

### Key Testing Features

- **Mocked API responses** for consistent testing
- **Theme provider context** for dark/light mode testing
- **URL persistence testing** for search and filter functionality
- **Error state handling** and loading states
- **Accessibility testing** with proper ARIA attributes

## 📝 Final Notes & Recommendations
- All UI texts are centralized in `src/lib/content.ts` for easy translation and maintenance.
- Scrollbars are visually hidden globally but remain fully functional.
- The app is accessible, SEO-friendly, and responsive.
- You can easily customize colors, texts, and structure.
- Comprehensive test coverage ensures code reliability and maintainability.

---

Project licensed under MIT.
