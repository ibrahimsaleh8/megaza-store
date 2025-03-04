"use client";
import ProductCard from "@/components/layoutComponts/product/ProductCard";
import { FaFilter } from "react-icons/fa6";
import GridShowComponent from "@/components/layoutComponts/GridShowComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import CurrentRoute from "@/components/layoutComponts/CurrentRoute";
import { Portal } from "@radix-ui/react-portal";

import Link from "next/link";
import ProductsPagination from "./ProductsPagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { MainDomain } from "@/utils/mainDomain";
import { CategoriesType, ShowProductType } from "@/utils/Types";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
type PriceFilterType = "normal" | "high" | "low";

async function FetchProducts(RequestUrl: string): Promise<ShowProductType[]> {
  const res = await axios.get(RequestUrl);
  return res.data;
}

async function FetchCats(): Promise<CategoriesType[]> {
  const res = await axios.get(`${MainDomain}/api/category`);
  return res.data;
}

async function FetchProductsLength({
  category,
}: {
  category?: string;
}): Promise<number> {
  const url = category
    ? `${MainDomain}/api/products/length?category=${category}`
    : `${MainDomain}/api/products/length`;
  const res = await axios.get(url);
  return res.data;
}

const getDiscountedPrice = (product: ShowProductType) =>
  product.hasDiscount && product.discount
    ? product.price - (product.discount / 100) * product.price
    : product.price;

export default function ProductShow() {
  const params = useSearchParams();
  const category = params.get("category") as string;
  const pageNumber = params.get("number") as string;

  const RequestUrl =
    category && pageNumber
      ? `${MainDomain}/api/products?category=${category}&number=${pageNumber}`
      : category && !pageNumber
        ? `${MainDomain}/api/products?category=${category}&number=1`
        : pageNumber
          ? `${MainDomain}/api/products?number=${pageNumber}`
          : `${MainDomain}/api/products?number=1`;

  const {
    data: Products,
    isLoading,
    error: errorGetProducts,
  } = useQuery({
    queryKey: ["get_products", RequestUrl],
    queryFn: () => FetchProducts(RequestUrl),
  });

  const { data: ProductsLength, error: errorGetLength } = useQuery({
    queryKey: ["get_length", RequestUrl],
    queryFn: () => FetchProductsLength({ category }),
  });
  const {
    data: Categories,
    isLoading: catsLoading,
    error: errorGetCats,
  } = useQuery({
    queryKey: ["get_cats"],
    queryFn: () => FetchCats(),
  });

  const [filterByPrice, setFilterByPrice] = useState<PriceFilterType>("normal");

  const filteredProducts = useMemo(() => {
    if (!Products) return [];

    if (filterByPrice === "low" || filterByPrice === "high") {
      return [...Products].sort((a, b) => {
        const priceA = getDiscountedPrice(a);
        const priceB = getDiscountedPrice(b);
        return filterByPrice === "low" ? priceA - priceB : priceB - priceA;
      });
    }

    return Products;
  }, [Products, filterByPrice]);

  // Aos Animation
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  }, []);

  if (errorGetProducts) throw new Error(errorGetProducts.message);
  if (errorGetLength) throw new Error(errorGetLength.message);
  if (errorGetCats) throw new Error(errorGetCats.message);

  return filteredProducts ? (
    <div className="flex md:flex-row flex-col gap-5 items-start py-4 ">
      {/* Filter Box */}
      {catsLoading ? (
        <div className="md:w-72 w-full h-auto flex flex-col gap-2 border p-3 rounded-md">
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
        </div>
      ) : (
        <div className="md:w-72 overflow-hidden w-full h-auto flex flex-col gap-2 border bg-[#f3f3f3] text-black p-3 rounded-md">
          <div className="flex justify-between">
            <p className="font-medium">Category: </p>
            <FaFilter />
          </div>
          <ul
            data-aos-delay="300"
            data-aos="fade-up"
            className="flex flex-col gap-2">
            <li>
              <Link
                className={`
              ${!category ? "bg-main_bg text-white " : ""}
              cursor-pointer text-sm font-bold w-full border-b flex items-center justify-center px-3 py-2 gap-2 hover:bg-main_bg hover:text-white border-black duration-300`}
                href={`/products`}>
                All
              </Link>
            </li>

            {Categories &&
              Categories.map((el) => (
                <li key={el.id}>
                  <Link
                    className={`
                ${
                  category && el.name.toLowerCase() == category.toLowerCase()
                    ? "bg-main_bg text-white "
                    : ""
                }
                cursor-pointer text-sm font-bold w-full border-b px-3 border-black py-2 flex items-center justify-center gap-2 hover:bg-main_bg hover:text-white duration-300`}
                    href={`/products?category=${el.name.toLowerCase()}`}>
                    {el.name.toUpperCase()}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Products Box */}
      <div className="lg:flex-1 flex flex-col gap-3 w-full">
        {/* Filter By Price */}
        <div className="flex sm:justify-between sm:items-center sm:flex-row gap-2 flex-col">
          <CurrentRoute />
          <div className="mb-2 flex  items-center gap-2  sm:ml-auto">
            <p>Sort by</p>
            <Select
              defaultValue={"normal"}
              onValueChange={(e: PriceFilterType) => setFilterByPrice(e)}>
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Order by" />
              </SelectTrigger>
              <Portal>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High price</SelectItem>
                  <SelectItem value="low">Low price</SelectItem>
                </SelectContent>
              </Portal>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col sm:flex-row gap-1">
            <Skeleton className="sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
            <Skeleton className="sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
            <Skeleton className="hidden xl:block  sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
            <Skeleton className="hidden xl:block  sm:w-1/2 md:w-1/2 xl:1/4 w-full h-[433px]" />
          </div>
        )}
        {/* Show Products */}
        {filteredProducts.length == 0 && !isLoading ? (
          <p className="text-center font-medium mt-5 text-gray-600">
            No products found for the selected Category.
          </p>
        ) : (
          <GridShowComponent minWidth={270} classes="gap-3 gap-y-3">
            {filteredProducts.map((el) => (
              <ProductCard
                key={el.id}
                image={el.card_image}
                price={el.price}
                title={el.title}
                category={el.category}
                id={el.id}
                available={el.available}
                hasDiscount={el.hasDiscount}
                discount={el.discount}
                colors={el.colors}
                sizes={el.sizes}
                amount={el.amount}
              />
            ))}
          </GridShowComponent>
        )}
        <div className="my-10">
          <ProductsPagination
            Admin={false}
            ProductsLength={ProductsLength ?? 0}
          />
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
}
