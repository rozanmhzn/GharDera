import Link from "next/link";
import GharderaLogo from "../common/GhareraLogo";
import {
  FaLinkedin,
  FaPhoneVolume,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaFacebook, FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="footer bg-primary h-[40vh] p-16">
        <div className="grid grid-cols-3 text-white items-center">
          <div className="flex flex-col gap-5  w-[17vw]">
            <GharderaLogo color="white" />

            <span>
              A leading real estate platform revolutionizing property
              transactions since 2023.
            </span>
            <span className="flex gap-2 items-center cursor-pointer">
              <FaPhoneVolume /> 9860444444
            </span>
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <h1>Follow us on</h1>
            <section className="flex gap-7">
              <Link href="/">
                <FaFacebook size={30} />
              </Link>
              <Link href="/properties/buy">
                <FaTwitter size={30} />
              </Link>
              <Link href="/properties/rent ">
                <FaYoutube size={30} />
              </Link>
              <Link href="/about">
                <FaLinkedin size={30} />
              </Link>
            </section>
          </div>

          <div className="flex flex-col gap-5 justify-center items-center">
            <h1 className="text-xl">Quick Links</h1>
            <section className="flex gap-7">
              <Link href="">Buy</Link>
              <Link href="">Rent</Link>
              <Link href="">Sell</Link>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
