'use client';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import newsApi from '@/utils/api';
import { useAppContext } from '@/context/AppProvider';


const News = () => {
  const {
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
  } = useAppContext()

  const fetchNews = async () => {
    try {
      const { articles, totalResults } = await newsApi(category, loadMore);
      setNewsArray(articles);
      setNewsResults(totalResults);
      setError('');
    } catch (error) {
      setError('Failed to fetch news data.');
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, loadMore]);



  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-screen-xl px-4 pt-6 pb-4 mx-auto ">
        <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {newsArray.map((newsItem) => (
            <NewsCard newsItem={newsItem} key={newsItem.title} />
          ))}
        </div>

        <div className="flex justify-center">
          {loadMore <= newsResults && (
            <button
              className="px-6 py-2 mt-4 text-lg text-white bg-purple-700 rounded shadow-md cursor-pointer"
              onClick={() => setLoadMore(loadMore + 10)}
            >
              Load More
            </button>
          )}
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default News;
