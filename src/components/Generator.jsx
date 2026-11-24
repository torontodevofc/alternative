import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Tv, 
  GitBranch, 
  HelpCircle, 
  Dices, 
  Sparkles, 
  Loader2, 
  Wand2, 
  AlertCircle,
  XCircle,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import AtmosphereSelector from './AtmosphereSelector';
import { SURPRISE_IDEAS, LOADING_MESSAGES } from '../data/presets';

export default function Generator({
  work,
  setWork,
  whatIf,
  setWhatIf,
  atmosphereId,
  setAtmosphereId,
  onGenerate,
  isLoading,
  streamingText,
  error
}) {
  const [diceRotation, setDiceRotation] = useState(0);
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
  const [surpriseToast, setSurpriseToast] = useState(null);

  // Cycle loading messages when loading
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentLoadingIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1600);
    } else {
      setCurrentLoadingIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle "Me Surpreenda" (360 degrees spin + random pick)
  const handleSurpriseMe = () => {
    setDiceRotation((prev) => prev + 360);

    // Pick random idea different from current if possible
    const available = SURPRISE_IDEAS.filter((item) => item.work !== work);
    const selected = available.length > 0 
      ? available[Math.floor(Math.random() * available.length)]
      : SURPRISE_IDEAS[Math.floor(Math.random() * SURPRISE_IDEAS.length)];

    setWork(selected.work);
    setWhatIf(selected.whatIf);
    setAtmosphereId(selected.atmosphereId);

    setSurpriseToast(selected.tag);
    setTimeout(() => {
      setSurpriseToast(null);
    }, 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!work.trim() || !whatIf.trim()) {
      return;
    }
    onGenerate();
  };

  const quickPicks = [
    { name: 'Toy Story', change: 'E se o Woody fosse um agente secreto?' },
    { name: 'Titanic', change: 'E se o navio nunca tivesse afundado?' },
    { name: 'Shrek', change: 'E se Shrek aceitasse ser o Rei?' },
    { name: 'Interestelar', change: 'E se o tempo passasse ao contrário?' }
  ];

  return (
    <section id="generator" className="relative py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium mb-2.5">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Laboratório de Realidades Paralelas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Forje uma Nova <span className="bg-gradient-to-r from-amber-300 via-rose-500 to-purple-500 bg-clip-text text-transparent">Linha do Tempo</span>
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Diga-nos a obra, o ponto de virada e a atmosfera. A IA cuidará de desmantelar o desfecho original.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-[#0d0e1a]/90 border border-slate-800/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          
          {/* Subtle Ambient Glow inside Card */}
          <div className="absolute top-0 right-1/4 w-80 h-40 bg-rose-600/10 blur-[80px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-amber-500/10 blur-[80px] pointer-events-none rounded-full" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Campo 1: "Qual é a obra?" */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="work-input" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  <span>Qual é a obra?</span>
                  <span className="text-xs text-rose-400 font-bold">*</span>
                </label>
                <span className="text-xs text-slate-500 hidden sm:inline">Filme, série, livro, anime ou jogo</span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Tv className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="work-input"
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  placeholder="Ex: Titanic, Shrek, Vingadores: Ultimato, Interestelar, Toy Story..."
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:border-amber-400 transition-all text-sm sm:text-base font-medium shadow-inner"
                />
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
                  <Lightbulb className="w-3 h-3 text-amber-400" /> Teste rápido:
                </span>
                {quickPicks.map((pick) => (
                  <button
                    key={pick.name}
                    type="button"
                    onClick={() => {
                      setWork(pick.name);
                      setWhatIf(pick.change);
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-amber-200 transition-colors"
                  >
                    {pick.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Campo 2: "O que muda na história? E se..." */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="what-if-input" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-rose-400" />
                  <span>O que muda na história? E se...</span>
                  <span className="text-xs text-rose-400 font-bold">*</span>
                </label>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Seja ousado ou bizarro</span>
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="what-if-input"
                  rows={3}
                  value={whatIf}
                  onChange={(e) => setWhatIf(e.target.value)}
                  placeholder="Ex: E se o vilão não quisesse destruir o mundo, mas sim convencer todos a adotarem gatinhos cósmicos? Ou e se o herói descobrisse que ele mesmo era a assombração?"
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/80 focus:border-rose-500 transition-all text-sm sm:text-base font-medium shadow-inner resize-none"
                />
              </div>
            </div>

            {/* Seletor de Atmosfera / Estilo */}
            <AtmosphereSelector 
              selectedId={atmosphereId} 
              onSelect={(id) => setAtmosphereId(id)} 
            />

            {/* Surprise Toast Feedback */}
            {surpriseToast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-rose-500/20 border border-amber-400/30 flex items-center justify-between text-xs sm:text-sm text-amber-200 font-medium"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Ideia Maluca Ativada: <strong>{surpriseToast}</strong></span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSurpriseToast(null)} 
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Error Message if any */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-600/50 flex items-start gap-3 text-rose-300 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-rose-200">Não foi possível alterar a linha do tempo</div>
                  <div className="text-xs text-rose-300/90 mt-0.5">{error}</div>
                </div>
              </div>
            )}

            {/* Action Buttons: "Me Surpreenda" & "Gerar Destino" */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Botão "Me Surpreenda" com ícone Dices (gira 360 graus) */}
              <button
                type="button"
                onClick={handleSurpriseMe}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 text-slate-200 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-md group"
              >
                <motion.div
                  animate={{ rotate: diceRotation }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-amber-400"
                >
                  <Dices className="w-5 h-5 transition-transform group-hover:scale-110" />
                </motion.div>
                <span>Me Surpreenda!</span>
              </button>

              {/* Botão "Gerar Destino" */}
              <button
                type="submit"
                disabled={isLoading || !work.trim() || !whatIf.trim()}
                className={`w-full sm:flex-1 py-4 px-8 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                  isLoading || !work.trim() || !whatIf.trim()
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-amber-400 via-rose-600 to-purple-600 hover:from-amber-300 hover:via-rose-500 hover:to-purple-500 text-white shadow-[0_0_35px_rgba(225,29,72,0.35)] hover:shadow-[0_0_45px_rgba(245,158,11,0.45)] hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-amber-300" />
                    <span className="animate-pulse text-amber-100 font-semibold text-sm sm:text-base">
                      {LOADING_MESSAGES[currentLoadingIndex]}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Gerar Destino Alternativo</span>
                  </>
                )}
              </button>

            </div>

            {/* Live Streaming Feedback from Groq SDK */}
            {isLoading && streamingText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-amber-400/30 text-xs sm:text-sm text-slate-300 font-mono overflow-hidden shadow-lg relative"
              >
                <div className="flex items-center gap-2 text-amber-300 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Transmitindo em tempo real da Groq:</span>
                </div>
                <div className="whitespace-pre-wrap max-h-36 overflow-y-auto pr-2 text-slate-200">
                  {streamingText}
                  <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse align-middle" />
                </div>
              </motion.div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
}
