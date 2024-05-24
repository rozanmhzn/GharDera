import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import React from "react";

const CategoryCard = ({ categoryInfo, index }) => {
  return (
    <div
      className={`flex flex-col ${
        index == 0 ? "bg-primary text-white" : "bg-cardBackground"
      }  p-5 `}
    >
      <span className="text-2xl font-semibold mb-3">
        {categoryInfo?.heading}
      </span>
      <span
        className={`text-sm font-normal   ${
          index == 0 ? "text-subHeading-white" : "text-subHeading"
        } mb-5`}
      >
        {categoryInfo?.subHeading}
      </span>
      <figure className="w-64 h-40 relative mb-9">
        <Image src={categoryInfo?.image} alt="Image" fill objectFit="cover" />
      </figure>
      <button
        className={`flex items-center mb-2 border-b-2 ${
          index == 0 ? "border-white" : "border-black"
        }  max-w-max`}
      >
        {categoryInfo?.browseButton}{" "}
        <FeatherIcon icon="chevron-right" size={"16px"} />
      </button>
    </div>
  );
};

export default CategoryCard;
