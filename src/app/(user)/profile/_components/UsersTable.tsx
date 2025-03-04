"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import DeleteUserButton from "./DeleteUserButton";
import { useQuery } from "@tanstack/react-query";
import { MainDomain } from "@/utils/mainDomain";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import axios from "axios";
type UserInfoType = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}[];
type usersInfoType = {
  token: string;
  adminId: number;
};

async function fetchUsers(token: string): Promise<UserInfoType> {
  const res = await axios.get(`${MainDomain}/api/user/get-all-users`, {
    headers: {
      token: token,
    },
  });
  return res.data;
}
export default function UsersTable({ token, adminId }: usersInfoType) {
  const {
    data: UsersInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (error) throw new Error(error.message);

  const [data, setData] = useState<UserInfoType | undefined>(UsersInfo);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("email");
  const { userDetails } = useUserDetailsStore();
  useEffect(() => {
    if (search.trim().length > 0 && UsersInfo) {
      if (searchBy == "email") {
        setData(
          UsersInfo.filter((e) =>
            e.email.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else if (searchBy == "username") {
        setData(
          UsersInfo.filter((e) =>
            e.username.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    } else {
      setData(UsersInfo);
    }
  }, [UsersInfo, search, searchBy]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="flex sm:items-center gap-2 flex-col sm:flex-row">
        <div className="flex items-center gap-1">
          <label className="text-sm" htmlFor="search-by">
            Search by
          </label>
          <Select defaultValue="email" onValueChange={(e) => setSearchBy(e)}>
            <SelectTrigger id="search-by" className="w-[100px] rounded-lg">
              <SelectValue placeholder="email" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">email</SelectItem>
              <SelectItem value="username">name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 border rounded-lg pr-5 sm:w-1/2">
          <Input
            className="border-none focus-visible:ring-0 shadow-none"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={
              searchBy == "email"
                ? "Search by Email"
                : searchBy == "username"
                  ? "Search by user name"
                  : "Search"
            }
          />

          <LuSearch />
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="w-full flex items-center justify-center gap-3">
          <SmallLoader color="black" /> Loading...
        </div>
      ) : (
        data && (
          <>
            <Table>
              <TableCaption>A list of users in our website.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.filter((e) => e.id != adminId).length > 0 ? (
                  data
                    .filter((e) => e.id != adminId)
                    .map((info, i) => (
                      <TableRow key={info.id}>
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell>{info.username}</TableCell>
                        <TableCell>{info.email}</TableCell>
                        <TableCell>{info.isAdmin ? "Admin" : "user"}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Link
                            href={`/profile/admin/users/${info.id}`}
                            className="block w-fit bg-second_black p-1 rounded-md">
                            <IoSettingsOutline className="text-xl text-white" />
                          </Link>
                          {userDetails?.email !== info.email && (
                            <DeleteUserButton token={token} id={info.id} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No users Found</TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {UsersInfo && UsersInfo.length} users
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )
      )}
    </div>
  );
}
