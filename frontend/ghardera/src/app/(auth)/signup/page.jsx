"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Router, useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      number: "",
    },
  });
  const onSubmit = async (data) => {
   // console.log(data);
    try {
      const response = await axios
        .post("http://localhost:4000/api/user/signup", data)
        .then(function (response) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          //console.log(response.data)
          router.push("/");
        });
    } catch (err) {
      console.log(err);
    }
    //console.log(data);
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
                <label
                  for="fullname"
                  className="block text-sm font-medium  text-gray-900"
                >
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
                        control
                        placeholder="Full Name"
                        error={errors.fullname?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label
                  for="number"
                  className="block text-sm font-medium text-gray-900"
                >
                  Contact
                </label>
                <div className="mt-1">
                  <Controller
                    control={control}
                    name={"number"}
                    rules={{ required: "required" }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        control
                        placeholder="Contact"
                        error={errors.number?.message}
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
                  name={"password"}
                  rules={{ required: "required" }}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      control
                      placeholder="Password"
                      error={errors.password?.message}
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
