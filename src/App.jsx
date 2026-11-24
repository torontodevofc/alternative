import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Generator from './components/Generator';
import ResultCard from './components/ResultCard';
import FeaturedExamples from './components/FeaturedExamples';
import HistoryDrawer from './components/HistoryDrawer';
import ApiKeyModal from './components/ApiKeyModal';
import Footer from './components/Footer';
import { ATMOSPHERES } from './data/presets';
import { generateAlternativeEnding } from './services/groq';
import confetti from 'canvas-confetti';

export default function App() {
  const [work, setWork] = useState('');
  const [whatIf, setWhatIf] = useState('');
  const [atmosphereId, setAtmosphereId] = useState('horror');
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  // Load API key and history from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('GROQ_API_KEY') || '';
      if (savedKey) setApiKey(savedKey);

      const savedHistory = localStorage.getItem('alternative_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Erro ao ler localStorage', e);
    }
  }, []);

  // Save API key
  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    try {
      if (newKey) {
        localStorage.setItem('GROQ_API_KEY', newKey);
      } else {
        localStorage.removeItem('GROQ_API_KEY');
      }
    } catch (e) {
      console.error('Erro ao salvar API key', e);
    }
  };

  // Save history item
  const saveToHistory = (newResult, workTitle, whatIfText, atmId) => {
    const newItem = {
      id: Date.now().toString(),
      work: workTitle,
      whatIf: whatIfText,
      atmosphereId: atmId,
      result: newResult,
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.filter((h) => h.work !== workTitle || h.whatIf !== whatIfText)].slice(0, 10);
      try {
        localStorage.setItem('alternative_history', JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar histórico', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('alternative_history');
    } catch (e) {
      console.error('Erro ao limpar histórico', e);
    }
  };

  const [streamingText, setStreamingText] = useState('');

  // Generate ending
  const handleGenerate = async () => {
    if (!work.trim() || !whatIf.trim()) return;

    setIsLoading(true);
    setStreamingText('');
    setError(null);

    const atmosphere = ATMOSPHERES.find((a) => a.id === atmosphereId) || ATMOSPHERES[0];

    try {
      const data = await generateAlternativeEnding({
        work: work.trim(),
        whatIf: whatIf.trim(),
        atmosphere,
        apiKey,
        onChunk: (chunkText) => {
          setStreamingText(chunkText);
        }
      });

      setResult(data);
      setStreamingText('');
      saveToHistory(data, work.trim(), whatIf.trim(), atmosphereId);

      // Scroll smoothly to result
      setTimeout(() => {
        const el = document.getElementById('resultado');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);

      // Trigger celebratory confetti if happy or comedy
      if (atmosphereId === 'happy' || atmosphereId === 'comedy') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error(err);
      setError(
        err.message || 'Ocorreu um erro ao gerar o final alternativo. Verifique sua chave da Groq ou tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Select example from featured cards
  const handleSelectExample = (example) => {
    setWork(example.work);
    setWhatIf(example.whatIf);
    setAtmosphereId(example.atmosphereId);

    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Load history item into generator & result
  const handleLoadHistoryItem = (item) => {
    setWork(item.work);
    setWhatIf(item.whatIf);
    setAtmosphereId(item.atmosphereId);
    setResult(item.result);

    setTimeout(() => {
      const el = document.getElementById('resultado');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const gen = document.getElementById('generator');
        if (gen) gen.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#07070d] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-amber-200">
      
      {/* Navigation Header */}
      <Header
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        historyCount={history.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Duality Hero Section */}
        <Hero 
          onStartCreating={() => {
            const el = document.getElementById('generator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Generator Form Section */}
        <Generator
          work={work}
          setWork={setWork}
          whatIf={whatIf}
          setWhatIf={setWhatIf}
          atmosphereId={atmosphereId}
          setAtmosphereId={setAtmosphereId}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          streamingText={streamingText}
          error={error}
        />

        {/* Generated Result Card */}
        {result && (
          <ResultCard
            result={result}
            work={work}
            whatIf={whatIf}
            atmosphereId={atmosphereId}
            onRewrite={handleGenerate}
            onNewIdea={() => {
              setWork('');
              setWhatIf('');
              setResult(null);
              const el = document.getElementById('generator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* Featured Examples */}
        <FeaturedExamples onSelectExample={handleSelectExample} />
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        history={history}
        onLoadItem={handleLoadHistoryItem}
        onClearHistory={handleClearHistory}
      />

      {/* Groq API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* Footer */}
      <Footer onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      
    </div>
  );
}
