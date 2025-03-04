"use client";
import Container from "@/components/Container";
import GridShowComponent from "@/components/layoutComponts/GridShowComponent";
import ProductCard from "@/components/layoutComponts/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { MainDomain } from "@/utils/mainDomain";
import { CategoriesType } from "@/utils/Types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { FaHeartPulse } from "react-icons/fa6";
import { TbHeartExclamation } from "react-icons/tb";

type WishlistDataType = {
  id: number;
  items: {
    id: number;
    product: {
      id: string;
      title: string;
      card_image: string;
      amount: number;
      price: number;
      available: boolean;
      hasDiscount: boolean;
      discount: number;
      category?: CategoriesType;
      colors: {
        color: string;
        available: number;
      }[];

      sizes: {
        size: string;
        available: number;
      }[];
    };
  }[];
};
async function GetWishlistData(uID: number): Promise<WishlistDataType> {
  const res = await axios.get(`${MainDomain}/api/user/wishlist?uid=${uID}`);
  return res.data;
}

export default function ShowWishlistProducts({ userId }: { userId: number }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["Wishlist"],
    queryFn: () => GetWishlistData(userId),
  });
  if (error) {
    throw new Error(error.message);
  }
  if (userId == 0) {
    return (
      <div className="flex flex-col justify-center items-center py-3 gap-2 min-h-screen">
        <TbHeartExclamation className="w-10 h-10 text-red-500" />

        <p className="py-2 text-lg font-bold">
          Please Login First to access your wishList products
        </p>
        <Link
          className="px-4 py-2 bg-white text-black rounded-md font-semibold"
          href={"/login"}>
          Login
        </Link>
      </div>
    );
  }

  return !isPending && data ? (
    <Container>
      {data.items.length > 0 ? (
        <>
          <div className="flex flex-col gap-2 py-2 min-h-[50vh]">
            <GridShowComponent minWidth={250} classes="gap-3  gap-y-3">
              {data.items.map((el) => (
                <ProductCard
                  colors={el.product.colors}
                  sizes={el.product.sizes}
                  key={el.product.id}
                  id={el.product.id}
                  image={el.product.card_image}
                  price={el.product.price}
                  title={el.product.title}
                  available={el.product.available}
                  hasDiscount={el.product.hasDiscount}
                  discount={el.product.discount}
                  category={el.product.category}
                  amount={el.product.amount}
                />
              ))}
            </GridShowComponent>
          </div>
        </>
      ) : (
        <div className="flex flex-col sm:py-10 py-5 gap-2 min-h-[50vh]">
          <div className="flex flex-col items-center justify-center">
            <FaHeartPulse className="w-10 h-10" />
            <p className="font-bold">
              You {"haven't"} added anything to your wishlist yet.
            </p>
          </div>{" "}
        </div>
      )}
    </Container>
  ) : (
    isPending && (
      <div className="flex flex-wrap gap-3 py-2 px-4">
        <Skeleton className="w-72 h-96" />
        <Skeleton className="w-72 h-96" />
        <Skeleton className="w-72 h-96" />
      </div>
    )
  );
}
