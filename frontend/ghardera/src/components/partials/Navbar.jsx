"use client";

import Link from "next/link";
import { Router, useRouter } from "next/navigation";

import React from "react";
import GharderaLogo from "../common/GhareraLogo";
import FeatherIcon from "feather-icons-react";
import { useAuth } from "@/stores/AuthProvider";
import { Avatar, Menu } from "@mantine/core";

const Navbar = () => {
  const router = useRouter();
  const { token, logout, fullName, profile } = useAuth();
  return (
    <>
      <nav className="flex justify-between items-center bg-inherit py-4 px-8">
        <section className="flex gap-20">
          <GharderaLogo color="primary" />
          <div className="menu">
            <nav className="flex">
              <ul className="flex justify-between  items-center gap-6 pr-8 ">
                <li className="">
                  <Link href="/properties/sale?propertyStatus=Sale">
                    <button className="navButton font-medium text-lg">
                      Buy
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/properties/sale?propertyStatus=Rent">
                    <button className="navButton ">Rent</button>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <button className="navButton ">About</button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      
        <section className="flex gap-6">
          {token && (
            <>
              <Menu
                shadow="md"
                width={200}
                trigger="hover"
                openDelay={100}
                closeDelay={400}
              >
                <Menu.Target>
                  <div className="flex">
                    
                    {profile ? (
                      <Avatar
                        radius="xl"
                        src={profile}
                        className="cursor-pointer"
                      />
                    ) : (
                      <Avatar
                        color="cyan"
                        radius="xl"
                        src={profile}
                        className="cursor-pointer"
                      >
                        {fullName}
                      </Avatar>
                    )}
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => router.push("/user/profile")}
                    rightSection={<FeatherIcon icon="user" size="15" />}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => router.push("/user/favourites")}
                    rightSection={<FeatherIcon icon="heart" size="15" />}
                  >
                    Favourites
                  </Menu.Item>

                  <Menu.Item
                    onClick={() => router.push("/user/tour-bookings")}
                    rightSection={<FeatherIcon icon="bookmark" size="15" />}
                  >
                    Tour-Bookings
                  </Menu.Item>

                  <Menu.Item
                    rightSection={<FeatherIcon icon="lock" size="15" />}
                  >
                    Change Password
                  </Menu.Item>
                  <Menu.Item
                    onClick={logout}
                    rightSection={<FeatherIcon icon="log-out" size="15" />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            
            </>
          )}
          {!token && (
            <>
              <button
                onClick={() => router.push("/signup")}
                className="navButton"
              >
                Signup
              </button>
              <button
                onClick={() => router.push("/login")}
                className="border-primary border-solid border-2 px-8 py-2 rounded-2xl w-32 text-primary"
              >
                Login
              </button>
            </>
          )}
        </section>
      </nav>
    </>
  );
};

export default Navbar;
