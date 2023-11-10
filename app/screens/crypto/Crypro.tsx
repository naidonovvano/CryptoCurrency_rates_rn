import React, { FC } from "react";
import { gStyles } from "../../../style";
import { View, Button, ScrollView } from "react-native";
import { Coin } from "./Coin";
import { AppConstants } from "../../app.constants";
import { Loader } from "../../ui/Loader";
import { useFetchCrypto } from "./useFetchCrypto";
import { CryptoHeader } from "./CryptoHeader";

export const Crypto: FC = () => {
  const {
    isLoading,
    cryptos,
    fiats,
    selectedFiat,
    setSelectedFiat,
    goBack,
    page,
    totalPages,
    loadItems,
  } = useFetchCrypto();

  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView style={gStyles.container}>
      <CryptoHeader
        fiats={fiats}
        selectedFiat={selectedFiat}
        setSelectedFiat={setSelectedFiat}
      />
      <View style={gStyles.cryptoContainer}>
        {cryptos.map((item) => (
          <Coin
            key={item.id}
            name={item.name}
            price={item.price}
            icon={item.icon}
            symbol={item.symbol}
            priceChange1h={item.priceChange1h}
          />
        ))}
      </View>
      <View style={gStyles.bottomButtons}>
        <Button
          title="Back"
          color={AppConstants.peach}
          onPress={goBack}
          disabled={page === 1}
        />
        <Button
          title="Next"
          color={AppConstants.peach}
          onPress={loadItems}
          disabled={page === totalPages}
        />
      </View>
    </ScrollView>
  );
};
