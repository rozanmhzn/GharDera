"use client";
import ImageCarousel, {
  propertyDetailDes,
} from "@/components/common/ImageCarousel";
import React from "react";
import image1 from "../../../assets/propertyImages/familyHouse.svg";
import image2 from "../../../assets/propertyImages/SingleImg2.svg";
import chromong from "../../../assets/propertyImages/chomrong.svg";
import { IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { FaPhone, FaVectorSquare } from "react-icons/fa6";
import ColoredLine from "@/components/common/ColoredLine";
import { FiEye } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";
import PropertyCard from "@/components/common/PropertyCard";
import { propertyDetails } from "@/utils/constant/propertyDetails";
import { Controller, useForm } from "react-hook-form";
import { Breadcrumbs, Button, TextInput } from "@mantine/core";
import Link from "next/link";

export const images = [
  { image: image1 },
  { image: image2 },
  { image: chromong },
];
const PropertyDescription = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const items = [
    { title: "Home", href: "/" },
    { title: "Property", href: "#" },
    { title: propertyDetailDes?.name, href: "#" },
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
    <div>
      <section className="px-20 mb-5">
        <Breadcrumbs separator=">">{newItems}</Breadcrumbs>
      </section>
      <ImageCarousel images={images} />
      <section className="px-20 ">
        <div className="grid grid-cols-2 gap-2 font-normal">
          <section className="mb-10">
            <header className="flex flex-col gap-2 mb-9">
              <section className="flex justify-between font-semibold">
                <h1 className="text-2xl">{propertyDetailDes.name}</h1>
                <h1 className="text-3xl">{propertyDetailDes.price}</h1>
              </section>

              <span className="flex items-center gap-2 text-subHeading">
                <IoLocationOutline size={30} />
                {propertyDetailDes?.location}
              </span>
              <div className="flex gap-7 text-subHeading">
                <span className="flex items-center gap-2 ">
                  <IoBedOutline size={30} />{" "}
                  {propertyDetailDes?.flatDescription}
                </span>
                <span className="flex items-center gap-2 ">
                  <FaVectorSquare size={20} /> {propertyDetailDes?.sqArea}
                </span>
              </div>
            </header>
            <ColoredLine color={"#C7C7C7"} />
            <section className="flex flex-col mb-9">
              <h1 className="font-medium mb-4">Description</h1>
              <span className="text-subHeading">
                {propertyDetailDes?.description}
              </span>
            </section>
            <section className="flex flex-col mb-9">
              <h1 className="font-medium mb-4">Property Feature</h1>
              <span className="text-subHeading grid grid-cols-3 gap-5">
                {propertyDetailDes?.features.map((data, idx) => (
                  <div key={idx} className="flex items-center gap-2 ">
                    <span className="text-primary bg-lightprimary h-10 flex items-center w-10 justify-center rounded-full">
                      {data?.icon}
                    </span>
                    <span>{data?.name}</span>
                  </div>
                ))}
              </span>
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
              <div>Posted on : {propertyDetailDes?.createdAt}</div>
              <div>Last updated : {propertyDetailDes?.updatedAt}</div>
              <div>Posted By : {propertyDetailDes?.listerName}</div>
            </section>
          </section>

          <section className="w-full flex justify-center text-xl">
            <form
              className="space-y-6 w-[30vw] p-7 bg-bgYellow h-fit rounded-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <header className="text-primary text-center mb-7">
                  Let&apos;s Talk! Request a Call Back and Discover Your Dream
                  Place Today!
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
                  <label className="text-subHeading">Contact Number</label>
                </div>
                <div className="mt-2">
                  <Controller
                    control={control}
                    name={"contact"}
                    rules={{ required: "required" }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="Password"
                        error={errors.contact?.message}
                      />
                    )}
                  />
                  <div className="error">
                    {errors.username && <p>{errors.contact.message}</p>}
                  </div>
                </div>
              </div>

              <div className="w-full mt-20 flex justify-center">
                <Button
                  type="submit"
                  radius={4}
                  size="md"
                  style={{ backgroundColor: "#235789" }}
                  leftSection={<FaPhone />}
                  className="p-4"
                >
                  Request a Callback
                </Button>
              </div>
            </form>
          </section>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">
            Properties Nearby you may be interested in
          </h1>
          <PropertyCard propetiesDetails={propertyDetails} />
        </div>
      </section>
    </div>
  );
};

export default PropertyDescription;
