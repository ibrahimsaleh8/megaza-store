import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
import ShowCheckoutInfo from "./_component/ShowCheckoutInfo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout",
};
export default function CheckOutPage() {
  const user = VerifyUserFromToken();
  return (
    <>
      <ShowCheckoutInfo id={user ? user.id : null} />
    </>
  );
}
