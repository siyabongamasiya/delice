import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  trackingCode: string;
  items?: any[];
  total?: number;
  guestCount?: number;
  date?: string;
  time?: string;
  status: string;
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
  orders: [],
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
