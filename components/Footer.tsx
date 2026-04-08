import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-extrabold text-white">
              TROTTINETTE<span className="text-primary">.</span>
            </Link>
            <p className="text-zinc-500 text-sm mt-2">La plateforme des riders freestyle.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Contenu</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tricks" className="text-zinc-400 hover:text-primary transition">Tricks & Tutoriels</Link></li>
              <li><Link href="/communaute" className="text-zinc-400 hover:text-primary transition">Communauté</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Aide</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-zinc-400 hover:text-primary transition">FAQ</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="text-zinc-400 hover:text-primary transition">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="text-zinc-400 hover:text-primary transition">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Trottinette Freestyle. Tous droits réservés.</p>
          <a href="https://instagram.com/trottinette_freestyle" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition text-sm">
            Instagram ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
