import axios from 'axios';


const newsApi = async (category: string, loadMore: number) => {
  try {
    const URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&category=${category}&pageSize=${loadMore}`;
    const news = await axios.get(URL);
    return { articles: news.data.articles, totalResults: news.data.totalResults };
  } catch (error) {
    console.error(error);
    return { articles: [], totalResults: 0 };
  }
};

export default newsApi;

