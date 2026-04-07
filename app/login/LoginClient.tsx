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
        body: JSON.stringify({ email, password, callbackUrl: '/dashboard', turnstileToken })
      });
      const data = await res.json();
      if (!res.ok) {
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
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-900 to-gray-900 items-center justify-center p-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-yellow-300 mb-4">Ride Libre.</h2>
          <p className="text-gray-200 mb-6">La communauté des riders urbains.</p>
          <p className="text-gray-400">Pas encore inscrit ?</p>
          <Link href="/signup" className="mt-4 inline-block border border-yellow-400 text-yellow-400 px-6 py-3 rounded hover:bg-yellow-400 hover:text-black transition">Créer un compte</Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900 p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6">Connexion</h1>
          {error && <div className="bg-red-900/80 text-white p-3 rounded mb-4 border border-red-700">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-400 mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-12 text-white focus:outline-none focus:border-yellow-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-yellow-400 hover:underline">Mot de passe oublié ?</Link>
            </div>

            <div className="flex justify-center">
              <Turnstile onToken={setTurnstileToken} />
              {/* Fallback checkbox car Turnstile désactivé */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <input
                  type="checkbox"
                  id="no-robot"
                  className="rounded"
                  checked={turnstileToken === 'disabled'}
                  onChange={e => setTurnstileToken(e.target.checked ? 'disabled' : null)}
                />
                <label htmlFor="no-robot">Je ne suis pas un robot</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !turnstileToken}
              className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:opacity-50 transition"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-400">
            Pas encore inscrit ? <Link href="/signup" className="text-yellow-400 hover:underline">Créer un compte</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
