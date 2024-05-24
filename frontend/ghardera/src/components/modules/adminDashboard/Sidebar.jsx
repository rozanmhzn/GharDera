"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { NavLink, Burger } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  // {
  //   name: "Profile",
  //   path: "/dashboard/profile",
  //   icon : ""
  // },
  {
    name: "Properties",
    path: "/dashboard/property",
    icon: <PiHouseBold size={25} />,
    // items: [
    //   {
    //     name: "View Property",
    //     path : "/dashboard/property"
    //   },
    //   {
    //     name: "Add New Property",
    //   },
    // ],
  },
  {
    name: "Customers",
    path: "/dashboard/users/",
    icon: <FaUserAlt size={25} />,
    // items: [
    //   {
    //     name: "View Users",
    //     path: "/dashboard/users"
    //   },
    //   {
    //     name: "Add New User",
    //     path: "/dashboard/users/add-user"
    //   },
    // ],
  },
  {
    name: "Inquiries",
    path: "",
    icon: <BsChatDots size={25} />,
  },
  {
    name: "Tour Requests",
    path: "/dashboard/bookings",
    icon: <CgCalendarDates size={25} />,
    // items: [
    //   {
    //     name: "View All Bookings",
    //   },
    //   {
    //     name: "Review Bookings",
    //   },
    // ],
  },

  // {
  //   name: "Settings",
  //   path: "/dashboard/settings",
  // },
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
