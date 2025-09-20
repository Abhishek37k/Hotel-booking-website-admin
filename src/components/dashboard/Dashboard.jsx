import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="p-0 max-w-9xl mx-auto">
        <div className=" bg-white rounded-lg shadow-lg mt-4">
          {/* Nested routes will render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
