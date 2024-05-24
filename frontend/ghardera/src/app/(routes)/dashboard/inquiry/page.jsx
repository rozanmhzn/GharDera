"use client";

import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Textarea } from "@mantine/core";

import FeatherIcon from "feather-icons-react";
import { BsChat } from "react-icons/bs";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { APIReplyInquiry } from "@/apis/Property";

const Inquiy = () => {
  const [data, setData] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      //sender : "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await APIReplyInquiry(data);
      if (res) {
        toast.success(res.message);
        close(true);
      }
    } catch (error) {
      // console.log(error)
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:4000/api/property/admin/inquiries`,
        }).then((response) => {
          //console.log(response.data)
          setData(response.data);
          //console.log(response.data)
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
          <span className="text-lg font-semibold">Inquiries</span>
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
                  Inquiry
                </th>
                
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4  text-black font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-black font-normal">
              {currentItems?.map((item, index) => (
                <tr
                  key={index}
                  //onClick={() => console.log(item?.email)}
                >
                  <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center">
                      {/* <Image src={item.img} width={50} height={50} /> */}
                      <div className="ml-2">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.property.propertyTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.message}
                  </td>
                 
                  {/* //Modal's body */}
                  <Modal
                    opened={opened}
                    onClose={close}
                    title="Inquiry Reply"
                    centered
                    
                  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="">
                        <div>
                          <label className="text-xl font-semibold">
                            Email :
                          </label>
                          <Controller
                            control={control}
                            name="email"
                            rules={{ required: "required" }}
                            // defaultValue={item?.email}
                            render={({ field }) => (
                              <TextInput
                                {...field}
                                //value={item?.email}
                                placeholder="example@gmail.com"
                                error={errors.email?.message}
                              />
                            )}
                          />
                        </div>

                        <div className="mt-5">
                          <label className="text-xl font-semibold">
                            Message :
                          </label>
                          <Controller
                            control={control}
                            name="message"
                            rules={{ required: "required" }}
                            render={({ field }) => (
                              <Textarea
                                {...field}
                                placeholder="Enter your message here...."
                                error={errors.message?.message}
                              />
                            )}
                          />
                        </div>

                        <div className="w-full mt-5 flex justify-center">
                          <Button
                            type="submit"
                            radius={4}
                            size="md"
                            style={{ backgroundColor: "#235789" }}
                            //leftSection={<SlCalender/>}
                            className="p-4"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Modal>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div
                      className="flex justify-center  items-center gap-3 cursor-pointer"
                      onClick={open}
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

export default Inquiy;
