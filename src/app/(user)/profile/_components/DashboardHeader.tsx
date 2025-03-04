"use client";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import UserCard from "./UserCard";
import LogoutBtn from "@/components/layoutComponts/LogoutBtn";

export default function DashboardHeader({ isAdmin }: { isAdmin: boolean }) {
  const { userDetails } = useUserDetailsStore();

  return (
    <div className="flex-1 pr-4">
      {userDetails?.username && !isAdmin && (
        <UserCard username={userDetails?.username} />
      )}
      {isAdmin && (
        <div className="w-fit ml-auto ">
          <LogoutBtn />
        </div>
      )}
    </div>
  );
}
