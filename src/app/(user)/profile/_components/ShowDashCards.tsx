"use client";
import GridShowComponent from "@/components/layoutComponts/GridShowComponent";
import DashDataCard from "./DashDataCard";
import { FiPackage } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
type ResponseType = {
  id: number;
  status: statusType;
  totalAmount: number;
};
type statusType = "PENDING" | "COMPLETED" | "CANCELED" | "SHIPPED";
async function FetchUserData(
  uid: number,
  token: string
): Promise<ResponseType[]> {
  const res = await axios.get(`${MainDomain}/api/overview-user?uid=${uid}`, {
    headers: {
      token,
    },
  });
  return res.data;
}
export default function ShowDashCards({
  uid,
  token,
}: {
  uid: number;
  token: string;
}) {
  const { data: orders, isPending } = useQuery({
    queryKey: ["user_overview"],
    queryFn: () => FetchUserData(uid, token),
  });

  return (
    <div>
      {isPending && !orders ? (
        <GridShowComponent minWidth={270} classes="gap-3 gap-y-3 mt-2">
          {Array.from({ length: 6 }).map((_e, i) => (
            <Skeleton key={i} className="w-full h-32" />
          ))}
        </GridShowComponent>
      ) : (
        orders && (
          <GridShowComponent minWidth={270} classes="gap-3 gap-y-3 mt-2">
            <>
              <DashDataCard
                icon={<BsCurrencyDollar className="w-4 h-4" />}
                info={`$${orders.map((o) => o.totalAmount).reduce((f, s) => f + s, 0)}`}
                title="total payment"
              />
              <DashDataCard
                icon={<FiPackage className="w-4 h-4" />}
                info={orders.length}
                title="orders"
              />

              <DashDataCard
                icon={<IoIosTimer className="w-4 h-4 text-yellow-500" />}
                info={orders.filter((o) => o.status == "PENDING").length}
                title="pending orders"
              />
              <DashDataCard
                icon={<FaCircleCheck className="w-4 h-4 text-green-500" />}
                info={orders.filter((o) => o.status == "COMPLETED").length}
                title="completed orders"
              />
              <DashDataCard
                icon={<FaTruck className="w-4 h-4 text-text_blue" />}
                info={orders.filter((o) => o.status == "SHIPPED").length}
                title="orders on the way"
              />
              <DashDataCard
                icon={<MdCancel className="w-4 h-4 text-red-500" />}
                info={orders.filter((o) => o.status == "CANCELED").length}
                title="canceled orders"
              />
            </>
          </GridShowComponent>
        )
      )}
    </div>
  );
}
