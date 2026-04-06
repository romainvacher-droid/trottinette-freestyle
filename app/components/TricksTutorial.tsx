"use client";

import { useState } from "react";

const tricks = [
  {
    id: "ollie",
    name: "Ollie",
    description: "Le mouvement de base. Décollage, saut et réception en un bloc.",
    styles: `
      @keyframes ollieBody {
        0% { transform: translateY(0) rotate(0deg); }
        20% { transform: translateY(0) rotate(-5deg); } /* prép */
        50% { transform: translateY(-25px) rotate(5deg); } /* haut */
        80% { transform: translateY(-10px) rotate(-2deg); } /* descente */
        100% { transform: translateY(0) rotate(0deg); }
      }
      .trick-ollie-active .scooter-body { animation: ollieBody 1.2s ease-in-out infinite; }
    `,
  },
  {
    id: "kickflip",
    name: "Kickflip",
    description: "Un ollie combiné à une rotation du deck sous le pied.",
    styles: `
      @keyframes kickflipDeck {
        0% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(5px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        75% { transform: translateY(-10px) rotate(360deg); }
        100% { transform: translateY(0) rotate(720deg); }
      }
      .trick-kickflip-active .deck { animation: kickflipDeck 2s ease-in-out infinite; }
    `,
  },
  {
    id: "grind",
    name: "Grind",
    description: "Glisse sur un rail en maintenant l'équilibre.",
    styles: `
      @keyframes grindMove {
        0%, 100% { transform: translateX(0) translateY(0); }
        50% { transform: translateX(15px) translateY(-2px); }
      }
      .trick-grind-active .scooter-group { animation: grindMove 1.5s ease-in-out infinite; }
    `,
  },
  {
    id: "barspin",
    name: "Barspin",
    description: "Rotation rapide du guidon en l'air.",
    styles: `
      @keyframes barspinRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(720deg); }
      }
      .trick-barspin-active .handlebars { transform-origin: 50px 30px; animation: barspinRotate 1.5s linear infinite; }
    `,
  },
];

function TrickSvg({ trick, active }: { trick: typeof tricks[0]; active: boolean }) {
  const { id } = trick;
  return (
    <svg viewBox="0 0 100 100" className="w-40 h-40 mx-auto">
      <style>{trick.styles}</style>
      {/* Ground line (or rail) */}
      {id === "grind" ? (
        <g className="scooter-group">
          {/* Rail */}
          <line x1="20" y1="75" x2="80" y2="75" stroke="#a3a3a3" strokeWidth="3" />
          <line x1="20" y1="80" x2="80" y2="80" stroke="#a3a3a3" strokeWidth="2" />
          {/* Scooter */}
          <g className={`scooter-body ${active ? `trick-${id}-active` : ""}`}>
            {/* Deck */}
            <rect x="25" y="55" width="50" height="4" fill="#f97316" rx="1" />
            {/* Wheels */}
            <circle cx="30" cy="59" r="3" fill="#1d4ed8" />
            <circle cx="70" cy="59" r="3" fill="#1d4ed8" />
            {/* Fork */}
            <line x1="50" y1="59" x2="50" y2="52" stroke="#6b7280" strokeWidth="2" />
            {/* Handlebars */}
            <line x1="45" y1="52" x2="55" y2="52" stroke="#f97316" strokeWidth="2" />
            {/* Rider feet */}
            <circle cx="35" cy="50" r="2" fill="#e5e5e5" />
            <circle cx="65" cy="50" r="2" fill="#e5e5e5" />
          </g>
        </g>
      ) : (
        <g>
          <line x1="5" y1="90" x2="95" y2="90" stroke="#84cc16" strokeWidth="2" />
          <g className={`scooter-body ${active ? `trick-${id}-active` : ""}`}>
            {/* Deck */}
            <rect x="20" y="70" width="60" height="4" fill="#f97316" rx="1" />
            {/* Wheels */}
            <circle cx="30" cy="74" r="3" fill="#1d4ed8" />
            <circle cx="70" cy="74" r="3" fill="#06b6d4" />
            {/* Fork */}
            <line x1="50" y1="74" x2="50" y2="60" stroke="#6b7280" strokeWidth="2" />
            {/* For kickflip, deck rotates separately */}
            {id === "kickflip" && <g className="deck"><rect x="20" y="60" width="60" height="4" fill="#f97316" rx="1" /></g>}
            {/* Handlebars with rotation for barspin */}
            <g className={id === "barspin" ? "handlebars" : ""}>
              <line x1="45" y1="60" x2="55" y2="60" stroke="#f97316" strokeWidth="2" />
            </g>
            {/* Rider feet */}
            <circle cx="35" cy="58" r="2" fill="#e5e5e5" />
            <circle cx="65" cy="58" r="2" fill="#e5e5e5" />
            {/* Rider body (simple) */}
            <line x1="50" y1="50" x2="50" y2="58" stroke="#e5e5e5" strokeWidth="2" />
          </g>
        </g>
      )}
    </svg>
  );
}

export default function TricksTutorial() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="tricks" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-white">
          <span className="text-secondary">Tutoriel</span> Freestyle
        </h2>
        <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
          Découvre les mouvements de base. Clique sur une carte pour lancer l’animation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tricks.map((trick) => (
            <div
              key={trick.id}
              className={`p-6 rounded-2xl border ${active === trick.id ? "border-primary bg-primary/10" : "border-zinc-800 bg-zinc-900/60"} transition-all cursor-pointer`}
              onClick={() => setActive(active === trick.id ? null : trick.id)}
            >
              <TrickSvg trick={trick} active={active === trick.id} />
              <h3 className="text-xl font-bold text-white mt-4 mb-2">{trick.name}</h3>
              <p className="text-zinc-300 text-sm">{trick.description}</p>
              <p className="mt-2 text-xs text-tertiary">
                {active === trick.id ? "▶ Animation en cours" : "• Clique pour animer"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
