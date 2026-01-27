import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../api/supabase";

export interface Order {
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
  orders: [],
  currentOrder: null,
  trackingCode: null,
  loading: false,
  error: null,
};

// Map DB row to app Order
type OrderRow = {
  id: string;
  customer_name: string | null;
  total: number | null;
  status: Order["status"];
  type: Order["type"];
  created_at?: string | null;
};

const mapRowToOrder = (r: OrderRow): Order => ({
  id: r.id,
  total: r.total ?? undefined,
  status: r.status,
  type: r.type,
  date: r.created_at ? r.created_at.slice(0, 10) : undefined,
  time: r.created_at
    ? new Date(r.created_at).toTimeString().slice(0, 5)
    : undefined,
});

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetchAll", async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("orders")
    .select("id, customer_name, total, status, type, created_at")
    .order("created_at", { ascending: false });
  if (error) return rejectWithValue(error.message);
  return (data as OrderRow[]).map(mapRowToOrder);
});

export const updateOrderStatus = createAsyncThunk<
  { id: string; status: Order["status"] },
  { id: string; status: Order["status"] },
  { rejectValue: string }
>("orders/updateStatus", async (payload, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: payload.status })
    .eq("id", payload.id)
    .select("id, status")
    .single();
  if (error) return rejectWithValue(error.message);
  return { id: data!.id, status: data!.status };
});

export const createOrder = createAsyncThunk<
  Order,
  {
    customer_name: string;
    customer_phone: string | null;
    notes: string | null;
    payment_last4: string | null;
    payment_exp_month: number | null;
    payment_exp_year: number | null;
    items: Array<{ id: string; name: string; qty: number; price: number }>;
    total: number;
    type: Order["type"];
  },
  { rejectValue: string }
>("orders/create", async (payload, { rejectWithValue }) => {
  // Keep DB insert minimal to avoid schema mismatches.
  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: payload.customer_name,
      total: payload.total,
      status: "pending",
      type: payload.type,
    })
    .select("id, customer_name, total, status, type, created_at")
    .single();

  if (error) return rejectWithValue(error.message);

  const base = mapRowToOrder(data as OrderRow);
  return {
    ...base,
    items: payload.items,
    total: payload.total,
  };
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders = [action.payload, ...state.orders];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create order";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.orders = state.orders.map((o) =>
          o.id === id ? { ...o, status } : o,
        );
      });
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
