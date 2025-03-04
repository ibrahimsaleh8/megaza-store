"use client";

import React, { ReactNode, useEffect } from "react";
import { userDetailsType, useUserDetailsStore } from "./userDetailsStore";

type Props = {
  children: ReactNode;
  UserData: userDetailsType;
};
export default function HydrateUserFullDetails({ children, UserData }: Props) {
  const { UpdateUserDetails } = useUserDetailsStore();

  useEffect(() => {
    UpdateUserDetails(UserData);
  }, [UpdateUserDetails, UserData]);

  return <>{children}</>;
}
