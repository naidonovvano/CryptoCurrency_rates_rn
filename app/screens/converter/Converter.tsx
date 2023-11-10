import React, { FC } from "react";
import { View, Text } from "react-native";
import { gStyles } from "../../../style";
import { AppConstants } from "../../app.constants";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import type { IResult } from "./converter.types";
import { useFetchMarket } from "../market/useFetchMarket";
import { useFetchCrypto } from "../crypto/useFetchCrypto";
import { Loader } from "../../ui/Loader";
import { useFetchResult } from "./useFetchResult";

export const Converter: FC = () => {
  const { exchangeUpperCase, coinSymbol } = useFetchMarket();
  const { fiats } = useFetchCrypto();
  const {
    isLoading,
    result,
    selectedFrom,
    setSelectedFrom,
    selectedTo,
    setSelectedTo,
    selectedExchange,
    setSelectedExchange,
  } = useFetchResult();

  return isLoading ? (
    <Loader />
  ) : (
    <View style={gStyles.converterContainer}>
      <Text style={[gStyles.mainText, { padding: 0, margin: 0 }]}>
        Converter
      </Text>
      <View style={gStyles.converterWrapper}>
        <View style={gStyles.converterBlock}>
          <View>
            <Text style={gStyles.converterText}>From</Text>
            <SelectList
              setSelected={(val: string) => setSelectedFrom(val)}
              data={coinSymbol}
              placeholder={"From crypto coin..."}
              boxStyles={{ backgroundColor: AppConstants.primary, height: 50 }}
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
          <View style={{ display: selectedFrom === "" ? "none" : "flex" }}>
            <Text style={gStyles.converterText}>To</Text>
            <SelectList
              setSelected={(val: string) => setSelectedTo(val)}
              data={fiats}
              placeholder={"To fiat currency..."}
              boxStyles={{ backgroundColor: AppConstants.primary, height: 50 }}
              inputStyles={gStyles.pickerInput}
              search={false}
              dropdownStyles={{
                backgroundColor: AppConstants.primary,
                zIndex: 10,
              }}
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
          <View style={{ display: selectedTo === "" ? "none" : "flex" }}>
            <Text style={gStyles.converterText}>Exchange</Text>
            <SelectList
              setSelected={(val: string) => setSelectedExchange(val)}
              data={exchangeUpperCase}
              placeholder={"Select exchange..."}
              boxStyles={{ backgroundColor: AppConstants.primary, height: 50 }}
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
        <View
          style={[
            gStyles.converterBlock,
            {
              height: "20%",
              display: selectedExchange === "" ? "none" : "flex",
            },
          ]}
        >
          {result.map((item: IResult, index) => (
            <View style={gStyles.resultBlock} key={index}>
              <View style={gStyles.resultSection}>
                <Text style={gStyles.converterText}>{item.from}</Text>
                <Text style={gStyles.converterText}>{item.to}</Text>
              </View>
              <View style={gStyles.resultSection}>
                <Text style={gStyles.resultText}>{item.exchange}</Text>
                <Text style={gStyles.resultText}>{item.price?.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
