import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoldButton from "../../components/GoldButton";
import { Colors } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCart } from "../../store/slices/cartSlice";
import { createOrder } from "../../store/slices/ordersSlice";

const CheckoutScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((s) => s.cart);
  const userEmail = useAppSelector((s) => s.auth.user?.email) || "";
  const loading = useAppSelector((s) => s.orders.loading);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Safe payment metadata only (never store full card numbers)
  const [cardLast4, setCardLast4] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

  const canPlace = useMemo(() => items.length > 0 && total > 0, [items.length, total]);

  const onPlaceOrder = async () => {
    if (!canPlace) {
      Alert.alert("Cart is empty", "Please add items to your cart before checkout.");
      return;
    }

    const payload = {
      customer_name: name || userEmail || "Guest",
      customer_phone: phone || null,
      notes: notes || null,
      payment_last4: cardLast4 || null,
      payment_exp_month: expMonth ? Number(expMonth) : null,
      payment_exp_year: expYear ? Number(expYear) : null,
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        qty: it.quantity,
        price: it.price,
      })),
      total,
      type: "takeout" as const,
    };

    const res = await dispatch(createOrder(payload));
    if (createOrder.fulfilled.match(res)) {
      dispatch(clearCart());
      Alert.alert("Order placed", "Your order has been placed successfully.", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
            navigation.navigate("Tracking");
          },
        },
      ]);
    } else {
      Alert.alert("Checkout failed", (res.payload as string) || "Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Checkout</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {items.map((it) => (
            <View key={it.id} style={styles.row}>
              <Text style={styles.text}>
                {it.name} x {it.quantity}
              </Text>
              <Text style={styles.text}>R{(it.price * it.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor="#777"
            style={styles.input}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes (optional)"
            placeholderTextColor="#777"
            style={[styles.input, { height: 90, textAlignVertical: "top" }]}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment (optional)</Text>
          <Text style={styles.helper}>
            We do not store full card numbers. Only last 4 digits and expiry are saved.
          </Text>
          <TextInput
            value={cardLast4}
            onChangeText={(t) => setCardLast4(t.replace(/\D/g, "").slice(0, 4))}
            placeholder="Card last 4"
            placeholderTextColor="#777"
            keyboardType="number-pad"
            style={styles.input}
          />
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TextInput
              value={expMonth}
              onChangeText={(t) => setExpMonth(t.replace(/\D/g, "").slice(0, 2))}
              placeholder="MM"
              placeholderTextColor="#777"
              keyboardType="number-pad"
              style={[styles.input, { flex: 1 }]}
            />
            <TextInput
              value={expYear}
              onChangeText={(t) => setExpYear(t.replace(/\D/g, "").slice(0, 4))}
              placeholder="YYYY"
              placeholderTextColor="#777"
              keyboardType="number-pad"
              style={[styles.input, { flex: 1 }]}
            />
          </View>
        </View>

        <GoldButton
          title={loading ? "Placing order..." : "Place Order"}
          onPress={onPlaceOrder}
          disabled={!canPlace || loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { padding: 16, paddingBottom: 28 },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  section: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  sectionTitle: { color: Colors.primary, fontWeight: "bold", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  text: { color: Colors.text },
  totalLabel: { color: Colors.text, fontWeight: "600" },
  totalValue: { color: Colors.primary, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#000",
    color: Colors.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  helper: { color: Colors.text, opacity: 0.7, marginBottom: 10 },
});

export default CheckoutScreen;
