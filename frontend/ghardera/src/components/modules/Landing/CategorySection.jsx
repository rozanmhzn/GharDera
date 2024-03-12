

import CategoryCard from "@/components/common/CategoryCard";
import { categoryData } from "@/utils/constant/categoriesData";

const CategorySection = () => {
  return (
    <>
      <section className="mt-16 mb-20">
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-3xl font-semibold ">
            Explore Properties: Buy, Sell, or Rent
          </h1>
          <h6 className="text-base text-subHeading w-[30vw]">
            Whether You&apos;re Buying, Selling, or Renting, We Have the Perfect
            Property for You.
          </h6>
        </div>
        <div className="grid grid-cols-3 place-items-center w-full px-64 mt-12 ">
          {categoryData?.map((data, idx) => {
            return (
              <div className="w-80 col-span-1" key={idx}>
                <CategoryCard categoryInfo={data} index={idx} />
              </div>
            );
          })}
        </div>
       
      </section>
    </>
  );
};

export default CategorySection;
