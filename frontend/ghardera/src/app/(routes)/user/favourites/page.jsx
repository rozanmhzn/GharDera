"use client";

import { APIGetAllFavourites } from "@/apis/UserInteraction";
import Contents from "@/components/common/Contents";
import React, { useEffect, useState } from "react";

const Favourites = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      let propertyDetails = [];
      const res = await APIGetAllFavourites();
      console.log(res);
      res.favProps.map((items) => propertyDetails.push(items.property));
      console.log(propertyDetails);
      setData(propertyDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* //top div */}
      <div className=" m-5">
        {/* //title section div */}
        <div className="flex items-center">
          <span className="text-lg font-semibold">Favourites</span>
        </div>

        <div className="w-full">
          <Contents propertyDetails={data} />
        </div>
      </div>
    </>
  );
};

export default Favourites;
