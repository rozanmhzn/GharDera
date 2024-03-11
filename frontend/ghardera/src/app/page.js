"use client";
import HeroSection from "@/components/modules/Landing/HeroSection";
import Navbar from "@/components/partials/Navbar";

export default function Home() {
  return (
    <div>
      {/*Main Body*/}
      <main>
        <Navbar/>
        <HeroSection />
      </main>
    </div>
  );
}
