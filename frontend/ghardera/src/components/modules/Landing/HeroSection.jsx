
import Image from "next/image";
import img from "../../../assets/heroSectionImage.svg";
import SearchBar from "@/components/Searchbar/Searchbar";
const HeroSection = () => {
  return (
    <section className="relative h-[35rem] mt-4">
      <div>
        <Image
          src={img}
          alt="hero-image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <section>
          <div className="overlay absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-[64px] leading-[78px] font-bold mb-1 w-[40%] text-center ">
              Find Your Perfect Place with Us{" "}
            </h1>
            <p className="text-xl mb-6">
              Discover warmth and trust in every transaction.
            </p>
            <SearchBar />
          </div>
        </section>
      </div>
    </section>
  );
};

export default HeroSection;
