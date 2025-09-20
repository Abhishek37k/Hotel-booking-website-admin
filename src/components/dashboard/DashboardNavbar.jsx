import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNavbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow"
      : "px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition duration-200";

  return (
    <div className="flex space-x-6 p-2 bg-gradient-to-br from-green-50 to-blue-50  justify-center">
      <NavLink to="/dashboard/listings" className={linkClass}>
        All Listings
      </NavLink>
      <NavLink to="/dashboard/add-listing" className={linkClass}>
        Add Listing
      </NavLink>
      <NavLink to="/dashboard/bookings" className={linkClass}>
        Booked Hotels
      </NavLink>
    </div>
  );
};

export default DashboardNavbar;
