"use client";
import CategorySection from "@/components/modules/Landing/CategorySection";
import HeroSection from "@/components/modules/Landing/HeroSection";
import LatestProperties from "@/components/modules/Landing/LatestProperties";
import Footer from "@/components/partials/Footer";
import Navbar from "@/components/partials/Navbar";

export default function Home() {
  return (
    <div>
      {/*Main Body*/}
      <main>
        <HeroSection />
        <CategorySection/>
        <LatestProperties/>
      </main>
    </div>
  );
}
