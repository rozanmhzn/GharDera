"use client";

import React from "react";
import { Button, Select, TextInput, rem } from "@mantine/core";

const PropertyLayout = ({ children }) => {

  return (
    <section className="w-full px-20">
      <div className="">
        
          <div className="flex justify-start items-center gap-2  my-4">
            <div className="w-[30rem]">
              <TextInput
                type="text"
                radius={10}
                size="md"
                placeholder="Enter location, city or neighbourhood"
                rightSection={
                  <Button color="#235789" className="w-12">
                    Search
                  </Button>
                }
                rightSectionWidth={rem(90)}
              />
            </div>
            <div>
              <Select
                placeholder="Property Category"
                data={["Land", "House", "Flat"]}
              />
            </div>
            <div>
              <Select
                placeholder="Property Type"
                data={["Residential", "Commercial"]}
              />
            </div>
            <div>
              <Select placeholder="For Buy" data={["Buy", "Rent"]} />
            </div>
            <div>
              <Select placeholder="Price Range" data={["100k-200k"]} />
            </div>
          </div>
        
      </div>
      {children}
    </section>
  );
};

export default PropertyLayout;
