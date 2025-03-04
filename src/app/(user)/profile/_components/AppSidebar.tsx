"use client";
import {
  Home,
  Package,
  Settings,
  Headset,
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Store,
  ChartBarStacked,
  BadgePercent,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const userLinks = [
  {
    title: "Overview",
    url: "/profile/user",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/profile/user/orders",
    icon: Package,
  },
  {
    title: "Setting",
    url: "/profile/user/setting",
    icon: Settings,
  },
];

const outsideLinks = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingBasket,
  },

  {
    title: "Help Center",
    url: "/contact",
    icon: Headset,
  },
];

const adminMainLinks = [
  {
    title: "Overview",
    url: "/profile/admin",
    icon: LayoutDashboard,
  },
  {
    title: "All Orders",
    url: "/profile/admin/orders",
    icon: Package,
  },
  {
    title: "Users",
    url: "/profile/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    url: "/profile/admin/edit-product",
    icon: Store,
  },
  {
    title: "Categories",
    url: "/profile/admin/categories",
    icon: ChartBarStacked,
  },
  {
    title: "Discount codes",
    url: "/profile/admin/discount-codes",
    icon: BadgePercent,
  },
];

export default function AppSidebar({ isAdmin }: { isAdmin?: boolean }) {
  const route = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-[#232427]">
      {/* Main links */}

      <SidebarContent className="bg-second_black text-white border-soft_border">
        <SidebarGroup>
          <SidebarGroupLabel className="text-secondWhite sm:py-6 py-5 rounded-none my-1 border-soft_border">
            Main Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {isAdmin == false && (
              <SidebarMenu className="mt-1 flex flex-col gap-5 ">
                {userLinks.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`h-11 rounded-sm px-4 ${
                        route == item.url ? "bg-white text-[#0e0f13]" : ""
                      }`}
                      asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
            {/* Admin Main Links */}
            {isAdmin && (
              <SidebarMenu className="mt-1 flex flex-col gap-5 ">
                {adminMainLinks.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`h-11 rounded-sm px-4 ${
                        route == item.url ? "bg-white text-[#0e0f13]" : ""
                      }`}
                      asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Out side links */}

        <SidebarGroup>
          <SidebarGroupLabel className="text-secondWhite sm:py-6 py-5 rounded-none my-1 border-soft_border">
            Out side links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-1 flex flex-col gap-3 ">
              {outsideLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={`h-11 rounded-sm px-4`} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
