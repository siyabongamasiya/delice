import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAppSelector } from "../store/hooks";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const token = useAppSelector((s) => s.auth.token);
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <RootStack.Screen name="App" component={AppStack} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
