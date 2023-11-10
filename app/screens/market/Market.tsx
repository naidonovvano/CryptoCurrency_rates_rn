import React, { FC } from "react";
import { gStyles } from "../../../style";
import uuid from "react-native-uuid";
import { FlatList, RefreshControl, View } from "react-native";
import { MarketSection } from "./MarketSection";
import { useFetchMarket } from "./useFetchMarket";
import { MarketHeader } from "./MarketHeader";
import { Loader } from "../../ui/Loader";

export const Market: FC = () => {
  const {
    isLoading,
    exchanges,
    coins,
    markets,
    fetchMarket,
    selectedExchange,
    selectedCoin,
    setSelectedExchange,
    setSelectedCoin,
  } = useFetchMarket();

  return isLoading ? (
    <Loader />
  ) : (
    <View style={gStyles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => fetchMarket(selectedExchange, selectedCoin)}
          />
        }
        data={markets}
        ListHeaderComponent={
          <MarketHeader
            coins={coins}
            exchanges={exchanges}
            selectedExchange={selectedExchange}
            selectedCoin={selectedCoin}
            setSelectedExchange={setSelectedExchange}
            setSelectedCoin={setSelectedCoin}
          />
        }
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
