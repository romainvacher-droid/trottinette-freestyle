import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export const metadata = {
  title: 'Profil – Trottinette Freestyle',
  description: 'Gérez votre profil.',
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-8">Mon <span className="text-primary">profil</span></h1>

        {/* Infos du compte */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Informations du compte</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
              <span className="text-zinc-500">Email</span>
              <span className="text-zinc-200">{session?.user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
              <span className="text-zinc-500">Nom</span>
              <span className="text-zinc-200">{session?.user?.name ?? <span className="text-zinc-600 italic">Non défini</span>}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-zinc-500">Compte</span>
              <span className="text-green-400 text-xs font-semibold px-2 py-0.5 bg-green-900/40 rounded-full">Actif</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 hover:border-primary hover:text-primary transition"
            >
              ← Dashboard
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 hover:border-primary hover:text-primary transition"
            >
              ✉️ Contacter le support
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Zone de danger */}
        <div className="p-6 rounded-2xl border border-red-900/40 bg-red-950/20">
          <h2 className="text-lg font-bold text-white mb-2">Zone de danger</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Pour supprimer ton compte et toutes tes données, contacte-nous. La suppression est effective sous 30 jours.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full border border-red-700 px-5 py-2 text-sm text-red-400 hover:bg-red-900/40 transition"
          >
            Demander la suppression du compte
          </Link>
        </div>
      </div>
    </div>
  );
}
