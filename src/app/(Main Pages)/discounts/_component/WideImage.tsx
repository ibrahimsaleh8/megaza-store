"use client";
import landingImage from "../../../../../public/images/discountMan.webp";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { MdLocalOffer } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";

export default function WideImage() {
  // Aos Animation
  useEffect(() => {
    Aos.init({
      duration: 400,
      once: true,
    });
  }, []);
  return (
    <div className="bg-[#483228] relative  w-full sm:h-80 h-60 sm:rounded-3xl rounded-xl overflow-hidden flex justify-center">
      <div
        data-aos="zoom-in"
        className="bg-accent_Bright_Red text-white flex items-center justify-center rounded-full p-1 w-6 h-6 absolute top-3 right-3">
        <MdLocalOffer />
      </div>
      <div className="sm:py-16 py-5 pt-7 sm:text-base text-sm pl-3 sm:pr-5 pr-1 flex flex-col gap-3 text-white ">
        <p
          data-aos="fade-right"
          className="uppercase lg:text-3xl md:text-xl text-base">
          Flash Sale! ⚡<br /> Shop Discounts Before They Disappear!
        </p>
        <Link
          data-aos="fade-right"
          data-aos-delay="200"
          className="bg-black md:w-36 w-32 flex items-center justify-center text-white px-4 py-1.5"
          href={"/discounts"}>
          Shop Now
        </Link>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className=" text-[#adadad] w-fit pl-1">
          #{"Don’t"} Miss Out!
        </p>
      </div>
      <Image
        data-aos="zoom-in"
        className="md:w-64 sm:w-52 w-40 mt-auto object-cover object-top"
        src={landingImage}
        alt="Discount Image"
      />
    </div>
  );
}
