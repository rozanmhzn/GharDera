import React from "react";
import Card from "../Card";

const PropertyCard = ({ propetiesDetails }) => {
  return (
    <div className="flex">
     
        {propetiesDetails?.map((data, index) => {
          return (
            <div key={index}>
                <Card propertyDetails={data} />
            </div>
          );

        })}
    </div>
  );
};

export default PropertyCard;
