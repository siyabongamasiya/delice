import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

interface OrderCardProps {
  trackingCode: string;
  status: string;
  type: "takeout" | "reservation";
  date: string;
  time: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  trackingCode,
  status,
  type,
  date,
  time,
}) => (
  <View style={styles.card}>
    <Text style={styles.code}>Tracking: {trackingCode}</Text>
    <Text style={styles.status}>Status: {status}</Text>
    <Text style={styles.type}>Type: {type}</Text>
    <Text style={styles.datetime}>
      {date} {time}
    </Text>
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
  code: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    color: Colors.text,
    marginTop: 4,
  },
  type: {
    color: Colors.text,
    marginTop: 4,
  },
  datetime: {
    color: Colors.text,
    marginTop: 4,
    fontSize: 12,
  },
});

export default OrderCard;
