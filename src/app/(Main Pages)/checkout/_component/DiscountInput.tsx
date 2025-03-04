import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainDomain } from "@/utils/mainDomain";
import { ErrorResponseType } from "@/utils/Types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
type Props = {
  discount: string;
  percent: number;
  setDiscount: Dispatch<SetStateAction<string>>;
  setPercent: Dispatch<SetStateAction<number>>;
};
async function CheckDiscountCode(
  discount: string
): Promise<{ percent: number }> {
  const res = await axios.post(`${MainDomain}/api/discount-codes/check-code`, {
    code: discount,
  });
  return res.data;
}
export default function DiscountInput({
  setDiscount,
  discount,
  setPercent,
  percent,
}: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: (discount: string) => CheckDiscountCode(discount),
    onSuccess: (res) => {
      setPercent(res.percent);
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });
  const HandleDiscountChecking = () => {
    if (discount.trim().length < 2) {
      toast.error("input valid code");
      return;
    }
    mutate(discount);
  };
  return (
    <div className="w-full flex items-center gap-2">
      <Input
        disabled={percent != 0}
        onChange={(e) => setDiscount(e.target.value)}
        type="text"
        placeholder="Code"
      />
      <Button
        disabled={percent != 0 || isPending}
        onClick={HandleDiscountChecking}>
        {isPending ? <SmallLoader color="white" /> : "Apply"}
      </Button>
    </div>
  );
}
