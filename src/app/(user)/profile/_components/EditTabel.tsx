"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import DeleteProuctBtn from "./DeleteProuctBtn";
import { MainDomain } from "@/utils/mainDomain";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import axios from "axios";
type Props = {
  token: string;
};

type productsType = {
  id: string;
  title: string;
  price: number;
  amount: number;
  category: { name: string };
  card_image: string;
}[];

async function fetchProducts(): Promise<productsType> {
  const res = await axios.get(`${MainDomain}/api/products?all=1`);
  return res.data;
}
export default function EditTabel({ token }: Props) {
  // Fetch Products
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product-edit"],
    queryFn: () => fetchProducts(),
  });
  const [searchTxt, setSearchTxt] = useState("");
  const FilterdData = useMemo(() => {
    return searchTxt.trim().length > 0 && products
      ? products.filter((p) =>
          p.title.toLowerCase().includes(searchTxt.toLowerCase())
        )
      : products;
  }, [products, searchTxt]);

  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center border px-2 rounded-lg w-fit border-soft_border">
          <CiSearch className="w-5 h-5" />
          <Input
            onChange={(e) => setSearchTxt(e.target.value)}
            className="border-0 h-9 shadow-none focus-visible:ring-0 text-black w-full"
            placeholder="Search in product by title"
          />
        </div>
        {/* Buttons */}
        <div className="ml-auto">
          <Link
            className="flex text-sm items-center gap-2 px-4 py-3 rounded-lg bg-black text-white"
            href={"/profile/admin/add-product"}>
            <MdAdd className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {FilterdData ? (
        <>
          {FilterdData.length > 0 ? (
            <div>
              <Table>
                <TableHeader className="bg-[#f2f2f2]">
                  <TableRow>
                    <TableHead className="text-sm">#</TableHead>
                    <TableHead className="text-sm">Product</TableHead>
                    <TableHead className="text-sm">Category</TableHead>
                    <TableHead className="text-sm">Stock</TableHead>
                    <TableHead className="text-sm">Price</TableHead>
                    <TableHead className="text-sm ">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-b">
                  {FilterdData?.map((p, i) => (
                    <TableRow key={p.id}>
                      <TableCell>{i + 1}</TableCell>

                      <TableCell className="font-medium w-96">
                        <div className="flex items-center gap-1">
                          <img
                            className="w-16 rounded-md"
                            src={p.card_image}
                            alt={p.title}
                          />
                          <p className="w-full">{p.title}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="px-2 bg-[#ebebeb] w-fit py-1 rounded-md">
                          {p.category.name}
                        </p>
                      </TableCell>
                      <TableCell>{p.amount}</TableCell>
                      <TableCell>${p.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <TooltipProvider delayDuration={50}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link
                                  href={`/profile/admin/edit-product/${p.id}`}
                                  className="bg-[#6EC7F9] flex items-center justify-center hover:bg-[#63c3fa] h-8 w-9 rounded-lg">
                                  <AiFillEdit className="text-lg text-white" />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Product</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <DeleteProuctBtn token={token} id={p.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full text-lg font-medium text-center py-10 bg-low_white">
              No Products Found
            </div>
          )}
        </>
      ) : (
        isLoading && (
          <div className="flex items-start justify-center gap-2 w-full">
            <SmallLoader color="black" />
            Loading..
          </div>
        )
      )}
    </div>
  );
}
