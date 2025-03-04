import ShowCateories from "../../_components/ShowCateories";
import { cookies } from "next/headers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Categories",
};
export type CategoriesWithProductType = {
  id: number;
  name: string;
  products: { id: string; card_image: string; title: string }[];
};
export default function CategoriesPage() {
  const token = cookies().get("token")?.value as string;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-bold">Categories</p>
      <ShowCateories token={token} />
    </div>
  );
}
