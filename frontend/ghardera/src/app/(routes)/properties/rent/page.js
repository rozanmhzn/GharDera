"use client";

import Contents from "@/components/common/Contents";
import axios from "axios";

import { useState, useEffect } from "react";

export default function Rent() {
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
    const filteredData = data?.filter((item) => item.propertyStatus === "rent");
    setFilterData(filteredData);
  }, [data]);
  return (
    <>
      <Contents name={"Rent"} propertyDetails={filterData} />
    </>
  );
}
