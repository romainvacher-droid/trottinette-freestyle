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
        body: JSON.stringify({ token, email, newPassword: password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erreur');
      } else {
        setMessage('Mot de passe réinitialisé ! Vous pouvez maintenant vous connecter.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-500">Lien invalide ou manquant.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg border border-yellow-500/30">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Nouveau mot de passe</h1>
        {error && <div className="bg-red-900 text-white p-3 rounded mb-4">{error}</div>}
        {message && <div className="bg-green-900 text-white p-3 rounded mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-gray-400 mb-1">Nouveau mot de passe</label>
            <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-yellow-500" />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-gray-400 mb-1">Confirmer</label>
            <input id="confirm" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-yellow-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:opacity-50">
            {loading ? 'Réinitialisation…' : 'Réinitialiser'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-yellow-400 hover:underline">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
}
