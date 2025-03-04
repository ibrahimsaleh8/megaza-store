import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./profile/_components/AppSidebar";
import DashboardHeader from "./profile/_components/DashboardHeader";
import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
import HydrateUserFullDetails from "@/store/HydrateUserFullDetails";
import { MainDomain } from "@/utils/mainDomain";
import { userDetailsType } from "@/store/userDetailsStore";
import ProtectDashboard from "./profile/_components/ProtectDashboard";
let userData: userDetailsType;

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = VerifyUserFromToken();

  // Fetch User Data
  if (user) {
    const fetchUserData = await fetch(
      `${MainDomain}/api/user/full-data?userId=${user?.id}`,
      { cache: "no-store" }
    );

    userData = await fetchUserData.json();
  }
  return (
    <SidebarProvider>
      <AppSidebar isAdmin={user?.isAdmin} />
      <main className="w-full">
        <div className="flex items-center gap-2 bg-second_black p-3">
          <SidebarTrigger className="bg-white" />
          <DashboardHeader isAdmin={user ? user.isAdmin : false} />
        </div>
        <ProtectDashboard user={user}>
          <HydrateUserFullDetails UserData={userData}>
            <div className="p-5 relative !overflow-x-hidden">{children}</div>
          </HydrateUserFullDetails>
        </ProtectDashboard>
      </main>
    </SidebarProvider>
  );
}
