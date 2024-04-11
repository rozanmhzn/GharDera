"use client";

import React, { useState, useEffect } from "react";
import { TextInput } from "@mantine/core";
import FeatherIcon from "feather-icons-react";
import { inquiryData } from "@/utils/constant/inquiryData";
import { BsChat } from "react-icons/bs";

const Inquiy = () => {
 
  return (
    <>
      {/* //top div */}
      <div className=" m-5">
        {/* //title section div */}
        <div className="flex items-center">
          <span className="text-lg font-semibold">Inquiries</span>
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
                    Contact
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Inquiry
                </th>
                
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-black font-normal">
              {inquiryData?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center">
                      {/* <Image src={item.img} width={50} height={50} /> */}
                      <div className="ml-2">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.message}
                  </td>
                  

                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div
                      className="flex justify-center  items-center gap-3 cursor-pointer"
                      onClick={() => alert("Modal")}
                    >
                      <div>
                        <BsChat size={18} />
                      </div>
                      <div>
                        <span className="text-blue-400 text-lg">Reply</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
    </>
  );
};

export default Inquiy;
