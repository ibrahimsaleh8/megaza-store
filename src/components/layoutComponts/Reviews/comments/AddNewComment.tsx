"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import {
  ErrorResponseType,
  jwtPayloadType,
  NewCommentType,
} from "@/utils/Types";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userInfoStore";
import { TiInfo } from "react-icons/ti";
import CommentStarts from "./CommentStarts";
import SmallLoader from "../../Loader/SmallLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Props = {
  userData: jwtPayloadType | null;
  productId: string;
};

async function AddCommentFn(data: NewCommentType) {
  await axios.post(`${MainDomain}/api/comment`, data);
}
export default function AddNewComment({ productId, userData }: Props) {
  const ClosebtnRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: NewCommentType) => AddCommentFn(data),
    onSuccess: () => {
      toast.success("Comment Added ✔️");
      ClosebtnRef.current?.click();
      queryClient.refetchQueries({ queryKey: ["product_comments"] });
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  const { userInfo } = useUserStore();
  const [reviewStars, setReviewStars] = useState(0);
  const [commentData, setCommentData] = useState<NewCommentType>({
    content: "",
    productId: productId,
    rating: reviewStars,
    userId: userData ? userData?.id : 0,
  });
  const HandleAddNewComment = async () => {
    const data = {
      content: commentData.content,
      productId: commentData.productId,
      rating: reviewStars,
      userId: commentData.userId,
    };

    if (data.content.trim().length == 0) {
      document.getElementById("new_comment")?.focus();
      document.getElementById("new_comment")?.classList.add("!border-red-500");
      return 0;
    } else {
      document
        .getElementById("new_comment")
        ?.classList.remove("!border-red-500");
    }
    if (data.rating == 0) {
      toast.warning("Please select the rate");
      return 0;
    }
    mutate(data);
  };
  return (
    <>
      <Dialog
        onOpenChange={() => {
          setReviewStars(0);
          setCommentData({
            content: "",
            productId: productId,
            rating: reviewStars,
            userId: userData ? userData?.id : 0,
          });
        }}>
        <DialogTrigger
          aria-label="Write a review"
          className="flex text-sm font-medium gap-2 items-center border border-soft_border hover:bg-black hover:text-white duration-300 text-black my-2 px-3 py-1 rounded-sm ml-auto">
          Write a review
        </DialogTrigger>

        <DialogContent className="bg-white !gap-2 text-black border-soft_border">
          <DialogHeader className="flex items-center gap-2">
            <DialogTitle className="flex items-center gap-2 w-full px-2 pt-2 sm:px-3">
              {userInfo && (
                <div className="ml-auto p-3 bg-white text-black border rounded-md flex items-center gap-2">
                  <FaCircleUser />
                  <p className="text-sm">{userInfo.username}</p>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <div>
            {userData ? (
              <div className="flex flex-col gap-4 py-2">
                <div className="flex flex-col gap-3 items-center justify-center">
                  <p>How would you rate this product?</p>
                  <CommentStarts setReviewStars={setReviewStars} />
                </div>
                <Textarea
                  id="new_comment"
                  required
                  onChange={(e) =>
                    setCommentData({ ...commentData, content: e.target.value })
                  }
                  className="text-black focus-visible:ring-0 h-40 border-black"
                  placeholder="Type your Comment here."
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="flex items-center gap-1 text-black ">
                  <TiInfo className="text-xl" />
                  Please Login To create a review
                </p>
                <Link
                  className="px-4 py-1.5 font-bold bg-black text-white w-fit rounded-md "
                  href={"/login"}>
                  Login
                </Link>
              </div>
            )}
          </div>

          <DialogFooter className="flex">
            {userData && (
              <Button
                className="flex items-center sm:w-24 gap-2 bg-black duration-200 text-white hover:bg-black"
                disabled={!userData || isPending}
                type="submit"
                onClick={HandleAddNewComment}>
                {isPending ? (
                  <>
                    <SmallLoader color="white" />
                  </>
                ) : (
                  "Comment"
                )}
              </Button>
            )}

            <DialogClose ref={ClosebtnRef} asChild>
              <Button
                type="button"
                className="bg-soft_border text-black hover:bg-soft_border">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
