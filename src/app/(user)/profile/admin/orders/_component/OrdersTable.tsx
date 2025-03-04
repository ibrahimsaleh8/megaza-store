import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrdersType } from "./ShowOrders";
import Link from "next/link";
import { ImSpinner3 } from "react-icons/im";
import { FaArrowRight, FaCheck, FaRegCreditCard } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import OrderStatusBadge from "./OrderStatusBadge";
import { GrDeliver } from "react-icons/gr";
import { Dispatch, SetStateAction } from "react";
import { MoveDown, MoveUp } from "lucide-react";

export default function OrdersTable({
  orders,
  setDateArrange,
  dateArrange,
}: {
  orders: OrdersType[];
  setDateArrange: Dispatch<SetStateAction<"normal" | "latest">>;
  dateArrange: "normal" | "latest";
}) {
  return (
    <>
      {orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Product</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setDateArrange((prev) =>
                    prev == "normal" ? "latest" : "normal"
                  );
                }}>
                {dateArrange == "normal" ? (
                  <p className="flex items-center gap-1">
                    Date
                    <MoveDown className="w-3 h-3" />
                  </p>
                ) : (
                  <p className="flex items-center gap-1">
                    Date
                    <MoveUp className="w-3 h-3" />
                  </p>
                )}
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Toal Amount</TableHead>
              <TableHead>Kind</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b overflow-auto">
            {orders.map((order) => {
              const date = new Date(order.created_at);
              const createdDate = `${date.getUTCDate()}-${
                date.getUTCMonth() + 1
              }-${date.getUTCFullYear()}`;
              const createdTime = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
              return (
                <TableRow key={order.id}>
                  <TableCell className="text-sm">#ID{order.id}</TableCell>

                  <TableCell>
                    <p className="flex items-center gap-1">
                      {order.items.length}{" "}
                      <span className="text-sm">products</span>
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1 w-36">
                      <p className="flex items-center gap-1">
                        <LuCalendarDays />
                        {createdDate}
                      </p>
                      <p>{createdTime}</p>
                    </div>
                  </TableCell>

                  <TableCell className="line-clamp-1">{order.name}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    {order.orderKind == "PAY_ON_DELEIVER" ? (
                      <p className="flex items-center gap-2 w-36 text-[0.8rem] bg-sky-600 text-white px-3 py-1.5 rounded-sm">
                        Pay on Deleiver
                        <GrDeliver />
                      </p>
                    ) : (
                      <p className="flex items-center w-44 text-[0.8rem] gap-2 bg-green-600 text-white px-3 py-1.5 rounded-sm">
                        Credit card Payment
                        <FaRegCreditCard />
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    {order.isPaid ? (
                      <p className="bg-green-500 flex items-center gap-2 text-[0.7rem] w-[4rem] p-1 rounded-sm  text-center text-white font-medium">
                        <FaCheck />
                        PAID
                      </p>
                    ) : (
                      <p className="bg-yellow-400 flex items-center gap-1 text-[0.7rem] w-[4.8rem] p-1 text-center rounded-sm text-black font-medium">
                        <ImSpinner3 />
                        NOT PAID
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>

                  <TableCell>
                    <Link
                      className="border border-soft_border flex items-center gap-3 w-[7.2rem] text-black px-4 py-1 rounded-sm"
                      href={`/profile/admin/orders/${order.id}`}>
                      Check it
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center text-lg font-medium bg-low_white py-10">
          No orders found!
        </div>
      )}
    </>
  );
}
