import EditTabel from "../../_components/EditTabel";
import { cookies } from "next/headers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products",
};
export default function EditProductPage() {
  const token = cookies().get("token")?.value as string;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-bold">Products</p>

      <EditTabel token={token} />
    </div>
  );
}
