import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GoldButton from "../../components/GoldButton";
import { Colors } from "../../constants/colors";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
        }}
        style={styles.heroBg}
        imageStyle={{ opacity: 0.35 }}
      >
        <View style={styles.heroContent}>
          <Text style={styles.brand}>Delice</Text>
          <Text style={styles.tagline}>Fine dining. Luxury experience.</Text>
          <Text style={styles.description}>
            Experience the rich flavors of South African cuisine in an elegant,
            modern setting. Fresh ingredients, masterful techniques, and
            impeccable service.
          </Text>
          <View style={styles.ctaRow}>
            <GoldButton
              title="View Menu"
              onPress={() => navigation.navigate("Menu")}
              style={styles.ctaPrimary}
            />
            <TouchableOpacity
              style={styles.ctaOutline}
              onPress={() => navigation.navigate("Tracking")}
            >
              <Text style={styles.ctaOutlineText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.features}>
        <View style={styles.card}>
          <Ionicons
            name="restaurant-outline"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.cardTitle}>Gourmet Menu</Text>
          <Text style={styles.cardText}>
            Curated meals and drinks crafted to perfection.
          </Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="time-outline" size={24} color={Colors.primary} />
          <Text style={styles.cardTitle}>Fast Takeout</Text>
          <Text style={styles.cardText}>
            Order ahead and pick up at your convenience.
          </Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
          <Text style={styles.cardTitle}>Reservations</Text>
          <Text style={styles.cardText}>
            Secure your table for a seamless evening.
          </Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <GoldButton
          title="Make an Order"
          onPress={() => navigation.navigate("Menu")}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Operating Hours</Text>
        <Text style={styles.infoText}>Mon-Fri: 10:00 - 22:00</Text>
        <Text style={styles.infoText}>Sat-Sun: 09:00 - 23:00</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { padding: 16, paddingBottom: 32 },
  heroBg: {
    height: 240,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    backgroundColor: Colors.card,
  },
  heroContent: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  brand: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  tagline: {
    color: Colors.text,
    opacity: 0.85,
    marginTop: 8,
    marginBottom: 8,
  },
  description: {
    color: Colors.text,
    opacity: 0.9,
    marginBottom: 16,
  },
  ctaRow: { flexDirection: "row", gap: 12 },
  ctaPrimary: { minWidth: 140 },
  ctaOutline: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  ctaOutlineText: { color: Colors.primary, fontWeight: "bold" },
  features: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: { color: Colors.primary, fontWeight: "bold", marginTop: 8 },
  cardText: { color: Colors.text, opacity: 0.9, marginTop: 4 },
  actionsRow: { marginTop: 20, flexDirection: "row", gap: 12 },
  infoSection: {
    marginTop: 24,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: { color: Colors.primary, fontWeight: "bold", marginBottom: 8 },
  infoText: { color: Colors.text, opacity: 0.9 },
});

export default HomeScreen;
