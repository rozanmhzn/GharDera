"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { APIResendOTP, APIVerifyOTP } from "@/apis/Auth";
import { useAuth } from "@/stores/AuthProvider";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const [id, setID] = useState(null);
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: "",
      otp: "",
    },
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    setID(id);
    console.log(id);
    setValue("id", id);
  }, [id]);

  const onSubmit = async (data) => {
    console.log(data);
    const res = await APIVerifyOTP(data);
    console.log(res);
    if (res.email) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
    await login(res);
  };

  const resendOTP = async (id) => {
    console.log(id);
    const res = await APIResendOTP(id);
    console.log(res);
    toast.success(res?.message);
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
            <div className="mt-2">
              <Controller
                control={control}
                name={"id"}
                rules={{ required: "required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="hidden"
                    control
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
          <div className="text-sm mt-5">
            <span
              onClick={() => resendOTP(id)}
              className="font-semibold text-indigo-600 cursor-pointer"
            >
              Resend OTP?
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
