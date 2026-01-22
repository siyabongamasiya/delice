import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  quantity,
  imageUrl,
  category,
}) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUrl }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.price}>
        R{price.toFixed(2)} x {quantity}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: Colors.muted,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  category: {
    color: Colors.primary,
    fontSize: 12,
    marginVertical: 2,
  },
  price: {
    color: Colors.text,
    fontSize: 14,
    marginTop: 2,
  },
});

export default CartItem;
