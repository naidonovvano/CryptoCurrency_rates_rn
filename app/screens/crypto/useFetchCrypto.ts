import { useState, useEffect } from "react";
import type { ICrypto, IFiat } from "./crypto.types";

export const useFetchCrypto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cryptos, setCryptos] = useState<ICrypto[]>([]);
  const [fiats, setFiats] = useState([]);
  const [selectedFiat, setSelectedFiat] = useState("");

  useEffect(() => {
    fetchFiats();
    if (selectedFiat !== "") fetchCryptos(page, selectedFiat);
  }, [page, selectedFiat]);

  const fetchCryptos = async (
    page: number,
    currency: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://openapiv1.coinstats.app/coins?page=${page}&limit=10&currency=${currency}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
          },
        }
      );
      const json = await response.json();
      setTotalPages(json.meta.pageCount);
      setCryptos(json.result);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFiats = async () => {
    try {
      const response = await fetch(`https://openapiv1.coinstats.app/fiats`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
        },
      });
      const json = await response.json();
      const names = json.map((fiat: IFiat) => fiat.name);
      setFiats(names);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const loadItems = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const goBack = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    isLoading,
    cryptos,
    fiats,
    fetchFiats,
    selectedFiat,
    setSelectedFiat,
    goBack,
    page,
    totalPages,
    loadItems,
  };
};
