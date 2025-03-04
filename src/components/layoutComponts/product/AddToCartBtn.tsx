"use client";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userInfoStore";
import SmallLoader from "../Loader/SmallLoader";
import { TbShoppingBagPlus } from "react-icons/tb";
import { CartRequestType } from "@/utils/Types";
type Props = {
  ProductDetails: {
    id: string;
    title: string;
    card_image: string;
    price: number;
    available: boolean;
    discount?: number;
    hasDiscount: boolean;
    size: {
      size: string;
      availabel: number;
    };
    color: {
      color: string;
      availabel: number;
    };
  };
  availabel: boolean;
  onClickFn?: () => void;
};
export default function AddToCartBtn({
  ProductDetails,
  availabel,
  onClickFn,
}: Props) {
  const { userInfo, AddToCart } = useUserStore();
  const [loading, setLoading] = useState(false);

  const Items = useMemo(() => {
    if (userInfo) {
      const cartItems = userInfo.cart.items.filter(
        (c) => c.product.id == ProductDetails.id
      );

      return cartItems;
    }
    return [];
  }, [ProductDetails.id, userInfo]);

  const HandleAddToCart = async () => {
    if (ProductDetails.size.size == "") {
      toast.warn("Please Selecte Product Size");
    } else if (ProductDetails.color.color == "") {
      toast.warn("Please Selecte Product Color");
    } else {
      if (userInfo) {
        setLoading(true);

        const selectedColor = Items.filter(
          (itm) => itm.color == ProductDetails.color.color
        )
          .map((e) => e.quantity)
          .reduce((f, s) => f + s, 0);
        const selectedSize = Items.filter(
          (itm) => itm.size == ProductDetails.size.size
        )
          .map((e) => e.quantity)
          .reduce((f, s) => f + s, 0);

        if (
          selectedColor >= ProductDetails.color.availabel ||
          selectedSize >= ProductDetails.size.availabel
        ) {
          setLoading(false);
          toast.warn("You reached the maximum stock");
          return;
        }

        AddToCart({
          color: ProductDetails.color.color,
          id: 0,
          product: {
            id: ProductDetails.id,
            available: ProductDetails.available,
            card_image: ProductDetails.card_image,
            hasDiscount: ProductDetails.hasDiscount,
            price: ProductDetails.price,
            title: ProductDetails.title,
            discount: ProductDetails.discount,
            colors: [
              {
                available: ProductDetails.color.availabel,
                color: ProductDetails.color.color,
              },
            ],
            sizes: [
              {
                available: ProductDetails.size.availabel,
                size: ProductDetails.size.size,
              },
            ],
          },
          quantity: 1,
          size: ProductDetails.size.size,
        });

        const ProductInfoDB: CartRequestType = {
          item: {
            color: ProductDetails.color.color,
            productId: ProductDetails.id,
            quantity: 1,
            size: ProductDetails.size.size,
          },
          userId: userInfo.id,
        };
        await axios
          .post(`${MainDomain}/api/user/cart`, ProductInfoDB)
          .then(() => {
            toast.success("Product Added");
          })
          .catch((err) => toast.error(err.response.data.message))
          .finally(() => {
            setLoading(false);
            if (onClickFn) {
              onClickFn();
            }
          });
      } else {
        toast.error("Please login first");
      }
    }
  };
  return (
    <Button
      disabled={
        !availabel ||
        ProductDetails.color.availabel == 0 ||
        ProductDetails.size.availabel == 0
      }
      onClick={HandleAddToCart}
      className="overflow-hidden rounded-lg disabled:opacity-80 disabled:!cursor-not-allowed font-medium bg-black hover:bg-[#161718] text-white  border border-second_box_bg duration-300 group w-full h-11">
      {loading ? (
        <>
          <SmallLoader color="white" />
        </>
      ) : (
        <>
          <p className="flex items-center gap-2">
            Add To Cart
            <TbShoppingBagPlus />
          </p>
        </>
      )}
    </Button>
  );
}
