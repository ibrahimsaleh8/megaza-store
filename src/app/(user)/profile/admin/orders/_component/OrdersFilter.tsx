import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FilterType } from "./ShowOrders";
import { IoMdCheckmark } from "react-icons/io";

const FilterationLabels: FilterType[] = [
  "All",
  "PENDING",
  "COMPLETED",
  "CANCELED",
  "SHIPPED",
];
type props = {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  filter: FilterType;
};
export default function OrdersFilter({ filter, setFilter }: props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-32 flex justify-between items-center gap-2 text-sm text-black bg-white border border-soft_border font-medium rounded-sm px-2  py-1.5">
        Status filter
        <IoMdArrowDropdownCircle className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-white text-black">
        {FilterationLabels.map((labl, i) => (
          <DropdownMenuItem
            onClick={() => setFilter(labl)}
            key={i}
            className="hover:bg-low_white cursor-pointer flex items-center justify-between">
            {labl}
            {filter == labl && <IoMdCheckmark />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
