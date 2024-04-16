"use client";


import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Select, TextInput, rem } from "@mantine/core";

const PropertyLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [location, setLocation] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [price, setPrice] = useState("");

  const sidebarRoutes = [
    "/properties/sale",
    "/properties/rent",
    "/properties/sale/house",
    "/properties/sale/land",
    "/properties/rent/land",
    "/properties/rent/room",
  ];
  const showSidebar = sidebarRoutes.includes(pathname);

  const handleLocationChange = () => {
    const value = location;
    setLocation(value);
    updateUrlParams({ propertyAddress: value });
  };
  const handlePropertyType = (value) => {
    setPropertyType(value);
    updateUrlParams({ propertyType: value });
  };
  const handlePropertyStatus = (value) => {
    setPropertyStatus(value);
    updateUrlParams({ propertyStatus: value });
  };
  
  const handlePropertyCategoryChange = (value) => {
    setPropertyCategory(value);
    updateUrlParams({ propertyCategory: value });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setLocation(searchParams.get("propertyAddress"));
    setPropertyCategory(searchParams.get("propertyCategory"));
    setPropertyType(searchParams.get("propertyType"));
    setPropertyStatus(searchParams.get("propertyStatus"));
  }, []);

  const updateUrlParams = (params) => {
    const currentParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    }
    const newUrl = `${pathname}?${currentParams.toString()}`;
    router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <section className="w-full px-20">
      <div className="">
        {showSidebar && (
          <div className="flex justify-start items-center gap-2  my-4">
            <div className="w-[30rem]">
              <TextInput
                type="text"
                radius={10}
                size="md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location, city or neighbourhood"
                rightSection={
                  <Button
                    color="#235789"
                    className="w-12"
                    onClick={handleLocationChange}
                  >
                    Search
                  </Button>
                }
                rightSectionWidth={rem(90)}
              />
            </div>
            <div>
              <Select
                placeholder="Property Category"
                value={propertyCategory}
                onChange={handlePropertyCategoryChange}
                data={["Land", "House", "Flat"]}
              />
            </div>
            <div>
              <Select
                placeholder="Property Type"
                value={propertyType}
                onChange={handlePropertyType}
                data={["Residential", "Commercial"]}
              />
            </div>
            <div>
              <Select
                placeholder="For Buy"
                value={propertyStatus}
                onChange={handlePropertyStatus}
                data={["Buy", "Rent"]}
              />
            </div>
            <div>
              <Select placeholder="Price Range" data={["100k-200k"]} />
            </div>
          </div>
        )}
      </div>
      {children}
    </section>
  );
};

export default PropertyLayout;

