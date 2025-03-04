import { FaStar } from "react-icons/fa6";

export default function RatingStars() {
  return (
    <div className="flex gap-5">
      <div className="flex items-center gap-1">
        <FaStar className=" text-[#EDCF5D]" />
        <FaStar className=" text-[#EDCF5D]" />
        <FaStar className=" text-[#EDCF5D]" />
        <FaStar className=" text-[#EDCF5D]" />
        <FaStar className=" text-[#EDCF5D]" />
      </div>
      <p className="text-lg font-bold">5.0</p>
    </div>
  );
}
