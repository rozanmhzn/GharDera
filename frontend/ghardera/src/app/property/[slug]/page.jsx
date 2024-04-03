"use client";
import ImageCarousel, {
  propertyDetailDes,
} from "@/components/common/ImageCarousel";
import React from "react";
import image1 from "../../../assets/propertyImages/familyHouse.svg";
import image2 from "../../../assets/propertyImages/SingleImg2.svg";
import chromong from "../../../assets/propertyImages/chomrong.svg";

import { Controller, useForm } from "react-hook-form";
import { Anchor, Breadcrumbs, Button, TextInput } from "@mantine/core";
import Link from "next/link";

export const images = [
  { image: image1 },
  { image: image2 },
  { image: chromong },
];
const PropertyDescription = () => {
  

  const items = [
    { title: "Home", href: "/" },
    { title: "Property", href: "#" },
    { title: propertyDetailDes?.name, href: "#" },
  ];
  const newItems = items.map((item, index) => (
    <Link href={item.href} key={index}>
      <span
        className={`${
          items?.length - 1 === index ? "text-black" : "text-primary"
        } `}
      >
        {item.title}
      </span>
    </Link>
  ));

  return (
    <div>
      <section className="px-20 mb-5">
        <Breadcrumbs separator=">">{newItems}</Breadcrumbs>
      </section>
      <ImageCarousel images={images} />
   
    </div>
  );
};

export default PropertyDescription;
