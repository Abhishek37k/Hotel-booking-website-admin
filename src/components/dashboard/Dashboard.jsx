import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mt-8">
          {/* Nested routes will render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
