import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Trottinette Freestyle – Maîtrise l\'art du ride urbain',
  description: 'La plateforme des passionnés de trottinette freestyle. Apprends les tricks, rejoins la communauté, trouve les meilleurs spots.',
  openGraph: {
    title: 'Trottinette Freestyle',
    description: 'Apprends les tricks, rejoins la communauté, trouve les meilleurs spots',
    url: 'https://trottinette-freestyle.vercel.app',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trottinette Freestyle',
    description: 'Apprends les tricks, rejoins la communauté, trouve les meilleurs spots',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');
  return <HomeClient />;
}
