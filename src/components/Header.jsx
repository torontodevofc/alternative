import React from 'react';
import { History, Sparkles, Film } from 'lucide-react';

export default function Header({ onOpenHistory, historyCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#090913]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Dual Brand Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="Alternative Home"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-[1px] bg-gradient-to-br from-amber-400 via-purple-600 to-rose-600 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <div className="w-full h-full bg-[#0b0b14] rounded-[11px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-amber-500/20" />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-rose-600/20" />
              <Sparkles className="w-5 h-5 text-amber-300 relative z-10 transition-transform group-hover:rotate-12" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center text-2xl font-black tracking-tight leading-none">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                Alter
              </span>
              <span className="bg-gradient-to-r from-red-500 via-rose-700 to-purple-500 bg-clip-text text-transparent font-cinzel text-[1.4rem] tracking-wider transition-all duration-300 group-hover:text-red-400">
                native
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
              Multiverse Story Engine
            </span>
          </div>
        </a>

        {/* Center navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
          <a href="#generator" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
            <Film className="w-4 h-4 text-amber-400" />
            Gerador
          </a>
          <a href="#destaques" className="hover:text-rose-400 transition-colors">
            Finais em Destaque
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative px-4 py-2 rounded-xl text-slate-300 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/70 hover:border-slate-600 transition-all flex items-center gap-2 text-sm shadow-sm hover:shadow"
            title="Ver histórico de histórias geradas"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span className="font-medium">Histórico</span>
            {historyCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 rounded-full animate-pulse">
                {historyCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
