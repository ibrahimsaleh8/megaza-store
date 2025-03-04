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
import { Pencil } from "lucide-react";
import { MdEditNote } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddCommentStars from "../rating/AddCommentStars";
import {
  EditeCommentType,
  ErrorResponseType,
  ProductCommentType,
} from "@/utils/Types";
import { useRef, useState } from "react";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import SmallLoader from "../../Loader/SmallLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type UpdatedCommentType = {
  content: string;
  rating: number;
};

async function EditComment(id: number, token: string, data: EditeCommentType) {
  await axios.put(`${MainDomain}/api/comment/${id}`, data, {
    headers: {
      token,
    },
  });
}

export default function EditeComment({
  commentData,
  token,
}: {
  token: string;
  commentData: ProductCommentType;
}) {
  const queryClient = useQueryClient();
  const ClosebtnRef = useRef<HTMLButtonElement>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      token,
      data,
    }: {
      id: number;
      token: string;
      data: EditeCommentType;
    }) => EditComment(id, token, data),
    onSuccess: () => {
      toast.success("Comment Updated");
      ClosebtnRef.current?.click();
      queryClient.refetchQueries({ queryKey: ["product_comments"] });
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });
  const [comment, setComment] = useState<UpdatedCommentType>({
    content: commentData.content,
    rating: commentData.rating,
  });
  const HandleUpdateComment = async () => {
    if (comment.content.trim().length == 0) {
      toast.error("Please Write Updated comment");
      return;
    }

    const data: EditeCommentType = {
      content: comment.content,
      rating: comment.rating,
      userId: commentData.user.id,
    };
    mutate({ id: commentData.id, token, data });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="bg-soft_border px-2 sm:w-8 sm:h-8 w-7 h-7 rounded-full cursor-pointer flex items-center justify-center">
          <Pencil className="w-5 h-5 " />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-[#201e1e]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            Edit Comment <MdEditNote className="text-2xl" />
            <div className="ml-auto p-3 bg-white border rounded-md flex items-center gap-2">
              <FaCircleUser />
              <p className="text-sm">{commentData.user.username}</p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={(e) => setComment({ ...comment, rating: +e })}
              defaultValue={`${commentData.rating}`}
              required>
              <SelectTrigger
                id="select_rate"
                className="w-[180px] border-soft_border">
                <SelectValue placeholder="Rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">
                  <AddCommentStars rate={5} />
                </SelectItem>
                <SelectItem value="4">
                  <AddCommentStars rate={4} />
                </SelectItem>
                <SelectItem value="3">
                  <AddCommentStars rate={3} />
                </SelectItem>
                <SelectItem value="2">
                  <AddCommentStars rate={2} />
                </SelectItem>
                <SelectItem value="1">
                  <AddCommentStars rate={1} />
                </SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              className="text-black min-h-28"
              defaultValue={commentData.content}
              placeholder="Type your Comment here."
              onChange={(e) =>
                setComment({ ...comment, content: e.target.value })
              }
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            disabled={isPending}
            onClick={HandleUpdateComment}
            className="bg-black hover:bg-black w-24">
            {isPending ? (
              <>
                <SmallLoader color="white" />
              </>
            ) : (
              "Save"
            )}
          </Button>

          <AlertDialogCancel
            ref={ClosebtnRef}
            className="bg-soft_border border-soft_border hover:bg-soft_border text-black">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
