"use client";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainDomain } from "@/utils/mainDomain";
import { ErrorResponseType } from "@/utils/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
type addNewCodeType = {
  code: string;
  percent: number;
  maxUsing: number;
};
async function PostNewCode(data: addNewCodeType, token: string) {
  await axios.post(`${MainDomain}/api/discount-codes`, data, {
    headers: {
      token,
    },
  });
}
export default function AddNewDiscountCode({ token }: { token: string }) {
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState(0);
  const [maxUsing, setMaxUsing] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const { mutate: addNewCode, isPending } = useMutation({
    mutationFn: (data: addNewCodeType) => PostNewCode(data, token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["discount_codes"] });
      toast.success("Code Added Success");
      closeRef.current?.click();
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error.response.data.message);
    },
  });

  const HandelAddNewCode = () => {
    if (code.trim().length < 5) {
      toast.warn("Code should be more than 5 characters");
      return;
    }
    if (percent == 0) {
      toast.warn("Percent should be more than 0");
      return;
    }
    if (maxUsing == 0) {
      toast.warn("Max using should be more than 0");
      return;
    }
    addNewCode({
      code,
      percent,
      maxUsing,
    });
  };

  return (
    <AlertDialog
      onOpenChange={() => {
        setPercent(0);
        setCode("");
      }}>
      <AlertDialogTrigger className="border w-fit py-1.5 px-4 rounded-md text-sm hover:bg-black duration-300 hover:text-white ">
        Add New Code
      </AlertDialogTrigger>
      <AlertDialogContent className="text-black bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Add new Discount code</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          {/* Code */}
          <div>
            <label className="text-sm" htmlFor="code">
              Code
            </label>
            <Input
              required
              onChange={(e) => setCode(e.target.value)}
              type="text"
              id="code"
              placeholder="Code"
            />
          </div>

          {/* Percent */}
          <div>
            <label className="text-sm" htmlFor="percent">
              Percent
            </label>
            <Input
              onChange={(e) => setPercent(+e.target.value)}
              required
              min={0}
              type="number"
              id="percent"
              placeholder="Percent"
            />
          </div>
          {/* Max using */}
          <div>
            <label className="text-sm" htmlFor="availabel">
              Max Number of using this code
            </label>
            <Input
              onChange={(e) => setMaxUsing(+e.target.value)}
              required
              min={0}
              type="number"
              id="availabel"
              placeholder="Max number of using this code"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 hover:bg-red-600 text-white hover:text-white">
            Cancel
          </AlertDialogCancel>
          <Button disabled={isPending} onClick={HandelAddNewCode}>
            {isPending ? <SmallLoader color="white" /> : "Add"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
