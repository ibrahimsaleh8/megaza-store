"use client";
import { FiShoppingCart } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MdPayments } from "react-icons/md";
import ProductCartCard from "../product/ProductCartCard";
import { useUserStore } from "@/store/userInfoStore";
import Link from "next/link";
import { LuShoppingBasket } from "react-icons/lu";
import { useMemo, useRef } from "react";

export default function CartInfo() {
  const { userInfo } = useUserStore();
  const Total = useMemo(() => {
    if (userInfo && userInfo.cart) {
      return userInfo.cart.items
        .map((el) => {
          if (el.product.hasDiscount && el.product.discount) {
            return (
              el.quantity *
              (el.product.price -
                (el.product.price * el.product.discount) / 100)
            );
          }
          return el.quantity * el.product.price;
        })
        .reduce((f, s) => f + s, 0);
    }
    return 0;
  }, [userInfo]);
  const refClose = useRef<HTMLButtonElement>(null);
  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative cursor-pointer">
          <LuShoppingBasket className="sm:w-5 sm:h-5 w-[1.15rem] h-[1.15rem] text-black" />
          <p className="absolute w-4 h-4 flex items-center justify-center top-[-13px] right-[-6px] bg-black text-white rounded-full p-1 font-bold text-[12px]">
            {userInfo && userInfo?.cart ? userInfo?.cart.items.length : 0}
          </p>
        </div>
      </SheetTrigger>
      <SheetContent className="bg-white text-black border-0 px-1">
        <SheetHeader>
          <SheetTitle className="border-b px-2 text-black border-soft_border pb-2">
            Shopping cart
            <SheetClose ref={refClose}></SheetClose>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full gap-1">
          <div className="mt-0.5 flex flex-col gap-2 overflow-y-auto text-black max-h-[80%]">
            {userInfo && userInfo?.cart && userInfo?.cart.items.length > 0 ? (
              userInfo.cart.items.map((el) => (
                <ProductCartCard
                  key={el.id}
                  cartProducts={{
                    id: el.id,
                    product: el.product,
                    quantity: el.quantity,
                    color: el.color,
                    size: el.size,
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col text-black items-center gap-3">
                <FiShoppingCart className="text-5xl" />
                <p className="font-bold text-lg">Your cart is empty.</p>
              </div>
            )}
          </div>

          {userInfo && userInfo?.cart && userInfo?.cart.items.length > 0 && (
            <div className="text-black flex flex-col py-2 pt-4 px-1.5 gap-2 border-t border-soft_border  absolute bottom-0 left-0 w-full h-[14%] max-h-[150px]">
              <p className=" md:text-xl w-full flex flex-wrap items-center px-2">
                Subtotal:
                <span className="ml-auto font-bold">${Total.toFixed(2)}</span>
              </p>
              <Link
                onClick={() => refClose.current?.click()}
                href={"/checkout"}
                className="w-3/4 mx-auto rounded-sm mt-auto flex gap-2 items-center px-4 py-2 justify-center duration-300 bg-black text-white font-medium hover:bg-white hover:text-black border border-black">
                Checkout
                <MdPayments />
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
