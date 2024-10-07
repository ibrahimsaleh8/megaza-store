"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);
  return (
    <div className="bg-stone-900 font-bold px-10 py-5 flex flex-col md:flex-row md:items-center justify-between gap-10">
      <div className="flex w-full justify-between md:w-fit">
        <Link href={"/"}>Logo</Link>
        <FaBarsStaggered
          onClick={() => setToggle((pre) => !pre)}
          className="md:hidden block text-xl"
        />
      </div>

      <div className="flex-1 hidden md:flex justify-between md:items-center">
        <nav>
          <ul className="flex flex-col gap-2  md:flex-row  md:gap-10">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-2  md:flex-row  md:gap-10">
          <Link className="bg-sky-600 px-4 rounded-lg py-2" href={"login"}>
            Login
          </Link>
          <Link className="bg-sky-600 px-4 rounded-lg py-2" href={"register"}>
            Register
          </Link>
        </div>
      </div>

      {toggle && (
        <>
          <div className="md:hidden flex-1 flex flex-col justify-between md:items-center">
            <ul className="flex flex-col gap-3 items-start  w-full mb-2">
              <li className="block w-full">
                <Link
                  onClick={() => setToggle(false)}
                  className="bg-sky-600 px-4 rounded-lg py-2 block w-full"
                  href={"/"}>
                  Home
                </Link>
              </li>
              <li className="block w-full">
                <Link
                  onClick={() => setToggle(false)}
                  className="bg-sky-600 px-4 rounded-lg py-2 block w-full"
                  href={"/about"}>
                  About
                </Link>
              </li>
            </ul>

            <div className="flex flex-col gap-2  md:flex-row  md:gap-10">
              <Link
                onClick={() => setToggle(false)}
                className="bg-sky-600 px-4 rounded-lg py-2"
                href={"login"}>
                Login
              </Link>
              <Link
                onClick={() => setToggle(false)}
                className="bg-sky-600 px-4 rounded-lg py-2"
                href={"register"}>
                Register
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
