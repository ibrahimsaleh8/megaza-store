import React from "react";
import OrderStatusBadge from "../admin/orders/_component/OrderStatusBadge";
import { PiPackage } from "react-icons/pi";
import {
  FaMapMarkedAlt,
  FaRegCreditCard,
  FaRegUserCircle,
} from "react-icons/fa";
import { UserOrderType } from "./ShowUserOrders";
import { GrDeliver } from "react-icons/gr";

export default function UserOrderCard({
  orderInfo,
}: {
  orderInfo: UserOrderType;
}) {
  const date = new Date(orderInfo.created_at);
  const cretedAt = `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCFullYear()}  ${date.getUTCHours()}:${date.getUTCMinutes()}`;
  return (
    <div className="w-full flex flex-col gap-2 bg-[#f6f6f6e4] border border-black p-3 rounded-lg">
      {/* Header */}
      <div className="font-bold flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-bold underline bg-black text-white px-3 py-1 rounded-sm">
            {" "}
            #ID{orderInfo.id}
          </p>
          {orderInfo.isPaid ? (
            <span className="block px-2 py-1 bg-green-500 text-white font-normal text-[0.7rem] rounded-md">
              Paid
            </span>
          ) : (
            <span className="block px-2 py-1 bg-red-500 text-white font-normal text-[0.7rem] rounded-md">
              Not Paid
            </span>
          )}

          <OrderStatusBadge status={orderInfo.status} />

          {orderInfo.orderKind == "PAY_ON_DELEIVER" ? (
            <p className="flex items-center gap-2 bg-sky-600 text-white text-sm px-3 py-1.5 rounded-sm">
              Pay on Deleiver
              <GrDeliver />
            </p>
          ) : (
            <p className="flex items-center gap-2 bg-green-600 text-white text-sm px-3 py-1.5 rounded-sm">
              Credit card Payment
              <FaRegCreditCard />
            </p>
          )}
        </div>
        <PiPackage className="w-5  h-5" />
      </div>
      {/* User Information */}
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        {/* Shipping Address */}
        <div className="flex flex-col rounded-lg gap-1 border border-soft_border p-2 w-full md:w-1/2">
          <p className="font-bold underline mb-2 flex items-start justify-between gap-2">
            Shipping Address:
            <FaMapMarkedAlt className="w-5 h-5" />
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Country:
            <span className="font-normal">{orderInfo.country}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            City:
            <span className="font-normal">{orderInfo.city}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            State:
            <span className="font-normal">{orderInfo.state}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Mobile:
            <span className="font-normal">{orderInfo.mobile}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Posatl Code:
            <span className="font-normal">{orderInfo.postalCode}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Sreet:
            <span className="font-normal">{orderInfo.street}</span>
          </p>
        </div>

        {/* User Details */}
        <div className="flex flex-col gap-1 rounded-lg border border-soft_border p-2 w-full md:w-1/2">
          <p className="font-bold underline mb-2 flex items-start justify-between gap-2">
            User Information:
            <FaRegUserCircle className="w-5 h-5" />
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Name: <span className="font-normal">{orderInfo.name}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Email
            <span className="font-normal">{orderInfo.email}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Date order
            <span className="font-normal">{cretedAt}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Sub total:
            <span className="font-normal">${orderInfo.totalAmount}</span>
          </p>
          <p className="flex text-center gap-2 justify-between font-medium">
            Total Product:
            <span className="font-normal">{orderInfo.items.length}</span>
          </p>
        </div>
      </div>

      {/* Items */}
      <p className="font-bold underline text-lg">
        Itmes ({orderInfo.items.length})
      </p>
      <div className="flex gap-3 flex-wrap">
        {orderInfo.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 sm:w-56 w-full p-2 border border-soft_border rounded-md">
            {/* Image */}
            <div className="pt-2 bg-box_bg rounded-md flex items-center justify-center">
              <img
                className="w-20 h-28 object-cover object-center mt-auto"
                src={item.product.card_image}
                alt={item.product.title}
              />
            </div>

            {/* product info */}
            <div className="flex flex-col gap-1">
              <p className="line-clamp-2 font-bold">{item.product.title}</p>
              <p className="text-secondary_white font-medium">
                {item.product.brandName}
              </p>
            </div>
            {/* order info */}
            <div className="border-t flex flex-col gap-1 py-2">
              <p className="flex items-center justify-between gap-2">
                color:
                <span
                  style={{
                    backgroundColor: item.color,
                  }}
                  className="block w-5 h-5 border rounded-sm"></span>
              </p>

              <p className="flex items-center justify-between gap-2">
                Size:
                <span>{item.size}</span>
              </p>

              <p className="flex items-center justify-between gap-2">
                Quantity:
                <span>{item.quantity} items</span>
              </p>

              <p className="flex items-center justify-between gap-2">
                Subtotal:
                <span>{item.subtotal}$</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
