const testimonials = [
  {
    quote: "Légère, solide, elle encaisse les tricks sans fléchir. Ma nouvelle arme secrète.",
    author: "— Alex, rider à Lyon",
    handle: "@alex.rider",
  },
  {
    quote: "L’autonomie tient ses promesses. Je fais 30 km par jour sans stress.",
    author: "— Sofiane, Paris",
    handle: "@so.rides",
  },
  {
    quote: "Le mode freestyle est génial. La suspension absorbe tout, même les pavés.",
    author: "— Julie, Bordeaux",
    handle: "@julie.b",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-white">
          Ce qu’en disent les <span className="text-secondary">riders</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60"
            >
              <p className="text-lg text-zinc-200 mb-4">“{t.quote}”</p>
              <footer className="text-sm text-zinc-400">
                {t.author}
                <br />
                <span className="text-secondary">{t.handle}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
