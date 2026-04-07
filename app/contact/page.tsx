'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
      } else {
        setSuccess(true);
      }
    } catch {
      setError('Impossible d\'envoyer le message. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Nous <span className="text-primary">contacter</span>
          </h1>
          <p className="text-zinc-400 text-lg">Une question, un bug, une suggestion ? On répond sous 24h.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Infos */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
              <div className="text-primary text-2xl mb-3">✉️</div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <p className="text-zinc-400 text-sm">contact@trottinette-freestyle.vercel.app</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
              <div className="text-primary text-2xl mb-3">⏱️</div>
              <h3 className="text-white font-semibold mb-1">Délai de réponse</h3>
              <p className="text-zinc-400 text-sm">Généralement sous 24 à 48 heures.</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
              <div className="text-primary text-2xl mb-3">❓</div>
              <h3 className="text-white font-semibold mb-1">FAQ</h3>
              <p className="text-zinc-400 text-sm mb-3">Tu trouveras peut-être ta réponse dans notre FAQ.</p>
              <Link href="/faq" className="text-primary hover:underline text-sm">Voir la FAQ →</Link>
            </div>
          </div>

          {/* Formulaire */}
          <div className="md:col-span-2">
            {success ? (
              <div className="h-full flex items-center justify-center p-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 text-center">
                <div>
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Message envoyé !</h2>
                  <p className="text-zinc-400">On te répond dans les plus brefs délais.</p>
                  <button
                    onClick={() => { setSuccess(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="mt-6 text-primary hover:underline text-sm"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-5">
                {error && (
                  <div className="bg-red-900/80 text-white p-3 rounded-lg border border-red-700 text-sm">{error}</div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-1" htmlFor="name">Nom *</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder="Ton nom"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-1" htmlFor="email">Email *</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="ton@email.com"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-1" htmlFor="subject">Sujet</label>
                  <select
                    id="subject" name="subject"
                    value={form.subject} onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                  >
                    <option value="">Choisir un sujet…</option>
                    <option value="Question générale">Question générale</option>
                    <option value="Bug / Problème technique">Bug / Problème technique</option>
                    <option value="Suggestion d'amélioration">Suggestion d'amélioration</option>
                    <option value="Suppression de compte">Suppression de compte</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-1" htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message" required rows={6}
                    value={form.message} onChange={handleChange}
                    placeholder="Décris ta question ou ton problème..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition resize-none"
                  />
                  <p className="text-zinc-600 text-xs mt-1">{form.message.length}/2000</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-primary py-3 font-bold text-black hover:opacity-90 disabled:opacity-50 transition"
                >
                  {loading ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
