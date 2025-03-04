import prisma from "@/utils/PrismaVariable";
import { UpdateUserDetails } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const body = (await request.json()) as UpdateUserDetails;
    const user = await prisma.user.findUnique({
      where: { id: +params.params.id },
    });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: +params.params.id,
      },
      data: {
        city: body.city,
        country: body.country,
        mobile: body.mobile,
        postalCode: body.postalCode,
        state: body.state,
        street: body.street,
        username: body.userName,
      },
    });
    return NextResponse.json({ message: "Details Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
// http://localhost:3000/api/user/full-data/id
