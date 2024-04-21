"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
} from "@mantine/core";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { APIDeleteUser, APIGetAllUsers } from "@/apis/User";
import { toast } from "react-toastify";



const Users = () => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [refreshUI, setRefreshUI] = useState(false);

  const fetchData = async () => {
    try {
      const res = await APIGetAllUsers();
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (slug) => {
    console.log(slug);

    try {
      const res = await APIDeleteUser(slug);
      if (res) {
        toast.success(res.message);
        setRefreshUI(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
  
    fetchData();
  }, [refreshUI]);

  useEffect(() => {
    const filteredData = data?.filter((item) => item.role === "user");
    setFilterData(filteredData);
    // console.log(filterData)
  }, [data]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this value to adjust the number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {/* //top div */}
      <div className=" m-5">
        {/* //title section div */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">Customers Lists</span>
          </div>
          <Link href="/dashboard/users/add-user">
            <Button color="#235789">+ Create Customer</Button>
          </Link>
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

        {/* Users list table */}
        <div className="mt-5">
          <table className="min-w-full divide-y divide-gray-200">

            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date Joined
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-sm text-black font-normal">
              {currentItems?.map((item, index) => (
                <tr key={index} onClick={() => console.log(index)}>
                  <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center">
                      {/* <Image src={item.img} width={50} height={50} /> */}
                      <div className="ml-2">{item.fullname}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.number}
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.status === "active" ? (
                      <div className="bg-lime-300 flex justify-items-center p-2 rounded-3xl text-green-700 font-bold">
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="bg-blue-200 flex justify-items-center p-2 rounded-3xl text-blue-500 font-bold">
                        <span>Non-Active</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {"2024-02-05"}
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex gap-5">
                      <FeatherIcon icon="edit-2" size={20} />
                      <FeatherIcon
                        icon="trash-2"
                        size={20}
                        className="cursor-pointer"
                        onClick={() => deleteUser(item._id)}
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
              { length: Math.ceil(users.length / itemsPerPage) },
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

export default Users;
