import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { FaCheck } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { RiTimeLine } from "react-icons/ri";
import { OrderStatusType } from "../admin/orders/_component/OrderDetails";
type OrdersFilterType = OrderStatusType | "normal";
type Props = {
  setOrderFilter: Dispatch<SetStateAction<OrdersFilterType>>;
};
export default function UserOrdersFilter({ setOrderFilter }: Props) {
  return (
    <div className="flex items-center gap-2 justify-end pr-3">
      <label className="cursor-pointer" htmlFor="status-filter">
        Status filter
      </label>
      <Select onValueChange={(e: OrdersFilterType) => setOrderFilter(e)}>
        <SelectTrigger id="status-filter" className="w-[180px]">
          <SelectValue placeholder="Order Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">All</SelectItem>
          <SelectItem value="PENDING">
            <span className="flex items-center gap-2">
              Pending
              <RiTimeLine className="w-4 h-4 text-yellow-500" />
            </span>
          </SelectItem>
          <SelectItem value="COMPLETED">
            <span className="flex items-center gap-2">
              Completed
              <FaCheck className="w-4 h-4 text-green-500" />
            </span>
          </SelectItem>
          <SelectItem value="CANCELED">
            <span className="flex items-center gap-2">
              Canceled
              <IoMdClose className="w-4 h-4 text-red-500" />
            </span>
          </SelectItem>
          <SelectItem value="SHIPPED">
            <span className="flex items-center gap-2">
              Shipped
              <GrDeliver className="w-4 h-4 text-blue-500" />
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
