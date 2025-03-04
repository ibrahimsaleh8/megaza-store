"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterType } from "./ShowOrders";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UpdateOrderType } from "@/app/api/orders/[id]/route";
import { OrderStatusType } from "./OrderDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import { ErrorResponseType } from "@/utils/Types";

import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
const status: FilterType[] = ["CANCELED", "COMPLETED", "PENDING", "SHIPPED"];

async function UpdateOrderStatus(
  id: number,
  token: string,
  data: UpdateOrderType
) {
  await axios.put(`${MainDomain}/api/orders/${id}`, data, {
    headers: {
      token,
    },
  });
}
export default function ChangeOrderStatus({
  Currentstatus,
  isPaid,
  id,
  token,
}: {
  Currentstatus: OrderStatusType;
  isPaid: boolean;
  id: number;
  token: string;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: number; token: string; data: UpdateOrderType }) =>
      UpdateOrderStatus(data.id, data.token, data.data),
    onSuccess: () => {
      toast.success("Order Updated Success!");
      queryClient.refetchQueries({
        queryKey: ["order_details"],
      });
      queryClient.refetchQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });
  const [newStatus, setNewStatus] = useState<OrderStatusType>(Currentstatus);
  const [payment, setPayment] = useState<boolean>(isPaid);

  const ChangeOrderStatus = () => {
    const info: UpdateOrderType = {
      isPaid: payment,
      status: newStatus,
    };
    mutate({ data: info, id, token });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-white text-sm border px-4 py-1 rounded-md border-soft_border">
        Change Status
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Change Order status</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3 items-start">
          {/* Status */}
          <div className="flex items-center gap-1">
            <label htmlFor="status-change">Status:</label>
            <Select
              onValueChange={(e: OrderStatusType) => setNewStatus(e)}
              defaultValue={newStatus}>
              <SelectTrigger id="status-change" className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {status.map((s, i) => (
                  <SelectItem key={i} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment */}
          <div className="flex items-center gap-1">
            <label htmlFor="payment-change">Payment Status:</label>
            <Select
              onValueChange={(e) => setPayment(e === "Paid")}
              defaultValue={payment ? "Paid" : "Not-Paid"}>
              <SelectTrigger id="payment-change" className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"Paid"}>Paid </SelectItem>
                <SelectItem value={"Not-Paid"}>Not Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={ChangeOrderStatus}
            className="bg-success_green text-white hover:bg-green-600 hover:text-white">
            {isPending ? <SmallLoader color="white" /> : "Save"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
