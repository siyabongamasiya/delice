import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({
  name,
  description,
  price,
  imageUrl,
  available,
}) => (
  <View style={[styles.card, !available && styles.unavailable]}>
    <Image source={{ uri: imageUrl }} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.price}>R{price.toFixed(2)}</Text>
    {!available && <Text style={styles.unavailableText}>Unavailable</Text>}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unavailable: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: Colors.muted,
  },
  name: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: Colors.text,
    fontSize: 14,
    marginVertical: 4,
  },
  price: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  unavailableText: {
    color: Colors.error,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default MenuCard;
