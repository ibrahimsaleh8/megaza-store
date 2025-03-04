"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import { MainDomain } from "@/utils/mainDomain";
import { CartProductChangeType, ErrorResponseType } from "@/utils/Types";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import Link from "next/link";
import { CartItemType, useUserStore } from "@/store/userInfoStore";
import useDebounce from "@/hooks/useDebounce";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  cartProducts: CartItemType;
};
async function UpdateQuantatyDB(sendedData: {
  userId: number;
  productId: string;
  size: string;
  color: string;
  quantity: number;
}) {
  await axios
    .put(`${MainDomain}/api/user/cart`, sendedData)
    .catch((err) => toast.error(err.response.data.message));
}

const ProductCartCard: React.FC<Props> = ({ cartProducts }) => {
  const { userInfo, RemoveFromCart, ChangeQuantity } = useUserStore();
  const debounce = useDebounce(cartProducts.quantity.toString());
  const [update, setUpdate] = useState(false);
  const productCart: CartProductChangeType | null = useMemo(() => {
    if (userInfo) {
      return {
        color: cartProducts.color,
        productId: cartProducts.product.id,
        size: cartProducts.size,
        userId: userInfo.id,
      };
    }
    return null;
  }, [
    cartProducts.color,
    cartProducts.product.id,
    cartProducts.size,
    userInfo,
  ]);

  const HandleQuantatyChange = async (
    cartProductId: number,
    quantity: number,
    operation: "up" | "down"
  ) => {
    if (userInfo) {
      // Checking Availabel Stock
      if (operation == "up") {
        const availabelColor = cartProducts.product.colors.filter(
          (c) => c.color == cartProducts.color
        )[0].available;

        const availabelSize = cartProducts.product.sizes.filter(
          (s) => s.size == cartProducts.size
        )[0].available;

        const Items = userInfo.cart.items.filter(
          (c) => c.product.id == cartProducts.product.id
        );
        const selectedColor = Items.filter(
          (itm) => itm.color == cartProducts.color
        )
          .map((e) => e.quantity)
          .reduce((f, s) => f + s, 0);

        const selectedSize = Items.filter(
          (itm) => itm.size == cartProducts.size
        )
          .map((e) => e.quantity)
          .reduce((f, s) => f + s, 0);

        if (selectedColor >= availabelColor || selectedSize >= availabelSize) {
          toast.warn("You reached the maximum stock");
          return;
        }
      }

      ChangeQuantity(
        cartProducts.product.id,
        cartProducts.color,
        cartProducts.size,
        operation
      );
      setUpdate(true);
    }
  };

  const HandleDeleteFromCart = async () => {
    if (productCart) {
      RemoveFromCart(
        cartProducts.product.id,
        cartProducts.color,
        cartProducts.size
      );

      await axios
        .delete(`${MainDomain}/api/user/cart`, {
          data: productCart,
        })
        .catch((err: ErrorResponseType) => {
          toast.error(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    if (userInfo && +debounce == cartProducts.quantity && update) {
      UpdateQuantatyDB({
        color: cartProducts.color,
        productId: cartProducts.product.id,
        size: cartProducts.size,
        userId: userInfo.id,
        quantity: +debounce,
      }).finally(() => {
        setUpdate(false);
      });
    }
  }, [
    cartProducts.color,
    cartProducts.product.id,
    cartProducts.quantity,
    cartProducts.size,
    debounce,
    update,
    userInfo,
  ]);

  return (
    <div className="flex items-center justify-between w-full gap-2 min-h-[10rem] overflow-hidden border-b relative text-black bg-white p-2 pl-1  duration-200 hover:bg-low_white border-soft_border">
      <div
        onClick={HandleDeleteFromCart}
        className="absolute bg-white border border-soft_border w-7 h-7 flex items-center justify-center right-1 top-1 cursor-pointer p-1 rounded-sm">
        <FiTrash2 className="text-black w-full" />
      </div>

      <img
        className="w-28 h-36 object-cover object-center sm:mx-0 mx-auto rounded-sm bg-white"
        src={cartProducts.product.card_image}
        alt={`${cartProducts.product.title}`}
      />

      <div className="flex flex-col p-1.5 mt-2 gap-1 w-full">
        <Link
          href={`/products/${cartProducts.product.id}`}
          className="text-[0.8rem] text-black line-clamp-1 hover:underline">
          {cartProducts.product.title}
        </Link>
        {cartProducts.product.hasDiscount && cartProducts.product.discount ? (
          <div className="flex items-center gap-1">
            <p className="text-accent_Bright_Red text-sm line-through">
              ${cartProducts.product.price}
            </p>
            <p className="text-black font-medium">
              $
              {cartProducts.product.price -
                (cartProducts.product.discount / 100) *
                  cartProducts.product.price}
            </p>
          </div>
        ) : (
          <p className="text-black font-medium">
            ${cartProducts.product.price}
          </p>
        )}

        {/* Colors */}
        <div className="flex gap-2 items-center">
          <p className="text-sm">color:</p>
          <div
            style={{
              backgroundColor: cartProducts.color,
            }}
            className="w-4 h-4 border border-soft_border"></div>
        </div>

        {/* Size */}
        <div className="flex gap-2 items-center ">
          <p className="text-sm">size: {cartProducts.size}</p>
        </div>

        <div className="flex items-center justify-between gap-4 py-1 mt-auto w-fit rounded-md">
          <button
            onClick={() =>
              HandleQuantatyChange(cartProducts.id, cartProducts.quantity, "up")
            }
            className="p-[0.2rem] rounded-sm border border-soft_border text-black">
            <FaPlus className="w-3 h-3" />
          </button>
          <p className="font-bold text-black">
            {cartProducts.quantity} <span className="font-normal">Items</span>
          </p>
          <button
            disabled={cartProducts.quantity === 1}
            onClick={() =>
              HandleQuantatyChange(
                cartProducts.id,
                cartProducts.quantity,
                "down"
              )
            }
            className="p-[0.2rem] rounded-sm border border-soft_border text-black">
            <FaMinus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCartCard);
