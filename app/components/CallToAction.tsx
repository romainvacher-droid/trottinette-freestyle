"use client";

import { useState } from "react";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: intégrer Calendly ou后端 API
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Prêt à rider comme un pro ?
        </h2>
        <p className="text-zinc-400 mb-8 text-lg">
          Réserve ton test gratuit et découvre la trottinette freestyle qui va changer ton jeu.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl border border-secondary bg-secondary/10 text-white">
            ✅ Merci ! On te contacte dans les 24h pour planifier ton essai.
          </div>
        ) : (
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
              className="rounded-full bg-primary px-6 py-3 font-bold text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.8)] transition"
            >
              Je veux tester
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-zinc-500">
          Pas de spam. Tu peux annuler à tout moment.
        </p>
      </div>
    </section>
  );
}
