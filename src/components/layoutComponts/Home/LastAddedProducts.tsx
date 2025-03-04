"use client";

import { MainDomain } from "@/utils/mainDomain";
import { ProductsShowType } from "@/utils/Types";
import { useQuery } from "@tanstack/react-query";
import GridProducts from "../GridProducts";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
async function FetchLastAddedProducts(): Promise<ProductsShowType[]> {
  const res = await axios.get(`${MainDomain}/api/products?last_added=1`);
  return res.data;
}
export default function LastAddedProducts() {
  const {
    data: Products,
    isPending,
    error,
  } = useQuery({
    queryKey: ["last_added"],
    queryFn: FetchLastAddedProducts,
  });
  if (error) throw new Error(error.message);

  return Products && Products.length > 0 && !isPending ? (
    <div className="py-6">
      <div className="flex items-center justify-between mb-1 px-2">
        <p className="text-lg">Last added</p>
        <Link className="text-sky-600" href={"/products"}>
          See More
        </Link>
      </div>
      <GridProducts products={Products} />
    </div>
  ) : (
    isPending && (
      <div className="flex flex-col sm:flex-row gap-1 px-3">
        <Skeleton className="sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[400px]" />
        <Skeleton className="sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[400px]" />
        <Skeleton className="hidden md:block  sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[400px]" />
        <Skeleton className="hidden xl:block  sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[400px]" />
      </div>
    )
  );
}
