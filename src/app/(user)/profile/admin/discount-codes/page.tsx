import { BiSolidOffer } from "react-icons/bi";
import ShowDiscountCodes from "./_components/ShowDiscountCodes";
import { cookies } from "next/headers";
import AddNewDiscountCode from "./_components/AddNewDiscountCode";

export default function DiscountCodesPage() {
  const token = cookies().get("token")?.value as string;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="flex items-center gap-1">
          Current Codes <BiSolidOffer className="w-5 h-5" />
        </p>
        <AddNewDiscountCode token={token} />
      </div>
      {/* Discount Code Card */}
      <ShowDiscountCodes token={token} />
    </div>
  );
}
