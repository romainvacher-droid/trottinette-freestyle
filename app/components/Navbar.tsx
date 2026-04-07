"use client";

import { useState } from "react";
import Link from "next/link";
import AuthStatus from "./AuthStatus";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
              TROTTINETTE<span className="text-primary">.</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/#features" className="text-zinc-300 hover:text-white transition">Features</a>
            <a href="/#testimonials" className="text-zinc-300 hover:text-white transition">Témoignages</a>
            <Link href="/faq" className="text-zinc-300 hover:text-white transition">FAQ</Link>
            <Link href="/contact" className="text-zinc-300 hover:text-white transition">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <AuthStatus />
            <Link
              href="/signup"
              className="rounded-full bg-primary px-5 py-2 font-semibold text-black shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.7)] transition"
            >
              Commencer
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-white focus:outline-none" aria-label="Menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-b border-zinc-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="/#features" className="block px-3 py-2 text-zinc-300 hover:text-white" onClick={() => setOpen(false)}>Features</a>
            <a href="/#testimonials" className="block px-3 py-2 text-zinc-300 hover:text-white" onClick={() => setOpen(false)}>Témoignages</a>
            <Link href="/faq" className="block px-3 py-2 text-zinc-300 hover:text-white" onClick={() => setOpen(false)}>FAQ</Link>
            <Link href="/contact" className="block px-3 py-2 text-zinc-300 hover:text-white" onClick={() => setOpen(false)}>Contact</Link>
            <div className="pt-2 border-t border-zinc-800">
              <AuthStatus />
            </div>
            <Link
              href="/signup"
              className="block mx-auto w-fit mt-4 rounded-full bg-primary px-5 py-2 font-bold text-black"
              onClick={() => setOpen(false)}
            >
              Commencer
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
