import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

export default function ProductRate({
  rate,
  showNumber,
}: {
  rate: number;
  showNumber?: boolean;
}) {
  return (
    <div className="flex gap-1 items-center text-yellow-500">
      {Array.from({ length: +rate.toString().split(".")[0] }).map((_e, i) => (
        <FaStar key={i} />
      ))}
      {Array.from({ length: 5 - +rate.toString().split(".")[0] }).map(
        (_e, i) => (
          <FaRegStar key={i} />
        )
      )}
      {!showNumber && <p className="text-black font-bold">{rate.toFixed(1)}</p>}
    </div>
  );
}
