import React, { FC, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { gStyles } from "../../../style";
import type { ICoin } from "../market/market.types";
import { AppConstants } from "../../app.constants";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import type { IResult } from "./converter.types";

export const Converter: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoin] = useState([]);
  const [fiats, setFiats] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchCoins();
    if (selectedFrom !== "") fetchFiats();
    if (selectedTo !== "") fetchExchanges();
    if (selectedFrom !== "" && selectedTo !== "" && selectedExchange !== "")
      getResult(selectedFrom, selectedTo, selectedExchange);
  }, [selectedFrom, selectedTo, selectedExchange]);

  const fetchCoins = async () => {
    try {
      const response = await fetch(`https://api.coinstats.app/public/v1/coins`);
      const json = await response.json();
      const coins = json.coins.map((coin: ICoin) => coin.symbol);
      setCoin(coins);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchFiats = async () => {
    try {
      const response = await fetch(`https://api.coinstats.app/public/v1/fiats`);
      const json = await response.json();
      const names = json.map((fiat: { name: string }) => fiat.name);
      setFiats(names);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchExchanges = async () => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/exchanges`
      );
      const json = await response.json();
      const exchanges = json.supportedExchanges.map((item: string) =>
        item.toLowerCase()
      );
      setExchanges(exchanges);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };
  const getResult = async (
    from: string,
    to: string,
    exchange: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/tickers?exchange=${exchange}&pair=${from}-${to}`
      );
      const json = await response.json();
      setResult(json.tickers);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Text>Loading...</Text>
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
              data={coins}
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
              data={exchanges}
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
