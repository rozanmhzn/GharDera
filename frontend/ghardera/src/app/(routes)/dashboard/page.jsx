"use client";

import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  PasswordInput,
} from "@mantine/core";
import FeatherIcon from "feather-icons-react";
import { PiHouseBold } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { APIGetAllPropertyAdmin } from "@/apis/Property";
import {
  APIChangePasswordAdmin,
  APIGetAllBookings,
  APIGetAllUsers,
} from "@/apis/User";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [property, setProperty] = useState(null);
  const [users, setUsers] = useState(null);
  const [tourRequest, setTourRequest] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const prop = await APIGetAllPropertyAdmin();
      const user = await APIGetAllUsers();
      const tour = await APIGetAllBookings();
      setProperty(prop);
      setUsers(user);
      setTourRequest(tour);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    control,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      oldpassword: "",
      newpassword: "",
      confirm: "",
    },
  });

  let pwd = watch("newpassword");

  const onSubmit = async (data) => {
    try {
      const res = await APIChangePasswordAdmin(data);
      console.log(res);
      if (res) {
        toast.success(res.message);
        reset();
        close(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="m-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold"> Dashboard</span>
          </div>
        </div>
        {/*Welcome section*/}
        <div className="h-24 mt-5">
          {/* //Modal's body */}
          <Modal
            opened={opened}
            onClose={close}
            title="Change Password"
            centered
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div>
                  <label className="text-xl font-semibold">
                    Old-Password :
                  </label>
                  <Controller
                    control={control}
                    name="oldpassword"
                    rules={{ required: "required" }}
                    // defaultValue={item?.oldpassword}
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        //value={item?.oldpassword}
                        placeholder="Enter your Old Password."
                        error={errors.oldpassword?.message}
                      />
                    )}
                  />
                </div>

                <div className="mt-5">
                  <label className="text-xl font-semibold">
                    New-Password :
                  </label>
                  <Controller
                    control={control}
                    name="newpassword"
                    rules={{ required: "required" }}
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        placeholder="Enter your New-Password here...."
                        error={errors.newpassword?.message}
                      />
                    )}
                  />
                </div>
                <div className="mt-5">
                  <label className="text-xl font-semibold">
                    Confirm-Password :
                  </label>
                  <Controller
                    control={control}
                    name="confirm"
                    rules={{
                      required: "You must specify a password",
                      validate: (value) =>
                        value === pwd || "The passwords do not match",
                    }}
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        placeholder="Re-Enter your New-Password here...."
                        error={errors.confirm?.message}
                      />
                    )}
                  />
                </div>

                <div className="w-full mt-5 flex justify-center">
                  <Button
                    type="submit"
                    radius={4}
                    size="md"
                    style={{ backgroundColor: "#235789" }}
                    //leftSection={<SlCalender/>}
                    className="p-4"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </Modal>
          <div>
            <span className="text-xl font-bold">Welcome Admin,</span>
          </div>
          <div className="flex justify-between">
            <div className="text-lg font-medium p-2">
              <span>Rojan Maharjan</span> <br></br>
              <span>admin@ghardera.com</span>
            </div>
            <div>
              <Button
                type="button"
                onClick={open}
                variant="subtle"
                leftSection={<FeatherIcon icon="lock" />}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
        {/*count section*/}
        <div className="p-2 h-32 grid grid-cols-3 gap-5 text-lg font-medium">
          <div className="h-24 border-solid border-2 rounded-xl flex justify-around items-center ">
            <div>
              <PiHouseBold size={40} />
            </div>
            <div>
              <div>{property?.length}</div>
              Total Properties
            </div>
          </div>
          <div className="h-24 border-solid border-2 rounded-xl flex justify-around items-center">
            <div>
              <FaUserAlt size={40} />
            </div>
            <div>
              <div>{users?.length}</div>
              Total Users
            </div>
          </div>
          <div className="h-24 border-solid border-2 rounded-xl flex justify-around items-center">
            <div>
              <CgCalendarDates size={40} />
            </div>
            <div>
              <div>{tourRequest?.length}</div>
              Total Tour-Request
            </div>
          </div>
        </div>
        {/*Property section */}
        <div className="p-2 h-32">
          <div className="mb-3">
            <span className="text-lg font-semibold">Properties</span>
          </div>
          <div
            className="h-24 w-52 p-2 border-solid border-2 rounded-xl flex items-center cursor-pointer"
            onClick={() => router.push("/dashboard/property/add-property")}
          >
            <FeatherIcon icon="plus" />
            <span className="text-lg font-medium">Add Property</span>
          </div>
        </div>
        {/*Inquiries section */}
        <div className="p-2 h-32 mt-5">
          <div className="mb-3">
            <span className="text-lg font-semibold">Inquiries</span>
          </div>
          <div
            className="h-24 w-52 p-2 border-solid border-2 rounded-xl flex items-center cursor-pointer"
            onClick={() => router.push("/dashboard/inquiry")}
          >
            <FeatherIcon icon="eye" />
            <span className="text-lg font-medium">View Inquiries</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
