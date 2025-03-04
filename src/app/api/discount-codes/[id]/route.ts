import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  requset: NextRequest,
  params: { params: { id: string } }
) {
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
    const code = await prisma.discountCodes.findUnique({
      where: {
        id: +params.params.id,
      },
    });
    if (!code) {
      return NextResponse.json({ message: "Code not found" });
    }
    await prisma.discountCodes.delete({
      where: { id: +params.params.id },
    });
    return NextResponse.json(
      { message: "Code deleted success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function PUT(
  requset: NextRequest,
  params: { params: { id: string } }
) {
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
    const { isActive } = (await requset.json()) as {
      isActive: boolean;
    };

    await prisma.discountCodes.update({
      where: {
        id: +params.params.id,
      },
      data: {
        isActive,
      },
    });
    return NextResponse.json(
      { message: "Code Updated success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
