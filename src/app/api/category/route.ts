import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";
type categoryType = {
  title: string;
};

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          select: {
            id: true,
          },
          take: 5,
        },
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as categoryType;
    if (!body.title) {
      return NextResponse.json(
        { message: "Please input valide title" },
        { status: 400 }
      );
    }
    await prisma.category.create({
      data: {
        name: body.title,
      },
    });
    return NextResponse.json(
      { message: "category created success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
