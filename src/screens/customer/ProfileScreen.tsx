import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GoldButton from "../../components/GoldButton";
import { Colors } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(user?.email?.[0] || "U").toUpperCase()}
          </Text>
        </View>
        <Text style={styles.email}>{user?.email || "Unknown"}</Text>
      </View>

      <GoldButton
        title="Logout"
        onPress={() => dispatch(logout())}
        style={styles.logoutBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: { color: Colors.primary, fontWeight: "bold", fontSize: 24 },
  email: { color: Colors.text, fontSize: 16 },
  logoutBtn: { marginTop: 24 },
});

export default ProfileScreen;
