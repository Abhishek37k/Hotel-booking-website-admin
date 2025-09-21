import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const res = await fetch(`${DB_URL}/bookings.json?auth=${API_KEY}`);
    const data = await res.json();

    if (!data) return [];

    // Transform object to array
    return Object.entries(data).map(([id, booking]) => ({
      id,
      ...booking,
    }));
  }
);

// Update booking status
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ id, status }) => {
    await fetch(`${DB_URL}/bookings/${id}.json?auth=${API_KEY}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return { id, status };
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: { bookings: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) state.bookings[index].status = action.payload.status;
      });
  },
});

export default bookingsSlice.reducer;
