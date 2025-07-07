import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Where in the world? | Country Explorer",
  description:
    "Explore countries of the world with Next.js: search, region filter, light/dark mode, infinite scroll, country details, and modern animations. UI faithful to professional design.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="any" />
      </head>
      <body className={`antialiased ${nunitoSans.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
