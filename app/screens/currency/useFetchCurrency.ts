import { useState, useEffect } from "react";
import { AppConstants } from "../../app.constants";
import { ICurrency } from "./currency.types";

export const useFetchCurrency = () => {
  const [currency, setCurrency] = useState<ICurrency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortByRate, setSortByRate] = useState(true);
  const [buttonTitle, setButtonTitle] = useState("rate");
  const [buttonColor, setButtonColor] = useState(AppConstants.mint);

  const fetchCurrency = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://openapiv1.coinstats.app/fiats`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "l6M4xBtGXslkcWVvcw91tvmY2W15phxPvfbbEzhVUBM=",
        },
      });
      const json = await response.json();
      setCurrency(json);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = () => {
    let sortedCurrency;
    if (sortByRate) {
      sortedCurrency = currency.sort((a, b) => (a.rate > b.rate ? 1 : -1));
      setButtonTitle("name");
      setButtonColor(AppConstants.peach);
    } else {
      sortedCurrency = currency.sort((a, b) => (a.name > b.name ? 1 : -1));
      setButtonTitle("rate");
      setButtonColor(AppConstants.mint);
    }
    setCurrency(sortedCurrency);
    setSortByRate(!sortByRate);
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  return {
    currency,
    isLoading,
    fetchCurrency,
    handleSort,
    buttonTitle,
    buttonColor,
  };
};
