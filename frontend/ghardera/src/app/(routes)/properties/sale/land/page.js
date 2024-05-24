import Contents from "@/components/common/Contents";
import { propertyDetails } from "@/utils/constant/propertyDetails";

export default function SaleLand() {
  return (
    <>
      <div className="">
        {/* <Sidebar/> */}
        <Contents propertyDetails={propertyDetails} />
      </div>{" "}
    </>
  );
}
