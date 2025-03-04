"use client";
import AddNewComment from "./comments/AddNewComment";
import UserComment from "./comments/UserComment";
import { ProductCommentType } from "@/utils/Types";
import { useUserStore } from "@/store/userInfoStore";
import FilterComments from "./rating/FilterComments";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import ProductRateBar from "./rating/ProductRateBar";
import { MainDomain } from "@/utils/mainDomain";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

async function FetchComments(productId: string): Promise<ProductCommentType[]> {
  const res = await axios.get(
    `${MainDomain}/api/products/comments?productId=${productId}`
  );
  return res.data;
}

type Props = {
  productId: string;
  token: string;
  setProductRate: Dispatch<SetStateAction<number>>;
};
type FilterCommenttype = "Featured" | "Newest" | "High rate" | "Low Rate";
export default function ReviewSection({
  productId,
  token,
  setProductRate,
}: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: ["product_comments", productId],
    queryFn: () => FetchComments(productId),
  });

  const { userInfo: userData } = useUserStore();
  const [filaterComment, setFilterComment] =
    useState<FilterCommenttype>("Featured");

  const ProductComments = useMemo(() => {
    if (!data) {
      return [];
    }
    const comments = data;

    if (filaterComment == "High rate") {
      comments.sort((f, s) => s.rating - f.rating);
    }
    if (filaterComment == "Low Rate") {
      comments.sort((f, s) => f.rating - s.rating);
    }
    if (filaterComment == "Newest") {
      comments.sort(
        (f, s) =>
          new Date(s.created_at).getTime() - new Date(f.created_at).getTime()
      );
    }

    return comments;
  }, [data, filaterComment]);
  if (error) throw new Error(error.message);

  return !isPending && ProductComments ? (
    <div className="p-2">
      <div className="w-full flex flex-col md:flex-row gap-2">
        <ProductRateBar
          setProductRate={setProductRate}
          usersRates={ProductComments.map((c) => c.rating)}
        />
      </div>
      {/* Comments */}
      <div className="w-full flex flex-col">
        <div className="flex gap-3 items-center">
          <AddNewComment userData={userData} productId={productId} />
          {ProductComments.length > 0 && (
            <FilterComments
              filaterComment={filaterComment}
              setFilterComment={setFilterComment}
            />
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          {ProductComments.length > 0 &&
            ProductComments.map((el) => (
              <UserComment
                token={token}
                userData={userData}
                commentData={el}
                key={el.id}
              />
            ))}
        </div>
      </div>
    </div>
  ) : (
    isPending && (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-64" />
        <div className="flex flex-col gap-3">
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-40" />
        </div>
      </div>
    )
  );
}
