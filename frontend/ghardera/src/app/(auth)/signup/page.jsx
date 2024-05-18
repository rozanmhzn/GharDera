"use client";
import { APIUserRegister } from "@/apis/Auth";
import { useAuth } from "@/stores/AuthProvider";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUp = () => {
  const {  signup } = useAuth();
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      number: "",
      confirm: "",
    },
  });
  let pwd = watch("password");
  const onSubmit = async (data) => {
    try {
      const res = await APIUserRegister(data);
      
      await signup(res);
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 background">
        <div className=" sm:mx-auto sm:w-full sm:max-w-[30rem] box-shadow p-6">
          <div className="flex justify-center items-center p-5">
            <Link href="/">
              <h1>Logo</h1>
            </Link>
          </div>
          <div className="flex justify-center items-center p-5">
            <h1>Welcome Ghardera Sign Up Page!!</h1>
          </div>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between ">
              <div className="w-1/2">
                <label className="block text-sm font-medium  text-gray-900">
                  Full name
                </label>
                <div className="mt-1">
                  <Controller
                    control={control}
                    name={"fullname"}
                    rules={{ required: "required" }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="Full Name"
                        error={errors.fullName?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Contact
                </label>
                <div className="mt-1">
                  <Controller
                    control={control}
                    name={"number"}
                    rules={{
                      required: "Contact number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Contact number must be exactly 10 digits",
                      },
                    }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="Contact"
                        error={errors.number?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name={"email"}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      placeholder="Email"
                      error={errors.email?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <Controller
                  control={control}
                  name={"password"}
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
                      placeholder="Password"
                      error={errors.password?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
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
                      {...field}
                      placeholder="Password"
                      error={errors.confirm?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-start py-3">
              Already have an account?
              <Link href="/login">
                <span className="text-blue-700">&nbsp;Login</span>
              </Link>
            </div>

            <div className="flex justify-start">
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
