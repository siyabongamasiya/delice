import React from "react";
import { SafeAreaView, StyleSheet, ViewProps } from "react-native";

const SafeAreaWrapper: React.FC<ViewProps> = ({
  children,
  style,
  ...props
}) => (
  <SafeAreaView style={[styles.safe, style]} {...props}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default SafeAreaWrapper;
