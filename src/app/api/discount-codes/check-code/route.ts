import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = (await request.json()) as { code: string };
    const findCode = await prisma.discountCodes.findFirst({
      where: {
        code,
      },
    });
    if (!findCode) {
      return NextResponse.json({ message: "Incorrect code" }, { status: 400 });
    }
    if (findCode.used == findCode.maxUsing || !findCode.isActive) {
      return NextResponse.json(
        { message: "Code is  expired" },
        { status: 400 }
      );
    }
    return NextResponse.json({ percent: findCode.percent }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
