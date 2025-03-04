import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("token") as string;
    if (!token) {
      return NextResponse.json({ message: "token not found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);

    const userId = request.nextUrl.searchParams.get("userId") || 0;
    if (!user || user.id != userId) {
      return NextResponse.json(
        { message: "Forbidden access" },
        { status: 403 }
      );
    }

    const userInfo = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,

        cart: {
          select: {
            id: true,
            items: {
              select: {
                id: true,
                quantity: true,
                product: {
                  select: {
                    id: true,
                    title: true,
                    card_image: true,
                    price: true,
                    available: true,
                    hasDiscount: true,
                    discount: true,
                    colors: {
                      select: {
                        color: true,
                        available: true,
                      },
                    },
                    sizes: {
                      select: {
                        size: true,
                        available: true,
                      },
                    },
                  },
                },
                color: true,
                size: true,
              },
            },
          },
        },

        wishList: {
          select: {
            id: true,
            items: {
              select: {
                id: true,
                product: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
        city: true,
        country: true,
        mobile: true,
        state: true,
        postalCode: true,
        street: true,
      },
    });

    if (!userInfo) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
