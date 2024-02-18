"use client";

import Link from "next/link";
import React, { useState } from "react";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [isClick, setisClick] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  return (
    <>
      <div className="header flex justify-between p-5 bg-purple-100 text-black">
        <div className="logo p-2">
          <Link href="/" className="text-black hover:text-red-700">
            Ghardera
          </Link>
        </div>
        <div className="searchBar">
          <Searchbar />
        </div>
        <div className="hidden md:block">
          <nav>
            <ul className="flex justify-between gap-10 pr-8 ">
              <li className="hover:bg-white hover:text-black rounded-lg p-2">
                <Link href="/properties/sale">Buy</Link>
              </li>
              <li className="hover:bg-white hover:text-black rounded-lg p-2">
                <Link href="/properties/rent">Rent</Link>
              </li>
              <li className="hover:bg-white hover:text-black rounded-lg p-2">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:bg-white hover:text-black rounded-lg p-2">
                <Link href="/login">Login/Signup</Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="md:hidden ">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-black 
          hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white "
            onClick={toggleNavbar}
          >
            {isClick ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000.svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000.svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <nav>
                <ul className="flex flex-col  gap-10 pr-8 ">
                  <li className="hover:bg-white hover:text-black rounded-lg p-2 ">
                    <Link href="/properties/sale">Buy</Link>
                  </li>
                  <li className="hover:bg-white hover:text-black rounded-lg p-2 ">
                    <Link href="/properties/rent">Rent</Link>
                  </li>
                  <li className="hover:bg-white hover:text-black rounded-lg p-2">
                    <Link href="/about">About</Link>
                  </li>
                  <li className="hover:bg-white hover:text-black rounded-lg p-2">
                    <Link href="/login">Login/Signup</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
