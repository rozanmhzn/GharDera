import React from "react";
import Card from "../Card";



const Contents = ({ propertyDetails }) => {
  return (
    <>
      <div className="w-full">
        <div className="text-3xl font-bold">
          <span>
            {propertyDetails && propertyDetails.length} Properties Found
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-x-14">
          {propertyDetails?.map((data, index) => {
            return (
              <div key={index} className=" mb-5">
                <Card propertyDetails={data} showButton={false} />
              </div>
            );
          })}
        </div>
        
      </div>
    </>
  );
};

export default Contents;
