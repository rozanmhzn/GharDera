"use client";

import SideBar from "@/components/modules/userDashboard/Sidebar";
import React from "react";

const UserDashboardLayout = ({ children }) => {
  return (
    <section className="flex gap-10 ">
      <SideBar />
      <div className="w-full">{children}</div>
    </section>
  );
};

export default UserDashboardLayout;
