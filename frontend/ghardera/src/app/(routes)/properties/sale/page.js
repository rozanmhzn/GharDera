"use client";

import { APIGetAllProperty, APIGetParamsProperty } from "@/apis/Property";
import Search from "@/components/Search";
import Contents from "@/components/common/Contents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

const Sale = () => {
  let currentParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [location, setLocation] = useState(
    currentParams?.get("propertyAddress")
  );
  const [propertyCategory, setPropertyCategory] = useState(
    currentParams?.get("propertyCategory")
  );
  const [propertyType, setPropertyType] = useState(
    currentParams?.get("propertyType")
  );
  const [propertyStatus, setPropertyStatus] = useState(
    currentParams?.get("propertyStatus")
  );
  const [minPrice, setMinPrice] = useState(currentParams?.get("minPrice"));
  const [maxPrice, setMaxPrice] = useState(currentParams?.get("maxPrice"));

  const handleLocationChange = (location) => {
    setLocation(location);
    updateUrlParams({ propertyAddress: location });
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

  const handleMinMaxPrice = (value) => {
    let [min, max] = [null, null];
    if (value) {
      [min, max] = value.split("-").map(Number);
    }

    // Now you have the minimum and maximum prices as numbers
    const minPrice = min;
    const maxPrice = max;
    setMinPrice(min);
    setMaxPrice(max);
    const priceParams = {
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    updateUrlParams(priceParams);
  };

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

  const fetchData = async () => {
    try {
      if (
        location ||
        propertyCategory ||
        propertyType ||
        propertyStatus ||
        minPrice ||
        maxPrice
      ) {
        const query = `${location ? "propertyAddress=" + location : ""}${
          propertyCategory ? "&propertyCategory=" + propertyCategory : ""
        }${propertyType ? "&propertyType=" + propertyType : ""}${
          propertyStatus ? "&propertyStatus=" + propertyStatus : ""
        }${minPrice ? "&minPrice=" + minPrice : ""}${
          maxPrice ? "&maxPrice=" + maxPrice : ""
        }`;
        const response = await APIGetParamsProperty(query);
        console.log(response);
        setData(response.results);
      } else {
        const response = await APIGetAllProperty();
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    location,
    propertyCategory,
    propertyStatus,
    propertyType,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  return (
    <>
      <section className="w-full px-20">
        <Search
          handleLocationChange={handleLocationChange}
          handlePropertyCategoryChange={handlePropertyCategoryChange}
          handlePropertyStatus={handlePropertyStatus}
          handlePropertyType={handlePropertyType}
          handlePriceChange={handleMinMaxPrice}
          locationP={location}
          propertyCategory={propertyCategory}
          propertyStatus={propertyStatus}
          propertyType={propertyType}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        <Contents propertyDetails={filterData} />
      </section>
    </>
  );
};

export default Sale;
