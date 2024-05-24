"use client";

import React from "react";
import { PasswordInput, Button } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { APIChangePassword } from "@/apis/User";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldpassword: "",
      newpassword: "",
      confirm: "",
    },
  });

  let pwd = watch("newpassword");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await APIChangePassword(data);
      if (res) {
        console.log(res);
        toast.success(res?.message);
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="m-5">
        <div className="flex items-center">
          <span className="text-lg font-semibold">Change Password</span>
        </div>
        <div className="w-64">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Old Password  */}
            <div className="mt-5">
              <label className="text-base font-medium"> Old Password </label>
              <div>
                <Controller
                  control={control}
                  name={"oldpassword"}
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
                      variant="filled"
                      radius={"md"}
                      {...field}
                      placeholder="Enter Old Password"
                      error={errors.oldpassword?.message}
                    />
                  )}
                />
              </div>
            </div>
            {/* New Password  */}
            <div className="mt-5">
              <label className="text-base font-medium"> New Password </label>
              <div>
                <Controller
                  control={control}
                  name={"newpassword"}
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
                      variant="filled"
                      radius={"md"}
                      {...field}
                      placeholder="Enter New Password"
                      error={errors.newpassword?.message}
                    />
                  )}
                />
              </div>
            </div>
            {/* Confirm New Password  */}
            <div className="mt-5">
              <label className="text-base font-medium">
                Confirm New Password{" "}
              </label>
              <div>
                <Controller
                  control={control}
                  name={"confirm"}
                  rules={{
                    required: "You must specify a password",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long",
                    },
                    validate: (value) =>
                      value === pwd || "The passwords do not match",
                  }}
                  render={({ field }) => (
                    <PasswordInput
                      variant="filled"
                      radius={"md"}
                      {...field}
                      placeholder="Enter New Password"
                      error={errors.confirm?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-around mt-5">
              <div>
                <Button variant="filled" type="submit">
                  Update
                </Button>
              </div>
              <div>
                <Button variant="filled" color="red">
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
