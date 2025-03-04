import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("token") as string;
    const userData = userInfoFromToken(token);
    if (!userData || !userData.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        { status: 403 }
      );
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

// http://localhost:3000/api/user/get-all-users
