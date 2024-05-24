"use client";

import { TextInput, Button, Alert } from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { APIUpdateProfile, APIUserProfile } from "@/apis/User";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../../../../../firebase";

import CardProfile from "@/components/CardProfile";
import { useAuth } from "@/stores/AuthProvider";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [data, setData] = useState(null);
  const { login } = useAuth();

  useEffect(() => {
    if (profileImage) {
      handleImageUpload(profileImage);
    }
  }, [profileImage]);

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

  const handleImageUpload = (profileImage) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + profileImage.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, profileImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
        });
      }
    );
  };

  const fetchUser = async () => {
    try {
      const res = await APIUserProfile();
      setData(res);

      for (const [key, value] of Object.entries(res)) {
        setValue(key, value);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await APIUpdateProfile(data);
      if (res) {
        //await login(res?.updatedProfile);
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Profile update failed..!!");
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex gap-x-10">
            <CardProfile
              control={control}
              setValue={setValue}
              image={data?.avatar}
            />
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
    >
      <div>hahaha</div>
    </Alert>
    ;
  </>;
};
