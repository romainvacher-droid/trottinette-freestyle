export default function VideoShowcase() {
  return (
    <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-white">
          <span className="text-secondary">Vidéo</span> Freestyle
        </h2>
        <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden border border-zinc-800">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/2Xt4K9cLf4Q"
            title="Scooter Freestyle Compilation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="mt-4 text-center text-zinc-400 text-sm">
          Compilation de tricks freestyle — © YouTube
        </p>
      </div>
    </section>
  );
}
