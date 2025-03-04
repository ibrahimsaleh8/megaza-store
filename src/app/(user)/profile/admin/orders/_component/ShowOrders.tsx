"use client";
import { MainDomain } from "@/utils/mainDomain";
import OrdersFilter from "./OrdersFilter";
import OrdersTable from "./OrdersTable";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbBasketDollar } from "react-icons/tb";
import axios from "axios";

export type FilterType =
  | "All"
  | "PENDING"
  | "COMPLETED"
  | "CANCELED"
  | "SHIPPED";

export type OrdersType = {
  id: number;
  created_at: string;
  name: string;
  isPaid: boolean;
  orderKind: "PAY_ON_DELEIVER" | "PAY_CREDIT_CARD";
  items: {
    id: string;
  }[];
  totalAmount: number;
  status: FilterType;
};

async function FetchOrders(token: string): Promise<OrdersType[]> {
  const res = await axios.get(`${MainDomain}/api/orders`, {
    headers: {
      token,
    },
  });
  return res.data;
}
let SumTotalAmount = 0;
export default function ShowOrders({ token }: { token: string }) {
  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => FetchOrders(token),
  });

  const [filter, setFilter] = useState<FilterType>("All");
  const [dateArrange, setDateArrange] = useState<"normal" | "latest">("normal");
  const FilterdData: OrdersType[] | undefined = useMemo(() => {
    if (data) {
      let D = data.sort((a, b) => a.id - b.id);
      SumTotalAmount = D.map((ord) => ord.totalAmount).reduce(
        (f, s) => f + s,
        0
      );
      if (dateArrange !== "normal") {
        D = D.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      if (filter !== "All") {
        D = D.filter((d) => d.status == filter);
      }
      return D;
    }
  }, [data, dateArrange, filter]);

  if (error && isError) {
    throw new Error(error.message);
  }

  return (
    <>
      {isPending ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <Skeleton className="w-full h-40 border bg-low_white" />
            <Skeleton className="w-full h-40 border bg-low_white" />
            <Skeleton className="w-full h-40 border bg-low_white" />
          </div>

          <Skeleton className="w-full h-96 border bg-low_white" />
        </div>
      ) : (
        isSuccess &&
        FilterdData && (
          <>
            <div className="flex gap-3 items-center flex-wrap">
              <div className="bg-low_white border relative border-soft_border flex flex-col gap-2 flex-grow basis-64 h-28 p-3 rounded-lg">
                <FiPackage className="w-7 h-7 text-zinc-500 absolute top-1 right-1" />

                <p className="font-medium w-full flex items-center justify-between">
                  Total order
                </p>

                <p className="text-2xl font-bold mt-2 pl-1">
                  {FilterdData.length} <span className="text-sm">order</span>
                </p>
              </div>

              <div className="bg-low_white relative border border-soft_border flex flex-col gap-2 flex-grow basis-64 h-28 p-3 rounded-lg">
                <TbBasketDollar className="w-7 h-7 text-zinc-500 absolute top-1 right-1" />

                <p className="font-medium text-base">
                  <span className="text-sm">AVG.</span>Order value
                </p>
                <p className="text-2xl font-bold mt-2 pl-1">
                  $
                  {FilterdData.length > 0
                    ? (SumTotalAmount / FilterdData.length).toFixed(2)
                    : 0}
                </p>
              </div>

              <div className="bg-low_white border relative border-soft_border flex flex-col gap-2 flex-grow basis-64 h-28 p-3 rounded-lg">
                <FaChartLine className="w-7 h-7 text-zinc-500 absolute top-1 right-1" />

                <p className="font-medium text-base">Orders Revenue</p>
                <p className="text-2xl font-bold mt-2 pl-1">
                  ${SumTotalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 my-4">
              <p className="text-xl font-medium underline">Orders Table</p>
              <OrdersFilter filter={filter} setFilter={setFilter} />
            </div>
            <OrdersTable
              dateArrange={dateArrange}
              setDateArrange={setDateArrange}
              orders={FilterdData}
            />
          </>
        )
      )}
    </>
  );
}
