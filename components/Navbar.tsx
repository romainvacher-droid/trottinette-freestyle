'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-white hover:text-primary transition">
          TROTTINETTE<span className="text-primary">.</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/tricks" className="text-zinc-300 hover:text-primary transition font-medium">Tricks</Link>
          <Link href="/communaute" className="text-zinc-300 hover:text-primary transition font-medium">Communauté</Link>
          <Link href="/faq" className="text-zinc-300 hover:text-primary transition font-medium">FAQ</Link>
          <Link href="/contact" className="text-zinc-300 hover:text-primary transition font-medium">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="text-zinc-300 hover:text-primary transition text-sm">Dashboard</Link>
              <Link href="/profile" className="text-zinc-300 hover:text-primary transition text-sm">
                {session.user.name || session.user.email?.split('@')[0]}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-sm text-zinc-500 hover:text-red-400 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-zinc-300 hover:text-white transition text-sm">Connexion</Link>
              <Link
                href="/signup"
                className="rounded-full bg-primary px-5 py-2 font-bold text-black text-sm hover:opacity-90 transition"
              >
                Rejoindre
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white text-xl p-1" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-zinc-900 border-t border-zinc-800 p-4 space-y-3">
          <Link href="/tricks" className="block py-2 text-zinc-300 hover:text-primary" onClick={() => setIsOpen(false)}>Tricks</Link>
          <Link href="/communaute" className="block py-2 text-zinc-300 hover:text-primary" onClick={() => setIsOpen(false)}>Communauté</Link>
          <Link href="/faq" className="block py-2 text-zinc-300 hover:text-primary" onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link href="/contact" className="block py-2 text-zinc-300 hover:text-primary" onClick={() => setIsOpen(false)}>Contact</Link>
          <div className="border-t border-zinc-800 pt-3 space-y-3">
            {session?.user ? (
              <>
                <Link href="/dashboard" className="block py-2 text-primary font-semibold" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link href="/profile" className="block py-2 text-zinc-300" onClick={() => setIsOpen(false)}>Mon profil</Link>
                <button onClick={() => { signOut({ callbackUrl: '/login' }); setIsOpen(false); }} className="block text-red-400 py-2">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-zinc-300" onClick={() => setIsOpen(false)}>Connexion</Link>
                <Link href="/signup" className="block w-fit rounded-full bg-primary px-5 py-2 font-bold text-black text-sm" onClick={() => setIsOpen(false)}>
                  Rejoindre
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
