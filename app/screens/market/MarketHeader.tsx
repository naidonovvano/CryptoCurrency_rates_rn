import React, { FC } from "react";
import { gStyles } from "../../../style";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { AppConstants } from "../../app.constants";
import type { IMarketHeaderProps } from "./market.types";

export const MarketHeader: FC<IMarketHeaderProps> = ({
  exchanges,
  coins,
  selectedExchange,
  selectedCoin,
  setSelectedExchange,
  setSelectedCoin,
}) => {
  return (
    <View>
      <Text style={gStyles.mainText}>Market prices</Text>
      <View style={gStyles.pickerContainer}>
        <View style={gStyles.pickerLabel}>
          <Text style={gStyles.pickerText}>Selected exchange base:</Text>
          <Text style={gStyles.pickerValue}>{selectedExchange}</Text>
        </View>
        <SelectList
          setSelected={(val: string) => setSelectedExchange(val)}
          data={exchanges}
          placeholder={"Select exchange..."}
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
      <View style={gStyles.pickerContainer}>
        <View style={gStyles.pickerLabel}>
          <Text style={gStyles.pickerText}>Selected coin base:</Text>
          <Text style={gStyles.pickerValue}>{selectedCoin}</Text>
        </View>
        <SelectList
          setSelected={(val: string) => setSelectedCoin(val)}
          data={coins}
          placeholder={"Select coin..."}
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
