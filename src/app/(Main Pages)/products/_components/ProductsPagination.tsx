"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
const itemsPerPage = 8;
export default function ProductsPagination({
  ProductsLength,
  Admin,
}: {
  ProductsLength: number;
  Admin: boolean;
}) {
  const params = useSearchParams();
  const currentPage = Number(params.get("number")) || 1;
  const category = params.get("category");
  const totalPages = Math.max(1, Math.ceil(ProductsLength / itemsPerPage));
  const NextDisabled = currentPage == totalPages;
  const PrevDisabled = currentPage == 1;
  let prevUrl = "",
    nextUrl = "";
  if (Admin) {
    prevUrl = category
      ? `/profile/admin/edit-product?number=${currentPage - 1}&category=${category}`
      : `/profile/admin/edit-product?number=${currentPage - 1}`;
    nextUrl = category
      ? `/profile/admin/edit-product?number=${currentPage + 1}&category=${category}`
      : `/profile/admin/edit-product?number=${currentPage + 1}`;
  } else {
    prevUrl = category
      ? `/products?number=${currentPage - 1}&category=${category}`
      : `/products?number=${currentPage - 1}`;
    nextUrl = category
      ? `/products?number=${currentPage + 1}&category=${category}`
      : `/products?number=${currentPage + 1}`;
  }

  return (
    <Pagination>
      <PaginationContent className="w-full flex justify-between items-center">
        {!PrevDisabled ? (
          <PaginationItem>
            <PaginationPrevious
              className="bg-[#e7e7e7] border"
              href={prevUrl}
            />
          </PaginationItem>
        ) : (
          <button
            className="flex items-center cursor-not-allowed gap-1 text-sm font-normal h-9 px-4 py-2 pl-2.5 border bg-slate-300 rounded-md opacity-50"
            disabled={true}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
        )}

        {!NextDisabled ? (
          <PaginationItem>
            <PaginationNext className="bg-[#e7e7e7] border" href={nextUrl} />
          </PaginationItem>
        ) : (
          <button
            className="flex items-center cursor-not-allowed gap-1 text-sm font-normal border bg-slate-300 py-2 px-4 pr-2.5 rounded-md opacity-50"
            disabled={true}>
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </PaginationContent>
    </Pagination>
  );
}
