import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trottinette Freestyle – La plateforme des riders urbains',
  description: 'Rejoins la communauté des riders. Événements, tricks, spots et matériel de trottinette freestyle.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Trottinette Freestyle',
    description: 'La plateforme des riders urbains',
    url: 'https://trottinette-freestyle.vercel.app',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trottinette Freestyle',
    description: 'La plateforme des riders urbains',
    images: ['/og-image.jpg']
  }
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} bg-black text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
