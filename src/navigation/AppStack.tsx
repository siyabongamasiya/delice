import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import AdminEditMenuItemScreen from "../screens/admin/AdminEditMenuItemScreen";
import AdminMenuItemsScreen from "../screens/admin/AdminMenuItemsScreen";
import AdminOrdersScreen from "../screens/admin/AdminOrdersScreen";
import AdminSettingsScreen from "../screens/admin/AdminSettingsScreen";
import CartScreen from "../screens/customer/CartScreen";
import CheckoutScreen from "../screens/customer/CheckoutScreen";
import ContactScreen from "../screens/customer/ContactScreen";
import HomeScreen from "../screens/customer/HomeScreen";
import MenuScreen from "../screens/customer/MenuScreen";
import OrdersScreen from "../screens/customer/OrdersScreen";
import PaystackCallbackScreen from "../screens/customer/PaystackCallbackScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";
import { useAppSelector } from "../store/hooks";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AdminStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AdminDashboard"
      component={AdminDashboardScreen}
      options={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        title: "Dashboard",
      }}
    />
    <Stack.Screen
      name="AdminMenuItems"
      component={AdminMenuItemsScreen}
      options={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        title: "Menu Items",
      }}
    />
    <Stack.Screen
      name="AdminEditMenuItem"
      component={AdminEditMenuItemScreen}
      options={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        title: "Add Item",
      }}
    />
    <Stack.Screen
      name="AdminOrders"
      component={AdminOrdersScreen}
      options={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        title: "Orders",
      }}
    />
    <Stack.Screen
      name="AdminSettings"
      component={AdminSettingsScreen}
      options={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        title: "Settings",
      }}
    />
  </Stack.Navigator>
);

const Tabs = () => {
  const user = useAppSelector((s) => s.auth.user);
  const isAdmin = (user?.email || "").toLowerCase().includes("admin");
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#888",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Menu":
              iconName = "restaurant-outline";
              break;
            case "Tracking":
              iconName = "map-outline";
              break;
            case "Contact":
              iconName = "call-outline";
              break;
            case "Admin":
              iconName = "speedometer-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Tracking" component={OrdersScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      {isAdmin && <Tab.Screen name="Admin" component={AdminStack} />}
    </Tab.Navigator>
  );
};

const AppTabsWithHeader = () => {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={({ navigation }) => ({
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.primary,
          headerTitle: "Delice",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              activeOpacity={0.8}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: Colors.card,
                  borderWidth: 1,
                  borderColor: Colors.border,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {(user?.email?.[0] || "U").toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CartModal"
        component={CartScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.primary,
          title: "Checkout",
        }}
      />
      <Stack.Screen
        name="PaystackCallback"
        component={PaystackCallbackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.primary,
          title: "Profile",
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => <AppTabsWithHeader />;

export default AppStack;
