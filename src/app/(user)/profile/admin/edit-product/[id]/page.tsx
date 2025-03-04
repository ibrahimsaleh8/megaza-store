import ShowInputs from "../../../_components/EditPageComponents/ShowInputs";
import { cookies } from "next/headers";
export type ProductInfoForEditType = {
  id: string;
  title: string;
  available: boolean;
  description: string;
  images: string[];
  price: number;
  brandName: string;
  card_image: string;
  created_at: string;
  updated_at: string;
  colors: {
    id?: number;
    available: number;
    color: string;
  }[];
  hasDiscount: boolean;
  discount: number;
  sizes: {
    id?: number;
    available: number;
    size: string;
  }[];
  amount: number;
  category: {
    id: number;
    name: string;
  };
  comments: {
    id: number;
    content: string;
    rating: number;
    created_at: string;
    user: {
      id: number;
      username: string;
    };
  }[];
};
export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    return (
      <div className="flex items-center justify-center p-2 text-xl font-bold">
        Please Check Product Id
      </div>
    );
  }

  const token = cookies().get("token")?.value as string;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-bold">Edit Product</p>
      <ShowInputs token={token} id={params.id} />
    </div>
  );
}
