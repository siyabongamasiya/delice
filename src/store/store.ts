import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
// Import slices below
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import menuReducer from "./slices/menuSlice";
import ordersReducer from "./slices/ordersSlice";
import settingsReducer from "./slices/settingsSlice";
import userReducer from "./slices/userSlice";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "user", "settings"],
  blacklist: ["cart", "menu", "orders"],
  timeout: 0,
};

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  cart: cartReducer,
  orders: ordersReducer,
  settings: settingsReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
