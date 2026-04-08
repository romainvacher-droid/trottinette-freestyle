import Link from 'next/link';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Lucas M.',
    city: 'Lyon',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80',
    text: 'Grâce aux tutos, j\'ai appris le barspin en deux semaines. La progression structurée fait vraiment la différence.',
    trick: 'Barspin',
  },
  {
    name: 'Emma R.',
    city: 'Paris',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e2?w=80&q=80',
    text: 'Super communauté, tout le monde est bienveillant. J\'ai trouvé des riders près de chez moi grâce au site.',
    trick: 'Tailwhip',
  },
  {
    name: 'Tom B.',
    city: 'Marseille',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80',
    text: 'Les conseils de la section tricks m\'ont aidé à corriger ma technique. Mon 360° est enfin propre !',
    trick: '360°',
  },
  {
    name: 'Jade K.',
    city: 'Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    text: 'Enfin une plateforme sérieuse pour le freestyle trottinette en France. J\'attendais ça depuis longtemps.',
    trick: 'Grind',
  },
  {
    name: 'Nathan D.',
    city: 'Nantes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    text: 'Les sessions de groupe organisées via le site sont incroyables. On progresse tellement plus vite ensemble.',
    trick: 'No Footer',
  },
  {
    name: 'Camille F.',
    city: 'Strasbourg',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80',
    text: 'Je débutais il y a 3 mois. Maintenant je roule avec un groupe cool chaque week-end. Merci la communauté !',
    trick: 'Ollie',
  },
];

const values = [
  {
    icon: '🤝',
    title: 'Bienveillance',
    text: 'Ici, peu importe ton niveau. Débutant ou pro, tout le monde est le bienvenu et respecté.',
  },
  {
    icon: '📈',
    title: 'Progression',
    text: 'On s\'encourage mutuellement. Les retours constructifs font avancer tout le monde.',
  },
  {
    icon: '🎥',
    title: 'Partage',
    text: 'Partage tes sessions, tes tips, tes spots. Plus on partage, plus on grandit.',
  },
  {
    icon: '🏙️',
    title: 'Spots urbains',
    text: 'Une carte collaborative des meilleurs spots en France arrive bientôt.',
  },
];

const gallery = [
  { src: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80', alt: 'Rider en action' },
  { src: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80', alt: 'Session skatepark' },
  { src: 'https://images.unsplash.com/photo-1590912585927-23beac756b75?w=400&q=80', alt: 'Trick urbain' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80', alt: 'Grind sur rails' },
  { src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80', alt: 'Jump freestyle' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', alt: 'Session groupe' },
];

export default function CommunautePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-zinc-900/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Communauté
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Des milliers de riders,<br />
            <span className="text-primary">une seule passion</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Rejoins la plus grande communauté de trottinette freestyle francophone. Progresse, partage, rencontre.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="rounded-full bg-primary px-7 py-3 font-bold text-black hover:opacity-90 transition"
            >
              Rejoindre gratuitement
            </Link>
            <Link
              href="/tricks"
              className="rounded-full border border-zinc-700 px-7 py-3 font-bold text-white hover:border-primary transition"
            >
              Voir les tricks
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            <div>
              <p className="text-3xl font-extrabold text-primary">3 400+</p>
              <p className="text-zinc-500 text-sm mt-1">Membres</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary">7</p>
              <p className="text-zinc-500 text-sm mt-1">Tricks guidés</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary">12</p>
              <p className="text-zinc-500 text-sm mt-1">Villes actives</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gallery.map((img, i) => (
            <div key={i} className="relative h-48 md:h-64 rounded-xl overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 px-4 bg-zinc-900/30 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">Ce qu&apos;on partage</h2>
            <p className="text-zinc-400 mt-2">Les valeurs qui font la force de notre communauté.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-primary/40 transition">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-zinc-400 text-sm">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">Ce qu&apos;ils en disent</h2>
            <p className="text-zinc-400 mt-2">Des riders qui ont rejoint la communauté et progressé.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-primary/30 transition flex flex-col gap-4">
                <p className="text-zinc-300 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-800">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.city} · Trick préféré : <span className="text-primary">{t.trick}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spots coming soon */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Bientôt disponible</span>
            <h2 className="text-3xl font-extrabold text-white mt-2 mb-3">Carte des spots</h2>
            <p className="text-zinc-400 max-w-md">
              Une carte collaborative des meilleurs spots de trottinette freestyle en France.
              Parcs, rampes, spots urbains — trouvés et validés par la communauté.
            </p>
          </div>
          <div className="shrink-0">
            <div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center bg-primary/5">
              <span className="text-5xl">🗺️</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-black mb-3">Prêt à rejoindre l&apos;aventure ?</h2>
          <p className="text-black/70 mb-6">
            Inscription gratuite, sans carte bancaire. Des milliers de riders t&apos;attendent.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-full bg-black px-8 py-3 font-bold text-primary hover:opacity-90 transition"
          >
            Rejoindre la communauté
          </Link>
        </div>
      </section>
    </main>
  );
}
