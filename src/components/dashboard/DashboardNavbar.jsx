import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNavbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md"
      : "px-5 py-2 text-gray-700 bg-white hover:bg-blue-100 rounded-lg transition duration-200 shadow-sm";

  return (
    <div className="flex space-x-6 p-4 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 shadow-md justify-center rounded-b-lg">
      <NavLink to="/dashboard/listings" className={linkClass}>
        All Listings
      </NavLink>
      <NavLink to="/dashboard/add-listing" className={linkClass}>
        Add New Listing
      </NavLink>
      <NavLink to="/dashboard/bookings" className={linkClass}>
        Booked Hotels
      </NavLink>
    </div>
  );
};

export default DashboardNavbar;
