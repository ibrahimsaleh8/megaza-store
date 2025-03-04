import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let count = 0;
    const catsegory = request.nextUrl.searchParams.get("category");

    if (catsegory) {
      const cats = await prisma.category.findFirst({
        where: {
          name: {
            equals: catsegory,
            mode: "insensitive",
          },
        },
        select: {
          products: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!cats) {
        return NextResponse.json(count, { status: 200 });
      }
      count = cats.products.length;
      return NextResponse.json(count, { status: 200 });
    }

    count = await prisma.product.count();
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
