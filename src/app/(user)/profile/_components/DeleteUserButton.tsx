import React, { useRef } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/utils/Types";
async function DeleteUserFn(id: number, token: string) {
  await axios.delete(`${MainDomain}/api/user/get-all-users/${id}`, {
    headers: {
      token: token,
    },
  });
}
export default function DeleteUserButton({
  id,
  token,
}: {
  id: number;
  token: string;
}) {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLButtonElement>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: number; token: string }) =>
      DeleteUserFn(data.id, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["users"] });
      toast.success("User Deleted!");
      ref.current?.click();
    },
    onError: (err: ErrorResponseType) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="h-7 p-1 w-fit rounded-md bg-red-600">
          <RiDeleteBin5Line className="!w-5 !h-5 text-white" />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              account and remove his data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel ref={ref}>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600"
              onClick={() => mutate({ id, token })}>
              {isPending ? (
                <>
                  <SmallLoader color="white" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
