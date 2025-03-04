import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("token") as string;
    if (!token) {
      return NextResponse.json(
        { message: "Token Not found!" },
        { status: 400 }
      );
    }
    const uid = request.nextUrl.searchParams.get("uid") as string;
    const user = userInfoFromToken(token);
    if (!user || user.id != +uid) {
      return NextResponse.json(
        { message: "Forbidden Access!" },
        { status: 403 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: +uid,
      },
      select: {
        id: true,
        name: true,
        city: true,
        country: true,
        created_at: true,
        email: true,
        isPaid: true,
        items: {
          select: {
            id: true,
            color: true,
            quantity: true,
            size: true,
            subtotal: true,
            product: {
              select: {
                id: true,
                card_image: true,
                title: true,
                brandName: true,
              },
            },
          },
        },
        mobile: true,
        orderKind: true,
        postalCode: true,
        state: true,
        status: true,
        street: true,
        totalAmount: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
