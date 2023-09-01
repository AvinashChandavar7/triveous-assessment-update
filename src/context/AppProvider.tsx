
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NewsItem {
  title: string;
  url: string;
  urlToImage: string;
  author: string;
  description: string;
  source: { name: string };
  publishedAt: string;
}

interface NewsContextType {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  newsArray: NewsItem[];
  setNewsArray: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  newsResults: number;
  setNewsResults: React.Dispatch<React.SetStateAction<number>>;
  loadMore: number;
  setLoadMore: React.Dispatch<React.SetStateAction<number>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface AppProviderProps {
  children: ReactNode; // Use ReactNode for type safety
}

const AppContext = createContext<NewsContextType | undefined>(undefined)



const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [category, setCategory] = useState<string>('general');
  const [newsArray, setNewsArray] = useState<NewsItem[]>([]);
  const [newsResults, setNewsResults] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<number>(10);
  const [error, setError] = useState<string>('');


  const contextValue: NewsContextType = {
    category,
    setCategory,

    newsArray,
    setNewsArray,
    newsResults,
    setNewsResults,
    loadMore,
    setLoadMore,
    error,
    setError
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;
