"use client";

import { Button } from "@mantine/core";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import SidebarItems from "./SidebarItems";
import { RxDashboard } from "react-icons/rx";
import { PiHouseBold } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { CgCalendarDates } from "react-icons/cg";

const items = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <RxDashboard size={25} />,
  },
  {
    name: "Properties",
    path: "/dashboard/property",
    icon: <PiHouseBold size={25} />,
  },
  {
    name: "Customers",
    path: "/dashboard/users/",
    icon: <FaUserAlt size={25} />,
  },
  {
    name: "Inquiries",
    path: "/dashboard/inquiry",
    icon: <BsChatDots size={25} />,
  },
  {
    name: "Tour Requests",
    path: "/dashboard/tour-request",
    icon: <CgCalendarDates size={25} />,
  },
];

const DashboardSidebar = () => {
  return (
    <>
      <div className="top-0 left-0 h-screen w-60 bg-primary ">
        <div className="flex flex-col h-5/6 justify-between">
          <div className="grid  font-semibold">
            {items.map((item) => {
              return <SidebarItems key={item.path} item={item} />;
            })}
          </div>
          <div className="flex justify-center">
            <Link href="">
              <Button variant="outline" color="red" size="md">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
