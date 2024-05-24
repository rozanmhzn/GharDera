"use client";

import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState } from "react";
import SidebarItems from "./SidebarItems";
import { Button, Switch } from "@mantine/core";
import { APIUserDetail } from "@/apis/Auth";
import { APIUpdate2FA } from "@/apis/User";
import { useAuth } from "@/stores/AuthProvider";
import { toast } from "react-toastify";

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
  const { logout } = useAuth();

  const [active2FA, setActive2FA] = useState(null);

  const userDetail = async () => {
    const res = await APIUserDetail();
    console.log(res);
    setActive2FA(res?.twoFAstatus);
  };

  const update2FA = async (status) => {
    //console.log(event.currentTarget.checked)
    console.log(status);
    const res = await APIUpdate2FA({ status });
    setActive2FA(status);
    toast.success(res?.message);
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <>

      <div className="top-0 left-0 h-screen w-60 bg-primary ">
        <div className="flex flex-col h-5/6 justify-between">
          <div className="grid font-semibold">
            {items.map((item) => {
              return <SidebarItems key={item.path} item={item} />;
            })}
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <Switch
              className="text-xl font-semibold"
              defaultChecked
              label="2FA"
              checked={active2FA}
              onChange={
                (event) =>
                  update2FA(event.currentTarget.checked)
              }
            />
            <Button variant="outline" color="red" size="md" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
