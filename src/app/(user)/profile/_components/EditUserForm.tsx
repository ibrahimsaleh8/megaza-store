"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
type UpdateUserByAdmin = {
  username: string;
  email: string;
  isAdmin: boolean;
};
type UserDataType = {
  username: string;
  email: string;
  isAdmin: boolean;
  city: string;
  country: string;
  mobile: string;
  postalCode: string;
  state: string;
  street: string;
};
type Props = {
  id: string;
  token: string;
};

async function UpdateUserInformation(
  id: string,
  token: string,
  mainInfo: UpdateUserByAdmin
) {
  await axios
    .post(`${MainDomain}/api/user/get-all-users/${id}`, mainInfo, {
      headers: {
        token: token,
      },
    })

    .catch((err) => toast.error(err.response.data.message));
}

async function FetchUserInfo(id: string, token: string): Promise<UserDataType> {
  const res = await axios.get(`${MainDomain}/api/user/get-all-users/${id}`, {
    headers: {
      token: token,
    },
  });
  return res.data;
}

export default function EditUserForm({ id, token }: Props) {
  const queryClient = useQueryClient();
  // Get User Information
  const { data: userData } = useQuery({
    queryKey: ["users", id],
    queryFn: () => FetchUserInfo(id, token),
  });

  const { userDetails } = useUserDetailsStore();
  const [mainInfoEnableing, setMainInfoEnableing] = useState(false);
  const [mainInfo, setMainInfo] = useState<UpdateUserByAdmin>({
    username: userData ? userData.username : "",
    email: userData ? userData.email : "",
    isAdmin: userData ? userData.isAdmin : false,
  });

  useEffect(() => {
    if (userData) {
      setMainInfo({
        email: userData.email,
        isAdmin: userData.isAdmin,
        username: userData.username,
      });
    }
  }, [userData]);

  // Update User Information
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: {
      id: string;
      token: string;
      mainInfo: UpdateUserByAdmin;
    }) => UpdateUserInformation(data.id, data.token, data.mainInfo),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["users"] });
      toast.success("Updated Success");
      setMainInfoEnableing(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-3 p-2">
      {/* Main Info */}
      <div className=" flex flex-col gap-3 ">
        <p className="font-medium">Main Info </p>
        <div>
          <label className="text-sm" htmlFor="username">
            Username:
          </label>
          <Input
            onChange={(e) =>
              setMainInfo({ ...mainInfo, username: e.target.value })
            }
            id="username"
            defaultValue={userData?.username}
            disabled={!mainInfoEnableing}
            type="text"
            placeholder="user name"
          />
        </div>
        <div>
          <label className="text-sm" htmlFor="email">
            Email:
          </label>
          <Input
            onChange={(e) =>
              setMainInfo({ ...mainInfo, email: e.target.value })
            }
            id="email"
            defaultValue={userData?.email}
            disabled={!mainInfoEnableing}
            type="email"
            placeholder="email"
          />
        </div>
        {userDetails?.email !== userData?.email && (
          <div>
            <label className="text-sm" htmlFor="role-change">
              Role:
            </label>
            <Select
              onValueChange={(e) => {
                if (e == "admin") {
                  setMainInfo({ ...mainInfo, isAdmin: true });
                } else {
                  setMainInfo({ ...mainInfo, isAdmin: false });
                }
              }}
              defaultValue={userData?.isAdmin ? "admin" : "user"}
              disabled={!mainInfoEnableing}>
              <SelectTrigger id="role-change" className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex justify-end gap-2">
          {mainInfoEnableing ? (
            <>
              <Button
                disabled={isPending}
                onClick={() => mutate({ id, mainInfo, token })}
                className="bg-success_green hover:bg-green-700">
                {isPending ? (
                  <>
                    loading <SmallLoader color="white" />
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                variant="destructive"
                onClick={() => setMainInfoEnableing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setMainInfoEnableing(true)}>
                Enable Editing
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Addition Info */}

      <p className="font-medium">Additional info</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
        <div>
          <label htmlFor="city">city:</label>
          <Input
            id="city"
            defaultValue={userData?.city}
            disabled={true}
            type="text"
            placeholder="city"
          />
        </div>
        <div>
          <label htmlFor="country">country:</label>
          <Input
            id="country"
            defaultValue={userData?.country}
            disabled={true}
            type="text"
            placeholder="country"
          />
        </div>

        <div>
          <label htmlFor="mobile">mobile:</label>
          <Input
            id="mobile"
            defaultValue={userData?.mobile}
            disabled={true}
            type="text"
            placeholder="mobile"
          />
        </div>

        <div>
          <label htmlFor="postalCode">postal Code:</label>
          <Input
            id="postalCode"
            defaultValue={userData?.postalCode}
            disabled={true}
            type="text"
            placeholder="postalCode"
          />
        </div>

        <div>
          <label htmlFor="state">state:</label>
          <Input
            id="state"
            defaultValue={userData?.state}
            disabled={true}
            type="text"
            placeholder="state"
          />
        </div>

        <div>
          <label htmlFor="street">street:</label>
          <Input
            id="street"
            defaultValue={userData?.street}
            disabled={true}
            type="text"
            placeholder="street"
          />
        </div>
      </div>
    </div>
  );
}
