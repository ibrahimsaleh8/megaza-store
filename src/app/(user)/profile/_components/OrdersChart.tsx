"use client";

import { Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// const chartData = [
//   { month: "January", orders: 186 },
//   { month: "February", orders: 305 },
//   { month: "March", orders: 237 },
//   { month: "April", orders: 73 },
//   { month: "May", orders: 209 },
//   { month: "June", orders: 214 },
//   { month: "July", orders: 214 },
//   { month: "August", orders: 214 },
//   { month: "September", orders: 214 },
//   { month: "October", orders: 214 },
//   { month: "November", orders: 214 },
//   { month: "December", orders: 214 },
// ];

const chartConfig = {
  orders: {
    label: "orders",
    color: "#17191c",
    icon: Activity,
  },
} satisfies ChartConfig;

export function OrdersChart({
  chartData,
}: {
  chartData: {
    month: string;
    orders: number;
  }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Chart</CardTitle>
        <CardDescription>Showing total orders for current year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-96 pt-6" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="orders"
              type="bump"
              fill="var(--color-orders)"
              fillOpacity={0.4}
              stroke="var(--color-orders)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
