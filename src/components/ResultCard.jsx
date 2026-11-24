import React, { useState, useEffect } from 'react';
import { 
  Quote, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Clapperboard, 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Film,
  Radio,
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ATMOSPHERES } from '../data/presets';
import { sanitizeForNarration } from '../data/sceneVisuals';
import MotionVideoPlayer from './MotionVideoPlayer';

export default function ResultCard({
  result,
  work,
  whatIf,
  atmosphereId,
  onRewrite,
  onNewIdea
}) {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const currentAtm = ATMOSPHERES.find((a) => a.id === atmosphereId) || ATMOSPHERES[0];

  // Stop speech when component unmounts or result changes
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result]);

  if (!result) return null;

  // Text to be narrated (cleaned of asterisks and markdown symbols)
  const rawSpeech = `${result.title}. ${result.paragraphs.join('. ')}. ${result.punchline}`;
  const fullNarrationText = sanitizeForNarration(rawSpeech);

  // Voice narration handler
  const handlePlayAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Seu navegador não suporta narração por voz.');
      return;
    }

    if (isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      setIsPlayingAudio(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullNarrationText);
    utterance.lang = 'pt-BR';

    // Pick best PT-BR voice
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.includes('pt-BR') || v.lang.includes('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    // Adapt pace and tone to the atmosphere
    if (atmosphereId === 'horror') {
      utterance.rate = 0.84;
      utterance.pitch = 0.82;
    } else if (atmosphereId === 'happy') {
      utterance.rate = 1.05;
      utterance.pitch = 1.15;
    } else if (atmosphereId === 'comedy') {
      utterance.rate = 1.12;
      utterance.pitch = 1.05;
    } else if (atmosphereId === 'plottwist') {
      utterance.rate = 0.90;
      utterance.pitch = 0.88;
    } else {
      utterance.rate = 0.94;
      utterance.pitch = 1.0;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
  };

  const handlePauseAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      setIsPlayingAudio(false);
    }
  };

  const handleStopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  };

  const handleCopy = () => {
    const formattedText = `🎭 ALTERNATIVE — FINAL ALTERNATIVO
Obra: ${work}
Mudança ("E se..."): ${whatIf}
Linha do Tempo: ${currentAtm.badge}

TÍTULO: ${result.title}

${result.paragraphs.join('\n\n')}

FRASE FINAL: "${result.punchline}"

Gerado no Alternative`;

    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleDownload = () => {
    const fullText = `ALTERNATIVE — FINAL ALTERNATIVO
Obra: ${work}
E se...: ${whatIf}
Estilo: ${currentAtm.name} (${currentAtm.badge})

${result.title}
========================================

${result.paragraphs.join('\n\n')}

========================================
"${result.punchline}"
`;

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Alternative-${work.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative py-8 md:py-12 px-4 scroll-mt-24" id="resultado">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden p-6 sm:p-10 md:p-12 bg-[#0c0d18] border border-slate-700/80 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.85)]"
        >
          {/* Top Edge Gradient Line */}
          <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${currentAtm.accentColor}`} />

          {/* Giant translucent quote icon in background */}
          <div className="absolute right-4 top-10 md:right-10 md:top-12 pointer-events-none select-none -z-0 opacity-[0.06] sm:opacity-[0.08] text-slate-100">
            <Quote className="w-56 h-56 sm:w-80 sm:h-80 -rotate-12" />
          </div>

          <div className="relative z-10">
            {/* Header badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
              
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${currentAtm.badgeClass} shadow-sm`}>
                  <Clapperboard className="w-4 h-4" />
                  <span>{currentAtm.badge}</span>
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-400 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                  Obra: <strong>{work}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Linha do Tempo Oficial
                </span>
              </div>

            </div>

            {/* Premise summary card */}
            <div className="my-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300">
              <span className="font-semibold text-amber-300">Ponto de Ruptura: </span>
              <span className="italic text-slate-200">"{whatIf}"</span>
            </div>

            {/* Episode Title */}
            <div className="my-6">
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
                Título do Episódio
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                <span className={`bg-gradient-to-r ${currentAtm.accentColor} bg-clip-text text-transparent`}>
                  {result.title}
                </span>
              </h3>
            </div>

            {/* CINEMA MOTION VIDEO LAUNCHER BUTTON */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => {
                  handleStopAudio();
                  setIsVideoModalOpen(true);
                }}
                className="w-full group relative inline-flex items-center justify-center p-[2px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:shadow-[0_0_55px_rgba(225,29,72,0.45)] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 animate-pulse" />
                <div className="relative w-full py-4 px-6 rounded-2xl bg-[#0b0c16] group-hover:bg-[#0e0f1e] flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-rose-600 text-white shadow-lg">
                      <Film className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-black text-white tracking-wide">
                          Assistir em Vídeo Graphic Motion
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500 text-white animate-bounce">
                          Cinema
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Cenas visuais cinematográficas + Narração por voz + Palavras sincronizadas na tela
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-4 py-2 rounded-xl group-hover:bg-amber-400/20 transition-colors">
                    <Play className="w-4 h-4 fill-amber-300" />
                    <span>Dar Play no Vídeo</span>
                  </div>
                </div>
              </button>
            </div>

            {/* AUDIO NARRATOR PLAYER BAR */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#101124] to-slate-900 border border-slate-700/80 shadow-md flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Play / Pause main button */}
                <button
                  type="button"
                  onClick={isPlayingAudio ? handlePauseAudio : handlePlayAudio}
                  className={`p-3.5 rounded-2xl font-bold flex items-center gap-2.5 transition-all shadow-lg ${
                    isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 shadow-amber-400/30 scale-105'
                      : 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:from-amber-300 hover:to-rose-400 text-white shadow-rose-500/20 hover:scale-105'
                  }`}
                  title={isPlayingAudio ? 'Pausar narração' : 'Ouvir história narrada'}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-5 h-5 fill-slate-950" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                  <span className="text-xs sm:text-sm font-bold tracking-wide">
                    {isPlayingAudio ? 'Pausar' : isPausedAudio ? 'Continuar Narração' : 'Ouvir Narração'}
                  </span>
                </button>

                {/* Stop button */}
                {(isPlayingAudio || isPausedAudio) && (
                  <button
                    type="button"
                    onClick={handleStopAudio}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 transition-colors"
                    title="Parar áudio"
                  >
                    <Square className="w-4 h-4 fill-rose-400" />
                  </button>
                )}

                {/* Status label */}
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Radio className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                    {isPlayingAudio ? 'Narrando em ritmo de cinema...' : isPausedAudio ? 'Narração pausada' : 'Narração por Voz Interativa'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {atmosphereId === 'horror' ? 'Tom sombrio e pausado' : atmosphereId === 'happy' ? 'Tom alegre e caloroso' : 'Tom cinematográfico'}
                  </span>
                </div>
              </div>

              {/* Animated audio equalizer wave */}
              <div className="flex items-center gap-1 h-6 px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800">
                {[45, 90, 30, 100, 60, 75, 40, 85, 50].map((height, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPlayingAudio
                        ? 'bg-gradient-to-t from-amber-400 to-rose-500 animate-pulse'
                        : 'bg-slate-700'
                    }`}
                    style={{
                      height: isPlayingAudio ? `${height}%` : '25%',
                      animationDuration: `${0.4 + (i % 3) * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 3 Cinematic Paragraphs */}
            <div className="space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {result.paragraphs.map((paragraph, idx) => (
                <div key={idx} className="relative pl-5 border-l-2 border-slate-700/60 transition-colors hover:border-amber-400/80">
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Final Punchline Quote Box */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#121324] border border-slate-700/80 relative overflow-hidden shadow-lg">
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${currentAtm.accentColor}`} />
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1 opacity-80" />
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">
                    Frase Final Marcante
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-white italic">
                    "{result.punchline}"
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Bar: Copy, Rewrite, Download */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex items-center gap-2.5">
                {/* Botão Copiar História */}
                <button
                  onClick={handleCopy}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600/70 hover:border-slate-500'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-300" />
                      <span>Copiar História</span>
                    </>
                  )}
                </button>

                {/* Botão Download TXT */}
                <button
                  onClick={handleDownload}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center gap-2 transition-all"
                  title="Salvar como arquivo de texto"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">Baixar TXT</span>
                </button>
              </div>

              {/* Botão Reescrever */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={onRewrite}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400 flex items-center gap-2 transition-all shadow-sm"
                  title="Gerar uma nova variação com a mesma premissa"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Reescrever</span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>

      {/* FULLSCREEN GRAPHIC MOTION CINEMA PLAYER */}
      <MotionVideoPlayer
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        result={result}
        work={work}
        whatIf={whatIf}
        atmosphereId={atmosphereId}
      />
    </section>
  );
}
