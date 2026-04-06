export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-black to-black"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-tertiary/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto text-center animate-fade-in-up">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
            Trottinette Freestyle
          </span>
          <br />
          <span className="text-white">L’art du ride urbain</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 mb-10">
          Conçue pour les riders qui repoussent les limites. Ultra‑légère, robuste et connectée.
          <br className="hidden sm:block" />
          Domine la ville, les asphaltes et les parks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/login"
            className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:shadow-[0_0_30px_rgba(249,115,22,0.9)] transition transform hover:-translate-y-1"
          >
            Réserver un test
          </a>
          <a
            href="#features"
            className="rounded-full border border-zinc-600 px-8 py-4 text-lg font-medium text-white hover:border-tertiary hover:text-tertiary transition"
          >
            Découvrir
          </a>
        </div>
      </div>
    </section>
  );
}
