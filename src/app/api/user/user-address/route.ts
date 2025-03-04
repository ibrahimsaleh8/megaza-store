import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = (await req.nextUrl.searchParams.get("userId")) as string;
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      select: {
        city: true,
        country: true,
        mobile: true,
        postalCode: true,
        state: true,
        street: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
// /api/user/user-address?userId=1
