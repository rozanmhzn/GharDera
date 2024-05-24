"use client";

import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { APIGetUserBooking } from "@/apis/User";
import Image from "next/image";

const TourBookings = () => {
  const [data, setData] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this value to adjust the number of items per page

  const fetchData = async () => {
    try {
      const res = await APIGetUserBooking();
      // console.log(res.booking)
      setData(res.booking);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* //top div */}
      <div className=" m-5">
        {/* //title section div */}
        <div className="flex items-center">
          <span className="text-lg font-semibold">Tour Bookings</span>
        </div>

        {/* Table Section */}
        <div className="mt-5">
          <table className="min-w-full divide-y divide-gray-200">
            {/* <table className='table-auto'> */}
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Property Title
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Property Address
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-black font-normal">
              {currentItems?.length === 0
                ? "No Tour Bookings"
                : currentItems?.map((item, index) => (
                    <tr key={index} onClick={() => console.log(item?._id)}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="flex items-center">
                          <Image
                            src={item.property?.ImagesURL[0]}
                            width={50}
                            height={50}
                            alt="asd"
                          />
                          <div className="ml-2">
                            {item.property?.propertyTitle}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.property?.propertyAddress?.city}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.status === "true" ? (
                          <div className="bg-lime-300 flex justify-items-center p-2 rounded-3xl text-green-700 font-bold">
                            <span>Confirmed</span>
                          </div>
                        ) : (
                          <div className="bg-blue-200 flex justify-items-center p-2 rounded-3xl text-blue-500 font-bold">
                            <span>Pending</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-5 mr-10">
        <nav className="flex justify-center">
          <ul className="flex">
            {Array.from(
              { length: Math.ceil(data?.length / itemsPerPage) },
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

export default TourBookings;
