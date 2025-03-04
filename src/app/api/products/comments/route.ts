import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get("productId") as string;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID not found" },
        { status: 404 }
      );
    }
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }
    const comments = await prisma.comment.findMany({
      where: {
        productId: productId,
      },
      select: {
        id: true,
        content: true,
        rating: true,
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
