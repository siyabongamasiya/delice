import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

const fakeOrder: {
  code: string;
  type: "takeout" | "reservation";
  status: OrderStatus;
  items: { id: string; name: string; qty: number; price: number }[];
  total: number;
  pickupTime?: string;
} = {
  code: "408",
  type: "takeout" as const,
  status: "confirmed" as const,
  items: [
    { id: "meal-1", name: "Grilled Chicken", qty: 1, price: 129.99 },
    { id: "drink-1", name: "Iced Latte", qty: 2, price: 38.0 },
  ],
  total: 205.99,
  pickupTime: "18:30",
};

const statusLabel: Record<OrderStatus, string> = {
  pending: "Your order is being prepared",
  confirmed: "Your order is ready for pickup",
  completed: "Thank you for your order",
  cancelled: "Your order has been cancelled",
};

const steps: OrderStatus[] = ["pending", "confirmed", "completed"];

const OrderTrackingScreen = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<typeof fakeOrder | null>(null);

  const onTrack = () => {
    // Fake: show order if code matches, else show a dummy pending order
    if (code.trim() === fakeOrder.code) setResult(fakeOrder);
    else
      setResult({
        ...fakeOrder,
        code: code.trim() || "000",
        status: "pending",
      });
  };

  const activeIndex = result ? steps.indexOf(result.status) : -1;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Text style={styles.title}>Track your order</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter 3-digit code"
          placeholderTextColor="#888"
          value={code}
          onChangeText={setCode}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={3}
        />
        <TouchableOpacity style={styles.trackBtn} onPress={onTrack}>
          <Text style={styles.trackText}>Track</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.card}>
          <Text style={styles.code}>Code: {result.code}</Text>
          <Text style={styles.status}>{statusLabel[result.status]}</Text>

          <View style={styles.timeline}>
            {steps.map((s, i) => (
              <View key={s} style={styles.step}>
                <View
                  style={[
                    styles.bullet,
                    i <= activeIndex ? styles.bulletActive : undefined,
                  ]}
                />
                <Text style={styles.stepLabel}>{s}</Text>
                {i < steps.length - 1 && <View style={styles.connector} />}
              </View>
            ))}
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Items</Text>
          {result.items.map((it) => (
            <View key={it.id} style={styles.itemRow}>
              <Text style={styles.itemText}>
                {it.name} x {it.qty}
              </Text>
              <Text style={styles.itemText}>
                R{(it.qty * it.price).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.itemRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R{result.total.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    justifyContent: "center",
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 16,
  },
  inputRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  input: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    color: Colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  trackBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  trackText: { color: "#000", fontWeight: "bold" },
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
  },
  code: { color: Colors.text, opacity: 0.9, marginBottom: 6 },
  status: { color: Colors.primary, fontWeight: "bold", marginBottom: 12 },
  timeline: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  step: { flexDirection: "row", alignItems: "center" },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginRight: 6,
  },
  bulletActive: { backgroundColor: Colors.primary },
  stepLabel: {
    color: Colors.text,
    marginRight: 6,
    textTransform: "capitalize",
  },
  connector: {
    width: 24,
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  sectionTitle: { color: Colors.primary, fontWeight: "bold", marginBottom: 8 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemText: { color: Colors.text },
  totalLabel: { color: Colors.text, fontWeight: "600" },
  totalValue: { color: Colors.primary, fontWeight: "bold" },
});

export default OrderTrackingScreen;
