"use client";
import Link from "next/link";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@/stores/AuthProvider";
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import { APILoginUser } from "@/apis/Auth";

const LoginPage = () => {
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await APILoginUser(data);
      await login(res);
      console.log(res);
      console.log(res?.message);
      toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 background">
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm box-shadow p-10">
        <div className="flex justify-center items-center p-5">
          <Link href="/">
            <Image src={logo} alt="Logo" width={100} height={70} />
          </Link>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
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
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/forgotpassword"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
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
              <div className="error">
                {errors.username && <p>{errors.username.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            Don&apos;t Have an Account?
            <Link href="/signup">
              <span className="text-blue-700">&nbsp;Sign up</span>
            </Link>
          </div>

          <div className="w-full mt-20">
            <Button type="submit" radius={20} fullWidth size="md">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
