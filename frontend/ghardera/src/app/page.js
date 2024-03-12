"use client";
import CategorySection from "@/components/modules/Landing/CategorySection";
import HeroSection from "@/components/modules/Landing/HeroSection";
import Navbar from "@/components/partials/Navbar";

export default function Home() {
  return (
    <div>
      {/*Main Body*/}
      <main>
        <Navbar/>
        <HeroSection />
        <CategorySection/>
      </main>
    </div>
  );
}
