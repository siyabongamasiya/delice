import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  trackingCode?: string;
  items?: any[];
  total?: number;
  guestCount?: number;
  date?: string;
  time?: string;
  status: "pending" | "confirmed" | "ready" | "completed" | "cancelled";
  type: "takeout" | "reservation";
}

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  trackingCode: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [
    {
      id: "ord-1001",
      trackingCode: "408",
      items: [
        { id: "meal-1", name: "Grilled Chicken", qty: 1, price: 129.99 },
        { id: "drink-1", name: "Iced Latte", qty: 2, price: 38.0 },
      ],
      total: 205.99,
      date: "2026-01-23",
      time: "18:30",
      status: "ready",
      type: "takeout",
    },
    {
      id: "ord-1002",
      items: [{ id: "meal-2", name: "Beef Burger", qty: 2, price: 109.5 }],
      total: 219.0,
      date: "2026-01-22",
      time: "20:10",
      status: "confirmed",
      type: "takeout",
    },
    {
      id: "ord-1003",
      guestCount: 4,
      date: "2026-01-25",
      time: "19:00",
      status: "pending",
      type: "reservation",
    },
  ],
  currentOrder: null,
  trackingCode: null,
  loading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setCurrentOrder(state, action: PayloadAction<Order | null>) {
      state.currentOrder = action.payload;
    },
    setTrackingCode(state, action: PayloadAction<string | null>) {
      state.trackingCode = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
      state.trackingCode = null;
    },
  },
});

export const {
  setOrders,
  setCurrentOrder,
  setTrackingCode,
  setLoading,
  setError,
  clearCurrentOrder,
} = ordersSlice.actions;
export default ordersSlice.reducer;
