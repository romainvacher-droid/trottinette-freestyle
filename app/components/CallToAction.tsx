"use client";

import { useState } from "react";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Visiteur',
          email,
          subject: 'Demande de test – trottinette freestyle',
          message: `Nouvelle demande de test reçue depuis la page d'accueil.\nEmail : ${email}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur lors de l\'envoi.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Impossible d\'envoyer. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Prêt à rider comme un pro ?
        </h2>
        <p className="text-zinc-400 mb-8 text-lg">
          Laisse ton email et on te contacte pour organiser ton test gratuit.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl border border-primary/40 bg-primary/10 text-white">
            ✅ Merci ! On te contacte dans les 24h pour planifier ton essai.
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-900/60 border border-red-700 text-white text-sm">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-primary px-6 py-3 font-bold text-black hover:opacity-90 disabled:opacity-50 transition"
              >
                {loading ? 'Envoi…' : 'Je veux tester'}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-sm text-zinc-500">
          Pas de spam. Tu peux annuler à tout moment.
        </p>
      </div>
    </section>
  );
}
