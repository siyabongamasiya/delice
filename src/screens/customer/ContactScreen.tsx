import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

const details = {
  name: "Delice",
  address: "123 Luxury Ave, Sandton, Johannesburg",
  phone: "+27 11 555 1234",
  email: "reservations@delice.co.za",
  weekdayHours: "Mon-Fri: 10:00 - 22:00",
  weekendHours: "Sat-Sun: 09:00 - 23:00",
  mapsQuery: "https://www.google.com/maps/search/?api=1&query=Delice+Sandton",
};

const ContactScreen = () => {
  const call = () => Linking.openURL(`tel:${details.phone}`);
  const email = () => Linking.openURL(`mailto:${details.email}`);
  const openMaps = () => Linking.openURL(details.mapsQuery);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Restaurant</Text>
        <Text style={styles.value}>{details.name}</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Address</Text>
        <Text style={styles.value}>{details.address}</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Hours</Text>
        <Text style={styles.value}>{details.weekdayHours}</Text>
        <Text style={styles.value}>{details.weekendHours}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={call}>
            <Ionicons name="call-outline" size={18} color="#000" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={email}>
            <Ionicons name="mail-outline" size={18} color="#000" />
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={openMaps}>
            <Ionicons name="map-outline" size={18} color="#000" />
            <Text style={styles.actionText}>Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
  },
  label: { color: Colors.primary, fontWeight: "bold" },
  value: { color: Colors.text, marginTop: 2 },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: { color: "#000", fontWeight: "bold" },
});

export default ContactScreen;
