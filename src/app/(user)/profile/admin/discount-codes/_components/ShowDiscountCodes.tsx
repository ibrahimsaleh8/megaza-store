"use client";
import GridShowComponent from "@/components/layoutComponts/GridShowComponent";
import DiscountCodeCard from "./DiscountCodeCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { Skeleton } from "@/components/ui/skeleton";
export type DiscountCodesType = {
  id: number;
  code: string;
  percent: number;
  used: number;
  created_at: string;
  isActive: boolean;
  maxUsing: number;
};

async function GetAllDiscountCodes(
  token: string
): Promise<DiscountCodesType[]> {
  const res = await axios.get(`${MainDomain}/api/discount-codes`, {
    headers: {
      token,
    },
  });
  return res.data;
}
export default function ShowDiscountCodes({ token }: { token: string }) {
  const {
    data: Codes,
    isPending,
    error,
  } = useQuery({
    queryKey: ["discount_codes"],
    queryFn: () => GetAllDiscountCodes(token),
  });
  if (error) throw new Error(error.message);
  return Codes && !isPending ? (
    Codes.length > 0 ? (
      <GridShowComponent minWidth={300} classes="gap-3">
        {Codes.map((code) => (
          <DiscountCodeCard CodeData={code} token={token} key={code.id} />
        ))}
      </GridShowComponent>
    ) : (
      <div className="w-full p-5 flex items-center justify-center bg-low_white rounded-md">
        <p>No codes Found !</p>
      </div>
    )
  ) : (
    isPending && (
      <GridShowComponent minWidth={300} classes="gap-3">
        <Skeleton className="w-full h-52" />
        <Skeleton className="w-full h-52" />
        <Skeleton className="w-full h-52" />
        <Skeleton className="w-full h-52" />
      </GridShowComponent>
    )
  );
}
