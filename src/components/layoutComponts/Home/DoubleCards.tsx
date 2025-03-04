"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LongImage from "../../../../public/images/HomePageImages/niceMan.webp";
import Image from "next/image";
import { PiPlanetBold } from "react-icons/pi";
import { IoEarth } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function DoubleCards() {
  // Aos Animation
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  }, []);
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      {/* First */}
      <div className="md:w-[45%] w-full bg-low_white h-[35rem] relative rounded-3xl overflow-hidden">
        <Image
          data-aos="fade-up"
          src={LongImage}
          alt="Long image"
          className=" w-full h-full object-cover object-center"
        />
        <div className="bg-white w-1/2 h-16 p-2  rounded-xl  absolute left-1/2 -translate-x-1/2 -bottom-4">
          <Link
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex text-[0.8rem] items-center justify-between w-full bg-[#DBD9D8] uppercase p-2 px-3 rounded-md"
            href={"/about"}>
            About us <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Second */}
      <div className="w-full md:w-[55%] lg:w-full bg-[#6D8350] h-[35rem]  rounded-3xl md:p-10 p-5 flex flex-col gap-3">
        <p
          data-aos="fade-right"
          className="lg:text-5xl md:text-3xl text-4xl uppercase font-bold">
          We are changing the way things get made
        </p>

        <div className="flex flex-col lg:flex-row overflow-hidden gap-3 border border-[#42564d] mt-auto p-5 rounded-lg">
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="flex flex-col gap-3">
            <p className="flex items-center gap-3 text-xl uppercase font-bold">
              <span className="p-1 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center">
                <PiPlanetBold className="w-5 h-5" />
              </span>
              Sustinability
            </p>
            <p className="text-sm">
              {"We're"} challenging conventional retail, putting an end to dead
              stock, unconventional waste and more fantastic
            </p>
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className="flex flex-col gap-3">
            <p className="flex items-center gap-3 text-xl uppercase font-bold">
              <span className="p-1 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center">
                <IoEarth className="w-5 h-5" />
              </span>
              Sustinability
            </p>
            <p className="text-sm">
              {"We're"} on a mission to empower create independence in a
              commercial world and incredible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
