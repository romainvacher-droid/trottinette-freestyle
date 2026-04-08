import Link from 'next/link';
import Image from 'next/image';

const tricks = [
  {
    id: 'ollie',
    name: 'Ollie',
    level: 'Débutant',
    levelColor: 'text-green-400 bg-green-400/10 border-green-400/30',
    description: 'La base de tout. Le trick fondamental qui ouvre la porte à tous les autres. Maîtrise-le avant de passer à la suite.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80',
    steps: [
      'Positionne tes pieds : pied avant sur le guidon, pied arrière sur la pédale arrière.',
      'Accélère légèrement pour avoir de l\'élan.',
      'Appuie fort sur la roue arrière pour comprimer la trottinette.',
      'Saute en tirant le guidon vers le haut en même temps.',
      'Lève les genoux pour monter la planche avec toi.',
      'Absorbe la réception en pliant les genoux.',
    ],
    tips: 'Commence par sauter sur place sans vitesse. La régularité prime sur la hauteur.',
  },
  {
    id: 'barspin',
    name: 'Barspin',
    level: 'Intermédiaire',
    levelColor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    description: 'La rotation du guidon à 360° pendant que tu es en l\'air. Impressionnant et accessible une fois l\'Ollie maîtrisé.',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
    steps: [
      'Commence par maîtriser l\'Ollie haut et stable.',
      'Au sommet du saut, lâche le guidon avec ta main directrice.',
      'Lance le guidon dans le sens des aiguilles d\'une montre (ou inverse selon ta prise).',
      'Rattrape le guidon après une rotation complète.',
      'Garde les bras proches du corps pour contrôler la rotation.',
      'Réceptionne avec les deux mains sur le guidon.',
    ],
    tips: 'Entraîne-toi d\'abord à lancer le guidon debout au sol, sans sauter.',
  },
  {
    id: 'tailwhip',
    name: 'Tailwhip',
    level: 'Intermédiaire',
    levelColor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    description: 'La plateforme fait un tour complet autour du guidon pendant le saut. L\'un des tricks les plus spectaculaires à apprendre.',
    image: 'https://images.unsplash.com/photo-1590912585927-23beac756b75?w=600&q=80',
    steps: [
      'Ollie ferme avec de la hauteur — c\'est essentiel.',
      'Au décollage, lance la plateforme avec ton pied arrière vers l\'extérieur.',
      'Garde les mains sur le guidon fixe pendant toute la rotation.',
      'Surveille la plateforme du coin de l\'œil pour anticiper le retour.',
      'Pose ton pied avant sur la plateforme qui revient.',
      'Pose le pied arrière et absorbe la réception.',
    ],
    tips: 'Commence sur herbe ou surface souple. Le timing du lancer est tout.',
  },
  {
    id: 'grind',
    name: 'Grind (50-50)',
    level: 'Intermédiaire',
    levelColor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    description: 'Glisser sur une barre ou un rebord avec les deux roues. La porte d\'entrée vers le street et les spots urbains.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    steps: [
      'Repère une barre basse et stable pour commencer.',
      'Approche perpendiculairement ou légèrement en angle.',
      'Ollie au-dessus de la barre et vise les deux roues dessus.',
      'Garde le poids centré entre les deux roues.',
      'Laisse glisser et regarde la sortie.',
      'Saute légèrement avant la fin pour sortir proprement.',
    ],
    tips: 'Du wax sur la barre au début. Commence sur des barres très basses.',
  },
  {
    id: 'kickflip',
    name: 'Kickflip',
    level: 'Avancé',
    levelColor: 'text-red-400 bg-red-400/10 border-red-400/30',
    description: 'La plateforme fait une rotation axiale pendant que tu es en l\'air. Technique, précis, satisfaisant.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
    steps: [
      'Maîtrise l\'Ollie à la perfection avant de tenter.',
      'Pied avant légèrement vers l\'intérieur de la plateforme.',
      'Au décollage, donne un coup de pied vers le bas et l\'extérieur.',
      'Lève les pieds haut pour laisser la plateforme tourner.',
      'Regarde la plateforme effectuer sa rotation.',
      'Pose les deux pieds quand elle est à plat, puis absorbe.',
    ],
    tips: 'Le flip vient du coup de pied, pas du saut. Entraîne-toi à plat d\'abord.',
  },
  {
    id: 'nofooter',
    name: 'No Footer',
    level: 'Avancé',
    levelColor: 'text-red-400 bg-red-400/10 border-red-400/30',
    description: 'Lâcher les deux pieds de la plateforme pendant le saut et les reposer avant la réception. Spectaculaire et technique.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
    steps: [
      'Besoin d\'un Ollie très haut et stable.',
      'Au point le plus haut, lâche les deux pieds de la plateforme.',
      'Garde les mains serrées sur le guidon.',
      'Garde les jambes en extension ou légèrement écartées.',
      'Ramène rapidement les pieds sur la plateforme.',
      'Absorbe la réception avec les genoux fléchis.',
    ],
    tips: 'Commence sur un tremplin ou une rampe pour avoir plus de hauteur.',
  },
  {
    id: '360',
    name: '360° (Treyflip)',
    level: 'Avancé',
    levelColor: 'text-red-400 bg-red-400/10 border-red-400/30',
    description: 'Rotation complète du corps et de la trottinette à 360° dans les airs. Le trick de progression par excellence.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    steps: [
      'Maîtrise le 180° dans les deux sens en premier.',
      'Approche avec de la vitesse pour faciliter la rotation.',
      'Lance la rotation avec les épaules avant de sauter.',
      'Plie les genoux pour accélérer la rotation.',
      'Repère ton atterrissage dès que tu passes les 180°.',
      'Ouvre les bras pour stabiliser à la réception.',
    ],
    tips: 'Commence sur de l\'herbe ou une surface qui pardonne. La rotation vient des épaules.',
  },
];

