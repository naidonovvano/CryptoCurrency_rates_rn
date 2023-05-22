import React, { FC } from "react";
import { View, Text } from "react-native";
import { gStyles } from "../../../style";
import { AppConstants } from "../../app.constants";
import { IMarketProps } from "./market.types";

export const MarketSection: FC<IMarketProps> = ({
  price,
  exchange,
  pair,
  volume,
}) => {
  return (
    <View style={gStyles.marketSection}>
      <View style={gStyles.marketInfo}>
        <Text style={gStyles.marketText}>{exchange}</Text>
        <Text style={{ color: AppConstants.mint }}>{pair}</Text>
      </View>
      <View style={gStyles.marketInfo}>
        <Text style={gStyles.marketText}>Price: </Text>
        <Text style={gStyles.marketText}>Volume: </Text>
      </View>
      <View style={gStyles.marketValue}>
        <Text style={[gStyles.marketText, { color: AppConstants.white }]}>
          {price.toFixed(2)}
        </Text>
        <Text style={[gStyles.marketText, { color: AppConstants.mint }]}>
          {volume.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
