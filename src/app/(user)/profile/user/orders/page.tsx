import { cookies } from "next/headers";
import ShowUserOrders from "../../_components/ShowUserOrders";
import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Orders",
};
export default function UserOrdersPage() {
  const token = cookies().get("token")?.value as string;
  const user = VerifyUserFromToken();
  return (
    <div>
      <ShowUserOrders id={user?.id ?? 0} token={token} />
    </div>
  );
}
