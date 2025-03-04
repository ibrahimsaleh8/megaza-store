"use client";
import { ReactNode, useEffect } from "react";
import { UserInfoType, useUserStore } from "./userInfoStore";
import { useRouter } from "next/navigation";
type Props = {
  children: ReactNode;
  UserData: UserInfoType;
};
export default function HydrateStore({ children, UserData }: Props) {
  const { UpdateUserInfo } = useUserStore();
  const route = useRouter();
  useEffect(() => {
    UpdateUserInfo(UserData);
  }, [UpdateUserInfo, UserData]);

  useEffect(() => {
    route.refresh();
  }, [route]);
  return <>{children}</>;
}
