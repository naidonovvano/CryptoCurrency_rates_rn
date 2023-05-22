import React, { FC, useState, useEffect } from "react";
import {
  useNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { BottomMenu } from "../ui/BottomMenu/BottomMenu";
import { View } from "react-native";
import { gStyles } from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "./navigation.types";
import { routes } from "./routes";
import { AppConstants } from "../app.constants";

export const Navigation: FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    undefined
  );
  const navRef = useNavigationContainerRef();
  const Stack = createNativeStackNavigator<TypeRootStackParamList>();

  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name);
    const listener = navRef.addListener("state", () =>
      setCurrentRoute(navRef.getCurrentRoute()?.name)
    );
    return () => {
      navRef.removeListener("state", listener);
    };
  }, []);

  return (
    <View style={gStyles.container}>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: AppConstants.black,
              backfaceVisibility: "hidden",
            },
          }}
        >
          {routes.map((route) => (
            <Stack.Screen key={route.name} {...route} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
      {currentRoute && (
        <BottomMenu navigation={navRef.navigate} currentRoute={currentRoute} />
      )}
    </View>
  );
};
