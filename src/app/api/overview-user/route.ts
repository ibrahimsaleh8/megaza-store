import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("token");
    if (!token) {
      return NextResponse.json(
        { message: "No Token Provided" },
        { status: 400 }
      );
    }

    const VerifyUser = await userInfoFromToken(token);
    if (!VerifyUser) {
      return NextResponse.json(
        { message: "Forbidden access" },
        { status: 403 }
      );
    }

    const uid = request.nextUrl.searchParams.get("uid") as string;
    if (!uid) {
      return NextResponse.json({ message: "No uid Provided" }, { status: 400 });
    }
    if (+uid != VerifyUser.id) {
      return NextResponse.json(
        { message: "Forbidden access" },
        { status: 403 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: +uid,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const orders = await prisma.order.findMany({
      where: {
        userId: +uid,
      },
      select: {
        id: true,
        status: true,
        totalAmount: true,
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
