import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

const items = [
  {
    id: "meal-1",
    name: "Grilled Chicken",
    price: 129.99,
    available: true,
    category: "meals",
  },
  {
    id: "meal-2",
    name: "Beef Burger",
    price: 109.5,
    available: true,
    category: "meals",
  },
  {
    id: "drink-1",
    name: "Iced Latte",
    price: 38.0,
    available: true,
    category: "drinks",
  },
  {
    id: "drink-2",
    name: "Sparkling Water",
    price: 22.0,
    available: false,
    category: "drinks",
  },
];

const AdminMenuItemsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Items</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[styles.row, !item.available && { opacity: 0.6 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.category} • R{item.price.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity style={styles.tag} activeOpacity={0.8}>
              <Text style={styles.tagText}>
                {item.available ? "Available" : "Hidden"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
        <Text style={styles.addText}>+ Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  title: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  name: { color: Colors.text, fontWeight: "bold", fontSize: 16 },
  meta: { color: Colors.text, opacity: 0.85, marginTop: 2 },
  tag: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: { color: Colors.primary, fontWeight: "600" },
  addBtn: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: Colors.primary,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addText: { color: "#000", fontWeight: "bold" },
});

export default AdminMenuItemsScreen;
