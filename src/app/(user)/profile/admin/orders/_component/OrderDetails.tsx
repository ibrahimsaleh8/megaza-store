"use client";
import { MainDomain } from "@/utils/mainDomain";
import { FilterType } from "./ShowOrders";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import DetailsCard from "./DetailsCard";
import {
  FaMapMarkedAlt,
  FaRegCreditCard,
  FaRegUserCircle,
} from "react-icons/fa";
import { LuPackageOpen } from "react-icons/lu";
import ProductOrderCard from "./ProductOrderCard";
import { TbShoppingBag } from "react-icons/tb";
import OrderStatusBadge from "./OrderStatusBadge";
import BackBtn from "@/components/layoutComponts/BackBtn";
import DeliveryImage from "../../../../../../../public/images/Delivery_image.webp";
import Image from "next/image";
import ChangeOrderStatus from "./ChangeOrderStatus";
import { GrDeliver } from "react-icons/gr";
import axios from "axios";
export type OrderDetailsType = {
  id: number;
  created_at: string;
  isPaid: boolean;
  orderKind: "PAY_ON_DELEIVER" | "PAY_CREDIT_CARD";
  items: {
    id: number;
    price: number;
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
  totalAmount: number;
  status: FilterType;
  name: string;
  email: string;
  city: string;
  country: string;
  mobile: string;
  postalCode: string;
  state: string;
  street: string;
};
export type InfoDataType = {
  label: string;
  value: string;
};
export type OrderStatusType = "PENDING" | "COMPLETED" | "CANCELED" | "SHIPPED";
async function FetchOrders(
  token: string,
  id: number
): Promise<OrderDetailsType> {
  const res = await axios.get(`${MainDomain}/api/orders/${id}`, {
    headers: {
      token,
    },
  });
  return res.data;
}

let userInformation: InfoDataType[];
let addressInformation: InfoDataType[];
let orderSummary: InfoDataType[];

export default function OrderDetails({
  id,
  token,
}: {
  id: number;
  token: string;
}) {
  // Fetch Details
  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ["order_details", id],
    queryFn: () => FetchOrders(token, id),
  });
  if (error && isError) {
    throw new Error(error.message);
  }
  if (isSuccess && data) {
    const date = new Date(data.created_at);
    const createdDate = `${date.getUTCDate()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCFullYear()}`;
    const createdTime = `${date.getUTCHours()}:${date.getUTCMinutes()}`;

    userInformation = [
      { label: "Name", value: data.name },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Date order",
        value: `${createdDate} ${createdTime}`,
      },
    ];
    addressInformation = [
      {
        label: "Country",
        value: data.country,
      },
      {
        label: "City",
        value: data.city,
      },

      {
        label: "State",
        value: data.state,
      },
      {
        label: "Mobile",
        value: data.mobile,
      },
      {
        label: "Posatl Code",
        value: data.postalCode,
      },
      {
        label: "Sreet",
        value: data.street,
      },
    ];
    orderSummary = [
      {
        label: "Sub total",
        value: `$${data.totalAmount}`,
      },
      {
        label: "Total Product",
        value: `${data.items.length}`,
      },
      {
        label: "Status",
        value: `${data.status}`,
      },
      {
        label: "Payment",
        value: data.isPaid ? "Paid" : "Not Paid",
      },
      {
        label: "Order",
        value:
          data.orderKind == "PAY_CREDIT_CARD"
            ? "Credit card payment"
            : "Pay on deliver",
      },
    ];
  }
  return (
    <>
      {isSuccess && data && !isPending ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center ">
            <BackBtn />
            <p className="text-xl font-bold">Order Details</p>
          </div>

          {/* Headers */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-xl font-bold mb-2 border-b-2  border-black">
                #ID{data.id}
              </p>
              <OrderStatusBadge status={data.status} />
              {data.isPaid ? (
                <div className="p-1 px-3 text-[0.7rem] font-medium bg-green-500 text-white w-fit rounded-sm">
                  Paid
                </div>
              ) : (
                <div className="p-1 px-3 text-[0.7rem] font-medium bg-red-500 text-white w-fit rounded-sm">
                  Not Paid
                </div>
              )}

              {data.orderKind == "PAY_ON_DELEIVER" ? (
                <p className="flex items-center gap-2 w-fit bg-sky-600 text-white text-[0.8rem]  px-3 py-1 rounded-sm">
                  Pay on Deleiver
                  <GrDeliver />
                </p>
              ) : (
                <p className="flex items-center gap-2 bg-green-600 text-white text-[0.8rem] w-44 px-3 py-1 rounded-sm">
                  Credit card Payment
                  <FaRegCreditCard />
                </p>
              )}
            </div>

            <div>
              <ChangeOrderStatus
                id={id}
                token={token}
                isPaid={data.isPaid}
                Currentstatus={data.status as OrderStatusType}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-2">
            <div className="flex flex-col gap-2 flex-1">
              {/* Items */}
              <div className="bg-[#fcfcfc] border p-3 rounded-md h-fit w-full">
                <p className="font-bold mb-5 text-lg flex items-center justify-between">
                  Order Items ({data.items.length})
                  <TbShoppingBag className="w-6 h-6" />
                </p>

                <div className="flex flex-col gap-3 flex-1">
                  {data.items.map((item) => (
                    <ProductOrderCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <DetailsCard
                border={true}
                title="Order Summary"
                information={orderSummary}
                icon={<LuPackageOpen className="w-5 h-5" />}
              />
            </div>

            {/* Cloumns */}
            <div className="flex flex-col gap-2">
              {/* User information */}
              <DetailsCard
                title="User Information"
                information={userInformation}
                icon={<FaRegUserCircle className="w-5 h-5" />}
              />

              {/* Address information */}

              <DetailsCard
                title="Shipping Addres"
                information={addressInformation}
                icon={<FaMapMarkedAlt className="w-5 h-5" />}
              />
            </div>
          </div>

          <div className="flex">
            <Image
              className="w-96 ml-auto"
              src={DeliveryImage}
              alt="Delivery image"
            />
          </div>
        </div>
      ) : (
        isPending && (
          <>
            <Skeleton className="w-full rounded-sm h-96" />
          </>
        )
      )}
    </>
  );
}
