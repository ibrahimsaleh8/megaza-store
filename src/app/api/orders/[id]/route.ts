import prisma from "@/utils/PrismaVariable";
import { userInfoFromToken } from "@/utils/UserInfoFromToken";
import { NextRequest, NextResponse } from "next/server";
export type UpdateOrderType = {
  status: "PENDING" | "COMPLETED" | "CANCELED" | "SHIPPED";
  isPaid: boolean;
};
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token") as string;
    if (!token) {
      return NextResponse.json(
        { message: "Token Not found!" },
        { status: 400 }
      );
    }
    const user = userInfoFromToken(token);
    if (!user || !user?.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access!" },
        { status: 403 }
      );
    }
    const order = await prisma.order.findUnique({
      where: {
        id: +params.id,
      },
      select: {
        id: true,
        created_at: true,
        isPaid: true,
        orderKind: true,
        items: {
          select: {
            id: true,
            price: true,
            color: true,
            quantity: true,
            size: true,
            subtotal: true,
            product: {
              select: {
                id: true,
                card_image: true,
                title: true,
                brandName: true,
              },
            },
          },
        },
        totalAmount: true,
        status: true,
        // User Info
        name: true,
        email: true,
        city: true,
        country: true,
        mobile: true,
        postalCode: true,
        state: true,
        street: true,
      },
    });
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("token") as string;
    const body = (await request.json()) as UpdateOrderType;
    if (!token) {
      return NextResponse.json(
        { message: "Token Not found!" },
        { status: 400 }
      );
    }
    const user = userInfoFromToken(token);
    if (!user || !user?.isAdmin) {
      return NextResponse.json(
        { message: "Forbidden Access!" },
        { status: 403 }
      );
    }
    const order = await prisma.order.findUnique({
      where: {
        id: +params.id,
      },
    });
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }
    await prisma.order.update({
      where: {
        id: +params.id,
      },
      data: {
        isPaid: body.isPaid,
        status: body.status,
      },
    });
    return NextResponse.json(
      { message: "Order Updated Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
