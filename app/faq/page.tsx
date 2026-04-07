'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'Est-ce que la plateforme est gratuite ?',
    answer: 'Oui, l\'inscription et l\'accès à la plateforme sont entièrement gratuits. Crée ton compte en quelques secondes et accède à tous les contenus.',
  },
  {
    question: 'Comment créer un compte ?',
    answer: 'Clique sur "Commencer" en haut de la page ou rends-toi sur /signup. Renseigne ton email et un mot de passe (8 caractères minimum, 1 majuscule, 1 chiffre) puis valide. C\'est tout.',
  },
  {
    question: 'J\'ai oublié mon mot de passe. Comment le réinitialiser ?',
    answer: 'Sur la page de connexion, clique sur "Mot de passe oublié ?". Entre ton email et tu recevras un lien de réinitialisation valable 1 heure.',
  },
  {
    question: 'Quels tricks puis-je apprendre sur la plateforme ?',
    answer: 'La plateforme couvre les figures de base (Ollie, Barspin, Grind) jusqu\'aux tricks avancés (Kickflip, Tailwhip, No-Footer). Chaque trick dispose d\'une explication détaillée et d\'une animation interactive.',
  },
  {
    question: 'Comment fonctionne la carte des spots ?',
    answer: 'La carte collaborative recense les meilleurs spots de ride près de chez toi. Une fois connecté, tu peux consulter les spots existants et en proposer de nouveaux.',
  },
  {
    question: 'Puis-je utiliser la plateforme sur mobile ?',
    answer: 'Oui, le site est entièrement responsive et optimisé pour mobile. Tu peux le consulter directement depuis ton navigateur sur smartphone ou tablette.',
  },
  {
    question: 'Comment supprimer mon compte ?',
    answer: 'Tu peux nous contacter via la page Contact en demandant la suppression de ton compte. Nous supprimerons toutes tes données dans un délai de 30 jours, conformément au RGPD.',
  },
  {
    question: 'Comment contacter le support ?',
    answer: 'Utilise le formulaire de contact sur la page /contact. Nous répondons généralement sous 24-48h.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-semibold hover:bg-zinc-800/50 transition"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className={`text-primary text-xl transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Questions <span className="text-primary">fréquentes</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Tu ne trouves pas ta réponse ?{' '}
            <Link href="/contact" className="text-primary hover:underline">Contacte-nous</Link>.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <h2 className="text-xl font-bold text-white mb-2">Tu as une autre question ?</h2>
          <p className="text-zinc-400 mb-4">Notre équipe répond sous 24h.</p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-primary px-8 py-3 font-bold text-black hover:opacity-90 transition"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
