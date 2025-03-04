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
    const user = userInfoFromToken(token);
    if (!user || !user?.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access!" },
        { status: 403 }
      );
    }
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        created_at: true,
        name: true,
        isPaid: true,
        orderKind: true,
        items: {
          select: {
            id: true,
          },
        },
        totalAmount: true,
        status: true,
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
