import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { Dispatch, SetStateAction } from "react";
type Props = {
  colors: {
    color: string;
    available: number;
  }[];
  setSelectedColor: Dispatch<SetStateAction<string>>;
  selectedColor: string;
};
export default function ProductColorSelection({
  colors,
  setSelectedColor,
  selectedColor,
}: Props) {
  return (
    <div className="flex flex-col  gap-2 mt-3">
      <p className="font-bold">Selecet Color</p>
      <RadioGroup onValueChange={(e) => setSelectedColor(e)}>
        <div className="flex gap-3 flex-wrap">
          {colors.map((color, i) => (
            <RadioGroupItem
              style={{
                backgroundColor: color.color,
              }}
              disabled={color.available == 0}
              className={`rounded-full hover:opacity-90 duration-300 w-9 h-9 border-2 border-black ${
                selectedColor == color.color ? "opacity-100" : "opacity-70"
              } 
          
          ${color.available == 0 ? "border-[#cfcfcf] color-not-availabel" : ""}
          `}
              key={i}
              value={color.color}
            />
          ))}
        </div>
      </RadioGroup>
      {selectedColor != "" &&
        colors.filter((c) => c.color == selectedColor)[0].available <= 3 &&
        colors.filter((c) => c.color == selectedColor)[0].available != 0 && (
          <p className="text-sm text-orange-500">
            * Last {colors.filter((c) => c.color == selectedColor)[0].available}{" "}
            pieces of this color available
          </p>
        )}
    </div>
  );
}
