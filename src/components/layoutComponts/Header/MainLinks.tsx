"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AllCategories from "./AllCategories";
type LinksType = {
  href: string;
  text: string;
  cat: string;
  icon: ReactNode;
};
type Props = {
  links: LinksType[];
  email: string | null;
  cats: {
    id: number;
    name: string;
  }[];
};
export default function MainLinks({ email, links, cats }: Props) {
  const params = usePathname();
  return (
    <nav className="links lg:block hidden">
      <ul className="flex gap-5 items-center">
        {links
          .filter((el) => {
            if (email) {
              return el.cat !== "Auth";
            } else {
              return el;
            }
          })
          .map((el, i) => (
            <li key={i}>
              <Link
                className={`${
                  `/${params.split("/")[1]}` == el.href
                    ? "text-black "
                    : "text-[#6f6f6f]"
                }  text-sm`}
                href={el.href}>
                {el.text}
              </Link>
            </li>
          ))}
        <li className="flex">
          <AllCategories cats={cats} />
        </li>
      </ul>
    </nav>
  );
}
