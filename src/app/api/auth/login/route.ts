import { CreateJwtToken } from "@/utils/CreateUserToken";
import prisma from "@/utils/PrismaVariable";
import { jwtPayloadType, loginBodyType } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as loginBodyType;
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const checkPassword = await compare(body.password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const jwtPayload: jwtPayloadType = {
      email: user.email,
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    const token = CreateJwtToken(jwtPayload);

    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error " + error },
      { status: 500 }
    );
  }
}
