"use client";

import Link from "next/link";
import { BiSolidError, BiSolidMessageAltError } from "react-icons/bi";
import { IoReload } from "react-icons/io5";
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10">
      <BiSolidError className="w-96 h-96 text-yellow-500" />

      <p className="text-red-600 text-lg flex items-center justify-center gap-2">
        <BiSolidMessageAltError />
        Something went wrong!
      </p>
      <p className="text-lg">{error.message}</p>

      <div className="flex items-center gap-12 flex-wrap">
        <button
          className="w-fit bg-sky-700 text-white rounded-md px-4 py-2 flex items-center gap-2 justify-center"
          onClick={() => reset()}>
          Try again
          <IoReload />
        </button>
        <Link
          className="w-fit bg-black text-white rounded-md px-4 py-2 flex items-center justify-center"
          href={"/"}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
