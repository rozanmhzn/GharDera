"use client";
import HeroSection from "@/components/modules/Landing/HeroSection";
import CategorySection from "@/components/modules/Landing/CategorySection";
import LatestProperties from "@/components/modules/Landing/LatestProperties";
import { useEffect, useState } from "react";
import { APIGetAllProperty } from "@/apis/Property";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await APIGetAllProperty();
        console.log(res);

        setData(res);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/*Main Body*/}
      <main>
        <HeroSection />
        <CategorySection />
        <LatestProperties propertyDetails={data} />
      </main>
    </div>
  );
}
