"use client";

import React, {useState} from "react";
import {
  NativeSelect,  
  Button,

} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FeatherIcon from "feather-icons-react";

const users = [
  {
    name: "Rojan Maharjan",
    email: "rozanmhzn07@gmail.com",
    contact: "9841963906",
    status: "active",
  },
  {
    name: "Suahan Maharjan",
    email: "suahanmhzn@gmail.com",
    contact: "9843820870",
    status: "active",
  },
  {
    name: "Purnima Maharjan",
    email: "purnimamhzn@gmail.com",
    contact: "9745352372",
    status: "active",
  },
  {
    name: "Rojan Maharjan",
    email: "rozanmhzn07@gmail.com",
    contact: "9841963906",
    status: "non-active",
  },
  {
    name: "Purnima Maharjan",
    email: "purnimamhzn@gmail.com",
    contact: "9745352372",
    status: "active",
  },
  {
    name: "Purnima Maharjan",
    email: "purnimamhzn@gmail.com",
    contact: "9745352372",
    status: "non-active",
  },
  {
    name: "Purnima Maharjan",
    email: "purnimamhzn@gmail.com",
    contact: "9745352372",
    status: "active",
  },
];

const Users = () => {

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5; // Change this value to adjust the number of items per page

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="w-full">
        <div className=" flex justify-between">
          <div className="text-2xl font-semibold">Users</div>
          <div className="w-32">
            <NativeSelect
              // description="Sort By"
              data={[
                { label: "Latest", value: "Latest" },
                { label: "Oldest", value: "Oldest" },
                //  { label: "Svelte", value: "svelte", disabled: true },
                //{ label: "Vue", value: "vue" },
              ]}
            />
          </div>
        </div>
        {/* {users.map((data, index) => (
          <h1 key={index}>{[index + 1, data.name, data.email]}</h1>
        ))} */}
        <div className="mt-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  #
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
                  Date Created
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={index} onClick={() => console.log(index)}>
                  <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.status}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span>2024-05-03</span>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex gap-3">
                      {/* <Modal
                        opened={opened}
                        onClose={close}
                        title="Update User" centered
                      >
                        <form>
                          <div>
                            <TextInput
                              label="Input label"
                             // description="Input description"
                              placeholder="Input placeholder"
                            />
                          </div>
                        </form>
                      </Modal> */}
                      {/* <Button onClick={open}>Edit</Button>
                      <Button color="red">Delete</Button> */}
                      <div>
                        <Button variant="transparent" color="blue">
                          {<FeatherIcon icon="edit" size={18} />}
                        </Button>
                      </div>
                      <div>
                        <Button variant="transparent" color="red">
                          {<FeatherIcon icon="trash-2" size={18} />}
                        </Button>
                      </div>
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

export default Users