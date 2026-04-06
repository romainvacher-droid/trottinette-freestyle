"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO: integrate real auth
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }
    // Simulate API call
    setTimeout(() => {
      alert("Connexion simulée — à connecter avec ton backend + Neon");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Bienvenue chez <span className="text-primary">Trottinette.</span>
          </h1>
          <p className="text-zinc-400">Connecte‑toi pour accéder à ton espace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/80 p-8 rounded-2xl border border-zinc-700">
          {error && (
            <div className="p-3 rounded bg-red-900/50 text-red-200 text-sm">{error}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="toi@exemple.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 font-bold text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.8)] transition disabled:opacity-70"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-400 text-sm">
          Pas encore de compte ?{" "}
          <Link href="#" className="text-tertiary hover:underline">
            Créer un compte
          </Link>
        </p>

        <p className="mt-4 text-center text-zinc-500 text-xs">
          Démo : tout est simulé côté front.
        </p>
      </div>
    </div>
  );
}
