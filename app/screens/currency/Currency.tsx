import React, { FC } from "react";
import { gStyles } from "../../../style";
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import uuid from "react-native-uuid";
import { Fiat } from "./Fiat";
import { useFetchCurrency } from "./useFetchCurrency";
import { Loader } from "../../ui/Loader";
import { CurrencyHeader } from "./CurrencyHeader";

export const Currency: FC = () => {
  const {
    currency,
    isLoading,
    fetchCurrency,
    handleSort,
    buttonTitle,
    buttonColor,
  } = useFetchCurrency();

  return isLoading ? (
    <Loader />
  ) : (
    <View style={gStyles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchCurrency} />
        }
        data={currency}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CurrencyHeader
            handleSort={handleSort}
            buttonTitle={buttonTitle}
            buttonColor={buttonColor}
          />
        }
        ListFooterComponent={
          <View>
            <ActivityIndicator size="large" />
          </View>
        }
        ListFooterComponentStyle={{ marginVertical: 16, alignItems: "center" }}
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
