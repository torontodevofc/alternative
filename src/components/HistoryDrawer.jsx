import React from 'react';
import { 
  X, 
  History, 
  Trash2, 
  ArrowRight, 
  Copy, 
  Check, 
  Clapperboard, 
  Sparkles,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ATMOSPHERES } from '../data/presets';

export default function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onLoadItem,
  onClearHistory
}) {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopyHistoryItem = (item) => {
    const text = `ALTERNATIVE — ${item.work}
E se...: ${item.whatIf}

TÍTULO: ${item.result.title}

${item.result.paragraphs.join('\n\n')}

"${item.result.punchline}"`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#0a0a14] border-l border-slate-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Suas Linhas do Tempo Criadas</h3>
                  <p className="text-xs text-slate-400">Últimos finais gerados nesta sessão</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {history.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-300">Nenhum final no histórico ainda</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Use o gerador para criar destinos alternativos. Eles ficarão gravados aqui automaticamente.
                  </p>
                </div>
              ) : (
                history.map((item) => {
                  const atm = ATMOSPHERES.find((a) => a.id === item.atmosphereId) || ATMOSPHERES[0];

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Tags */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-amber-300">
                            {item.work}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${atm.badgeClass}`}>
                            {atm.name}
                          </span>
                        </div>

                        {/* What if */}
                        <p className="text-xs text-slate-300 italic mb-2 line-clamp-2">
                          "{item.whatIf}"
                        </p>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white mb-1">
                          {item.result.title}
                        </h4>

                        {/* Punchline */}
                        <p className="text-xs text-slate-400 border-l-2 border-slate-700 pl-2 my-2 italic line-clamp-1">
                          "{item.result.punchline}"
                        </p>

                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleCopyHistoryItem(item)}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            onLoadItem(item);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition-colors"
                        >
                          <span>Ver no Gerador</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {history.length > 0 && (
              <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
                <span className="text-xs text-slate-500">
                  {history.length} {history.length === 1 ? 'história guardada' : 'histórias guardadas'}
                </span>
                <button
                  onClick={onClearHistory}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar Histórico</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
