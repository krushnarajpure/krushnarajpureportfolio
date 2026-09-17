import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultPortfolioData } from '../lib/portfolioStorage';
import { loadPortfolioData, savePortfolioData } from '../lib/portfolioService';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(defaultPortfolioData);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let ignore = false;

    const initialize = async () => {
      const saved = await loadPortfolioData();
      if (!ignore) {
        setPortfolio(saved);
        setInitialized(true);
      }
    };

    initialize();

    return () => {
      ignore = true;
    };
  }, []);

  const updatePortfolio = (updater) => {
    setPortfolio((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      return next;
    });
  };

  const savePortfolio = async (nextPortfolio = portfolio) => {
    await savePortfolioData(nextPortfolio);
  };

  const value = useMemo(() => ({
    portfolio,
    initialized,
    setPortfolio: updatePortfolio,
    savePortfolio,
    updateSection: (section, data) => updatePortfolio((current) => ({ ...current, [section]: data })),
  }), [portfolio, initialized]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used inside PortfolioProvider');
  }
  return context;
}
