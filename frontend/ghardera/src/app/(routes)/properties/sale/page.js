"use client";

import Contents from "@/components/common/Contents";

import { propertyDetails } from "@/utils/constant/propertyDetails";

export default function Sale() {
  return (
    <>
      <Contents name={"Sale"} propertyDetails={propertyDetails} />
    </>
  );
}
