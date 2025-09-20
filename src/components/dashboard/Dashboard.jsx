import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <DashboardNavbar />

        <div className=" bg-white rounded-lg ">
          <Outlet />
        </div>
    </div>
  );
};

export default Dashboard;
