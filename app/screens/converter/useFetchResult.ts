import { useState, useEffect } from "react";
import { useFetchMarket } from "../market/useFetchMarket";
import { useFetchCrypto } from "../crypto/useFetchCrypto";

export const useFetchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [result, setResult] = useState([]);
  const { fetchCoins, fetchExchanges } = useFetchMarket();
  const { fetchFiats } = useFetchCrypto();

  useEffect(() => {
    fetchCoins();
    if (selectedFrom !== "") fetchFiats();
    if (selectedTo !== "") fetchExchanges();
    if (selectedFrom !== "" && selectedTo !== "" && selectedExchange !== "")
      getResult(selectedFrom, selectedTo, selectedExchange);
  }, [selectedFrom, selectedTo, selectedExchange]);

  const getResult = async (
    from: string,
    to: string,
    exchange: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://openapiv1.coinstats.app/tickers/markets?exchange=${exchange}&fromCoin=${from}&toCoin=${to}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
          },
        }
      );
      const json = await response.json();
      setResult(json.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    result,
    selectedFrom,
    setSelectedFrom,
    selectedTo,
    setSelectedTo,
    selectedExchange,
    setSelectedExchange,
  };
};
