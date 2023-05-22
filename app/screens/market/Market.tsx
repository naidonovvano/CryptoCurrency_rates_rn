import React, { FC, useState, useEffect } from "react";
import { gStyles } from "../../../style";
import uuid from "react-native-uuid";
import { FlatList, Text, RefreshControl, View } from "react-native";
import { MarketSection } from "./MarketSection";
import { IMarket, ICoin } from "./market.types";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { AppConstants } from "../../app.constants";

export const Market: FC = () => {
  const [markets, setMarkets] = useState<IMarket[]>([]);
  const [coins, setCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  useEffect(() => {
    fetchCoins();
    fetchMarket(selectedCoin);
  }, [selectedCoin]);

  const fetchMarket = async (coin: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/markets?coinId=${coin}`
      );
      const json = await response.json();
      setMarkets(json);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoins = async () => {
    try {
      const response = await fetch(`https://api.coinstats.app/public/v1/coins`);
      const json = await response.json();
      const coins = json.coins.map((coin: ICoin) => coin.id);
      setCoin(coins);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const Header = () => {
    return (
      <View>
        <Text style={gStyles.mainText}>Market prices</Text>
        <View style={gStyles.pickerContainer}>
          <View style={gStyles.pickerLabel}>
            <Text style={gStyles.pickerText}>Selected crypto coin base:</Text>
            <Text style={gStyles.pickerValue}>{selectedCoin}</Text>
          </View>
          <SelectList
            setSelected={(val: string) => setSelectedCoin(val)}
            data={coins}
            placeholder={"Select crypto coin..."}
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
            onRefresh={() => fetchMarket(selectedCoin)}
          />
        }
        data={markets}
        ListHeaderComponent={<Header />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MarketSection
            key={uuid.v4().toString()}
            price={item.price}
            exchange={item.exchange}
            pair={item.pair}
            volume={item.volume}
          />
        )}
      />
    </View>
  );
};
