import { Carousel } from "@mantine/carousel";
import React from "react";
import Card from "../Card";

const PropertyCard = ({ propertiesDetails }) => {
  return (
    <div>
      <Carousel
        slideSize="70%"
        height={500}
        align="start"
        slideGap="xl"
        controlsOffset="xs"
      >
        {propertiesDetails?.map((data, index) => {
          return (
            <div key={index}>
              <Carousel.Slide>
                <Card propertyDetails={data} />
              </Carousel.Slide>
            </div>
          );

        })}
      </Carousel>
    </div>
  );
};

export default PropertyCard;
