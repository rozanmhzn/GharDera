import Link from "next/link";
import React from "react";

const GharderaLogo = ({ color }) => {
  return (
    <div>
      <Link href="/">
        <figure className={`text-${color} text-3xl font-bold`}>
          {/* <Image src={logo} alt="ghardera logo" height={40} className="text-green-500" /> */}{" "}
          GHARDERA
        </figure>
      </Link>
    </div>
  );
};

export default GharderaLogo;
