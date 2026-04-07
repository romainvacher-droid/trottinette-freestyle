import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              TROTTINETTE<span className="text-primary">.</span>
            </span>
            <p className="text-zinc-500 mt-2 text-sm max-w-xs">
              La plateforme des passionnés de trottinette freestyle. Apprends, progresse, connecte-toi.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-zinc-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/signup" className="text-zinc-400 hover:text-white transition">Créer un compte</Link></li>
              <li><Link href="/login" className="text-zinc-400 hover:text-white transition">Connexion</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="text-zinc-400 hover:text-white transition">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="text-zinc-400 hover:text-white transition">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">© 2026 Trottinette Freestyle. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <a
              href="https://instagram.com/trottinette_freestyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-primary transition text-sm"
            >
              Instagram
            </a>
            <Link href="/contact" className="text-zinc-400 hover:text-primary transition text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
