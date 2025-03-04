import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";
type UpdateUserByAdmin = {
  username: string;
  email: string;
  isAdmin: boolean;
};
export async function GET(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token") as string;
    const userData = userInfoFromToken(token);
    if (!userData || !userData.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        { status: 403 }
      );
    }
    const userInfo = await prisma.user.findUnique({
      where: {
        id: +params.params.id,
      },
      select: {
        username: true,
        email: true,
        isAdmin: true,
        city: true,
        country: true,
        mobile: true,
        postalCode: true,
        state: true,
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
export async function POST(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token") as string;
    const userData = userInfoFromToken(token);
    if (!userData || !userData.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        { status: 403 }
      );
    }
    const data = (await request.json()) as UpdateUserByAdmin;
    await prisma.user.update({
      where: {
        id: +params.params.id,
      },
      data: {
        isAdmin: data.isAdmin,
        email: data.email,
        username: data.username,
      },
    });
    return NextResponse.json(
      { message: "user Updated Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token") as string;
    const userData = userInfoFromToken(token);
    if (!userData || !userData.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        { status: 403 }
      );
    }
    const userId = +params.params.id;
    // Check if the user has a cart before attempting to delete it
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
    });

    if (cart) {
      // Delete cart if it exists
      await prisma.cartProduct.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
      await prisma.cart.delete({
        where: { userId: userId },
      });
    }

    // Similarly, handle other related data deletion
    await prisma.comment.deleteMany({
      where: { userId: userId },
    });

    await prisma.orderItem.deleteMany({
      where: { order: { userId: userId } },
    });

    await prisma.order.deleteMany({
      where: { userId: userId },
    });
    const wishlist = await prisma.wishList.findUnique({
      where: { userId: userId },
    });
    if (wishlist) {
      await prisma.wishListProduct.deleteMany({
        where: { wishListId: wishlist.id },
      });
      await prisma.wishList.delete({
        where: { userId: userId },
      });
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return NextResponse.json(
      { message: "user Deleted Success" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
// http://localhost:3000/api/user/get-all-users/1
