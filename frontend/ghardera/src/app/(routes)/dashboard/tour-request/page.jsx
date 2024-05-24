"use client";

import React, { useState, useEffect } from "react";
import {  TextInput } from "@mantine/core";
import FeatherIcon from "feather-icons-react";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { useDisclosure } from "@mantine/hooks";
import { APIConfirmTourRequest, APIGetAllBookings } from "@/apis/User";
import { toast } from "react-toastify";

const TourRequest = () => {
  const [data, setData] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchData = async () => {
    try {
      const res = await APIGetAllBookings();
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirm = async (id, data) => {
    // console.log(data)
    try {
      const res = await APIConfirmTourRequest(id, data);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // const reject = (id) =>{
  //   console.log(id)
  // }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this value to adjust the number of items per page

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
          <span className="text-lg font-semibold">Tour Requests</span>
        </div>
        {/* //search section div */}
        <div className="flex gap-10 mt-5">
          <div className="w-80">
            <TextInput
              placeholder="Search by Location, property Type"
              leftSection={<FeatherIcon icon="search" size={18} />}
            />
          </div>
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
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Property Title
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
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-black font-normal">
              {currentItems?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center">
                      {/* <Image src={item.img} width={50} height={50} /> */}
                      <div className="ml-2">{item?.bookedBy.fullname}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item?.bookedBy.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item?.property?.propertyTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{item?.date}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{item?.time}</td>
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

                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex gap-5">
                      <GiConfirmed
                        size={25}
                        style={{ color: "#07f22f" }}
                        className="cursor-pointer"
                        onClick={() => confirm(item?._id, item)}
                      />
                      <GiCancel
                        style={{ color: "#f20707" }}
                        size={25}
                        className="cursor-pointer"
                        onClick={() => reject(item?._id)}
                      />
                    </div>
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

export default TourRequest;
