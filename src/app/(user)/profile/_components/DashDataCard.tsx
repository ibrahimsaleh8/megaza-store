import { ReactNode } from "react";

type Props = {
  title: string;
  info: number | string;
  icon: ReactNode;
};
export default function DashDataCard({ info, title, icon }: Props) {
  return (
    <div className="p-4 max-w-full bg-second_black flex flex-col gap-2 text-white rounded-md">
      <p className="text-sm capitalize text-secondWhite flex items-center gap-1">
        {icon}
        {title}
      </p>
      <p className="text-xl font-bold text-white">{info}</p>
    </div>
  );
}
