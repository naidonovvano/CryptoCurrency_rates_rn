import React, { FC } from "react";
import { gStyles } from "../../../style";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { AppConstants } from "../../app.constants";
import type { ICryptoHeaderProps } from "./crypto.types";

export const CryptoHeader: FC<ICryptoHeaderProps> = ({
  fiats,
  selectedFiat,
  setSelectedFiat,
}) => {
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
