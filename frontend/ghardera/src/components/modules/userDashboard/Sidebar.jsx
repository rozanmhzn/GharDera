"use client";

import FeatherIcon from "feather-icons-react";
import React from "react";
import SidebarItems from "./SidebarItems";
import Link from "next/link";
import { Button } from "@mantine/core";

const items = [
  {
    name: "Profile",
    icon: <FeatherIcon icon="user-check" size={20} />,
    path: "/user/profile",
  },
  {
    name: "Favourites",
    icon: <FeatherIcon icon="heart" size={20} />,
    path: "/user/favourites",
  },
  {
    name: "Tour-Bookings",
    icon: <FeatherIcon icon="bookmark" size={20} />,
    path: "/user/tour-bookings",
  },
  {
    name: "Change Password",
    icon: <FeatherIcon icon="lock" size={20} />,
    path: "/user/change-password",
  },
];

const SideBar = () => {
  return (
    <>
      <div className="top-0 left-0 h-screen w-60 bg-primary ">
        <div className="flex flex-col h-5/6 justify-between">
          <div className="grid font-semibold">
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

export default SideBar;
