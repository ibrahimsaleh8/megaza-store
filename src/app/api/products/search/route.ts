import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const title = await request.nextUrl.searchParams.get("title");
    if (!title) {
      return NextResponse.json({ message: "Title Not Found" }, { status: 404 });
    }
    const products = await prisma.product.findMany({
      where: {
        title: {
          mode: "insensitive",
          contains: title,
        },
      },
      select: {
        id: true,
        title: true,
        card_image: true,
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
// http://localhost:3000/api/products/search
