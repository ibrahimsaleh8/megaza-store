import prisma from "@/utils/PrismaVariable";
import { WishListRequestType } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";

// Add Products to Wishlist
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WishListRequestType;
    let wishlist = await prisma.wishList.findUnique({
      where: {
        userId: +body.userId,
      },
      select: {
        id: true,
        items: {
          select: {
            id: true,
            product: {
              select: {
                id: true,
                card_image: true,
                title: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!wishlist) {
      wishlist = await prisma.wishList.create({
        data: {
          userId: +body.userId,
        },
        select: {
          id: true,
          items: {
            select: {
              id: true,
              product: {
                select: {
                  id: true,
                  card_image: true,
                  title: true,
                  price: true,
                },
              },
            },
          },
        },
      });
    }
    await prisma.wishListProduct.create({
      data: {
        productId: body.item.productId,
        wishListId: body.item.wishlistId,
      },
    });

    return NextResponse.json(
      { message: "Product Added to Wishlist" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

// Delete Product From WishList

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      ProductId: string;
      uid: number;
    };

    const wishList = await prisma.wishList.findUnique({
      where: {
        userId: body.uid,
      },
    });
    if (!wishList) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    const productWishlist = await prisma.wishListProduct.findFirst({
      where: {
        productId: body.ProductId,
        wishListId: wishList.id,
      },
    });

    if (!productWishlist) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.wishListProduct.delete({
      where: {
        id: productWishlist.id,
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

// Get wishlist Products
export async function GET(request: NextRequest) {
  try {
    const UID = request.nextUrl.searchParams.get("uid") as string;
    if (!UID) {
      return NextResponse.json(
        { message: "User id not found" },
        { status: 404 }
      );
    }
    const wishlist = await prisma.wishList.findUnique({
      where: {
        userId: +UID,
      },
      select: {
        id: true,
        items: {
          select: {
            id: true,
            product: {
              select: {
                id: true,
                title: true,
                amount: true,
                card_image: true,
                price: true,
                available: true,
                hasDiscount: true,
                discount: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
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

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
