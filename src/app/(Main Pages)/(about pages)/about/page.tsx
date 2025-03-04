import Container from "@/components/Container";
import Image from "next/image";
import logo from "../../../../../public/images/logo_black.webp";
import GridShowComponent from "@/components/layoutComponts/GridShowComponent";
import { IoDiamondSharp } from "react-icons/io5";
import { RiShirtFill } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Container>
      <div className="py-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-56 flex items-center justify-center flex-col gap-1">
          <Image className="w-52" src={logo} alt="Megaza logo" />
          <p className="text-sm w-40">Megaza Store</p>
        </div>
        {/* Text */}
        <div className="px-2">
          <h1 className="text-lg my-2 font-bold underline uppercase">
            About Us
          </h1>
          <p className="text-sm">
            Welcome to Megaza, your ultimate destination for premium {"men's"}
            fashion. We believe that style is more than just {"clothing—it's"} a
            statement, an attitude, and a way of life.
          </p>
          <p className="text-sm mt-2">
            At Megaza, we are dedicated to bringing you high-quality, stylish,
            and trendsetting {"men's"} apparel that complements your personality
            and confidence. Whether {"you're"} looking for casual wear, business
            attire, or statement pieces, we’ve got you covered with a curated
            collection of modern and timeless fashion.
          </p>
          <h2 className="text-lg my-2 font-bold underline uppercase">
            Our Mission
          </h2>
          <p className="text-sm">
            Our goal is simple: to redefine men’s fashion by offering
            high-quality, affordable, and stylish clothing for every occasion.
            We focus on quality, comfort, and the latest trends to ensure that
            every piece you wear makes you stand out.
          </p>
        </div>
      </div>
      {/* Why choose us */}
      <div className="py-4 flex flex-col gap-3 px-2">
        <p>Why Choose Megaza?</p>
        <GridShowComponent minWidth={400} classes="gap-3">
          <div className="w-full h-40 flex flex-col gap-4 overflow-hidden rounded-md border border-soft_border p-4">
            <p className="flex items-center gap-2">
              <FaTrophy className="w-5 h-5 text-yellow-500" />
              Premium Quality
            </p>
            <p className="text-[#5a5a5a] line-clamp-4">
              We source high-quality fabrics to ensure durability and comfort.
            </p>
          </div>

          <div className="w-full h-40 flex flex-col gap-4 overflow-hidden rounded-md border border-soft_border p-4">
            <p className="flex items-center gap-2">
              <RiShirtFill className="w-5 h-5 text-blue-600" />
              Trendsetting Styles
            </p>
            <p className="text-[#5a5a5a] line-clamp-4">
              Stay ahead of fashion trends with our carefully selected designs.
            </p>
          </div>

          <div className="w-full h-40 flex flex-col gap-4 overflow-hidden rounded-md border border-soft_border p-4">
            <p className="flex items-center gap-2">
              <IoDiamondSharp className="w-5 h-5 text-sky-600" />
              Affordable Luxury
            </p>
            <p className="text-[#5a5a5a] line-clamp-4">
              Experience top-tier fashion without breaking the bank{" "}
            </p>
          </div>
        </GridShowComponent>
      </div>
    </Container>
  );
}
