import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setMenu, setLoading, setError, invalidateCache } =
  menuSlice.actions;
export default menuSlice.reducer;
