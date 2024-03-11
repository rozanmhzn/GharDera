"use client";
// import Image from "next/image";
// //import "../app/globals.css";
// import logo from "@/assets/logo.svg";
// import { Menu, Button, Text, rem } from "@mantine/core";
// import SearchBar from "../Searchbar/searchbar";
// import Link from "next/link";
import { Router, useRouter } from "next/navigation";

import React from "react";
import GharderaLogo from "../common/GhareraLogo";
//import FeatherIcon from "feather-icons-react";

const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <nav className="flex justify-between items-center bg-inherit py-4 px-8">
        <section className="flex gap-20">
          <GharderaLogo color="primary" />
          <div className="menu">
            <nav className="flex">
              <ul className="flex justify-between  items-center gap-6 pr-8 ">
                <li className="">
                  <button
                    href="/properties/sale"
                    className="navButton font-medium text-lg"
                  >
                    Buy
                  </button>
                </li>
                <li>
                  <button href="/properties/rent" className="navButton ">
                    Rent
                  </button>
                </li>
                <li>
                  <button href="/about" className="navButton ">
                    About
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
       
        <section className="flex gap-6">
      

          <button onClick={() => router.push("/login")} className="navButton">
            Signup
          </button>
          <button
            onClick={() => router.push("/login")}
            className="border-primary border-solid border-2 px-8 py-2 rounded-2xl w-32 text-primary"
          >
            Login
          </button>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
