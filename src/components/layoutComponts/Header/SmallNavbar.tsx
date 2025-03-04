"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useRef } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CgLink } from "react-icons/cg";

type Props = {
  Links: {
    href: string;
    text: string;
    cat: string;
    icon: ReactNode;
  }[];
  cats: {
    id: number;
    name: string;
  }[];
};
export default function SmallNavbar({ Links, cats }: Props) {
  const params = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger aria-label="open sidebar" className="flex cursor-pointer">
          <FaBarsStaggered className="cursor-pointer w-5 h-5 lg:hidden block" />
        </SheetTrigger>
        <SheetContent
          className="rounded-tr-lg  flex flex-col pb-1 bg-white rounded-br-lg px-0 border-0 text-black"
          side={"left"}>
          <SheetHeader>
            <SheetClose ref={closeBtnRef} className="hidden" />

            <SheetTitle className="font-bold px-2 text-black">
              <p>Megaza Store</p>
            </SheetTitle>
            <SheetDescription></SheetDescription>

            <Tabs defaultValue="links" className="w-full">
              <TabsList className="w-full p-0 rounded-none bg-box_bg justify-between">
                <TabsTrigger className="w-1/2" value="links">
                  Links
                </TabsTrigger>
                <TabsTrigger className="w-1/2" value="categories">
                  Categories
                </TabsTrigger>
              </TabsList>

              <TabsContent value="links">
                <div className="links flex flex-col gap-3">
                  <ul className="flex flex-col gap-3">
                    {Links.map((el, i) => (
                      <li className="w-full " key={i}>
                        <Link
                          onClick={() => closeBtnRef.current?.click()}
                          className={`flex hover:bg-low_white duration-500 items-center gap-2 border-b border-soft_border p-2 px-4 w-full ${
                            params == el.href
                              ? "bg-black text-white hover:!bg-black hover:!text-white"
                              : ""
                          }`}
                          href={el.href}>
                          {el.icon}
                          {el.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <ul className="flex flex-col gap-5">
                  {cats.map((cat) => (
                    <li className="" key={cat.id}>
                      <Link
                        onClick={() => closeBtnRef.current?.click()}
                        className="flex hover:bg-low_white duration-500 items-center gap-2 border-b border-soft_border p-2 px-4 w-full"
                        href={`/products?category=${cat.name.toLowerCase()}`}>
                        <CgLink />
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
