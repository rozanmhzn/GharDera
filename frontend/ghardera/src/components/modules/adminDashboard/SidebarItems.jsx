import React, { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const SidebarItems = ({ item }) => {
  const { name, path, icon } = item;
  const router = useRouter();
  const pathname = usePathname();

  const onclick = () => {
    router.push(path);
  };

  const isActive = useMemo(() => {
    return path === pathname;
  }, [path, pathname]);
  return (
    <>
      <div
        className={` p-3 cursor-pointer  hover:text-white
        ${isActive && " text-white"}
        `}
        onClick={onclick}
      >
        <div className="flex justify-items-center ml-5 gap-3">
          <div>{icon}</div>
          <div>{name}</div>
        </div>
      </div>
    </>
  );
};

export default SidebarItems;
