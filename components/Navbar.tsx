'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-yellow-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300">
          Trottinette Freestyle
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#fonctionnalites" className="text-gray-300 hover:text-yellow-400">Fonctionnalités</Link>
          <Link href="/#communaute" className="text-gray-300 hover:text-yellow-400">Communauté</Link>
          {session?.user ? (
            <>
              <span className="text-gray-300">Salut, {session.user.name || session.user.email}</span>
              <Link href="/dashboard" className="text-yellow-400 hover:underline">Dashboard</Link>
              <Link href="/profile" className="text-yellow-400 hover:underline">Profil</Link>
              <button onClick={() => signOut()} className="text-red-400 hover:underline">Déconnexion</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">Connexion</Link>
              <Link href="/signup" className="bg-yellow-500 text-black font-bold px-6 py-2 rounded hover:bg-yellow-400">Rejoindre</Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-800 p-4 space-y-4">
          <Link href="/#fonctionnalites" className="block text-gray-300 hover:text-yellow-400" onClick={() => setIsOpen(false)}>Fonctionnalités</Link>
          <Link href="/#communaute" className="block text-gray-300 hover:text-yellow-400" onClick={() => setIsOpen(false)}>Communauté</Link>
          {session?.user ? (
            <>
              <span className="block text-gray-300">Salut, {session.user.name}</span>
              <Link href="/dashboard" className="block text-yellow-400" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link href="/profile" className="block text-yellow-400" onClick={() => setIsOpen(false)}>Profil</Link>
              <button onClick={() => { signOut(); setIsOpen(false); }} className="text-red-400">Déconnexion</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Connexion</Link>
              <Link href="/signup" className="block bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-400" onClick={() => setIsOpen(false)}>Rejoindre</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
