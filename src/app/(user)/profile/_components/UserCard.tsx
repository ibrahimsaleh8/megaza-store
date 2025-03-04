"use client";
import { FaCircleUser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutBtn from "@/components/layoutComponts/LogoutBtn";
import Link from "next/link";
type Props = {
  username: string;
};
export default function UserCard({ username }: Props) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-fit ml-auto">
          <div className="ml-auto p-3 bg-white rounded-md flex items-center gap-2 w-fit">
            <FaCircleUser />
            <p className="text-sm">{username}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-black">
          <DropdownMenuItem className="hover:bg-low_white p-0 hover:text-black">
            <Link
              className="w-full px-2 py-1.5 h-full"
              href={"/profile/user/setting"}>
              Setting
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
