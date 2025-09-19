import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNavbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow"
      : "px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition duration-200";

  return (
    <div className="bg-white shadow-md p-4 flex space-x-6 border-b">
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
