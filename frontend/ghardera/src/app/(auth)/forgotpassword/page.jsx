"use client";

import React from "react";
import Link from "next/link";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

const ForgotPassword = () => {
  const onSubmit = (data) => {
    // console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 background">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm box-shadow p-10">
          <div className="flex justify-center items-center p-5">
            <Link href="/">
              <h1>Logo</h1>
            </Link>
          </div>
          <div className="flex justify-start">Forgot Password?</div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <Controller
                control={control}
                name={"email"}
                rules={{ required: "required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    control
                    placeholder="Enter your Email address"
                    error={errors.email?.message}
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

export default ForgotPassword;
