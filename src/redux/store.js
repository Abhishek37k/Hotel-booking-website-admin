import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import hotelReducer from "./slices/hotelSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
      hotel: hotelReducer,   
  },
});
export default store;
