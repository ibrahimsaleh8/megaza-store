import GridShowComponent from "@/components/layoutComponts/GridShowComponent";
import DashDataCard from "../_components/DashDataCard";
import { OverviewAdminNumbers } from "./_actions/OverviewAdminNumbers";
import { RiFileList3Line } from "react-icons/ri";
import { FaList, FaUsers } from "react-icons/fa6";
import { BsHandbag } from "react-icons/bs";
import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
import { redirect } from "next/navigation";
import DisplayChart from "../_components/DisplayChart";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function AdminDashboard() {
  const user = VerifyUserFromToken();
  if (user && !user.isAdmin) {
    redirect("/profile/user");
  }
  if (!user) {
    redirect("/");
  }
  const token = cookies().get("token")?.value as string;
  const { total_orders, total_products, total_users, total_categories } =
    await OverviewAdminNumbers();
  return (
    <div className="flex flex-col gap-3 ">
      <h1 className="text-lg text-black">Overveiw</h1>
      {/* Cards */}
      <GridShowComponent minWidth={270} classes="gap-3 gap-y-3 mt-2">
        <DashDataCard
          icon={<BsHandbag className="w-4 h-4" />}
          info={total_products}
          title="Total Products"
        />
        <DashDataCard
          icon={<RiFileList3Line className="w-4 h-4" />}
          info={total_orders}
          title="Total Orders"
        />
        <DashDataCard
          icon={<FaUsers className="w-4 h-4" />}
          info={total_users}
          title="Total Customers"
        />
        <DashDataCard
          icon={<FaList className="w-4 h-4" />}
          info={total_categories}
          title="Total Categories"
        />
      </GridShowComponent>

      {/* Chart */}
      <DisplayChart isAdmin={user.isAdmin} token={token} uid={user.id} />
    </div>
  );
}
