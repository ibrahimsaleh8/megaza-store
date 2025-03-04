import { RegisterServerSchema } from "@/utils/ServerZodSchema";
import { jwtPayloadType, registerBodyType } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
import prisma from "@/utils/PrismaVariable";
import { CreateJwtToken } from "@/utils/CreateUserToken";
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as registerBodyType;
    const validation = RegisterServerSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.errors.map((el) => el.message);
      return NextResponse.json({ message: errorMessages }, { status: 400 });
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (checkUser) {
      return NextResponse.json(
        { message: "This email is taken" },
        { status: 403 }
      );
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(body.password, salt);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        username: body.username,
      },
    });
    await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });
    await prisma.wishList.create({
      data: {
        userId: user.id,
      },
    });

    const jwtPayload: jwtPayloadType = {
      email: user.email,
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const token = CreateJwtToken(jwtPayload);

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        token,
      },
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
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
