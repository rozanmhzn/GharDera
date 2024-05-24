import { Button, Select, TextInput, rem } from "@mantine/core";
import { ReadonlyURLSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = ({
  handleLocationChange,
  handlePropertyCategoryChange,
  handlePropertyStatus,
  handlePropertyType,
  handlePriceChange,
  locationP,
  propertyCategory,
  propertyStatus,
  propertyType,
  minPrice,
  maxPrice,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [location, setLocation] = useState("");
  const [optionValue, setOptionValue] = useState("");

  const sidebarRoutes = [
    "/properties/sale",
    "/properties/rent",
    "/properties/sale/house",
    "/properties/sale/land",
    "/properties/rent/land",
    "/properties/rent/room",
  ];
  const showSidebar = sidebarRoutes.includes(pathname);

  const options = [
    { label: "Below 10 lakh", value: `${999999}` },
    { label: "10lakh - 20lakh", value: `${1000000}-${2000000}` },
    { label: "20lakh - 50lakh", value: `${2000000}-${5000000}` },
    { label: "50lakh - 1cr.", value: `${5000000}-${10000000}` },
    { label: "1cr. - 3cr.", value: `${10000000}-${30000000}` },
    { label: "3cr. - 6cr.", value: `${30000000}-${60000000}` },
    { label: "Above 6cr.", value: `0-${60000000}` },
  ];
  useEffect(() => {
    if (minPrice && maxPrice) {
    } else {
      setOptionValue(options[0].value);
    }
  }, []);

  const findIndex = (minPrice, maxPrice) => {
    for (let i = 1; i < options.length - 1; i++) {
      const [min, max] = options[i].value.split("-").map(Number);
      if (parseInt(minPrice) >= min && parseInt(maxPrice) <= max) {
        return i;
      }
    }
  };

  return (
    <div className="">
      {showSidebar && (
        <div className="flex justify-start items-center gap-2  my-4">
          <div className="w-[30rem]">
            <TextInput
              type="text"
              radius={10}
              size="md"
              defaultValue={locationP}
              onChange={(e) => handleLocationChange(e.target.value)}
              placeholder="Enter location, city or neighbourhood"
              rightSectionWidth={rem(90)}
            />
          </div>
          <div>
            <Select
              placeholder="Property Category"
              defaultValue={propertyCategory}
              onChange={handlePropertyCategoryChange}
              data={["Land", "House", "Flat"]}
            />
          </div>
          <div>
            <Select
              placeholder="Property Type"
              defaultValue={propertyType}
              onChange={handlePropertyType}
              data={["Residential", "Commercial"]}
            />
          </div>
          <div>
            <Select
              placeholder="For Buy"
              defaultValue={propertyStatus}
              onChange={handlePropertyStatus}
              data={["Sale", "Rent"]}
            />
          </div>
          <div>
            <Select
              placeholder="Price Range"
              defaultValue={() => {
                if (minPrice && maxPrice) {
                  const index = findIndex(minPrice, maxPrice);
                  console.log(index);
                  return options[index].value;
                }
                if (!minPrice && !maxPrice) {
                  return null;
                }
                if (!maxPrice) {
                  return options[0].value;
                }
                if (!minPrice) {
                  console.log("index");
                  return options[6].value;
                }
              }}
              data={options}
              onChange={handlePriceChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
