import { Button } from "@/components/ui/button";
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

import { MainDomain } from "@/utils/mainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import { ErrorResponseType } from "@/utils/Types";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
async function DeleteCodeAPI(id: number, token: string) {
  await axios.delete(`${MainDomain}/api/discount-codes/${id}`, {
    headers: {
      token,
    },
  });
}
export default function DeleteCode({
  id,
  token,
}: {
  token: string;
  id: number;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: number; token: string }) =>
      DeleteCodeAPI(data.id, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["discount_codes"] });
      toast.success("Code Deleted Success");
      closeRef.current?.click();
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 py-1.5 px-4 rounded-md text-white w-fit hover:bg-red-600">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent className="text-black bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this code?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this code
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={() => mutate({ id, token })}
            className="bg-red-500 text-white w-fit hover:bg-red-600 ml-auto">
            {isPending ? <SmallLoader color="white" /> : "Delete"}
          </Button>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
