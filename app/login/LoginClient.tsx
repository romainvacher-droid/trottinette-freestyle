'use client';

import { useState } from 'react';
import Link from 'next/link';
import Turnstile from '@/components/Turnstile';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!turnstileToken) {
      setError('Veuillez valider le captcha');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, callbackUrl: '/dashboard', turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(data.error || 'Email ou mot de passe incorrect');
      } else {
        window.location.href = data.redirectTo ?? '/dashboard';
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* Panneau gauche */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-zinc-900 to-black items-center justify-center p-12 border-r border-zinc-800">
        <div className="text-center">
          <Link href="/" className="text-3xl font-extrabold text-white mb-6 block">
            TROTTINETTE<span className="text-primary">.</span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-3">Ride Libre.</h2>
          <p className="text-zinc-400 mb-8">La communauté des riders urbains.</p>
          <p className="text-zinc-500 text-sm mb-3">Pas encore inscrit ?</p>
          <Link
            href="/signup"
            className="inline-block rounded-full border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-black transition font-semibold"
          >
            Créer un compte gratuit
          </Link>
        </div>
      </div>

      {/* Formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="md:hidden mb-8 text-center">
            <Link href="/" className="text-2xl font-extrabold text-white">
              TROTTINETTE<span className="text-primary">.</span>
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Connexion</h1>
          <p className="text-zinc-400 text-sm mb-6">Content de te revoir 👋</p>

          {error && (
            <div className="bg-red-900/80 text-white p-3 rounded-xl mb-4 border border-red-700 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-zinc-400 text-sm mb-1">Email</label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                placeholder="ton@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-zinc-400 text-sm mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  id="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-primary transition"
                  placeholder="••••••••"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-primary"
                  aria-label={showPassword ? 'Masquer' : 'Afficher'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">Mot de passe oublié ?</Link>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 text-sm py-1">
              <Turnstile onToken={setTurnstileToken} />
              <input
                type="checkbox" id="no-robot" className="rounded accent-yellow-400"
                checked={turnstileToken === 'disabled'}
                onChange={e => setTurnstileToken(e.target.checked ? 'disabled' : null)}
              />
              <label htmlFor="no-robot">Je ne suis pas un robot</label>
            </div>

            <button
              type="submit" disabled={loading || !turnstileToken}
              className="w-full rounded-full bg-primary py-3 font-bold text-black hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          <p className="mt-6 text-center text-zinc-500 text-sm">
            Pas encore inscrit ?{' '}
            <Link href="/signup" className="text-primary hover:underline">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
