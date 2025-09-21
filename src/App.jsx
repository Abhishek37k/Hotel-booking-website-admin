import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import AllListings from "./components/dashboard/AllListings";
import AddListing from "./components/dashboard/AddListing";
import BookedHotels from "./components/dashboard/BookedHotels";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Redirect /dashboard to /dashboard/listings */}
          <Route index element={<Navigate to="listings" replace />} />
          <Route path="listings" element={<AllListings />} />
          <Route path="add-listing" element={<AddListing />} />
          <Route path="bookings" element={<BookedHotels />} />
        </Route>

        {/* Optional: redirect root to dashboard */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
