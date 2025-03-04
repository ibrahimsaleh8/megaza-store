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
    if (VerifyUser.isAdmin) {
      const ordersAnalysis = await prisma.order.findMany({
        select: { created_at: true },
      });

      return NextResponse.json(ordersAnalysis, { status: 200 });
    }
    const ordersAnalysis = await prisma.order.findMany({
      select: { created_at: true },
      where: {
        userId: +uid,
      },
    });

    return NextResponse.json(ordersAnalysis, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
