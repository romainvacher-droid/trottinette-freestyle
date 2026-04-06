export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            TROTTINETTE<span className="text-primary">.</span>
          </span>
          <p className="text-zinc-500 mt-2 text-sm">
            © 2026 Trottinette Freestyle. Tous droits réservés.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-zinc-400 hover:text-white transition">Mentions légales</a>
          <a href="#" className="text-zinc-400 hover:text-white transition">Confidentialité</a>
          <a href="#" className="text-zinc-400 hover:text-white transition">Contact</a>
          <a href="#" className="text-zinc-400 hover:text-white transition">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
