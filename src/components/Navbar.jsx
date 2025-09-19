import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

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

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        Hotel Booking
      </div>

      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
