import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../api/supabase";

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          Object.assign(state, action.payload);
        }
      })
      .addCase(fetchSettings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(saveSettings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSettings, setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;

// Types mapped to DB row
type SettingsRow = {
  id: string;
  restaurant_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  weekday_hours: string | null;
  weekend_hours: string | null;
  updated_at?: string | null;
};

const mapRowToState = (r: SettingsRow): Partial<SettingsState> => ({
  restaurantName: r.restaurant_name || "",
  phone: r.phone || "",
  email: r.email || "",
  address: r.address || "",
  weekdayHours: r.weekday_hours || "",
  weekendHours: r.weekend_hours || "",
});

export const fetchSettings = createAsyncThunk<
  Partial<SettingsState> | null,
  void,
  { rejectValue: string }
>("settings/fetch", async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("settings")
    .select(
      "id, restaurant_name, phone, email, address, weekday_hours, weekend_hours",
    )
    .limit(1)
    .maybeSingle<SettingsRow>();
  if (error && error.code !== "PGRST116") {
    return rejectWithValue(error.message);
  }
  if (!data) return null; // no settings yet
  return mapRowToState(data);
});

type SavePayload = Partial<SettingsState>;

export const saveSettings = createAsyncThunk<
  SettingsState,
  SavePayload,
  { rejectValue: string }
>("settings/save", async (payload, { rejectWithValue }) => {
  // Upsert a singleton row with a fixed id for simplicity
  const row = {
    id: "singleton",
    restaurant_name: payload.restaurantName ?? null,
    phone: payload.phone ?? null,
    email: payload.email ?? null,
    address: payload.address ?? null,
    weekday_hours: payload.weekdayHours ?? null,
    weekend_hours: payload.weekendHours ?? null,
    updated_at: new Date().toISOString(),
  } satisfies Partial<SettingsRow>;

  const { data, error } = await supabase
    .from("settings")
    .upsert(row, { onConflict: "id" })
    .select(
      "id, restaurant_name, phone, email, address, weekday_hours, weekend_hours",
    )
    .single<SettingsRow>();
  if (error) return rejectWithValue(error.message);
  const mapped = mapRowToState(data);
  return {
    restaurantName: mapped.restaurantName || "",
    phone: mapped.phone || "",
    email: mapped.email || "",
    address: mapped.address || "",
    weekdayHours: mapped.weekdayHours || "",
    weekendHours: mapped.weekendHours || "",
    loading: false,
  } as SettingsState;
});
