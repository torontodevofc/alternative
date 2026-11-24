import React from 'react';
import { 
  Sun, 
  Smile, 
  Skull, 
  Ghost, 
  Laugh, 
  PartyPopper, 
  Eye, 
  Moon, 
  Flame, 
  Sword,
  CheckCircle2
} from 'lucide-react';
import { ATMOSPHERES } from '../data/presets';
import { motion } from 'framer-motion';

export default function AtmosphereSelector({ selectedId, onSelect }) {
  const getAtmosphereIcons = (id) => {
    switch (id) {
      case 'happy':
        return { Primary: Sun, Secondary: Smile, color: 'text-amber-400' };
      case 'horror':
        return { Primary: Skull, Secondary: Ghost, color: 'text-rose-500' };
      case 'comedy':
        return { Primary: Laugh, Secondary: PartyPopper, color: 'text-cyan-400' };
      case 'plottwist':
        return { Primary: Eye, Secondary: Moon, color: 'text-purple-400' };
      case 'epic':
      default:
        return { Primary: Flame, Secondary: Sword, color: 'text-indigo-400' };
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>Escolha a Atmosfera / Estilo do Final</span>
          <span className="text-xs font-normal text-slate-400">(Como a história deve soar?)</span>
        </label>
        <span className="text-xs text-slate-400">5 Tons Disponíveis</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {ATMOSPHERES.map((atm) => {
          const isSelected = selectedId === atm.id;
          const { Primary, Secondary, color } = getAtmosphereIcons(atm.id);

          return (
            <motion.button
              key={atm.id}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(atm.id)}
              className={`relative text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full group ${
                isSelected
                  ? atm.selectedRing + ' bg-slate-900/90'
                  : 'border-slate-800 bg-[#0e0f19]/70 hover:bg-[#131422] ' + atm.borderColor
              }`}
            >
              {/* Active selection badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5">
                  <CheckCircle2 className={`w-4 h-4 ${color}`} />
                </div>
              )}

              {/* Icons header */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className={`p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 transition-transform group-hover:scale-110 ${color}`}>
                    <Primary className="w-5 h-5" />
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-900/40 text-slate-400 group-hover:text-slate-200 transition-colors">
                    <Secondary className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Name */}
                <h4 className={`font-bold text-sm leading-tight transition-colors ${
                  isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                }`}>
                  {atm.name}
                </h4>

                {/* Description */}
                <p className="mt-1.5 text-xs text-slate-400 leading-snug line-clamp-3">
                  {atm.desc}
                </p>
              </div>

              {/* Bottom indicator strip */}
              <div className={`mt-3 h-1 w-full rounded-full transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-r ${atm.accentColor} opacity-100` 
                  : 'bg-slate-800 group-hover:bg-slate-700 opacity-60'
              }`} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
