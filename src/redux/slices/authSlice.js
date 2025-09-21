import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

// Signup action
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, role = "admin" }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Signup failed");

      const { localId, idToken } = data;

      // Save user role in Firebase
      await fetch(`${DB_URL}/users/${localId}.json?auth=${idToken}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      return { user: { email, role, localId }, token: idToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Login action with role check
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Login failed");

      const { localId, idToken } = data;

      // Fetch user info to get role
      const userRes = await fetch(`${DB_URL}/users/${localId}.json?auth=${idToken}`);
      const userData = await userRes.json();

      if (userData.role !== "admin") {
        // Reject login for non-admin users
        return thunkAPI.rejectWithValue("Access denied. You are not an admin.");
      }

      return { user: { email: data.email, role: userData.role, localId }, token: idToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
    loadUserFromStorage(state) {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        state.user = parsed.user;
        state.token = parsed.token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;   // Reset user on rejected login
        state.token = null;  // Reset token on rejected login
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
