"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import Image from "next/image";
import { TbWorldStar } from "react-icons/tb";
import { GrWheelchair } from "react-icons/gr";
import { LuParkingCircle, LuTrees } from "react-icons/lu";
import { AiOutlineCoffee } from "react-icons/ai";
import { PiOfficeChair } from "react-icons/pi";
export const propertyDetailDes = {
  name: "Commercial Space",
  location: "Lazimpat",
  price: "Rs 500000",
  flatDescription: "2BHK",
  sqArea: "5000 sqFt",
  description:
    "This commercial space nestled in the heart of Lazimpat, offering unparalleled convenience for businesses and offices alike. This fully furnished space boasts modern amenities and stylish furnishings, providing the perfect environment for productivity and professionalism. \nSurrounded by a myriad of amenities, including restaurants, shops, banks, and public transportation hubs, tenants and customers alike will appreciate the convenience of accessing essential services within walking distance.",
  features: [
    { name: "Parking", icon: <LuParkingCircle size={30} /> },
    { name: "Security", icon: <TbWorldStar size={30} /> },
    { name: "Wheel Chair accessiblie", icon: <GrWheelchair size={30} /> },
    { name: "Outdoor space", icon: <LuTrees size={30} /> },
    { name: "Cafeteria", icon: <AiOutlineCoffee size={30} /> },
    { name: "Morder amenties", icon: <PiOfficeChair size={30} /> },
  ],
  view: "3000",
  share: "20",
  createdAt: "Jan 12, 2024",
  updatedAt: "12 days",
  listerName: "Harry Potter Maharjan",
};

const ImageCarousel = ({ images }) => {
  return (
    <div className="px-1">
      <Carousel
        slideSize="100%"
        height={420}
        align="start"
        slideGap="xl"
        controlsOffset="xs"
      >
        {images?.map((data, index) => {
          return (
            <div key={index}>
              <Carousel.Slide>
                <figure className="w-[47rem] h-96 relative">
                  <Image
                    alt="Property Image"
                    src={data}
                    fill
                    className="rounded-3xl object-cover"
                  />
                </figure>
              </Carousel.Slide>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
