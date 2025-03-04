import ShowOrders from "./_component/ShowOrders";
import { cookies } from "next/headers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Orders",
};
export default function OrdersPage() {
  const token = cookies().get("token")?.value as string;
  return (
    <div className="flex flex-col gap-2">
      <ShowOrders token={token} />
    </div>
  );
}
