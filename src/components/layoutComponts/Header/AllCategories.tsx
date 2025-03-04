import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { TbCategoryFilled } from "react-icons/tb";
type Props = {
  cats: {
    id: number;
    name: string;
  }[];
};
export default function AllCategories({ cats }: Props) {
  return (
    <>
      {/* Cats For Large Screens */}
      <div className="lg:block hidden">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-black py-0 h-0 px-0 text-[#747474]">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex p-3 flex-col gap-3 bg-white shadow-md text-black border-soft_border">
                {cats.map((el) => (
                  <Link
                    href={`/products?category=${el.name.toLowerCase()}`}
                    className="w-36 flex items-center gap-1 hover:bg-low_white capitalize text-sm p-2 py-1 rounded-md"
                    key={el.id}>
                    <TbCategoryFilled className="text-sm" />

                    {el.name}
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
