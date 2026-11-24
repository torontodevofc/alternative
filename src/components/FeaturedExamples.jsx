import React from 'react';
import { Sparkles, ArrowRight, Film, Compass, Flame, Skull, Laugh, Eye, Sun } from 'lucide-react';
import { FEATURED_EXAMPLES } from '../data/presets';
import { motion } from 'framer-motion';

export default function FeaturedExamples({ onSelectExample }) {
  const getAtmosphereIcon = (id) => {
    switch (id) {
      case 'happy': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'horror': return <Skull className="w-4 h-4 text-rose-500" />;
      case 'comedy': return <Laugh className="w-4 h-4 text-cyan-400" />;
      case 'plottwist': return <Eye className="w-4 h-4 text-purple-400" />;
      case 'epic':
      default: return <Flame className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section id="destaques" className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inspirações Prontas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Finais em Destaque
            </h2>
            <p className="mt-1 text-slate-400 text-sm">
              Clique em qualquer exemplo para carregar no gerador e assistir à magia acontecer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED_EXAMPLES.map((item, index) => (
            <motion.div
              key={item.work}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-6 bg-[#0e0f1d] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    {item.work}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    {getAtmosphereIcon(item.atmosphereId)}
                    <span className="font-medium">{item.atmosphereName}</span>
                  </div>
                </div>

                {/* Subtitle / premise */}
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {item.badge}
                </h3>
                <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                  "{item.whatIf}"
                </p>

                {/* Sneak peek */}
                <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                  {item.preview}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectExample(item)}
                className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-rose-600 text-slate-300 group-hover:text-white border border-slate-700 group-hover:border-transparent transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Testar este Final</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
