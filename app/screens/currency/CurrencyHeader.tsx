import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import { gStyles } from "../../../style";
import type { ICurrencyHeaderProps } from "./currency.types";

export const CurrencyHeader: FC<ICurrencyHeaderProps> = ({
  handleSort,
  buttonTitle,
  buttonColor,
}) => {
  return (
    <View>
      <Text style={gStyles.mainText}>Сurrency rates to USD</Text>
      <Pressable
        style={[gStyles.sortButton, { backgroundColor: buttonColor }]}
        onPress={handleSort}
      >
        <Text style={gStyles.sortButtonText}>Sort by {buttonTitle}</Text>
      </Pressable>
    </View>
  );
};
