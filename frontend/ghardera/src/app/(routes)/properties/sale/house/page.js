import Contents from "@/components/common/Contents";
import { propertyDetails } from "@/utils/constant/propertyDetails";

export default function SaleHouse() {
  return (
    <>
      {/* <h1>Sale Page</h1> */}
      <div className="">
        {/* <Sidebar/> */}
        <Contents propertyDetails={propertyDetails} />
      </div>
    </>
  );
}
