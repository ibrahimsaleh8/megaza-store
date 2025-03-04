"use client";
import { ReactNode, useEffect } from "react";
import { UserInfoType, useUserStore } from "./userInfoStore";
type Props = {
  children: ReactNode;
  UserData: UserInfoType;
};
export default function HydrateStore({ children, UserData }: Props) {
  const { UpdateUserInfo } = useUserStore();
  useEffect(() => {
    UpdateUserInfo(UserData);
  }, [UpdateUserInfo, UserData]);

  return <>{children}</>;
}
