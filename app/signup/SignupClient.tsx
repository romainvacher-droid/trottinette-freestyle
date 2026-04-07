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
  const [robot, setRobot] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = passwordStrength(password);
  const passwordsMatch = password === confirm && confirm.length > 0;
  const isFormValid = email.includes('@') && password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && passwordsMatch && agree && robot;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agree) { setError('Vous devez accepter la politique de confidentialité'); return; }
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return; }
    if (!robot) { setError('Veuillez cocher la case anti-robot'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, turnstileToken: 'disabled' }),
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
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* Panneau gauche */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-zinc-900 to-black items-center justify-center p-12 border-r border-zinc-800">
        <div className="text-center">
          <Link href="/" className="text-3xl font-extrabold text-white mb-6 block">
            TROTTINETTE<span className="text-primary">.</span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-3">Rejoins la communauté.</h2>
          <p className="text-zinc-400 mb-8">Des milliers de riders t'attendent.</p>
          <p className="text-zinc-500 text-sm mb-3">Déjà inscrit ?</p>
          <Link
            href="/login"
            className="inline-block rounded-full border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-black transition font-semibold"
          >
            Se connecter
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
          <h1 className="text-3xl font-extrabold text-white mb-2">Inscription</h1>
          <p className="text-zinc-400 text-sm mb-6">Gratuit, sans carte bancaire.</p>

          {error && (
            <div className="bg-red-900/80 text-white p-3 rounded-xl mb-4 border border-red-700 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-zinc-400 text-sm mb-1">Nom <span className="text-zinc-600">(optionnel)</span></label>
              <input
                id="name" type="text" autoComplete="name"
                value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                placeholder="Ton pseudo ou prénom"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-zinc-400 text-sm mb-1">Email *</label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                placeholder="ton@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-zinc-400 text-sm mb-1">Mot de passe *</label>
              <div className="relative">
                <input
                  id="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password"
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
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all rounded-full ${strength.score <= 1 ? 'bg-red-500' : strength.score === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 ${strength.color}`}>{strength.label}</p>
                  <ul className="text-xs text-zinc-600 mt-1 space-y-0.5">
                    <li className={password.length >= 8 ? 'text-green-500' : ''}>• 8 caractères minimum</li>
                    <li className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>• 1 majuscule</li>
                    <li className={/[0-9]/.test(password) ? 'text-green-500' : ''}>• 1 chiffre</li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="confirm" className="block text-zinc-400 text-sm mb-1">Confirmer le mot de passe *</label>
              <input
                id="confirm" type={showPassword ? 'text' : 'password'} required autoComplete="new-password"
                value={confirm} onChange={e => setConfirm(e.target.value)}
                className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-white focus:outline-none transition ${confirm && !passwordsMatch ? 'border-red-500' : 'border-zinc-700 focus:border-primary'}`}
                placeholder="••••••••"
              />
              {confirm && !passwordsMatch && (
                <p className="text-red-400 text-xs mt-1">Les mots de passe ne correspondent pas</p>
              )}
            </div>
            <div className="flex items-start gap-2 text-sm">
              <input id="agree" type="checkbox" required checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 accent-yellow-400" />
              <label htmlFor="agree" className="text-zinc-400">
                J'accepte la{' '}
                <Link href="/politique-confidentialite" className="text-primary hover:underline">politique de confidentialité</Link>
              </label>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <input id="no-robot-signup" type="checkbox" checked={robot} onChange={e => setRobot(e.target.checked)} className="accent-yellow-400" />
              <label htmlFor="no-robot-signup" className="text-zinc-400">Je ne suis pas un robot</label>
            </div>
            <button
              type="submit" disabled={loading || !isFormValid}
              className="w-full rounded-full bg-primary py-3 font-bold text-black hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? 'Inscription…' : "Créer mon compte"}
            </button>
          </form>

          <p className="mt-6 text-center text-zinc-500 text-sm">
            Déjà inscrit ?{' '}
            <Link href="/login" className="text-primary hover:underline">Connexion</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
