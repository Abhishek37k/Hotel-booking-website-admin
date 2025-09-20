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
      if (!res.ok) throw new Error(data.error?.message || "Failed to add hotel");

      return { hotelId: data.name, ...hotelData }; // `data.name` = Firebase generated key
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
      ;
  },
});

export default hotelSlice.reducer;
