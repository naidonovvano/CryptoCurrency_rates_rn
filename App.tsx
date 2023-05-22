import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Navigation } from "./app/navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { gStyles } from "./style";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Arimo: require("./assets/font/Arimo.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaProvider style={gStyles.safeAreaContainer} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <Navigation />
    </SafeAreaProvider>
  );
}
