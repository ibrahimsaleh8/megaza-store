import Image from "next/image";
import Container from "@/components/Container";
import LastSectionImage from "../../../public/images/HomePageImages/last-section-image.webp";
import LastAddedProducts from "@/components/layoutComponts/Home/LastAddedProducts";
import { Metadata } from "next";
import WideSectionLanding from "@/components/layoutComponts/Home/WideSectionLanding";
import DoubleCards from "@/components/layoutComponts/Home/DoubleCards";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <Container>
      <div className="pt-2 flex flex-col gap-4">
        {/* Main */}
        <WideSectionLanding />
        {/* Last Added Products */}
        <LastAddedProducts />

        {/* Double Cards */}
        <DoubleCards />

        {/* Last section */}
        <div className="w-full mt-4 products-wide-image rounded-t-3xl overflow-hidden">
          <q className="absolute left-1/2 top-[40%] w-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 lg:text-4xl md:text-2xl text-xl font-bold text-white ">
            {"Let's"} Shop Beyond Boundaries{" "}
          </q>
          <Image
            className="w-full sm:h-96 h-72  object-cover object-center"
            src={LastSectionImage}
            alt="Last section image"
          />
        </div>
      </div>
    </Container>
  );
}
