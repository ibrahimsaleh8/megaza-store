import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dispatch, SetStateAction } from "react";
type Props = {
  sizes: {
    available: number;
    size: string;
  }[];
  setSelectedSize: Dispatch<SetStateAction<string>>;
  selectedSize: string;
};
export default function ProductSizeSelection({
  sizes,
  selectedSize,
  setSelectedSize,
}: Props) {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <p className="font-bold">Selecet Size</p>
      <RadioGroup onValueChange={(e) => setSelectedSize(e)}>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size, i) => (
            <div key={i}>
              <label
                className={`block cursor-pointer text-sm border-2 font-medium border-soft_border ${
                  size.available == 0
                    ? "bg-[#eee] text-black opacity-60 !cursor-not-allowed border-[#dcdcdc]"
                    : ""
                } duration-300 px-4 py-1.5 rounded-sm ${
                  selectedSize == size.size
                    ? "bg-black  text-white !border-black"
                    : "text-black"
                }`}
                htmlFor={`id-${size.size}`}>
                {size.size}
              </label>
              <RadioGroupItem
                disabled={size.available == 0}
                id={`id-${size.size}`}
                className="hidden"
                value={size.size}
              />
            </div>
          ))}
        </div>
      </RadioGroup>
      {selectedSize != "" &&
        sizes.filter((c) => c.size == selectedSize)[0].available <= 3 &&
        sizes.filter((c) => c.size == selectedSize)[0].available != 0 && (
          <p className="text-sm text-orange-500">
            * Last {sizes.filter((c) => c.size == selectedSize)[0].available}{" "}
            pieces of this size available
          </p>
        )}
    </div>
  );
}
