import prisma from "@/utils/PrismaVariable";
import { CartProductChangeType, CartRequestType } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";

// Add or update items in the cart
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CartRequestType;

    // Find existing cart
    let cart = await prisma.cart.findUnique({
      where: { userId: body.userId },
      select: {
        items: {
          include: {
            product: {
              select: {
                title: true,
                price: true,
                card_image: true,
              },
            },
          },
        },
        userId: true,
        id: true,
      },
    });

    // Create a new cart if none exists
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: body.userId },
        select: {
          items: {
            include: {
              product: {
                select: {
                  title: true,
                  price: true,
                  card_image: true,
                },
              },
            },
          },
          userId: true,
          id: true,
        },
      });
    }

    // Update existing items or add new ones
    const existingItem = cart.items.findIndex(
      (cartItem) =>
        cartItem.productId === body.item.productId &&
        cartItem.color == body.item.color &&
        cartItem.size == body.item.size
    );

    if (existingItem != -1) {
      // Update quantity for existing item
      await prisma.cartProduct.update({
        where: { id: cart.items[existingItem].id },
        data: { quantity: cart.items[existingItem].quantity + 1 },
      });
    } else {
      // Add new item to the cart
      await prisma.cartProduct.create({
        data: {
          cartId: cart.id,
          productId: body.item.productId,
          quantity: body.item.quantity || 1,
          color: body.item.color,
          size: body.item.size,
        },
      });
    }

    return NextResponse.json(
      { message: "Cart Updated Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

// Get Cart
export async function GET(request: NextRequest) {
  try {
    const UserId = request.nextUrl.searchParams.get("userId") || 0;
    const cart = await prisma.cart.findUnique({
      where: {
        userId: +UserId,
      },
      select: {
        items: {
          select: {
            quantity: true,
            product: {
              select: {
                title: true,
                id: true,
                card_image: true,
                price: true,
                available: true,
              },
            },
            id: true,
          },
        },
        id: true,
      },
    });
    if (!cart) {
      return NextResponse.json({ message: "Not Found Cart" }, { status: 404 });
    }
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

// Delet From Cart
export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as CartProductChangeType;

    const cart = await prisma.cart.findUnique({
      where: {
        userId: body.userId,
      },
    });
    if (!cart) {
      return NextResponse.json({ message: "Cart not Found" }, { status: 404 });
    }
    const isExiste = await prisma.cartProduct.findFirst({
      where: {
        productId: body.productId,
        size: body.size,
        color: body.color,
        cartId: cart.id,
      },
    });
    if (!isExiste) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    await prisma.cartProduct.delete({
      where: {
        id: isExiste.id,
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

// Update Cart Quantity
export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as CartProductChangeType;

    const cart = await prisma.cart.findUnique({
      where: {
        userId: body.userId,
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not Found" }, { status: 404 });
    }

    const isExiste = await prisma.cartProduct.findFirst({
      where: {
        productId: body.productId,
        size: body.size,
        color: body.color,
        cartId: cart.id,
      },
    });

    if (!isExiste) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    //Update Quantity
    await prisma.cartProduct.update({
      where: {
        id: isExiste.id,
      },
      data: {
        quantity: body.quantity ?? 0,
      },
    });

    return NextResponse.json(
      { message: "Quantity Updated Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
// http://localhost:3000/api/user/cart?userId=1
