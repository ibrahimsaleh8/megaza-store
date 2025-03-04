import React, { memo, useEffect } from "react";
import { CategoriesType } from "@/utils/Types";
import Link from "next/link";

import WishListBtn from "./WishListBtn";
import { FaFire } from "react-icons/fa";
import CardAddToCard from "./CardAddToCard";
import Aos from "aos";
import "aos/dist/aos.css";

type Props = {
  image: string;
  title: string;
  price: number;
  amount: number;
  category?: CategoriesType;
  id: string;
  available: boolean;
  hasDiscount: boolean;
  discount?: number;
  colors: {
    available: number;
    color: string;
  }[];
  sizes: {
    available: number;
    size: string;
  }[];
  animation?: boolean;
  classess?: string;
};

const ProductCard = ({
  image,
  price,
  title,
  category,
  id,
  available,
  hasDiscount,
  discount,
  colors,
  amount,
  sizes,
  animation,
  classess,
}: Props) => {
  const url = `/products/${id}`;
  // Aos Animation
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  }, []);
  return (
    <div
      data-aos={animation ? "" : "zoom-in"}
      className={`relative group pb-1 groupflex flex-col duration-500 rounded-xl shadow-md text-white p-2  ${classess ? classess : ""}`}>
      {/* Favorite Icon */}
      <WishListBtn floated={true} productId={id} />

      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute text-sm top-3 left-3 px-2 py-1.5 z-10 bg-accent_Bright_Red flex items-center gap-2 justify-center">
          <FaFire />
          {discount}%
        </div>
      )}

      {/* Image */}
      <Link
        href={url}
        className="p-2 pb-0 border group overflow-hidden rounded-lg flex justify-center items-center w-full bg-[#eee] rounded-br-none rounded-bl-none ">
        <img
          className="w-80 h-80 object-cover group-hover:scale-105 duration-500"
          alt={`${title} image`}
          src={image}
        />
      </Link>

      {/* Text */}
      <div className="text p-2 flex text-black flex-col gap-2  rounded-md rounded-tr-none rounded-tl-none">
        <Link className="hover:underline line-clamp-2 h-[2.77rem]" href={url}>
          {title}
        </Link>

        <div className="flex text-center justify-between">
          {amount == 0 ? (
            <p className="text-white bg-accent_Bright_Red px-1 rounded-sm text-sm flex items-center gap-0">
              Out of stock
            </p>
          ) : (
            <p className="text-white bg-green-700 font-normal px-1 rounded-sm text-sm flex items-center gap-0">
              Availabel
            </p>
          )}
          {category && (
            <Link
              href={`/products?category=${category.name.toLowerCase()}`}
              className="text-sm text-secondry_white w-fit">
              {category.name}
            </Link>
          )}
        </div>

        <div>
          {hasDiscount && discount ? (
            <div className="flex items-center">
              <p className=" text-sm line-through text-accent_Bright_Red">
                {price.toFixed(2)}$
              </p>
              <p className="font-bold text-lg pl-2">
                {(price - (discount / 100) * price).toFixed(2)}$
              </p>
            </div>
          ) : (
            <p className="text-lg font-bold text-black">{price.toFixed(2)}$</p>
          )}
        </div>
        <CardAddToCard
          ProductInfo={{
            card_image: image,
            price,
            title,
            id,
            available,
            hasDiscount,
            discount,
            colors,
            sizes,
          }}
          amount={amount}
        />
      </div>
    </div>
  );
};

export default memo(ProductCard);
