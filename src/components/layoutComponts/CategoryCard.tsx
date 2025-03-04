import Link from "next/link";
import React, { ReactNode } from "react";
type Props = {
  title: string;
  imge: ReactNode;
  link: string;
};
export default function CategoryCard({ imge, title, link }: Props) {
  return (
    <Link
      href={link}
      style={{
        display: "flex",
        flexGrow: "1",
        flexShrink: "1",
        flexBasis: "min(15rem, 100%)",
      }}
      className="relative max-w-full  cursor-pointer group group overflow-hidden rounded-sm flex items-center justify-center flex-col gap-1">
      <div className="bg-low_white overflow-hidden p-1 w-64  h-96 flex items-center justify-center">
        {imge}
      </div>
      <div>
        <p className="font-medium text-center text-sm">{title}</p>
      </div>
    </Link>
  );
}
