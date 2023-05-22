import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { gStyles } from "../../../style";
import { routes } from "../../navigation/routes";
import { IMain } from "./main.types";

export const Main: FC<IMain> = ({ navigation }) => {
  return (
    <View style={gStyles.mainContainer}>
      <Text style={gStyles.mainText}>Overview</Text>
      <View style={gStyles.sections}>
        {routes.slice(1).map((route) => (
          <TouchableOpacity
            style={gStyles.mainSection}
            key={route.name}
            onPress={() => navigation.navigate(route.name)}
          >
            <Text style={gStyles.sectionPrimaryText}>{route.name}</Text>
            <Text style={gStyles.sectionSecondaryText}>
              {route.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
