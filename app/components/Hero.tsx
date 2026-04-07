import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1605665064888-405c45c7b094?q=80&w=2000&auto=format&fit=crop"
          alt="Freestyle scooter"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Trottinette Freestyle
          </span>
          <br />
          <span className="text-white">L'art du ride urbain</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-300 mb-10">
          La plateforme des riders qui repoussent les limites. Apprends les tricks,
          trouve les meilleurs spots, connecte-toi à la communauté.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-black shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:shadow-[0_0_30px_rgba(250,204,21,0.8)] transition transform hover:-translate-y-1"
          >
            Rejoindre gratuitement
          </Link>
          <a
            href="#tricks"
            className="rounded-full border border-zinc-600 px-8 py-4 text-lg font-medium text-white hover:border-primary hover:text-primary transition"
          >
            Voir les tricks
          </a>
        </div>
      </div>
    </section>
  );
}
