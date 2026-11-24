import React from 'react';
import { Sparkles, ArrowUp, Film, Heart, Terminal } from 'lucide-react';

export default function Footer({ onBackToTop }) {
  const scrollToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#06060c] text-slate-400 py-12 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-rose-600/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start text-xl font-black tracking-tight mb-1">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              Alter
            </span>
            <span className="font-cinzel text-red-500 text-[1.2rem]">
              native
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Gerador de Finais Alternativos alimentado pelo modelo Llama 3.3 70B da Groq.
          </p>
        </div>

        {/* Center info */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span>Multiverso Criativo</span>
          <span>•</span>
          <span>5 Atmosferas Cinematográficas</span>
          <span>•</span>
          <span>Dualidade "Alter" vs "native"</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all shadow-md group"
          title="Voltar ao Topo"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
        </button>

      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-600">
        Alternative © 2026 — Reimagine qualquer final. A linha do tempo está em suas mãos.
      </div>
    </footer>
  );
}
