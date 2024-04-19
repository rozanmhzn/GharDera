"use client";

import { TextInput, Button, FileButton, Alert } from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import img from "../../../../assets/profileImage/rozan.png";



const Profile = () => {
  const [profileImage, setProfileImage] = useState(undefined);
  const fileref = useRef(null);
  const [data, setData] = useState(null);

  

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      number: "",
      address: "",
      dob: "",
      avatar: "",
    },
  });

  


 

  const onSubmit = async (data) => {
   console.log(data)
  };

  return (
    <>
      <div className="flex p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex gap-x-10">
            <div className=" w-64 h-64 mt-5">
              <input
                onChange={(e) => setProfileImage(e.target.files[0])}
                type="file"
                ref={fileref}
                hidden
                accept="image/*"
              />
              {profileImage ? (
                <Image
                  name="avatar"
                  onClick={() => fileref.current.click()}
                  src={img}
                  width={250}
                  height={280}
                  alt="Profile Pic"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <button type="button" onClick={() => fileref.current.click()}>
                    Upload Photo
                  </button>
                </div>
              )}
              </div>
        

           
            {/* </div> */}
            <div className="w-64 ">
              {/* //Fullname */}
              <div className="mb-2">
                <label className="text-base font-semibold"> Fullname </label>
                <div>
                  <Controller
                    control={control}
                    name={"fullname"}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <TextInput
                        variant="filled"
                        radius={"md"}
                        {...field}
                        placeholder="Name"
                        error={errors.fullname?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* //Email */}
              <div className="mb-2">
                <label className="text-base font-semibold"> Email</label>
                <div className="">
                  <Controller
                    control={control}
                    name={"email"}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <TextInput
                        variant="filled"
                        radius={"md"}
                        {...field}
                        placeholder="example@gmail.com"
                        error={errors.email?.message}
                      />
                    )}
                  />
                </div>
              </div>
              {/* //Contact */}
              <div className="mb-2">
                <label className="text-base font-semibold"> Contact</label>
                <div>
                  <Controller
                    control={control}
                    name={"number"}
                    rules={{ required: "Contact is required" }}
                    render={({ field }) => (
                      <TextInput
                        variant="filled"
                        radius={"md"}
                        {...field}
                        placeholder="9841963906"
                        error={errors.contact?.message}
                      />
                    )}
                  />
                </div>
              </div>
              {/* //Address */}
              <div className="mb-2">
                <label className="text-base font-semibold"> Address</label>
                <div>
                  <Controller
                    control={control}
                    name={"address"}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        variant="filled"
                        radius={"md"}
                        placeholder="Lagan, Kathmandu"
                        error={errors.address?.message}
                      />
                    )}
                  />
                </div>
              </div>
              {/* //DOB */}
              <div className="mb-2">
                <label className="text-base font-semibold">Date of Birth</label>
                <div>
                  <Controller
                    control={control}
                    name={"dob"}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextInput
                        type="date"
                        {...field}
                        variant="filled"
                        radius={"md"}
                        placeholder="DOB"
                        error={errors.dob?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* UpdateButton & DeleteButton */}
              <div className="grid grid-cols gap-5 mt-5">
                <Button type="submit" variant="filled" size="md">
                  Update
                </Button>
                <Button
                  type="button"
                  variant="filled"
                  color="gray"
                  size="md"
                  onClick={() => deleteProfile()}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

    
    </>
  );
};

export default Profile;

const deleteProfile = () => {
  <>
    {console.log("delete")}
    <Alert
      variant="light"
      color="blue"
      withCloseButton
      title="Alert title"
      // icon={icon}
    >
      <div>hahaha</div>
    </Alert>
    ;
  </>;
};
