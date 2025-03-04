"use client";
import SearchInput from "./SearchInput";
import CartInfo from "./CartInfo";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiSolidOffer, BiSolidStore } from "react-icons/bi";
import { RiHome5Fill } from "react-icons/ri";
import { ReactNode } from "react";
import MainLinks from "./MainLinks";
import SmallNavbar from "./SmallNavbar";
import { useUserStore } from "@/store/userInfoStore";
import LogoutBtn from "../LogoutBtn";
import { FaRegCircleUser } from "react-icons/fa6";
import Image from "next/image";
import logo from "../../../../public/images/logo_black.webp";
type Props = {
  cats: {
    id: number;
    name: string;
  }[];
};
type LinksType = {
  href: string;
  text: string;
  cat: string;
  icon: ReactNode;
};
const links: LinksType[] = [
  {
    href: "/",
    text: "Home",
    icon: <RiHome5Fill className="w-5 h-5" />,
    cat: "Links",
  },
  {
    href: "/products",
    text: "Products",
    icon: <BiSolidStore className="w-5 h-5" />,
    cat: "Links",
  },
  {
    href: "/discounts",
    text: "Discounts",
    icon: <BiSolidOffer className="w-5 h-5" />,
    cat: "Links",
  },
];
export default function Navbar({ cats }: Props) {
  const { userInfo } = useUserStore();
  return (
    <header
      id="main-header"
      className="border-b container flex items-center justify-between py-5 px-2 gap-4 lg:mt-[1px] mx-auto sm:pr-4 shadow-sm sticky top-0 lg:top-[1px] left-0 z-50 text-black bg-white">
      {/* Links */}
      <div className=" w-1/3">
        <MainLinks
          cats={cats}
          email={userInfo ? userInfo.email : null}
          links={links}
        />
        <SmallNavbar cats={cats} Links={links} />
      </div>
      {/* Logo */}
      <div className="px-2 justify-center flex items-center gap-4 w-1/3">
        <Link href={"/"} className="font-bold">
          <Image className="sm:w-11 w-10" src={logo} alt="Megaza Logo" />
        </Link>
      </div>
      {/* Icons */}
      <div className="flex items-center md:gap-4 gap-3 w-1/3 justify-end">
        <SearchInput />
        {userInfo ? (
          <>
            <CartInfo />
            <Link href={"/wishlist"}>
              <FaRegHeart className="sm:w-5 sm:h-5 w-[1.15rem] h-[1.15rem] text-black" />
            </Link>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="user options"
                  className="flex items-center justify-center">
                  <FaRegCircleUser className="sm:w-5 sm:h-5 w-[1.15rem] h-[1.15rem] text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white py-1   border border-soft_border text-black  mx-1">
                  <DropdownMenuItem className="hover:bg-black p-0 hover:text-white font-bold">
                    <Link
                      href={`${
                        userInfo.isAdmin ? "/profile/admin" : "/profile/user"
                      }`}
                      className="w-full h-full px-3 py-2 rounded-md">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="mb-1 mt-2  p-0 hover:text-black font-bold">
                    <LogoutBtn />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="auth options"
                className="flex items-center justify-center">
                <FaRegCircleUser className="sm:w-5 sm:h-5 w-[1.15rem] h-[1.15rem] text-black" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-soft_border text-black mx-1">
                <DropdownMenuItem className="hover:bg-black mt-1 p-0 hover:text-white font-bold">
                  <Link
                    className="w-full h-full px-3 py-2 rounded-md"
                    href={"/login"}>
                    Login
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-black mt-1 p-0 hover:text-white font-bold">
                  <Link
                    className="w-full h-full px-3 py-2 rounded-md"
                    href={"/register"}>
                    Register
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}
