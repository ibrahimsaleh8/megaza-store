import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token");
    if (!token) {
      return NextResponse.json({ message: "Token Not Found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        {
          status: 403,
        }
      );
    }
    const isAvailable = await prisma.category.findUnique({
      where: {
        id: +params.params.id,
      },
    });
    if (!isAvailable) {
      return NextResponse.json(
        { message: "category Not found" },
        { status: 404 }
      );
    }

    await prisma.cartProduct.deleteMany({
      where: {
        product: {
          categoryId: +params.params.id,
        },
      },
    });
    await prisma.wishListProduct.deleteMany({
      where: {
        product: {
          categoryId: +params.params.id,
        },
      },
    });
    await prisma.comment.deleteMany({
      where: {
        product: {
          categoryId: +params.params.id,
        },
      },
    });
    await prisma.productColors.deleteMany({
      where: {
        Product: {
          categoryId: +params.params.id,
        },
      },
    });
    await prisma.productSizes.deleteMany({
      where: {
        Product: {
          categoryId: +params.params.id,
        },
      },
    });
    await prisma.orderItem.deleteMany({
      where: {
        product: {
          categoryId: +params.params.id,
        },
      },
    });

    await prisma.product.deleteMany({
      where: {
        categoryId: +params.params.id,
      },
    });
    await prisma.category.delete({
      where: {
        id: +params.params.id,
      },
    });
    return NextResponse.json({ message: "Deleted Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
type EditCat = {
  name: string;
};

export async function PUT(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token");
    const newName = (await request.json()) as EditCat;
    if (!token) {
      return NextResponse.json({ message: "Token Not Found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        {
          status: 403,
        }
      );
    }
    const isAvailable = await prisma.category.findUnique({
      where: {
        id: +params.params.id,
      },
    });
    if (!isAvailable) {
      return NextResponse.json(
        { message: "category Not found" },
        { status: 404 }
      );
    }
    await prisma.category.update({
      where: {
        id: +params.params.id,
      },
      data: {
        name: newName.name,
      },
    });
    return NextResponse.json({ message: "Updated Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
