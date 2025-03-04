import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requset: NextRequest) {
  try {
    const token = requset.headers.get("token") as string;
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }
    const user = userInfoFromToken(token);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden access" },
        { status: 403 }
      );
    }

    const codes = await prisma.discountCodes.findMany({
      select: {
        id: true,
        code: true,
        percent: true,
        used: true,
        created_at: true,
        isActive: true,
        maxUsing: true,
      },
    });
    return NextResponse.json(codes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function POST(requset: NextRequest) {
  try {
    const { code, percent, maxUsing } = (await requset.json()) as {
      code: string;
      percent: number;
      maxUsing: number;
    };
    const token = requset.headers.get("token") as string;
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }
    const user = userInfoFromToken(token);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden access" },
        { status: 403 }
      );
    }

    await prisma.discountCodes.create({
      data: {
        code,
        percent,
        maxUsing,
        isActive: true,
      },
    });
    return NextResponse.json(
      { message: "Code created success!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
