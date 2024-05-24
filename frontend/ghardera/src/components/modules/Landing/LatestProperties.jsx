"use client";
import React from "react";

import PropertyCard from "@/components/common/PropertyCard";
import Link from "next/link";

const LatestProperties = ({ propertyDetails }) => {
  return (
    <>
      <div className="flex flex-col gap-7 items-center justify-center w-full font-semibold py-4">
        <h1 className=" text-2xl font-semibold w-full text-center">
          Latest Properties
        </h1>

        <div className="w-full mt-7 px-16">
          <PropertyCard propertiesDetails={propertyDetails} />
          <span className="w-full flex justify-center">
            <Link href="/properties/sale">
              <button className="border-primary border-solid border-2 px-8 py-2 rounded-3xl w-35 text-primary">
                View more
              </button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LatestProperties;
