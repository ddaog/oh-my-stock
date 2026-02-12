import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import InputScreen from './components/InputScreen';
import type { SajuFormData } from './components/InputScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import { analyzeSaju, getRecommendedStocks } from './utils/sajuLogic';
import type { SajuElement, StockInfo } from './utils/sajuLogic';

type AppState = 'input' | 'loading' | 'result';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [formData, setFormData] = useState<SajuFormData | null>(null);
  const [result, setResult] = useState<{ element: SajuElement; stocks: StockInfo[] } | null>(null);

  const handleInputNext = (data: SajuFormData) => {
    setFormData(data);
    setState('loading');
  };

  const handleLoadingComplete = () => {
    if (formData) {
      const element = analyzeSaju(formData.birthDate);
      const stocks = getRecommendedStocks(element);
      setResult({ element, stocks });
      setState('result');
    }
  };

  const handleReset = () => {
    setFormData(null);
    setResult(null);
    setState('input');
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {state === 'input' && (
          <InputScreen key="input" onNext={handleInputNext} />
        )}
        {state === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
        {state === 'result' && result && (
          <ResultScreen
            key="result"
            element={result.element}
            stocks={result.stocks}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
