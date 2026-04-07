'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomeClient() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-yellow-900/20 to-black">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-400 mb-6">Maîtrise l&apos;art du ride urbain</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">La plateforme des passionnés de trottinette freestyle. Apprends les tricks, partage tes sessions, trouve les meilleurs spots.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="bg-yellow-500 text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-yellow-400 shadow-lg">Rejoindre gratuitement</Link>
            <a href="#fonctionnalites" className="border-2 border-yellow-500 text-yellow-500 px-10 py-4 rounded-full text-lg hover:bg-yellow-500 hover:text-black">Découvrir le contenu</a>
          </div>
        </motion.div>
      </section>

      <section id="fonctionnalites" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center text-yellow-400 mb-12">Ce que tu vas découvrir</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Apprends les tricks', desc: 'Des tutoriels détaillés pour maîtriser les figures de base et avancées.' },
              { title: 'Rejoins la communauté', desc: 'Échange avec d\'autres riders, partage tes vidéos et progresse ensemble.' },
              { title: 'Trouve des spots', desc: 'Une carte collaborative des meilleurs spots de riding près de chez toi.' }
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6 border border-yellow-500/30 hover:border-yellow-500">
                <h3 className="text-2xl font-semibold text-yellow-300 mb-4">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-yellow-400 mb-6">Aperçu du contenu</motion.h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Inscris-toi gratuitement pour débloquer l&apos;accès complet aux tutoriels, fiches tricks et carte des spots.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="card p-4 border border-gray-700 relative overflow-hidden group">
                <div className="blur-sm select-none">
                  <div className="h-32 bg-gray-800 rounded mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <span className="text-yellow-400 font-bold">Débloqué après inscription</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-center text-yellow-400 mb-12">Témoignages</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Julien, Lyon', text: 'En 2 semaines, j\'ai appris mon premier tailwhip grâce aux tutos.' },
              { name: 'Maya, Paris', text: 'La carte des spots est ultra pratique pour trouver des spots propres près de chez moi.' },
              { name: 'Thomas, Bordeaux', text: 'La communauté est super bienveillante, j\'ai fait énormément de progrès.' }
            ].map((t, i) => (
              <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-6 border-l-4 border-yellow-500 bg-gray-800/50">
                <p className="text-gray-300 italic mb-4">« {t.text} »</p>
                <footer className="text-yellow-400 font-semibold">— {t.name}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-yellow-400 mb-6">Rejoins la communauté</motion.h2>
          <p className="text-gray-300 mb-8">Des milliers de riders t&apos;attendent. Inscription gratuite, sans carte bancaire.</p>
          <Link href="/signup" className="bg-yellow-500 text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-yellow-400 shadow-lg">S&apos;inscrire maintenant</Link>
        </div>
      </section>
    </div>
  );
}
