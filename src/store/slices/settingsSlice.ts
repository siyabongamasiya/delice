import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  restaurantName: string;
  phone: string;
  email: string;
  address: string;
  weekdayHours: string;
  weekendHours: string;
  loading: boolean;
}

const initialState: SettingsState = {
  restaurantName: "",
  phone: "",
  email: "",
  address: "",
  weekdayHours: "",
  weekendHours: "",
  loading: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      Object.assign(state, action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setSettings, setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;
