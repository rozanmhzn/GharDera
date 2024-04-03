import Image from "next/image";
import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const Card = ({ propertyDetails, showButton = true }) => {
  return (
    <div className="flex gap-x-10 mr-10">
      <Link href={`/property/${propertyDetails.slug}`}>
        <div className="w-96 h-72 relative">
          <Image
            alt="Property Image"
            src={propertyDetails?.img}
            fill
            className="rounded-3xl"
          />
        </div>
        <section className="font-medium tracking-wide">
          <div className="flex flex-col mt-4">
            <h1 className="text-lg "> {propertyDetails?.name}</h1>
            <span className="mb-3 text-subHeading flex gap-1 items-center text-xs mt-2 tracking-wider">
              <FeatherIcon icon="map-pin" fill="white" size="14px" />
              {propertyDetails?.address}
            </span>
            <span className="text-xl"> {propertyDetails?.price}</span>

            <span className="text-base font-light text-primary flex items-center mt-3">
              View Details
              <FeatherIcon icon="chevron-right" size={"14px"} />
            </span>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default Card;
