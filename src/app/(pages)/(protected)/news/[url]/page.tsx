"use client"



import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import NewsDetails, { NewsItem } from '@/components/NewsDetails';
import { useAppContext } from '@/context/AppProvider';
import axios from 'axios';


// { params }: { params: { url: string } }
export default function NewsDetailsPage() {


  const router = useRouter();
  const { url }: any = router;

  const { setError, } = useAppContext();

  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&category=general`;

        const response = await axios.get(`${URL}`);
        const newsItemData = response.data.articles;

        console.log(newsItemData[0].url);

        const newfilterData = newsItemData.filter((item: any) => item.url === newsItemData.url)
        // console.log(newfilterData);
        setNewsItem(newsItemData);

      } catch (error) {
        setError('Failed to fetch news details.');
      }
    };


    fetchNewsDetails();

  }, [setError]);

  return (
    <div>
      <h1>URL :{url}</h1>
      {/* <h1>URL :{params.url}</h1> */}
      {newsItem ? (
        <NewsDetails newsItem={newsItem} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
