import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Colors } from "./src/constants/colors";
import linking from "./src/navigation/linking";
import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/store/store";

export default function App() {
  const darkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      primary: Colors.primary,
      background: Colors.background,
      card: Colors.card,
      text: Colors.text,
      border: Colors.border,
      notification: Colors.primary,
    },
  };
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer linking={linking} theme={darkTheme}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
