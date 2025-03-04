"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import ProductSearchCard from "./ProductSearchCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import SmallLoader from "../Loader/SmallLoader";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import useDebounce from "@/hooks/useDebounce";
type SearchResultType = {
  id: string;
  title: string;
  card_image: string;
};
export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const debounce = useDebounce(searchText);
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const ProductSearch = async () => {
      await axios
        .get(`${MainDomain}/api/products/search?title=${debounce}`)
        .then((res) => setSearchResult(res.data))
        .finally(() => setLoading(false))
        .catch((err) => toast.error(err.response.data.message));
    };
    if (debounce.trim().length > 0) {
      setLoading(true);
      ProductSearch();
    } else {
      setSearchResult([]);
    }
  }, [debounce]);
  return (
    <>
      <Dialog onOpenChange={() => setSearchResult([])}>
        <DialogTrigger
          aria-label="open search dialog"
          className="flex items-center justify-center">
          <FiSearch className="sm:w-5 sm:h-5 w-[1.15rem] h-[1.15rem] text-black cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="bg-white text-black md:w-lg w-[97%] rounded-md mx-auto border-[#201e1e]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 border px-2 rounded-md border-soft_border">
            <Input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              className="border-0 focus-visible:ring-0 font-medium"
              placeholder="type a command or search..."
            />
            <CiSearch className="w-6 h-6" />
          </div>

          {/* Search Result */}
          <div className="w-full flex flex-col gap-2 h-48 overflow-y-auto ">
            {loading && (
              <div className="flex items-center gap-2 w-full justify-center">
                Loading...
                <SmallLoader color="black" />
              </div>
            )}
            {debounce.trim().length == 0 && searchText.trim().length == 0 && (
              <p className="text-zinc-600 font-medium text-center mt-5">
                Search Result
              </p>
            )}
            {debounce.trim().length > 0 &&
              searchResult.length == 0 &&
              !loading && (
                <p className="text-zinc-600 font-medium text-center mt-5">
                  No Result Found
                </p>
              )}

            {searchResult.length > 0 &&
              debounce.length > 0 &&
              !loading &&
              searchResult.map((el) => (
                <ProductSearchCard
                  key={el.id}
                  id={el.id}
                  image={el.card_image}
                  title={el.title}
                />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
