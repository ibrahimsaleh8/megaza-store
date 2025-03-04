import { cookies } from "next/headers";
import { FaUserCog } from "react-icons/fa";
import EditUserForm from "../../../_components/EditUserForm";
import BackBtn from "@/components/layoutComponts/BackBtn";

type Props = {
  params: { id: string };
};

export default function EditUser({ params }: Props) {
  const token = cookies().get("token")?.value as string;

  return (
    <>
      <div className="flex gap-5 items-center justify-between">
        <BackBtn />
        <p className="flex items-center gap-2 underline">
          <FaUserCog className="w-5 h-5" />
          User Edit
        </p>
      </div>
      {/* Forms */}
      <EditUserForm token={token} id={params.id} />
    </>
  );
}
