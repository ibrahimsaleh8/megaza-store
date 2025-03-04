import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userID = request.nextUrl.searchParams.get("userId") as string;
    const userInfo = await prisma.user.findUnique({
      where: {
        id: +userID,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        orders: {
          select: {
            id: true,
            items: {
              select: {
                id: true,
                product: {
                  select: {
                    card_image: true,
                    id: true,
                    title: true,
                    price: true,
                    available: true,
                    hasDiscount: true,
                    discount: true,
                  },
                },
                quantity: true,
                price: true,
                subtotal: true,
              },
            },
            status: true,
            totalAmount: true,
            created_at: true,
          },
        },
        // Personal Info
        city: true,
        mobile: true,
        postalCode: true,
        state: true,
        street: true,
        country: true,
      },
    });

    if (!userInfo) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

// http://localhost:3000/api/user/full-data?userId=1
