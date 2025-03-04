import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
import ShowWishlistProducts from "./_component/ShowWishlistProducts";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wishlist",
};
export default function WishListPage() {
  const user = VerifyUserFromToken();

  return <ShowWishlistProducts userId={user ? user.id : 0} />;
}
