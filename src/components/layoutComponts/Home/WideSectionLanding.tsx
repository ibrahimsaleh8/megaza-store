"use client";
import Image from "next/image";
import longImage from "../../../../public/images/HomePageImages/Bucket-Hat-Olive-20210327024823.webp";
import imag1 from "../../../../public/images/HomePageImages/hoodieWithCap.webp";
import imag2 from "../../../../public/images/HomePageImages/secondMan.webp";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaBagShopping } from "react-icons/fa6";

export default function WideSectionLanding() {
  // Aos Animation
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* Left */}
      <div className="w-full md:h-[35rem] h-[30rem] flex flex-col gap-2">
        {/* Text */}
        <div className="w-full h-1/2 overflow-hidden bg-[#E8EBE8] rounded-3xl sm:py-7 py-5 pl-5 flex flex-col gap-5 ">
          <p
            data-aos="fade-right"
            data-aos-delay="100"
            className="flex capitalize xl:text-5xl lg:text-3xl sm:text-2xl text-xl">
            simplicity is the ultimate in sophistication
          </p>
          <p
            data-aos="fade-right"
            data-aos-delay="200"
            className="sm:text-[0.8rem] text-[0.7rem] lg:w-1/2 sm:w-3/4 w-full sm:line-clamp-3 line-clamp-4">
            We establish personal relationships with our boutiques, to make sure
            each is vetted for a stress-free shopping experience.
          </p>
          <Link
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-black lg:py-2 py-1.5 text-white w-fit px-4 flex items-center justify-center gap-3 sm:text-base text-sm"
            href={"/products"}>
            Discover our Products
            <LuArrowUpRight className="sm:w-5 sm:h-5 w-4 h-4" />
          </Link>
        </div>

        {/* Second */}
        <div className="w-full h-1/2 flex gap-2">
          <div className="relative bg-[#bcbcbc] overflow-hidden rounded-3xl h-full w-full flex items-center justify-center">
            <Image
              loading="eager"
              data-aos="fade-up"
              data-aos-delay="200"
              src={imag2}
              alt="imag1"
              className="w-80 h-full object-cover object-top"
            />
            <p
              data-aos="fade-right"
              data-aos-delay="400"
              className="absolute left-4 bottom-2 text-2xl uppercase text-white">
              #Rip stop
            </p>
          </div>

          <div className="relative  bg-[#5A6B63] overflow-hidden rounded-3xl h-full w-full flex items-center justify-center">
            <Image
              loading="eager"
              data-aos="fade-up"
              data-aos-delay="400"
              src={imag1}
              alt="imag1"
              className="w-64 mt-auto"
            />
            <p
              data-aos="fade-right"
              data-aos-delay="600"
              className="absolute left-4 bottom-2 text-2xl uppercase text-white">
              #Insulated
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative md:w-[60rem] w-full h-[35rem] bg-white rounded-3xl overflow-hidden">
        <Image
          loading="eager"
          src={longImage}
          alt="longImage"
          className="w-full h-full object-cover object-top rounded-3xl"
        />
        {/* Buttons */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 flex items-center gap-3">
          <Link
            data-aos="fade-right"
            data-aos-delay="100"
            href={"/products"}
            className="bg-white border-2 border-white text-black px-4 py-2 rounded-full sm:w-36 w-36 text-sm sm:text-base flex items-center justify-center gap-3">
            Shop Now
            <span>
              <FaBagShopping className="w-4 h-4" />
            </span>
          </Link>
          <Link
            data-aos="fade-left"
            data-aos-delay="100"
            href={"/contact"}
            className="border-2 border-white text-white px-4 py-2 rounded-full sm:w-36 w-32  text-sm sm:text-base flex items-center justify-center">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
