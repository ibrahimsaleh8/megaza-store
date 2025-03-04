"use client";
import { MainDomain } from "@/utils/mainDomain";
import { useQuery } from "@tanstack/react-query";
import UserOrderCard from "./UserOrderCard";
import { FaBoxes } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import UserOrdersFilter from "./UserOrdersFilter";
import { useMemo, useState } from "react";
import { OrderStatusType } from "../admin/orders/_component/OrderDetails";

export type UserOrderType = {
  id: number;
  name: string;
  city: string;
  country: string;
  created_at: string;
  email: string;
  isPaid: boolean;
  items: {
    id: number;
    color: string;
    quantity: number;
    size: string;
    subtotal: number;
    product: {
      id: string;
      card_image: string;
      title: string;
      brandName: string;
    };
  }[];
  mobile: string;
  orderKind: "PAY_ON_DELEIVER" | "PAY_CREDIT_CARD";
  postalCode: string;
  state: string;
  status: OrderStatusType;
  street: string;
  totalAmount: number;
};

async function FetchUserOrders(
  token: string,
  id: number
): Promise<UserOrderType[]> {
  const res = await axios.get(`${MainDomain}/api/orders/user?uid=${id}`, {
    headers: {
      token,
    },
  });
  return res.data;
}

export default function ShowUserOrders({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  const {
    data: order,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["user_orders"],
    queryFn: () => FetchUserOrders(token, id),
  });
  if (isError && error) {
    throw new Error(error.message);
  }
  const [orderFilter, setOrderFilter] = useState<OrderStatusType | "normal">(
    "normal"
  );

  const FilterdOrders = useMemo(() => {
    if (order) {
      let data = order;
      if (orderFilter != "normal") {
        data = data.filter((d) => d.status == orderFilter);
      }
      return data;
    }
    return [];
  }, [order, orderFilter]);

  return order && !isPending ? (
    <>
      <p className="text-xl font-bold mb-2 flex items-center gap-1">
        <FaBoxes />
        Orders
      </p>
      {order.length == 0 ? (
        <p className="text-center text-[#777]">
          You {"didn't"} make any orders yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <UserOrdersFilter setOrderFilter={setOrderFilter} />
          <div className="flex flex-col gap-4">
            {FilterdOrders.length > 0 ? (
              FilterdOrders.map((ord) => (
                <UserOrderCard key={ord.id} orderInfo={ord} />
              ))
            ) : (
              <div className="flex items-center justify-center text-lg">
                No orders Found
              </div>
            )}
          </div>
        </div>
      )}
    </>
  ) : (
    isPending && (
      <>
        <Skeleton className="w-full h-[85vh]" />
      </>
    )
  );
}
