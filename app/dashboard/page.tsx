import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard – Trottinette Freestyle',
  description: 'Votre tableau de bord personnel.',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-1">
            Salut, <span className="text-primary">{session?.user?.name ?? 'Rider'}</span> 👋
          </h1>
          <p className="text-zinc-400">{session?.user?.email}</p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Tricks vus', value: '4', icon: '🛴' },
            { label: 'Spots à explorer', value: 'Bientôt', icon: '📍' },
            { label: 'Membre depuis', value: '2026', icon: '📅' },
            { label: 'Niveau', value: 'Débutant', icon: '⭐' },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tricks */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60">
            <h2 className="text-lg font-bold text-white mb-4">🛴 Tricks à apprendre</h2>
            <ul className="space-y-3">
              {['Ollie', 'Kickflip', 'Grind', 'Barspin'].map((trick) => (
                <li key={trick} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">{trick}</span>
                </li>
              ))}
            </ul>
            <a href="/#tricks" className="mt-4 inline-block text-primary hover:underline text-sm">
              Voir les tutoriels →
            </a>
          </div>

          {/* Profil */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60">
            <h2 className="text-lg font-bold text-white mb-4">👤 Mon profil</h2>
            <div className="space-y-2 text-sm text-zinc-400 mb-4">
              <p><span className="text-zinc-500">Nom :</span> {session?.user?.name ?? <span className="text-zinc-600 italic">Non défini</span>}</p>
              <p><span className="text-zinc-500">Email :</span> {session?.user?.email}</p>
            </div>
            <Link href="/profile" className="inline-block rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-primary hover:text-primary transition">
              Modifier mon profil
            </Link>
          </div>

          {/* Ressources */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60">
            <h2 className="text-lg font-bold text-white mb-4">🔗 Ressources</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-zinc-400 hover:text-primary transition text-sm flex items-center gap-2">
                  <span>❓</span> FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-primary transition text-sm flex items-center gap-2">
                  <span>✉️</span> Nous contacter
                </Link>
              </li>
              <li>
                <a href="/#features" className="text-zinc-400 hover:text-primary transition text-sm flex items-center gap-2">
                  <span>⚡</span> Features de la trottinette
                </a>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-zinc-400 hover:text-primary transition text-sm flex items-center gap-2">
                  <span>🔒</span> Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bannière spots */}
        <div className="mt-6 p-6 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-white font-bold mb-1">📍 Carte des spots — bientôt disponible</h3>
            <p className="text-zinc-400 text-sm">Trouve les meilleurs spots de freestyle près de chez toi.</p>
          </div>
          <Link href="/contact" className="flex-shrink-0 rounded-full border border-primary px-5 py-2 text-primary hover:bg-primary hover:text-black transition text-sm font-semibold">
            Suggérer un spot
          </Link>
        </div>
      </div>
    </div>
  );
}
