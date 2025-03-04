"use client";
import { CategoriesWithProductType } from "../admin/categories/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineCheck } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";
import CategoryActions from "./CategoryActions";
import { MainDomain } from "@/utils/mainDomain";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import axios from "axios";
type filter = "Normal" | "Most in products" | "Least in products";
const filterdTxt: filter[] = [
  "Normal",
  "Most in products",
  "Least in products",
];

async function FetchCategories(): Promise<CategoriesWithProductType[]> {
  const res = await axios.get(
    `${MainDomain}/api/category/getall?with_products=true`
  );
  return res.data;
}
export default function ShowCateories({ token }: { token: string }) {
  const {
    data: cats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchCategories,
  });
  const [serachTxt, setSearchTxt] = useState("");
  const [filterd, setFilter] = useState<filter>("Normal");
  const filteredCategories = useMemo(() => {
    if (cats) {
      let result = cats;

      if (serachTxt.trim().length > 0) {
        result = result.filter((c) =>
          c.name.toLowerCase().includes(serachTxt.toLowerCase())
        );
      }

      if (filterd === "Most in products") {
        result = result.sort((f, s) => s.products.length - f.products.length);
      } else if (filterd === "Least in products") {
        result = result.sort((f, s) => f.products.length - s.products.length);
      } else if (filterd === "Normal") {
        result = result.sort((f, s) => f.id - s.id);
      }

      return result;
    }
  }, [cats, serachTxt, filterd]);
  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 justify-start sm:justify-between flex-wrap">
        {/* Search and Filter */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Search */}
          <div className="flex h-10 items-center border px-2 border-soft_border rounded-md">
            <CiSearch className="text-xl" />
            <Input
              onChange={(e) => setSearchTxt(e.target.value)}
              className="border-0"
              placeholder="Search"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-black text-white flex items-center gap-2 text-balance text-sm border border-black px-4 py-2 rounded-md">
              <Filter className="w-4 h-4" />
              Order by
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 w-52">
              {filterdTxt.map((f, i) => (
                <DropdownMenuItem
                  onClick={() => setFilter(f)}
                  key={i}
                  className="cursor-pointer flex items-center justify-between gap-2  hover:bg-white hover:text-black w-full">
                  {f}
                  {filterd == f && <HiOutlineCheck />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Add New Category */}
        <CategoryActions id={0} token={token} type="add" />
      </div>

      {!isLoading && filteredCategories ? (
        <>
          {filteredCategories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((c, i) => (
                    <TableRow key={c.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.products.length} Products</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <CategoryActions
                          title={c.name}
                          id={c.id}
                          token={token}
                          type="edit"
                          products={c.products}
                        />
                        <CategoryActions
                          id={c.id}
                          token={token}
                          type="delete"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell className="text-center" colSpan={4}>
                        No Categories Found
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="py-10 bg-low_white text-black text-center text-lg font-medium">
              No categories found!
            </div>
          )}
        </>
      ) : (
        <div className="flex mt-3 items-center justify-center gap-2">
          <SmallLoader color="black" />
          Loading....
        </div>
      )}
    </div>
  );
}
