import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Trottinette Freestyle. Tous droits réservés.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="text-gray-400 hover:text-yellow-400 text-sm">Mentions légales</Link>
          <Link href="/politique-confidentialite" className="text-gray-400 hover:text-yellow-400 text-sm">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
