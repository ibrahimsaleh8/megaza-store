import { Button } from "@/components/ui/button";
import { DiscountCodesType } from "./ShowDiscountCodes";
import { useCallback, useState } from "react";
import { FaCheck } from "react-icons/fa";
import DeleteCode from "./DeleteCode";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/utils/Types";
import { toast } from "react-toastify";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
type Props = { CodeData: DiscountCodesType; token: string };
async function UpdateActiveationOfCode({
  id,
  isActive,
  token,
}: {
  id: number;
  isActive: boolean;
  token: string;
}) {
  await axios.put(
    `${MainDomain}/api/discount-codes/${id}`,
    {
      isActive,
    },
    {
      headers: { token },
    }
  );
}

export default function DiscountCodeCard({ CodeData, token }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: number; isActive: boolean; token: string }) =>
      UpdateActiveationOfCode(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["discount_codes"] });
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  const [copied, setCopied] = useState(false);
  const date = new Date(CodeData.created_at);
  const created_atDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(CodeData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, [CodeData.code]);

  const changeActivationOffCode = useCallback(() => {
    mutate({
      id: CodeData.id,
      isActive: !CodeData.isActive,
      token,
    });
  }, [CodeData.id, CodeData.isActive, mutate, token]);

  return (
    <div className="flex flex-col gap-1 border p-4 relative w-full">
      <p
        className="flex it
      ems-center justify-between border-b pb-1 ">
        Code: <span>{CodeData.code}</span>
      </p>
      <p className="flex items-center justify-between border-b pb-1">
        Percent: <span>{CodeData.percent}%</span>
      </p>
      <p className="flex items-center justify-between border-b pb-1">
        Used:{" "}
        <span className="text-sm">
          {CodeData.used} / {CodeData.maxUsing} Times
        </span>
      </p>
      <p className="flex items-center justify-between border-b pb-1">
        Created At: <span>{created_atDate}</span>
      </p>
      <p className="flex items-center justify-between border-b pb-1">
        Active:{" "}
        <span>
          {CodeData.isActive ? (
            <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg">
              Acive
            </span>
          ) : (
            <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg">
              Paused
            </span>
          )}
        </span>
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
        <DeleteCode id={CodeData.id} token={token} />
        <Button disabled={isPending} onClick={changeActivationOffCode}>
          {isPending ? (
            <SmallLoader color="white" />
          ) : CodeData.isActive ? (
            "Stop code"
          ) : (
            "Run code"
          )}
        </Button>
        <Button
          onClick={handleCopy}
          className="bg-green-500 text-white w-fit hover:bg-green-600">
          {copied ? <FaCheck className="text-white" /> : "Copy"}
        </Button>
      </div>
    </div>
  );
}
