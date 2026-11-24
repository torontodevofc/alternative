import React from 'react';
import { 
  Sun, 
  Smile, 
  Sparkles, 
  PartyPopper, 
  Heart, 
  Skull, 
  Ghost, 
  Flame, 
  Eye, 
  Zap, 
  Clapperboard, 
  Wand2,
  ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onStartCreating }) {
  const scrollToGenerator = () => {
    if (onStartCreating) {
      onStartCreating();
    } else {
      const el = document.getElementById('generator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 overflow-hidden">
      {/* Background Ambience split glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[450px] pointer-events-none -z-10 flex blur-[120px] opacity-40">
        <div className="w-1/2 h-full bg-gradient-to-r from-amber-500/50 via-yellow-400/40 to-cyan-500/40 rounded-full" />
        <div className="w-1/2 h-full bg-gradient-to-l from-red-600/60 via-rose-900/50 to-purple-950/60 rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Subtle pill badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs sm:text-sm font-medium text-slate-300 mb-8 shadow-inner"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Multiverso Cinematográfico Interativo</span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-400 font-semibold">Linhas do Tempo Infinitas</span>
        </motion.div>

        {/* Main Dual Title: "Alternative" */}
        <div className="relative my-4 select-none">
          
          {/* FLOATING HAPPY ICONS AROUND "Alter" */}
          <div className="absolute left-[-20px] sm:left-[-40px] md:left-[-70px] top-[-30px] sm:top-[-40px] pointer-events-none z-20">
            {/* Sun */}
            <motion.div 
              animate={{ y: [-6, 6, -6], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-3 -left-2 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]"
            >
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 fill-amber-300/30" />
            </motion.div>

            {/* Smile */}
            <motion.div 
              animate={{ y: [8, -8, 8], rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
              className="absolute top-14 -left-6 sm:-left-10 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.7)]"
            >
              <Smile className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.div>

            {/* Sparkles */}
            <motion.div 
              animate={{ scale: [0.9, 1.2, 0.9], rotate: [0, 45, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="absolute -top-8 left-16 sm:left-24 text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.8)]"
            >
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 fill-cyan-300/40" />
            </motion.div>

            {/* PartyPopper */}
            <motion.div 
              animate={{ y: [-4, 6, -4], rotate: [-15, 5, -15] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
              className="absolute top-24 left-2 sm:left-4 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            >
              <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>

            {/* Heart */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], y: [4, -6, 4] }}
              transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-3 sm:-left-6 text-rose-400 drop-shadow-[0_0_14px_rgba(244,63,94,0.7)]"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-400/40" />
            </motion.div>
          </div>

          {/* FLOATING HORROR ICONS AROUND "native" */}
          <div className="absolute right-[-20px] sm:right-[-40px] md:right-[-70px] top-[-30px] sm:top-[-40px] pointer-events-none z-20">
            {/* Skull */}
            <motion.div 
              animate={{ y: [6, -6, 6], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 text-rose-500 drop-shadow-[0_0_18px_rgba(225,29,72,0.9)]"
            >
              <Skull className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>

            {/* Ghost */}
            <motion.div 
              animate={{ y: [-8, 8, -8], x: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-12 -right-6 sm:-right-10 text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]"
            >
              <Ghost className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.div>

            {/* Flame */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="absolute -top-8 right-16 sm:right-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)]"
            >
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 fill-red-500/50" />
            </motion.div>

            {/* Eye */}
            <motion.div 
              animate={{ scaleY: [1, 0.2, 1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.05, 0.1, 0.8, 1] }}
              className="absolute top-24 -right-1 sm:right-2 text-rose-400 drop-shadow-[0_0_14px_rgba(244,63,94,0.8)]"
            >
              <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>

            {/* Zap */}
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.4, 1], scale: [0.95, 1.1, 0.95] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-3 sm:-right-6 text-purple-300 drop-shadow-[0_0_15px_rgba(216,180,254,0.9)]"
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-purple-300/40" />
            </motion.div>
          </div>

          {/* THE GIANT DUO TITLE (written together: "Alternative") */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight flex items-baseline justify-center cursor-default m-0 p-0 leading-none">
            {/* "Alter" Half */}
            <motion.span 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-amber-300 via-yellow-400 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_35px_rgba(245,158,11,0.55)] animate-sun-glow inline-block"
            >
              Alter
            </motion.span>

            {/* "native" Half (Glued immediately, slightly more dramatic/creepy font and subtle jitter hover) */}
            <motion.span 
              whileHover={{ scale: 1.03 }}
              className="font-cinzel text-[0.92em] bg-gradient-to-r from-red-600 via-rose-800 to-purple-950 bg-clip-text text-transparent filter drop-shadow-[0_0_35px_rgba(225,29,72,0.6)] animate-blood-pulse animate-spooky-jitter inline-block transition-transform duration-200"
            >
              native
            </motion.span>
          </h1>
        </div>

        {/* Catchy Description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed text-balance"
        >
          E se o herói tivesse falhado? Ou se o vilão só precisasse de um abraço? Reescreva o destino de qualquer filme, série, jogo ou livro em segundos com Inteligência Artificial.
        </motion.p>

        {/* Dual CTA Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={scrollToGenerator}
            className="group relative inline-flex items-center justify-center p-[2px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:shadow-[0_0_55px_rgba(225,29,72,0.4)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Split Gradient Border */}
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 via-50% to-rose-600" />

            {/* Inner Content with Split Visual Vibe */}
            <div className="relative px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-[#0c0c16] flex items-center gap-3.5 transition-all duration-300 group-hover:bg-[#10101e]">
              <div className="flex items-center gap-1.5 text-amber-300">
                <Clapperboard className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-rotate-12" />
              </div>

              <span className="text-base sm:text-xl font-bold tracking-wide text-white">
                Criar Final Alternativo
              </span>

              <div className="flex items-center gap-1.5 text-rose-400">
                <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </div>
          </button>

          <a
            href="#destaques"
            className="px-6 py-3.5 rounded-2xl text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-sm font-medium transition-all flex items-center gap-2"
          >
            Ver Exemplos em Destaque
            <ArrowDown className="w-4 h-4 text-slate-500 group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* Quick Highlights Counters / Tags */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-left w-full max-w-4xl pt-8 border-t border-slate-800/60">
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Ultra Rápido
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Desfechos em segundos</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
              5 Atmosferas
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Do terror ao abraço cômico</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Infinitas Obras
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Filmes, animes, séries e livros</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Zero Fricção
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Com gerador offline ou chave Groq</div>
          </div>
        </div>

      </div>
    </section>
  );
}
