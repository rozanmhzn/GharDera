"use client";

import React, { useState } from "react";
import Card from "../Card";


const Contents = ({ name, propertyDetails }) => {
  //console.log(propertyDetails)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Change this value to adjust the number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = propertyDetails?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="w-full">
        <div className="text-3xl font-bold">
          <span>
            {propertyDetails && propertyDetails?.length} Properties Found
          </span>
        </div>
       
        <div className="grid grid-cols-3 gap-x-14 mt-5">
          {currentItems?.map((data, index) => {
            return (
              <div key={index} className=" mb-5">
                <Card propertyDetails={data} showButton={false} />
              </div>
            );
          })}
        </div>
  
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-5 mr-10 mb-5">
        <nav className="flex justify-center">
          <ul className="flex">
            {Array.from(
              { length: Math.ceil(propertyDetails?.length / itemsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Contents;
