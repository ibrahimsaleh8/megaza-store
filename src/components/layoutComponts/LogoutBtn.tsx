"use client";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useUserStore } from "@/store/userInfoStore";
import { MainDomain } from "@/utils/mainDomain";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutBtn() {
  const { UpdateUserInfo } = useUserStore();
  const { UpdateUserDetails } = useUserDetailsStore();
  const router = useRouter();

  const HandleLogout = async () => {
    await axios
      .get(`${MainDomain}/api/auth/logout`)
      .then(() => {
        UpdateUserInfo(null);
        UpdateUserDetails(null);
        router.refresh();
        router.replace("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      onClick={HandleLogout}
      className="w-full p-1.5 bg-accent_Bright_Red text-white px-4 text-center rounded-md">
      Logout
    </button>
  );
}
