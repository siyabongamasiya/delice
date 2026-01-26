import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartItem from "../../components/CartItem";
import GoldButton from "../../components/GoldButton";
import { Colors } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../store/slices/cartSlice";

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((s) => s.cart);
  const insets = useSafeAreaInsets();

  const increment = (id: string, qty: number) =>
    dispatch(updateQuantity({ id, quantity: qty + 1 }));
  const decrement = (id: string, qty: number) =>
    dispatch(updateQuantity({ id, quantity: Math.max(1, qty - 1) }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <CartItem
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              imageUrl={item.imageUrl}
              category={item.category}
            />
            <View style={styles.controls}>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.outline]}
                onPress={() => decrement(item.id, item.quantity)}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => increment(item.id, item.quantity)}
              >
                <Text style={[styles.qtyText, { color: "#000" }]}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.remove}
                onPress={() => dispatch(removeFromCart(item.id))}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>Your cart is empty</Text>
        )}
        contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}
      />

      <View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => dispatch(clearCart())}
            style={styles.clearBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.clearBtnText}>Clear Cart</Text>
          </TouchableOpacity>
          <View style={{ width: 12 }} />
          <GoldButton title="Checkout" onPress={() => {}} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    alignSelf: "center",
  },
  itemRow: {
    marginBottom: 8,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  qtyBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  qtyText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  remove: {
    marginLeft: "auto",
  },
  removeText: {
    color: Colors.error,
    fontWeight: "600",
  },
  empty: {
    color: Colors.text,
    opacity: 0.8,
    textAlign: "center",
    marginTop: 24,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  totalLabel: {
    color: Colors.text,
    fontSize: 16,
  },
  totalValue: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearBtn: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearBtnText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartScreen;
