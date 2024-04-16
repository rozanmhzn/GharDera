"use client";

import Contents from "@/components/common/Contents";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

import { useState, useEffect } from "react";

export default function Sale() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const baseURL = "http://localhost:4000/api/property/user/properties";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: baseURL,
        }).then((response) => {
          setData(response.data);
          //console.log(response.data)
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data?.filter((item) => item.propertyStatus === "sale");
    setFilterData(filteredData);
    // console.log(filterData)
  }, [data]);

  return (
    <>
      <Contents name={"Sale"} propertyDetails={filterData} />
    </>
  );
}
