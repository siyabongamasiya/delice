import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
