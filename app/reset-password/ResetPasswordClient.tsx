'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erreur');
      } else {
        setMessage('Mot de passe réinitialisé ! Tu peux maintenant te connecter.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="p-8 rounded-2xl border border-red-800 bg-red-900/20 text-center">
          <p className="text-red-400 font-semibold">Lien invalide ou expiré.</p>
          <Link href="/forgot-password" className="mt-4 inline-block text-primary hover:underline text-sm">
            Demander un nouveau lien
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60">
        <h1 className="text-3xl font-extrabold text-white mb-2">Nouveau mot de passe</h1>
        <p className="text-zinc-400 text-sm mb-6">Choisis un mot de passe fort (8 car. min, 1 majuscule, 1 chiffre).</p>

        {error && <div className="bg-red-900/80 text-white p-3 rounded-xl mb-4 border border-red-700 text-sm">{error}</div>}
        {message && (
          <div className="bg-green-900/80 text-white p-4 rounded-xl mb-4 border border-green-700 text-sm">
            {message}
            <div className="mt-3">
              <Link href="/login" className="text-primary hover:underline font-semibold">Se connecter →</Link>
            </div>
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-zinc-400 text-sm mb-1">Nouveau mot de passe</label>
              <input
                id="password" type="password" required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-zinc-400 text-sm mb-1">Confirmer le mot de passe</label>
              <input
                id="confirm" type="password" required
                value={confirm} onChange={e => setConfirm(e.target.value)}
                className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white focus:outline-none transition ${confirm && confirm !== password ? 'border-red-500' : 'border-zinc-700 focus:border-primary'}`}
                placeholder="••••••••"
              />
              {confirm && confirm !== password && (
                <p className="text-red-400 text-xs mt-1">Les mots de passe ne correspondent pas</p>
              )}
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full rounded-full bg-primary py-3 font-bold text-black hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? 'Réinitialisation…' : 'Réinitialiser le mot de passe'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-primary hover:underline text-sm">← Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
}
