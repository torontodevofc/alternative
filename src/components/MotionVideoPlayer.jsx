import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  X, 
  Clapperboard, 
  Sparkles, 
  Film, 
  Image as ImageIcon,
  Palette,
  Camera,
  Download,
  Smile,
  Skull,
  Heart,
  Flame,
  Eye,
  Laugh,
  FileCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageForSentence, generate2dSceneImageUrl, sanitizeForNarration } from '../data/sceneVisuals';
import SynctoonPuppet from './SynctoonPuppet';

export default function MotionVideoPlayer({
  isOpen,
  onClose,
  result,
  work,
  whatIf,
  atmosphereId
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [animationMode, setAnimationMode] = useState('synctoon'); // 'synctoon' | 'cinema'

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // 1. Break narrative into granular sentences
  const rawSentences = [];

  if (result.title) {
    rawSentences.push({
      text: result.title,
      type: 'title',
      label: 'Abertura • Título'
    });
  }

  result.paragraphs.forEach((p, pIdx) => {
    const split = p.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [p];
    split.forEach((s) => {
      const trimmed = s.trim();
      if (trimmed.length > 3) {
        rawSentences.push({
          text: trimmed,
          type: 'narrative',
          label: `Ato ${pIdx + 1}`
        });
      }
    });
  });

  if (result.punchline) {
    rawSentences.push({
      text: result.punchline,
      type: 'punchline',
      label: 'Desfecho Marcante'
    });
  }

  // 2. Prepare sentence items with clean speech & topic images
  let runningCharCount = 0;
  const sentenceItems = rawSentences.map((item, idx) => {
    const cleanSpeech = sanitizeForNarration(item.text);
    const startIdx = runningCharCount;
    runningCharCount += cleanSpeech.length + 3;
    const endIdx = runningCharCount;

    // Fast thematic cinema image
    const topicCinemaImage = getImageForSentence(cleanSpeech, idx, work, atmosphereId);

    // AI 2D scene image
    const ai2dSceneImage = generate2dSceneImageUrl(cleanSpeech, work, whatIf, atmosphereId, idx * 37 + 13);

    return {
      id: idx,
      rawText: item.text,
      cleanSpeech,
      type: item.type,
      label: item.label,
      cinemaImage: topicCinemaImage,
      ai2dImage: ai2dSceneImage,
      startIdx,
      endIdx
    };
  });

  const fullNarrationSpeech = sentenceItems.map((s) => s.cleanSpeech).join('. ');
  const currentItem = sentenceItems[currentSentenceIndex] || sentenceItems[0];

  // 45-SECOND BACKGROUND PACING:
  // "1 imagem a cada 45 seconds" - Background transitions at a relaxed 45-second pace
  const backgroundSlot = Math.floor(elapsedSeconds / 45);
  const activeBackgroundIndex = backgroundSlot % Math.max(1, sentenceItems.length);
  const timedItem = sentenceItems[activeBackgroundIndex] || currentItem;
  const activeBackgroundImage = animationMode === 'synctoon' ? timedItem.ai2dImage : timedItem.cinemaImage;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  // Timecode counter
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const startPlayback = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Seu navegador não suporta a Web Speech API.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullNarrationSpeech);
    utterance.lang = 'pt-BR';

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.includes('pt-BR') || v.lang.includes('pt'));
    if (ptVoice) utterance.voice = ptVoice;

    if (atmosphereId === 'horror') {
      utterance.rate = 0.86;
      utterance.pitch = 0.85;
    } else if (atmosphereId === 'happy') {
      utterance.rate = 1.04;
      utterance.pitch = 1.1;
    } else if (atmosphereId === 'comedy') {
      utterance.rate = 1.1;
      utterance.pitch = 1.05;
    } else {
      utterance.rate = 0.94;
      utterance.pitch = 0.98;
    }

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIdx = event.charIndex;
        const activeIdx = sentenceItems.findIndex(
          (s) => charIdx >= s.startIdx && charIdx <= s.endIdx
        );

        if (activeIdx !== -1 && activeIdx !== currentSentenceIndex) {
          setCurrentSentenceIndex(activeIdx);
        }
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentenceIndex(0);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pausePlayback = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const stopPlayback = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentenceIndex(0);
      setElapsedSeconds(0);
    }
  };

  const restartPlayback = () => {
    stopPlayback();
    setTimeout(() => {
      startPlayback();
    }, 150);
  };

  useEffect(() => {
    if (isOpen) {
      startPlayback();
    } else {
      stopPlayback();
    }
  }, [isOpen]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Export Synctoon Project JSON (for Synctoon CLI / Python pipeline)
  const exportSynctoonProject = () => {
    const project = {
      project_name: `Alternative_${work.replace(/\s+/g, '_')}`,
      version: '1.0.0',
      synctoon_compatible: true,
      audio: {
        text: fullNarrationSpeech,
        lang: 'pt-BR',
        atmosphere: atmosphereId
      },
      scenes: sentenceItems.map((s, idx) => ({
        scene_id: idx,
        label: s.label,
        dialogue: s.cleanSpeech,
        camera: idx % 2 === 0 ? 'close-up' : 'medium',
        character: {
          puppet: 'cutout_human',
          theme: work,
          gesture: atmosphereId === 'horror' ? 'scared' : idx % 2 === 0 ? 'point' : 'talk',
          lip_sync: true
        },
        background_image: s.ai2dImage
      }))
    };

    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Synctoon_Project_${work.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reactive Emote
  const getCharacterEmote = () => {
    switch (atmosphereId) {
      case 'horror':
        return { icon: Skull, label: '😱 Pesadelo', color: 'text-rose-400 bg-rose-950/90 border-rose-500/70' };
      case 'happy':
        return { icon: Heart, label: '💖 Redenção', color: 'text-amber-300 bg-amber-950/90 border-amber-400/70' };
      case 'comedy':
        return { icon: Laugh, label: '😂 Caos Total', color: 'text-cyan-300 bg-cyan-950/90 border-cyan-400/70' };
      case 'plottwist':
        return { icon: Eye, label: '👁️ Revelação', color: 'text-purple-300 bg-purple-950/90 border-purple-500/70' };
      case 'epic':
      default:
        return { icon: Flame, label: '🔥 Épico', color: 'text-indigo-300 bg-indigo-950/90 border-indigo-500/70' };
    }
  };

  const emote = getCharacterEmote();
  const EmoteIcon = emote.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl">
          
          {/* Cinema Frame */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-[#040409] border border-slate-700/80 shadow-[0_0_100px_rgba(0,0,0,0.95)] flex flex-col justify-between select-none ${
              isFullscreen ? 'rounded-none max-w-none h-full' : ''
            }`}
          >

            {/* FULL BLEED BACKGROUND GLOW */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 filter blur-3xl">
              <img
                src={activeBackgroundImage}
                alt="Ambiance"
                className="w-full h-full object-cover scale-150 transition-all duration-1000"
              />
            </div>

            {/* TOP BAR */}
            <div className="relative z-30 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent">
              
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  SYNCTOON 2D
                </span>

                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                    <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                    {work}
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono">
                    {currentItem.label} • Cenário a cada 45s
                  </span>
                </div>
              </div>

              {/* Mode Toggle, Export & Window Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Synctoon vs Cinema Toggle */}
                <div className="flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-700/60 text-xs">
                  <button
                    type="button"
                    onClick={() => setAnimationMode('synctoon')}
                    className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                      animationMode === 'synctoon'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Synctoon 2D</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnimationMode('cinema')}
                    className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                      animationMode === 'cinema'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cinema Real</span>
                  </button>
                </div>

                {/* Export Synctoon Project Button */}
                <button
                  type="button"
                  onClick={exportSynctoonProject}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/60 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Baixar arquivo de projeto Synctoon (.json)"
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline">Exportar Synctoon</span>
                </button>

                <div className="px-3 py-1 rounded-xl bg-black/70 border border-slate-700/60 text-xs font-mono text-amber-300">
                  {formatTime(elapsedSeconds)}
                </div>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-black/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                  title="Tela cheia"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    stopPlayback();
                    onClose();
                  }}
                  className="p-2 rounded-xl bg-black/60 hover:bg-rose-600/80 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                  title="Fechar vídeo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* STAGE: SYNCTOON CUT-OUT ANIMATED PUPPET + 45-SECOND TIMED SCENE BACKGROUND */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-2 overflow-hidden">
              
              {/* STAGE FRAME CONTAINER */}
              <div className="relative w-full max-w-3xl h-60 sm:h-72 md:h-80 rounded-3xl overflow-hidden border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-[#070712] flex items-end justify-center">
                
                {/* 45-SECOND PACED BACKGROUND ART WITH KEN BURNS PAN */}
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeBackgroundImage}
                      src={activeBackgroundImage}
                      alt="Cenário de Fundo"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ 
                        opacity: 0.55, 
                        scale: isPlaying ? [1.02, 1.08] : 1.03,
                        transition: { duration: 15, ease: 'easeInOut' }
                      }}
                      exit={{ opacity: 0, scale: 1.01, transition: { duration: 1 } }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80';
                      }}
                      className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.15]"
                    />
                  </AnimatePresence>

                  {/* Cinema Spotlight Beam shining down on the Puppet */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.22),transparent_70%)] pointer-events-none" />

                  {/* Cartoon Studio Floor / Stage Gradient */}
                  <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
                </div>

                {/* SYNCTOON CUT-OUT 2D ANIMATED PUPPET RIG (PROMINENT & CENTERED) */}
                {animationMode === 'synctoon' ? (
                  <div className="relative z-20 flex flex-col items-center mb-1">
                    
                    {/* Floating Speech / Reaction Bubble */}
                    <motion.div
                      animate={{ y: [-4, 4, -4], scale: isPlaying ? [1, 1.06, 1] : 1 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className={`mb-1 px-3.5 py-1 rounded-full text-xs font-black border backdrop-blur-xl shadow-2xl flex items-center gap-1.5 ${emote.color}`}
                    >
                      <EmoteIcon className="w-3.5 h-3.5" />
                      <span>{emote.label}</span>
                    </motion.div>

                    {/* Full Synctoon Cut-Out Puppet */}
                    <SynctoonPuppet
                      work={work}
                      atmosphereId={atmosphereId}
                      isPlaying={isPlaying}
                      sceneIndex={currentSentenceIndex}
                    />
                  </div>
                ) : (
                  /* Cinema Mode: Full image presentation */
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                    <img
                      src={activeBackgroundImage}
                      alt="Cinema Frame"
                      className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl"
                    />
                  </div>
                )}

                {/* 45s Scene Timer Badge */}
                <div className="absolute top-3 left-4 z-30 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-amber-300 shadow-md">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cenário {activeBackgroundIndex + 1} • Troca a cada 45s</span>
                </div>
              </div>

              {/* SMOOTH ELEGANT SUBTITLE STREAM */}
              <div className="w-full max-w-3xl mt-3 px-5 py-3 rounded-2xl bg-black/90 backdrop-blur-md border border-slate-700/60 shadow-lg text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.cleanSpeech}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm sm:text-base md:text-lg font-medium text-slate-100 leading-relaxed tracking-wide"
                  >
                    {currentItem.type === 'title' ? (
                      <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-400 bg-clip-text text-transparent">
                        "{currentItem.cleanSpeech}"
                      </span>
                    ) : (
                      <span>{currentItem.cleanSpeech}</span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* BOTTOM CONTROLS */}
            <div className="relative z-30 p-4 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
              
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3 relative cursor-pointer">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500"
                  animate={{
                    width: `${Math.min(100, ((currentSentenceIndex + 1) / sentenceItems.length) * 100)}%`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between gap-4">
                
                {/* Play / Pause / Restart */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={isPlaying ? pausePlayback : startPlayback}
                    className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-600 hover:from-amber-300 hover:to-rose-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
                    )}
                    <span className="text-xs sm:text-sm font-bold">
                      {isPlaying ? 'Pausar' : isPaused ? 'Continuar' : 'Play'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={restartPlayback}
                    className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                    title="Reiniciar vídeo"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Sound Visualizer */}
                <div className="hidden sm:flex items-center gap-1.5 h-6 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800">
                  {[30, 80, 45, 95, 60, 75, 40, 85, 50, 70].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isPlaying ? 'bg-gradient-to-t from-amber-400 to-rose-500 animate-pulse' : 'bg-slate-700'
                      }`}
                      style={{
                        height: isPlaying ? `${h}%` : '20%',
                        animationDuration: `${0.35 + (i % 3) * 0.15}s`
                      }}
                    />
                  ))}
                </div>

                {/* Sentence progress counter */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Cena {currentSentenceIndex + 1} de {sentenceItems.length}</span>
                </div>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
