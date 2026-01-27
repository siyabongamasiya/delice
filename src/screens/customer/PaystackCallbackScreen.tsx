import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import supabase, { SUPABASE_ANON_KEY, SUPABASE_URL } from "../../api/supabase";
import { Colors } from "../../constants/colors";

const PaystackCallbackScreen = ({ route, navigation }: any) => {
  const reference = route?.params?.reference as string | undefined;
  const orderId = route?.params?.order_id as string | undefined;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!reference || !orderId) {
          setError("Missing payment reference");
          return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        if (!accessToken) {
          setError("Login required to verify payment");
          return;
        }

        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
          setError(
            "Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY",
          );
          return;
        }

        const verifyRes = await fetch(
          `${SUPABASE_URL}/functions/v1/paystack-verify`,
          {
            method: "POST",
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reference, order_id: orderId }),
          },
        );

        const verifyText = await verifyRes.text();
        const verifyJson = (() => {
          try {
            return verifyText ? JSON.parse(verifyText) : {};
          } catch {
            return { message: verifyText };
          }
        })();
        if (!verifyRes.ok) {
          setError(
            verifyJson?.error ||
              verifyJson?.message ||
              `HTTP ${verifyRes.status}`,
          );
          return;
        }

        if (!verifyJson?.paid) {
          setError(
            `Payment not successful: ${verifyJson?.status || "unknown"}`,
          );
          return;
        }

        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Tracking",
              },
            },
          ],
        });
      } catch (e: any) {
        setError(e.message || "Payment verification failed");
      }
    })();
  }, [reference, orderId, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} />
      <Text style={styles.title}>Verifying payment...</Text>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { color: Colors.text, marginTop: 12 },
  error: { color: Colors.error, marginTop: 12, textAlign: "center" },
});

export default PaystackCallbackScreen;
