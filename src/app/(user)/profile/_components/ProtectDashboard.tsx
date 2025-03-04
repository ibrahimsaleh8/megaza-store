"use client";
import { jwtPayloadType } from "@/utils/Types";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export default function ProtectDashboard({
  children,
  user,
}: {
  children: ReactNode;
  user: jwtPayloadType | null;
}) {
  const rout = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!user) {
      rout.replace("/");
      return;
    }
    if (pathname.startsWith("/profile/user") && user.isAdmin) {
      rout.replace("/");
      return;
    }
    if (pathname.startsWith("/profile/admin") && !user.isAdmin) {
      rout.replace("/");
      return;
    }
  }, [pathname, rout, user]);
  return <>{children}</>;
}
