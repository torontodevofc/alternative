import React, { useState } from 'react';
import { 
  KeyRound, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle,
  Trash2,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApiKeyModal({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey
}) {
  const [keyValue, setKeyValue] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // 'testing' | 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  React.useEffect(() => {
    setKeyValue(apiKey || '');
  }, [apiKey]);

  const handleSave = () => {
    onSaveApiKey(keyValue.trim());
    onClose();
  };

  const handleTestKey = async () => {
    if (!keyValue.trim()) {
      setTestStatus('error');
      setStatusMessage('Insira uma chave para testar.');
      return;
    }

    setTestStatus('testing');
    setStatusMessage('Validando chave junto à API da Groq...');

    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: {
          'Authorization': `Bearer ${keyValue.trim()}`
        }
      });

      if (response.ok) {
        setTestStatus('success');
        setStatusMessage('Chave Groq válida e conectada ao Llama 3.3!');
        onSaveApiKey(keyValue.trim());
      } else {
        const error = await response.json().catch(() => ({}));
        setTestStatus('error');
        setStatusMessage(error.error?.message || 'Chave da API Groq inválida ou expirada.');
      }
    } catch (err) {
      setTestStatus('error');
      setStatusMessage('Erro de conexão ao testar com a Groq. Verifique sua rede.');
    }
  };

  const handleClear = () => {
    setKeyValue('');
    onSaveApiKey('');
    setTestStatus(null);
    setStatusMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg rounded-3xl bg-[#0c0d18] border border-slate-700/80 p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 rounded-t-3xl" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Chave da API Groq</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Modelo <span className="font-mono text-amber-300">llama-3.3-70b-versatile</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanatory banner */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Privacidade & Armazenamento Local</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Sua chave fica armazenada <strong>apenas no seu navegador (LocalStorage)</strong> e é enviada diretamente aos servidores da Groq.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800">
                <span className="text-slate-400">Não tem uma chave ainda?</span>
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  Obter chave gratuita na Groq
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Input Field */}
            <div className="mb-5">
              <label htmlFor="groq-key-input" className="block text-xs font-semibold text-slate-300 mb-2">
                Insira sua GROQ_API_KEY (começa com gsk_...)
              </label>

              <div className="relative">
                <input
                  id="groq-key-input"
                  type={showKey ? 'text' : 'password'}
                  value={keyValue}
                  onChange={(e) => setKeyValue(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400/80 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                  title={showKey ? 'Ocultar chave' : 'Mostrar chave'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Test Status Feedback */}
            {testStatus && (
              <div className={`mb-5 p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                testStatus === 'success' 
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50' 
                  : testStatus === 'error'
                  ? 'bg-rose-950/40 text-rose-300 border-rose-500/50'
                  : 'bg-slate-900 text-cyan-300 border-cyan-500/40'
              }`}>
                {testStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />}
                {testStatus === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5" />}
                {testStatus === 'testing' && <Cpu className="w-4 h-4 text-cyan-400 animate-spin mt-0.5" />}
                <div>{statusMessage}</div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleTestKey}
                  disabled={testStatus === 'testing'}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  {testStatus === 'testing' ? 'Testando...' : 'Testar Conexão'}
                </button>

                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2.5 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                    title="Remover chave"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-rose-600 hover:from-amber-300 hover:to-rose-500 text-white shadow-lg transition-all"
                >
                  Salvar Chave
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
