import { Metadata } from 'next';

export const metadata = {
  title: 'Politique de confidentialité – Trottinette Freestyle',
  description: 'Politique de confidentialité du site Trottinette Freestyle.',
  robots: { index: true, follow: true }
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Politique de confidentialité</h1>
      <div className="prose prose-invert max-w-none text-gray-300">
        <p>Cette politique décrit comment Trottinette Freestyle collecte, utilise et protège vos données personnelles.</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Collecte des données</h2>
        <p>Nous collectons les données que vous nous fournissez lors de la création de compte : adresse email, nom (optionnel) et mot de passe (haché).</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Utilisation</h2>
        <p>Les données sont utilisées pour :</p>
        <ul className="list-disc pl-6">
          <li>Permettre l’authentification et l’accès aux fonctionnalités</li>
          <li>Personnaliser l’affichage du nom</li>
          <li>Vous contacter concernant le service</li>
        </ul>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Cookies</h2>
        <p>Nous utilisons des cookies essentiels (session, CSRF) et aucun cookie de suivi non essentiel. Aucun cookie n’est déposé sans votre consentement explicite.</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Partage</h2>
        <p>Nous ne partageons pas vos données avec des tiers, sauf obligation légale.</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Sécurité</h2>
        <p>Les mots de passe sont hachés avec bcrypt. Les communications sont protégées par HTTPS. Nous mettons en œuvre des mesures de sécurité standards.</p>

        <h2 className="text-2xl font-bold text-yellow-300 mt-8 mb-4">Vos droits</h2>
        <p>Vous pouvez accéder, modifier, supprimer vos données en nous contactant à contact@trottinette-freestyle.vercel.app.</p>
      </div>
    </div>
  );
}
