import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;
const STORAGE_URL = import.meta.env.VITE_FIREBASE_STORAGE_URL;
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// 🔹 Step 1: Add hotel (without images yet)
export const addHotel = createAsyncThunk(
  "hotels/addHotel",
  async ({ hotelData, token }, thunkAPI) => {
    try {
      const res = await fetch(`${DB_URL}/hotels.json?auth=${token}`, {
        method: "POST",
        body: JSON.stringify(hotelData),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error?.message || "Failed to add hotel");

      return { hotelId: data.name, ...hotelData }; // `data.name` = Firebase generated key
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (token, thunkAPI) => {
    try {
      const res = await fetch(`${DB_URL}/hotels.json?auth=${token}`);
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.error?.message || "Failed to fetch hotels");
      if (!data) return [];

      // Convert Firebase object {id: {hotelData}} → array
      return Object.entries(data).map(([id, value]) => ({
        hotelId: id,
        ...value,
      }));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async ({ hotelId, token }, thunkAPI) => {
    try {
      const res = await fetch(`${DB_URL}/hotels/${hotelId}.json?auth=${token}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete hotel");
      return hotelId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async ({ hotelId, hotelData, token }, thunkAPI) => {
    try {
      const res = await fetch(`${DB_URL}/hotels/${hotelId}.json?auth=${token}`, {
        method: "PATCH",
        body: JSON.stringify(hotelData),
      });
      if (!res.ok) throw new Error("Failed to update hotel");
      console.log("Updated hotel data:", hotelData);
      return { hotelId, hotelData };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const hotelSlice = createSlice({
  name: "hotels",
  initialState: { hotels: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels.push(action.payload);
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
        console.log("Fetched hotels:", action.payload);
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteHotel.pending, (state) => { state.loading = true; })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = state.hotels.filter(h => h.hotelId !== action.payload);
      })
      .addCase(deleteHotel.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update hotel
      .addCase(updateHotel.pending, (state) => { state.loading = true; })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.hotels.findIndex(h => h.hotelId === action.payload.hotelId);
        if (index !== -1) state.hotels[index] = { hotelId: action.payload.hotelId, ...action.payload.hotelData };
      })
      .addCase(updateHotel.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default hotelSlice.reducer;
