import {useEffect, useState} from 'react';
import {Article} from '../core/entities/article.entity';
import axios from 'axios';
import {NEWS_API_KEY} from '@env';

const useNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'bitcoin',
            sortBy: 'publishedAt',
            apiKey: NEWS_API_KEY,
          },
        });
        const filteredArticles = response.data.articles.filter(
          (article: Article) => {
            const isRemoved =
              article.title === '[Removed]' ||
              article.description === '[Removed]';
            const isDefaultDate =
              article.publishedAt === '1970-01-01T00:00:00Z';
            const hasNoImage = article.urlToImage === null;
            return !isRemoved && !isDefaultDate && !hasNoImage;
          },
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return {articles, isLoading};
};

export default useNews;
