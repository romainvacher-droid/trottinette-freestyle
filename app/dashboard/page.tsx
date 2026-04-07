import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard – Trottinette Freestyle',
  description: 'Votre tableau de bord personnel.',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  // Auth is enforced by middleware; getServerSession is used only to access user data
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card p-6 border border-yellow-500/30">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Profil</h2>
          <p className="text-gray-400"><strong>Email :</strong> {session?.user?.email}</p>
          <p className="text-gray-400"><strong>Nom :</strong> {session?.user?.name ?? 'Non défini'}</p>
          <Link href="/profile" className="text-yellow-400 hover:underline mt-4 inline-block">Éditer le profil</Link>
        </div>
        <div className="card p-6 border border-yellow-500/30">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Activité</h2>
          <p className="text-gray-400">Vos derniers événements, tricks et spots apparaîtront ici.</p>
        </div>
        <div className="card p-6 border border-yellow-500/30">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Statistiques</h2>
          <p className="text-gray-400">Statistiques personnelles à venir.</p>
        </div>
      </div>
    </div>
  );
}
