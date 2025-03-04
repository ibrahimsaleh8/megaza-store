import { cookies } from "next/headers";
import OrderDetails from "../_component/OrderDetails";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const token = cookies().get("token")?.value as string;
  return (
    <>
      <OrderDetails token={token} id={+params.id} />
    </>
  );
}
