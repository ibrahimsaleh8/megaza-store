import Image from "next/image";
import image1 from "../../../../public/images/twinsHoodie.webp";
import Link from "next/link";
export default function MainImagesSlider() {
  return (
    <div className="mt-2 flex items-center w-full bg-blue-200 overflow-hidden md:h-80 sm:h-64 h-52 sm:rounded-3xl rounded-xl">
      {/* Text */}
      <div className=" w-full lg:h-96 md:h-80 sm:h-64 h-52 flex md:py-10 md:pl-10 sm:pl-5 sm:py-5 pl-3 py-5 flex-col sm:gap-4 gap-2">
        <p className="lg:text-6xl md:text-5xl sm:text-3xl text-xl  lg:pt-5">
          Fashion for All <br /> Every Day
        </p>
        <p className="sm:text-sm text-[0.7rem] md:w-3/5 w-full line-clamp-3 text-[#5e5e5e]">
          Discover your personal style and make a statement with every outfit.
          Shop with us to elevate your wardrobe and bring your fashion game to
          the next level.
        </p>
        <Link
          className="bg-black text-white sm:text-base text-sm flex items-center justify-center px-4 py-1.5 w-28 sm:w-32"
          href={"/products"}>
          Shop Now
        </Link>
      </div>

      {/* Image */}
      <div className=" w-full lg:h-96 md:h-80 sm:h-64 h-52 flex items-center justify-center overflow-hidden">
        <Image
          className="w-96 object-cover mt-auto"
          src={image1}
          alt="image1"
        />
      </div>
    </div>
  );
}
