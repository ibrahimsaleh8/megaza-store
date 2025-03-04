"use client";
import { useUserStore } from "@/store/userInfoStore";
import { MainDomain } from "@/utils/mainDomain";
import { ErrorResponseType, WishListRequestType } from "@/utils/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
async function AddToWishListDb(WsihListData: WishListRequestType) {
  await axios.post(`${MainDomain}/api/user/wishlist`, WsihListData);
}

async function RemoveFromWishListDb(ProductId: string, userId: number) {
  await axios.delete(`${MainDomain}/api/user/wishlist`, {
    data: {
      uid: userId,
      ProductId,
    },
  });
}

export default function WishListBtn({
  productId,
  floated,
}: {
  productId: string;
  floated: boolean;
}) {
  const queryClient = useQueryClient();
  const { userInfo, AddToWishList, RemoveFromWishList } = useUserStore();
  // Add To WishList Query
  const { mutate: AddWish, isPending: addLoading } = useMutation({
    mutationFn: (WsihListData: WishListRequestType) =>
      AddToWishListDb(WsihListData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["Wishlist"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  // Remove From WishList Query
  const { mutate: RemoveWish, isPending: RemoveLoading } = useMutation({
    mutationFn: ({
      ProductId,
      userId,
    }: {
      ProductId: string;
      userId: number;
    }) => RemoveFromWishListDb(ProductId, userId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["Wishlist"] });
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  const AddToWishListFn = useCallback(async () => {
    if (userInfo) {
      AddToWishList(productId);
      const WsihListData: WishListRequestType = {
        item: { productId, wishlistId: userInfo?.wishList.id },
        userId: userInfo.id,
      };
      AddWish(WsihListData);
    } else {
      toast.error("Please Login First");
    }
  }, [AddToWishList, AddWish, productId, userInfo]);

  const RemoveFromWishListFn = useCallback(async () => {
    if (userInfo) {
      const WishlistProductId = userInfo.wishList.items.find(
        (el) => el.product.id == productId
      )?.id;
      if (WishlistProductId) {
        RemoveFromWishList(WishlistProductId);
        RemoveWish({ ProductId: productId, userId: userInfo.id });
      }
    }
  }, [RemoveFromWishList, RemoveWish, productId, userInfo]);

  const isChecked = useMemo(() => {
    if (userInfo) {
      return (
        userInfo.wishList.items.findIndex((el) => el.product.id == productId) !=
        -1
      );
    }
    return false;
  }, [productId, userInfo]);

  const classes = floated
    ? "absolute top-3 right-4 flex justify-center items-center rounded-full duration-300 bg-[#eee] border w-8 h-8 z-50"
    : "duration-300 flex justify-center items-center w-full h-10 bg-white border border-soft_border rounded-lg hover:border-white hover:bg-accent_Bright_Red group ";
  return (
    <>
      {isChecked ? (
        <>
          <button
            aria-label="remove from wishlist"
            className={`${classes} !bg-accent_Bright_Red !text-white  border-accent_Bright_Red `}
            disabled={addLoading || RemoveLoading}
            onClick={RemoveFromWishListFn}>
            <FaHeart
              className={`${
                isChecked
                  ? "text-white hover:text-white"
                  : "text-black hover:text-white"
              }`}
            />
          </button>
        </>
      ) : (
        <>
          <button
            aria-label="add to wishlist"
            className={`${classes} bg-white `}
            disabled={addLoading || RemoveLoading}
            onClick={AddToWishListFn}>
            <FaRegHeart
              className={`duration-300 ${floated ? "text-black hover:text-red-500" : "text-black group-hover:text-white"}`}
            />
          </button>
        </>
      )}
    </>
  );
}
