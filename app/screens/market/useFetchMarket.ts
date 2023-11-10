import { useState, useEffect } from "react";
import { IMarket, ICoin, IExchange } from "./market.types";

export const useFetchMarket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const [exchangeUpperCase, setExchangeUpperCase] = useState([]);
  const [coins, setCoins] = useState([]);
  const [coinSymbol, setCoinSymbol] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [markets, setMarkets] = useState<IMarket[]>([]);

  useEffect(() => {
    fetchExchanges();
    fetchCoins();
    if (selectedCoin !== "" && selectedExchange !== "")
      fetchMarket(selectedExchange, selectedCoin);
  }, [selectedExchange, selectedCoin]);

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchExchanges = async () => {
    try {
      const response = await fetch(
        `https://openapiv1.coinstats.app/tickers/exchanges`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
          },
        }
      );
      const json = await response.json();
      const exchanges = json.map((exchange: IExchange) => exchange.id);
      const exchangesUpperCase = json.map((exchange: IExchange) =>
        capitalizeFirstLetter(exchange.id)
      );
      setExchanges(exchanges);
      setExchangeUpperCase(exchangesUpperCase);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoins = async () => {
    try {
      const response = await fetch(
        `https://openapiv1.coinstats.app/coins?limit=100`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
          },
        }
      );
      const json = await response.json();
      const coins = json.result.map((coin: ICoin) => coin.id);
      const coinsSymbol = json.result.map((coin: ICoin) => coin.symbol);
      setCoinSymbol(coinsSymbol);
      setCoins(coins);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMarket = async (exchange: string, coin: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://openapiv1.coinstats.app/tickers/markets?limit=100&exchange=${exchange}&coinId=${coin}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
          },
        }
      );
      const json = await response.json();
      setMarkets(json.result);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    exchanges,
    exchangeUpperCase,
    coins,
    coinSymbol,
    markets,
    fetchMarket,
    fetchCoins,
    fetchExchanges,
    selectedExchange,
    selectedCoin,
    setSelectedExchange,
    setSelectedCoin,
  };
};
