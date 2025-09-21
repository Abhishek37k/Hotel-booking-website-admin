import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect to login page
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // 🔹 Active/inactive styles
  const linkClass = ({ isActive }) =>
    isActive
      ? "px-3 py-2 bg-white text-blue-600 font-semibold rounded-md shadow-md"
      : "px-3 py-2 text-white hover:bg-blue-500 rounded-md transition";

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer tracking-wide"
          onClick={() => navigate("/")}
        >
          🏨 Hotel Booking
        </div>

       

        {/* Auth Buttons */}
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-medium shadow-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium shadow-md"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
