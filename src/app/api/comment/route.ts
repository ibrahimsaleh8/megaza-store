import prisma from "@/utils/PrismaVariable";
import { NewCommentType } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NewCommentType;
    await prisma.comment.create({
      data: {
        content: body.content,
        rating: body.rating,
        productId: body.productId,
        userId: body.userId,
      },
    });
    return NextResponse.json(
      { message: "Comment Created Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const comment = await prisma.comment.findMany({
      select: {
        id: true,
        content: true,
        productId: true,
        rating: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
