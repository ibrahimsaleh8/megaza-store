"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CurrentRoute({ title }: { title?: string }) {
  const route = usePathname();
  const urls = route.split("/").filter((el) => el !== "" && el.length < 10);
  return (
    <div className="flex items-center gap-1 text-secondry_white">
      <Link href={"/"}>Home</Link>
      <p> /</p>
      {urls.map((el, i) => (
        <div className="flex items-center gap-1" key={i}>
          <Link href={`/${el}`}>{el}</Link>
          {i !== urls.length - 1 && <p> /</p>}
        </div>
      ))}
      {title && (
        <p className="text-black font-medium sm:text-base text-sm line-clamp-1">{`/${title}`}</p>
      )}
    </div>
  );
}
