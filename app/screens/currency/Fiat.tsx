import React, { FC } from "react";
import { View, Text, Image } from "react-native";
import { gStyles } from "../../../style";
import { AppConstants } from "../../app.constants";
import type { ICurrencyProps } from "./currency.types";

export const Fiat: FC<ICurrencyProps> = ({ name, rate, imageUrl, symbol }) => {
  const isUSD = name === "USD";
  return (
    <View
      style={[
        gStyles.fiatsCard,
        isUSD ? { borderColor: AppConstants.white, borderWidth: 1 } : {},
      ]}
    >
      <View style={gStyles.fiatsIcon}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{ uri: imageUrl }}
        />
      </View>
      <View style={[gStyles.fiatsInfoWrapper]}>
        <Text style={[gStyles.fiatsInfo, { color: AppConstants.peach }]}>
          {name}
        </Text>
      </View>
      <View style={gStyles.fiatsInfoWrapper}>
        <Text style={[gStyles.fiatsInfo, { color: AppConstants.white }]}>
          {symbol}
        </Text>
      </View>
      <View style={gStyles.fiatsInfoWrapper}>
        <Text style={[gStyles.fiatsInfo, { color: AppConstants.mint }]}>
          {rate.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
