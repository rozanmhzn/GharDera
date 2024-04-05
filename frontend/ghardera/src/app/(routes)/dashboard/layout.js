"use client";

import DashboardSidebar from "@/components/modules/adminDashboard/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <section className="flex">
      <DashboardSidebar />
      <div className="w-full">{children}</div>
    </section>
  );
};

export default DashboardLayout;
