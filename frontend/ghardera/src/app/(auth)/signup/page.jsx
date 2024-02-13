"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[30rem] box-shadow p-6">
          <div className="flex justify-center items-center p-5">
            <h1>Logo</h1>
          </div>
          <div className="flex justify-center items-center p-5">
            <h1>Welcome ghardera Sign Up page!!</h1>
          </div>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between ">
              <div className="w-1/2">
                <label
                  for="email"
                  className="block text-sm font-medium  text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-1">
                  <Controller
                    control={control}
                    name={"fullName"}
                    rules={{ required: "required" }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        control
                        placeholder="Full Name"
                        error={errors.fullName?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Contact
                </label>
                <div className="mt-1">
                  <Controller
                    control={control}
                    name={"contact"}
                    rules={{ required: "required" }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        control
                        placeholder="Contact"
                        error={errors.contact?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name={"email"}
                  rules={{ required: "required" }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      control
                      placeholder="Email"
                      error={errors.email?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <Controller
                  control={control}
                  name={"contact"}
                  rules={{ required: "required" }}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      control
                      placeholder="Contact"
                      error={errors.contact?.message}
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
