import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";
type NewCat = {
  name: string;
};
export async function GET(request: NextRequest) {
  try {
    const withProducts = request.nextUrl.searchParams.get(
      "with_products"
    ) as string;
    if (withProducts) {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          products: { select: { id: true, card_image: true, title: true } },
        },
      });
      return NextResponse.json(categories, { status: 200 });
    }
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Token Not Found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        {
          status: 403,
        }
      );
    }
    const catName = (await request.json()) as NewCat;
    await prisma.category.create({
      data: {
        name: catName.name,
      },
    });
    return NextResponse.json({ message: "Category added" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
