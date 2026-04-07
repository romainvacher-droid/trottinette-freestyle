'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erreur');
      } else {
        setMessage(data.message || 'Instructions envoyées');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60">
        <h1 className="text-3xl font-extrabold text-white mb-2">Mot de passe oublié</h1>
        <p className="text-zinc-400 text-sm mb-6">Entre ton email pour recevoir un lien de réinitialisation.</p>

        {error && <div className="bg-red-900/80 text-white p-3 rounded-xl mb-4 border border-red-700 text-sm">{error}</div>}
        {message && <div className="bg-green-900/80 text-white p-3 rounded-xl mb-4 border border-green-700 text-sm">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-zinc-400 text-sm mb-1">Email</label>
            <input
              id="email" type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition"
              placeholder="ton@email.com"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-full bg-primary py-3 font-bold text-black hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? 'Envoi…' : 'Envoyer les instructions'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-primary hover:underline text-sm">← Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
}
