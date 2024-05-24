"use client";

import React from "react";
import {
  Breadcrumbs,
  TextInput,
  Button,
  PasswordInput,
} from "@mantine/core";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import ColoredLine from "@/components/common/ColoredLine";

const items = [
  { title: "Customers", href: "/dashboard/users" },
  { title: "Customer Creating Form", href: "#" },
];
const newItems = items.map((item, index) => (
  <Link href={item.href} key={index}>
    <span
      className={`${
        items?.length - 1 === index ? "text-gray-500" : "text-primary"
      } `}
    >
      {item.title}
    </span>
  </Link>
));

const AddUser = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    //console.log("thik")
    // console.log(data.propertyAddress)
    console.log(data);
  };
  return (
    <>
      <div className="m-5">
        <Breadcrumbs separator=">">{newItems}</Breadcrumbs>
        <div className="mt-5">
          <span className="text-xl font-semibold">Customer Creating Form</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Users details div */}
          <div className="mt-5 flex">
            <div className="w-2/5">
              <span className="text-lg font-medium">Customer`&apos;`s Details</span>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-5">
                {/* Customer email section */}
                <div className="">
                  <label className="text-ld font-medium">Email</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={"email"}
                      rules={{ required: "required" }}
                      render={({ field }) => (
                        <>
                          <TextInput
                            {...field}
                            placeholder="example@example.com"
                            error={errors.email?.message}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Customer name section */}
                <div className="">
                  <label className="text-ld font-medium">Fullname </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={"fullname"}
                      rules={{ required: "required" }}
                      render={({ field }) => (
                        <>
                          <TextInput
                            {...field}
                            placeholder="John Doe"
                            error={errors.fullname?.message}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Customer password section */}
                <div className="">
                  <label className="text-ld font-medium">Password</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={"password"}
                      rules={{ required: "required" }}
                      render={({ field }) => (
                        <>
                          <PasswordInput
                            {...field}
                            placeholder="********"
                            error={errors.password?.message}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Customer No. section */}
                <div className="">
                  <label className="text-ld font-medium">Contact No.</label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={"contact"}
                      // rules={{ required: "required" }}
                      render={({ field }) => (
                        <>
                          <TextInput
                            {...field}
                            placeholder="9800000000"
                            //error={errors.contact?.message}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-10">
                <Button color="rgba(110, 110, 110, 1)" size="md" radius={4}>
                  Discard
                </Button>
                <Button type="submit" color="#235789" radius={4} size="md">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ColoredLine color={"#C7C7C7"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
