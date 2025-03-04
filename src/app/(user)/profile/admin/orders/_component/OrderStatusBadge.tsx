import { FilterType } from "./ShowOrders";

export default function OrderStatusBadge({ status }: { status: FilterType }) {
  return (
    <>
      {status == "CANCELED" && (
        <p className="text-[0.7rem] font-medium p-1 bg-red-500 text-white w-fit rounded-sm">
          Canceled
        </p>
      )}
      {status == "PENDING" && (
        <p className="text-[0.7rem] relative font-medium p-1 bg-yellow-400 text-black w-fit rounded-sm">
          Pending
          <span className="border border-orange-700 block w-2 h-2 rounded-full animate-ping absolute right-0 top-0 bg-orange-700"></span>
        </p>
      )}
      {status == "COMPLETED" && (
        <p className="text-[0.7rem] font-medium p-1 bg-green-500 text-white w-fit rounded-sm">
          Completed
        </p>
      )}
      {status == "SHIPPED" && (
        <p className="text-[0.7rem] font-medium p-1 bg-sky-500 text-white w-fit rounded-sm">
          Shipped
        </p>
      )}
    </>
  );
}
