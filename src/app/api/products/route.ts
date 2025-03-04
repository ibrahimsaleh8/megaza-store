import prisma from "@/utils/PrismaVariable";
import { AddProductType } from "@/utils/Types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AddProductType;

    const newProduct = await prisma.product.create({
      data: {
        available: true,
        brandName: body.brandName,
        description: body.description,
        price: body.price,
        title: body.title,
        categoryId: body.categoryId,
        card_image: body.card_image,
        images: body.images,
        amount: body.amount,
        hasDiscount: body.hasDiscount,
        discount: body.discount,
        colors: {
          createMany: {
            data: body.colors,
          },
        },
        sizes: {
          createMany: {
            data: body.sizes,
          },
        },
      },
    });

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const itemsPerPage = 8;
    let Products;

    const category = await request.nextUrl.searchParams.get("category");
    const pageNumber = await request.nextUrl.searchParams.get("number");
    const las_added = await request.nextUrl.searchParams.get("last_added");
    const discount = await request.nextUrl.searchParams.get("discount");
    const all = await request.nextUrl.searchParams.get("all");
    if (all) {
      Products = await prisma.product.findMany({
        select: {
          id: true,
          title: true,
          amount: true,
          price: true,
          card_image: true,
          category: { select: { name: true } },
        },
      });
      return NextResponse.json(Products, { status: 200 });
    }
    if (category && pageNumber) {
      Products = await prisma.product.findMany({
        take: itemsPerPage,
        skip: itemsPerPage * (parseInt(pageNumber) - 1),
        where: {
          category: {
            name: { equals: category, mode: "insensitive" },
          },
          amount: {
            gt: 0,
          },
        },
        select: {
          id: true,
          amount: true,
          title: true,
          description: true,
          price: true,
          available: true,
          brandName: true,
          category: true,
          categoryId: true,
          comments: true,
          card_image: true,
          images: true,
          hasDiscount: true,
          discount: true,
          colors: {
            select: {
              id: true,
              available: true,
              color: true,
            },
          },
          sizes: {
            select: {
              id: true,
              available: true,
              size: true,
            },
          },
        },
      });
      return NextResponse.json(Products, { status: 200 });
    }

    if (category) {
      Products = await prisma.product.findMany({
        take: itemsPerPage,
        where: {
          category: {
            name: { equals: category, mode: "insensitive" },
          },
          amount: {
            gt: 0,
          },
        },
        select: {
          id: true,
          title: true,
          amount: true,
          description: true,
          price: true,
          available: true,
          brandName: true,
          category: true,
          categoryId: true,
          comments: true,
          card_image: true,
          images: true,
          hasDiscount: true,
          discount: true,
          colors: {
            select: {
              id: true,
              available: true,
              color: true,
            },
          },
          sizes: {
            select: {
              id: true,
              available: true,
              size: true,
            },
          },
        },
      });
      return NextResponse.json(Products, { status: 200 });
    }

    if (pageNumber) {
      Products = await prisma.product.findMany({
        where: {
          amount: {
            gt: 0,
          },
        },
        take: itemsPerPage,
        skip: itemsPerPage * (parseInt(pageNumber) - 1),
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          amount: true,
          available: true,
          brandName: true,
          category: true,
          categoryId: true,
          comments: true,
          card_image: true,
          images: true,
          hasDiscount: true,
          discount: true,
          colors: {
            select: {
              id: true,
              available: true,
              color: true,
            },
          },
          sizes: {
            select: {
              id: true,
              available: true,
              size: true,
            },
          },
        },
      });
      return NextResponse.json(Products, { status: 200 });
    }

    if (las_added) {
      Products = await prisma.product.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 5,
        select: {
          id: true,
          title: true,
          price: true,
          amount: true,
          card_image: true,
          available: true,
          discount: true,
          hasDiscount: true,
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
      });
      return NextResponse.json(Products, { status: 200 });
    }

    if (discount) {
      Products = await prisma.product.findMany({
        where: {
          hasDiscount: {
            equals: true,
          },
          amount: {
            gt: 0,
          },
        },
        select: {
          id: true,
          title: true,
          price: true,
          amount: true,
          card_image: true,
          available: true,
          discount: true,
          hasDiscount: true,
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
      });
      return NextResponse.json(Products, { status: 200 });
    }

    Products = await prisma.product.findMany({
      take: itemsPerPage,
      where: {
        amount: {
          gt: 0,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        amount: true,
        available: true,
        brandName: true,
        category: true,
        categoryId: true,
        comments: true,
        card_image: true,
        images: true,
        hasDiscount: true,
        discount: true,
        colors: {
          select: {
            id: true,
            available: true,
            color: true,
          },
        },
        sizes: {
          select: {
            id: true,
            available: true,
            size: true,
          },
        },
      },
    });

    return NextResponse.json(Products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
