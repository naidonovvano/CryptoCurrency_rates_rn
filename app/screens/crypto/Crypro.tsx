import React, { FC, useState, useEffect } from "react";
import { gStyles } from "../../../style";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Text,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { Coin } from "./Coin";
import type { ICrypto, IFiat } from "./crypto.types";
import { AppConstants } from "../../app.constants";
import { SelectList } from "react-native-dropdown-select-list";

export const Crypto: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [cryptos, setCryptos] = useState<ICrypto[]>([]);
  const [fiats, setFiats] = useState([]);
  const [selectedFiat, setSelectedFiat] = useState("USD");

  useEffect(() => {
    fetchFiats();
    fetchCryptos(page, selectedFiat);
  }, [page, selectedFiat]);

  const fetchCryptos = async (
    skip: number,
    currency: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=10&currency=${currency}`
      );
      const json = await response.json();
      setCryptos([...json.coins]);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFiats = async () => {
    try {
      const response = await fetch(`https://api.coinstats.app/public/v1/fiats`);
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
    setPage((prev) => prev + 1);
  };

  const Header = () => {
    return (
      <View>
        <Text style={gStyles.mainText}>Сryptocurrency rates</Text>
        <View style={gStyles.pickerContainer}>
          <View style={gStyles.pickerLabel}>
            <Text style={gStyles.pickerText}>Selected currency base:</Text>
            <Text style={gStyles.pickerValue}>{selectedFiat}</Text>
          </View>
          <SelectList
            setSelected={(val: string) => setSelectedFiat(val)}
            data={fiats}
            placeholder={"Select currency..."}
            boxStyles={{ backgroundColor: AppConstants.primary }}
            inputStyles={gStyles.pickerInput}
            search={false}
            dropdownStyles={{ backgroundColor: AppConstants.primary }}
            dropdownTextStyles={{ color: AppConstants.white }}
            arrowicon={
              <Ionicons
                name="caret-down-outline"
                size={24}
                color={AppConstants.white}
              />
            }
            searchicon={
              <Ionicons
                name="md-search-outline"
                size={22}
                color={AppConstants.white}
              />
            }
            closeicon={
              <Ionicons
                name="md-close-outline"
                size={26}
                color={AppConstants.white}
              />
            }
          />
        </View>
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
            onRefresh={() => fetchCryptos(0, selectedFiat)}
          />
        }
        data={cryptos}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id + Math.random()}
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
          <Coin
            key={item.id}
            name={item.name}
            price={item.price}
            icon={item.icon}
            symbol={item.symbol}
            priceChange1h={item.priceChange1h}
          />
        )}
      />
    </View>
  );
};
