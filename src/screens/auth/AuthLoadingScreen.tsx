import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      // @ts-ignore
      navigation.reset({ index: 0, routes: [{ name: "App" }] });
    } else {
      // @ts-ignore
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D4AF37" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default AuthLoadingScreen;
