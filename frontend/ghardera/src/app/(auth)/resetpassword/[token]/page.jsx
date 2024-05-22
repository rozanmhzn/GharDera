"use client";

import React from "react";
import Link from "next/link";
import { Button, PasswordInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { APIResetPassword } from "@/apis/Auth";
import { toast } from "react-toastify";

const ResetPssword = () => {
  const pathname = usePathname();
  const path = pathname.split("/");
  const token = path[2];

  const onSubmit = async (data) => {
    console.log(data, token);
    try {
      const res = await APIResetPassword(data, token);
      reset();
      console.log(res);
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
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
                name={"newPassword"}
                rules={{
                  required: "required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    placeholder="Enter New Password"
                    error={errors.newPassword?.message}
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

export default ResetPssword;
