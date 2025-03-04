import { ProductInfoForEditType } from "@/app/(user)/profile/admin/edit-product/[id]/page";
import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const ProductId = request.nextUrl.searchParams.get("id") as string;
    const product = await prisma.product.findUnique({
      where: {
        id: ProductId,
      },
      select: {
        id: true,
        title: true,
        available: true,
        description: true,
        images: true,
        price: true,
        brandName: true,
        card_image: true,
        created_at: true,
        updated_at: true,
        colors: {
          select: {
            id: true,
            available: true,
            color: true,
          },
        },
        hasDiscount: true,
        discount: true,
        sizes: {
          select: {
            id: true,
            available: true,
            size: true,
          },
        },
        amount: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            rating: true,
            created_at: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("token") as string;
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);

    if (!user?.isAdmin || !user) {
      return NextResponse.json(
        { message: "forbidden access" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as ProductInfoForEditType;

    await prisma.product.update({
      where: { id: body.id },
      data: {
        amount: body.amount,
        available: body.available,
        brandName: body.brandName,
        card_image: body.card_image,
        category: {
          connect: { id: body.category.id },
        },
        colors: {
          upsert: body.colors.map((color) => ({
            where: { id: color.id || -1 },
            update: {
              available: color.available,
            },
            create: {
              color: color.color,
              available: color.available,
            },
          })),
        },
        sizes: {
          upsert: body.sizes.map((size) => ({
            where: { id: size.id || -1 },
            update: {
              available: size.available,
            },
            create: {
              size: size.size,
              available: size.available,
            },
          })),
        },
        description: body.description,
        discount: body.discount,
        hasDiscount: body.hasDiscount,
        images: { set: body.images },
        price: body.price,
        title: body.title,
      },
    });

    return NextResponse.json(
      { message: "Product Updated Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get("token") as string;
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }
    const user = userInfoFromToken(token);

    if (!user?.isAdmin || !user) {
      return NextResponse.json(
        { message: "forbidden access" },
        { status: 403 }
      );
    }
    const id = request.nextUrl.searchParams.get("id") as string;
    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }

    // Delete all related records in a transaction
    await prisma.$transaction([
      prisma.productColors.deleteMany({ where: { productId: id } }),
      prisma.productSizes.deleteMany({ where: { productId: id } }),
      prisma.comment.deleteMany({ where: { productId: id } }),
      prisma.cartProduct.deleteMany({ where: { productId: id } }),
      prisma.wishListProduct.deleteMany({ where: { productId: id } }),
      prisma.orderItem.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ]);

    return NextResponse.json({ message: "Product Deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
