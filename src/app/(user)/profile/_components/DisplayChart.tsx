"use client";
import { OrdersChart } from "./OrdersChart";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { ErrorResponseType } from "@/utils/Types";
async function FetchOrdersChartData(
  uid: number,
  token: string
): Promise<
  {
    created_at: string;
  }[]
> {
  const res = await axios.get(`${MainDomain}/api/order-chart-data?uid=${uid}`, {
    headers: {
      token,
    },
  });
  return res.data;
}
export default function DisplayChart({
  uid,
  token,
  isAdmin,
}: {
  uid: number;
  token: string;
  isAdmin: boolean;
}) {
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();

  // Fetch all orders and extract month/year

  const { data: ordersAnalysis, isPending } = useQuery({
    queryKey: ["order_chart", isAdmin],
    queryFn: () => FetchOrdersChartData(uid, token),
    throwOnError: (err: ErrorResponseType) => {
      throw new Error(err.response.data.message);
    },
  });

  if (ordersAnalysis) {
    // Process data to group by month for the current year
    const monthlyOrders = ordersAnalysis.reduce(
      (acc, order) => {
        const date = new Date(order.created_at);
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        if (year === currentYear) {
          acc[monthIndex] = (acc[monthIndex] || 0) + 1;
        }
        return acc;
      },
      {} as Record<number, number>
    );

    // Convert to chart format and ensure all months are included
    const fullData = monthsArr.map((month, index) => ({
      month,
      orders: monthlyOrders[index] || 0,
    }));
    return <OrdersChart chartData={fullData} />;
  }

  if (!ordersAnalysis && isPending) {
    return (
      <div className="w-full h-20 flex items-center justify-center gap-3 py-3">
        Loading.. <SmallLoader color="black" />
      </div>
    );
  }
}
