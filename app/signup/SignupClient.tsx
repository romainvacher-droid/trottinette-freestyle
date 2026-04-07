'use client';

import { useState } from 'react';
import Link from 'next/link';

function passwordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  switch (score) {
    case 0: return { score, label: 'Très faible', color: 'text-red-500' };
    case 1: return { score, label: 'Faible', color: 'text-orange-500' };
    case 2: return { score, label: 'Moyen', color: 'text-yellow-500' };
    default: return { score, label: 'Fort', color: 'text-green-500' };
  }
}

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [robot, setRobot] = useState(false);

  const strength = passwordStrength(password);
  const passwordsMatch = password === confirm && confirm.length > 0;
  const isFormValid = email.includes('@') && password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && passwordsMatch && agree && robot;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agree) {
      setError('Vous devez accepter la politique de confidentialité');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (!robot) {
      setError('Veuillez cocher la case anti-robot');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, turnstileToken: 'disabled' })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erreur d\'inscription');
      } else {
        window.location.href = '/login?registered=true';
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
          <p className="text-gray-200 mb-6">Rejoins la communauté des riders.</p>
          <p className="text-gray-400">Déjà inscrit ?</p>
          <Link href="/login" className="mt-4 inline-block border border-yellow-400 text-yellow-400 px-6 py-3 rounded hover:bg-yellow-400 hover:text-black transition">Connexion</Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900 p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6">Inscription</h1>
          {error && <div className="bg-red-900/80 text-white p-3 rounded mb-4 border border-red-700">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-400 mb-1">Nom (optionnel)</label>
              <input id="name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500 transition" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
              <input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500 transition" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-400 mb-1">Mot de passe</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-12 text-white focus:outline-none focus:border-yellow-500 transition" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <div className="mt-2">
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div className={`h-full transition-all ${strength.score === 0 ? 'bg-gray-600' : strength.score === 1 ? 'bg-red-500' : strength.score === 2 ? 'bg-yellow-500' : strength.score === 3 ? 'bg-lime-500' : 'bg-green-500'}`} style={{ width: `${(strength.score / 4) * 100}%` }}></div>
                </div>
                <p className={`text-sm mt-1 ${strength.color}`}>{strength.label}</p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li className={password.length >= 8 ? 'text-green-500' : ''}>• 8 caractères minimum</li>
                  <li className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>• 1 majuscule</li>
                  <li className={/[0-9]/.test(password) ? 'text-green-500' : ''}>• 1 chiffre</li>
                </ul>
              </div>
            </div>
            <div>
              <label htmlFor="confirm" className="block text-gray-400 mb-1">Confirmer le mot de passe</label>
              <input id="confirm" type={showPassword ? 'text' : 'password'} required autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} className={`w-full bg-gray-800 border rounded p-3 text-white focus:outline-none transition ${confirm.length > 0 && !passwordsMatch ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'}`} />
              {confirm.length > 0 && !passwordsMatch && <p className="text-red-500 text-sm mt-1">Les mots de passe ne correspondent pas</p>}
            </div>
            <div className="flex items-start">
              <input id="agree" type="checkbox" required checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-1 mr-2" />
              <label htmlFor="agree" className="text-sm text-gray-400">J'accepte la <Link href="/politique-confidentialite" className="text-yellow-400 hover:underline">politique de confidentialité</Link></label>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <input
                type="checkbox"
                id="no-robot-signup"
                className="rounded"
                checked={robot}
                onChange={e => setRobot(e.target.checked)}
              />
              <label htmlFor="no-robot-signup">Je ne suis pas un robot</label>
            </div>
            <button type="submit" disabled={loading || !isFormValid} className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:opacity-50 transition">
              {loading ? 'Inscription…' : "S'inscrire"}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-400">
            Déjà inscrit ? <Link href="/login" className="text-yellow-400 hover:underline">Connexion</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
