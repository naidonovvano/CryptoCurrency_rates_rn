import React, { FC } from "react";
import { View, Text, Image } from "react-native";
import { gStyles } from "../../../style";
import { AppConstants } from "../../app.constants";
import type { ICryptoProps } from "./crypto.types";

export const Coin: FC<ICryptoProps> = ({
  name,
  price,
  icon,
  symbol,
  priceChange1h,
}) => {
  return (
    <View style={gStyles.coinsCard}>
      <View style={gStyles.coinsSection}>
        <Text style={[gStyles.coinsText, { color: AppConstants.peach }]}>
          {name}
        </Text>
        <View style={gStyles.coinsIcon}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{ uri: icon }}
          />
        </View>
      </View>
      <View style={gStyles.coinsSection}>
        <Text style={[gStyles.coinsText, { color: AppConstants.peach }]}>
          {symbol}
        </Text>
        <Text
          style={[
            gStyles.coinsPriceChange,
            priceChange1h > 0 ? gStyles.coinsPriceUp : gStyles.coinsPriceDown,
          ]}
        >
          {priceChange1h}
        </Text>
      </View>
      <View
        style={[
          gStyles.coinsSection,
          {
            justifyContent: "center",
            backgroundColor: AppConstants.primary_dark,
            borderRadius: 30,
          },
        ]}
      >
        <Text style={gStyles.coinsPrice}>{price.toFixed(4)}</Text>
      </View>
    </View>
  );
};
