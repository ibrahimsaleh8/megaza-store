"use client";
import Image from "next/image";
import Link from "next/link";
import notFoundimage from "../../public/images/error404-Photoroom.webp";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <Image className="w-96" src={notFoundimage} alt="404 not found" />
      <h2 className="text-xl">Not Found 404</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="bg-black text-white w-fit px-4 py-1.5 rounded-sm">
        Return Home
      </Link>
    </div>
  );
}