const levelOrder: Record<string, number> = { 'Débutant': 0, 'Intermédiaire': 1, 'Avancé': 2 };

export default function TricksPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Tricks & Tutoriels
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Apprends les <span className="text-primary">meilleurs tricks</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Du débutant à l&apos;expert, des guides étape par étape pour progresser à ton rythme.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Débutant
            </span>
            <span className="flex items-center gap-2 text-sm text-yellow-400">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Intermédiaire
            </span>
            <span className="flex items-center gap-2 text-sm text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Avancé
            </span>
          </div>
        </div>
      </section>

      {/* Tricks Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid gap-8">
          {tricks.map((trick, i) => (
            <div
              key={trick.id}
              className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-primary/40 transition-all"
            >
              <div className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                {/* Image */}
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                  <Image
                    src={trick.image}
                    alt={trick.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${trick.levelColor}`}>
                      {trick.level}
                    </span>
                    <span className="text-zinc-600 text-xs">#{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white mb-2">{trick.name}</h2>
                  <p className="text-zinc-400 mb-5">{trick.description}</p>

                  <div className="space-y-2 mb-5">
                    {trick.steps.map((step, si) => (
                      <div key={si} className="flex gap-3 text-sm">
                        <span className="text-primary font-bold shrink-0 w-5">{si + 1}.</span>
                        <span className="text-zinc-300">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-zinc-300">
                    <span className="text-primary font-semibold">Conseil : </span>{trick.tips}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900/40 border-t border-zinc-800 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Partage tes sessions</h2>
          <p className="text-zinc-400 mb-6">
            Rejoins la communauté, partage tes vidéos et progresse avec d&apos;autres riders.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/communaute"
              className="rounded-full bg-primary px-7 py-3 font-bold text-black hover:opacity-90 transition"
            >
              Voir la communauté
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-zinc-700 px-7 py-3 font-bold text-white hover:border-primary transition"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
