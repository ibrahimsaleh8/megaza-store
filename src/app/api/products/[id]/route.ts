import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    const RequestTitle = params.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: RequestTitle,
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
        colors: {
          select: {
            available: true,
            color: true,
          },
        },
        hasDiscount: true,
        discount: true,
        sizes: {
          select: {
            available: true,
            size: true,
          },
        },
        amount: true,
        category: {
          select: {
            id: true,
            name: true,
            products: {
              take: 7,
              select: {
                id: true,
                amount: true,
                title: true,
                price: true,
                card_image: true,
                discount: true,
                hasDiscount: true,
                available: true,
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
