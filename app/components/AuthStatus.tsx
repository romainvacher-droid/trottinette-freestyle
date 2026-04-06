"use client";

import { signOut, useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-zinc-400 text-sm">Chargement…</span>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-300 hidden sm:inline">
          Bonjour, {session.user.name || session.user.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-zinc-300 hover:text-white transition"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <a href="/login" className="text-sm text-zinc-300 hover:text-white transition">
      Connexion
    </a>
  );
}
