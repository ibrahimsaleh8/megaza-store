import { jwtPayloadType, ProductCommentType } from "@/utils/Types";
import { FaUserCircle } from "react-icons/fa";
import AddCommentStars from "../rating/AddCommentStars";
import DeleteComment from "./DeleteComment";
import EditeComment from "./EditeComment";
type Props = {
  commentData: ProductCommentType;
  userData: jwtPayloadType | null;
  token: string;
};
export default function UserComment({ commentData, userData, token }: Props) {
  const date = new Date(commentData.created_at);
  const CommentDate = `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCFullYear()}`;

  return (
    <div className="sm-box-shadow comment p-3 rounded-lg flex flex-col gap-2 overflow-hidden">
      {/* Comment Header */}
      <div className="header-comment flex gap-2">
        <div className="image">
          <FaUserCircle className="w-10 h-10" />
        </div>

        <div className="text flex items-start  flex-col">
          <p className="font-bold flex gap-4 text-[0.8rem] text-secondry_text">
            {commentData.user.username}
            <span className="text-[#545454] text-[0.7rem] font-medium font-mono ">
              {CommentDate}
            </span>
          </p>

          <AddCommentStars rate={commentData.rating} />
        </div>

        <div className="btns flex items-center ml-auto gap-2">
          {userData?.id == commentData.user.id && (
            <EditeComment token={token} commentData={commentData} />
          )}

          {userData?.id == commentData.user.id || userData?.isAdmin ? (
            <>
              <DeleteComment token={token} commentId={commentData.id} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Comment Body  */}
      <div className="body-comment pl-5">
        <p className="text-sm sm:text-base">{commentData.content}</p>
      </div>
    </div>
  );
}
