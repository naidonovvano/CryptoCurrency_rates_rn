import React, { FC, useState, useEffect } from "react";
import { gStyles } from "../../../style";
import {
  FlatList,
  Text,
  RefreshControl,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import uuid from "react-native-uuid";
import { Fiat } from "./Fiat";
import { ICurrency } from "./currency.types";
import { AppConstants } from "../../app.constants";

export const Currency: FC = () => {
  const [page, setPage] = useState(0);
  const [currency, setCurrency] = useState<ICurrency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortByRate, setSortByRate] = useState(true);
  const [buttonTitle, setButtonTitle] = useState("rate");
  const [buttonColor, setButtonColor] = useState(AppConstants.mint);

  useEffect(() => {
    fetchCurrency(page);
  }, [page]);

  const fetchCurrency = async (skip: number): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/fiats?skip=${skip}&limit=1`
      );
      const json = await response.json();
      setCurrency([...currency, ...json]);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const loadItems = () => {
    setPage((prev) => prev + 1);
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

  const Header = () => {
    return (
      <View>
        <Text style={gStyles.mainText}>Сurrency rates</Text>
        <Pressable
          style={[gStyles.sortButton, { backgroundColor: buttonColor }]}
          onPress={handleSort}
        >
          <Text style={gStyles.sortButtonText}>Sort by {buttonTitle}</Text>
        </Pressable>
      </View>
    );
  };

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={gStyles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => fetchCurrency(0)}
          />
        }
        data={currency}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header />}
        ListFooterComponent={
          <View>
            <ActivityIndicator size="large" />
          </View>
        }
        ListFooterComponentStyle={{ marginVertical: 16, alignItems: "center" }}
        onEndReached={loadItems}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <Fiat
            key={uuid.v4().toString()}
            name={item.name}
            rate={item.rate}
            imageUrl={item.imageUrl}
            symbol={item.symbol}
          />
        )}
      />
    </View>
  );
};
