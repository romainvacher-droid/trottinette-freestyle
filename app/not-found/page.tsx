import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page non trouvée – Trottinette Freestyle',
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Cette page n&apos;existe pas.</p>
        <Link href="/" className="bg-yellow-500 text-black font-bold px-8 py-3 rounded hover:bg-yellow-400 transition">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
