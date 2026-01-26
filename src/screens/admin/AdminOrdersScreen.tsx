import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

const ORDERS = [
  { id: "ord-1012", customer: "Lindiwe M.", total: 320.0, status: "ready" },
  { id: "ord-1011", customer: "Sam K.", total: 145.5, status: "pending" },
  { id: "ord-1010", customer: "John D.", total: 189.99, status: "ready" },
  { id: "ord-1009", customer: "Nomsa K.", total: 98.5, status: "confirmed" },
  { id: "ord-1008", customer: "Peter S.", total: 256.0, status: "cancelled" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "ready", label: "Ready" },
  { key: "cancelled", label: "Cancelled" },
] as const;

type StatusKey = (typeof FILTERS)[number]["key"];

const AdminOrdersScreen = () => {
  const [filter, setFilter] = useState<StatusKey>("all");

  const data = useMemo(() => {
    if (filter === "all") return ORDERS;
    return ORDERS.filter((o) => o.status === filter);
  }, [filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={[styles.chip, filter === f.key && styles.chipActive]}
          >
            <Text
              style={[
                styles.chipText,
                filter === f.key && styles.chipTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(o) => o.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.id}>#{item.id}</Text>
            <Text style={styles.text}>{item.customer}</Text>
            <Text style={styles.text}>R{item.total.toFixed(2)}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
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
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  chip: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Colors.card,
  },
  chipActive: { borderColor: Colors.primary },
  chipText: { color: Colors.text },
  chipTextActive: { color: Colors.primary, fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  id: { color: Colors.text, fontWeight: "bold" },
  text: { color: Colors.text },
  status: { color: Colors.primary, fontWeight: "600" },
});

export default AdminOrdersScreen;
