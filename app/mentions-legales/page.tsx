import { Metadata } from 'next';
import Link from 'next/link';

export const metadata = {
  title: 'Mentions légales – Trottinette Freestyle',
  description: 'Mentions légales du site Trottinette Freestyle.',
  robots: { index: true, follow: true }
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Mentions légales</h1>
      <div className="prose prose-invert max-w-none text-gray-300">
        <p><strong>Éditeur :</strong> Trottinette Freestyle, 123 Rue du Freestyle, 69000 Lyon, France.</p>
        <p><strong>Hébergeur :</strong> Vercel Inc., 440 N Barranca Avenue #4137, Covina, CA 91723, USA.</p>
        <p><strong>Contact :</strong> contact@trottinette-freestyle.vercel.app</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Données collectées</h2>
        <p>Les données collectées sont : email, nom (optionnel), mot de passe (haché). Ces données sont nécessaires à la création d’un compte et à l’authentification.</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Finalité</h2>
        <p>Les données sont utilisées pour permettre l’accès à la plateforme, personnaliser l’expérience et communiquer des informations relatives au service.</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Durée de conservation</h2>
        <p>Les données sont conservées tant que le compte est actif. L’utilisateur peut supprimer son compte à tout moment. Les données sont supprimées dans les 30 jours suivant la demande.</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Droits RGPD</h2>
        <p>Conformément au RGPD, vous disposez des droits d’accès, de rectification, de suppression et d’opposition. Pour les exercer, contactez-nous à l’adresse ci-dessus.</p>
      </div>
    </div>
  );
}
