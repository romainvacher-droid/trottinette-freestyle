"use client";

import { useState } from "react";

const tricks = [
  {
    id: "ollie",
    name: "Ollie",
    description: "Le base du freestyle. Saute en gardant les pieds sur le deck.",
    svg: (
      <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
        {/* Ground */}
        <line x1="10" y1="90" x2="90" y2="90" stroke="#84cc16" strokeWidth="2" />
        {/* Scooter deck */}
        <rect x="20" y="70" width="60" height="4" fill="#f97316" rx="1" />
        {/* Wheels */}
        <circle cx="30" cy="74" r="3" fill="#1d4ed8" />
        <circle cx="70" cy="74" r="3" fill="#1d4ed8" />
        {/* Rider feet (simplified) */}
        <circle cx="35" cy="60" r="3" fill="#e5e5e5" />
        <circle cx="65" cy="60" r="3" fill="#e5e5e5" />
        {/* Animation: up/down */}
      </svg>
    ),
    animation: (
      <style>{`
        @keyframes ollie {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .trick-${"ollie"} svg { animation: ollie 1.5s ease-in-out infinite; }
      `}</style>
    ),
  },
  {
    id: "kickflip",
    name: "Kickflip",
    description: "Un ollie avec un rotation du deck sous le pied.",
    svg: (
      <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
        <line x1="10" y1="90" x2="90" y2="90" stroke="#84cc16" strokeWidth="2" />
        <rect x="20" y="70" width="60" height="4" fill="#f97316" rx="1" />
        <circle cx="30" cy="74" r="3" fill="#06b6d4" />
        <circle cx="70" cy="74" r="3" fill="#06b6d4" />
        <circle cx="35" cy="60" r="3" fill="#e5e5e5" />
        <circle cx="65" cy="60" r="3" fill="#e5e5e5" />
      </svg>
    ),
    animation: (
      <style>{`
        @keyframes kickflip {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        .trick-${"kickflip"} svg { animation: kickflip 2s ease-in-out infinite; }
      `}</style>
    ),
  },
  {
    id: "grind",
    name: "Grind",
    description: "Glisse sur un rail ou un curb en équilibre.",
    svg: (
      <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
        <line x1="10" y1="90" x2="90" y2="90" stroke="#84cc16" strokeWidth="2" />
        {/* Rail */}
        <line x1="20" y1="80" x2="80" y2="80" stroke="#a3a3a3" strokeWidth="4" />
        <rect x="20" y="85" width="60" height="2" fill="#a3a3a3" />
        {/* Scooter deck */}
        <rect x="25" y="70" width="50" height="4" fill="#f97316" rx="1" />
        {/* Wheels */}
        <circle cx="30" cy="74" r="3" fill="#1d4ed8" />
        <circle cx="70" cy="74" r="3" fill="#1d4ed8" />
        {/* Rider feet */}
        <circle cx="35" cy="60" r="3" fill="#e5e5e5" />
        <circle cx="65" cy="60" r="3" fill="#e5e5e5" />
      </svg>
    ),
    animation: (
      <style>{`
        @keyframes grind {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .trick-${"grind"} svg { animation: grind 1.5s ease-in-out infinite; }
      `}</style>
    ),
  },
  {
    id: "barspin",
    name: "Barspin",
    description: "Rotation complète du guidon en l'air.",
    svg: (
      <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
        <line x1="10" y1="90" x2="90" y2="90" stroke="#84cc16" strokeWidth="2" />
        {/* Fork and wheels */}
        <line x1="50" y1="80" x2="50" y2="94" stroke="#6b7280" strokeWidth="3" />
        <circle cx="50" cy="74" r="3" fill="#1d4ed8" />
        <circle cx="50" cy="96" r="3" fill="#1d4ed8" />
        {/* Handlebars */}
        <line x1="45" y1="70" x2="55" y2="70" stroke="#f97316" strokeWidth="3" />
        {/* Rider hands */}
        <circle cx="45" cy="70" r="2" fill="#e5e5e5" />
        <circle cx="55" cy="70" r="2" fill="#e5e5e5" />
      </svg>
    ),
    animation: (
      <style>{`
        @keyframes barspin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .trick-${"barspin"} svg { transform-origin: 50px 70px; animation: barspin 1.5s linear infinite; }
      `}</style>
    ),
  },
];

export default function TricksTutorial() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-white">
          <span className="text-secondary">Tutoriel</span> Freestyle
        </h2>
        <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
          Découvre les mouvements de base pour débuter en trottinette freestyle.
          Clique sur un trick pour voir l’animation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tricks.map((trick) => (
            <div
              key={trick.id}
              className={`p-6 rounded-2xl border ${active === trick.id ? "border-primary bg-primary/10" : "border-zinc-800 bg-zinc-900/60"} transition-all cursor-pointer`}
              onClick={() => setActive(active === trick.id ? null : trick.id)}
            >
              <div className={`trick-${trick.id} ${active === trick.id ? "" : "opacity-50"}`}>
                {trick.animation}
              </div>
              <h3 className="text-xl font-bold text-white mt-4 mb-2">{trick.name}</h3>
              <p className="text-zinc-300 text-sm">{trick.description}</p>
              <p className="mt-2 text-xs text-tertiary">
                {active === trick.id ? "Animation en cours" : "Clique pour animer"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
