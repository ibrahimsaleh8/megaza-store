"use client";
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
import { Button } from "@/components/ui/button";
import { MainDomain } from "@/utils/mainDomain";
import axios from "axios";
import { Trash2, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import SmallLoader from "../../Loader/SmallLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/utils/Types";
type Props = {
  commentId: number;
  token: string;
  UpdateComments?: () => void;
};
async function DeleteCommentFn(commentId: number, token: string) {
  await axios.delete(`${MainDomain}/api/comment/${commentId}`, {
    headers: {
      token,
    },
  });
}
export default function DeleteComment({
  commentId,
  token,
  UpdateComments,
}: Props) {
  const queryClient = useQueryClient();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      DeleteCommentFn(id, token),
    onSuccess: () => {
      toast.success("Comment Deleted");
      closeRef.current?.click();
      queryClient.refetchQueries({ queryKey: ["product_comments"] });
      if (UpdateComments) {
        UpdateComments();
      }
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  const HandleDeleteComment = () => {
    mutate({ id: commentId, token });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="bg-red-600 px-2 sm:w-8 sm:h-8 w-7 h-7 rounded-full text-white cursor-pointer flex items-center justify-center">
          <Trash2 className="w-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-black">
        <AlertDialogHeader className="!text-left">
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You Will Delete This Comment
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-soft_border absolute top-2 right-2 text-black p-1 w-5 h-5 border-soft_border hover:bg-soft_border ">
            <X />
          </AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={HandleDeleteComment}
            className="bg-red-500 overflow-hidden duration-300 hover:bg-red-500 flex justify-between items-center gap-2 group w-28 ml-auto relative">
            {isPending ? <SmallLoader color="white" /> : "Delete"}
            <span className="absolute duration-300 right-0 group-hover:right-0 top-1/2 -translate-y-1/2 w-8 group-hover:w-full flex items-center justify-center bg-accent_Bright_Red h-full">
              <Trash2 />
            </span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
