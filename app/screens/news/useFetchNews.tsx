import { useState, useEffect } from "react";
import type { INews } from "./news.types";

export const useFetchNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [news, setNews] = useState<INews[]>([]);

  const fetchNews = async (page: number) => {
    try {
      const response = await fetch(
        `https://openapiv1.coinstats.app/news?page=${page}&limit=5`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
          },
        }
      );
      const json = await response.json();
      setNews([...news, ...json.result]);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const loadItems = () => {
    setPage((prev) => prev + 1);
  };
  const onRefresh = () => {
    fetchNews(1);
  };

  return {
    isLoading,
    news,
    loadItems,
    onRefresh,
  };
};
