"use client";

import React from "react";
import Link from "next/link";
import { Button, PasswordInput,  } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

const ResetPassword = () => {
  const onSubmit = (data) => {
    // console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
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
          <div className="flex justify-start">Enter New Password</div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <Controller
                control={control}
                name={"password"}
                rules={{ required: "required" }}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    placeholder="Password"
                    error={errors.password?.message}
                  />
                )}
              />
            </div>
            <div className=" flex justify-center mt-5">
              <Button type="submit" radius={20}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
