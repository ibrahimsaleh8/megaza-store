import { FaUsersCog } from "react-icons/fa";
import { cookies } from "next/headers";
import UsersTable from "../../_components/UsersTable";
import { Metadata } from "next";
import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
export const metadata: Metadata = {
  title: "Customers",
};
export default async function ManageUsersPage() {
  const token = cookies().get("token")?.value as string;
  const user = VerifyUserFromToken();
  return (
    <div className="flex flex-col gap-3 ">
      <p className="flex items-center gap-2">
        <FaUsersCog className="w-6 h-6" />
        Manage Users
      </p>
      <UsersTable adminId={user?.id ?? 0} token={token} />
    </div>
  );
}
