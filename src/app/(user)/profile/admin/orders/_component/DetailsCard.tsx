import { ReactNode } from "react";
import { InfoDataType } from "./OrderDetails";

export default function DetailsCard({
  icon,
  information,
  title,
  border,
}: {
  information: InfoDataType[];
  title: string;
  icon: ReactNode;
  border?: boolean;
}) {
  return (
    <div className="flex min-w-64 flex-col gap-2 bg-[#fcfcfc] text-sm border p-2 rounded-md">
      <p className="font-bold text-lg flex items-center justify-between">
        {title}
        {icon}
      </p>
      {information.map((info, i) => (
        <p
          key={i}
          className={`font-medium flex justify-between gap-1 items-center ${
            border ? "border-b pb-0.5" : ""
          }`}>
          {info.label}:<span className="font-normal">{info.value}</span>
        </p>
      ))}
    </div>
  );
}
