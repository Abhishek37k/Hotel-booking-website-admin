import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import hotelReducer from "./slices/hotelSlice";
import bookingsReducer from "./slices/bookings-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
    bookings: bookingsReducer,
  },
});
export default store;
