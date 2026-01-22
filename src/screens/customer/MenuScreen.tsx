import React, { useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import MenuCard from "../../components/MenuCard";
import Spinner from "../../components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMenu } from "../../store/slices/menuSlice";

const MenuScreen = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchMenu());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      {loading && <Spinner />}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard {...item} />}
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading && <Text style={styles.empty}>No items available</Text>
        }
      />
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
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  error: {
    color: "#ff4444",
    marginBottom: 8,
    alignSelf: "center",
  },
  empty: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 32,
  },
});

export default MenuScreen;
