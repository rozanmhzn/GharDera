import Link from "next/link";
import React from "react";
import logo from "../../assets/logo.svg";
import Image from "next/image";

const GharderaLogo = ({ color }) => {
  return (
    <div>
      <Link href="/">
        <figure
          className={`text-${color} text-2xl font-bold flex items-center`}
        >
          <Image
            src={logo}
            alt="ghardera logo"
            height={40}
            className="text-green-500"
          />
          <span>GHARDERA</span>
        </figure>
      </Link>
    </div>
  );
};

export default GharderaLogo;
