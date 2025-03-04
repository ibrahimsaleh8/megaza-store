import { Progress } from "@/components/ui/progress";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { FaStar } from "react-icons/fa6";
import ProductRate from "@/app/(Main Pages)/products/_components/ProductRate";
export default function ProductRateBar({
  usersRates,
  setProductRate,
}: {
  usersRates: number[];
  setProductRate: Dispatch<SetStateAction<number>>;
}) {
  const rats = useMemo(
    () => [
      { rate: 1, much: usersRates.filter((e) => e == 1) },
      { rate: 2, much: usersRates.filter((e) => e == 2) },
      { rate: 3, much: usersRates.filter((e) => e == 3) },
      { rate: 4, much: usersRates.filter((e) => e == 4) },
      { rate: 5, much: usersRates.filter((e) => e == 5) },
    ],
    [usersRates]
  );

  const caclcAverageRate = useMemo(
    () =>
      usersRates.length > 0
        ? (
            rats.map((r) => r.much.length * r.rate).reduce((f, s) => f + s) /
            usersRates.length
          ).toFixed(1)
        : "0.00",
    [rats, usersRates]
  );

  useEffect(() => {
    if (+caclcAverageRate != 0) {
      setProductRate(+caclcAverageRate);
    }
  }, [caclcAverageRate, setProductRate]);

  return (
    <div className="w-full flex items-start flex-col gap-5 border p-2 rounded-md">
      <div className="flex flex-col items-center justify-center text-lg font-bold w-full text-black">
        <p className="text-2xl font-bold">{caclcAverageRate}</p>
        <ProductRate showNumber={true} rate={+caclcAverageRate} />
        <p className="text-lg font-bold mt-3 text-secondry_white">
          {usersRates.length} Rating
        </p>
      </div>

      <div className="w-full flex flex-col gap-3">
        {rats.map((r, i) => (
          <div key={i} className="flex items-start gap-3">
            <p className="font-bold flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              {r.rate}
            </p>
            <Progress
              value={(r.much.length / usersRates.length) * 100}
              className="w-full h-4 rounded-full "
            />
            <p className="font-medium sm:text-sm text-[0.8rem] flex gap-1 items-center">
              {`(${r.much.length})`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
