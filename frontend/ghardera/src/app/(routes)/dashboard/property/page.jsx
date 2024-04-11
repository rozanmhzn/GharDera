"use client";

const { RxFace } = require("react-icons/rx");

import React, {useState} from "react";
import { Button, TextInput, NativeSelect } from "@mantine/core";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";

import { propertyDetails } from "@/utils/constant/propertyDetails";
import Image from "next/image";


const Property = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this value to adjust the number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = propertyDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      {/* //top div */}
      <div className=" m-5">
        {/* //title section div */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">Property Lists</span>
          </div>
          <Link href="/dashboard/property/add-property">
            <Button color="#235789">+ Create Listing</Button>
          </Link>
        </div>

        {/* //search section div */}
        <div className="flex gap-10 mt-5">
          <div className="w-80">
            <TextInput
              placeholder="Search by Location, property Type"
              leftSection={<FeatherIcon icon="search" size={18} />}
              // rightSection={<FeatherIcon icon='cross' size={18}/>}
            />
          </div>
          <div className="flex gap-5">
            <NativeSelect
              rightSection={<FeatherIcon icon="chevron-down" />}
              data={[
                { label: "Status", value: "" },
                { label: "Buy", value: "buy" },
                { label: "Rent", value: "rent" },
              ]}
            />

            <NativeSelect
              rightSection={<FeatherIcon icon="chevron-down" />}
              data={[
                { label: "Recent", value: "" },
                { label: "Latest", value: "latest" },
                { label: "Oldest", value: "oldest" },
              ]}
            />
          </div>
        </div>

        {/* property list table */}
        <div className="mt-5">
          <table className="min-w-full divide-y divide-gray-200">
            {/* <table className='table-auto'> */}
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Posted on
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Owner
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
              {currentItems.map((item, index) => (
                <tr key={index} onClick={() => console.log(index)}>
                  <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center">
                      <Image src={item.img} width={50} height={50} />
                      <div className="ml-2">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {"2024-01-32"}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{"Ghardera"}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.status === "Available" ? (
                      <div className="bg-lime-300 flex justify-items-center p-2 rounded-3xl text-green-700 font-bold">
                        <span>Available</span>
                      </div>
                    ) : (
                      <div className="bg-blue-200 flex justify-items-center p-2 rounded-3xl text-blue-500 font-bold">
                        <span>Sold</span>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex gap-5">
                      <FeatherIcon
                        icon="edit-2"
                        size={20}
                        onClick={() => console.log(item?._id)}
                      />
                      <FeatherIcon icon="trash-2" size={20} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-5 mr-10 mb-5">
        <nav className="flex justify-center">
          <ul className="flex">
            {Array.from(
              { length: Math.ceil(propertyDetails.length / itemsPerPage) },
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

export default Property;


