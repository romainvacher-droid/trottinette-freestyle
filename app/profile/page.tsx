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
  // Auth is enforced by middleware; getServerSession is used only to access user data
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Mon profil</h1>
      <div className="card p-6 border border-yellow-500/30">
        <p className="text-gray-400 mb-2"><strong>Email :</strong> {session?.user?.email}</p>
        <p className="text-gray-400 mb-4"><strong>Nom :</strong> {session?.user?.name ?? 'Non défini'}</p>
        <div className="flex gap-4">
          <LogoutButton />
          <Link href="/dashboard" className="text-yellow-400 hover:underline">Retour au dashboard</Link>
        </div>
      </div>
    </div>
  );
}
