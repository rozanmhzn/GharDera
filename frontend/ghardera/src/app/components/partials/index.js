"use client";

import Logo from "@/components/partials/Logo";
import SearchBar from "@/components/Searchbar/searchbar";
import Navbar from "@/components/partials/Navbar";
//import styles from "./Header.module.css";  // Import a CSS module for styling

export default function Header() {
  return (
    <>
      <div>
        <Logo />
        <SearchBar />
        <Navbar />
      </div>
    </>
  );
}
