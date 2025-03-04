import prisma from "@/utils/PrismaVariable";
import { EditeCommentType } from "@/utils/Types";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

// Delete Comment
export async function DELETE(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token") as string;
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);
    if (!user) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        { status: 403 }
      );
    }

    const commentID = params.params.id;
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(commentID),
      },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );
    }
    if (comment.userId == user.id || user.isAdmin) {
      await prisma.comment.delete({
        where: {
          id: parseInt(commentID),
        },
      });
      return NextResponse.json({ message: "Comment Deleted" }, { status: 200 });
    }
    return NextResponse.json(
      {
        message: "Forbidden Access",
      },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

// Edite Comment

export async function PUT(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token") as string;
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);
    if (!user) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as EditeCommentType;
    const commentID = params.params.id;
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(commentID),
      },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );
    }
    if (comment.userId == user.id || user.isAdmin) {
      await prisma.comment.update({
        where: {
          id: +commentID,
        },
        data: {
          content: body.content,
          rating: body.rating,
        },
      });
      return NextResponse.json({ message: "Comment Updated" }, { status: 200 });
    }
    return NextResponse.json(
      {
        message: "Forbidden Access",
      },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
