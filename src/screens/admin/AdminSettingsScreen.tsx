import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GoldButton from "../../components/GoldButton";
import { Colors } from "../../constants/colors";

const AdminSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          defaultValue="Delice"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          defaultValue="123 Luxury Ave, Sandton, Johannesburg"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          defaultValue="+27 11 555 1234"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Hours (Weekdays)</Text>
        <TextInput
          style={styles.input}
          defaultValue="10:00 - 22:00"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Hours (Weekend)</Text>
        <TextInput
          style={styles.input}
          defaultValue="09:00 - 23:00"
          placeholderTextColor="#888"
        />

        <GoldButton title="Save" onPress={() => {}} style={{ marginTop: 12 }} />
      </View>
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
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 16,
  },
  label: { color: Colors.primary, fontWeight: "600", marginTop: 8 },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    color: Colors.text,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 6,
  },
});

export default AdminSettingsScreen;
