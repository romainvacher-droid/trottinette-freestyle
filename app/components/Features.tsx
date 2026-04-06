const features = [
  {
    title: "Ultra‑light",
    desc: "Cadre carbone 7 kg. Facile à transporter, agile en tricks.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Suspension Pro",
    desc: "Amorti kingpin haute performance. Absorption maximale des chocs urbains.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Autonomie 35 km",
    desc: "Batterie amovible, recharge rapide. Va plus loin, sans compromis.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Certifiée Street",
    desc: "Roues anti‑vibrations, système de pliage renforcé. Prête pour le bitume et les spots.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Connectée",
    desc: "App mobile, verrouillage/déverrouillage à distance, analytics de ride.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  {
    title: "Freestyle Mode",
    desc: "Paramètres souples pour les tricks, freinage progressif, tilt adaptable.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.051M20.418 9c-.84-2.191-2.821-3.755-4.88-4.098M19.95 7.62a9.9 9.9 0 01-2.12 2.12M4.477 4.802a9.9 9.9 0 01-1.68 2.6M3.5 13.5l1.5 1.5M21 21l-1.5-1.5M6.5 21.5l1.5 1.5M18.5 5.5l-1.5-1.5" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-white">
          <span className="text-primary">Features</span> qui font la diff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/70 transition-all duration-300 hover:border-primary/50 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
            >
              <div className="text-primary mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
