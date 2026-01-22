import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../api/client";
export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get("/menu");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch menu",
      );
    }
  },
);

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  category: string;
}

interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  lastFetched: number;
  cacheValid: boolean;
}

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: 0,
  cacheValid: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu(state, action: PayloadAction<MenuItem[]>) {
      state.items = action.payload;
      state.lastFetched = Date.now();
      state.cacheValid = true;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    invalidateCache(state) {
      state.cacheValid = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMenu.fulfilled,
        (state, action: PayloadAction<MenuItem[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.lastFetched = Date.now();
          state.cacheValid = true;
        },
      )
      .addCase(fetchMenu.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setMenu, setLoading, setError, invalidateCache } =
  menuSlice.actions;
export default menuSlice.reducer;
