"use client";
import ImageCarousel, {
  propertyDetailDes,
} from "@/components/common/ImageCarousel";
import React, { useEffect, useState } from "react";
import image1 from "../../../assets/propertyImages/familyHouse.svg";
import image2 from "../../../assets/propertyImages/SingleImg2.svg";
import chromong from "../../../assets/propertyImages/chomrong.svg";
import { IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { FaPhone, SlCalender, FaVectorSquare } from "react-icons/fa6";
import ColoredLine from "@/components/common/ColoredLine";
import { FiEye } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";
import PropertyCard from "@/components/common/PropertyCard";
import { Controller, useForm } from "react-hook-form";
import {
  Anchor,
  Breadcrumbs,
  Button,
  TextInput,
  Textarea,
} from "@mantine/core";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

export const images = [
  { image: image1 },
  { image: image2 },
  { image: chromong },
];
const PropertyDescription = () => {
  const [data, setData] = useState(null);
  const [nearData, setNearData] = useState(null);
  //const router = useRouter();
  const pathname = usePathname();
  const baseURL = "http://localhost:4000/api/property/user/properties/";
  // console.log(pathname);
  const path = pathname.split("/");
  const slug = path[2];
  //console.log(typeof(slug))
  // console.log(path[2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${baseURL}${slug}`,
        }).then((response) => {
          setData(response.data);
          //console.log(response);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: baseURL,
        }).then((response) => {
          setNearData(response.data);
          //console.log(response.data);
        });
      } catch (error) {
        //console.log(error);
      }
    };
    fetchData();
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      message: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
  console.log(data)
  };

  const items = [
    { title: "Home", href: "/" },
    { title: "Property", href: "#" },
    { title: data?.propertyTitle, href: "#" },
  ];
  const newItems = items.map((item, index) => (
    <Link href={item.href} key={index}>
      <span
        className={`${
          items?.length - 1 === index ? "text-black" : "text-primary"
        } `}
      >
        {item.title}
      </span>
    </Link>
  ));

  return (
    <>
      {data && (
        <div>
          <section className="px-20 mb-5">
            <Breadcrumbs separator=">">{newItems}</Breadcrumbs>
          </section>
          <ImageCarousel images={data.ImagesURL} />
          <section className="px-20 ">
            <div className="grid grid-cols-2 gap-2 font-normal">
              <section className="mb-10">
                <header className="flex flex-col gap-2 mb-9">
                  <section className="flex justify-between font-semibold">
                    <h1 className="text-2xl">{data.propertyTitle}</h1>
                    <h1 className="text-3xl">RS. {data.propertyPrice}</h1>
                  </section>

                  <span className="flex items-center gap-2 text-subHeading">
                    <IoLocationOutline size={30} />
                    {data?.propertyAddress.city}
                  </span>
                  <div className="flex gap-7 text-subHeading">
                    <span className="flex items-center gap-2 ">
                      <IoBedOutline size={30} /> {data?.negotiable}
                    </span>
                    <span className="flex items-center gap-2 ">
                      <FaVectorSquare size={20} /> {data?.propertyArea}
                    </span>
                  </div>
                </header>
                <ColoredLine color={"#C7C7C7"} />
                <section className="flex flex-col mb-9">
                  <h1 className="font-medium mb-4">Description</h1>
                  <span className="text-subHeading">
                    {data?.propertyDescription}
                  </span>
                </section>
                <section className="flex flex-col mb-9">
                  <h1 className="font-medium mb-4">Property Feature</h1>
                
                </section>
                <ColoredLine color={"#C7C7C7"} />
                <section className="text-subHeading flex flex-col gap-2">
                  <div className="flex gap-5">
                    <span className="flex gap-2 items-center">
                      <FiEye />
                      {propertyDetailDes?.view}
                    </span>
                    <span className="flex gap-2 items-center">
                      <CiShare2 />
                      {propertyDetailDes?.share}
                    </span>
                  </div>
                  <div>Posted on : {data?.createdAt}</div>
                  <div>Last updated : {data?.updatedAt}</div>
                  <div>Posted By : {data?.userRef}</div>
                </section>
              </section>

              <div className="grid gap-5">
                {/* Tour Book section */}
                <section className="w-full flex justify-center text-xl">
                  <form
                    className="space-y-6 w-[30vw] p-7 bg-bgYellow h-fit rounded-xl"
                    // onSubmit={handleSubmit()}
                  >
                    <div>
                      <header className="text-primary text-center mb-7">
                        Let&apos;s Talk! Request a Tour and Discover Your Dream
                        Place Today!
                      </header>
                      
                    </div>

                    <div className="w-full mt-20 flex justify-center">
                      <Button
                        //type="submit"
                        radius={4}
                        size="md"
                        style={{ backgroundColor: "#235789" }}
                        //leftSection={<SlCalender/>}
                        className="p-4"
                      >
                        Request a Tour
                      </Button>
                    </div>
                  </form>
                </section>

                {/* inquiry Section */}

                <section className="w-full flex justify-center text-xl">
                  <form
                    className="space-y-6 w-[30vw] p-7 bg-bgYellow h-fit rounded-xl"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <header className="text-primary text-center mb-7">
                        Let&apos;s Chat about your Dream Home, share your
                        inquiries and let&apos;s start the conversation. Today!
                      </header>
                      <label className="text-subHeading">Your name</label>
                      <div className="mt-2">
                        <Controller
                          control={control}
                          name={"name"}
                          rules={{ required: "required" }}
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              placeholder="Name"
                              error={errors.name?.message}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-subHeading">Email</label>
                      </div>
                      <div className="mt-2">
                        <Controller
                          control={control}
                          name={"email"}
                          rules={{ required: "required" }}
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              placeholder="email address"
                              error={errors.email?.message}
                            />
                          )}
                        />
                        <div className="error">
                          {errors.username && <p>{errors.email.message}</p>}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-subHeading">
                          Contact Number
                        </label>
                      </div>
                      <div className="mt-2">
                        <Controller
                          control={control}
                          name={"contact"}
                          rules={{ required: "required" }}
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              placeholder="Contact Number"
                              error={errors.contact?.message}
                            />
                          )}
                        />
                        <div className="error">
                          {errors.username && <p>{errors.contact.message}</p>}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-subHeading">Message</label>
                      </div>
                      <div className="mt-2">
                        <Controller
                          control={control}
                          name={"message"}
                          rules={{ required: "required" }}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="Share your inquiries"
                              error={errors.message?.message}
                            />
                          )}
                        />
                        <div className="error">
                          {errors.username && <p>{errors.message.message}</p>}
                        </div>
                      </div>
                      {/* //hidden Input */}
                      <div className="mt-2">
                        <Controller
                          control={control}
                          name={"property"}
                          defaultValue={data?._id}
                          render={({ field }) => (
                            <TextInput
                              type="hidden"
                              {...field}
                              
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="w-full mt-20 flex justify-center">
                      <Button
                        type="submit"
                        radius={4}
                        size="md"
                        style={{ backgroundColor: "#235789" }}
                        className="p-4"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-2xl font-semibold mb-5">
                Properties Nearby you may be interested in
              </h1>
              <PropertyCard propertiesDetails={nearData} />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PropertyDescription;
