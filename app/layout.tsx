import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Capricorn Group Care LLC',
    default: 'Capricorn Group Care LLC — Compassionate Residential Senior Care'
  },
  description:
    'Providing safe, supportive residential group home care for seniors and adults in McKinney, Plano, Frisco, and the greater Dallas-Fort Worth area.',
  keywords: [
    'residential care',
    'senior care',
    'group home',
    'assisted living',
    'McKinney TX',
    'Dallas senior care',
    'RN care planning'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={poppins.variable}
    >
      <body>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-white focus:shadow-elevated'
        >
          Skip to content
        </a>
        <Header />
        <main id='main-content'>{children}</main>
        <Footer />
        <Toaster
          richColors
          position='top-right'
        />
      </body>
    </html>
  );
}
