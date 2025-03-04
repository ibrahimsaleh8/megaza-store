"use client";
import CurrentRoute from "@/components/layoutComponts/CurrentRoute";
import { Skeleton } from "@/components/ui/skeleton";
import { MainDomain } from "@/utils/mainDomain";
import { ProductsShowType } from "@/utils/Types";
import { useQuery } from "@tanstack/react-query";
import GridProducts from "@/components/layoutComponts/GridProducts";
import axios from "axios";
import { BiSolidOffer } from "react-icons/bi";

async function FetchDiscountProducts(): Promise<ProductsShowType[]> {
  const res = await axios.get(`${MainDomain}/api/products?discount=1`);
  return res.data;
}

export default function ShowSalesProducts() {
  const {
    data: DiscountProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["discount_products"],
    queryFn: FetchDiscountProducts,
  });

  if (error) throw new Error(error.message);

  return !isLoading && DiscountProducts ? (
    <>
      {/* Show Products */}
      {DiscountProducts.length == 0 && !isLoading ? (
        <p className="text-center font-medium mt-5 text-gray-600">
          Currently we do not find any products on discount stay tuned!
        </p>
      ) : (
        <div>
          {/* Filter By Price */}
          <div className="flex sm:justify-between sm:items-center sm:flex-row gap-2 flex-col py-2">
            <CurrentRoute />
            <p className="flex items-center gap-1 text-sm sm:text-base ml-auto">
              <BiSolidOffer className="w-5 h-5" />
              {DiscountProducts.length} Products have discount
            </p>
          </div>

          <GridProducts products={DiscountProducts} />
        </div>
      )}
    </>
  ) : (
    <div className="flex flex-col sm:flex-row gap-1">
      <Skeleton className="sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
      <Skeleton className="sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
      <Skeleton className="hidden xl:block  sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
      <Skeleton className="hidden xl:block  sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
    </div>
  );
}
