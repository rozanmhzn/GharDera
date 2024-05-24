"use client";

import React from "react";
import Link from "next/link";
import { Button, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { APIVerifyUser } from "@/apis/Auth";
import { useAuth } from "@/stores/AuthProvider";
import { toast } from "react-toastify";

const VerifyUser = () => {
  const { login } = useAuth();
  const pathname = usePathname();
  const path = pathname.split("/");
  //console.log(path);
  const token = path[2];
  // console.log(token);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await APIVerifyUser(data, token);
      if (res) {
        await login(res);
        console.log(res);
        toast.success(res?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 background">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm box-shadow p-10">
          <div className="flex justify-center items-center p-5">
            <Link href="/">
              <h1>Logo</h1>
            </Link>
          </div>
          <div className="flex justify-start">Enter OTP</div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <Controller
                control={control}
                name={"otp"}
                rules={{ required: "required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    control
                    placeholder="Enter OTP"
                    error={errors.otp?.message}
                  />
                )}
              />
            </div>
            <div className=" flex justify-around mt-5">
              <Button type="submit" radius={20}>
                Submit
              </Button>
              <Button color="gray" radius={20}>
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyUser;
