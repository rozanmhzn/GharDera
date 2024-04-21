"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumbs,
  NativeSelect,
  TextInput,
  Textarea,
  Button,
  Input,
  Radio,
} from "@mantine/core";
import Link from "next/link";
import { useForm, Controller, setValue, getValues } from "react-hook-form";
import FeatherIcon from "feather-icons-react";
import ColoredLine from "@/components/common/ColoredLine";
import ImageDropzone from "@/components/ImageDropzone";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { APIGetEachProperty, APIUpdateProperty } from "@/apis/Property";

const items = [
  { title: "Property", href: "/dashboard/property" },
  { title: "Property Edit Form", href: "#" },
];
const newItems = items.map((item, index) => (
  <Link href={item.href} key={index}>
    <span
      className={`${
        items?.length - 1 === index ? "text-gray-500" : "text-primary"
      } `}
    >
      {item.title}
    </span>
  </Link>
));

const EditProperty = () => {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/");
  const slug = path[3];
  console.log(slug);

  const ref = useRef(null);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      
      const res = await APIGetEachProperty(slug);
      setData(res);
      for (const [key, value] of Object.entries(res)) {
        setValue(key, value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIncrement = (fieldName) => {
    const currentValue = Number(getValues(fieldName));
    setValue(fieldName, currentValue + 1);
  };

  const handleDecrement = (fieldName) => {
    const currentValue = Number(getValues(fieldName));
    setValue(fieldName, currentValue > 0 ? currentValue - 1 : 0);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      propertyTitle: "",
      propertyStatus: "",
      propertyType: "",
      propertyCategory: "",
      propertyAddress: {
        street: "",
        city: "",
        province: "",
      },
      propertyDescription: "",
      bedRooms: "",
      kitchens: "",
      bathroom: "",
      parking: "",
      propertyFace: "",
      roadAccess: "",
      floors: "",
      propertyArea: "",
      propertyPrice: "",
      negotiable: "",
      ownerName: "",
      ownerNumber: "",
      ImagesURL: [],
      userRef: "",
      propertyFeature: [],
      status: "",
    },
  });


  const onSubmit = async (data) => {
    
    try {
      const res = await APIUpdateProperty(data, slug);
      toast.success(res.message);
      router.push("/dashboard/property");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }

  };

  return (
    <>
      {/* top-div */}
      <div className="m-5">
        <Breadcrumbs separator=">">{newItems}</Breadcrumbs>
        <div className="mt-5">
          <span className="text-xl font-semibold">Property Edit Form</span>
        </div>
        {data && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Property details div */}
            <div className="mt-5 flex">
              <div className="w-2/5">
                <span className="text-lg font-medium">Property Details</span>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-2 gap-5">
                  {/* property status section */}
                  <div className="">
                    <label className="text-ld font-medium">
                      Property Status
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyStatus"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyStatus || ""}
                        render={({ field }) => (
                          <>
                            <NativeSelect
                              {...field}
                              value={field.value}
                              // onClick={()=> console.log(propertyAddress)}
                              onChange={(e) => field.onChange(e.target.value)}
                              error={errors.propertyStatus?.message}
                              rightSection={<FeatherIcon icon="chevron-down" />}
                              data={[
                                { label: "Select", value: "" },
                                { label: "Sale", value: "sale" },
                                { label: "Rent", value: "rent" },
                              ]}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* property type section */}
                  <div className="">
                    <label className="text-ld font-medium">
                      Property Type{" "}
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyType"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyType || ""}
                        render={({ field }) => (
                          <>
                            <NativeSelect
                              {...field}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              error={errors.propertyType?.message}
                              rightSection={<FeatherIcon icon="chevron-down" />}
                              data={[
                                { label: "Select", value: "" },
                                { label: "Residential", value: "residential" },
                                { label: "Commercial", value: "commercial" },
                              ]}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* property Category section */}
                  <div className="">
                    <label className="text-ld font-medium">
                      Property Category{" "}
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyCategory"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyCategory || ""}
                        render={({ field }) => (
                          <>
                            <NativeSelect
                              {...field}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              error={errors.propertyCategory?.message}
                              rightSection={<FeatherIcon icon="chevron-down" />}
                              data={[
                                { label: "Select", value: "" },
                                { label: "House", value: "house" },
                                { label: "Land", value: "land" },
                                { label: "Flat", value: "flat" },
                              ]}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* property Address section */}
                  <div className="">
                    <label className="text-ld font-medium">
                      Property Address
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyAddress.street"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyAddress?.street || ""}
                        render={({ field }) => (
                          <>
                            <TextInput
                              {...field}
                              placeholder="Lagan-Tole -21"
                              error={errors.propertyAddress?.street?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* property city section */}
                  <div className="">
                    <label className="text-ld font-medium">City </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyAddress.city"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyAddress?.city || ""}
                        render={({ field }) => (
                          <>
                            <TextInput
                              {...field}
                              placeholder="Kathmandu"
                              error={errors.propertyAddress?.city?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  {/* property State/province section */}
                  <div className="">
                    <label className="text-ld font-medium">
                      Province/State{" "}
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyAddress.province"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyAddress?.province || ""}
                        render={({ field }) => (
                          <>
                            <NativeSelect
                              {...field}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              error={errors.propertyAddress?.province?.message}
                              rightSection={<FeatherIcon icon="chevron-down" />}
                              data={[
                                { label: "Select", value: "" },
                                { label: "Koshi", value: "koshi" },
                                { label: "Madhesh", value: "madhesh" },
                                { label: "Bagmati", value: "bagmati" },
                                { label: "Gandaki", value: "gandaki" },
                                { label: "Lumbini", value: "lumbini" },
                                { label: "Karnali", value: "karnali" },
                                {
                                  label: "SudhurPaschim",
                                  value: "SudhurPaschim",
                                },
                              ]}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  {/* property Title section */}
                  <div className="mt-2 ">
                    <label className="text-ld font-medium">
                      Propetry Title{" "}
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyTitle"}
                        rules={{ required: "required" }}
                        // defaultValue={data?.propertyTitle || ""}
                        render={({ field }) => (
                          <>
                            <TextInput
                              {...field}
                              placeholder="Property Title"
                              error={errors.propertyTitle?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* property Availability section */}
                  <div className="mt-2">
                    <label className="text-ld font-medium">Status :</label>
                    <div className="mt-4">
                      <Controller
                        control={control}
                        name={"status"}
                        rules={{ required: "required" }}
                        defaultValue={data?.status || ""}
                        render={({ field }) => (
                          <>
                            <Radio.Group
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.status?.message}
                            >
                              <div className="flex gap-10 mt-2">
                                <Radio value="true" label="Available" />
                                <Radio value="false" label="Non-Available" />
                              </div>
                            </Radio.Group>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* //Description div */}
                <div className="mt-5">
                  <label className="text-ld font-medium">
                    Property Description{" "}
                  </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={"propertyDescription"}
                      rules={{ required: "required" }}
                      defaultValue={data?.propertyDescription || ""}
                      render={({ field }) => (
                        <>
                          <Textarea
                            error={errors.propertyDescription?.message}
                            {...field}
                            size="xl"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Write description here"
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
                {/* //property Feature */}
                <div className="mt-5">
                  <label className="text-ld font-medium">
                    Property Feature{" "}
                  </label>
                  <div className="mt-2 gap-3">
                    <Controller
                      control={control}
                      name={"propertyType"}
                      rules={{ required: "required" }}
                      defaultValue={data?.propertyFeature || ""}
                      render={({ field }) => (
                        <>
                          <Button variant="outline">Security</Button>
                          <Button variant="outline">Parking</Button>
                          <Button variant="outline">Water</Button>
                          <Button variant="outline">Garden</Button>
                          <Button variant="outline">Water-Tank</Button>
                          <Button variant="outline">Internet</Button>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <ColoredLine color={"#C7C7C7"} />
            </div>

            {/* Property price and specifications */}
            <div className="mt-5 flex">
              <div className="w-2/5">
                <span className="text-lg font-medium">
                  Property Price and Specification
                </span>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-2 gap-x-5">
                  {/* //bedroom Feature */}
                  <div className="">
                    <label className="text-ld font-medium">
                      No. of Bedrooms{" "}
                    </label>
                    <div className="mt-2 gap-3 flex text-lg font-semibold">
                      <Button
                        variant="light"
                        onClick={() => handleDecrement("bedRooms")}
                      >
                        -
                      </Button>
                      <Controller
                        control={control}
                        name="bedRooms"
                        rules={{ required: "required" }}
                        defaultValue={data?.bedRooms || ""}
                        render={({ field }) => (
                          <Input
                            className="w-14"
                            {...field}
                            variant="filled"
                            placeholder="1"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.bedRooms?.message}
                          />
                        )}
                      />
                      <Button
                        variant="filled"
                        onClick={() => handleIncrement("bedRooms")}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* //Kitchen Feature */}
                  <div className="">
                    <label className="text-ld font-medium">
                      No. of Kitchen{" "}
                    </label>
                    <div className="mt-2 gap-3 flex text-lg font-semibold">
                      <Button
                        variant="light"
                        onClick={() => handleDecrement("kitchens")}
                      >
                        -
                      </Button>
                      <Controller
                        control={control}
                        name="kitchens"
                        rules={{ required: "required" }}
                        defaultValue={data?.kitchens || ""}
                        render={({ field }) => (
                          <Input
                            className="w-14"
                            {...field}
                            variant="filled"
                            placeholder="1"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.kitchens?.message}
                          />
                        )}
                      />
                      <Button
                        variant="filled"
                        onClick={() => handleIncrement("kitchens")}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* //Floors Feature */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">No. of Floors</label>
                    <div className="mt-2 gap-3 flex text-lg font-semibold">
                      <Button
                        variant="light"
                        onClick={() => handleDecrement("floors")}
                      >
                        -
                      </Button>
                      <Controller
                        control={control}
                        name="floors"
                        rules={{ required: "required" }}
                        defaultValue={data?.floors || ""}
                        render={({ field }) => (
                          <Input
                            className="w-14"
                            {...field}
                            variant="filled"
                            placeholder="1"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.floors?.message}
                          />
                        )}
                      />
                      <Button
                        variant="filled"
                        onClick={() => handleIncrement("floors")}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  {/* //Bathroom Feature */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">
                      No. of Bathrooms{" "}
                    </label>
                    <div className="mt-2 gap-3 flex text-lg font-semibold">
                      <Button
                        variant="light"
                        onClick={() => handleDecrement("bathroom")}
                      >
                        -
                      </Button>
                      <Controller
                        control={control}
                        name="bathroom"
                        rules={{ required: "required" }}
                        defaultValue={data?.bathroom || ""}
                        render={({ field }) => (
                          <Input
                            className="w-14"
                            {...field}
                            variant="filled"
                            placeholder="1"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.bathroom?.message}
                          />
                        )}
                      />
                      <Button
                        variant="filled"
                        onClick={() => handleIncrement("bathroom")}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  {/* //Parkings Feature */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">
                      No. of Parking{" "}
                    </label>
                    <div className="mt-2 gap-3 flex text-lg font-semibold">
                      <Button
                        variant="light"
                        onClick={() => handleDecrement("parking")}
                      >
                        -
                      </Button>
                      <Controller
                        control={control}
                        name="parking"
                        rules={{ required: "required" }}
                        defaultValue={data?.parking || ""}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="w-14"
                            variant="filled"
                            placeholder="1"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.parking?.message}
                          />
                        )}
                      />
                      <Button
                        variant="filled"
                        onClick={() => handleIncrement("parking")}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  {/* property Face section */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">
                      Property Face{" "}
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyFace"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyFace || ""}
                        render={({ field }) => (
                          <>
                            <NativeSelect
                              {...field}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              error={errors.propertyFace?.message}
                              rightSection={<FeatherIcon icon="chevron-down" />}
                              data={[
                                { label: "Select", value: "" },
                                { label: "East", value: "east" },
                                { label: "West", value: "west" },
                                { label: "North", value: "north" },
                                { label: "South", value: "south" },
                              ]}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* property area section */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">
                      Property Area{" "}
                    </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyArea"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyArea || ""}
                        render={({ field }) => (
                          <>
                            <TextInput
                              {...field}
                              placeholder="1050 sq. ft"
                              error={errors.propertyArea?.message}
                            
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* property Price section */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">Price </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"propertyPrice"}
                        rules={{ required: "required" }}
                        defaultValue={data?.propertyPrice || ""}
                        render={({ field }) => (
                          <>
                            <TextInput
                              {...field}
                              leftSection={
                                <span className="text-black text-sm font-bold">
                                  NPR
                                </span>
                              }
                              placeholder="20000000"
                              error={errors.propertyPrice?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* price negotiable section */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">
                      Price Negotiable :
                    </label>
                    <div className="mt-4">
                      <Controller
                        control={control}
                        name={"negotiable"}
                        rules={{ required: "required" }}
                        defaultValue={data?.negotiable || ""}
                        render={({ field }) => (
                          <>
                            <Radio.Group
                              //name="negotiable"
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.negotiable?.message}
                            >
                              <div className="flex gap-10 mt-2">
                                <Radio value="true" label="Negotiable" />
                                <Radio value="false" label="Non-Negotiable" />
                              </div>
                            </Radio.Group>
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* Road Access section */}
                  <div className="mt-5">
                    <label className="text-ld font-medium">Road Access </label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name={"roadAccess"}
                        rules={{ required: "required" }}
                        defaultValue={data?.roadAccess || ""}
                        render={({ field }) => (
                          <>
                            <TextInput
                              {...field}
                              placeholder="15 ft / Pitched "
                              error={errors.roadAccess?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <ColoredLine color={"#C7C7C7"} />
            </div>

            {/* Property Image upload Section */}
            <div className="mt-5 flex">
              <div className="w-2/5">
                <span className="text-lg font-medium">Property Image</span>
              </div>
              <div className="w-full">
                <div className="">
                  <Controller
                    control={control}
                    name="ImagesURL"
                    rules={{ required: "required" }}
                    defaultValue={data?.ImagesURL || ""}
                    render={({ field }) => (
                      <ImageDropzone
                        {...field}
                        className="border-dashed border-2 border-gray-500 rounded-3xl p-20
                    grid justify-items-center cursor-pointer"
                        error={errors.ImagesURL?.message}
                        control={control}
                        setValue={setValue}
                        imagesURLs={data?.ImagesURL}
                        ref={ref}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <ColoredLine color={"#C7C7C7"} />
            </div>

            {/* Owner Details section */}
            <div className="mt-5 flex">
              <div className="w-2/5">
                <span className="text-lg font-medium">Owner Details</span>
              </div>
              <div className="w-full">
                {/* Fullname section */}
                <div className="w-80">
                  <label className="text-ld font-medium">Full Name </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={"ownerName"}
                      rules={{ required: "required" }}
                      defaultValue={data?.ownerName || ""}
                      render={({ field }) => (
                        <>
                          <TextInput
                            {...field}
                            placeholder="Fullname"
                            error={errors.ownerName?.message}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
                {/* Number section */}
                <div className="w-80 mt-2">
                  <label className="text-ld font-medium">Contact Number </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={"ownerNumber"}
                      rules={{ required: "required" }}
                      defaultValue={data?.ownerNumber || ""}
                      render={({ field }) => (
                        <>
                          <TextInput
                            {...field}
                            leftSection={
                              <span className="text-lg font-bold">NP</span>
                            }
                            placeholder="9800000000"
                            error={errors.ownerNumber?.message}
                          />
                        </>
                      )}
                    />
                  </div>
                  {/* //Hidden input Div */}
                  <Controller
                    control={control}
                    name={"userRef"}
                    rules={{ required: "required" }}
                    defaultValue={data?.userRef || ""}
                    render={({ field }) => (
                      <>
                        <TextInput
                          type="hidden"
                          {...field}
                          error={errors.userRef?.message}
                        />
                      </>
                    )}
                  />
                  <div className="mt-10 flex items-center justify-between">
                    <Button color="rgba(110, 110, 110, 1)" size="md" radius={4}>
                      Discard
                    </Button>
                    <Button type="submit" color="#235789" radius={4} size="md">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProperty;