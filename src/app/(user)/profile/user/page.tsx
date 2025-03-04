import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
import ShowDashCards from "../_components/ShowDashCards";
import DisplayChart from "../_components/DisplayChart";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function UserProfile() {
  const user = VerifyUserFromToken();
  const token = cookies().get("token")?.value as string;
  if (!user) {
    redirect("/");
  }
  if (user && user.isAdmin) {
    redirect("/profile/admin");
  }
  return (
    <div className="flex flex-col gap-3 ">
      <h1 className="text-lg text-black">Overveiw</h1>
      <ShowDashCards token={token} uid={user?.id ?? 0} />
      <DisplayChart isAdmin={user.isAdmin} token={token} uid={user?.id ?? 0} />
    </div>
  );
}
