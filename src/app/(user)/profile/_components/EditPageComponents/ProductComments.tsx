"use client";
import AddCommentStars from "@/components/layoutComponts/Reviews/rating/AddCommentStars";
import { FaUserCircle } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { ProductInfoForEditType } from "../../admin/edit-product/[id]/page";
import DeleteComment from "@/components/layoutComponts/Reviews/comments/DeleteComment";
type Props = {
  CommentData: {
    id: number;
    content: string;
    rating: number;
    user: {
      id: number;
      username: string;
    };
    created_at: string;
  };
  setData: Dispatch<SetStateAction<ProductInfoForEditType | undefined>>;
  Data: ProductInfoForEditType;
  token: string;
};
export default function ProductComments({
  CommentData,
  Data,
  setData,
  token,
}: Props) {
  const date = new Date(CommentData.created_at);
  const CommentDate = `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCFullYear()}`;
  const UpdateComments = () => {
    setData({
      ...Data,
      comments: Data.comments.filter((c) => c.id !== CommentData.id),
    });
  };
  // const DeleteComment = () => {
  //   setData({
  //     ...Data,
  //     comments: Data.comments.filter((c) => c.id !== CommentData.id),
  //   });
  //   CancelRef.current?.click();
  // };
  return (
    <>
      <div className="sm-box-shadow comment p-3 rounded-lg flex flex-col gap-2">
        {/* Comment Header */}
        <div className="header-comment flex gap-2">
          <div className="image">
            <FaUserCircle className="w-10 h-10" />
          </div>
          <div className="text flex items-start  flex-col">
            <p className="font-bold flex gap-4 text-sm text-secondry_text">
              {CommentData.user.username}
              <span className="text-[#545454] text-[0.7rem] font-medium font-mono ">
                {CommentDate}
              </span>
            </p>

            <AddCommentStars rate={CommentData.rating} />
          </div>
          {/* Delete button */}

          <DeleteComment
            UpdateComments={UpdateComments}
            commentId={CommentData.id}
            token={token}
          />
        </div>

        {/* Comment Body  */}
        <div className="body-comment pl-5">
          <p className="text-sm sm:text-base">{CommentData.content} </p>
        </div>
      </div>
    </>
  );
}
