import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import Listings from "./pages/Listings";
import Navbar from "./components/Navbar";
import AllListings from "./components/dashboard/AllListings";
import AddListing from "./components/dashboard/AddListing";
import BookedHotels from "./components/dashboard/BookedHotels";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="listings" element={<AllListings />} />
          <Route path="add-listing" element={<AddListing />} />
          <Route path="bookings" element={<BookedHotels />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
